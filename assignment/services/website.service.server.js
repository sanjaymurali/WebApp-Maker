/**
 * Created by sanjaymurali on 2/26/17.
 */

module.exports = function (app, websiteModel, userModel) {

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

    function deleteWebsite(req, res) {

        var websiteId = req.params.websiteId;

        websiteModel.deleteWebsite(websiteId).then(function(website){
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(404);
        });
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;

        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function (createdwebsite) {
                userModel.findUserById({_id: userId}).then(function (user) {
                    user.websites.push(createdwebsite._id);
                    user.save();
                    res.status(200).json({website: createdwebsite});
                }, function (err) {
                    res.sendStatus(404);
                });

            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId + "";
        var website = req.body;

        websiteModel.updateWebsite(websiteId, website).then(function(changedwebsite){
            if(changedwebsite.ok === 1)
                res.status(200).json({website: website});
            else
                res.sendStatus(500);
        }, function (error) {
            console.log(error);
            res.sendStatus(500);
        });
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        websiteModel.findAllWebsitesForUser(userId).then(function (websites) {
            res.status(200).json({websites: websites});
        }, function (err) {
            res.sendStatus(404);
        });

    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;

        websiteModel.findWebsiteById(wid).then(function (website) {
            res.status(200).json({website: website});
        }, function (err) {
            res.sendStatus(404);
        });
    }

}