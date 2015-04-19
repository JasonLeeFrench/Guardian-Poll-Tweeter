# Guardian Poll Tweeter

An app that [tweets](https://twitter.com/JasonLeeFrench/status/589488625550753792) Guardian polls.

Pretty pointless after the election, but you have 17 days of sweet poll-tweeting action.

The image generated kinda looks something like this:

![Guardian Poll of Polls](https://pbs.twimg.com/media/CC5Ixi1WEAAkc2O.png:large)

Set up locally
-----------

Plug in your app credentials to app.js from [Twitter](https://apps.twitter.com/).

```
npm install
node app.js
```

Get it working on Heroku, yo
------

Plug in your app credentials to app.js from [Twitter](https://apps.twitter.com/).

Assuming you have the Heroku toolkit installed and you're logged in, it should just be as easy as...

```
heroku create
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
git push heroku master
heroku ps:scale worker=1
```

Run `heroku logs --tail` to check everything's okay.

Licence
-------

MIT.
