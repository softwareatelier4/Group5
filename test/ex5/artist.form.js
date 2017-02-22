module.exports = {
  'Exercise 5 Artist' : function (client) {
    client
      .url('http://localhost:3000/artists/5625fc2bd82b84d23d8c7bd5/edit')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[name=name]')
      .assert.visible('input[name=genre]')
      .assert.visible('input[name=artwork]')
      .assert.visible('input[name=dateCreated]')
      .clearValue('input[name=genre]')
      .setValue('input[name=genre]', 'Black Metal')
      .pause(1000)
      .waitForElementVisible('button[name=updateResource]', 1000)
      .click('button[name=updateResource]')
      .pause(1000)
      .url('http://localhost:3000/artists/5625fc2bd82b84d23d8c7bd5/edit/')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[name=name]')
      .assert.visible('input[name=genre]')
      .assert.visible('input[name=artwork]')
      .assert.visible('input[name=dateCreated]')
      .assert.value("input[name=genre]", "Black Metal")
      .end();
  }
};