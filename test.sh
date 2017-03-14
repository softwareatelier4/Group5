npm install
npm run test-mocha
npm run start-jenkins &
node seed.js
cd frontend
bower install
cd ..
#polymer test frontend/test -l chrome
pkill "JobAdvisor"
