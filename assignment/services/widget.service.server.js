/**
 * Created by sanjaymurali on 2/28/17.
 */


module.exports = function (app) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var initialPos = 0;
    var finalPos = 0;

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "name1", "sortable": 0},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "name2", "sortable": 1 },
        {
            "_id": "345",
            "widgetType": "IMAGE",
            "pageId": "321",
            "width": "100%",
            "description": "Image here!",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg",
            "name": "name3",
            "sortable": 2
        },
        {
            "_id": "456",
            "widgetType": "HTML",
            "pageId": "321",
            "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>',
            "name": "name4",
            "sortable": 3
        },
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "name5", "sortable": 4},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "name": "name6", "sortable": 5
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name": "name7", "sortable": 6}
    ];

    var headerSizes = [1, 2, 3, 4, 5, 6];
    var widgetTypes = ['HEADER', 'IMAGE', 'HTML', 'YOUTUBE'];

    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.put('/api/page/:pageId/widget', updateWidgetOrder);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post("/api/upload", upload.single('uploadedImage'), uploadImage);

    function uploadImage(req, res) {

        var widget = {};

        if(req.body.widgetId){
            //Update a Widget
            var widgetId = req.body.widgetId;

            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets[w].width = req.body.width;
                    widgets[w].name = req.body.name;
                    widgets[w].url = "/uploads/"+req.file.filename;
                    widgets[w].description = req.body.text;
                }
            }
            res.redirect("/assignment/user/"+req.body.userId+"/website/"+req.body.websiteId+"/page/"+req.body.pageId+"/widget");

        }
        else{
            //Create a New Widget
            var pageId = req.body.pageId + "";
            widget._id = (new Date()).getTime() + "";
            widget.pageId = req.body.pageId + "";
            widget.widgetType = "IMAGE";
            widget.width = req.body.width;
            widget.name = req.body.name;
            widget.url = "/uploads/"+req.file.filename;
            widget.description = req.body.text;
            widget.sortable = lastSortableOrder(pageId);
            widgets.push(widget);

            //hacky Solution, Have to implement a File Uploader Directive in the spring Break
            res.redirect("/assignment/user/"+req.body.userId+"/website/"+req.body.websiteId+"/page/"+req.body.pageId+"/widget");

        }

    }

    function createWidget(req, res) {
        var pageId = req.params.pageId + "";
        var widget = req.body;
        widget._id = (new Date()).getTime() + "";
        widget.pageId = pageId + "";
        widget.sortable = lastSortableOrder(pageId);
        widgets.push(widget);
        res.status(200).json({widget: widget});
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
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

                return res.status(200).json({widget: widget});
            }
        }
        res.sendStatus(404);
    }

    function updateWidgetOrder(req, res){
        var pageId = req.params.pageId + "";
        initialPos = parseInt(req.query.initial);
        finalPos = parseInt(req.query.final);

        // First get the Widgets that belong to the particular page by pageId
        var widgetsOfPage = getWidgetsByPageId(pageId);

        var selectedWidget = widgetsOfPage.find(getInitialIndex);
        var replacedWidget = widgetsOfPage.find(getFinalIndex);

        //Swap the sortable of the selectedWidget to its final Position
        selectedWidget.sortable = finalPos;

        // Used Array.protoype to manipulate the array using lambda functions

        /*
        If the widget is being moved up then we need to place the widget
        at that position and then increment the sortable of all widgets in between.
         */
        if(initialPos > finalPos){
            widgetsOfPage.filter(getWidgetsInBetween).map(updateSortableOrderWidget);
            replacedWidget.sortable += 1;
        }
        else {
            widgetsOfPage.filter(getWidgetsInBetween).map(updateSortableOrderWidget);
            replacedWidget.sortable -= 1;
        }
        res.sendStatus(200);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        var pageId = "";
        var sortable = 0;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                pageId = widgets[w].pageId;
                sortable = widgets[w].sortable;
                widgets.splice(w, 1);
                deleteIndex(pageId, sortable);
                return res.sendStatus(200);
            }
        }



        res.sendStatus(404);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var listOfWidgets = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                listOfWidgets.push(widgets[w]);
            }
        }
        res.status(200).json({widgets: listOfWidgets});
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                return res.status(200).json({widget: widgets[w]});
            }
        }
        res.sendStatus(404);
    }

    // Helper function for various router, they dont have requests
    // or responses.

    function lastSortableOrder(pageId){
        var listOfWidgets = [];
        var max = 0;
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                    ++max;
            }
        }
        return max;
    }

    function getWidgetsByPageId(pageId) {
        var listOfWidgets = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                listOfWidgets.push(widgets[w]);
            }
        }
        return listOfWidgets;
    }

    function getInitialIndex(widget) {
            return widget.sortable === initialPos;
    }

    function getFinalIndex(widget) {
        return widget.sortable === finalPos;
    }

    function getWidgetsInBetween(widget) {
        if(initialPos > finalPos)
            return widget.sortable < initialPos && widget.sortable > finalPos;
        else
            return widget.sortable > initialPos && widget.sortable < finalPos;
    }

    function updateSortableOrderWidget(widget) {
        if(initialPos > finalPos)
            widget.sortable += 1;
        else
            widget.sortable -= 1;

    }

    function deleteIndex(pageId, sortable) {
        var widgetsLeft = widgets.filter(function(widget) {
            return widget.pageId === pageId;
        });

        var selectWidgetsToUpdate = widgetsLeft.filter(function(widget) {
            return widget.sortable > sortable;
        });

        if(selectWidgetsToUpdate){
            selectWidgetsToUpdate.map(function(widget) {
                widget.sortable -= 1;
            })
        }
    }
}