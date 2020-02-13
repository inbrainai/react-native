# InBrain Surveys
Survey library to monetize your mobile app, provided by inBrain.ai

## Installation

`$ npm install inbrain-surveys --save`

#### If you are using react <0.60.0

The module has to be manually linked using:
`$ react-native link inbrain-surveys`

#### Extra steps iOS
Run `$ pod install` in the ios/ folder

Visit your app’s ***Target*** in the Project Settings and Choose the ***General*** tab.
Scroll down until you hit the ***Frameworks, Libraries, Embedded Contents*** section 
1) Press ‘+’, Add Other and Add files...
2) Select the **InBrainSurveys_SDK_Swift.xcframework** in your project 'nodes_modules/inbrain-surveys/ios/Frameworks' folder
3) Confirm

Configure your info.plist as specified [here](https://github.com/inBrainSurveys/InBrainSurveys_SDK_Swift/blob/master/README.md#configuration)


## Usage
```javascript
import inbrain from 'inbrain-surveys';
```
Available functions:
#### Initialise the SDK
```javascript
inbrain.init(clientId: string, secretId: string)
```
* `clientId` The client ID obtained from your account manager (NOT USED ON iOS, use info.plist instead)
* `clientSecret` The client secret obtained from your account manager.

#### Set the app user identifier
```javascript
inbrain.setAppUserId(userId: string)
```
* `clientId` The user identifier (usually an email)

#### Show the surveys webview
```javascript
inbrain.showSurveys()
```

#### Get the rewards
```javascript
inbrain.getRewards() (Useful for server less app)
```

#### Confirm a list of rewards
```javascript
inbrain.confirmRewards(rewards: InBrainReward[]) (Useful for server less app)
```
* `rewards` List of rewards to confirm

#### On webview dismissed
```javascript
inbrain.setOnCloseListener(callback: () => void) 
```
* `callback` callback to perform when it happens

### Only supported on iOS
#### Set the webview title
```javascript
inbrain.setTitle(title: string)
```
* `title` The title to display

#### Set the webview navbar color
```javascript
inbrain.setNavbarColor(color: string)
```
* `color` hexadecimal string color (e.g #ff0000)

#### Set the webview button color
```javascript
inbrain.setButtonColor(color: string)
```
* `color` hexadecimal string color (e.g #ff0000)

## Development
### Build
To install and build locally, pull the repository.
Run 
```
npm install 
npm run build 
npm run start 
```

You can alternatively run `npm run watch` instead of `npm run build` if you want live reload.

### Example App
The example application is located in the `example/` folder. If you would like to run it locally, edit `example/App.tsx` and set your credentials in the `componentDidMount` method.

### To run the ios example
Modify the `info.plist` with your credentials (see installation above) and then run:
```
npm run ios:dev
```

### To run the ios example
Simply run:
```
npm run ios:android
```

