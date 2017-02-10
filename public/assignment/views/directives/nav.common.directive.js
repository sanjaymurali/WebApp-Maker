/**
 * Created by sanjaymurali on 2/9/17.
 */

(function(){
    var WebAppMakerModule = angular.module('WebAppMaker');


    WebAppMakerModule.directive('navHeaderCommon', commonheader);

    function commonheader() {
        return{
            scope: scope,
            link: linkfn,
            templateUrl: 'views/directives/templates/nav.header.common.client.html'
        }
    }

    var scope = {
        pagename: '=',
        statename: '@',
        userid: '=uid',
        widgetid: '=wid'
    };

    function linkfn(scope,element){
        scope.pagename = element.attr('pagename');
        scope.statename = element.attr('statename');
        scope.userid = element.attr('uid');
        if(element.attr('wid'))
            scope.widgetid = element.attr('wid');
    };

})();