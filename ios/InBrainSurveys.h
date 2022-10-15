#import <React/RCTBridgeModule.h>
#import <InBrainSurveys_SDK_Swift/InBrainSurveys_SDK_Swift-Swift.h>
#import <React/RCTComponent.h>
#import <React/RCTEventEmitter.h>

@interface InBrainSurveys : RCTEventEmitter <RCTBridgeModule, InBrainDelegate>

@property(nonatomic) InBrain* inbrain; // InBrain instance
 
@end
