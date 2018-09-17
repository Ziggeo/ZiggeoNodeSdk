var EffectProfiles = function (Connect, ApiConnect) {
  this.Connect = Connect;
  this.ApiConnect = ApiConnect;
};

EffectProfiles.prototype.create = function (data, callbacks) {
    this.Connect.postJSON('/v1/effects/', callbacks, data);
};

EffectProfiles.prototype.index = function (data, callbacks) {
    this.Connect.getJSON('/v1/effects/', callbacks, data);
};

EffectProfiles.prototype.get = function (token_or_key, callbacks) {
    this.Connect.getJSON('/v1/effects/' + token_or_key + '', callbacks);
};

EffectProfiles.prototype.destroy = function (token_or_key, callbacks) {
    this.Connect.destroy('/v1/effects/' + token_or_key + '', callbacks);
};

EffectProfiles.prototype.update = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/effects/' + token_or_key + '', callbacks, data);
};

module.exports = EffectProfiles;
