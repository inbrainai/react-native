import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class ActionList extends PureComponent<ActionListProps> {
  render() {
    return (
      <View style={styles.actionContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageFloatingLady}
            source={require('../assets/FloatingWoman.png')}
          />
        </View>
        <View style={styles.flex}>
          <ActionButton
            text="Open Survey Wall"
            onPress={this.props.onClickShowSurveys}
          />
          <ActionButton
            text="Show Native Surveys"
            onPress={this.props.onClickShowNativeSurveys}
          />
        </View>
      </View>
    );
  }
}

/**
 * Button in the action lise
 */
function ActionButton(props: ActionButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.actionButtons}>
        <ImageBackground
          source={require('../assets/OrangeButton.png')}
          resizeMode={'stretch'}
          style={styles.imageBackground}>
          <View style={styles.textButton}>
            <Text style={styles.button}>{props.text}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

type ActionButtonProps = {
  onPress: () => void;
  text: string;
};

/**
 * Component props
 */
type ActionListProps = {
  onClickShowSurveys: () => void;
  onClickShowNativeSurveys: () => void;
};

/**
 * Styles in JS
 */
const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 35,
    marginRight: 35,
    marginTop: 50,
    justifyContent: 'center',
  },
  textButton: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
  },
  button: {
    width: '100%',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  imageContainer: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  imageFloatingLady: {
    height: 120,
    resizeMode: 'contain',
  },
  actionButtons: {
    flexDirection: 'column',
    height: 80,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  flex: {
    flex: 1,
  },
  actionContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
});
