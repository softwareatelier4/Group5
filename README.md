# Setup and run the application
## Setup
### Basic installation:
`npm install -g bower`

`npm install`

### To see the distances to the freelancers, you need to install the following plug-in:
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
Otherwise, the browser will throw an error during the request to the google distance matrix API.
This error only appears when the application is running on localhost.

### If you want to execute frontend tests you also must run:
`npm run install-selenium`

## Run the application
`npm start`

## Run tests
For all tests, the application must be running with `npm start`
### Mocha backend tests:
`npm run test-mocha`

### Nightwatch frontend tests:
`npm run test-nightwatch`

### Both frontend and backend:
`npm run test-all`
