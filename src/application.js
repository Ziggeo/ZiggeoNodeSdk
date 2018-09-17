var Application = function (Connect, ApiConnect) {
  this.Connect = Connect;
  this.ApiConnect = ApiConnect;
};

Application.prototype.get = function (callbacks) {
    this.Connect.getJSON('/v1/application', callbacks);
};

Application.prototype.update = function (data, callbacks) {
    this.Connect.postJSON('/v1/application', callbacks, data);
};

Application.prototype.get_stats = function (data, callbacks) {
    this.ApiConnect.getJSON('/server/v1/application/stats', callbacks, data);
};

module.exports = Application;
