import React, {useEffect, useState} from 'react';
import Navigator from './components/navigation/Navigator';
import {InbrainContext} from './components/context/InbrainContext';
import {RewardContext} from './components/context/RewardContext';
import inbrain, {StatusBarConfig, NavigationBarConfig} from 'inbrain-surveys';

const App = () => {
  const [reward, setReward] = useState(0);

  useEffect(() => {
    // To test with Your account - replace the credentials below
    const CLIENT_ID = '852dd4b7-1d05-4803-a1e3-037d0fcfe18f';
    const CLIENT_SECRET =
      'nd7Urn+w0vgjdgOYu2k751mQp7p8tCuFWHrDZZzmIK6cXNXKLHacaU6zPeMu8Eql62ijn/m+guTybj0bCspkdA==';
    const USER_ID = 'RNSDKTestUser';

    // Init the sdk (required)
    inbrain.setInBrain(CLIENT_ID, CLIENT_SECRET);

    /***** Optional methods *****/

    // Set or change userID (can be set in setInBrain, or using this method)
    inbrain.setUserID(USER_ID);
    //Set user session ID
    inbrain.setSessionID('newSessionId');

    /***** UI customization *****/

    // Customize statusBar.
    const statusBarConfig: StatusBarConfig = {
      lightStatusBar: true,
      statusBarColor: '#EAAAAA', // Android only option, have no effect at iOS.
    };
    inbrain.setStatusBarConfig(statusBarConfig);

    // Customize navigationBar
    const navigationBarConfig: NavigationBarConfig = {
      title: 'inBrain.ai Surveys',
      backgroundColor: '#EAAAAA',
      titleColor: '#222AAA',
      buttonsColor: '#ABCDEF',
      hasShadow: false,
    };

    inbrain.setNavigationBarConfig(navigationBarConfig);
  }, []);

  return (
    <InbrainContext.Provider value={inbrain}>
      <RewardContext.Provider value={{reward, setReward}}>
        <Navigator />
      </RewardContext.Provider>
    </InbrainContext.Provider>
  );
};

export default App;
