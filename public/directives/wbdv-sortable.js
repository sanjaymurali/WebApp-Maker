/**
 * Created by sanjaymurali on 3/1/17.
 */

(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir(WidgetService) {
        var initialPos = 0;
        var finalPos = 0;

        function linkFunc(scope, element, attributes) {

            element.sortable({
                axis: 'y',

                update: function (event, current) {
                    finalPos = current.item.index();
                    WidgetService.updateWidgetOrder(scope.pageId, initialPos, finalPos).then(function (response) {

                    });
                },
                start: function (event, current) {
                    initialPos = current.item.index();
                },
                handle: ".jga-toolbar .glyphicon-align-justify"
            });


        }

        return {
            link: linkFunc,
            template: '',
            scope: {
                pageId: '@'
            }
        };
    }
})();