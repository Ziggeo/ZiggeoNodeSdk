var Videos = function (Connect) {
  this.Connect = Connect;
};

Videos.prototype.index = function (data, callbacks) {
    this.Connect.getJSON('/v1/videos/', callbacks, data);
};

Videos.prototype.count = function (data, callbacks) {
    this.Connect.getJSON('/v1/videos/count', callbacks, data);
};

Videos.prototype.get = function (token_or_key, callbacks) {
    this.Connect.getJSON('/v1/videos/' + token_or_key + '', callbacks);
};

Videos.prototype.get_bulk = function (data, callbacks) {
    this.Connect.postJSON('/v1/videos/get_bulk', callbacks, data);
};

Videos.prototype.stats_bulk = function (data, callbacks) {
    this.Connect.postJSON('/v1/videos/stats_bulk', callbacks, data);
};

Videos.prototype.download_video = function (token_or_key, callbacks) {
    this.Connect.getBinary('/v1/videos/' + token_or_key + '/video', callbacks);
};

Videos.prototype.download_image = function (token_or_key, callbacks) {
    this.Connect.getBinary('/v1/videos/' + token_or_key + '/image', callbacks);
};

Videos.prototype.get_stats = function (token_or_key, callbacks) {
    this.Connect.getJSON('/v1/videos/' + token_or_key + '/stats', callbacks);
};

Videos.prototype.push_to_service = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/videos/' + token_or_key + '/push', callbacks, data);
};

Videos.prototype.apply_effect = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/videos/' + token_or_key + '/effect', callbacks, data);
};

Videos.prototype.apply_meta = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/videos/' + token_or_key + '/metaprofile', callbacks, data);
};

Videos.prototype.update = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/videos/' + token_or_key + '', callbacks, data);
};

Videos.prototype.update_bulk = function (data, callbacks) {
    this.Connect.postJSON('/v1/videos/update_bulk', callbacks, data);
};

Videos.prototype.destroy = function (token_or_key, callbacks) {
    this.Connect.destroy('/v1/videos/' + token_or_key + '', callbacks);
};

Videos.prototype.create = function (data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    this.Connect.postJSON('/v1/videos/', callbacks, data, file);
};

Videos.prototype.analytics = function (token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/videos/' + token_or_key + '/analytics', callbacks, data);
};

module.exports = Videos;
