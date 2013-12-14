/*
 * TODO
 * css書く
 * 通信部分をサービスに分ける
 * html5のlocalstorageでcacheを保持する
 * googleの検索結果に含まれるbタグ等をきちんと表示する
 * usernameとpasswordをfilereaderとか使って何とかする
 */

var Search = angular.module('Search', ['ngResource']);

Search.controller('searchCtrl', ['$scope', '$resource', '$http', function($scope, $resource, $http) {
  // console.dir($scope);
  var google_url = 'https://ajax.googleapis.com/ajax/services/search/web' +
  '?v=1.0&hl=ja&rsz=8&callback=JSON_CALLBACK&q=:query';
  var bing_url = "https://api.datamarket.azure.com/Bing/Search/Web?" +
  "$format=json&$top=8&Query=:query";

  // 検索結果格納用
  $scope.google_result = "";
  $scope.bing_result = "";

  // google, bingの検索結果を表示する
  $scope.do_search = function(query) {
    // submitしないように
    event.preventDefault();

    // クエリが無ければ終了
    if (!query) {
      alert('クエリを入力してください');
      return;
    }

    // googleにjsonpでリクエスト
    // $http.jsonp(google_url + query)
    $scope.request_google = $resource(google_url, {query:query}, {get: {method:"jsonp"}});
    $scope.request_google.get({},
      // 通信成功時
      function(data) {
        console.log('google_success');
        console.dir(data);
        $scope.google_result = data.responseData.results;
      },
      // 通信失敗時
      function(data, status,  headers, config) {
        console.log('google_fail');
        $scope.google_result = "Oops...";
        console.dir(data);
        console.dir(status);
        console.dir(headers);
        console.dir(config);
      }
    );

    // basic認証情報
    // usernameとpasswordは別ファイルでグローバル変数として保持
    var credentials = 'Basic ' + btoa(USERNAME + ':' + PASSWORD);
    // httpヘッダに認証情報付与
    $http.defaults.headers.common.Authorization = credentials;
    // bingにアクセス
    $scope.request_bing = $resource(bing_url, {query: "'" + query + "'"}, {get: {method:"get",
                                    headers: {Authorization: credentials}}});
    $scope.request_bing.get({},
      // 通信成功時
      function(data) {
        console.log('bing_success');
        console.dir(data);
        $scope.bing_result = data.d.results;
      },
      // 通信失敗時
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
