exports = module.exports = function(Postmen) {

  "use strict";

  Postmen.prototype.calculateRates = function (shipment, shippingAccounts, callback) {
    var options = {}, endpoint = 'rates';
    if (shipment) {
      options['shipment'] = shipment;
    }
    else {
      options['is_document'] = true;
    }

    if (shippingAccounts) {
      options['shipping_accounts'] = shippingAccounts;
    }

    if (callback) {
      this.post(endpoint, options, callback);
    }
    else {
      options['async'] = true;
      return this.postSync(endpoint, options);
    }
  };

  Postmen.prototype.listRates = function (options) {
    this.get('rates', options, callback); 
  };

  Postmen.prototype.getRate = function (id, callback) {
    this.get('rates/' + id, {}, callback);
  };
}