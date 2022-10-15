# InBrain Surveys
Survey library to monetize your mobile app, provided by inBrain.ai

## Requirements
This SDK is targeted to the following tools:
- XCode 12
- iOS 11.0;
- CocoaPods 1.10+
- Swift 5
- React Native >=0.63.0

## Installation

Install and link the module:

`$ npm install inbrain-surveys --save`

### Extra steps iOS

Do not forget to use Cocoapods 1.9 in your project. Handling of xcframeworks isn't well supported in the previous versions. 

Set the framework 'Target Membership' to `inbrain-surveys` as below:

![Framework Target Membership](https://i.ibb.co/N2ntq0P/target-membership.png)

### Extra steps Android
Add jitpack repository you your gradle configuration `android/build.gradle > allprojects > repositories`

```
maven { 
    url 'https://jitpack.io' 
}
```

## Usage
```javascript
import inbrain from 'inbrain-surveys';
```

For a fully functional example, please refer to this [demo app](https://github.com/inbrainai/react-native) using the SDK.

Available functions:
### Initialise the SDK
```javascript
inbrain.init(apiClientId: string, apiSecret: string, options?: InitOptions) : Promise<void>
```
* `apiClientId`: The client ID obtained from your account manager
* `apiSecret`: The client secret obtained from your account manager.
* `options`: [Optional] Options. Possible options:
    * `language`: Accepted languages: `de-de`, `en-au`, `en-ca`, `en-gb`, `en-in`, `en-us`, `es-es`, `es-mx`, `es-us`, `fr-ca`, `fr-fr`, `fr-br` (case sensitive). Default to the device's locale language.
    * `sessionUid`: Value to track each session of inBrain use from a specific userID
    * `isS2S`: If the SDK runs in Server To Server mode. Default `false`
    * `userId`: The unique string value that differentiates each user within their app when initializing inBrain (Example: an email, a username). Default `''`
    * `title`: The surveys view title. Default 'inBrain.ai Surveys'
    * `navigationBar`: The navigation bar configuration
        * `backgroundColor`: The navigation bar background color (hexadecimal string color, e.g #FF0000)
        * `buttonsColor`: The navigation bar buttons color (hexadecimal string color, e.g #E7F722)
        * `titleColor`: The navigation bar title color (hexadecimal string color, e.g #FF0404)
        * `hasShadow`: The navigation bar bottom border (boolean)
    * `statusBar`: The status bar configuration (boolean)
        * `lightStatusBar`: The status bar text and icons color (true for white, false for black). On iOS, you'll need to set `View controller-based status bar appearance` bar appearance to YES for this option to work.
    * `dataPoints`: A dictionary of keys and values to provide inBrain profiler data for custom profiler user experience (Example: `{ age : “23”, gender : “female” }`)

Note: This method need to be called prior calling all the other methods. 

### Change the session parameters
```javascript
inbrain.setSessionParameters(sessionUid: string, dataPoints: {}) : Promise<void>
```
* sessionUid the session identifiers
* dataPoints datapoints

### Show the surveys webview
```javascript
inbrain.showSurveys() : Promise<void>
```

### Get the rewards (Useful for server less app)
```javascript
inbrain.getRewards() : Promise<InBrainReward[]>
```

### Confirm a list of rewards (Useful for server less app)
```javascript
inbrain.confirmRewards(rewards: InBrainReward[]) : Promise<void>
```
* rewards: List of rewards to confirm

### Check if Native Surveys are available
```javascript
inbrain.checkSurveysAvailable() : Promise<boolean>
```

### Get the Native Surveys available
```javascript
inbrain.getNativeSurveys(placementId?: string) : Promise<InBrainNativeSurveys[]>
```
* placementId: an optional placement identifier

### Show a Native Survey
```javascript
inbrain.showNativeSurvey(id: string, placementId?: string) : Promise<void>
```
* placementId: an optional placement identifier

### On webview dismissed
```javascript
inbrain.setOnCloseListener(callback: () => void) 
```
* callback: callback to perform when it happens

Note: Calling this method multiple times will override the previous listener.

### On webview dismissed from page
```javascript
inbrain.setOnCloseListenerFromPage(callback: () => void) 
```
* callback: callback to perform when it happens

Note: Calling this method multiple times will override the previous listener.

## Troubleshoots
### [BUILD TIME] Several errors similar to `Bad receiver 'int *'`, `Unkown type name 'InBrain'`...
First check that the framework target membership is correctly set. If the problem still occurs, and you are trying to create a release build with a simulator as target (and you are using XCode 12), please add `arm64` in the Excluded Architecture of your project and 'inbrain-surveys' pods (see [this post](https://stackoverflow.com/questions/63607158/xcode-12-building-for-ios-simulator-but-linking-in-object-file-built-for-ios) for detailed information)

### [BUILD TIME] 'InBrainSurveys_SDK_Legacy/InBrainSurveys_SDK_Legacy-Swift.h' file not found
This problem usually happens if the framework is not set in the Embedded Binaries, or if the framework doesn't have the target set to `inbrain-surveys` See above for set up.
Clean and build the project after changes.

### [RUNTIME] Library not loaded: @rpath/libswiftCore.dylib
This problem can happen if your project doesn't have the Swift standard libraries included. Set the 'Always Embed Swift Standard Libraries' to yes in your target to fix it.
Clean and build the project after changes.
This problem also consistently appears when usinx XCode10

### [RUNTIME - Release scheme] dependent dylib '@rpath/InBrainSurveys_SDK_Swift.framework/InBrainSurveys_SDK_Swift' not found 
This problem happen with previous version of Cocoapods and XCode. Try updating to Cocoapods 1.10.x, and if it still doesn't work, also upgrade to XCode12

### [DEVELOPMENT] When running 'pod install' in APP: "Specs satisfying the `inbrain-surveys (from `../node_modules/inbrain-surveys`)` dependency were found, but they required a higher minimum deployment target."
 => Modify the platform version in 'APP/ios/Podfile'

 ### [DEVELOPMENT] When building in XCode: No matching function for call to 'RCTBridgeModuleNameForClass' 
Update from RN0.62 to RN0.63

 ### [DEVELOPMENT] When building in XCode: problem with not finding switch libraries
https://github.com/facebook/react-native/issues/31733#issuecomment-931824830
