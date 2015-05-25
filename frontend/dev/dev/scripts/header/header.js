(function () {
  
  angular.module("samsApp").controller("SamsHeaderCtrl", SamsHeaderCtrl);

  function SamsHeaderCtrl () {
    this.showShopFlyout = showShopFlyout;
    this.showBusinessFlyout = showBusinessFlyout;
    this.showServicesFlyout = showServicesFlyout;
  }

  function showShopFlyout () {
    $("#headerShopFlyout").show();
  }

  function showBusinessFlyout () {
    $("#headerBusinessFlyout").show();
  }

  function showServicesFlyout () {
    $("#headerServicesFlyout").show();
  }

})();
