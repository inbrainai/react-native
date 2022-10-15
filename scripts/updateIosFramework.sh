cd ../../inBrainSurveys_SDK/
git checkout master
git pull
cd ../sdk-react/ios/Frameworks/
rm -rf ./*
cp -r ../../../inBrainSurveys_SDK/InBrainSurveys_SDK_Swift.xcframework ./
