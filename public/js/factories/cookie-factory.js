app.factory('cookieFactory', ['$cookies', function($cookies) {

  var _cookieFactory = {};


    var _domain = window.location.hostname;      

    if(_domain == "localhost") {
      _domain = ""; //doesnt work locally
    } 
    else {
      var domainParts = _domain.split('.');
      _domain = "." + domainParts[1] + "." + domainParts[2]
    }
    console.log("_domain: " + _domain);

    var _maxAge = 86400 //1 day in seconds
    var _path = '/';

    _cookieFactory.getExpiration = function(maxAgeSeconds) {

     
      var now = new Date();
      var time = now.getTime();
      time += maxAgeSeconds * 1000; //multiple seconds by 1000 to get milliseconds
      now.setTime(time);

      //remember this is GMT, which is ahead of CST - the browser will figure out the corret expiration
      //for example, 1:00 PM CST = 6:00 PM GMT
      return now.toGMTString();

    }

    _cookieFactory.setCookie = function(name, val, opts) {


      console.log("opts: " + JSON.stringify(opts));

        var expires;
        if(opts && opts.maxAge) {
          expires = this.getExpiration(opts.maxAge);
          console.log("expires: " + expires);
        }
        else {
          expires = this.getExpiration(_maxAge);
        }

        //Accept options that are passed in. Otherwise, use the default values
        var options = {
          path: opts && opts.path || _path,
          expires: expires,
          domain: opts && opts.domain || _domain
        };
        $cookies.put(name, val, options);
    }

    _cookieFactory.getCookie = function(name) {
        return $cookies.get(name)
    }

    _cookieFactory.clearAllCookies = function() {

        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
            $cookies.remove(k);
            console.log("removing cookie: " + k);
        });
    }

  return _cookieFactory;

}]);