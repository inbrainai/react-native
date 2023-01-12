import {InBrainNativeSurvey, Category} from 'inbrain-surveys';
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class NativeSurveysList extends PureComponent<NativeSurveysListProps> {
  render() {
    return (
      <ScrollView style={{flex: 1}}>
        {this.props.nativeSurveys.map(survey => (
          <NativeSurvey
            key={survey.id}
            survey={survey}
            onPress={this.props.onClickShowNativeSurvey}
          />
        ))}
      </ScrollView>
    );
  }
}

/**
 * Button in the action lise
 */
function NativeSurvey(props: NativeSurveyProps) {
  const survey = props.survey;
  return (
    <TouchableOpacity onPress={() => props.onPress(survey)}>
      <View style={styles.surveyView}>
        <ImageBackground
          source={require('../assets/NativeSurveysButton.png')}
          resizeMode={'cover'}
          style={styles.imageBackground}>
          <View style={styles.textSurvey}>
            <Text
              style={
                styles.textSurveyDuration
              }>{`${survey.time} minutes`}</Text>
            <View>
              <Text
                style={
                  styles.textSurveyPoints
                }>{`${survey.value} points`}</Text>
              <Text
                style={
                  styles.textSurveyData
                }>{`Currency sale: ${survey.currencySale}`}</Text>
              <Text
                style={
                  styles.textSurveyData
                }>{`Multipler: ${survey.multiplier}`}</Text>
              <Text
                style={
                  styles.textSurveyData
                }>{`Conversion: ${survey.conversionLevel.name}`}</Text>
              <Text
                  style={
                    styles.textSurveyData
                  }>{`ID: ${survey.id}`}</Text>
              <MapCategories categories={survey.namedCategories} />
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

function MapCategories(props: NativeSurveyCategoriesProps) {
  let categoriesList = props.categories
    .map(category => category.name)
    .join(', ');
  return (
    <Text
      style={styles.textSurveyData}>{`Categories: ${categoriesList} `}</Text>
  );
}

type NativeSurveyProps = {
  survey: InBrainNativeSurvey;
  onPress: (survey: InBrainNativeSurvey) => void;
};

type NativeSurveyCategoriesProps = {
  categories: Category[];
};

/**
 * Component props
 */
type NativeSurveysListProps = {
  nativeSurveys: InBrainNativeSurvey[];
  onClickShowNativeSurvey: (survey: InBrainNativeSurvey) => void;
};

/**
 * Styles in JS
 */
const styles = StyleSheet.create({
  surveyView: {
    height: 100,
    flexDirection: 'column',
  },
  imageBackground: {
    width: '100%',
  },
  textSurvey: {
    flexDirection: 'row',
    height: '100%',
    marginLeft: 60,
    marginRight: 60,
    alignItems: 'center',
  },
  textSurveyDuration: {
    textAlign: 'left',
    flex: 1,
    fontWeight: 'bold',
  },
  textSurveyPoints: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#47a3dc',
  },
  textSurveyData: {
    textAlign: 'right',
    fontSize: 7,
  },
});
