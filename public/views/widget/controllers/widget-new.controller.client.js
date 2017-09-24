/**
 * Created by sanjaymurali on 2/15/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($stateParams, $state, $scope, WidgetService, helperService) {
        var vm = this;

        function init() {
            vm.userId = $stateParams['uid'];
            vm.websiteId = $stateParams['wid'];
            vm.pageId = $stateParams['pid'];
            vm.widgetId = $stateParams['wgid'];
            vm.specificPage = $stateParams['specific'];

            vm.widget = {};
            vm.getCreatorTemplateUrl = getCreatorTemplateUrl;
            vm.createWidget = createWidget;



            vm.imageTypeHandler = imageTypeHandler;

            vm.headerSizes = WidgetService.headerSizes;
            vm.widgetTypes = WidgetService.widgetTypes;
            vm.showOptions = true;

            vm.alertOpenClose = alertOpenClose;
            vm.success = false;
            vm.error = false;

            vm.showImageUploadForm = true;
            vm.showImageURLForm = false;

            vm.imageTypeURL = "imageURL";
            vm.imageTypeHandler("imageURL");

            //Set initial Header size : h1,h2
            vm.widget.size = 1;
            if (vm.specificPage === undefined || vm.specificPage === "") {
                vm.widgetTypeSelected = "NONE";
            }
            else
                vm.widgetTypeSelected = vm.specificPage
        }

        init();

        function getCreatorTemplateUrl(type) {

            if (vm.widgetTypeSelected === "NONE")
                vm.showOptions = true;
            else {
                vm.showOptions = false;
                return 'views/widget/templates/creators/widget-' + type + '-creator.view.client.html';
            }
        }


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

        function createWidget() {
            cleanUpAlerts();
            vm.widget.widgetType = vm.widgetTypeSelected;
            var formSelected = vm.widgetTypeSelected.toLowerCase() + "Creator";
            selectForm(formSelected).$submitted = true;
            if (!selectForm(formSelected).name.$invalid) {
                var createdWidget = WidgetService.createWidget(vm.pageId, vm.widget);

                if (createdWidget == null) {
                    vm.error = true;
                    selectForm(formSelected).$submitted = false;
                    vm.errorMessage = "Unable to create widget";
                } else {
                    selectForm(formSelected).$submitted = false;
                    vm.success = true;
                    vm.successMessage = "Widget successfully created!";
                    vm.widget = {};
                    vm.widget.size = 1;
                }

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

        function selectForm(formSelected) {
            switch(formSelected){
                case 'headerCreator':
                    return vm.headerCreator;
                    break;
                case 'imageCreator':
                    return vm.imageCreator;
                    break;
                case 'htmlCreator':
                    return vm.htmlCreator;
                    break;
                case 'youtubeCreator':
                    return vm.youtubeCreator;
                    break;
                case 'textCreator':
                    return vm.textCreator;
                    break;
                default:
                    return null;
            }
        }

    }
})();