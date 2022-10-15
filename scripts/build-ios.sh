#!/bin/sh

RELATIVEPATH=$(dirname "$0")
source $RELATIVEPATH/common.sh

cd $BASEDIR/APP

#$RNCLI_DIR/react-native run-ios

cd ios && pod install

