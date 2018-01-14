# Ziggeo Node.js Server SDK 0.1.0

Ziggeo API (https://ziggeo.com) allows you to integrate video recording and playback with only
two lines of code in your site, service or app. This is the Node.js Server SDK repository.

Pull requests welcome.


## Installation

npm install ziggeo


## Client-Side Integration

For the client-side integration, you need to add these assets to your html file:

```html 
<link rel="stylesheet" href="//assets-cdn.ziggeo.com/v1-latest/ziggeo.css" /> 
<script src="//assets-cdn.ziggeo.com/v1-latest/ziggeo.js"></script> 
```

Then, you need to specify your api token:
```html 
<script>
	ZiggeoApi.token = "APPLICATION_TOKEN"; 
</script>
```

You can specify other global options, [see here](https://ziggeo.com/docs).

To fire up a recorder on your page, add:
```html 
<ziggeo></ziggeo> 
``` 

To embed a player for an existing video, add:
```html 
<ziggeo ziggeo-video='video-token'></ziggeo> 
``` 

For the full documentation, please visit [ziggeo.com](https://ziggeo.com/docs).


## Server-Side Integration

You can integrate the Server SDK as follows:

```node 
Ziggeo = require('ziggeo');
var ZiggeoSdk = new Ziggeo('*token*', '*private_key*', '*encryption_key*'); 
```


## Server-Side Methods

### Videos  

The videos resource allows you to access all single videos. Each video may contain more than one stream. 
 

#### Index 
 
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


#### Get 
 
Get a single video by token or key. 

```node 
ZiggeoSdk.Videos.get(token_or_key, [callbacks]) 
``` 
 


#### Download Video 
 
Download the video data file 

```node 
ZiggeoSdk.Videos.download_video(token_or_key, [callbacks]) 
``` 
 


#### Download Image 
 
Download the image data file 

```node 
ZiggeoSdk.Videos.download_image(token_or_key, [callbacks]) 
``` 
 


#### Push To Service 
 
Push a video to a provided push service. 

```node 
ZiggeoSdk.Videos.push_to_service(token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- pushservicetoken: *Push Services's token (from the Push Services configured for the app)* 


#### Apply Effect 
 
Apply an effect profile to a video. 

```node 
ZiggeoSdk.Videos.apply_effect(token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- effectprofiletoken: *Effect Profile token (from the Effect Profiles configured for the app)* 


#### Update 
 
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


#### Delete 
 
Delete a single video by token or key. 

```node 
ZiggeoSdk.Videos.destroy(token_or_key, [callbacks]) 
``` 
 


#### Create 
 
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


### Streams  

The streams resource allows you to directly access all streams associated with a single video. 
 

#### Index 
 
Return all streams associated with a video 

```node 
ZiggeoSdk.Streams.index(video_token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- states: *Filter streams by state* 


#### Get 
 
Get a single stream 

```node 
ZiggeoSdk.Streams.get(video_token_or_key, token_or_key, [callbacks]) 
``` 
 


#### Download Video 
 
Download the video data associated with the stream 

```node 
ZiggeoSdk.Streams.download_video(video_token_or_key, token_or_key, [callbacks]) 
``` 
 


#### Download Image 
 
Download the image data associated with the stream 

```node 
ZiggeoSdk.Streams.download_image(video_token_or_key, token_or_key, [callbacks]) 
``` 
 


#### Push To Service 
 
Push a stream to a provided push service. 

```node 
ZiggeoSdk.Streams.push_to_service(video_token_or_key, token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- pushservicetoken: *Push Services's token (from the Push Services configured for the app)* 


#### Delete 
 
Delete the stream 

```node 
ZiggeoSdk.Streams.destroy(video_token_or_key, token_or_key, [callbacks]) 
``` 
 


#### Create 
 
Create a new stream 

```node 
ZiggeoSdk.Streams.create(video_token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- file: *Video file to be uploaded* 


#### Attach Image 
 
Attaches an image to a new stream 

```node 
ZiggeoSdk.Streams.attach_image(video_token_or_key, token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- file: *Image file to be attached* 


#### Attach Video 
 
Attaches a video to a new stream 

```node 
ZiggeoSdk.Streams.attach_video(video_token_or_key, token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- file: *Video file to be attached* 


#### Bind 
 
Closes and submits the stream 

```node 
ZiggeoSdk.Streams.bind(video_token_or_key, token_or_key, arguments, [callbacks]) 
``` 
 


### Authtokens  

The auth token resource allows you to manage authorization settings for video objects. 
 

#### Get 
 
Get a single auth token by token. 

```node 
ZiggeoSdk.Authtokens.get(token, [callbacks]) 
``` 
 


#### Update 
 
Update single auth token by token. 

```node 
ZiggeoSdk.Authtokens.update(token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- volatile: *Will this object automatically be deleted if it remains empty?* 
- hidden: *If hidden, the token cannot be used directly.* 
- expiration_date: *Expiration date for the auth token* 
- usage_experitation_time: *Expiration time per session* 
- session_limit: *Maximal number of sessions* 
- grants: *Permissions this tokens grants* 


#### Delete 
 
Delete a single auth token by token. 

```node 
ZiggeoSdk.Authtokens.destroy(token_or_key, [callbacks]) 
``` 
 


#### Create 
 
Create a new auth token. 

```node 
ZiggeoSdk.Authtokens.create(arguments, [callbacks]) 
``` 
 
Arguments 
- volatile: *Will this object automatically be deleted if it remains empty?* 
- hidden: *If hidden, the token cannot be used directly.* 
- expiration_date: *Expiration date for the auth token* 
- usage_experitation_time: *Expiration time per session* 
- session_limit: *Maximal number of sessions* 
- grants: *Permissions this tokens grants* 


### EffectProfiles  

The effect profiles resource allows you to access and create effect profiles for your app. Each effect profile may contain one process or more. 
 

#### Create 
 
Create a new effect profile. 

```node 
ZiggeoSdk.EffectProfiles.create(arguments, [callbacks]) 
``` 
 
Arguments 
- key: *Effect profile key.* 
- title: *Effect profile title.* 


#### Index 
 
Get list of effect profiles. 

```node 
ZiggeoSdk.EffectProfiles.index(arguments, [callbacks]) 
``` 
 
Arguments 
- limit: *Limit the number of returned effect profiles. Can be set up to 100.* 
- skip: *Skip the first [n] entries.* 
- reverse: *Reverse the order in which effect profiles are returned.* 


#### Get 
 
Get a single effect profile 

```node 
ZiggeoSdk.EffectProfiles.get(token_or_key, [callbacks]) 
``` 
 


#### Delete 
 
Delete the effect profile 

```node 
ZiggeoSdk.EffectProfiles.destroy(token_or_key, [callbacks]) 
``` 
 


### EffectProfileProcess  

The process resource allows you to directly access all process associated with a single effect profile. 
 

#### Index 
 
Return all processes associated with a effect profile 

```node 
ZiggeoSdk.EffectProfileProcess.index(effect_token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- states: *Filter streams by state* 


#### Get 
 
Get a single process 

```node 
ZiggeoSdk.EffectProfileProcess.get(effect_token_or_key, token_or_key, [callbacks]) 
``` 
 


#### Delete 
 
Delete the process 

```node 
ZiggeoSdk.EffectProfileProcess.destroy(effect_token_or_key, token_or_key, [callbacks]) 
``` 
 


#### Create Filter Process 
 
Create a new filter effect process 

```node 
ZiggeoSdk.EffectProfileProcess.create_filter_process(effect_token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- effect: *Effect to be applied in the process* 


#### Create Watermark Process 
 
Attaches an image to a new stream 

```node 
ZiggeoSdk.EffectProfileProcess.create_watermark_process(effect_token_or_key, arguments, [callbacks]) 
``` 
 
Arguments 
- file: *Image file to be attached* 
- vertical: *Specify the vertical position of your watermark (a value between 0.0 and 1.0)* 
- horizontal: *Specify the horizontal position of your watermark (a value between 0.0 and 1.0)* 
- scale: *Specify the image scale of your watermark (a value between 0.0 and 1.0)* 





## License

Copyright (c) 2013-2018 Ziggeo
 
Apache 2.0 License
