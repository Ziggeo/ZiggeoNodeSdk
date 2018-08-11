var Streams = function (Connect) {
  this.Connect = Connect;
};

Streams.prototype.index = function (video_token_or_key, data, callbacks) {
    this.Connect.getJSON('/v1/videos/' + video_token_or_key + '/streams', callbacks, data);
};

Streams.prototype.get = function (video_token_or_key, token_or_key, callbacks) {
    this.Connect.getJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '', callbacks);
};

Streams.prototype.download_video = function (video_token_or_key, token_or_key, callbacks) {
    this.Connect.getBinary('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/video', callbacks);
};

Streams.prototype.download_image = function (video_token_or_key, token_or_key, callbacks) {
    this.Connect.getBinary('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/image', callbacks);
};

Streams.prototype.push_to_service = function (video_token_or_key, token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/push', callbacks, data);
};

Streams.prototype.destroy = function (video_token_or_key, token_or_key, callbacks) {
    this.Connect.destroy('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '', callbacks);
};

Streams.prototype.create = function (video_token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams', callbacks, data, file);
};

Streams.prototype.attach_image = function (video_token_or_key, token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/image', callbacks, data, file);
};

Streams.prototype.attach_video = function (video_token_or_key, token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/video', callbacks, data, file);
};

Streams.prototype.bind = function (video_token_or_key, token_or_key, callbacks) {
    this.Connect.postJSON('/v1/videos/' + video_token_or_key + '/streams/' + token_or_key + '/bind', callbacks);
};

module.exports = Streams;
