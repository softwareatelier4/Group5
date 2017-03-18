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
      .waitForElementVisible('#results-title', 1000)
      .end();
  },

  'Test input' : function (client) {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('jobadvisor-app', 10000)
      .waitForElementVisible('#field-search', 1000)
      .waitForElementVisible('#location-search', 1000)
      .waitForElementVisible('#button-search', 1000)
      .waitForElementVisible('#results-title', 1000)
      .setValue('#field-search', 'Painter')
      .setValue('#location-search', 'Lugano')
      .click('#button-search')
      .pause(1000)
      .assert.containsText('#results-title', 'Results for Painter around Lugano')
      .end();
  },
};
