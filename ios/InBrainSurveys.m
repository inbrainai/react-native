#import "InBrainSurveys.h"
#import <InBrainSurveys_SDK_Swift/InBrainSurveys_SDK_Swift-Swift.h>

@implementation InBrainSurveys

// ***********************************
// ***** UIVIEWCONTROLER methods *****
// ***********************************
- (instancetype)init
{
    self = [super init];
    self.inbrain = [InBrain shared];
    [self.inbrain setInBrainDelegate:self];
    return self;
}

// *********************************
// ***** RN BRIDGE methods  ********
// *********************************

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return NO;  // only do this if your module initialization relies on calling UIKit!
}

// ***********************
// ***** SET INBRAIN *****
// ***********************
RCT_EXPORT_METHOD(setInBrain:(NSString *)apiClientId apiSecret:(nonnull NSString *)apiSecret isS2S:(BOOL)isS2S userId:(nonnull NSString *)userId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        
        [self notNull:@"apiClientId" toCheck:apiClientId];
        [self notNull:@"apiSecret" toCheck:apiSecret];
        [self notNull:@"userId" toCheck:userId];

        [self.inbrain setInBrainWithApiClientID:apiClientId apiSecret:apiSecret isS2S:isS2S userID:userId];

        // Resolve
        resolve(nil);
    }
    @catch (NSException *error) {
        reject(@"ERR_SET_INBRAIN", error.description, nil);
    }
}

// **********************************
// ***** SET INBRAIN VALUES FOR *****
// **********************************
RCT_EXPORT_METHOD(setInBrainValuesFor:(NSString *)sessionId data:(NSDictionary *)data resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {

        // Convert map to array of single entry maps
        // e.g {age: 25, gender: male} will become [{age: 25}, {gender: male}]
        NSArray* keys=[data allKeys];
        NSMutableArray *mapped = [NSMutableArray arrayWithCapacity:[keys count]];

        [keys enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
            [mapped addObject:@{ obj : [data objectForKey:obj]}];
        }];

        [self.inbrain setInBrainValuesForSessionID:sessionId dataOptions:mapped];

        // Resolve
        resolve(nil);
    }
    @catch (NSException *error) {
        reject(@"ERR_SET_INBRAIN_VALUES", error.description, nil);
    }
}

// ************************
// ***** SHOW SURVEYS *****
// ************************
RCT_EXPORT_METHOD(showSurveys:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    
    // This requires the main thread
    dispatch_async(dispatch_get_main_queue(), ^{
    
        @try {
            [self.inbrain showSurveysFrom:NULL];
            resolve(nil);
        }
        @catch (NSException *error) {
            reject(@"ERR_SHOW_SURVEYS", error.description, nil);
        }
    });
    
}

// ************************
// ***** GET REWARDS ******
// ************************
RCT_EXPORT_METHOD(getRewards:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        [[InBrain shared] getRewardsWithSuccess:^(NSArray<InBrainReward *> * rewards){
            NSMutableArray *rewardList = [NSMutableArray array];
            for(int i = 0; i < rewards.count; i++) {

                // ENHANCE
                // The mapping seems to be necessary. Resolving the promise directly with 'rewards' array doesn't work
                // The result on the RN side is an array with null elements...
                 NSObject* o = @{@"transactionId": [NSNumber numberWithLong:rewards[i].transactionId], @"currency": rewards[i].currency, @"amount": [NSNumber numberWithDouble:rewards[i].amount], @"transactionType": [NSNumber numberWithFloat:rewards[i].transactionType]};

               [rewardList addObject:o];
            }


            resolve(rewardList);
        } failed:^(NSError * error){
            reject(@"ERR_GET_REWARDS", error.localizedDescription, error);
        }];
    }
    @catch (NSException *error) {
        reject(@"ERR_GET_REWARDS", error.description, nil);
    }

}

// ***********************************
// ***** CHECK SURVEYS AVAILABLE *****
// ***********************************
RCT_EXPORT_METHOD(checkSurveysAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    
    @try{

        [[InBrain shared] checkForAvailableSurveysWithCompletion:^(BOOL available, NSError * error) {
            if(error) reject(@"ERR_CHECK_SURVEYS_AVAILABLE", error.localizedDescription, nil);
            else resolve(@(available));
        }];

    }
    @catch (NSException *error) {
        reject(@"ERR_CHECK_SURVEYS_AVAILABLE", error.description, nil);
    }
}

// *******************************
// ***** GET NATIVE SURVEYS ******
// *******************************
RCT_EXPORT_METHOD(getNativeSurveys:(NSString * _Nullable)placementId resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        [[InBrain shared] getNativeSurveysWithPlacementID:placementId success:^(NSArray<InBrainNativeSurvey *> * surveys){
            NSMutableArray *surveyList = [NSMutableArray array];
            for(int i = 0; i < surveys.count; i++) {

                // ENHANCE
                // The mapping seems to be necessary. Resolving the promise directly with 'surveys' array doesn't work
                // The result on the RN side is an array with null elements...
                 NSObject* o = @{@"id": surveys[i].id, @"rank": [NSNumber numberWithLong:surveys[i].rank], @"time": [NSNumber numberWithLong:surveys[i].time], @"value": [NSNumber numberWithDouble:surveys[i].value], @"currencySale": [NSNumber numberWithBool:surveys[i].currencySale], @"multiplier": [NSNumber numberWithDouble:surveys[i].multiplier]};

                   [surveyList addObject:o];
            }

            resolve(surveyList);
        } failed:^(NSError * failed){
            reject(@"ERR_GET_NATIVE_SURVEYS", failed.localizedDescription, failed);
        }];

    }
    @catch (NSException *error) {
        reject(@"ERR_GET_NATIVE_SURVEYS", error.description, nil);
    }
}

// *******************************
// ***** SHOW NATIVE SURVEY ******
// *******************************
RCT_EXPORT_METHOD(showNativeSurvey:(NSString*)id  placementId:(NSString*)placementId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        // This requires the main thread
        dispatch_async(dispatch_get_main_queue(), ^{
            [[InBrain shared] showNativeSurveyWithId:id placementId:placementId from:NULL];
            resolve(@true);
        });
    }
    @catch (NSException *error) {
        reject(@"ERR_SHOW_NATIVE_SURVEY", error.description, nil);
    }
}

// ***************************
// ***** CONFIRM REWARDS *****
// ***************************
RCT_EXPORT_METHOD(confirmRewards:(NSArray *)rewards resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    
    @try{
        // Mapping to list of ids and forwarding to SDK
        NSArray* ids = [rewards valueForKey:@"transactionId"];
        [[InBrain shared] confirmRewardsWithTxIdArray:ids];

        // Resolve the promise
        resolve(@true);
    }
    @catch (NSException *error) {
        reject(@"ERR_CONFIRM_REWARDS", error.description, nil);
    }
}

// **************************
// ***** SET VIEW TITLE *****
// **************************
RCT_EXPORT_METHOD(setTitle:(NSString *)title resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try{
        // Forwarding to SDK
        [[InBrain shared] setNavigationBarTitle:title];

        // Resolve the promise
        resolve(@true);
    }
    @catch (NSException *error) {
        reject(@"ERR_SET_TITLE", error.description, nil);
    }
}

// *************************************
// ***** SET NAVIGATION BAR CONFIG *****
// *************************************
RCT_EXPORT_METHOD(setNavigationBarConfig:(NSDictionary *)data resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try{
        
        // Extract parameters
        NSString* backgroundColorString = [data objectForKey:@"backgroundColor"];
        UIColor* backgroundColor = [self colorWithHexString:backgroundColorString];

        NSString* buttonsColorString = [data objectForKey:@"buttonsColor"];
        UIColor* buttonsColor = [self colorWithHexString:buttonsColorString];
        
        NSString* titleColorString = [data objectForKey:@"titleColor"];
        UIColor* titleColor = [self colorWithHexString:titleColorString];
        
        BOOL hasShadow = [[data objectForKey:@"hasShadow"] boolValue];
        
        // Instantiate config object
        InBrainNavBarConfig* config = [[InBrainNavBarConfig alloc] initWithBackgroundColor:backgroundColor buttonsColor:buttonsColor titleColor:titleColor isTranslucent:false hasShadow:hasShadow];

        // Forwarding to SDK
        [[InBrain shared] setNavigationBarConfig:config];

        // Resolve the promise
        resolve(@true);
    
    }
    @catch (NSException *error) {
        reject(@"ERR_SET_NAVIGATION_BAR_CONFIG", error.description, nil);
    }
}

// *********************************
// ***** SET STATUS BAR CONFIG *****
// *********************************
RCT_EXPORT_METHOD(setStatusBarConfig:(NSDictionary *)data resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try{

        // Extract parameters
        BOOL lighStatusBar = [[data objectForKey:@"lightStatusBar"] boolValue];
        
        UIStatusBarStyle style = 1;
        if(!lighStatusBar) {
            if(@available(iOS 13, *))
                style = 3; // UIStatusBarStyleDarkContent
            else
                style = 0; // UIStatusBarStyleDefault
        }
        
       // Instantiate config object
       InBrainStatusBarConfig* config = [[InBrainStatusBarConfig alloc] initWithStatusBarStyle:style hideStatusBar:false];
        
        // Forwarding to SDK
        [[InBrain shared] setStatusBarConfig:config];

        // Resolve the promise
        resolve(@true);
    
    }
    @catch (NSException *error) {
        reject(@"ERR_SET_STATUS_BAR_CONFIG", error.description, nil);
    }
}

// ***********************
// ***** SET LANGUAGE ****
// ***********************
RCT_EXPORT_METHOD(setLanguage:(NSString *)language resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try{

        // Forwarding to SDK
        NSError *error = nil;
        [[InBrain shared] setLanguage:language error:&error];
        if (error != nil) {
            reject(@"ERR_SET_LANGUAGE", error.description, nil);
        }

        // Resolve the promise
        resolve(@true);
    
    }
    @catch (NSException *error) {
        reject(@"ERR_SET_LANGUAGE", error.description, nil);
    }
}


// ********************
// ***** LISTENERS ****
// ********************

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"OnClose", @"OnCloseFromPage"];
}

- (void)surveysClosedByWebView:(BOOL)byWebView completedSurvey:(BOOL)completedSurvey {
    [self sendEventWithName:(byWebView ? @"OnCloseFromPage" : @"OnClose") body:@{}];
}

- (void)didReceiveInBrainRewardsWithRewardsArray:(NSArray<InBrainReward *> * _Nonnull)rewardsArray {
    // Never used, we use getRewardsWithSuccess which has callbacks. This method is only used when getRewards is called.
}

// ***************************
// ***** UTILITY METHODS *****
// ***************************

/**
 * Convert from a hexadecimal color string to UIColor
 */
- (UIColor *)colorWithHexString:(NSString *)stringToConvert
{
    NSString *noHashString = [stringToConvert stringByReplacingOccurrencesOfString:@"#" withString:@""]; // remove the #
    NSScanner *scanner = [NSScanner scannerWithString:noHashString];
    [scanner setCharactersToBeSkipped:[NSCharacterSet symbolCharacterSet]]; // remove + and $

    unsigned hex;
    if (![scanner scanHexInt:&hex]) return nil;
    int r = (hex >> 16) & 0xFF;
    int g = (hex >> 8) & 0xFF;
    int b = (hex) & 0xFF;

    return [UIColor colorWithRed:r / 255.0f green:g / 255.0f blue:b / 255.0f alpha:1.0f];
}

- (void) notNull:(NSString* )name toCheck:(id)toCheck {
    if( !toCheck ){
        [NSException raise:@"Invalid parameter value" format:@"%@ must not be null", name];
    }
}

@end

