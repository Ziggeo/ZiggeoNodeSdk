# Ziggeo's Node.js Server SDK

latest version: **0.1.20**

## Index

1. [Why Ziggeo's Node.js Server Side SDK?](#why-us)
2. [Prerequisites](#prerequisites)
    1. [Download](#download)
    2. [How to use](#how-to-use)

    3[Installation](#install)3. [Client-Side Integration](#codes-client-side)
4. [Server-Side Integration](#codes-server-side)
    1. [Init](#codes-init)
    2. [Available Methods](#codes-methods)
    3. [Methods for Videos](#method-videos)
        1. [Videos ZiggeoSdk.Videos.index](#method-videos-ziggeosdk.videos.index)
        2. [Videos ZiggeoSdk.Videos.count](#method-videos-ziggeosdk.videos.count)
        3. [Videos ZiggeoSdk.Videos.get](#method-videos-ziggeosdk.videos.get)
        4. [Videos ZiggeoSdk.Videos.get Bulk](#method-videos-ziggeosdk.videos.get-bulk)
        5. [Videos ZiggeoSdk.Videos.stats Bulk](#method-videos-ziggeosdk.videos.stats-bulk)
        6. [Videos ZiggeoSdk.Videos.download Video](#method-videos-ziggeosdk.videos.download-video)
        7. [Videos ZiggeoSdk.Videos.download Image](#method-videos-ziggeosdk.videos.download-image)
        8. [Videos ZiggeoSdk.Videos.get Stats](#method-videos-ziggeosdk.videos.get-stats)
        9. [Videos ZiggeoSdk.Videos.push To Service](#method-videos-ziggeosdk.videos.push-to-service)
        10. [Videos ZiggeoSdk.Videos.apply Effect](#method-videos-ziggeosdk.videos.apply-effect)
        11. [Videos ZiggeoSdk.Videos.apply Meta](#method-videos-ziggeosdk.videos.apply-meta)
        12. [Videos ZiggeoSdk.Videos.update](#method-videos-ziggeosdk.videos.update)
        13. [Videos ZiggeoSdk.Videos.update Bulk](#method-videos-ziggeosdk.videos.update-bulk)
        14. [Videos ZiggeoSdk.Videos.destroy](#method-videos-ziggeosdk.videos.destroy)
        15. [Videos ZiggeoSdk.Videos.create](#method-videos-ziggeosdk.videos.create)
        16. [Videos ZiggeoSdk.Videos.analytics](#method-videos-ziggeosdk.videos.analytics)
    4. [Methods for Streams](#method-streams)
        1. [Streams ZiggeoSdk.Streams.index](#method-streams-ziggeosdk.streams.index)
        2. [Streams ZiggeoSdk.Streams.get](#method-streams-ziggeosdk.streams.get)
        3. [Streams ZiggeoSdk.Streams.download Video](#method-streams-ziggeosdk.streams.download-video)
        4. [Streams ZiggeoSdk.Streams.download Image](#method-streams-ziggeosdk.streams.download-image)
        5. [Streams ZiggeoSdk.Streams.push To Service](#method-streams-ziggeosdk.streams.push-to-service)
        6. [Streams ZiggeoSdk.Streams.destroy](#method-streams-ziggeosdk.streams.destroy)
        7. [Streams ZiggeoSdk.Streams.create](#method-streams-ziggeosdk.streams.create)
        8. [Streams ZiggeoSdk.Streams.attach Image](#method-streams-ziggeosdk.streams.attach-image)
        9. [Streams ZiggeoSdk.Streams.attach Video](#method-streams-ziggeosdk.streams.attach-video)
        10. [Streams ZiggeoSdk.Streams.attach Subtitle](#method-streams-ziggeosdk.streams.attach-subtitle)
        11. [Streams ZiggeoSdk.Streams.bind](#method-streams-ziggeosdk.streams.bind)
    5. [Methods for Authtokens](#method-authtokens)
        1. [Authtokens ZiggeoSdk.Authtokens.get](#method-authtokens-ziggeosdk.authtokens.get)
        2. [Authtokens ZiggeoSdk.Authtokens.update](#method-authtokens-ziggeosdk.authtokens.update)
        3. [Authtokens ZiggeoSdk.Authtokens.destroy](#method-authtokens-ziggeosdk.authtokens.destroy)
        4. [Authtokens ZiggeoSdk.Authtokens.create](#method-authtokens-ziggeosdk.authtokens.create)
    6. [Methods for Application](#method-application)
        1. [Application ZiggeoSdk.Application.get](#method-application-ziggeosdk.application.get)
        2. [Application ZiggeoSdk.Application.update](#method-application-ziggeosdk.application.update)
        3. [Application ZiggeoSdk.Application.get Stats](#method-application-ziggeosdk.application.get-stats)
    7. [Methods for Effect Profiles](#method-effect-profiles)
        1. [Effect Profiles ZiggeoSdk.EffectProfiles.create](#method-effect-profiles-ziggeosdk.effectprofiles.create)
        2. [Effect Profiles ZiggeoSdk.EffectProfiles.index](#method-effect-profiles-ziggeosdk.effectprofiles.index)
        3. [Effect Profiles ZiggeoSdk.EffectProfiles.get](#method-effect-profiles-ziggeosdk.effectprofiles.get)
        4. [Effect Profiles ZiggeoSdk.EffectProfiles.destroy](#method-effect-profiles-ziggeosdk.effectprofiles.destroy)
        5. [Effect Profiles ZiggeoSdk.EffectProfiles.update](#method-effect-profiles-ziggeosdk.effectprofiles.update)
    8. [Methods for Effect Profile Process](#method-effect-profile-process)
        1. [Effect Profile Process ZiggeoSdk.EffectProfileProcess.index](#method-effect-profile-process-ziggeosdk.effectprofileprocess.index)
        2. [Effect Profile Process ZiggeoSdk.EffectProfileProcess.get](#method-effect-profile-process-ziggeosdk.effectprofileprocess.get)
        3. [Effect Profile Process ZiggeoSdk.EffectProfileProcess.destroy](#method-effect-profile-process-ziggeosdk.effectprofileprocess.destroy)
        4. [Effect Profile Process ZiggeoSdk.EffectProfileProcess.create Filter Process](#method-effect-profile-process-ziggeosdk.effectprofileprocess.create-filter-process)
        5. [Effect Profile Process ZiggeoSdk.EffectProfileProcess.create Watermark Process](#method-effect-profile-process-ziggeosdk.effectprofileprocess.create-watermark-process)
        6. [Effect Profile Process ZiggeoSdk.EffectProfileProcess.edit Watermark Process](#method-effect-profile-process-ziggeosdk.effectprofileprocess.edit-watermark-process)
    9. [Methods for Meta Profiles](#method-meta-profiles)
        1. [Meta Profiles ZiggeoSdk.MetaProfiles.create](#method-meta-profiles-ziggeosdk.metaprofiles.create)
        2. [Meta Profiles ZiggeoSdk.MetaProfiles.index](#method-meta-profiles-ziggeosdk.metaprofiles.index)
        3. [Meta Profiles ZiggeoSdk.MetaProfiles.get](#method-meta-profiles-ziggeosdk.metaprofiles.get)
        4. [Meta Profiles ZiggeoSdk.MetaProfiles.destroy](#method-meta-profiles-ziggeosdk.metaprofiles.destroy)
    10. [Methods for Meta Profile Process](#method-meta-profile-process)
        1. [Meta Profile Process ZiggeoSdk.MetaProfileProcess.index](#method-meta-profile-process-ziggeosdk.metaprofileprocess.index)
        2. [Meta Profile Process ZiggeoSdk.MetaProfileProcess.get](#method-meta-profile-process-ziggeosdk.metaprofileprocess.get)
        3. [Meta Profile Process ZiggeoSdk.MetaProfileProcess.destroy](#method-meta-profile-process-ziggeosdk.metaprofileprocess.destroy)
        4. [Meta Profile Process ZiggeoSdk.MetaProfileProcess.create Video Analysis Process](#method-meta-profile-process-ziggeosdk.metaprofileprocess.create-video-analysis-process)
        5. [Meta Profile Process ZiggeoSdk.MetaProfileProcess.create Audio Transcription Process](#method-meta-profile-process-ziggeosdk.metaprofileprocess.create-audio-transcription-process)
        6. [Meta Profile Process ZiggeoSdk.MetaProfileProcess.create Nsfw Process](#method-meta-profile-process-ziggeosdk.metaprofileprocess.create-nsfw-process)
    11. [Methods for Webhooks](#method-webhooks)
        1. [Webhooks ZiggeoSdk.Webhooks.create](#method-webhooks-ziggeosdk.webhooks.create)
        2. [Webhooks ZiggeoSdk.Webhooks.confirm](#method-webhooks-ziggeosdk.webhooks.confirm)
        3. [Webhooks ZiggeoSdk.Webhooks.destroy](#method-webhooks-ziggeosdk.webhooks.destroy)
    12. [Methods for Analytics](#method-analytics)
        1. [Analytics ZiggeoSdk.Analytics.get](#method-analytics-ziggeosdk.analytics.get)
6. [License](#license)


## Why Ziggeo's Node.js Server Side SDK? <a name="why-us"></a>

[Ziggeo](https://ziggeo.com) is a powerfull, whitelabel video SAAS with a goal to help people with their video revolution. And what better way to do it than with an award winning multimedia API.

This server side SDK is designed to help you ease the communication with Ziggeo API. In that it allows you to privately communicate between your server and our server through requests of what you want to happen.

It offers you pre-built functionality to call and manipulate and there are demos in /demos/ directory for you to check out and use as starting point.

### Who it is for?

1. Do you have a system that requires calls to be made which should not be seen on client side?
2. Want to have an easier time handling the media as it comes to your server?
3. Want something that is simple and easy to use?
4. You need some powerful features high end video services provide?

If any of the above is "Yes" then you are in the right place as this SDK is for you!

## Prerequisites <a name="prerequisites"></a>

### Download <a name="download"></a>

You will want to either download the SDK zip file or to pull it in as git repository into your own project.

To clone it you would go into your project folder and then
```node    git clone https://github.com/Ziggeo/ZiggeoNodeSdk```

### How to use <a name="how-to-use"></a>

To start using the Node.js SDK you would need to initialize the Ziggeo class with application token, private token and possibly encryption token. The token and keys can be found within the Ziggeo application once you log into your account, under Overview page.


### Installation<a name="install"></a>

npm install ziggeo

## Client-Side Integration<a name="codes-client-side"></a>

For the client-side integration, you need to add these assets to your html file:

```html 
<link rel="stylesheet" href="//assets-cdn.ziggeo.com/v2-stable/ziggeo.css" />
<script src="//assets-cdn.ziggeo.com/v2-stable/ziggeo.js"></script>
```

Then, you need to specify your api token:
```html 
<script>
    var ziggeoApplication = new ZiggeoApi.V2.Application({
        token: "APPLICATION_TOKEN",
        webrtc_streaming_if_necessary: true,
        webrtc_on_mobile: true
    });
</script>
```

You can specify other global options, [see here](https://ziggeo.com/docs).

To fire up a recorder on your page, add:
```html 
<ziggeorecorder></ziggeorecorder>
``` 

To embed a player for an existing video, add:
```html 
<ziggeoplayer ziggeo-video='video-token'></ziggeoplayer>
``` 

For the full documentation, please visit [ziggeo.com](https://ziggeo.com/docs).

## Server-Side Integration<a name="codes-server-side"></a>

### Initialize Ziggeo class in your code<a name="codes-init"></a>

You can integrate the Server SDK as follows:

```node 
Ziggeo = require('ziggeo');
var ZiggeoSdk = new Ziggeo('*token*', '*private_key*', '*encryption_key*'); 
```

Config is optional and if not specified (recommended), the Config file will be used instead.

### Available Methods<a name="codes-methods"></a>

Currently available methods are branched off within different categories:

1.Videos
1.Streams
1.Authtokens
1.Application
1.Effect Profiles
1.Effect Profile Process
1.Meta Profiles
1.Meta Profile Process
1.Webhooks
1.Analytics

Each of this sections has their own actions and they are explained bellow



###Videos<a name="method-videos"></a>


The videos resource allows you to access all single videos. Each video may contain more than one stream.

####Index

Query an array of videos (will return at most 50 videos by default). Newest videos come first.

```node
ZiggeoSdk.Videos.index(arguments, [callbacks])
```

 Arguments
- limit: *Limit the number of returned videos. Can be set up to 100.*
- skip: *Skip the first [n] entries.*
- reverse: *Reverse the order in which videos are returned.*
- states: *Filter videos by state*
- tags: *Filter the search result to certain tags, encoded as a comma-separated string*

####Count

Get the video count for the application.

```node
ZiggeoSdk.Videos.count(arguments, [callbacks])
```

 Arguments
- states: *Filter videos by state*
- tags: *Filter the search result to certain tags, encoded as a comma-separated string*

####Get

Get a single video by token or key.

```node
ZiggeoSdk.Videos.get(token_or_key, [callbacks])
```

####Get Bulk

Get multiple videos by tokens or keys.

```node
ZiggeoSdk.Videos.get_bulk(arguments, [callbacks])
```

 Arguments
- tokens_or_keys: *Comma-separated list with the desired videos tokens or keys (Limit: 100 tokens or keys).*

####Stats Bulk

Get stats for multiple videos by tokens or keys.

```node
ZiggeoSdk.Videos.stats_bulk(arguments, [callbacks])
```

 Arguments
- tokens_or_keys: *Comma-separated list with the desired videos tokens or keys (Limit: 100 tokens or keys).*
- summarize: *Boolean. Set it to TRUE to get the stats summarized. Set it to FALSE to get the stats for each video in a separate array. Default: TRUE.*

####Download Video

Download the video data file

```node
ZiggeoSdk.Videos.download_video(token_or_key, [callbacks])
```

####Download Image

Download the image data file

```node
ZiggeoSdk.Videos.download_image(token_or_key, [callbacks])
```

####Get Stats

Get the video's stats

```node
ZiggeoSdk.Videos.get_stats(token_or_key, [callbacks])
```

####Push To Service

Push a video to a provided push service.

```node
ZiggeoSdk.Videos.push_to_service(token_or_key, arguments, [callbacks])
```

 Arguments
- pushservicetoken: *Push Services's token (from the Push Services configured for the app)*

####Apply Effect

Apply an effect profile to a video.

```node
ZiggeoSdk.Videos.apply_effect(token_or_key, arguments, [callbacks])
```

 Arguments
- effectprofiletoken: *Effect Profile token (from the Effect Profiles configured for the app)*

####Apply Meta

Apply a meta profile to a video.

```node
ZiggeoSdk.Videos.apply_meta(token_or_key, arguments, [callbacks])
```

 Arguments
- metaprofiletoken: *Meta Profile token (from the Meta Profiles configured for the app)*

####Update

Update single video by token or key.

```node
ZiggeoSdk.Videos.update(token_or_key, arguments, [callbacks])
```

 Arguments
- min_duration: *Minimal duration of video*
- max_duration: *Maximal duration of video*
- tags: *Video Tags*
- key: *Unique (optional) name of video*
- volatile: *Automatically removed this video if it remains empty*
- expiration_days: *After how many days will this video be deleted*
- expire_on: *On which date will this video be deleted. String in ISO 8601 format: YYYY-MM-DD*

####Update Bulk

Update multiple videos by token or key.

```node
ZiggeoSdk.Videos.update_bulk(arguments, [callbacks])
```

 Arguments
- tokens_or_keys: *Comma-separated list with the desired videos tokens or keys (Limit: 100 tokens or keys).*
- min_duration: *Minimal duration of video*
- max_duration: *Maximal duration of video*
- tags: *Video Tags*
- volatile: *Automatically removed this video if it remains empty*
- expiration_days: *After how many days will this video be deleted*
- expire_on: *On which date will this video be deleted. String in ISO 8601 format: YYYY-MM-DD*

####Delete

Delete a single video by token or key.

```node
ZiggeoSdk.Videos.destroy(token_or_key, [callbacks])
```

####Create

Create a new video.

```node
ZiggeoSdk.Videos.create(arguments, [callbacks])
```

 Arguments
- file: *Video file to be uploaded*
- min_duration: *Minimal duration of video*
- max_duration: *Maximal duration of video*
- tags: *Video Tags*
- key: *Unique (optional) name of video*
- volatile: *Automatically removed this video if it remains empty*

####Analytics

Get analytics for a specific videos with the given params

```node
ZiggeoSdk.Videos.analytics(token_or_key, arguments, [callbacks])
```

 Arguments
- from: *A UNIX timestamp in microseconds used as the start date of the query*
- to: *A UNIX timestamp in microseconds used as the end date of the query*
- date: *A UNIX timestamp in microseconds to retrieve data from a single date. If set, it overwrites the from and to params.*
- query: *The query you want to run. It can be one of the following: device_views_by_os, device_views_by_date, total_plays_by_country, full_plays_by_country, total_plays_by_hour, full_plays_by_hour, total_plays_by_browser, full_plays_by_browser*

###Streams<a name="method-streams"></a>


The streams resource allows you to directly access all streams associated with a single video.

####Index

Return all streams associated with a video

```node
ZiggeoSdk.Streams.index(video_token_or_key, arguments, [callbacks])
```

 Arguments
- states: *Filter streams by state*

####Get

Get a single stream

```node
ZiggeoSdk.Streams.get(video_token_or_key, token_or_key, [callbacks])
```

####Download Video

Download the video data associated with the stream

```node
ZiggeoSdk.Streams.download_video(video_token_or_key, token_or_key, [callbacks])
```

####Download Image

Download the image data associated with the stream

```node
ZiggeoSdk.Streams.download_image(video_token_or_key, token_or_key, [callbacks])
```

####Push To Service

Push a stream to a provided push service.

```node
ZiggeoSdk.Streams.push_to_service(video_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments
- pushservicetoken: *Push Services's token (from the Push Services configured for the app)*

####Delete

Delete the stream

```node
ZiggeoSdk.Streams.destroy(video_token_or_key, token_or_key, [callbacks])
```

####Create

Create a new stream

```node
ZiggeoSdk.Streams.create(video_token_or_key, arguments, [callbacks])
```

 Arguments
- file: *Video file to be uploaded*

####Attach Image

Attaches an image to a new stream

```node
ZiggeoSdk.Streams.attach_image(video_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments
- file: *Image file to be attached*

####Attach Video

Attaches a video to a new stream

```node
ZiggeoSdk.Streams.attach_video(video_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments
- file: *Video file to be attached*

####Attach Subtitle

Attaches a subtitle to the stream.

```node
ZiggeoSdk.Streams.attach_subtitle(video_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments
- lang: *Subtitle language*
- label: *Subtitle reference*
- data: *Actual subtitle*

####Bind

Closes and submits the stream

```node
ZiggeoSdk.Streams.bind(video_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments

###Authtokens<a name="method-authtokens"></a>


The auth token resource allows you to manage authorization settings for video objects.

####Get

Get a single auth token by token.

```node
ZiggeoSdk.Authtokens.get(token, [callbacks])
```

####Update

Update single auth token by token.

```node
ZiggeoSdk.Authtokens.update(token_or_key, arguments, [callbacks])
```

 Arguments
- volatile: *Will this object automatically be deleted if it remains empty?*
- hidden: *If hidden, the token cannot be used directly.*
- expiration_date: *Expiration date for the auth token (Unix epoch time format)*
- usage_expiration_time: *Expiration time per session (seconds)*
- session_limit: *Maximal number of sessions*
- grants: *Permissions this tokens grants*

####Delete

Delete a single auth token by token.

```node
ZiggeoSdk.Authtokens.destroy(token_or_key, [callbacks])
```

####Create

Create a new auth token.

```node
ZiggeoSdk.Authtokens.create(arguments, [callbacks])
```

 Arguments
- volatile: *Will this object automatically be deleted if it remains empty?*
- hidden: *If hidden, the token cannot be used directly.*
- expiration_date: *Expiration date for the auth token (Unix epoch time format)*
- usage_expiration_time: *Expiration time per session (seconds)*
- session_limit: *Maximal number of sessions*
- grants: *Permissions this tokens grants*

###Application<a name="method-application"></a>


The application token resource allows you to manage your application.

####Get

Read application.

```node
ZiggeoSdk.Application.get([callbacks])
```

####Update

Update application.

```node
ZiggeoSdk.Application.update(arguments, [callbacks])
```

 Arguments
- volatile: *Will this object automatically be deleted if it remains empty?*
- name: *Name of the application*
- auth_token_required_for_create: *Require auth token for creating videos*
- auth_token_required_for_update: *Require auth token for updating videos*
- auth_token_required_for_read: *Require auth token for reading videos*
- auth_token_required_for_destroy: *Require auth token for deleting videos*
- client_can_index_videos: *Client is allowed to perform the index operation*
- client_cannot_access_unaccepted_videos: *Client cannot view unaccepted videos*
- enable_video_subpages: *Enable hosted video pages*

####Get Stats

Read application stats

```node
ZiggeoSdk.Application.get_stats(arguments, [callbacks])
```

 Arguments
- period: *Optional. Can be 'year' or 'month'.*

###Effect Profiles<a name="method-effect-profiles"></a>


The effect profiles resource allows you to access and create effect profiles for your app. Each effect profile may contain one process or more.

####Create

Create a new effect profile.

```node
ZiggeoSdk.EffectProfiles.create(arguments, [callbacks])
```

 Arguments
- key: *Effect profile key.*
- title: *Effect profile title.*
- default_effect: *Boolean. If TRUE, sets an effect profile as default. If FALSE, removes the default status for the given effect*

####Index

Get list of effect profiles.

```node
ZiggeoSdk.EffectProfiles.index(arguments, [callbacks])
```

 Arguments
- limit: *Limit the number of returned effect profiles. Can be set up to 100.*
- skip: *Skip the first [n] entries.*
- reverse: *Reverse the order in which effect profiles are returned.*

####Get

Get a single effect profile

```node
ZiggeoSdk.EffectProfiles.get(token_or_key, [callbacks])
```

####Delete

Delete the effect profile

```node
ZiggeoSdk.EffectProfiles.destroy(token_or_key, [callbacks])
```

####Update

Updates an effect profile.

```node
ZiggeoSdk.EffectProfiles.update(token_or_key, arguments, [callbacks])
```

 Arguments
- default_effect: *Boolean. If TRUE, sets an effect profile as default. If FALSE, removes the default status for the given effect*

###Effect Profile Process<a name="method-effect-profile-process"></a>


The process resource allows you to directly access all process associated with a single effect profile.

####Index

Return all processes associated with a effect profile

```node
ZiggeoSdk.EffectProfileProcess.index(effect_token_or_key, arguments, [callbacks])
```

 Arguments
- states: *Filter streams by state*

####Get

Get a single process

```node
ZiggeoSdk.EffectProfileProcess.get(effect_token_or_key, token_or_key, [callbacks])
```

####Delete

Delete the process

```node
ZiggeoSdk.EffectProfileProcess.destroy(effect_token_or_key, token_or_key, [callbacks])
```

####Create Filter Process

Create a new filter effect process

```node
ZiggeoSdk.EffectProfileProcess.create_filter_process(effect_token_or_key, arguments, [callbacks])
```

 Arguments
- effect: *Effect to be applied in the process*

####Create Watermark Process

Attaches an image to a new stream

```node
ZiggeoSdk.EffectProfileProcess.create_watermark_process(effect_token_or_key, arguments, [callbacks])
```

 Arguments
- file: *Image file to be attached*
- vertical_position: *Specify the vertical position of your watermark (a value between 0.0 and 1.0)*
- horizontal_position: *Specify the horizontal position of your watermark (a value between 0.0 and 1.0)*
- video_scale: *Specify the image scale of your watermark (a value between 0.0 and 1.0)*

####Edit Watermark Process

Edits an existing watermark process.

```node
ZiggeoSdk.EffectProfileProcess.edit_watermark_process(effect_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments
- file: *Image file to be attached*
- vertical_position: *Specify the vertical position of your watermark (a value between 0.0 and 1.0)*
- horizontal_position: *Specify the horizontal position of your watermark (a value between 0.0 and 1.0)*
- video_scale: *Specify the image scale of your watermark (a value between 0.0 and 1.0)*

###Meta Profiles<a name="method-meta-profiles"></a>


The meta profiles resource allows you to access and create meta profiles for your app. Each meta profile may contain one process or more.

####Create

Create a new meta profile.

```node
ZiggeoSdk.MetaProfiles.create(arguments, [callbacks])
```

 Arguments
- key: *Meta Profile profile key.*
- title: *Meta Profile profile title.*

####Index

Get list of meta profiles.

```node
ZiggeoSdk.MetaProfiles.index(arguments, [callbacks])
```

 Arguments
- limit: *Limit the number of returned meta profiles. Can be set up to 100.*
- skip: *Skip the first [n] entries.*
- reverse: *Reverse the order in which meta profiles are returned.*

####Get

Get a single meta profile

```node
ZiggeoSdk.MetaProfiles.get(token_or_key, [callbacks])
```

####Delete

Delete the meta profile

```node
ZiggeoSdk.MetaProfiles.destroy(token_or_key, [callbacks])
```

###Meta Profile Process<a name="method-meta-profile-process"></a>


The process resource allows you to directly access all process associated with a single meta profile.

####Index

Return all processes associated with a meta profile

```node
ZiggeoSdk.MetaProfileProcess.index(meta_token_or_key, [callbacks])
```

####Get

Get a single process

```node
ZiggeoSdk.MetaProfileProcess.get(meta_token_or_key, token_or_key, [callbacks])
```

####Delete

Delete the process

```node
ZiggeoSdk.MetaProfileProcess.destroy(meta_token_or_key, token_or_key, [callbacks])
```

####Create Video Analysis Process

Create a new video analysis meta process

```node
ZiggeoSdk.MetaProfileProcess.create_video_analysis_process(meta_token_or_key, [callbacks])
```

####Create Audio Transcription Process

Create a new audio transcription meta process

```node
ZiggeoSdk.MetaProfileProcess.create_audio_transcription_process(meta_token_or_key, [callbacks])
```

####Create Nsfw Process

Create a new nsfw filter meta process

```node
ZiggeoSdk.MetaProfileProcess.create_nsfw_process(meta_token_or_key, arguments, [callbacks])
```

 Arguments
- nsfw_action: *One of the following three: approve, reject, nothing.*

###Webhooks<a name="method-webhooks"></a>


The webhooks resource allows you to create or delete webhooks related to a given application.

####Create

Create a new webhook for the given url to catch the given events.

```node
ZiggeoSdk.Webhooks.create(arguments, [callbacks])
```

 Arguments
- target_url: *The url that will catch the events*
- encoding: *Data encoding to be used by the webhook to send the events.*
- events: *Comma-separated list of the events the webhook will catch. They must be valid webhook type events.*

####Confirm

Confirm a webhook using its ID and the corresponding validation code.

```node
ZiggeoSdk.Webhooks.confirm(arguments, [callbacks])
```

 Arguments
- webhook_id: *Webhook ID that's returned in the creation call.*
- validation_code: *Validation code that is sent to the webhook when created.*

####Delete

Delete a webhook using its URL.

```node
ZiggeoSdk.Webhooks.destroy(arguments, [callbacks])
```

 Arguments
- target_url: *The url that will catch the events*

###Analytics<a name="method-analytics"></a>


The analytics resource allows you to access the analytics for the given application

####Get

Get analytics for the given params

```node
ZiggeoSdk.Analytics.get(arguments, [callbacks])
```

 Arguments
- from: *A UNIX timestamp in microseconds used as the start date of the query*
- to: *A UNIX timestamp in microseconds used as the end date of the query*
- date: *A UNIX timestamp in microseconds to retrieve data from a single date. If set, it overwrites the from and to params.*
- query: *The query you want to run. It can be one of the following: device_views_by_os, device_views_by_date, total_plays_by_country, full_plays_by_country, total_plays_by_hour, full_plays_by_hour, total_plays_by_browser, full_plays_by_browser*





## License <a name="license"></a>

Copyright (c) 2013-2020 Ziggeo
 
Apache 2.0 License
