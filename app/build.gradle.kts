plugins {
    id("com.android.application")
}

android {
    namespace = "de.silberzirkel.akademie"
    compileSdk = 36

    defaultConfig {
        applicationId = "de.silberzirkel.akademie"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"
    }

    // Fester Schlüssel nur zum direkten Installieren ("Sideload") der App.
    // Er ist absichtlich nicht geheim (wie der Android-Debug-Schlüssel) und sorgt
    // dafür, dass neuere Versionen über die alte installiert werden können,
    // ohne dass der Spielstand verloren geht. Für eine Veröffentlichung im
    // Play Store muss ein eigener, geheimer Schlüssel verwendet werden.
    signingConfigs {
        create("sideload") {
            storeFile = rootProject.file("signing/sideload.jks")
            storePassword = "silberzirkel"
            keyAlias = "silberzirkel"
            keyPassword = "silberzirkel"
        }
    }

    buildTypes {
        debug {
            signingConfig = signingConfigs.getByName("sideload")
        }
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"))
            signingConfig = signingConfigs.getByName("sideload")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
