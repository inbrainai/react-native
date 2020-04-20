# InBrain Surveys Example
This repository contains an example React Native application using [inbrain-surveys](https://www.npmjs.com/package/inbrain-surveys) sdk.

All the logic is done in App.jsx with the differents SDK method calls. 

## Installation

Simply run: 
`$ npm install`

Then modify the .env file with your client identifier, secret and user id. 

#### Extra steps iOS
Run `$ pod install` in the ios/ folder
Edit your info.plist and set the value of InBrain > client to your client identifier.

## Run

### iOS
```
npm run ios
```

### Android
Simply run:
```
npm run android
```

