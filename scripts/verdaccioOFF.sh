pkill Verdaccio
npm config set registry https://registry.npmjs.org/

echo 'Current regisry is'
npm config list | grep "registry ="
