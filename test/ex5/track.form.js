module.exports = {
  'Exercise 5 test Track' : function (client) {
    client
      .url('http://localhost:3000/tracks/6665fc2ac12b84d13d1c7bd5/edit/')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[name=name]')
      .assert.visible('input[name=id3Tags]')
      .assert.visible('input[name=dateReleased]')
      .assert.visible('input[name=dateCreated]')
      .assert.visible('input[name=file]')
      .assert.visible('input[name=duration]')
      .assert.visible('input[name=album]')
      .assert.visible('input[name=artist]')
      .clearValue('input[name=duration]')
      .setValue('input[name=duration]', '666')
      .pause(1000)
      .waitForElementVisible('button[name=updateResource]', 1000)
      .click('button[name=updateResource]')
      .pause(1000)
      .url('http://localhost:3000/tracks/6665fc2ac12b84d13d1c7bd5/edit/')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[name=name]')
      .assert.visible('input[name=id3Tags]')
      .assert.visible('input[name=dateReleased]')
      .assert.visible('input[name=dateCreated]')
      .assert.visible('input[name=file]')
      .assert.visible('input[name=duration]')
      .assert.visible('input[name=album]')
      .assert.visible('input[name=artist]')
      .assert.value("input[name=duration]", "666")
      .end();
  }
};