module.exports = {

'Test claim profile from search': function (client) {
    client
      .url('http://localhost:3005/')
      .setValue('#field-search input', 'Samuele')
      .setValue('#location-search input', 'Lugano, Switzerland')
      .click('#button-search')
      .pause(2000)
      .assert.containsText('#fl-5625fc2bd66b84d23d8c7bf1 .result-verification', 'pending')
      .end()
  },

  'Test claim profile from inside profile page': function (client) {
    client
    .url('http://localhost:3005/')
      .click('#loginBtn')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/login')
      .setValue('#login-username input', 'camo')
      .setValue('#login-password input', 'camo')
      .click('#login-button')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/')
      .pause(5000)
      .assert.urlEquals('http://localhost:3005/')
      .waitForElementVisible('#logoutBtn', 1000)
      .waitForElementNotVisible('#loginBtn', 1000)
      .url('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bd9')
      .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#btn-claim', 1000)
      .assert.containsText("#name", "GIOVINAZZI EMANUELE")
      .assert.attributeContains('paper-button', 'role', 'button')
      .click('#btn-claim')
      .pause(2000)
      .waitForElementVisible('paper-button', 1000)
      .assert.attributeContains('paper-button', 'tabindex', '0')
      .assert.attributeContains('file-upload', 'raised', 'true')
      .end();
  },

  'Test admin page': function (client) {
    client
    .url('http://localhost:3005/')
      .click('#loginBtn')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/login')
      .setValue('#login-username input', 'camo')
      .setValue('#login-password input', 'camo')
      .click('#login-button')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/')
      .pause(5000)
      .assert.urlEquals('http://localhost:3005/')
      .url('http://localhost:3005/admin')
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6', 1000)
      .assert.containsText("#fl-5625fc2bd82b84d23d8c7bd6 .card-content a span", "Alexander Fischer")
      .waitForElementVisible('#fl-5625fc2bd66b84d23d8c7bf1', 1000)
      .assert.containsText("#fl-5625fc2bd66b84d23d8c7bf1 .card-content a span", "Samuele Bischof")
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd8', 1000)
      .setValue('#fl-5625fc2bd82b84d23d8c7bd8 paper-textarea', 'test string')
      .end();
  },

}