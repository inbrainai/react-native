# InBrain Surveys Example
This repository contains an example React Native application using [inbrain-surveys](https://www.npmjs.com/package/inbrain-surveys) sdk.

All the logic is done in App.jsx with the differents SDK method calls. 

## Installation

Simply run: 
`$ npm install`

Then modify the .env file with your client identifier, secret and user id. 

#### Extra steps iOS
Run `$ pod install` in the ios/ folder

Visit your app’s ***Target*** in the Project Settings and Choose the ***General*** tab.
Scroll down until you hit the ***Frameworks, Libraries, Embedded Contents*** section 
1) Press ‘+’, Add Other and Add files...
2) Select the **InBrainSurveys_SDK_Swift.xcframework** in your project 'nodes_modules/inbrain-surveys/ios/Frameworks' folder
3) Confirm

Configure your info.plist as specified [here](https://github.com/inBrainSurveys/InBrainSurveys_SDK_Swift/blob/master/README.md#configuration)


## Run

### iOS
Do not forget to modify the `info.plist` with your credentials and settings (see Installation above) and then run:
```
npm run ios
```

### Android
Simply run:
```
npm run android
```

