#!/bin/sh

RELATIVEPATH=$(dirname "$0")
source $RELATIVEPATH/common.sh

cd $BASEDIR/..

rm -rf node_modules

echo 'Unpublishing previous version '$VERSION
npm unpublish inbrain-surveys-legacy@$VERSION --force

echo 'Installing dependencies'
rm -rf node_modules 
npm install

echo 'Building and publishing'
npm run build
npm publish
