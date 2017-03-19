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
      .waitForElementVisible('#button-search', 1000)
      .waitForElementVisible('#results-title', 1000);
  },

  'Test profile visibility' : function (client) {
    client
      .url('http://localhost:3000/freelancer/5625fc2bd82b84d23d8c7bd5')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      .waitForElementVisible('#image', 1000)
      .waitForElementVisible('#description', 1000)
      .waitForElementVisible('#id', 1000)
      .waitForElementVisible('#firstname', 1000)
      .waitForElementVisible('#lastname', 1000)
      .waitForElementVisible('#address', 1000);
  },

  'Test input' : function (client) {
    client
      .setValue('#field-search', 'Plumber')
      .setValue('#location-search', 'Bellinzona')
      .click('#button-search')
      .pause(1000)
      .assert.containsText('#results-title', 'Results for Plumber around Bellinzona')
      .waitForElementVisible('ja-results-item', 1000)
      .waitForElementVisible('ja-results-item:nth-child(2)', 1000)
      .waitForElementVisible('ja-results-item:nth-child(2) > paper-card', 1000)
      .waitForElementVisible('ja-results-item:nth-child(2) .result-name', 1000)
      .assert.containsText('ja-results-item:nth-child(2) .result-name',
                           'Luca Bernasconi')
      .assert.containsText('ja-results-item:nth-child(2) .result-profession',
                           'Plumber')
      .assert.containsText('ja-results-item:nth-child(2) .result-location',
                           'Bellinzona')
      .click('ja-results-item:nth-child(2) a')
      .pause(1000)
      .assert.urlContains('http://localhost:3000/freelancer/')
      .end();
  },
};
