module.exports = function (token, private_key, encryption_key) {
    this.Config = new (require(__dirname + "/src/config.js"))(token, private_key, encryption_key);
    var server_api_url = this.Config.server_api_url;
    for (var key in this.Config.regions)
        if (this.Config.token.indexOf(key) === 0 )
            server_api_url = this.Config.regions[key];
    this.Connect = new (require(__dirname + "/src/connect.js"))(this.Config, server_api_url);
    var api_url = this.Config.api_url;
    for (var key in this.Config.api_regions)
        if (this.Config.token.indexOf(key) === 0 )
            api_url = this.Config.api_regions[key];
    this.ApiConnect = new (require(__dirname + "/src/connect.js"))(this.Config, api_url);
    this.Auth = new (require(__dirname + "/src/auth.js"))(this.Config);
    this.Videos = new (require(__dirname + "/src/videos.js"))(this.Connect, this.ApiConnect);
    this.Streams = new (require(__dirname + "/src/streams.js"))(this.Connect, this.ApiConnect);
    this.Authtokens = new (require(__dirname + "/src/authtokens.js"))(this.Connect, this.ApiConnect);
    this.Application = new (require(__dirname + "/src/application.js"))(this.Connect, this.ApiConnect);
    this.EffectProfiles = new (require(__dirname + "/src/effectprofiles.js"))(this.Connect, this.ApiConnect);
    this.EffectProfileProcess = new (require(__dirname + "/src/effectprofileprocess.js"))(this.Connect, this.ApiConnect);
    this.MetaProfiles = new (require(__dirname + "/src/metaprofiles.js"))(this.Connect, this.ApiConnect);
    this.MetaProfileProcess = new (require(__dirname + "/src/metaprofileprocess.js"))(this.Connect, this.ApiConnect);
    this.Webhooks = new (require(__dirname + "/src/webhooks.js"))(this.Connect, this.ApiConnect);
    this.Analytics = new (require(__dirname + "/src/analytics.js"))(this.Connect, this.ApiConnect);
};