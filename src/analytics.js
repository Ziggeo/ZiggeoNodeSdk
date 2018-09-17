var Analytics = function (Connect, ApiConnect) {
  this.Connect = Connect;
  this.ApiConnect = ApiConnect;
};

Analytics.prototype.get = function (data, callbacks) {
    this.Connect.postJSON('/v1/analytics/get', callbacks, data);
};

module.exports = Analytics;
