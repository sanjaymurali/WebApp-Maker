/**
 * Created by sanjaymurali on 2/27/17.
 */


module.exports = function (app) {

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
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages.splice(p, 1);
                return res.sendStatus(200);
            }
        }
        res.sendStatus(404);
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page.websiteId = websiteId;
        page._id = (new Date()).getTime() + ""; //Attached with String to make it a String
        //Check return from DB in assignment4
        pages.push(page);
        res.status(200).json({page: page});
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId
        var page = req.body;
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages[p].name = page.name;
                pages[p].title = page.title;
                return res.status(200).json({page: page});
            }
        }
        res.sendStatus(404);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var combinedPages = [];
        for (var p in pages) {
            if (pages[p].websiteId === websiteId) {
                combinedPages.push(pages[p]);
            }
        }
        res.status(200).json({pages: combinedPages});
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                return res.status(200).json({page: pages[p]});
            }
        }
        res.sendStatus(404);
    }
}