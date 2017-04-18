module.exports = {
  // 'Test main elements visibility' : function (client) {
  //   client
  //     .url('http://localhost:3005')
  //     .waitForElementVisible('body', 1000)
  //     .waitForElementVisible('jobadvisor-app', 10000)
  //     .waitForElementVisible('ja-search-element', 1000)
  //     .waitForElementVisible('ja-results-list', 1000)
  //     .waitForElementVisible('#field-search', 1000)
  //     .waitForElementVisible('#location-search', 1000)
  //     .waitForElementVisible('#dropdown-toggle', 1000)
  //     .waitForElementVisible('#div-filters', 1000)
  //     .waitForElementVisible('#signup-button', 1000);
  // },


  // 'Test input, get results and click on a profile [FULL TEST]' : function (client) {
  //   client
  //     .setValue('#field-search input', 'Gianma')
  //     .setValue('#dropdown-toggle', 'IT Services')
  //     .setValue('#location-search input', 'Lugano, Switzerland')
  //     .click('#button-search')
  //     .pause(2000)
  //     .assert.containsText('ja-results-list > h3',
  //                          'Lugano, Switzerland')
  //     .waitForElementVisible('ja-results-list', 1000)
  //     .waitForElementVisible('ja-results-item', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 > paper-card', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 .result-name', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 .result-profession', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 .result-distance', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 .result-rating', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1 .result-price', 1000)
  //     // Distance value doesn't show up with nightwatch
  //     .assert.containsText('#fl-5625fc2bd82b84d23d8c7bf1 .result-name',
  //                          'Gianmarco Palazzi')
  //     .assert.containsText('#fl-5625fc2bd82b84d23d8c7bf1 .result-profession',
  //                          'Web developer')
  //     .assert.containsText('#fl-5625fc2bd82b84d23d8c7bf1 .result-rating',
  //                          '5')
  //     .assert.containsText('#fl-5625fc2bd82b84d23d8c7bf1 .result-price',
  //                          '100')
  //     // .assert.containsText('#fl-5625fc2bd82b84d23d8c7bf1 .result-distance',
  //     //                      '33.2 km')
  //     .click('#fl-5625fc2bd82b84d23d8c7bf1 a')
  //     .pause(1000)
  //     .assert.urlContains('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bf1')
  //
  //     .waitForElementVisible('#imagediv', 1000)
  //     .waitForElementVisible('#description', 1000)
  //     .waitForElementVisible('#name', 1000)
  //     .assert.containsText('#name',
  //                          'PALAZZI GIANMARCO')
  //     .waitForElementVisible('#address', 1000)
  //     .assert.containsText('#address',
  //                          'Piazza Duomo, 22100 Como')
  //     .waitForElementVisible('#category', 1000)
  //     .assert.containsText('#category',
  //                         'IT Services')
  //     .waitForElementVisible('#profession', 1000)
  //     .assert.containsText('#profession',
  //                          'WEB DEVELOPER')
  //     .waitForElementVisible('#phone', 1000)
  //     .assert.containsText('#phone',
  //                          '+41 79 524 34 54')
  //     .waitForElementVisible('#email', 1000)
  //     .assert.containsText('#email',
  //                          'real.giamma@hotmail.it')
  //     .waitForElementVisible('#price', 1000)
  //     .assert.containsText('#price',
  //                          '100')
  //     .waitForElementVisible('#reviews', 1000)
  //     .waitForElementVisible('#commentarea', 1000)
  //     .waitForElementVisible('#comm', 1000)
  //     .waitForElementVisible('#ratearea', 1000)
  //     .waitForElementVisible('#ratenum', 1000)
  //     .assert.value("#ratenum", "-")
  //     .waitForElementVisible('#review', 1000)
  //     .assert.attributeContains('#review', 'disabled', '')
  //     .setValue('#comm', 'Very nice!')
  //     .setValue('#ratenum', '2')
  //     .assert.attributeContains('#review', 'raised', '')
  //     .click('#review')
  //     .pause(1000)
  //     .assert.attributeContains('#review', 'disabled', '')
  //     .waitForElementVisible('#reviews ja-review-element:nth-child(2) > paper-card  #comment', 1000)
  //     .waitForElementVisible('#reviews ja-review-element:nth-child(2) > paper-card  #rate', 1000)
  //     .waitForElementVisible('#reviews ja-review-element:nth-child(2) > paper-card  #date', 1000)
  //     .assert.containsText('#reviews ja-review-element:nth-child(2) > paper-card  #comment',
  //                              'Very nice!')
  //     .assert.containsText('#reviews ja-review-element:nth-child(2) > paper-card  #rate',
  //                              '2')
  //     .assert.containsText('#reviews ja-review-element:nth-child(2) > paper-card  #date',
  //                              new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear())
  //
  //     // .source(function(result) {
  //     //
  //     // })
  //     // .assert.containsText('#name',
  //     //                      'GIANMARCO')
  // },
  //
  // 'Get back to the home page' : function (client) {
  //   client
  //     .click('#page-title')
  //     .pause(2000)
  //     .waitForElementVisible('ja-search-element', 1000)
  //     .waitForElementVisible('ja-results-list', 1000)
  //     .waitForElementVisible('#field-search', 1000)
  //     .waitForElementVisible('#location-search', 1000)
  //     .waitForElementVisible('#dropdown-toggle', 1000)
  //     .waitForElementVisible('#div-filters', 1000)
  //     .end();
  // },
  //
  //
  // 'Search only by category' : function (client) {
  //   client
  //     .url('http://localhost:3005')
  //     .waitForElementVisible('body', 1000)
  //     .waitForElementVisible('jobadvisor-app', 10000)
  //     .waitForElementVisible('ja-search-element', 1000)
  //     .waitForElementVisible('ja-results-list', 1000)
  //     .waitForElementVisible('#field-search', 1000)
  //     .waitForElementVisible('#location-search', 1000)
  //     .waitForElementVisible('#dropdown-toggle', 1000)
  //     .waitForElementVisible('#div-filters', 1000)
  //     .waitForElementVisible('ja-search-element', 1000)
  //     .waitForElementVisible('ja-results-list', 1000)
  //     .setValue('#field-search input', ' ')
  //     .setValue('#dropdown-toggle', 'IT Services')
  //     .setValue('#location-search input', 'Zurich, Switzerland')
  //     .click('#button-search')
  //     .pause(2000)
  //     .assert.containsText('ja-results-list > h3',
  //                          'Zurich, Switzerland')
  //     .waitForElementVisible('ja-results-item', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bf1', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6 > paper-card', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6 .result-name', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6 .result-profession', 1000)
  //     .waitForElementVisible('#fl-5625fc2bd82b84d23d8c7bd6 .result-distance', 1000)
  //     // Distance value doesn't show up with nightwatch
  //     .assert.containsText('#fl-5625fc2bd82b84d23d8c7bd6 .result-name',
  //                          'Alexander Fischer')
  //     .assert.containsText('#fl-5625fc2bd82b84d23d8c7bd6 .result-profession',
  //                          'Software Engineer')
  //     .click('#fl-5625fc2bd82b84d23d8c7bd6 a')
  //     .pause(1000)
  //     .assert.urlContains('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bd6')
  //     .waitForElementVisible('#imagediv', 1000)
  //     .waitForElementVisible('#description', 1000)
  //     .waitForElementVisible('#name', 1000)
  //     .assert.containsText('#name',
  //                          'FISCHER ALEXANDER')
  //     .waitForElementVisible('#address', 1000)
  //     .assert.containsText('#address',
  //                          'Via Morobbi 13, 6592 Sant\'Antonino')
  //     .waitForElementVisible('#profession', 1000)
  //     .assert.containsText('#profession',
  //                          'SOFTWARE ENGINEER')
  //     .assert.containsText('#category',
  //                      'IT Services')
  //     .waitForElementVisible('#phone', 1000)
  //     .assert.containsText('#phone',
  //                          '+41 79 524 34 54')
  //     .waitForElementVisible('#email', 1000)
  //     .assert.containsText('#email',
  //                          'alexander.scrummaster@hotmail.ru')
  //     .waitForElementVisible('#price', 1000)
  //     .assert.containsText('#price',
  //                          '50')
  //     .waitForElementVisible('#reviews', 1000)
  //     .waitForElementVisible('#commentarea', 1000)
  //     .waitForElementVisible('#comm', 1000)
  //     .waitForElementVisible('#ratearea', 1000)
  //     .waitForElementVisible('#ratenum', 1000)
  //     .assert.value("#ratenum", "-")
  //     .waitForElementVisible('#review', 1000)
  //     .assert.attributeContains('#review', 'disabled', '')
  //     .end();
  //     // Fields content on profile don't show up when running nightwatch
  // },
  //
  // 'Test profile elements visibility' : function (client) {
  //   client
  //     .url('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bd5')
  //     .waitForElementVisible('body', 1000)
  //     .waitForElementVisible('jobadvisor-app', 10000)
  //     // .source(function(response) {
  //     //   console.log(response.value);
  //     // })
  //     .waitForElementVisible('ja-profile', 10000)
  //     .waitForElementVisible('#imagediv', 1000)
  //     .waitForElementVisible('#description', 1000)
  //     .waitForElementVisible('#name', 1000)
  //     .assert.containsText('#name',
  //                          'ROSSI MARIO')
  //     .waitForElementVisible('#address', 1000)
  //     .assert.containsText('#address',
  //                          'Via San Gottardo 12, 6900 Lugano')
  //     .waitForElementVisible('#profession', 1000)
  //     .assert.containsText('#profession',
  //                          'PAINTER')
  //     .assert.containsText('#category',
  //                        'Other')
  //     .waitForElementVisible('#phone', 1000)
  //     .assert.containsText('#phone',
  //                          '+41 4442323223')
  //     .waitForElementVisible('#email', 1000)
  //     .assert.containsText('#email',
  //                          'mario.rossi@gmail.com')
  //     .waitForElementVisible('#price', 1000)
  //     .assert.containsText('#price',
  //                          '100')
  //     .waitForElementVisible('#reviews', 1000)
  //     .waitForElementVisible('#reviews', 1000)
  //     .waitForElementVisible('#commentarea', 1000)
  //     .waitForElementVisible('#comm', 1000)
  //     .waitForElementVisible('#ratearea', 1000)
  //     .waitForElementVisible('#ratenum', 1000)
  //     .assert.value("#ratenum", "-")
  //     .waitForElementVisible('#review', 1000)
  //     .assert.attributeContains('#review', 'disabled', '')
  //     .end();
  // },
  //
  //
  //
  // 'Test review insertion' : function (client) {
  //   client
  //     .url('http://localhost:3005/freelancer/5625fc2bd82b84d23d8c7bd5')
  //     .waitForElementVisible('#reviews', 1000)
  //     .waitForElementVisible('#commentarea', 1000)
  //     .waitForElementVisible('#comm', 1000)
  //     .waitForElementVisible('#ratearea', 1000)
  //     .waitForElementVisible('#ratenum', 1000)
  //     .assert.value("#ratenum", "-")
  //     .waitForElementVisible('#review', 1000)
  //     .assert.attributeContains('#review', 'disabled', '')
  //     .setValue('#comm', 'Very nice!')
  //     .setValue('#ratenum', '2')
  //     .assert.attributeContains('#review', 'raised', '')
  //     .click('#review')
  //     .pause(1000)
  //     .assert.attributeContains('#review', 'disabled', '')
  //     .waitForElementVisible('#reviews ja-review-element:nth-child(2) > paper-card  #comment', 1000)
  //     .waitForElementVisible('#reviews ja-review-element:nth-child(2) > paper-card  #rate', 1000)
  //     .waitForElementVisible('#reviews ja-review-element:nth-child(2) > paper-card  #date', 1000)
  //     .assert.containsText('#reviews ja-review-element:nth-child(2) > paper-card  #comment',
  //                              'Very nice!')
  //     .assert.containsText('#reviews ja-review-element:nth-child(2) > paper-card  #rate',
  //                              '2')
  //     .assert.containsText('#reviews ja-review-element:nth-child(2) > paper-card  #date',
  //                              new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear())
  //     .end();
  // },

  'Test signup' : function (client) {
    client
      .url('http://localhost:3005')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('jobadvisor-app', 10000)
      .waitForElementVisible('ja-search-element', 1000)
      .waitForElementVisible('ja-results-list', 1000)
      .waitForElementVisible('#field-search', 1000)
      .waitForElementVisible('#location-search', 1000)
      .waitForElementVisible('#dropdown-toggle', 1000)
      .waitForElementVisible('#div-filters', 1000)
      .waitForElementVisible('#signup-button', 1000)
      .assert.containsText('#signup-button', 'SIGNUP')
      .click('#signup-button')
      .pause(1000)
      .waitForElementVisible('ja-freelancer-signup', 1000)
      // .waitForElementVisible('#container', 1000)
      .waitForElementVisible('#_firstname', 1000)
      .waitForElementVisible('#fname', 1000)
      .waitForElementVisible('#_lastname', 1000)
      .waitForElementVisible('#lastname', 1000)
      .waitForElementVisible('#_address', 1000)
      .waitForElementVisible('#addr', 1000)
      .waitForElementVisible('#_email', 1000)
      .waitForElementVisible('#femail', 1000)
      .waitForElementVisible('#_profession', 1000)
      .waitForElementVisible('#prof', 1000)
      .waitForElementVisible('#_description', 1000)
      .waitForElementVisible('#desc', 1000)
      .waitForElementVisible('#_category', 1000)
      // .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#_img', 1000)
      // .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#_phonenumber', 1000)
      .waitForElementVisible('#fphone', 1000)
      .waitForElementVisible('#_price', 1000)
      .waitForElementVisible('#fprice', 1000)
      .waitForElementVisible('#selector', 1000)
      .waitForElementVisible('#fsubmit', 1000)
      .setValue('#fname input', 'Gianma')
      .setValue('#lastname input', 'Palaz')
      .setValue('#addr input', 'Via Playboy 3')
      .setValue('#femail input', 'real.gianma@instagram.com')
      .setValue('#prof input', 'Actor')
      .setValue('#desc input', 'Hello')
      .setValue('#fphone input', '000-9000-000')
      .setValue('#fprice input', '300000')
      .click('#fsubmit')
      //TO CHANGE
      .assert.urlContains('http://localhost:3005/')
      .url('http://localhost:3005/signup')
      .waitForElementVisible('ja-freelancer-signup', 1000)
      // .waitForElementVisible('#container', 1000)
      .waitForElementVisible('#_firstname', 1000)
      .waitForElementVisible('#fname', 1000)
      .waitForElementVisible('#_lastname', 1000)
      .waitForElementVisible('#lastname', 1000)
      .waitForElementVisible('#_address', 1000)
      .waitForElementVisible('#addr', 1000)
      .waitForElementVisible('#_email', 1000)
      .waitForElementVisible('#femail', 1000)
      .waitForElementVisible('#_profession', 1000)
      .waitForElementVisible('#prof', 1000)
      .waitForElementVisible('#_description', 1000)
      .waitForElementVisible('#desc', 1000)
      .waitForElementVisible('#_category', 1000)
      // .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#_img', 1000)
      // .waitForElementVisible('#name', 1000)
      .waitForElementVisible('#_phonenumber', 1000)
      .waitForElementVisible('#fphone', 1000)
      .waitForElementVisible('#_price', 1000)
      .waitForElementVisible('#fprice', 1000)
      .waitForElementVisible('#selector', 1000)
      .waitForElementVisible('#fsubmit', 1000)
      .setValue('#fname input', 'Gianma')
      // .setValue('#lastname input', 'Palaz')
      .setValue('#addr input', 'Via Playboy 3')
      .setValue('#femail input', 'real.gianma@instagram.com')
      .setValue('#prof input', 'Actor')
      .setValue('#desc input', 'Hello')
      .setValue('#fphone input', '000-9000-000')
      .setValue('#fprice input', '300000')
      //check that lastname is red
      .end();
  },
};
