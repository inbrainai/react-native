/**
 * Reward interface
 */
export type InBrainReward = {
    transactionId: number;
    amount: number;
    currency: string;
    transactionType: number;
}

/**
 * Native Surveys interface
 */
export type InBrainNativeSurveys = {
    id: string;
    rank: number;
    time: number;
    value: number;
    currencySale: boolean;
    multiplier: number;
}
