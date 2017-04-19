npm run install-jenkins
npm run test-mocha
npm run start-jenkins &
xvfb-run -a ./nightwatch
pkill "JobAdvisor"
