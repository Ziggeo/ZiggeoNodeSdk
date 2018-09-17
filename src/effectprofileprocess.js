var EffectProfileProcess = function (Connect, ApiConnect) {
  this.Connect = Connect;
  this.ApiConnect = ApiConnect;
};

EffectProfileProcess.prototype.index = function (effect_token_or_key, data, callbacks) {
    this.Connect.getJSON('/v1/effects/' + effect_token_or_key + '/process', callbacks, data);
};

EffectProfileProcess.prototype.get = function (effect_token_or_key, token_or_key, callbacks) {
    this.Connect.getJSON('/v1/effects/' + effect_token_or_key + '/process/' + token_or_key + '', callbacks);
};

EffectProfileProcess.prototype.destroy = function (effect_token_or_key, token_or_key, callbacks) {
    this.Connect.destroy('/v1/effects/' + effect_token_or_key + '/process/' + token_or_key + '', callbacks);
};

EffectProfileProcess.prototype.create_filter_process = function (effect_token_or_key, data, callbacks) {
    this.Connect.postJSON('/v1/effects/' + effect_token_or_key + '/process/filter', callbacks, data);
};

EffectProfileProcess.prototype.create_watermark_process = function (effect_token_or_key, data, callbacks) {
    var file = null;
    if (data && data.file) {
      file = data.file;
      delete data.file;
    }
    this.Connect.postJSON('/v1/effects/' + effect_token_or_key + '/process/watermark', callbacks, data, file);
};

module.exports = EffectProfileProcess;
