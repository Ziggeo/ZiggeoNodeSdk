var MetaProfileProcess = function (Connect, ApiConnect) {
  this.Connect = Connect;
  this.ApiConnect = ApiConnect;
};

MetaProfileProcess.prototype.index = function (meta_token_or_key, callbacks) {
    this.Connect.getJSON('/v1/metaprofiles/' + meta_token_or_key + '/process', callbacks);
};

MetaProfileProcess.prototype.get = function (meta_token_or_key, token_or_key, callbacks) {
    this.Connect.getJSON('/v1/metaprofiles/' + meta_token_or_key + '/process/' + token_or_key + '', callbacks);
};

MetaProfileProcess.prototype.destroy = function (meta_token_or_key, token_or_key, callbacks) {
    this.Connect.destroy('/v1/metaprofiles/' + meta_token_or_key + '/process/' + token_or_key + '', callbacks);
};

MetaProfileProcess.prototype.create_video_analysis_process = function (meta_token_or_key, callbacks) {
    this.Connect.postJSON('/v1/metaprofiles/' + meta_token_or_key + '/process/analysis', callbacks);
};

MetaProfileProcess.prototype.create_audio_transcription_process = function (meta_token_or_key, callbacks) {
    this.Connect.postJSON('/v1/metaprofiles/' + meta_token_or_key + '/process/transcription', callbacks);
};

MetaProfileProcess.prototype.create_nsfw_process = function (meta_token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/metaprofiles/' + meta_token_or_key + '/process/nsfw', callbacks, data);
};

module.exports = MetaProfileProcess;
