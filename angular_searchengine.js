var Search = angular.module('Search', ['ngResource']);

Search.controller('searchCtrl', ['$scope', '$resource', '$http', function($scope, $resource, $http) {
  console.dir($scope);
  var google_url = 'https://ajax.googleapis.com/ajax/services/search/web' +
  '?v=1.0&hl=ja&rsz=8&callback=JSON_CALLBACK&q=:query';
  var bing_url = "https://api.datamarket.azure.com/Bing/Search/Web?" +
  "$format=json&$top=8&Query=:query";
  // 初期化
  $scope.google_result = "";
  $scope.bing_result = "";
  $scope.submit = function() {
    alert('click');
  };

  // google, bingの検索結果を表示する
  $scope.do_search = function(query) {
    console.dir(query);
    event.preventDefault();
    // クエリが無ければ終了
    if (!query) {
      alert('クエリを入力してください');
      return;
    }
    // $http.jsonp(google_url + query)
    $scope.request_google = $resource(google_url, {query:query}, {get: {method:"jsonp"}});
    $scope.request_google.get({},
      function(data) {
        console.log('google_success');
        console.dir(data);
        $scope.google_result = data.responseData.results;
      },
      function(data, status,  headers, config) {
        console.log('google_fail');
        $scope.google_result = "Oops...";
        console.dir(data);
        console.dir(status);
        console.dir(headers);
        console.dir(config);
      }
    );

    var credentials = 'Basic ' + btoa(USERNAME + ':' + PASSWORD);
    $http.defaults.headers.common.Authorization = credentials;
    $scope.request_bing = $resource(bing_url, {query: "'" + query + "'"}, {get: {method:"get",
                                    headers: {Authorization: credentials}}});
    $scope.request_bing.get({},
      function(data) {
        console.log('bing_success');
        console.dir(data);
        $scope.bing_result = data.d.results;
      },
      function(data, status,  headers, config) {
        console.log('bing_fail');
        $scope.bing_result = "Oops...";
        console.dir(data);
        console.dir(status);
        console.dir(headers);
        console.dir(config);
      }
    );
  };
}]);
