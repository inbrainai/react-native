# InBrain Surveys Example
This repository contains an example React Native application using [inbrain-surveys](https://www.npmjs.com/package/inbrain-surveys) sdk.

All the logic is done in App.jsx with the differents SDK method calls. 

## Requirements
XCode 11.2 (or higher)
node 12.4.1 (or higher)
npm 6.13.1 (or higher)

## Installation
Simply run: 
`$ npm install`

## Run
To run the emulator.

### iOS
```
npm run ios
```

### Android
Simply run:
```
npm run android
```

## Change the credentials
The application comes with a set of hardcoded test credentials. You can change the test credentials by modifying the variables `CLIENT_ID` and `CLIENT_SECRET` in App.tsx.

Please note that if you are testing on iOS, you will need to modify the Info.plist. Look for the `InBrain` dictionnary and the `client` key under it.


