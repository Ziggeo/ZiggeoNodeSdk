var Analytics = function (Connect) {
  this.Connect = Connect;
};

Analytics.prototype.get = function (data, callbacks) {
    this.Connect.postJSON('/v1/analytics/get', callbacks, data);
};

module.exports = Analytics;
