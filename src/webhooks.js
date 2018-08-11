var Webhooks = function (Connect) {
  this.Connect = Connect;
};

Webhooks.prototype.create = function (data, callbacks) {
    this.Connect.post('/v1/api/hook', callbacks, data);
};

Webhooks.prototype.destroy = function (data, callbacks) {
    this.Connect.post('/v1/api/removehook', callbacks, data);
};

module.exports = Webhooks;
