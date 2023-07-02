import {createContext, useContext} from 'react';
import {
  InitOptions,
  InBrainReward,
  InBrainSurveyFilter,
  DataPoints,
  StatusBarConfig,
  NavigationBarConfig,
  OnCloseSurveysData,
  InBrainNativeSurvey,
} from 'inbrain-surveys';

type InbrainContextType = {
  setInBrain: (
    apiClientId: string,
    apiSecret: string,
    userId?: string | undefined,
  ) => void;
  setUserID: (userID: string | undefined) => any;
  setSessionID: (sessionId: string) => any;
  setDataOptions: (dataPoints: DataPoints) => any;
  setStatusBarConfig: (config: StatusBarConfig) => void;
  setNavigationBarConfig: (config: NavigationBarConfig) => void;
  setOnSurveysCloseLister: (
    callback: (eventData: OnCloseSurveysData) => void,
  ) => void;
  checkSurveysAvailable: () => Promise<boolean>;
  showSurveys: () => Promise<void>;
  getNativeSurveys: (
    filter?: InBrainSurveyFilter | undefined,
  ) => Promise<InBrainNativeSurvey[]>;
  showNativeSurvey: (id: string, searchId: string) => Promise<void>;
  getRewards: () => Promise<InBrainReward[]>;
  confirmRewards: (rewards: InBrainReward[]) => Promise<void>;
  init: (
    apiClientId: string,
    apiSecret: string,
    opts?: InitOptions | undefined,
  ) => Promise<void>;
  setSessionParameters: (sessionUid: string, dataPoints: DataPoints) => void;
  setOnCloseListener: (callback: () => void) => void;
  setOnCloseListenerFromPage: (callback: () => void) => void;
};

export const InbrainContext = createContext<InbrainContextType | null>(null);

export const useInbrain = () => {
  const inbrainContext = useContext(InbrainContext);
  if (inbrainContext === undefined) {
    throw new Error('useInbrain must be used within a InbrainContext.Provider');
  }
  return inbrainContext;
};
