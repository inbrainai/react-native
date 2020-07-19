
# inBrain Surveys Example
This repository contains an example React Native application using [inbrain-surveys](https://www.npmjs.com/package/inbrain-surveys) sdk.

All the logic is done in `App.jsx` with the differents SDK method calls. 

## Requirements
This SDK is targeted to the following tools:
- XCode 11.4
- CocoaPods 1.9
- Swift 5
- React Native >=0.60.0

## Installation
Simply run: 
`$ npm install`

## To run the app:

### iOS
Go to the `ios/` folder and run `pod install`. Then, open the `ios` folder in XCode.

Set the framework 'Target Membership' to `inbrain-surveys` as below:

![Framework Target Membership](https://i.ibb.co/N2ntq0P/target-membership.png)

Run the application from XCode or from the command line using `npm run android`

### Android
Simply run:
```
npm run android
```

## Change the credentials
The application comes with a set of hardcoded test credentials. You can change the test credentials by modifying the variables `CLIENT_ID` and `CLIENT_SECRET` in `App.tsx`.


