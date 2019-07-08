Scoped.define("module:ZiggeoSdk", [
    "base:Class",
    "module:Config",
    "module:Connect",
    "module:Auth",
    "module:Videos",
    "module:Streams",
    "module:Authtokens",
    "module:Application",
    "module:EffectProfiles",
    "module:EffectProfileProcess",
    "module:MetaProfiles",
    "module:MetaProfileProcess",
    "module:Webhooks",
    "module:Analytics"
], function (Class, Config, Connect, Auth, Videos, Streams, Authtokens, Application, EffectProfiles, EffectProfileProcess, MetaProfiles, MetaProfileProcess, Webhooks, Analytics, scoped) {
    return Class.extend({scoped: scoped}, function (inherited) {
        return {

            constructor: function (token, private_key, encryption_key) {
                inherited.constructor.call(this);
                this.Config = new Config(token, private_key, encryption_key);
                var server_api_url = this.Config.server_api_url;
                for (var key in this.Config.regions)
                    if (this.Config.token.indexOf(key) === 0)
                        server_api_url = this.Config.regions[key];
                this.Connect = new Connect(this.Config, server_api_url);
                var api_url = this.Config.api_url;
                for (var key in this.Config.api_regions)
                    if (this.Config.token.indexOf(key) === 0)
                        api_url = this.Config.api_regions[key];
                this.ApiConnect = new Connect(this.Config, api_url);
                this.Auth = new Auth(this.Config);
                this.Videos = new Videos(this.Connect, this.ApiConnect);
                this.Streams = new Streams(this.Connect, this.ApiConnect);
                this.Authtokens = new Authtokens(this.Connect, this.ApiConnect);
                this.Application = new Application(this.Connect, this.ApiConnect);
                this.EffectProfiles = new EffectProfiles(this.Connect, this.ApiConnect);
                this.EffectProfileProcess = new EffectProfileProcess(this.Connect, this.ApiConnect);
                this.MetaProfiles = new MetaProfiles(this.Connect, this.ApiConnect);
                this.MetaProfileProcess = new MetaProfileProcess(this.Connect, this.ApiConnect);
                this.Webhooks = new Webhooks(this.Connect, this.ApiConnect);
                this.Analytics = new Analytics(this.Connect, this.ApiConnect);
            }

        };
    });
});