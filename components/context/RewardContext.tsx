import {createContext, useContext} from 'react';

export type RewardContextType = {
  reward: number;
  setReward: (reward: number) => void;
};

export const RewardContext = createContext<RewardContextType>({
  reward: 0,
  setReward: () => {},
});

export const useReward = () => {
  const reward = useContext(RewardContext);
  if (reward === undefined) {
    throw new Error('useReward must be used within a RewardContext.Provider');
  }
  return reward;
};
