/**
 * Created by sanjaymurali on 2/27/17.
 */


module.exports = function (app, pageModel, websiteModel) {

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem", "title": "Title 1"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem", "title": "Title 2"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem", "title": "Title 3"}
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        pageModel.deletePage(pageId).then(function(page){
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId + "";
        var page = req.body;

        pageModel
            .createPage(websiteId, page)
            .then(function (createdpage) {
                websiteModel.findWebsiteById({_id: websiteId}).then(function (website) {
                    website.pages.push(createdpage._id);
                    website.save();
                    res.status(200).json({page: createdpage});
                }, function (err) {
                    res.sendStatus(404);
                });
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId
        var page = req.body;

        pageModel.updatePage(pageId, page).then(function(changedpage){
            res.status(200).json({page: page});
        }, function (error) {
            res.sendStatus(500);
        });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        pageModel.findAllPagesForWebsite(websiteId).then(function (pages) {
            res.status(200).json({pages: pages});
        }, function (err) {
            res.sendStatus(404);
        });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel.findPageById(pageId).then(function (page) {
            res.status(200).json({page: page});
        }, function (err) {
            res.sendStatus(404);
        });

    }
}