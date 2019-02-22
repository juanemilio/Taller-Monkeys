function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
  function stop() {
    horde.stop();
    callback();
  }
  var horde = window.gremlins.createHorde();
  horde.seed(1234);


  var formFillerGremlin = gremlins.species.formFiller().canFillElement(function (element) {
    return document.querySelectorAll('textarea').length || document.querySelectorAll('input[type=text]').length ||
    document.querySelectorAll('input[type=password]').length || document.querySelectorAll('input[type=email]').length    
  });
  horde.gremlin(formFillerGremlin);

  var clickerGremlin = gremlins.species.clicker().canClick(function(element) {
    return document.getElementsByTagName('a').length || document.getElementsByTagName('button').length;
  });
  horde.gremlin(clickerGremlin);

  var distributionStrategy = gremlins.strategies.distribution ();
  distributionStrategy.distribution ([0.2, 0.4, 0.2, 0.2]);
  horde.strategy (distributionStrategy);


  horde.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});