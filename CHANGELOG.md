## [2.3.2] 2022-10-14
### Changed
- Updated RN version from `0.63` to `0.70.2`
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to version `1.8.7`
- Fix library compatibility issue with the latest version of react native

## [2.3.0] 2022-03-07
### Changed
- Updated RN version from `0.62` to `0.63`
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to version `1.8.4`

## [2.2.4] 2020-11-29
### Changed
- Added two new properties in InBrainNativeSurveys: currencySale and multiplier
- Updated Android framework `com.github.inbrainai:sdk-android` to version `1.0.21` (from `1.0.120`)
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to version `1.8.2`

## [2.2.3] 2020-11-29
### Fixed
- Fixed 2.2.2 crash related to NativeSurveysDelegate on iOS

## [2.2.2] 2020-11-27
### Changed
- Updated Android framework `com.github.inbrainai:sdk-android` to version `1.0.20` (from `1.0.19`)
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to version `1.8.1`

## [2.2.1] SKIPPED - was unpublished from npmjs (published by mistake)

## [2.2.0] 2020-10-09
### Changed
- Updated Android framework `com.github.inbrainai:sdk-android` to version `1.0.19` (from `1.0.16`)
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to version `1.8.0`
- Added `placementId` optional parameters to methods `getNativeSurveys` and `showNativeSurvey`
- Added method `setSessionParameters` to update parameters without having to call `init`

## [2.1.4] 2020-01-27
### Changed
- Updated Android framework `com.github.inbrainai:sdk-android` to version `1.0.16` (from `1.0.15`)

## [2.1.3] 2020-01-23
### Changed
- Merged v1.1.4 and v1.1.5 into 2.1.x
- `showSurveys` and `showNativeSurveys` are now executed from the UI Thread in Android

## [2.1.2] 2020-01-20
### Changed
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to version `1.5.2`

## [2.1.1] 2020-01-16
### Bug Fix
- Fixed and improved error messages on iOS
### Changed
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to version `1.5.1`

## [2.1.0] 2020-01-14
### Changed
- Updated Android framework `com.github.inbrainai:sdk-android` to version `1.0.15` (from `1.0.14`)
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to version `1.5.0`

## [2.0.2] 2020-12-31
### Changed
- Added some Javascript side validation
### Merged
- Merged 1.1.4 into 2.0.0: Improve handling of null Activity.

## [2.0.1] 2020-12-21
### Merged
- Merged 1.1.3 into 2.0.0: Internals of Android bridge. Prevent app from crashing if problem during init call.

## [2.0.0] 2020-12-12
### Changed
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to version `1.4.12`
- Updated Android framework `com.github.inbrainai:sdk-android` to version `1.0.14` (from `1.0.9`)

### Changed
- Moved options `titleColor` and `navbarColor`
- Added two different kind of options `navigationBar` and `statusBar` to have more fine-grained control over navigation and status bars styling
## [1.1.5] 2021-01-22
### Changed
- `showSurveys` and `showNativeSurveys` are now executed from the UI Thread in Android

## [1.1.5] 2021-01-23
### Changed
- `showSurveys` and `showNativeSurveys` are now executed from the UI Thread in Android

## [1.1.4] 2020-12-31
### Changed
- Improve handling of null Activity (bridge method is being re-called at most 10 times before throwing, with 50ms intervals) in Android

## [1.1.3] 2020-12-18
### Changed
- Internals of Android bridge. Prevent app from crashing if problem during init call.

## [1.1.2] 2020-11-20
### Added
- Added option 'titleColor' which allows to modify the webview title color

## [1.1.1] 2020-11-19
### Bug Fix
- Fix onClose listener not triggered when closing the webview displaying a native survey
### Changed
- Simplified ObjC code and removed unnecessary view controller 

## [1.1.0] 2020-11-13
### Added
- Added CHANGELOG.md
- Added methods `checkSurveysAvailable`, `getNativeSurveys`, and `showNativeSurvey` methods

### Changed
- Updated Android framework `com.github.inbrainai:sdk-android` to version `1.0.9` (from `1.0.3`)
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to version `1.4.6`

## [1.0.8] - 2020-09-02
### Changed
- Updated iOS framework `InBrainSurveys_SDK_Swift.xcframework`

## [1.0.7] - 2020-07-28
### Added
- Added attribute `isS2S` in `InitOptions` with default value `false`

### Changed
- Updated Android framework `com.github.inbrainai:sdk-android` to version `1.0.3` (from `0.1.25`)
- Updated iOS framework `InBrainSurveys_SDK_Legacy.xcframework` to `InBrainSurveys_SDK_Swift.xcframework`
- Changed bridge internal method names and prototypes
- Set default value for `userId` attribute in `InitOptions` to `''` 

### Removed
- Removed attribute `production` in `InitOptions`

## [1.0.6] - 2020-06-17
### Changed
- Updated Android framework `com.github.inbrainai:sdk-android` to version `0.1.25` (from `0.1.9`)

## [1.0.5] - 2020-06-01

## [1.0.4] - 2020-05-31

## [1.0.3] - 2020-05-21

## [1.0.2] - 2020-05-14

## [1.0.1] - 2020-04-21

## [1.0.0] - 2020-02-13
### Added
- Initial SDK version
