/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import inbrain, { InBrainReward, InitOptions } from 'inbrain-surveys';
import {CLIENT_ID,CLIENT_SECRET,USER_ID,SESSION_UID} from 'react-native-dotenv';

const BridgeButton = (props: {name: String, onPress: () => {} }) => {
  return <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.name}</Text>
  </TouchableOpacity>;
}

type ComponentState = {rewards: InBrainReward[], logs: String[]};
type ComponentProps = {};

type SdkMethod = () => Promise<any>;


export default class App extends Component<ComponentProps, ComponentState> {

  constructor(props: ComponentState) {

    super(props);

    this.state = {rewards: [], logs: []};
  }

  callBridge = <T extends {}>(name: String, sdkMethod: SdkMethod, successCallback?: (r: T) => void) => () => {
    return sdkMethod().then((result) => {
      successCallback && successCallback(result);
      this.appendLog(`[${name} SUCCESS] => ${result}`);
    }).catch( (err: any) => {
      this.appendLog(`[${name} ERROR] => ${err.message || err}`);
    });
  };

  // Convenient 'setRetults' callbacks for 'callBridge'
  void = (obj: any) => {};
  setRewards = (rewards: InBrainReward[]) => this.setState({rewards});
  appendLog = (log: String) => this.setState({ logs: this.state.logs.concat(log)});

  componentDidMount = () => {
    const clientId = CLIENT_ID;
    const clientSecret = CLIENT_SECRET;

    // Init 
    const options: InitOptions = {
      sessionUid: SESSION_UID, 
      userId: USER_ID, 
      dataPoints: { gender: 'male', age: '25'},
      title: "NEW TITLE",
      navbarColor: "#ff0000",
      production: false
    };
    this.callBridge('init', () => inbrain.init(clientId, clientSecret, options) )();   

    // OnClose listener
    inbrain.setOnCloseListener(() => this.appendLog(`[onClose SUCCESS] => `));
    inbrain.setOnCloseListenerFromPage(() => this.appendLog(`[onCloseFromPage SUCCESS] => `));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

      <View>
        <Text style={styles.title}>SDK Methods</Text>
        <View style={styles.buttonsContainer}>
          <View style={{flexGrow:1, margin: 2}}>
            <BridgeButton name="getRewards" onPress={this.callBridge("getRewards", () => inbrain.getRewards(), this.setRewards)} />
            <BridgeButton name="confirmRewards" onPress={this.callBridge("confirmRewards", () => inbrain.confirmRewards(this.state.rewards) )} />
            <BridgeButton name="showSurveys" onPress={this.callBridge("showSurveys", () => inbrain.showSurveys() )} />
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Rewards</Text>

        {this.state.rewards.map((r,i) => (
          <Text style={styles.message} key={r.transactionId}>
            [ Reward {i} ] id={r.transactionId} / amount={r.amount} / currency={r.currency} / transactionType={r.transactionType}
          </Text>
        ))}
      </View>

      <Text style={styles.title}>Logs</Text>
      <ScrollView style={{ flexGrow: 1 }}>
        {this.state.logs.map((m, i) => (
          <Text style={styles.message} key={i}>
            {m}
          </Text>
        ))}
      </ScrollView>

    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    margin: 30,
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  message: {
    fontSize: 10,
    textAlign: 'left'
  },
  buttonsContainer: {
    alignContent: 'center',
    flexDirection: 'row'
  },
  buttonContainer: {
    backgroundColor: '#2196F3',
    margin: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
});


