# Ziggeo's Node.js Server SDK

latest version: **0.1.26**

## Index

1. [Why Ziggeo's Node.js Server Side SDK?](#why-us)
2. [Prerequisites](#prerequisites)
    1. [Download](#download)
    2. [How to use](#how-to-use)
    3. [Installation](#install)
3. [Client-Side Integration](#codes-client-side)
4. [Server-Side Integration](#codes-server-side)
    1. [Init](#codes-init)
    2. [Available Methods](#codes-methods)
    3. [Methods for Videos](#method-videos)
        1. [Videos Index](#method-videos-index)
        2. [Videos Count](#method-videos-count)
        3. [Videos Get](#method-videos-get)
        4. [Videos Get Bulk](#method-videos-get-bulk)
        5. [Videos Stats Bulk](#method-videos-stats-bulk)
        6. [Videos Download Video](#method-videos-download-video)
        7. [Videos Download Image](#method-videos-download-image)
        8. [Videos Get Stats](#method-videos-get-stats)
        9. [Videos Push To Service](#method-videos-push-to-service)
        10. [Videos Apply Effect](#method-videos-apply-effect)
        11. [Videos Apply Meta](#method-videos-apply-meta)
        12. [Videos Update](#method-videos-update)
        13. [Videos Update Bulk](#method-videos-update-bulk)
        14. [Videos Destroy](#method-videos-destroy)
        15. [Videos Create](#method-videos-create)
        16. [Videos Analytics](#method-videos-analytics)
    4. [Methods for Streams](#method-streams)
        1. [Streams Index](#method-streams-index)
        2. [Streams Get](#method-streams-get)
        3. [Streams Download Video](#method-streams-download-video)
        4. [Streams Download Image](#method-streams-download-image)
        5. [Streams Push To Service](#method-streams-push-to-service)
        6. [Streams Destroy](#method-streams-destroy)
        7. [Streams Create](#method-streams-create)
        8. [Streams Attach Image](#method-streams-attach-image)
        9. [Streams Attach Video](#method-streams-attach-video)
        10. [Streams Attach Subtitle](#method-streams-attach-subtitle)
        11. [Streams Bind](#method-streams-bind)
    5. [Methods for Authtokens](#method-authtokens)
        1. [Authtokens Get](#method-authtokens-get)
        2. [Authtokens Update](#method-authtokens-update)
        3. [Authtokens Destroy](#method-authtokens-destroy)
        4. [Authtokens Create](#method-authtokens-create)
    6. [Methods for Application](#method-application)
        1. [Application Get](#method-application-get)
        2. [Application Update](#method-application-update)
        3. [Application Get Stats](#method-application-get-stats)
    7. [Methods for Effect Profiles](#method-effect-profiles)
        1. [Effect Profiles Create](#method-effect-profiles-create)
        2. [Effect Profiles Index](#method-effect-profiles-index)
        3. [Effect Profiles Get](#method-effect-profiles-get)
        4. [Effect Profiles Destroy](#method-effect-profiles-destroy)
        5. [Effect Profiles Update](#method-effect-profiles-update)
    8. [Methods for Effect Profile Process](#method-effect-profile-process)
        1. [Effect Profile Process Index](#method-effect-profile-process-index)
        2. [Effect Profile Process Get](#method-effect-profile-process-get)
        3. [Effect Profile Process Destroy](#method-effect-profile-process-destroy)
        4. [Effect Profile Process Create Filter Process](#method-effect-profile-process-create-filter-process)
        5. [Effect Profile Process Create Watermark Process](#method-effect-profile-process-create-watermark-process)
        6. [Effect Profile Process Edit Watermark Process](#method-effect-profile-process-edit-watermark-process)
    9. [Methods for Meta Profiles](#method-meta-profiles)
        1. [Meta Profiles Create](#method-meta-profiles-create)
        2. [Meta Profiles Index](#method-meta-profiles-index)
        3. [Meta Profiles Get](#method-meta-profiles-get)
        4. [Meta Profiles Destroy](#method-meta-profiles-destroy)
    10. [Methods for Meta Profile Process](#method-meta-profile-process)
        1. [Meta Profile Process Index](#method-meta-profile-process-index)
        2. [Meta Profile Process Get](#method-meta-profile-process-get)
        3. [Meta Profile Process Destroy](#method-meta-profile-process-destroy)
        4. [Meta Profile Process Create Video Analysis Process](#method-meta-profile-process-create-video-analysis-process)
        5. [Meta Profile Process Create Audio Transcription Process](#method-meta-profile-process-create-audio-transcription-process)
        6. [Meta Profile Process Create Nsfw Process](#method-meta-profile-process-create-nsfw-process)
        7. [Meta Profile Process Create Profanity Process](#method-meta-profile-process-create-profanity-process)
    11. [Methods for Webhooks](#method-webhooks)
        1. [Webhooks Create](#method-webhooks-create)
        2. [Webhooks Confirm](#method-webhooks-confirm)
        3. [Webhooks Destroy](#method-webhooks-destroy)
    12. [Methods for Analytics](#method-analytics)
        1. [Analytics Get](#method-analytics-get)
5. [License](#license)


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

1. Videos
2. Streams
3. Authtokens
4. Application
5. Effect Profiles
6. Effect Profile Process
7. Meta Profiles
8. Meta Profile Process
9. Webhooks
10. Analytics

Each of this sections has their own actions and they are explained bellow



### Videos<a name="method-videos"></a>


The videos resource allows you to access all single videos. Each video may contain more than one stream.

#### Index<a name="method-videos-index"></a>

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

#### Count<a name="method-videos-count"></a>

Get the video count for the application.

```node
ZiggeoSdk.Videos.count(arguments, [callbacks])
```

 Arguments
- states: *Filter videos by state*
- tags: *Filter the search result to certain tags, encoded as a comma-separated string*

#### Get<a name="method-videos-get"></a>

Get a single video by token or key.

```node
ZiggeoSdk.Videos.get(token_or_key, [callbacks])
```

#### Get Bulk<a name="method-videos-get-bulk"></a>

Get multiple videos by tokens or keys.

```node
ZiggeoSdk.Videos.get_bulk(arguments, [callbacks])
```

 Arguments
- tokens_or_keys: *Comma-separated list with the desired videos tokens or keys (Limit: 100 tokens or keys).*

#### Stats Bulk<a name="method-videos-stats-bulk"></a>

Get stats for multiple videos by tokens or keys.

```node
ZiggeoSdk.Videos.stats_bulk(arguments, [callbacks])
```

 Arguments
- tokens_or_keys: *Comma-separated list with the desired videos tokens or keys (Limit: 100 tokens or keys).*
- summarize: *Boolean. Set it to TRUE to get the stats summarized. Set it to FALSE to get the stats for each video in a separate array. Default: TRUE.*

#### Download Video<a name="method-videos-download-video"></a>

Download the video data file

```node
ZiggeoSdk.Videos.download_video(token_or_key, [callbacks])
```

#### Download Image<a name="method-videos-download-image"></a>

Download the image data file

```node
ZiggeoSdk.Videos.download_image(token_or_key, [callbacks])
```

#### Get Stats<a name="method-videos-get-stats"></a>

Get the video's stats

```node
ZiggeoSdk.Videos.get_stats(token_or_key, [callbacks])
```

#### Push To Service<a name="method-videos-push-to-service"></a>

Push a video to a provided push service.

```node
ZiggeoSdk.Videos.push_to_service(token_or_key, arguments, [callbacks])
```

 Arguments
- pushservicetoken: *Push Services's token (from the Push Services configured for the app)*

#### Apply Effect<a name="method-videos-apply-effect"></a>

Apply an effect profile to a video.

```node
ZiggeoSdk.Videos.apply_effect(token_or_key, arguments, [callbacks])
```

 Arguments
- effectprofiletoken: *Effect Profile token (from the Effect Profiles configured for the app)*

#### Apply Meta<a name="method-videos-apply-meta"></a>

Apply a meta profile to a video.

```node
ZiggeoSdk.Videos.apply_meta(token_or_key, arguments, [callbacks])
```

 Arguments
- metaprofiletoken: *Meta Profile token (from the Meta Profiles configured for the app)*

#### Update<a name="method-videos-update"></a>

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

#### Update Bulk<a name="method-videos-update-bulk"></a>

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

#### Delete<a name="method-videos-delete"></a>

Delete a single video by token or key.

```node
ZiggeoSdk.Videos.destroy(token_or_key, [callbacks])
```

#### Create<a name="method-videos-create"></a>

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
- effect_profile: *Set the effect profile that you want to have applied to your video.*
- meta_profile: *Set the meta profile that you want to have applied to your video once created.*
- video_profile: *Set the video profile that you want to have applied to your video as you create it.*

#### Analytics<a name="method-videos-analytics"></a>

Get analytics for a specific videos with the given params

```node
ZiggeoSdk.Videos.analytics(token_or_key, arguments, [callbacks])
```

 Arguments
- from: *A UNIX timestamp in microseconds used as the start date of the query*
- to: *A UNIX timestamp in microseconds used as the end date of the query*
- date: *A UNIX timestamp in microseconds to retrieve data from a single date. If set, it overwrites the from and to params.*
- query: *The query you want to run. It can be one of the following: device_views_by_os, device_views_by_date, total_plays_by_country, full_plays_by_country, total_plays_by_hour, full_plays_by_hour, total_plays_by_browser, full_plays_by_browser*

### Streams<a name="method-streams"></a>


The streams resource allows you to directly access all streams associated with a single video.

#### Index<a name="method-streams-index"></a>

Return all streams associated with a video

```node
ZiggeoSdk.Streams.index(video_token_or_key, arguments, [callbacks])
```

 Arguments
- states: *Filter streams by state*

#### Get<a name="method-streams-get"></a>

Get a single stream

```node
ZiggeoSdk.Streams.get(video_token_or_key, token_or_key, [callbacks])
```

#### Download Video<a name="method-streams-download-video"></a>

Download the video data associated with the stream

```node
ZiggeoSdk.Streams.download_video(video_token_or_key, token_or_key, [callbacks])
```

#### Download Image<a name="method-streams-download-image"></a>

Download the image data associated with the stream

```node
ZiggeoSdk.Streams.download_image(video_token_or_key, token_or_key, [callbacks])
```

#### Push To Service<a name="method-streams-push-to-service"></a>

Push a stream to a provided push service.

```node
ZiggeoSdk.Streams.push_to_service(video_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments
- pushservicetoken: *Push Services's token (from the Push Services configured for the app)*

#### Delete<a name="method-streams-delete"></a>

Delete the stream

```node
ZiggeoSdk.Streams.destroy(video_token_or_key, token_or_key, [callbacks])
```

#### Create<a name="method-streams-create"></a>

Create a new stream

```node
ZiggeoSdk.Streams.create(video_token_or_key, arguments, [callbacks])
```

 Arguments
- file: *Video file to be uploaded*

#### Attach Image<a name="method-streams-attach-image"></a>

Attaches an image to a new stream

```node
ZiggeoSdk.Streams.attach_image(video_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments
- file: *Image file to be attached*

#### Attach Video<a name="method-streams-attach-video"></a>

Attaches a video to a new stream

```node
ZiggeoSdk.Streams.attach_video(video_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments
- file: *Video file to be attached*

#### Attach Subtitle<a name="method-streams-attach-subtitle"></a>

Attaches a subtitle to the stream.

```node
ZiggeoSdk.Streams.attach_subtitle(video_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments
- lang: *Subtitle language*
- label: *Subtitle reference*
- data: *Actual subtitle*

#### Bind<a name="method-streams-bind"></a>

Closes and submits the stream

```node
ZiggeoSdk.Streams.bind(video_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments

### Authtokens<a name="method-authtokens"></a>


The auth token resource allows you to manage authorization settings for video objects.

#### Get<a name="method-authtokens-get"></a>

Get a single auth token by token.

```node
ZiggeoSdk.Authtokens.get(token, [callbacks])
```

#### Update<a name="method-authtokens-update"></a>

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

#### Delete<a name="method-authtokens-delete"></a>

Delete a single auth token by token.

```node
ZiggeoSdk.Authtokens.destroy(token_or_key, [callbacks])
```

#### Create<a name="method-authtokens-create"></a>

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

### Application<a name="method-application"></a>


The application token resource allows you to manage your application.

#### Get<a name="method-application-get"></a>

Read application.

```node
ZiggeoSdk.Application.get([callbacks])
```

#### Update<a name="method-application-update"></a>

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

#### Get Stats<a name="method-application-get-stats"></a>

Read application stats

```node
ZiggeoSdk.Application.get_stats(arguments, [callbacks])
```

 Arguments
- period: *Optional. Can be 'year' or 'month'.*

### Effect Profiles<a name="method-effect-profiles"></a>


The effect profiles resource allows you to access and create effect profiles for your app. Each effect profile may contain one process or more.

#### Create<a name="method-effect-profiles-create"></a>

Create a new effect profile.

```node
ZiggeoSdk.EffectProfiles.create(arguments, [callbacks])
```

 Arguments
- key: *Effect profile key.*
- title: *Effect profile title.*
- default_effect: *Boolean. If TRUE, sets an effect profile as default. If FALSE, removes the default status for the given effect*

#### Index<a name="method-effect-profiles-index"></a>

Get list of effect profiles.

```node
ZiggeoSdk.EffectProfiles.index(arguments, [callbacks])
```

 Arguments
- limit: *Limit the number of returned effect profiles. Can be set up to 100.*
- skip: *Skip the first [n] entries.*
- reverse: *Reverse the order in which effect profiles are returned.*

#### Get<a name="method-effect-profiles-get"></a>

Get a single effect profile

```node
ZiggeoSdk.EffectProfiles.get(token_or_key, [callbacks])
```

#### Delete<a name="method-effect-profiles-delete"></a>

Delete the effect profile

```node
ZiggeoSdk.EffectProfiles.destroy(token_or_key, [callbacks])
```

#### Update<a name="method-effect-profiles-update"></a>

Updates an effect profile.

```node
ZiggeoSdk.EffectProfiles.update(token_or_key, arguments, [callbacks])
```

 Arguments
- default_effect: *Boolean. If TRUE, sets an effect profile as default. If FALSE, removes the default status for the given effect*

### Effect Profile Process<a name="method-effect-profile-process"></a>


The process resource allows you to directly access all process associated with a single effect profile.

#### Index<a name="method-effect-profile-process-index"></a>

Return all processes associated with a effect profile

```node
ZiggeoSdk.EffectProfileProcess.index(effect_token_or_key, arguments, [callbacks])
```

 Arguments
- states: *Filter streams by state*

#### Get<a name="method-effect-profile-process-get"></a>

Get a single process

```node
ZiggeoSdk.EffectProfileProcess.get(effect_token_or_key, token_or_key, [callbacks])
```

#### Delete<a name="method-effect-profile-process-delete"></a>

Delete the process

```node
ZiggeoSdk.EffectProfileProcess.destroy(effect_token_or_key, token_or_key, [callbacks])
```

#### Create Filter Process<a name="method-effect-profile-process-create-filter-process"></a>

Create a new filter effect process

```node
ZiggeoSdk.EffectProfileProcess.create_filter_process(effect_token_or_key, arguments, [callbacks])
```

 Arguments
- effect: *Effect to be applied in the process*

#### Create Watermark Process<a name="method-effect-profile-process-create-watermark-process"></a>

Attaches an image to a new stream

```node
ZiggeoSdk.EffectProfileProcess.create_watermark_process(effect_token_or_key, arguments, [callbacks])
```

 Arguments
- file: *Image file to be attached*
- vertical_position: *Specify the vertical position of your watermark (a value between 0.0 and 1.0)*
- horizontal_position: *Specify the horizontal position of your watermark (a value between 0.0 and 1.0)*
- video_scale: *Specify the image scale of your watermark (a value between 0.0 and 1.0)*

#### Edit Watermark Process<a name="method-effect-profile-process-edit-watermark-process"></a>

Edits an existing watermark process.

```node
ZiggeoSdk.EffectProfileProcess.edit_watermark_process(effect_token_or_key, token_or_key, arguments, [callbacks])
```

 Arguments
- file: *Image file to be attached*
- vertical_position: *Specify the vertical position of your watermark (a value between 0.0 and 1.0)*
- horizontal_position: *Specify the horizontal position of your watermark (a value between 0.0 and 1.0)*
- video_scale: *Specify the image scale of your watermark (a value between 0.0 and 1.0)*

### Meta Profiles<a name="method-meta-profiles"></a>


The meta profiles resource allows you to access and create meta profiles for your app. Each meta profile may contain one process or more.

#### Create<a name="method-meta-profiles-create"></a>

Create a new meta profile.

```node
ZiggeoSdk.MetaProfiles.create(arguments, [callbacks])
```

 Arguments
- key: *Meta Profile profile key.*
- title: *Meta Profile profile title.*

#### Index<a name="method-meta-profiles-index"></a>

Get list of meta profiles.

```node
ZiggeoSdk.MetaProfiles.index(arguments, [callbacks])
```

 Arguments
- limit: *Limit the number of returned meta profiles. Can be set up to 100.*
- skip: *Skip the first [n] entries.*
- reverse: *Reverse the order in which meta profiles are returned.*

#### Get<a name="method-meta-profiles-get"></a>

Get a single meta profile

```node
ZiggeoSdk.MetaProfiles.get(token_or_key, [callbacks])
```

#### Delete<a name="method-meta-profiles-delete"></a>

Delete the meta profile

```node
ZiggeoSdk.MetaProfiles.destroy(token_or_key, [callbacks])
```

### Meta Profile Process<a name="method-meta-profile-process"></a>


The process resource allows you to directly access all process associated with a single meta profile.

#### Index<a name="method-meta-profile-process-index"></a>

Return all processes associated with a meta profile

```node
ZiggeoSdk.MetaProfileProcess.index(meta_token_or_key, [callbacks])
```

#### Get<a name="method-meta-profile-process-get"></a>

Get a single process

```node
ZiggeoSdk.MetaProfileProcess.get(meta_token_or_key, token_or_key, [callbacks])
```

#### Delete<a name="method-meta-profile-process-delete"></a>

Delete the process

```node
ZiggeoSdk.MetaProfileProcess.destroy(meta_token_or_key, token_or_key, [callbacks])
```

#### Create Video Analysis Process<a name="method-meta-profile-process-create-video-analysis-process"></a>

Create a new video analysis meta process

```node
ZiggeoSdk.MetaProfileProcess.create_video_analysis_process(meta_token_or_key, [callbacks])
```

#### Create Audio Transcription Process<a name="method-meta-profile-process-create-audio-transcription-process"></a>

Create a new audio transcription meta process

```node
ZiggeoSdk.MetaProfileProcess.create_audio_transcription_process(meta_token_or_key, [callbacks])
```

#### Create Nsfw Process<a name="method-meta-profile-process-create-nsfw-process"></a>

Create a new nsfw filter meta process

```node
ZiggeoSdk.MetaProfileProcess.create_nsfw_process(meta_token_or_key, arguments, [callbacks])
```

 Arguments
- nsfw_action: *One of the following three: approve, reject, nothing.*

#### Create Profanity Process<a name="method-meta-profile-process-create-profanity-process"></a>

Create a new profanity filter meta process

```node
ZiggeoSdk.MetaProfileProcess.create_profanity_process(meta_token_or_key, arguments, [callbacks])
```

 Arguments
- profanity_action: *One of the following three: approve, reject, nothing.*

### Webhooks<a name="method-webhooks"></a>


The webhooks resource allows you to create or delete webhooks related to a given application.

#### Create<a name="method-webhooks-create"></a>

Create a new webhook for the given url to catch the given events.

```node
ZiggeoSdk.Webhooks.create(arguments, [callbacks])
```

 Arguments
- target_url: *The url that will catch the events*
- encoding: *Data encoding to be used by the webhook to send the events.*
- events: *Comma-separated list of the events the webhook will catch. They must be valid webhook type events.*

#### Confirm<a name="method-webhooks-confirm"></a>

Confirm a webhook using its ID and the corresponding validation code.

```node
ZiggeoSdk.Webhooks.confirm(arguments, [callbacks])
```

 Arguments
- webhook_id: *Webhook ID that's returned in the creation call.*
- validation_code: *Validation code that is sent to the webhook when created.*

#### Delete<a name="method-webhooks-delete"></a>

Delete a webhook using its URL.

```node
ZiggeoSdk.Webhooks.destroy(arguments, [callbacks])
```

 Arguments
- target_url: *The url that will catch the events*

### Analytics<a name="method-analytics"></a>


The analytics resource allows you to access the analytics for the given application

#### Get<a name="method-analytics-get"></a>

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

Copyright (c) 2013-2021 Ziggeo
 
Apache 2.0 License
