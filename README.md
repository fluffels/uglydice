# How to build

1. Make sure ANDROID_HOME is set to the base directory of the Android SDK.
2. Make sure the Android build tools are in your path, these might be located at $ANDROID_HOME/build-tools/$VERSION/
3. Generate your signing key using `keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias`
4. ./build.sh
