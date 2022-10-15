/**
 * SDK OPTIONS
 */
export type ConfigOptionName = "isS2S" | "userId" | "sessionUid" | "dataPoints";
export type StylingOptionName = "title" | "language" | "navigationBar" | "statusBar";
export type NavigationBarOptionName = "backgroundColor" | "buttonsColor" | "titleColor" | "hasShadow";
export type StatusBarOptionName = "lightStatusBar";

// *** CONFIG OPTION TYPE
export type ConfigOptionTypes = {
    isS2S: boolean,
    sessionUid: string,
    userId: string,
    dataPoints: DataPoints,
}
export type ConfigOptions = { [opt in ConfigOptionName]?: ConfigOptionTypes[opt] }

// *** NAVIGATION BAR OPTION TYPE
export type NavigationBarOptionType = {
    backgroundColor?: string,
    buttonsColor?: string,
    titleColor?: string,
    hasShadow?: boolean
};
export type NavitagionBarOptions = { [opt in NavigationBarOptionName]?: NavigationBarOptionType[opt] }

// *** STATUS BAR OPTION TYPE
export type StatusBarOptionType = {
    lightStatusBar?: boolean,
    //statusBarColor?: string,
};
export type StatusBarOptions = { [opt in StatusBarOptionName]?: StatusBarOptionType[opt] }


// *** STYLING OPTION TYPE
export type StylingOptionType = {
    language?: String
    title?: String
    navigationBar?: NavigationBarOptionType
    statusBar?: StatusBarOptionType
};
export type StylingOptions = { [opt in StylingOptionName]?: StylingOptionType[opt] }


// *** GLOBAL OPTIONS
export type InitOptionName = ConfigOptionName | StylingOptionName;
export type InitOptions = ConfigOptions & StylingOptions;

/**
 * Option: Data points
 */
export type DataPoints = { [key: string]: string };
