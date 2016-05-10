# ntrrobng:postmen-api

A simple Node wrapper for the Postmen shipping API

This is just a quick stab at using the API within a Node project I'm working on. It's rough and has limited
coverage at the moment but will get better with time. Contributions are welcome.

Basic usage

```javascript
var Postmen = npm.require('postmen-api');
var postmenApi = Postmen(YOUR_API_KEY);
postmenApi.createLabel({
  // create label body
}, function (error, body, response) {
  // do something!
})
```