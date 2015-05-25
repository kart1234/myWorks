(function () {

  angular.module("sams-app", ["ngRoute"])
    .factory("headerAccountService", headerAccountService);

  headerAccountCtrl.$inject = ["$http"];

  function headerAccountService ($http){


    
    
    function setDataInScope () {

    }





    function getServiceData () {
      var headerAccountData = {};
      headerAccountData = $http.get("/static/header_account.json");
    }


  }


})();

