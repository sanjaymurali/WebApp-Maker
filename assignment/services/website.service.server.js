/**
 * Created by sanjaymurali on 2/26/17.
 */

module.exports = function (app) {

    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem", created: new Date()}
    ];

    function deleteWebsite(req,res) {
        var websiteId = req.params.websiteId;
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites.splice(w, 1);
                return res.sendStatus(200);
            }
        }
        res.sendStatus(404);
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        console.log(req.body);
        var website = req.body;
        website.developerId = userId;
        website._id = (new Date()).getTime() + "";
        website.created = new Date();
        websites.push(website);
        res.status(200).json({website: website});

    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites[w].name = website.name;
                websites[w].description = website.description;
                return res.status(200).json({website: websites[w]});
            }
        }
        res.sendStatus(404);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for (var w in websites) {
            if (websites[w].developerId === userId) {
                sites.push(websites[w]);
            }
        }
        res.status(200).json({websites: sites});
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        for (var w in websites) {
            if (websites[w]._id === wid) {
                return res.status(200).json({website: websites[w]});
            }
        }
        res.sendStatus(404);
    }

}