cd APP/
rm -rf node_modules/inbrain-surveys
npm install
cd ios
pod deintegrate && pod install
cd ../../
