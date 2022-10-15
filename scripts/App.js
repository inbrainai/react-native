/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { Component } from 'react';
 import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
 import inbrain from 'inbrain-surveys';
 import { CLIENT_ID, CLIENT_SECRET, USER_ID, SESSION_UID } from '@env';
 
 const BridgeButton = (props) => {
   return <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
     <Text style={styles.buttonText}>{props.name}</Text>
   </TouchableOpacity>;
 }
 
 export default class App extends Component {
 
   constructor(props) {
     super(props);
     this.state = { rewards: [], nativeSurveys: [], logs: [] };
   }
 
   callBridge = (name, sdkMethod, successCallback) => () => {
     console.log(`Call Bridge Method: ${name}`);
 
     sdkMethod().then((result) => {
       console.log(result);
       successCallback && successCallback(result);
       this.appendLog(`[${name} SUCCESS] => ${result}`);
     }).catch((err) => {
       console.log('Error: ' + err);
       this.appendLog(`[${name} ERROR] => ${err.message || err}`);
     });
   };
 
   // Convenient callback methods
   setRewards = (rewards) => this.setState({ rewards });
   setNativeSurveys = (nativeSurveys) => this.setState({ nativeSurveys });
   appendLog = (log) => this.setState({ logs: this.state.logs.concat(log) });
 
   componentDidMount = () => {
 
     const clientId = CLIENT_ID;
     const clientSecret = CLIENT_SECRET;
 
     // Init 
     const options = {
       sessionUid: SESSION_UID,
       userId: USER_ID,
       dataPoints: { gender: 'male', age: '25' },
       language: 'fr-fr',
       isS2S: false,
       statusBar: {
         lightStatusBar: false
       },
       navigationBar: {
         backgroundColor: "#2784B6",
         buttonsColor: "#E7F722",
         titleColor: "#FF0404",
         hasShadow: false,
       },
 
     };
 
     this.callBridge('init', () => inbrain.init(clientId, clientSecret, options))();
 
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
             <View style={{ flexGrow: 1, margin: 2 }}>
               <BridgeButton name="getRewards" onPress={this.callBridge("getRewards", () => inbrain.getRewards(), this.setRewards)} />
               <BridgeButton name="confirmRewards" onPress={this.callBridge("confirmRewards", () => inbrain.confirmRewards(this.state.rewards))} />
               <BridgeButton name="showSurveys" onPress={this.callBridge("showSurveys", () => inbrain.showSurveys())} />
               <BridgeButton name="checkSurveysAvailable" onPress={this.callBridge("checkSurveysAvailable", () => inbrain.checkSurveysAvailable())} />
               <BridgeButton name="getNativeSurveys" onPress={this.callBridge("getNativeSurveys", () => inbrain.getNativeSurveys(), this.setNativeSurveys)} />
               <BridgeButton name="showNativeSurvey" onPress={this.callBridge("showNativeSurvey", () => inbrain.showNativeSurvey("this.state.nativeSurveys[3].id", "a"))} />
               <BridgeButton name="setSessionParameters" onPress={this.callBridge("setSessionParameters", () => inbrain.setSessionParameters("newSessionId", {}))} />
             </View>
           </View>
         </View>
         <View>
           <Text style={styles.title}>Rewards</Text>
           {this.state.rewards.map((r, i) => (
             <Text style={styles.message} key={r.transactionId}>
               [ Reward {i} ] id={r.transactionId} / amount={r.amount} / currency={r.currency} / transactionType={r.transactionType}
             </Text>
           ))}
         </View>
 
         <ScrollView style={{ flexGrow: 1 }}>
           <Text style={styles.title}>Native Surveys</Text>
           {this.state.nativeSurveys.map((s, i) => (
             <Text style={styles.message} key={s.id}>
               [ Native Survey {i} ] id={s.id} / rank={s.rank} / time={s.time} / value={s.value} / value={''+s.currencySale} / value={s.multiplier}
             </Text>
           ))}
         </ScrollView>
 
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
 
 
 