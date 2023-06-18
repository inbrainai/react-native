import {InBrainNativeSurvey} from 'inbrain-surveys';
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Points from './common/Points';
import Rank from './common/Rank';
import Time from './common/Time';

import {mScale} from './utils/metrics';

export default class NativeSurveysList extends PureComponent<NativeSurveysListProps> {
  render() {
    if (this.props.nativeSurveys.length === 0) {
      return (
        <View style={styles.noSurveysContainer}>
          {!this.props.isLoading && (
            <Text>No Surveys available at the moment</Text>
          )}
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.flex} style={styles.flex}>
        {this.props.nativeSurveys.map(survey => (
          <View key={survey.id} style={styles.surveysGrid}>
            <NativeSurvey
              key={survey.id}
              survey={survey}
              onPress={this.props.onClickShowNativeSurvey}
            />
          </View>
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
    <View style={styles.surveyView}>
      <View style={[styles.card, styles.shadow]}>
        <View style={styles.surveyBox}>
          <View style={styles.textSurveyPoints}>
            <Points
              points={survey.value}
              multiplier={survey.multiplier}
              currencySale={survey.currencySale}
            />
          </View>
          <View style={styles.rankAndTime}>
            <Rank rank={survey.rank} />
            <Time time={survey.time} />
          </View>
          <View style={styles.surveyCategoryBox}>
            {survey.namedCategories && (
              <Text style={styles.surveyCategory}>
                {survey.namedCategories[0].name}
              </Text>
            )}
          </View>
          <View style={styles.surveyActionBox}>
            <TouchableOpacity
              style={styles.takeSurveyBtn}
              onPress={() => props.onPress(survey)}>
              <Text
                adjustsFontSizeToFit
                allowFontScaling
                numberOfLines={1}
                style={styles.takeSurveyBtnText}>
                Start Survey
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

type NativeSurveyProps = {
  survey: InBrainNativeSurvey;
  onPress: (survey: InBrainNativeSurvey) => void;
};

/**
 * Component props
 */
type NativeSurveysListProps = {
  nativeSurveys: InBrainNativeSurvey[];
  isLoading: boolean;
  onClickShowNativeSurvey: (survey: InBrainNativeSurvey) => void;
};

/**
 * Styles in JS
 */
const styles = StyleSheet.create({
  surveyView: {
    height: 180,
    flexDirection: 'column',
    paddingTop: mScale(10),
    paddingHorizontal: mScale(10),
    width: '100%',
  },
  surveysGrid: {
    flexBasis: '50%',
    alignItems: 'center',
  },
  surveyBox: {
    alignItems: 'center',
    height: '100%',
    paddingTop: mScale(20),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: mScale(10),
    width: '100%',
    alignSelf: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.34,
    shadowRadius: 0.2,
    elevation: 10,
  },
  flex: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
  },
  noSurveysContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSurveyPoints: {
    flex: 1.2,
  },
  surveyCategoryBox: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyCategory: {
    color: '#47a3dc',
    fontSize: 15,
    fontWeight: '400',
  },
  rankAndTime: {
    flexDirection: 'row',
    flex: 1,
  },
  surveyActionBox: {
    flex: 3,
    width: '90%',
    justifyContent: 'center',
  },
  takeSurveyBtn: {
    padding: mScale(6),
    width: '100%',
    // maxWidth: 150,
    borderRadius: 20,
    backgroundColor: '#02a4ed',
    textAlign: 'center',
  },
  takeSurveyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
