(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "name1"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "name2"},
            {
                "_id": "345",
                "widgetType": "IMAGE",
                "pageId": "321",
                "width": "100%",
                "description": "Image here!",
                "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg",
                "name": "name3"
            },
            {
                "_id": "456",
                "widgetType": "HTML",
                "pageId": "321",
                "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>',
                "name": "name4"
            },
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "name5"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E", "name": "name6"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name": "name7"}
        ];

        var headerSizes = [1, 2, 3, 4, 5, 6];
        var widgetTypes = ['HEADER', 'IMAGE', 'HTML', 'YOUTUBE'];

        var api = {
            "headerSizes": headerSizes,
            "widgetTypes": widgetTypes,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById
        };

        return api;

        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId + "";

            widgets.push(widget);
            return widget;

        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets[w].name = widget.name;
                    if (widgets[w].widgetType === "HEADER") {
                        widgets[w].size = widget.size;
                        widgets[w].text = widget.text;
                    }
                    else if (widgets[w].widgetType === "IMAGE") {
                        widgets[w].url = widget.url;
                        widgets[w].width = widget.width;
                        widgets[w].description = widget.description;
                    }
                    else if (widgets[w].widgetType === "HTML") {
                        widgets[w].text = widget.text;
                    }
                    else if (widgets[w].widgetType === "YOUTUBE") {
                        widgets[w].url = widget.url;
                        widgets[w].width = widget.width;
                    }
                    else {
                        //Do nothing
                    }

                    return widget;
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                    return widgets;
                }
            }
            return null;
        }

        function findWidgetsByPageId(pageId) {
            var listOfWidgets = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    listOfWidgets.push(widgets[w]);
                }
            }
            return listOfWidgets;
        }

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

    }
})();