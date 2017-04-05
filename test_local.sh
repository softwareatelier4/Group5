npm install
npm run test-mocha
npm run start-jenkins &
# ./bin/installSeleniumAndChromeWebDriver
node seed.js
cd frontend
bower install
cd ..
./nightwatch
pkill "JobAdvisor"
