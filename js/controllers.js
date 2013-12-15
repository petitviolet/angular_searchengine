/*
 * TODO
 * css書く
 * 通信部分をサービスに分ける
 * html5のlocalstorageでcacheを保持する
 * googleの検索結果に含まれるbタグ等をきちんと表示する
 * usernameとpasswordをfilereaderとか使って何とかする
 */

angular.module('Search.controllers', ['Search.services'])
.controller('searchCtrl', ['$scope', 'bing_search', 'google_search', function($scope, bing_search, google_search) {
  $scope.is_loading = false;
  $scope.google_result = {};
  $scope.bing_result = {};
  $scope.do_search = function(query) {
    $scope.is_loading = true;
    google_search.do_search(query)
    .get({},
    function(data) {
      $scope.google_result = data.responseData.results;
      $scope.is_loading = false;
    }, function(data) {
      console.log('google_fail');
      console.dir(data);
    });
    bing_search.do_search(query)
    .get({}, function(data) {
      $scope.bing_result = data.d.results;
      $scope.is_loading = false;
    }, function(data) {
      console.log('bing_fail');
      console.dir(data);
    });
    console.dir($scope);
    return false;
  };
}]);
