#!/bin/sh
set -e

# Go to the script folder
RELATIVEPATH=$(dirname "$0")
cd $RELATIVEPATH

# InBrain envvars
source env.vars

# export common
export RNCLI_DIR=$(pwd)/cli/node_modules/.bin
export BASEDIR=$(pwd)
export VERSION=$(cat $BASEDIR/../package.json | jq -r ".version")
export PKGNAME=$(cat $BASEDIR/../package.json | jq -r ".name")

# Log info
echo "Working with $PKGNAME version $VERSION"
echo 'Base diretory is '$BASEDIR


