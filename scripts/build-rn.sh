#!/bin/sh

RNVERSION=0.63.0
echo 'Building RN app '$RNVERSION

RELATIVEPATH=$(dirname "$0")
source $RELATIVEPATH/common.sh

# Install 
cd cli && npm install && cd ..

# Init RN app
APPNAME=APP$RNVERSION
rm -rf APP
if test -f "$APPNAME.tar.gz"; then
    tar -xf $APPNAME.tar.gz
else
    npx react-native init APP --version=$RNVERSION
    tar -zcf APP$RNVERSION.tar.gz APP
fi

# Copy our code example
cp App.js APP/App.js && cd APP

# Install current working version
npm install inbrain-surveys@$VERSION --save

# Install react-native-dotenv
npm install babel-plugin-dotenv-import --save-dev

cp $BASEDIR/.babelrc $BASEDIR/APP/.babelrc
cp $BASEDIR/env.vars $BASEDIR/APP/.env




