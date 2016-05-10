"use strict";

var
  request = require('request'),
  requestSync = require('sync-request'),
  querystring = require('querystring');

var Postmen = function (api_key, noSandbox, version) {

  this.urlBase = 'https://' + (noSandbox ? '' : 'sandbox-') + 'api.postmen.com/' + (version || 'v3') + '/';
  this.headers = {
    'content-type': 'application/json',
    'postmen-api-key': api_key
  };
};

require('./rates')(Postmen);
require('./labels')(Postmen);
// require('./manifests')(Postmen);
// require('./cancel-labels')(Postmen);

//////////////////////////////

Postmen.prototype.get = function(endpoint, parameters, callback) {

  var url = this.urlBase + endpoint + '&' + querystring.stringify(parameters);

  request.get({
      url: url,
      headers: this.headers
    },
    function(error, response, body) {

      if (error) {
        callback(error, {}, 500);
      }
      else if (!error && body.meta && body.meta.code !== 200){
        error = new Error(body.meta.message);
      }

      callback(error, body || {}, response != null ? response.statusCode : null);

    }
  );
};

Postmen.prototype.getSync = function(endpoint, parameters) {

  var url = this.urlBase + endpoint + '&' + querystring.stringify(parameters);

  return requestSync('GET', url, {headers: headers});

};

Postmen.prototype.post = function(endpoint, parameters, callback) {

  var url = this.urlBase + endpoint;

  request({
      uri: url,
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(parameters)
    },
    function (error, response, body) {

      if (!error && body.meta && body.meta.code !== 200) {
        error = new Error(body.meta.message);
      }

      callback(error, body || {}, response != null ? response.statusCode : null);

    });

};

Postmen.prototype.postSync = function(endpoint, parameters) {
  var url = this.urlBase + endpoint;

  return requestSync('POST', url, {
    headers: this.headers,
    body: JSON.stringify(parameters)
  });

};

Postmen.prototype.put = function(endpoint, parameters, callback) {

  var url = this.urlBase + endpoint;

  request({
      uri: url,
      headers: this.headers,
      method: 'PUT',
      body: JSON.stringify(parameters)
    },
    function (error, response, body) {

      if (!error && body.meta && body.meta.code !== 200) {
        error = new Error(body.meta.message);
      }

      callback(error, body || {}, response != null ? response.statusCode : null);

    });

};

Postmen.prototype.putSync = function(endpoint, parameters, callback) {

  var url = this.urlBase + endpoint;

  return requestSync('PUT', url, {
    headers: this.headers,
    body: JSON.stringify(parameters)
  });

};

Postmen.prototype.delete = function(endpoint, parameters, callback) {

  var url = this.urlBase + endpoint;

  request({
      uri: url,
      headers: this.headers,
      method: 'DELETE',
      body: JSON.stringify(parameters)
    },
    function (error, response, body) {

      if (!error && body.meta && body.meta.code !== 200) {
        error = new Error(body.meta.message);
      }

      callback(error, body || {}, response != null ? response.statusCode : null);

    });

};

Postmen.prototype.deleteSync = function (endpoint, parameters, callback) {

  var url = this.urlBase + endpoint;

  return requestSync('DELETE', url, {
    headers: this.headers,
    body: JSON.stringify(parameters)
  });
};

//////////////////////////////

module.exports = Postmen;
