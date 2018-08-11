var Authtokens = function (Connect) {
  this.Connect = Connect;
};

Authtokens.prototype.get = function (token, callbacks) {
    this.Connect.getJSON('/v1/authtokens/' + token + '', callbacks);
};

Authtokens.prototype.update = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/authtokens/' + token_or_key + '', callbacks, data);
};

Authtokens.prototype.destroy = function (token_or_key, callbacks) {
    this.Connect.destroy('/v1/authtokens/' + token_or_key + '', callbacks);
};

Authtokens.prototype.create = function (data, callbacks) {
    this.Connect.postJSON('/v1/authtokens/', callbacks, data);
};

module.exports = Authtokens;
