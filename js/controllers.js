angular.module('Search.controllers', ['Search.services'])
.controller('searchCtrl', ['$scope', 'bing_search', 'google_search', function($scope, bing_search, google_search) {
  // 読込中は非表示
  $scope.is_loading = false;
  // 検索を実行
  $scope.do_search = function(query) {
    // 読込中を表示
    $scope.is_loading = true;

    // google検索を行う
    google_search.do_search(query)
    .get({},
    function(data) {
      $scope.google_result = data.responseData.results;
      $scope.is_loading = false;
    }, function(data) {
      console.log('google_fail');
      console.dir(data);
    });

    // bing検索を行う
    bing_search.do_search(query)
    .get({}, function(data) {
      $scope.bing_result = data.d.results;
      $scope.is_loading = false;
    }, function(data) {
      console.log('bing_fail');
      console.dir(data);
    });
    console.dir($scope);
    // preventDefault
    return false;
  };
}]);
