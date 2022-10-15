#!/bin/sh

RELATIVEPATH=$(dirname "$0")
source $RELATIVEPATH/common.sh

cd $BASEDIR/APP

# Add jitpack as dependency
(sed -i '' "/mavenLocal()/a \\
maven { url 'https:\/\/jitpack.io/' }
" android/build.gradle )

$RNCLI_DIR/react-native run-android
