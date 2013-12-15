angular.module('Search.services', ['ngResource'])
.factory('bing_search', ['$resource', '$http', function($resource, $http) {
  var bing_url = "https://api.datamarket.azure.com/Bing/Search/Web?" +
  "Market='ja-JP'&$format=json&$top=8&Query=':query'";
  // basic認証情報
  // usernameとpasswordは別ファイルでグローバル変数として保持
  var credentials = 'Basic ' + btoa(USERNAME + ':' + PASSWORD);
  // httpヘッダに認証情報付与
  $http.defaults.headers.common.Authorization = credentials;

  // bingにアクセス
  var request_bing = {
    do_search: function(query) {
      if (!query) {
        alert('クエリを入力してください');
        return false;
      }
      // これに.getすればリクエストできる
      return $resource(bing_url, {query: query}, {get: {method:"get", headers: {Authorization: credentials}}});
    }
  };
  return request_bing;
}])
.factory('google_search', ['$resource', '$http', function($resource, $http) {
  var google_url = 'https://ajax.googleapis.com/ajax/services/search/web' +
  '?v=1.0&hl=ja&rsz=8&callback=JSON_CALLBACK&q=":query"';
  var request_google = {
    do_search: function(query) {
      // クエリが無ければ終了
      if (!query) {
        alert('クエリを入力してください');
        return false;
      }
      // googleにjsonpでリクエスト
      // これに.getすればリクエストできる
      return $resource(google_url, {query:query}, {get: {method:"jsonp"}});
    }
  };
  return request_google;
}]);
