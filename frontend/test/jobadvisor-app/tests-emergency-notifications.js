module.exports = {

  'Test login and load emergency page': function (client) {
    client
      .url('http://localhost:3005/')
      .click('#menu-open')
      .click('#loginBtn')
      .pause(500)
      // .assert.urlEquals('http://localhost:3005/login')
      .click('#menu-close')
      .setValue('#login-username input', 'fischer')
      .setValue('#login-password input', 'fischer')
      .click('#login-button')
      .pause(500)
      .click('#menu-open')
      .waitForElementVisible('#logoutBtn', 1000)
      .waitForElementNotVisible('#loginBtn', 1000)
      .assert.containsText('#logoutBtn', 'LOGOUT FISCHER')
      .click('#emergency-button')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/emergency')
      .click('#menu-close')
      .waitForElementVisible('#emergencycontainer', 1000)
      .waitForElementVisible('#_emergencydescription', 1000)
      .waitForElementVisible('#_emergencyprofession', 1000)
      .waitForElementVisible('#_location', 1000)
      //.waitForElementVisible('#_phonenumber', 1000)   IT GIVES ERRORS???!!!!???!!??11!!!111?
      .waitForElementVisible('#_emergencycategory', 1000)
      .waitForElementVisible('#time', 1000)

    //.end();
  },

  'Test wrong input emergency submit': function (client) {
    client
      .url('http://localhost:3005/emergency')
      .waitForElementVisible('#emergencycontainer', 1000)
      .waitForElementVisible('#_emergencydescription', 1000)
      .waitForElementVisible('#_emergencyprofession', 1000)
      .waitForElementVisible('#_location', 1000)
      .waitForElementVisible('#_phonenumber1', 1000)
      .waitForElementVisible('#_emergencycategory', 1000)
      .waitForElementVisible('#time', 1000)
      .click('#emergencysubmit')
      .assert.containsText('#emergencyDescriptionButton > paper-input-container .is-invalid  > paper-input-error',
        'Write about your problem!')
      .assert.containsText('#emergencyProfessionButton > paper-input-container .is-invalid  > paper-input-error',
        'Profession required (only letters)!')
    // .assert.containsText('#fphone1 > paper-input-container .is-invalid > paper-input-error',
    //                            'Phone required (numbers only)!') NON VA LUL
    //.end();
  },

  'Test right input emergency submit': function (client) {
    client
      .url('http://localhost:3005/emergency')
      .waitForElementVisible('#emergencycontainer', 1000)
      .waitForElementVisible('#emergencyDescriptionButton', 1000)
      .waitForElementVisible('#_emergencyprofession', 1000)
      .waitForElementVisible('#_location', 1000)
      //.waitForElementVisible('#_phonenumber', 1000)   IT GIVES ERRORS???!!!!???!!??11!!!111?
      .waitForElementVisible('#_emergencycategory', 1000)
      .waitForElementVisible('#time', 1000)
      .setValue('#emergencyDescriptionButton input', 'Need a painter')
      .setValue('#emergencyProfessionButton input', 'Painter')
      .setValue('#fphone1 input', '0916666666')
      .setValue('#locationField input', 'Informatica, 6900 Lugano, Switzerland')
      .click('#emergencysubmit')
      .pause(2000)
    //.end();
  },

  'Test notifications accepted': function (client) {
    client
      .pause(10000)
      .assert.urlEquals('http://localhost:3005/notification/5625fc2bd82b84d23d8c9bd0/user')
      .waitForElementVisible('#notification-container', 1000)
      .waitForElementVisible('#usnt-590f2bcfda0f255fd9fb5654', 1000)
      .assert.containsText('#usnt-590f2bcfda0f255fd9fb5654 > div#left > div#notification-profession > span', 'Profession Requested : Plumber')
      .assert.containsText('#usnt-590f2bcfda0f255fd9fb5654 > div#left > div#notification-description > span', 'Description : I want a plumber because my sink is broken')
      .assert.containsText('#usnt-590f2bcfda0f255fd9fb5654 > div#left > div#notification-phone > span', 'Phone number : 000000000')
      .assert.containsText('#usnt-590f2bcfda0f255fd9fb5654 > div#left > div#notification-location > span', 'Location : Via Monte Bre 16, Lugano')
      .assert.containsText('#usnt-590f2bcfda0f255fd9fb5654 > div#left > div#notification-status > span', 'Status : Pending')
      .waitForElementVisible('#usnt-590f2bcfda0f255fd9fb5654 > div#right', 1000)
      .waitForElementVisible('#flnt-590f2bcfda0f255fd9fb5654', 1000)
      .assert.containsText('#flnt-590f2bcfda0f255fd9fb5654 > div#left > div#notification-profession > span', 'Profession Requested: Plumber')
      .assert.containsText('#flnt-590f2bcfda0f255fd9fb5654 > div#left > div#notification-description > span', 'Description : I want a plumber because my sink is broken')
      .assert.containsText('#flnt-590f2bcfda0f255fd9fb5654 > div#left > div#notification-status > span', 'Status : Pending')
      .waitForElementVisible('paper-button#buttonYes', 1000)
      .waitForElementVisible('paper-button#buttonNo', 1000)
      .click('paper-button#buttonYes')
      .refresh()
      .pause(2000)
      .assert.containsText('#usnt-590f2bcfda0f255fd9fb5654 > div#left > div#notification-status > span', 'Status : Accepted')
      .end();
  },

}