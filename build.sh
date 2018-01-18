#!/usr/bin/env bash
ionic cordova build android --prod --release && \
cp platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk unsigned.apk && \
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks unsigned.apk my-alias && \
zipalign -v 4 unsigned.apk uglydice.apk
