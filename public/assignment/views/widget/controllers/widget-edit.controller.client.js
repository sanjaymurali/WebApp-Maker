(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($stateParams, $state, WidgetService, helperService) {
        var vm = this;

        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];
            vm.pageId = $stateParams['pid'];
            vm.widgetId = $stateParams['wgid'];

            WidgetService.findWidgetById(vm.widgetId).then(function (response) {
                if (response.statusText === "OK")
                    vm.widget = response.data.widget;
                    vm.editorURL = 'views/widget/templates/editors/widget-' + vm.widget.widgetType + '-editor.view.client.html';
            });
            vm.updateWidget = updateWidget;
            vm.deleteWidget = deleteWidget;

            vm.imageTypeHandler = imageTypeHandler;

            vm.headerSizes = WidgetService.headerSizes;

            vm.alertOpenClose = alertOpenClose;
            vm.success = false;
            vm.error = false;

            vm.showImageUploadForm = false;
            vm.showImageURLForm = true;

            vm.imageTypeURL = "imageURL";
            vm.imageTypeHandler("imageURL");

        }

        init();

        function imageTypeHandler(type) {
            if (type === "imageURL") {
                vm.showImageURLForm = true;
                vm.showImageUploadForm = false;
            }
            else {
                vm.showImageURLForm = false;
                vm.showImageUploadForm = true;
            }
        }

        function updateWidget() {
            cleanUpAlerts();
            console.log(vm.imageTypeURL);
            var formSelected = vm.widget.widgetType.toLowerCase() + "Editor";

            vm.widget.widgetId = vm.widgetId;

            selectForm(formSelected).$submitted = true;
            if (!selectForm(formSelected).name.$invalid) {
                WidgetService.updateWidget(vm.widgetId, vm.widget).then(function (response) {
                    if (response.statusText === "OK") {
                        vm.success = true;
                        vm.successMessage = "Widget successfully updated"
                    }
                    else {
                        vm.error = true;
                        vm.errorMessage = "Unable to update widget";
                    }

                });
            }
        }

        function deleteWidget() {
            cleanUpAlerts();
            var deletedWidget = WidgetService.deleteWidget(vm.widgetId).then(function (response) {
                if (response.statusText === "OK")
                    $state.go('widget', {uid: vm.userId, wid: vm.widgetId, pid: vm.pageId});
                else {
                    vm.error = true;
                    vm.errorMessage = "Unable to Delete widget";
                }
            });

        }

        function alertOpenClose(successOrError) {
            vm.success = helperService.alertOpenClose(successOrError);
            vm.error = helperService.alertOpenClose(successOrError);
        }

        function cleanUpAlerts() {
            vm.success = false;
            vm.error = false;
        }

        function selectForm(formSelected) {
            switch(formSelected){
                case 'headerEditor':
                    return vm.headerEditor;
                    break;
                case 'imageEditor':
                    return vm.imageEditor;
                    break;
                case 'htmlEditor':
                    return vm.htmlEditor;
                    break;
                case 'youtubeEditor':
                    return vm.youtubeEditor;
                    break;
                case 'textEditor':
                    return vm.textEditor;
                    break;
                default:
                    return null;
            }
        }
    }
})();