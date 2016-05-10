exports = module.exports = function(Postmen) {

  "use strict";

  Postmen.prototype.createLabel = function (body, callback) {
    this.post('labels', body, callback);
  };

  Postmen.prototype.getLabel = function (id, callback) {
    this.get('labels/' + id, {}, callback);
  };

  Postmen.prototype.listLabels = function (options, callback) {
    this.get('labels', options, callback);
  };
}