import {InBrainNativeSurvey} from 'inbrain-surveys';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Points, Rank, Time, ActivityWithOverlay} from '../common';
import {mScale} from '../utils/metrics';

import {useInbrain} from '../context/inbrainContext';
import {useReward} from '../context/RewardContext';

import {InBrainSurveyCategory} from 'inbrain-surveys';

const NativeSurveysList = () => {
  const inbrain = useInbrain();
  const {reward} = useReward();

  const [nativeSurveysState, setNativeSurveysState] = useState<
    InBrainNativeSurvey[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  }, []);

  useEffect(() => {
    /**
     * Add setOnSurveysCloseLister event listener
     */
    let subscription = inbrain?.setOnSurveysCloseLister(() => {
      console.log('[refresh surveys] => ');
      setIsLoading(true);
      getNativeSurveys();
    });

    return () => {
      subscription?.remove();
    };
  }, [reward]);

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
        setIsLoading(false);
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
    <SafeAreaView style={styles.container}>
      <ActivityWithOverlay show={isLoading} />
      {nativeSurveysState.length === 0 && !isLoading && (
        <View style={styles.activityContainer}>
          <Text>Ooops... No surveys available right now!</Text>
        </View>
      )}
      <View style={styles.flex}>
        <FlatList
          refreshing={true}
          data={nativeSurveysState}
          renderItem={({item}) => (
            <NativeSurvey survey={item} onPress={onPressShowNativeSurvey} />
          )}
          numColumns={2}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default NativeSurveysList;

/**
 * Button in the action lise
 */
const NativeSurvey = ({survey, onPress}: NativeSurveyProps) => {
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
              onPress={() => onPress(survey)}>
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
    backgroundColor: '#eeeeee',
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
  surveysGrid: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  surveyView: {
    height: 170,
    flex: 1,
    paddingTop: mScale(10),
    justifyContent: 'space-between',
    paddingHorizontal: mScale(5),
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
    backgroundColor: '#eeeeee',
    padding: 4,
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
});
