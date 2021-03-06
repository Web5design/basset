var FullReporter, PlainReporter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PlainReporter = require('./plain');

FullReporter = (function(_super) {

  __extends(FullReporter, _super);

  function FullReporter() {
    return FullReporter.__super__.constructor.apply(this, arguments);
  }

  FullReporter.prototype.onBegin = function() {
    this.done = 0;
    this.results = 0;
    this.failures = 0;
    return this.startTimestamp = new Date().getTime();
  };

  FullReporter.prototype.onResult = function(result) {
    var log;
    this.results += 1;
    log = "#" + (this.done + 1).toString() + " ";
    log += "onLoad: " + (result.getValue('onLoad')) + "ms, ";
    log += "requests: " + (result.getValue('requestsNum')) + " ";
    log += "(html: " + (result.getValue('htmlRequestsNum')) + ", ";
    log += "css: " + (result.getValue('cssRequestsNum')) + ", ";
    log += "js: " + (result.getValue('jsRequestsNum')) + ", ";
    log += "img: " + (result.getValue('imgRequestsNum')) + ", ";
    log += "other: " + (result.getValue('otherRequestsNum')) + ")";
    return console.log(log);
  };

  FullReporter.prototype.onFailure = function(error) {
    this.failures += 1;
    return console.log(error);
  };

  FullReporter.prototype.onTestStop = function() {
    return this.done += 1;
  };

  FullReporter.prototype.onEnd = function(results) {
    var log, testDuration;
    this.stopTimestamp = new Date().getTime();
    testDuration = (this.stopTimestamp - this.startTimestamp) / 1000;
    log = "\n";
    log += ("" + this.done + " tests") + ' ';
    log += ("" + this.results + " results") + ' ';
    log += ("" + this.failures + " errors") + "\n";
    log += ("Finished in " + (testDuration.toFixed(2)) + "s") + "\n\n";
    log += this.getSummaryTable(results);
    return console.log(log);
  };

  return FullReporter;

})(PlainReporter);

module.exports = FullReporter;
