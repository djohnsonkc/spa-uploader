app.factory('dataFactory', ['$http', 'cookieFactory', function($http, cookieFactory) {

  var _dataFactory = {};


    let _host = 'http://localhost:3001'
    if(window.location.href.indexOf('localhost') == -1) {
      _host = 'http://dfs-poc.herokuapp.com'
    }


    $http.defaults.headers.common['Content-Type'] = "application/json";
    //no-cache is important for Google Chrome. Otherwise, it will display incorrect cached JSON
    $http.defaults.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    $http.defaults.headers.common['Pragma'] = 'no-cache';
    $http.defaults.headers.common['Expires'] = '0';

    //IMPORANT: These must be kept fresh. Setting them here is a static setting and only happens when the dataFactory is instantiated
    // $http.defaults.headers.common['x-access-token'] = cookieFactory.getCookie('access_token') || "";
    // $http.defaults.headers.common['account_id'] = cookieFactory.getCookie('account_id') || "0";
    var refreshCookieReferencedHeaders = function() {
        $http.defaults.headers.common['x-access-token'] = cookieFactory.getCookie('access_token') || "";
    }


 
    _dataFactory.getSomething = function(sport) {


        refreshCookieReferencedHeaders();

        var req = {
         method: 'GET',
         url: _host + '/v1/teams/' + sport
        };

        return $http(req);

    };



  return _dataFactory;

}]);