package de.silberzirkel.akademie

import android.annotation.SuppressLint
import android.app.Activity
import android.content.ContentValues
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.util.Base64
import android.view.View
import android.view.ViewGroup
import android.view.WindowInsets
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.window.OnBackInvokedDispatcher

/**
 * Die App ist eine schlanke Hülle um ein Spiel, das vollständig aus lokalen
 * Dateien (assets/www) besteht. Es gibt keine Netzwerkzugriffe und keine KI:
 * Alle Aufgaben werden auf dem Gerät nach festen Regeln erzeugt.
 */
class MainActivity : Activity() {

    private lateinit var web: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val background = Color.parseColor(BACKGROUND)
        val root = FrameLayout(this)
        root.setBackgroundColor(background)

        web = WebView(this)
        web.setBackgroundColor(background)
        web.overScrollMode = View.OVER_SCROLL_NEVER
        web.isVerticalScrollBarEnabled = false
        web.isHorizontalScrollBarEnabled = false
        web.isLongClickable = false
        web.isHapticFeedbackEnabled = false
        web.setOnLongClickListener { true }
        root.addView(
            web,
            FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        )
        setContentView(root)

        // Ab Android 15 zeichnen Apps hinter Status- und Navigationsleiste.
        // Wir rücken den Inhalt so ein, dass nichts verdeckt wird.
        root.setOnApplyWindowInsetsListener { v, insets ->
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                val i = insets.getInsets(
                    WindowInsets.Type.systemBars() or
                        WindowInsets.Type.displayCutout() or
                        WindowInsets.Type.ime()
                )
                v.setPadding(i.left, i.top, i.right, i.bottom)
            } else {
                @Suppress("DEPRECATION")
                v.setPadding(
                    insets.systemWindowInsetLeft,
                    insets.systemWindowInsetTop,
                    insets.systemWindowInsetRight,
                    insets.systemWindowInsetBottom
                )
            }
            insets
        }

        web.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            mediaPlaybackRequiresUserGesture = false
            textZoom = 100
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
            allowContentAccess = false
        }

        web.webViewClient = object : WebViewClient() {
            // Nur die mitgelieferten Seiten dürfen geladen werden.
            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest
            ): Boolean = !request.url.toString().startsWith(ASSET_BASE)
        }

        web.addJavascriptInterface(Bridge(), "AndroidBridge")

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            onBackInvokedDispatcher.registerOnBackInvokedCallback(
                OnBackInvokedDispatcher.PRIORITY_DEFAULT
            ) { handleBack() }
        }

        if (savedInstanceState == null) {
            web.loadUrl(ASSET_BASE + "index.html")
        } else {
            web.restoreState(savedInstanceState)
        }
    }

    /** Die Zurück-Taste wird zuerst dem Spiel angeboten (z. B. Dialog schließen). */
    private fun handleBack() {
        web.evaluateJavascript(
            "(window.SZ && window.SZ.onBack) ? window.SZ.onBack() : false"
        ) { handled ->
            if (handled != "true") {
                moveTaskToBack(true)
            }
        }
    }

    @Deprecated("Wird auf Geräten vor Android 13 weiterhin aufgerufen.")
    override fun onBackPressed() {
        handleBack()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        web.saveState(outState)
    }

    override fun onPause() {
        web.evaluateJavascript(
            "window.SZ && window.SZ.onPause && window.SZ.onPause()", null
        )
        web.onPause()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        web.onResume()
        web.evaluateJavascript(
            "window.SZ && window.SZ.onResume && window.SZ.onResume()", null
        )
    }

    override fun onDestroy() {
        (web.parent as? ViewGroup)?.removeView(web)
        web.destroy()
        super.onDestroy()
    }

    /** Kleine Brücke, über die das Spiel Funktionen des Telefons nutzen kann. */
    inner class Bridge {

        /** Gibt an, ob Bilder in der Galerie gespeichert werden können. */
        @JavascriptInterface
        fun canSavePictures(): Boolean = Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q

        /** Speichert ein im Atelier gemaltes Bild (PNG, Base64) in der Galerie. */
        @JavascriptInterface
        fun savePicture(base64Png: String, title: String): Boolean {
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) return false
            return try {
                val bytes = Base64.decode(base64Png, Base64.DEFAULT)
                val safeTitle = title.replace(Regex("[^A-Za-z0-9_-]"), "_").take(40)
                val values = ContentValues().apply {
                    put(MediaStore.Images.Media.DISPLAY_NAME, "Silberzirkel_$safeTitle.png")
                    put(MediaStore.Images.Media.MIME_TYPE, "image/png")
                    put(
                        MediaStore.Images.Media.RELATIVE_PATH,
                        Environment.DIRECTORY_PICTURES + "/Silberzirkel"
                    )
                }
                val uri = contentResolver.insert(
                    MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values
                ) ?: return false
                contentResolver.openOutputStream(uri)?.use { it.write(bytes) } ?: return false
                true
            } catch (e: Exception) {
                false
            }
        }
    }

    private companion object {
        const val ASSET_BASE = "file:///android_asset/www/"
        const val BACKGROUND = "#14122B"
    }
}
