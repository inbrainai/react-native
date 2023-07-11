import {InBrainNativeSurvey} from 'inbrain-surveys';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useInbrain} from '../context/inbrainContext';
import {useReward} from '../context/RewardContext';

import {InBrainSurveyCategory, InBrainReward} from 'inbrain-surveys';

import Points from '../common/Points';
import Rank from '../common/Rank';
import Time from '../common/Time';
import {mScale} from '../utils/metrics';

const NativeSurveysList = () => {
  const inbrain = useInbrain();
  const {reward, setReward} = useReward();
  const [nativeSurveysState, setNativeSurveysState] = useState<
    InBrainNativeSurvey[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [unAvailable, setUnAvailable] = useState<boolean>(false);

  const filter = {
    placementId: undefined,
    categoryIds: [
      InBrainSurveyCategory.Automotive,
      InBrainSurveyCategory.Business,
      InBrainSurveyCategory.SmokingTobacco,
    ],
    excludedCategoryIds: [InBrainSurveyCategory.BeveragesAlcoholic],
  };

  useEffect(() => {
    getNativeSurveys();
    checkSurveysAvailable();
    // Add lister
    inbrain?.setOnSurveysCloseLister(() => {
      console.log('[setOnSurveysCloseLister SUCCESS] => ');
      getRewards();
      setIsLoading(true);
      getNativeSurveys();
    });
  }, []);

  /**
   * How to call inbrain.getRewards()
   */
  const getRewards = () => {
    inbrain
      ?.getRewards()
      .then((result: InBrainReward[]) => {
        const rewSum = result.reduce((sum, rew) => sum + rew.amount, 0);
        const points = reward + rewSum;
        setReward(points);
        console.log(`[Get rewards SUCCESS] => Adding points ${points}`);
        confirmRewards(result);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  /**
   * How to call inbrain.confirmReward()
   */
  const confirmRewards = (rewards: InBrainReward[]) => {
    inbrain?.confirmRewards(rewards).then(() => {
      console.log('[Confirm rewards SUCCESS]');
    });
  };

  /**
   * How to call inbrain.checkSurveysAvailable()
   */

  const checkSurveysAvailable = () => {
    inbrain
      ?.checkSurveysAvailable()
      .then((available: boolean) => {
        available && getNativeSurveys();
        setUnAvailable(!available);
      })
      .catch((err: Error) => {
        console.log(`[Check Surveys Available ERROR] => ${err.message || err}`);
      });
  };

  /**
   * How to call inbrain.getNativeSurveys()
   */
  const getNativeSurveys = () => {
    inbrain
      ?.getNativeSurveys(filter)
      .then((nativeSurveys: InBrainNativeSurvey[]) => {
        setNativeSurveysState(nativeSurveys);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  /**
   * How to call inbrain.showNativeSurvey(id: string, searchId: string)
   */
  const onPressShowNativeSurvey = (nativeSurvey: InBrainNativeSurvey) => {
    inbrain
      ?.showNativeSurvey(nativeSurvey.id, nativeSurvey.searchId)
      .then(() => {
        console.log('[Show Native Surveys SUCCESS]');
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={[styles.activityContainer]}>
          <ActivityIndicator />
        </View>
      )}
      {unAvailable && (
        <View style={[styles.activityContainer]}>
          <Text>No surveys available at the moment</Text>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.flex} style={styles.flex}>
        {nativeSurveysState.map(survey => (
          <View key={survey.id} style={styles.surveysGrid}>
            <NativeSurvey
              key={survey.id}
              survey={survey}
              onPress={onPressShowNativeSurvey}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NativeSurveysList;

/**
 * Button in the action lise
 */
const NativeSurvey = (props: NativeSurveyProps) => {
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
};

type NativeSurveyProps = {
  survey: InBrainNativeSurvey;
  onPress: (survey: InBrainNativeSurvey) => void;
};

/**
 * Styles in JS
 */
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flex: 1,
  },
  activityContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 99,
    elevation: 99,
  },
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
    flex: 2,
    paddingTop: mScale(10),
  },
  surveyCategoryBox: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
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
  surveyCategory: {
    color: '#47a3dc',
    fontSize: 15,
    fontWeight: '400',
  },
  takeSurveyBtn: {
    padding: mScale(6),
    width: '100%',
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
  headerContainer: {
    height: 110,
    // flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  title: {
    marginTop: 30,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
