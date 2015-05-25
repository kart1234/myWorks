(function () {

  var jsonData = {};

  var clubLocator=angular.module("samsApp");

  clubLocator.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });

  clubLocator.controller("clubLocatorController",function($scope,ClubLocatorFactory,$http, $timeout){
     // $scope.showClubFinder=true;
    //$scope.hasPrimaryClub=true; //If primary club is already set

    // To show the flyout at initial page load for 5 seconds and then hide it
    $scope.showFlyout=true;
    $timeout(function() {
        $scope.showFlyout=false;
    }, 5000);

    $scope.showAutoSelect=true;
    
    $scope.clubData={}; //data received for clubs
    $scope.milesList={values:[20,50,100,150],selected:20};  //Miles that are displayed in the dropdown
    $scope.findClub = function() {    //Funtion to get clubs given the location
              if($scope.zipHasErrorFunction($("#clubRef").val()))
              {
                $scope.showClubFinderView();
                $scope.zipHasError=true;
              }
              else
              { $scope.zipHasError=false;
                ClubLocatorFactory.getClubs(95129, $scope.milesList.selected,0) //club location, radius,offset
                    .then(function(data) {
                        // promise fulfilled
                        if (data.hasError) {
                            $scope.hasError=true;
                        } else {
                              $scope.clubData=data.clubInfo;
                              $scope.showClubs= !data.hasError;
                              $scope.clubsCount=data.size;
                              $scope.clubDisplayLimit=$scope.clubData.length;
                              
                        }
                    }, function(error) {
                          $scope.hasError=true; 
                    });

                
              }
          };

    $scope.lblClubRef = function(){
      $('.lblWMLTxt').removeClass('lblWMLTxt').addClass('lblWMSTxt');
    }

    $scope.changeMiles=function(mile) //Change the miles value
    {
      $scope.milesList.selected=mile;
      $scope.findClub();
    };
    
    $scope.showMoreClubs=function(){ //Call the clubs finder after the first call
      ClubLocatorFactory.getClubs(95129, $scope.milesList.selected, $scope.clubDisplayLimit/5+1) //club location, radius,offset
                  .then(function(data) {
                      // promise fulfilled
                      if (!data.hasError)
                          {
                            $scope.clubData= $scope.clubData.concat(data.clubInfo);
                            $scope.showClubs= !data.hasError;
                            $scope.clubDisplayLimit+=data.clubInfo.length;
                          }
                  });

      };

      $scope.showClubFinderView=function(){ //Opens the club finder View
        $scope.showClubFinder=true;
        $scope.hasPrimaryClub=false;
        $scope.showClubs= false;
        $scope.showAutoSelect=false;
        $scope.zipHasError=false;
        $scope.hasError=false;
        //$("#clubRef").val(""); //Clear data and remove Class
        //$(".lblWMLTxt").removeClass("lblWMSTxt");
         
      };

       $scope.showClubDetailView=function(){ //Opens the club finder View
        $scope.showClubFinder=false;
        $scope.hasPrimaryClub=true;
        $scope.showClubs= false;
        $scope.showAutoSelect=false;

      };

      $scope.showClubInfoFunction=function(){
        $scope.showClubInfo=!$scope.showClubInfo;

      };
      $scope.showClubTimingFunction=function(){
        $scope.showClubTiming=!$scope.showClubTiming;
      };

      $scope.makeClub=function(clubname,clubID){
        $(".club-name-selected").html(clubname);
        $("#clubRef").val(""); //Clear data and remove Class
        $(".lblWMLTxt").removeClass("lblWMSTxt");
        $scope.userSelectedClub=true;
        $scope.toggleClubFinderPopup();

        ClubLocatorFactory.getClubDetails(clubID).then(function(data){
          console.log(data);        
          $scope.selectedClub = {};
          if (!data.hasError){
            $scope.clubDetailsSrvErr = false;
          }else{
            $scope.clubDetailsSrvErr = true;
          }
          $scope.selectedClub = data;
        },function(data){
            $scope.clubDetailsSrvErr = true;
            $scope.selectedClub.description = "Server Error. Please try again";
        });

      };

      $scope.zipHasErrorFunction=function(zip){
        isNumFull=/^\d+$/.test(zip);
        if(/[^a-zA-Z0-9\-\/]/.test(zip) || zip.length<1)
          return true;

        for(var i=0;i<zip.length;i++)
        {
          var isnum = /^\d+$/.test(zip[i]);
          if(isnum && (!isNumFull|| zip.length!=5) )
            return true;
        }

          return false;
      };

      $scope.toggleClubFinderPopup=function(){
         $scope.showFlyout=!$scope.showFlyout;
         if($scope.showFlyout)
          $(".club-locator-flyout").show();

        if($scope.userSelectedClub && $scope.showFlyout)
        {
          $scope.showClubDetailView();

        }
       
         
      };

      $scope.findClubSubmit  = function (keyEvent) {
        if (keyEvent.which === 13)
            $scope.findClub();
      }

        $(document).on("click", function (ev) {
           var $flyout=$(".club-locator-flyout");
           if($flyout.is(":visible") )
           {
                if ($flyout.find(ev.target).addBack(ev.target).length === 0 && $(".clublocator-wrapper").find(ev.target).addBack(ev.target).length === 0)
                 {
                  $flyout.hide();
                  $scope.showFlyout=false;
                }
              }
          });

     



  });

  clubLocator.factory('ClubLocatorFactory', function ($http, $q) {
          return {
              getClubs: function(location,radius,offset) {
                  var clubs = {};
                  clubs.hasError=false;
                  config={};

                  config.headers={
                    "WM_SVC.VERSION": "1.0.0",
                    "WM_CONSUMER.ID" : 009090990,
                    "WM_SVC.ENV": "qa"  ,
                    Accept : "application/json",
                    "WM_QOS.CORRELATION_ID": 1234,
                    "WM_SVC.NAME" : "sams-clublocator-services"};

                    config.params={
                      postaladdress:location,
                      radius:radius,
                      offset:offset
                    };

                  return $http.get("/static/club_locator.json",config)
                      .then(function(response) {
                          if (typeof response.data === 'object') {
                             if(response.data.status=="OK")
                              {
                                response.data.payload.clubs.forEach(function(club){
                                  club.miles= parseInt(club.miles);
                                  });
                                
                                clubs.clubInfo = response.data.payload.clubs;
                                clubs.size=response.data.header.headerAttributes.totalCount;
                              }

                              else
                                clubs.hasError=true;
                              return clubs;
                          } else {
                              // invalid response
                              return $q.reject(response.data);
                          }

                      }, function(response) {
                          // something went wrong
                          return $q.reject(response.data);
                      });
              },

              increaseClubDisplayLimit: function(data){

                  return data+5;

              },

              getClubDetails : function(clubID){
                
                //$http.get('/static/club_detail.json').success(function(data, status, headers, config){
                  //console.log(data);
                  //$scope.selectedClub = {};
                  //$scope.selectedClub = data.payload;
                //}).error(function(data, status, headers, config){});

                console.log(clubID);
                var config={};
                config.params={
                    clubID:clubID
                };


                if(clubID == 6620){
                  return $http.get("/static/club_detail_error1.json",config)
                      .then(function(response) {
                          var selectedClub;
                          if (typeof response.data === 'object') {
                              if(response.data.status=="OK"){ 
                                selectedClub = response.data.payload; 
                                selectedClub.hasError=false;      
                              }                       
                              else{
                                selectedClub = response.data.errors[0];
                                selectedClub.hasError=true;
                              }
                              return selectedClub;
                          } else {
                              // invalid response
                              return $q.reject(response.data);
                          }

                      }, function(response) {
                          // something went wrong
                          return $q.reject(response.data);
                      });                
                }else if(clubID == 6405){
                  return $http.get("/static/club_detail_error2.json",config)
                      .then(function(response) {
                          var selectedClub;
                          if (typeof response.data === 'object') {
                              if(response.data.status=="OK"){ 
                                selectedClub = response.data.payload; 
                                selectedClub.hasError=false;      
                              }                       
                              else{
                                selectedClub = response.data.errors[0];
                                selectedClub.hasError=true;
                              }
                              return selectedClub;
                          } else {
                              // invalid response
                              return $q.reject(response.data);
                          }

                      }, function(response) {
                          // something went wrong
                          return $q.reject(response.data);
                      });
                }
                else{
                  return $http.get("/static/club_detail.json",config)
                      .then(function(response) {
                          var selectedClub;
                          if (typeof response.data === 'object') {
                              if(response.data.status=="OK"){ 
                                selectedClub = response.data.payload;   
                                selectedClub.hasError=false;  
                              }                       
                              else{
                                selectedClub = response.data.errors[0];
                                selectedClub.hasError=true;
                              }
                              return selectedClub;
                          } else {
                              // invalid response
                              return $q.reject(response.data);
                          }

                      }, function(response) {
                          // something went wrong
                          return $q.reject(response.data);
                      });
                }




              }
          };
      });

})();


