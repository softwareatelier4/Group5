module.exports = {
  'Test nightwatch' : function (client) {
    client
      .url('http://localhost:8080/')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('ja-results-list', 1000)
      .end();
  }
};
