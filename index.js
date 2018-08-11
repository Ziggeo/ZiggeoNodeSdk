module.exports = function (token, private_key, encryption_key) {
    this.Config = new (require(__dirname + "/src/config.js"))(token, private_key, encryption_key);
    this.Connect = new (require(__dirname + "/src/connect.js"))(this.Config);
    this.Auth = new (require(__dirname + "/src/auth.js"))(this.Config);
    this.Videos = new (require(__dirname + "/src/videos.js"))(this.Connect);
    this.Streams = new (require(__dirname + "/src/streams.js"))(this.Connect);
    this.Authtokens = new (require(__dirname + "/src/authtokens.js"))(this.Connect);
    this.EffectProfiles = new (require(__dirname + "/src/effectprofiles.js"))(this.Connect);
    this.EffectProfileProcess = new (require(__dirname + "/src/effectprofileprocess.js"))(this.Connect);
    this.MetaProfiles = new (require(__dirname + "/src/metaprofiles.js"))(this.Connect);
    this.MetaProfileProcess = new (require(__dirname + "/src/metaprofileprocess.js"))(this.Connect);
    this.Webhooks = new (require(__dirname + "/src/webhooks.js"))(this.Connect);
    this.Analytics = new (require(__dirname + "/src/analytics.js"))(this.Connect);
};