verdaccio  > ./verdaccio.log &
npm set registry http://localhost:4873/

echo 'Current config is'
npm config list | grep "registry ="
