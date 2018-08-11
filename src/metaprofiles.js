var MetaProfiles = function (Connect) {
  this.Connect = Connect;
};

MetaProfiles.prototype.create = function (data, callbacks) {
    this.Connect.postJSON('/v1/metaprofiles/', callbacks, data);
};

MetaProfiles.prototype.index = function (data, callbacks) {
    this.Connect.getJSON('/v1/metaprofiles/', callbacks, data);
};

MetaProfiles.prototype.get = function (token_or_key, callbacks) {
    this.Connect.getJSON('/v1/metaprofiles/' + token_or_key + '', callbacks);
};

MetaProfiles.prototype.destroy = function (token_or_key, callbacks) {
    this.Connect.destroy('/v1/metaprofiles/' + token_or_key + '', callbacks);
};

module.exports = MetaProfiles;
