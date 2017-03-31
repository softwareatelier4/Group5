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
      .waitForElementVisible('#dropdown-toggle', 1000);
  },

  'Test input' : function (client) {
    client
      .setValue('#field-search input', 'Mario')
      .setValue('#location-search input', 'Bellinzona')
      .click('#button-search')
      .pause(1000)
      .waitForElementVisible('ja-results-list', 1000)
      .waitForElementVisible('ja-results-item', 1000)
      .waitForElementVisible('ja-results-item:nth-child(1)', 1000)
      .waitForElementVisible('ja-results-item:nth-child(1) > paper-card', 1000)
      .waitForElementVisible('ja-results-item:nth-child(1) .result-name', 1000)

      .assert.containsText('ja-results-item:nth-child(1) .result-name',
                           'Mario Rossi')
      .assert.containsText('ja-results-item:nth-child(1) .result-profession',
                           'Painter')
      // .saveScreenshot('~/Desktop/file.png')
      .click('ja-results-item:nth-child(1) a')
      .pause(1000)
      .assert.urlContains('http://localhost:3000/freelancer/5625fc2bd82b84d23d8c7bd5')

      // .waitForElementVisible('#imagediv', 1000)
      // .waitForElementVisible('#description', 1000)
      // .waitForElementVisible('#name', 1000)
      // .waitForElementVisible('#address', 1000)
      // .waitForElementVisible('#profession', 1000)
      // .waitForElementVisible('#phone', 1000)
      // .waitForElementVisible('#email', 1000)
      // .waitForElementVisible('#price', 1000)
      // .assert.containsText('#name', 'Rossi Mario')
      .end();
  },

  'Test profile visibility' : function (client) {
    client
      .url('http://localhost:3000/freelancer/5625fc2bd82b84d23d8c7bd5')
      // .pause(10000)
      //   .source(function (result){
      //     // Source will be stored in result.value
      //     console.log(result.value);
      // })
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      .waitForElementVisible('ja-profile', 10000)
      .saveScreenshot('~/Desktop/file.png')
      .waitForElementVisible('#imagediv', 1000)
      .waitForElementVisible('#description', 1000)
      .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#address', 1000)
      .waitForElementVisible('#profession', 1000)
      .waitForElementVisible('#phone', 1000)
      .waitForElementVisible('#email', 1000)
      .waitForElementVisible('#price', 1000)
      .waitForElementVisible('#name', 1000)
      // .saveScreenshot('~/Desktop/file.png')
      // client.getText("#name", function(result) {
      //   console.log(result);
      // })
      // .assert.containsText('ja-profile:nth-child(1)',
      //                          'Rossi Mario')
      // .pause(1000)
      // client.execute(function() {
      //   console.log(document.getElementById("name"));
      // })
      // .assert.containsText('#name', 'Rossi Mario')
      .end();
  },
};
