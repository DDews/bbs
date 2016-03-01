/**
 * Created by Dan on 2/27/2016.
 */
Template['inbox'].helpers({
    message: function () {
        return Messages.find();
    },
    showpm: function () {
        return Session.get("showpm");
    },
    isFrom: function (messages) {
        var post = _.last(messages)
        return post.from;
    },
    marked: function (unread) {
       return _.contains(unread,Meteor.user().username)
    },
    myDate: function (d) {
            dformat = [(d.getMonth()+1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/') +' ' +
                [d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');
        return dformat;
    },
    numPosts: function(messages) {
        return messages.length - 1;
    },
    isTo: function(from, to) {
        if (from == Meteor.user().username) return to;
        return from;
    }
});
Template.inbox.events({
    'submit form': function() {
        event.preventDefault();
        var username = $('[name=to]').val();
        var message = $('[name=message]').val();
        var subject = $('[name=subject]').val();
        Meteor.call('sendPM',username,subject,message,function(error, result) {

            if (error) {
                $("#pmerror").html(error.reason);
                return;
            } else {
                $('[name=to]').val('');
                $('[name=message]').val('');
                Session.set("showpm",false);
                $("#pmerror").html('');
            }
        });
    },
    'click .sendpm': function(event){
        event.preventDefault();
        var showpm = Session.get("showpm");
        if (showpm) Session.set("showpm",false);
        else Session.set("showpm",true);
    },
    'click .deletePM': function(event) {
        event.preventDefault();
        var thread_id = event.currentTarget.id;
        Meteor.call("deleteMessage",thread_id, function(error, result) {
            if (error) {
                alert(error.reason);
            } else {
                console.log("success!");
            }
        });
    }
});