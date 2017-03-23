/**
 * Created by sanjaymurali on 3/21/17.
 */


module.exports = function () {

    // Variables used for ordering widgets
    var initialPosition = 0;
    var finalPosition = 0;

    var api = {
        createWidget: createWidget,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        // Author added APIs
        lastSortableOrder: lastSortableOrder
    };

    var mongoose = require('mongoose');
    var q = require('q');

    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    return api;


    function createWidget(pageId, widget) {

        var deferred = q.defer();
        widget._page = pageId;

        WidgetModel.create(widget, function (err, widget) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(widget)
        });

        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {

        var deferred = q.defer();

        WidgetModel.update({_id: widgetId}, {$set: widget, $setOnInsert: widget}, function (err, newwidget) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(newwidget);
        });

        return deferred.promise;
    }

    function deleteWidget(widgetId) {

        var deferred = q.defer();

        findWidgetById(widgetId).then(function(widget) {
            WidgetModel.remove({_id: widgetId}, function (err, status) {
                if(err)
                    deferred.reject(err);
                else {

                    deleteIndex(widget._page, widget.sortable);
                    deferred.resolve(status);
                }
            });
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {

        var deferred = q.defer();
        WidgetModel.find({_page: pageId}, function (err, widgets) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(widgets);
        });

        return deferred.promise;
    }

    function findWidgetById(widgetId) {

        var deferred = q.defer();
        WidgetModel.findById(widgetId, function (err, widget) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(widget);
        });

        return deferred.promise;
    }

    function reorderWidget(pageId, initialPos, finalPos) {

        var deffered = q.defer();

        initialPosition = initialPos;
        finalPosition = finalPos;

        // First get the Widgets that belong to the particular page by pageId
        findAllWidgetsForPage(pageId).then(function (widgetsOfPage) {
            var selectedWidget = widgetsOfPage.find(getInitialIndex);
            var replacedWidget = widgetsOfPage.find(getFinalIndex);
            selectedWidget.sortable = finalPosition;

            /*
            If the widget is being moved up then we need to place the widget
            at that position and then increment the sortable of all widgets in between.
            */
            if (initialPos > finalPos) {
                widgetsOfPage.filter(getWidgetsInBetween).map(updateSortableOrderWidget);
                replacedWidget.sortable += 1;
            }
            else {
                widgetsOfPage.filter(getWidgetsInBetween).map(updateSortableOrderWidget);
                replacedWidget.sortable -= 1;
            }

            // Update the widgets with their new position (sortable)
            for (var i=0 ; i< widgetsOfPage.length; i++) {
                updateWidget(widgetsOfPage[i]._id, widgetsOfPage[i]).then(function (oneselectedwidget) {

                }, function (err) {
                    deffered.reject(err);
                });
            }

            deffered.resolve(pageId);

        }, function (err) {
            deffered.reject(err);
        });

        return deffered.promise;

    }



    // Helper function for various router, they dont have requests
    // or responses.

    function lastSortableOrder(pageId) {
        var deferred = q.defer();

        var max = 0;

        WidgetModel.findOne({_page: pageId}, function (err, widget) {
            if(err){
                max = 0;
                deferred.reject(max);
            }
            else {
                if(widget === null) {
                    max = 0;
                }
                else{
                    max = widget.sortable + 1;
                }

                deferred.resolve(max)
            }

        }).sort({ field: 'desc', _id: -1 }).limit(1);

        return deferred.promise;
    }

    function getInitialIndex(widget) {
        return widget.sortable === initialPosition;
    }

    function getFinalIndex(widget) {
        return widget.sortable === finalPosition;
    }

    function getWidgetsInBetween(widget) {
        if (initialPosition > finalPosition)
            return widget.sortable < initialPosition && widget.sortable > finalPosition;
        else
            return widget.sortable > initialPosition && widget.sortable < finalPosition;
    }

    function updateSortableOrderWidget(widget) {
        if (initialPosition > finalPosition)
            widget.sortable += 1;
        else
            widget.sortable -= 1;

    }

    function deleteIndex(pageId, sortable) {

        var widgetsLeft = [];

        findAllWidgetsForPage(pageId).then(function (widgets) {
            widgetsLeft = widgets;
            var selectWidgetsToUpdate = widgetsLeft.filter(function (widget) {
                return widget.sortable > sortable;
            });

            if (selectWidgetsToUpdate) {
                selectWidgetsToUpdate.map(function (widget) {
                    widget.sortable -= 1;
                })
            }

            for (var i=0 ; i< selectWidgetsToUpdate.length; i++) {
                updateWidget(selectWidgetsToUpdate[i]._id, selectWidgetsToUpdate[i])
                    .then(function (oneselectedwidget) {}, function (err) {});
            }


        }, function (err) {

        });
    }



};