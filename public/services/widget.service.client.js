(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var headerSizes = [1, 2, 3, 4, 5, 6];
        var widgetTypes = ['HEADER', 'IMAGE', 'HTML', 'YOUTUBE', 'TEXT'];

        var api = {
            "headerSizes": headerSizes,
            "widgetTypes": widgetTypes,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "updateWidgetOrder": updateWidgetOrder,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById
        };

        return api;

        function createWidget(pageId, widget) {
            return $http.post('/api/page/' + pageId + '/widget', widget);
        }

        function updateWidget(widgetId, widget) {
            return $http.put('/api/widget/' + widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/' + widgetId);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get('/api/page/' + pageId + '/widget');
        }

        function findWidgetById(widgetId) {
            return $http.get('/api/widget/' + widgetId);
        }

        function updateWidgetOrder(pageId, initial, final) {
            return $http.put('/api/page/' + pageId + '/widget', {}, {params: {initial: initial, final: final}});
        }

    }
})();