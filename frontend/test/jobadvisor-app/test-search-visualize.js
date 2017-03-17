module.exports = {
  'Test results view' : function (client) {
    client
      .url('http://localhost:8080/')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('ja-results-list', 1000)
      .waitForElementVisible('#results-title', 1000)
      .end();
  }
};
