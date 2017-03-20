module.exports = {
  'Test element visibility' : function (client) {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      .waitForElementVisible('ja-search-element', 1000)
      .waitForElementVisible('ja-results-list', 1000)
      .waitForElementVisible('#field-search', 1000)
      .waitForElementVisible('#location-search', 1000)
      .waitForElementVisible('#button-search', 1000);
  },

  'Test input' : function (client) {
    client
      .setValue('#field-search input', 'Plumber')
      .setValue('#location-search input', 'Bellinzona')
      .click('#button-search')
      .pause(1000)
      .waitForElementVisible('ja-results-item', 1000)
      .waitForElementVisible('ja-results-item:nth-child(1)', 1000)
      .waitForElementVisible('ja-results-item:nth-child(1) > paper-card', 1000)
      .waitForElementVisible('ja-results-item:nth-child(1) .result-name', 1000)
      .assert.containsText('ja-results-item:nth-child(1) .result-name',
                           'Luca Bernasconi')
      .assert.containsText('ja-results-item:nth-child(1) .result-profession',
                           'Plumber')
      .assert.containsText('ja-results-item:nth-child(1) .result-location',
                           'Bellinzona')
      .click('ja-results-item:nth-child(1) a')
      .pause(1000)
      .assert.urlContains('http://localhost:3000/freelancer/5625fc2bd82b84d23d8c7bd5')
      // .pause(10000)
      .waitForElementVisible('#imagediv', 1000)
      .waitForElementVisible('#description', 1000)
      .waitForElementVisible('#firstname', 1000)
      .waitForElementVisible('#lastname', 1000)
      .waitForElementVisible('#address', 1000)
      .end();
  },

  'Test profile visibility' : function (client) {
    client
      .url('http://localhost:3000/freelancer/5625fc2bd82b84d23d8c7bd5')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      .waitForElementVisible('ja-profile', 10000)
      .waitForElementVisible('#imagediv', 1000)
      .waitForElementVisible('#description', 1000)
      .waitForElementVisible('#firstname', 1000)
      .waitForElementVisible('#lastname', 1000)
      .waitForElementVisible('#address', 1000)
      .end();
  },
};
