/**
 * Created by sanjaymurali on 2/28/17.
 */


module.exports = function (app, widgetModel, pageModel) {

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});
    var initialPos = 0;
    var finalPos = 0;

    var widgets = [
        {
            "_id": "123",
            "widgetType": "HEADER",
            "pageId": "58d0d2cbb21d5a0ed5d570ea",
            "size": 2,
            "text": "GIZMODO",
            "name": "name1",
            "sortable": 0
        },
        {
            "_id": "234",
            "widgetType": "HEADER",
            "pageId": "58d0d2cbb21d5a0ed5d570ea",
            "size": 4,
            "text": "Lorem ipsum",
            "name": "name2",
            "sortable": 1
        },
        {
            "_id": "345",
            "widgetType": "IMAGE",
            "pageId": "58d0d2cbb21d5a0ed5d570ea",
            "width": "100%",
            "description": "Image here!",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg",
            "name": "name3",
            "sortable": 2
        },
        {
            "_id": "456",
            "widgetType": "HTML",
            "pageId": "58d0d2cbb21d5a0ed5d570ea",
            "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>',
            "name": "name4",
            "sortable": 3
        },
        {
            "_id": "567",
            "widgetType": "HEADER",
            "pageId": "58d0d2cbb21d5a0ed5d570ea",
            "size": 4,
            "text": "Lorem ipsum",
            "name": "name5",
            "sortable": 4
        },
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "58d0d2cbb21d5a0ed5d570ea", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "name": "name6", "sortable": 5
        },
        {
            "_id": "789",
            "widgetType": "HTML",
            "pageId": "58d0d2cbb21d5a0ed5d570ea",
            "text": "<p>Lorem ipsum</p>",
            "name": "name7",
            "sortable": 6
        },
        {
            "_id": "10112",
            "widgetType": "TEXT",
            "pageId": "58d0d2cbb21d5a0ed5d570ea",
            "text": "TEXT Widget Trial",
            "rows": 1,
            "placeholder": "Trial",
            "formatted": false,
            "sortable": 7
        }
    ];

    var headerSizes = [1, 2, 3, 4, 5, 6];
    var widgetTypes = ['HEADER', 'IMAGE', 'HTML', 'YOUTUBE', 'TEXT'];

    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.put('/api/page/:pageId/widget', updateWidgetOrder);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post("/api/upload", upload.single('uploadedImage'), uploadImage);

    function uploadImage(req, res) {

        var widget = {};

        if (req.body.widgetId) {
            //Update a Widget
            var widgetId = req.body.widgetId;

            widget = {
                width: req.body.width,
                name: req.body.name,
                url: "/uploads/" + req.file.filename,
                description: req.body.text
            };

            widgetModel.updateWidget(widgetId, widget).then(function(widget){
                res.redirect("/assignment/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
            }, function (err) {
                res.redirect("/assignment/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
            });

        }
        else {
            //Create a New Widget
            var pageId = req.body.pageId + "";

            widget.widgetType = "IMAGE";
            widget.width = req.body.width;
            widget.name = req.body.name;
            widget.url = "/uploads/" + req.file.filename;
            widget.description = req.body.text;

            widgetModel.lastSortableOrder(pageId).then(function(max){
                widget.sortable = max;
                widgetModel.createWidget(pageId, widget).then(function(widget) {
                    pageModel.findPageById({_id: pageId}).then(function (page) {
                        page.widgets.push(widget._id);
                        page.save();
                        res.redirect("/assignment/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
                    }, function (err) {
                        res.sendStatus(404);
                    });
                }, function (err) {
                    res.redirect("/assignment/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
                });
            }, function (err) {
                widget.sortable = 0;
                widgetModel.createWidget(pageId, widget).then(function(widget) {
                    pageModel.findPageById({_id: pageId}).then(function (page) {
                        page.widgets.push(widget._id);
                        page.save();
                        res.redirect("/assignment/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
                    }, function (err) {
                        res.sendStatus(404);
                    });
                }, function (err) {
                    res.redirect("/assignment/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
                });
            });
       }

    }

    function createWidget(req, res) {
        var pageId = req.params.pageId + "";
        var widget = req.body;
        widget._page = pageId;

        widgetModel.lastSortableOrder(pageId).then(function(max){
            widget.sortable = max;
            widgetModel.createWidget(pageId, widget).then(function(widget) {
                pageModel.findPageById({_id: pageId}).then(function (page) {
                    page.widgets.push(widget._id);
                    page.save();
                    res.status(200).json({widget: widget});
                }, function (err) {
                    res.sendStatus(404);
                });

            }, function (err) {
                res.status(404);
            });
        }, function (err) {
            widget.sortable = 0;
            widgetModel.createWidget(pageId, widget).then(function(widget) {
                pageModel.findPageById({_id: pageId}).then(function (page) {
                    page.widgets.push(widget._id);
                    page.save();
                    res.status(200).json({widget: widget});
                }, function (err) {
                    res.sendStatus(404);
                });
            }, function (err) {
                res.status(404);
            });
        });


    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetModel.updateWidget(widgetId, widget).then(function(changedwidget){
            res.status(200).json({widget: widget});
        }, function (error) {
            res.sendStatus(500);
        });
    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel.deleteWidget(widgetId).then(function(status){
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId + "";

        widgetModel.findAllWidgetsForPage(pageId).then(function (widgets) {
            res.status(200).json({widgets: widgets});
        }, function (err) {
            res.sendStatus(404);
        });

    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel.findWidgetById(widgetId).then(function (widget) {
            return res.status(200).json({widget: widget});
        }, function (err) {
            res.sendStatus(404);
        });
    }

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pageId + "";
        initialPos = parseInt(req.query.initial);
        finalPos = parseInt(req.query.final);

        widgetModel.reorderWidget(pageId, initialPos, finalPos).then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(200);
        });
    }
}