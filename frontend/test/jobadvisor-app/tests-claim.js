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
      .click('#menu-open')
      .click('#loginBtn')
      .pause(500)
      .click('#menu-close')
      .assert.urlEquals('http://localhost:3005/login')
      .setValue('#login-username input', 'camo')
      .setValue('#login-password input', 'camo')
      .click('#menu-open')
      .click('#login-button')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/')
      .click('#menu-open')
      .waitForElementVisible('#logoutBtn', 1000)
      .waitForElementNotVisible('#loginBtn', 1000)
      .click('#menu-close')
      .url('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bd9')
      .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#btn-claim', 1000)
      .assert.containsText("#name", "GIOVINAZZI EMANUELE")
      .assert.attributeContains('paper-button', 'role', 'button')
      .click('#btn-claim')
      .pause(500)
      // .waitForElementVisible('paper-button', 1000)
      .assert.attributeContains('paper-button', 'tabindex', '0')
      .assert.attributeContains('#btn-send', 'raised', 'true')
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
    .waitForElementVisible('#calendar-input-description', 2000)
    .setValue('#calendar-input-description input', "Available")
    .waitForElementVisible('#calendar-input-location', 500)
    .setValue('#calendar-input-location input', "Lugano")
    .waitForElementVisible('#event-submit-btn', 500)
    .click('#event-submit-btn').pause(1000)
    .waitForElementVisible('#events-container ja-event-element:nth-child(1)', 500)
    .assert.containsText('#events-container ja-event-element:nth-child(1) #event-description', 'Available')
    .assert.containsText('#events-container ja-event-element:nth-child(1) #event-location', 'Lugano')
    .click('#events-container ja-event-element:nth-child(1) #event-remove')
    .waitForElementNotPresent('#events-container ja-event-element:nth-child(3)', 500)
  },

  'Test add event with no description and close popup': function (client) {
    client
    .waitForElementVisible('#profile-calendar', 500)
    .waitForElementVisible('#calendar-input-description', 500)
    .clearValue('#calendar-input-description input')
    .clearValue('#calendar-input-location input')
    .setValue('#calendar-input-location input', '')
    .setValue('#calendar-input-description input', "Available")
    .waitForElementVisible('#calendar-input-location', 500)
    // .setValue('#calendar-input-location input', "Lugano")
    .waitForElementVisible('#event-submit-btn', 500)
    .click('#event-submit-btn').pause(500)
    // .assert.containsText('#calendar-input-location paper-input-error', 'Insert a valid location')
    // .assert.containsText('#calendar-input-description paper-input-error', 'Insert a valid description')
    .waitForElementNotPresent('#events-container ja-event-element:nth-child(1)', 500)
    .click('#event-submit-cancel').pause(500)
    .waitForElementNotVisible('#profile-calendar', 500)
    .end();
  },


  'Test add event with no description and close popup': function (client) {
    client
    .waitForElementVisible('#profile-calendar', 500)
    .waitForElementVisible('#calendar-input-description', 500)
    .clearValue('#calendar-input-description input')
    .clearValue('#calendar-input-location input')
    .setValue('#calendar-input-location input', '')
    .setValue('#calendar-input-description input', "Available")
    .waitForElementVisible('#calendar-input-location', 500)
    // .setValue('#calendar-input-location input', "Lugano")
    .waitForElementVisible('#event-submit-btn', 500)
    .click('#event-submit-btn').pause(500)
    // .assert.containsText('#calendar-input-location paper-input-error', 'Insert a valid location')
    // .assert.containsText('#calendar-input-description paper-input-error', 'Insert a valid description')
    .waitForElementNotPresent('#events-container ja-event-element:nth-child(1)', 500)
    .click('#event-submit-cancel').pause(500)
    .waitForElementNotVisible('#profile-calendar', 500)
    // .end();
  },


  'Test respond to a review': function (client) {
    client
    .waitForElementVisible('#reviews ja-review-element:nth-child(2)', 1000)
    .assert.containsText('#reviews ja-review-element:nth-child(2) paper-card  #comment', 'not really good')
    .waitForElementVisible('#reviews ja-review-element:nth-child(2) #review-open-response-editor', 1000)
    .click('#reviews ja-review-element:nth-child(2) #review-open-response-editor')
    .waitForElementVisible('#reviews ja-review-element:nth-child(2) #review-response-text', 1000)
    .setValue('#reviews ja-review-element:nth-child(2) #review-response-text textarea', "Thank you for the feedback!")
    .waitForElementVisible('#reviews ja-review-element:nth-child(2) #review-response-submit', 1000)
    .click('#reviews ja-review-element:nth-child(2) #review-response-submit')
    .pause(500)
    .waitForElementVisible('#reviews ja-review-element:nth-child(2) .response', 1000)
    .waitForElementVisible('#reviews ja-review-element:nth-child(2) .response #review-response-edit', 1000)
    .waitForElementVisible('#reviews ja-review-element:nth-child(2) .response #review-response-comment', 1000)
    .assert.containsText('#reviews ja-review-element:nth-child(2) .response #review-response-comment', "Thank you for the feedback!")
  },

  'Test edit an existing response': function (client) {
    client
      .waitForElementVisible('#reviews ja-review-element:nth-child(2) #review-response-edit', 1000)
      .click('#reviews ja-review-element:nth-child(2) #review-response-edit')
      .waitForElementVisible('#reviews ja-review-element:nth-child(2) #review-response-text', 1000)
      .setValue('#reviews ja-review-element:nth-child(2) #review-response-text textarea', "EDIT: Thank you for the feedback, my friend!")
      .waitForElementVisible('#reviews ja-review-element:nth-child(2) #review-response-submit', 1000)
      .click('#reviews ja-review-element:nth-child(2) #review-response-submit')
      .pause(500)
      .waitForElementVisible('#reviews ja-review-element:nth-child(2) .response', 1000)
      .waitForElementVisible('#reviews ja-review-element:nth-child(2) .response #review-response-edit', 1000)
      .waitForElementVisible('#reviews ja-review-element:nth-child(2) .response #review-response-comment', 1000)
      .assert.containsText('#reviews ja-review-element:nth-child(2) .response #review-response-comment', "EDIT: Thank you for the feedback, my friend!")
      .end()
  },
}
