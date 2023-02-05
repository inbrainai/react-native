import {InBrainNativeSurvey, Category} from 'inbrain-surveys';
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default class NativeSurveysList extends PureComponent<NativeSurveysListProps> {
  render() {
    return (
      <ScrollView style={styles.flex}>
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
        <View style={[styles.card, styles.shadow]}>
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
              {survey.namedCategories && (
                <MapCategories categories={survey.namedCategories} />
              )}
            </View>
          </View>
        </View>
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
      numberOfLines={2}
      style={styles.textSurveyData}>{`Categories: ${categoriesList}`}</Text>
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
  textSurvey: {
    flexDirection: 'row',
    height: '100%',
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
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  surveyIngo: {
    flex: 2,
  },
  flex: {
    flex: 1,
  },
});
