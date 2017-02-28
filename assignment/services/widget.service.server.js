/**
 * Created by sanjaymurali on 2/28/17.
 */


module.exports = function (app) {
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

    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget._id = (new Date()).getTime() + "";
        widget.pageId = pageId + "";

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

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
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
        res.status(404);
    }
}