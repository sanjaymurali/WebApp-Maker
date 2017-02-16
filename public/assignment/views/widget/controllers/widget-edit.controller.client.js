(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($stateParams, $state, WidgetService, helperService) {
        var vm = this;

        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];
            vm.pageId = $stateParams['pid'];
            vm.widgetId = $stateParams['wgid'];

            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            vm.getEditorTemplateUrl = getEditorTemplateUrl;
            vm.updateWidget = updateWidget;
            vm.deleteWidget = deleteWidget;

            vm.headerSizes = WidgetService.headerSizes;

            vm.alertOpenClose = alertOpenClose;
            vm.success = false;
            vm.error = false;
        }

        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-' + type + '-editor.view.client.html';
        }

        function updateWidget() {
            cleanUpAlerts();
            var updatedWidget = WidgetService.updateWidget(vm.widgetId, vm.widget);

            if (updatedWidget == null) {
                vm.error = true;
                vm.errorMessage = "Unable to update widget";
            } else {
                vm.success = true;
                vm.successMessage = "Widget successfully updated"
            }

        }

        function deleteWidget() {
            cleanUpAlerts();
            var deletedWidget = WidgetService.deleteWidget(vm.widgetId);

            if (deletedWidget == null) {
                vm.error = true;
                vm.errorMessage = "Unable to update widget";
            } else {
                $state.go('widget', {uid: vm.userId, wid: vm.widgetId, pid: vm.pageId});
            }

        }

        function alertOpenClose(successOrError) {
            vm.success = helperService.alertOpenClose(successOrError);
            vm.error = helperService.alertOpenClose(successOrError);
        }

        function cleanUpAlerts() {
            vm.success = false;
            vm.error = false;
        }
    }
})();