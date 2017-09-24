/**
 * Created by sanjaymurali on 2/15/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("helperService", helperService);

    function helperService() {
        var api = {
            "alertOpenClose": alertOpenClose
        };
        return api;

        function alertOpenClose(success) {
            return !success;
        }

    }

})();