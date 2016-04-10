/* 
 * add random number to url
 */
define(function(require,exports,module){
    exports.queryRandom = function(url){
        var strQueryRandom = "random="+Math.random();
        var arrQuery = url.split("?");
        if(arrQuery[1] != undefined){
            if(url.slice(-1) === "&"){
                url = url + strQueryRandom;
            }else{
                url = url + "&" + strQueryRandom;
            }
        }else{
            url = url + "?" + strQueryRandom;
        }
        return url;
    }
});

