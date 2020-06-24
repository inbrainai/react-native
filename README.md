# InBrain Surveys Example
This repository contains an example React Native application using [inbrain-surveys](https://www.npmjs.com/package/inbrain-surveys) sdk.

All the logic is done in App.jsx with the differents SDK method calls. 

## Requirements
XCode 11.2 (or higher)

node 12.4.1 (or higher)

npm 6.13.1 (or higher)

Cocoapods 1.9.2 (or higher)

## Installation
Simply run: 
`$ npm install`

## To run the app:

### iOS
Go to the `ios/` folder and run `pod install`. Then, open the `ios` folder in XCode.

Set the framework 'Target Membership' to `inbrain-surveys` as below:

![Framework Target Membership](https://i.ibb.co/N2ntq0P/target-membership.png)

### Android
Simply run:
```
npm run android
```

## Change the credentials
The application comes with a set of hardcoded test credentials. You can change the test credentials by modifying the variables `CLIENT_ID` and `CLIENT_SECRET` in App.tsx.

Please note that if you are testing on iOS, you will need to modify the Info.plist. Look for the `InBrain` dictionnary and the `client` key under it.

![Framework Target Membership](https://i.ibb.co/MPSfzcd/infoplist.png)




