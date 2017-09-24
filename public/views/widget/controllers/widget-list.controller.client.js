(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $stateParams, WidgetService) {
        var vm = this;

        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];
            vm.pageId = $stateParams['pid'];

            vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            vm.getTrustedHtml = getTrustedHtml;
            vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
            WidgetService.findWidgetsByPageId(vm.pageId).then(function (response) {
                if (response.statusText === "OK") {
                    vm.widgets = response.data.widgets;
                    if (vm.widgets.length == 0) {
                        vm.showCreateWidgetMessage = true;
                        vm.createWidgetMessage = "Create a New Widget";
                    }
                }
            });

            vm.showCreateWidgetMessage = false;

        }

        init();

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-' + widgetType + '.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();