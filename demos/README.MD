This readme will show you how to run demos and how they are organized

# How to call demos through console

If you want to use the code from `videos_count.js` you would want to open it and see what parameters it requires.

In its case this is important to us
```
var app_token = process.argv[2];
var private_key = process.argv[3];
```

It means that we need to pass `app_token` and `private_key` to our script.

## We would do it like so:

```node videos_count.js APP_TOKEN PRIVATE_KEY```

So every file will have its own parameters, however they will always be called out like so:

```node filename.js parameter1_value parameter2_value```

If you want to pass a comma separated string parameter like for `videos_get_bulk.js` you would do that by adding the string into quotes.

```node videos_get_bulk.js APP_TOKEN PRIVATE_KEY "VIDEO1,VIDEO2,VIDEO3"```

# Organization

The demos are organized by the class and function name. So for example if you want to see how to get the count of the videos you would find it in the name that matches the same:
 1. videos()
 2. count()

...making the filename "videos_count.js"

The scripts that are created to help with different things, are prefixed with an underscore and then match the similar structure as above to help you separate it all (however they can have any filename that describes action or multiple actions).