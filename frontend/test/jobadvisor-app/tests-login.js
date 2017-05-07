module.exports = {

  'Test login page elements visibility' : function (client) {
    client
      .url('http://localhost:3005/')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      .click('#menu-open')
      .waitForElementVisible('#loginBtn', 1000)
      .waitForElementNotVisible('#logoutBtn', 1000)
      .click('#loginBtn')
      .click('#menu-close')
      .pause(500)
      .assert.urlContains('http://localhost:3005/login')
      // .waitForElementVisible('ja-login', 1000)
      .waitForElementVisible('#login-username', 1000)
      .waitForElementVisible('#login-password', 1000)

      .waitForElementVisible('#login-button', 1000)
      .waitForElementVisible('#signup-form', 1000)
      .waitForElementVisible('#signup-email', 1000)
      .waitForElementVisible('#signup-username', 1000)
      .waitForElementVisible('#signup-password', 1000)
      .waitForElementVisible('#signup-password-check', 1000)
      .waitForElementVisible('#user-signup-button', 1000)
      // .end();
  },

  'Test signup correct and logout' : function (client) {
    client
      .setValue('#signup-email input', 'test@test.com')
      .setValue('#signup-username input', 'myUsername')
      .setValue('#signup-password input', '1234')
      .setValue('#signup-password-check input', '1234')
      .click('#user-signup-button')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/')
      .click('#menu-open')
      .waitForElementVisible('#logoutBtn', 1000)
      .waitForElementNotVisible('#loginBtn', 1000)
      .assert.containsText('#logoutBtn',
                           'LOGOUT MYUSERNAME')
      .click('#logoutBtn')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/')
  },

  'Test signup with already existing user' : function (client) {
    client
      .click('#menu-open')
      .click('#loginBtn')
      .pause(500)
      .assert.urlContains('http://localhost:3005/login')
      .setValue('#signup-email input', 'test@test.com')
      .setValue('#signup-username input', 'myUsername')
      .setValue('#signup-password input', '1234')
      .setValue('#signup-password-check input', '1234')
      .click('#user-signup-button')
      .pause(500)
      .click('#menu-close')
      .assert.containsText('#signup-error', 'User already exists')
  },

  'Test signup with invalid data' : function (client) {
    client
      .setValue('#signup-email input', 'test@test')
      .setValue('#signup-username input', '_asd')
      .setValue('#signup-password input', '1234')
      .setValue('#signup-password-check input', '12345')
      .click('#user-signup-button')
      .pause(500)
      .assert.containsText('#signup-error', 'Passwords do not match')
      .assert.containsText('#signup-email paper-input-error', 'Insert a valid email')
      .assert.containsText('#signup-username paper-input-error', 'Insert a valid username')
      .end();
  },

  'Test signup with empty fields' : function (client) {
    client
      .url('http://localhost:3005/')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      .click('#menu-open')
      .waitForElementVisible('#loginBtn', 1000)
      .waitForElementNotVisible('#logoutBtn', 1000)
      .click('#loginBtn')
      .pause(500)
      .assert.urlContains('http://localhost:3005/login')
      .setValue('#signup-email input', 'test@test.com')
      .setValue('#signup-username input', '')
      .setValue('#signup-password input', '1234')
      .setValue('#signup-password-check input', '1234')
      .click('#user-signup-button')
      .pause(500)
      .assert.containsText('#signup-error', 'Empty field(s)')
  },


  'Test login with previously created account' : function (client) {
    client
      .click('#menu-open')
      .click('#loginBtn')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/login')
      .setValue('#login-username input', 'myUsername')
      .setValue('#login-password input', '1234')
      .click('#login-button')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/')
      .click('#menu-open')
      .waitForElementVisible('#logoutBtn', 1000)
      .waitForElementNotVisible('#loginBtn', 1000)
      .assert.containsText('#logoutBtn',
                           'LOGOUT MYUSERNAME')
      .click('#logoutBtn')
      .pause(500)
      .click('#menu-close')
      .assert.urlEquals('http://localhost:3005/')
  },

  'Test login with wrong username' : function (client) {
    client
      .click('#menu-open')
      .click('#loginBtn')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/login')
      .setValue('#login-username input', 'myUsername134')
      .setValue('#login-password input', '1234')
      .click('#menu-open')
      .click('#login-button')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/login') // no redirect
      .assert.containsText('#login-error', "User doesn't exist or password is wrong")
      .waitForElementNotVisible('#logoutBtn', 1000)
      .click('#menu-open')
      .waitForElementVisible('#loginBtn', 1000)
      // .end();
  },

  'Test login with wrong password' : function (client) {
    client
      .click('#menu-open')
      .click('#loginBtn')
      .pause(500)
      .assert.urlEquals('http://localhost:3005/login')
      .setValue('#login-username input', 'myUsername134')
      .setValue('#login-password input', 'asddasasg')
      .click('#login-button')
      .pause(500)
      .click('#menu-close')
      .assert.urlEquals('http://localhost:3005/login') // no redirect
      .assert.containsText('#login-error', "User doesn't exist or password is wrong")
      .waitForElementNotVisible('#logoutBtn', 1000)
      .click('#menu-open')
      .waitForElementVisible('#loginBtn', 1000)
      .end();
  },

}
