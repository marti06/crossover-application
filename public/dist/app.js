/**
 * Created by martina on 16/11/15.
 */

(function(){

    'use strict';
    var myAppModule = angular.module('crossover', ['restangular', 'chart.js']);

    myAppModule.controller('landingCtrl', ['$scope','Restangular', function($scope, Restangular){
        Restangular.all('builds').getList().then(function(data){
            $scope.ci_builds = data;
        });
        var counter = 0;
        $scope.increaseCounter = function(){
          $scope.isOpened = null;
        };
        console.log($scope.withDetails)
        $scope.openDetails = function(build){
            console.log($scope.isOpened);
            console.log(build.changeList);
            if ($scope.isOpened != build.changeList){
                console.log('hoho');
                $scope.isOpened = build.changeList;
            }
            else {
                counter+=1;
                if(counter >= 1){
                    return $scope.isOpened = false;
                }
                $scope.isOpened = null;
            }
            Restangular.one('builds', build.Status).one('details', build.build).get().then(function(data){
                $scope.details_data = data[0];
                $scope.labels = ["342",  "13"];
                if($scope.details_data.Status == 'Passed') $scope.colors =  ['#28b294', '#28b294'];
                $scope.data = [300, 500, 100];
            })
        };
    }]);
})();


