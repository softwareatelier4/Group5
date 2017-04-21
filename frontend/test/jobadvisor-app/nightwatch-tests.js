module.exports = {

  'Test login page elements visibility' : function (client) {
    client
      .url('http://localhost:3005/login')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      .waitForElementVisible('ja-login', 1000)
      .waitForElementVisible('#login-username', 1000)
      .waitForElementVisible('#login-password', 1000)
      .waitForElementVisible('#login-button', 1000)
      .waitForElementVisible('#signup-form', 1000)
      .waitForElementVisible('#signup-email', 1000)
      .waitForElementVisible('#signup-username', 1000)
      .waitForElementVisible('#signup-password', 1000)
      .waitForElementVisible('#signup-password-check', 1000)
      .waitForElementVisible('#signup-button', 1000)
      // .end();
  },

  'Test signup correct' : function (client) {
    client
      .setValue('#signup-email input', 'test@test.com')
      .setValue('#signup-username input', 'myUsername')
      .setValue('#signup-password input', '1234')
      .setValue('#signup-password-check input', '1234')
      .click('#signup-button')
      .pause(5000)
      .assert.attributeEquals("#signup-email", "error-message", "")
      .end();
  },

  'Test main elements visibility' : function (client) {
    client
      .url('http://localhost:3005')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      .waitForElementVisible('ja-search-element', 1000)
      .waitForElementVisible('ja-results-list', 1000)
      .waitForElementVisible('#field-search', 1000)
      .waitForElementVisible('#location-search', 1000)
      .waitForElementVisible('#dropdown-toggle', 1000)
      .waitForElementVisible('#div-filters', 1000);
  },

  'Test input, get results and click on a profile' : function (client) {
    client
      .setValue('#field-search input', 'Gianma')
      .setValue('#dropdown-toggle', 'IT Services')
      .setValue('#location-search input', 'Lugano, Switzerland')
      .click('#button-search')
      .pause(2000)
      .assert.containsText('ja-results-list > h3',
                           'Lugano, Switzerland')
      .waitForElementVisible('ja-results-list', 1000)
      .waitForElementVisible('ja-results-item', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 > paper-card', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 .result-name', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 .result-profession', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 .result-distance', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 .result-rating', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 .result-price', 1000)
      // Distance value doesn't show up with nightwatch
      .assert.containsText('#fl-5625fc2bd82b84d23d8c7bf1 .result-name',
                           'Gianmarco Palazzi')
      .assert.containsText('#fl-5625fc2bd82b84d23d8c7bf1 .result-profession',
                           'Web developer')
      .assert.containsText('#fl-5625fc2bd82b84d23d8c7bf1 .result-rating',
                           '5')
      .assert.containsText('#fl-5625fc2bd82b84d23d8c7bf1 .result-price',
                           '100')
      // .assert.containsText('#fl-5625fc2bd82b84d23d8c7bf1 .result-distance',
      //                      '33.2 km')
      .click('#fl-5625fc2bd82b84d23d8c7bf1 a')
      .pause(1000)
      .assert.urlContains('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bf1')
      .waitForElementVisible('#imagediv', 1000)
      .waitForElementVisible('#description', 1000)
      .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#address', 1000)
      .waitForElementVisible('#profession', 1000)
      .waitForElementVisible('#phone', 1000)
      .waitForElementVisible('#email', 1000)
      .waitForElementVisible('#price', 1000)
      .source(function(result) {

      })
      .assert.containsText('#name',
                           'GIANMARCO')
      // Fields content on profile don't show up when running nightwatch
  },

  'Get back to the home page' : function (client) {
    client
      .click('#page-title')
      .pause(2000)
      .waitForElementVisible('ja-search-element', 1000)
      .waitForElementVisible('ja-results-list', 1000)
      .waitForElementVisible('#field-search', 1000)
      .waitForElementVisible('#location-search', 1000)
      .waitForElementVisible('#dropdown-toggle', 1000)
      .waitForElementVisible('#div-filters', 1000)
      .end();
  },


  'Search only by category' : function (client) {
    client
      .url('http://localhost:3005')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      .waitForElementVisible('ja-search-element', 1000)
      .waitForElementVisible('ja-results-list', 1000)
      .waitForElementVisible('#field-search', 1000)
      .waitForElementVisible('#location-search', 1000)
      .waitForElementVisible('#dropdown-toggle', 1000)
      .waitForElementVisible('#div-filters', 1000)
      .waitForElementVisible('ja-search-element', 1000)
      .waitForElementVisible('ja-results-list', 1000)
      .setValue('#field-search input', ' ')
      .setValue('#dropdown-toggle', 'IT Services')
      .setValue('#location-search input', 'Zurich, Switzerland')
      .click('#button-search')
      .pause(2000)
      .assert.containsText('ja-results-list > h3',
                           'Zurich, Switzerland')
      .waitForElementVisible('ja-results-item', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6 > paper-card', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6 .result-name', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6 .result-profession', 1000)
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6 .result-distance', 1000)
      // Distance value doesn't show up with nightwatch
      .assert.containsText('#fl-5625fc2bd82b84d23d8c7bd6 .result-name',
                           'Alexander Fischer')
      .assert.containsText('#fl-5625fc2bd82b84d23d8c7bd6 .result-profession',
                           'Software Engineer')
      .click('#fl-5625fc2bd82b84d23d8c7bd6 a')
      .pause(1000)
      .assert.urlContains('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bd6')
      .waitForElementVisible('#imagediv', 1000)
      .waitForElementVisible('#description', 1000)
      .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#address', 1000)
      .waitForElementVisible('#profession', 1000)
      .waitForElementVisible('#phone', 1000)
      .waitForElementVisible('#email', 1000)
      .waitForElementVisible('#price', 1000)
      .end();
      // Fields content on profile don't show up when running nightwatch
  },

  'Test profile elements visibility' : function (client) {
    client
      .url('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bd5')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      // .source(function(response) {
      //   console.log(response.value);
      // })
      .waitForElementVisible('ja-profile', 10000)
      .waitForElementVisible('#imagediv', 1000)
      .waitForElementVisible('#description', 1000)
      .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#address', 1000)
      .waitForElementVisible('#profession', 1000)
      .waitForElementVisible('#phone', 1000)
      .waitForElementVisible('#email', 1000)
      .waitForElementVisible('#price', 1000)
      .waitForElementVisible('#name', 1000)
      .end();
  },
};
