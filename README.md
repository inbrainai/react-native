
# inBrain Surveys Example
This repository contains an example React Native application using [inbrain-surveys](https://www.npmjs.com/package/inbrain-surveys) sdk.

All the logic is done in `App.jsx` with the differents SDK method calls. 

## Requirements
This SDK is targeted to the following tools:
- XCode 12
- iOS 11.0;
- CocoaPods 1.10+
- Swift 5
- React Native >=0.63.0

## Installation
Simply run: 
`$ npm install`

## To run the app:

### iOS
Go to the `ios/` folder and run `pod install`. Then, open the `/ios/InbrainReactNativeExample.xcworkspace` folder in XCode.

Run the application from XCode or from the command line using `npm run ios`

### Android
Simply run:
```
npm run android
```

## Change the credentials
The application comes with a set of hardcoded test credentials. You can change the test credentials by modifying the variables `CLIENT_ID` and `CLIENT_SECRET` in `App.tsx`.

## Generate builds:

### Android
Follow the installation instructions. Go to the `android/` folder and run `./gradlew clean && gradlew assembleRelease`
The apk will be generated at `android/app/build/outputs/apk/release/app-release.apk` and is signed using a self-signed certificate.
