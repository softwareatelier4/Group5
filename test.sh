npm install -g bower polymer
npm install
npm run test-mocha
npm start &
node seed.js
cd frontend
bower install
cd ..
polymer test frontend/test -l chrome
pkill "JobAdvisor"
