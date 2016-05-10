var mochaGlobals = require('./.globals.json').globals;

require('../fixtures/work-diff/sunday');
require('../fixtures/work-diff/monday');
require('../fixtures/work-diff/tuesday');
require('../fixtures/work-diff/wednesday');
require('../fixtures/work-diff/thursday');
require('../fixtures/work-diff/friday');
require('../fixtures/work-diff/saturday');
require('../fixtures/modify/add');
require('../fixtures/modify/subtract');

window.mocha.setup('bdd');
window.onload = function() {
  window.mocha.checkLeaks();
  window.mocha.globals(Object.keys(mochaGlobals));
  window.mocha.run();
  require('./setup')(window);
};
