(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($stateParams, WidgetService) {
        var vm = this;

        function init() {

            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];
            vm.pageId = $stateParams['pid'];
            vm.widgetId = $stateParams['wgid'];
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            vm.getEditorTemplateUrl = getEditorTemplateUrl;
            vm.updateWidget = updateWidget;
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function updateWidget () {
            var updatedWidget = WidgetService.updateWidget(vm.widgetId, vm.widget);
            console.log(updatedWidget);
        }

    }
})();