import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {useReward} from './context/RewardContext';

type ActionListProps = {
  onClickShowSurveys: () => void;
  onClickShowNativeSurveys: () => void;
};

const ActionList = ({
  onClickShowSurveys,
  onClickShowNativeSurveys,
}: ActionListProps) => {
  const [isPortrait, setIsPortrait] = useState<boolean>();
  const {reward} = useReward();

  /**
   * Returns true if the screen is in portrait mode
   */
  const isPortraitOrientation = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  useEffect(() => {
    setIsPortrait(isPortraitOrientation());
    let orientationListener = Dimensions.addEventListener('change', () => {
      setIsPortrait(isPortraitOrientation());
    });

    return () => {
      orientationListener.remove();
    };
  }, []);

  return (
    <View
      style={[
        styles.actionContainer,
        !isPortrait && !Platform.isPad ? styles.row : {},
      ]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageFloatingLady}
          source={require('../assets/FloatingWoman.png')}
        />
      </View>
      <View style={styles.flex}>
        <ActionButton text="Open Survey Wall" onPress={onClickShowSurveys} />
        <ActionButton
          text="Show Native Surveys"
          onPress={onClickShowNativeSurveys}
        />
        <Text style={styles.points}>Total Points: {reward}</Text>
      </View>
    </View>
  );
};

export default ActionList;

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

const styles = StyleSheet.create({
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
    height: 160,
    resizeMode: 'contain',
  },
  actionButtons: {
    flexDirection: 'column',
    height: 80,
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
    alignSelf: 'center',
    maxWidth: 550,
  },
  flex: {
    flex: 1,
    // justifyContent: 'space-around',
    justifyContent: 'center',
  },
  actionContainer: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  points: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#47a3dc',
    textAlign: 'center',
  },
});
