npm install
npm run test-mocha
npm run start-jenkins &
# ./bin/installSeleniumAndChromeWebDriver
node seed.js
bower install
./nightwatch
pkill "JobAdvisor"
