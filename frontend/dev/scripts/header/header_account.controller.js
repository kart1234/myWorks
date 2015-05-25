(function () {

  angular.module("sams-app", ["ngRoute"])
    .controller("headerAccount", headerAccountCtrl);

  headerAccountCtrl.$inject = ["$http"];

  function headerAccountCtrl ($http){

    
    
    function setDataInScope () {

    }





    function getServiceData () {
      var headerAccountData = {};
      headerAccountData = $http.get("/static/header_account.json");
    }

  }


})();

