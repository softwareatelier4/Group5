module.exports = {

'Test claim profile from search': function (client) {
    client
      .url('http://localhost:3005/')
      .setValue('#field-search input', 'Samuele')
      .setValue('#location-search input', 'Lugano, Switzerland')
      .click('#button-search')
      .pause(500)
      .assert.containsText('#fl-5625fc2bd66b84d23d8c7bf2 .result-verification', 'pending')
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
      .pause(500)
      .assert.urlEquals('http://localhost:3005/')
      .waitForElementVisible('#logoutBtn', 1000)
      .waitForElementNotVisible('#loginBtn', 1000)
      .url('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bd9')
      .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#btn-claim', 1000)
      .assert.containsText("#name", "GIOVINAZZI EMANUELE")
      .assert.attributeContains('paper-button', 'role', 'button')
      .click('#btn-claim')
      .pause(500)
      .waitForElementVisible('paper-button', 1000)
      .assert.attributeContains('paper-button', 'tabindex', '0')
      .assert.attributeContains('file-upload', 'raised', 'true')
      .setValue('input#load-file', '/frontend/test/README.md')
      .pause(500)
      .click('#btn-send')
      .pause(500)
  },

  'Test admin page': function (client) {
    client
      .url('http://localhost:3005/admin')
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6', 1000)
      .assert.containsText("#fl-5625fc2bd82b84d23d8c7bd6 .card-content a span", "Alexander Fischer")
      .waitForElementVisible('#fl-5625fc2bd66b84d23d8c7bf2', 1000)
      .assert.containsText("#fl-5625fc2bd66b84d23d8c7bf2 .card-content a span", "Samuele Bischof")
      .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd8', 1000)
      // .setValue('#fl-5625fc2bd82b84d23d8c7bd6 paper-textarea', 'test string')
      .click('#fl-5625fc2bd82b84d23d8c7bd6 paper-button')
      .pause(500)
      // .end();
  },

  'Test add and remove availability to calendar': function (client) {
    client
    .url('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bd6')
    .waitForElementVisible('#name', 1000)
    .pause(5000)
    .waitForElementVisible('#open-events-btn', 500)
    .click('#open-events-btn')
    .waitForElementVisible('#profile-calendar', 500)
    // TODO: the following doesn't work on jenkins
    // .waitForElementVisible('#calendar-input-description', 2000)
    // .setValue('#calendar-input-description input', "Available")
    // .waitForElementVisible('#calendar-input-location', 500)
    // .setValue('#calendar-input-location input', "Lugano")
    // .waitForElementVisible('#event-submit-btn', 500)
    // .click('#event-submit-btn').pause(1000)
    // .waitForElementVisible('paper-dialog-scrollable ja-event-element:nth-child(3)', 500)
    // .assert.containsText('paper-dialog-scrollable ja-event-element:nth-child(3) #event-description', 'Available')
    // .assert.containsText('paper-dialog-scrollable ja-event-element:nth-child(3) #event-location', 'Lugano')
    // .click('paper-dialog-scrollable ja-event-element:nth-child(3) #event-remove')
    // .waitForElementNotPresent('paper-dialog-scrollable ja-event-element:nth-child(3)', 500)
  },

  'Test add event with no description and close popup': function (client) {
    client
    // .waitForElementVisible('#profile-calendar', 500)
    // .waitForElementVisible('#calendar-input-description', 500)
    // .clearValue('#calendar-input-description input')
    // .clearValue('#calendar-input-location input')
    // .setValue('#calendar-input-location input', '')
    // .setValue('#calendar-input-description input', "Available")
    // .waitForElementVisible('#calendar-input-location', 500)
    // // .setValue('#calendar-input-location input', "Lugano")
    // .waitForElementVisible('#event-submit-btn', 500)
    // .click('#event-submit-btn').pause(500)
    // // .assert.containsText('#calendar-input-location paper-input-error', 'Insert a valid location')
    // .assert.containsText('#calendar-input-description paper-input-error', 'Insert a valid description')
    // .waitForElementNotPresent('paper-dialog-scrollable ja-event-element:nth-child(3)', 500)
    // .click('#event-submit-cancel').pause(500)
    // .waitForElementNotVisible('#profile-calendar', 500)
    .end();
  },
}
