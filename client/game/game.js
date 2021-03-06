
_pause = false;
_inCombat = false;
_retry = false;


Template.game.helpers({
	startRetryLoop: function() {
		if (!_retry) {
			console.log("not retrying combats...");
			return;
		}
		var ticks = 0;
		var intervalId = setInterval(() => {
			if (!_retry || _inCombat) { 
				clearInterval(intervalId); 
				return; 
			}
			ticks += 1;
			var data = {};
			Meteor.call("elapseRetryTime", data);
			if (Router.current().route.getName() != 'game') {
				clearInterval(intervalId);
			}
			
		}, 200); //interval length
		
	},
	startCombatLoop: function() {
		if (_inCombat) { 
			console.log("combatAlreadyRunning")
			return;
		}
		
		var ticks = 0;
		
		var intervalId = setInterval(() => {
			_inCombat = true;
			if (!_pause) {
				ticks += 1;
				var data = {};
				
				var combatinfo = Combatinfo.findOne();
				if (combatinfo) {
					combatinfo.hits.each((hit) => {
						if (!_turnsDone[hit.turn]) {
							_turnsDone[hit.turn] = ticks;
							//console.log("handled messages for turn " + ticks)
							
							hit.each((_id, data) => {
								if (_id != "turn") {
									//console.log(_id);
									//console.log(data);
									var elem = $("#"+_id+"img");
									//console.log(elem)
									
									showDamage(elem, data.text, data.color, data.bgimg)
								}
							})
							
						}
					})
					
					Meteor.call("elapseTime", data);
				} else {
					console.log("combat ended");
					clearInterval(intervalId);
					_inCombat = false;
				}
				

				if (Router.current().route.getName() != 'game') {
					clearInterval(intervalId);
					_inCombat = false;
				}
				
			}
		}, 200); //Interval length
		
	},
	
	
	
	combatMessages: function() {
		var data = Combatinfo.findOne();
		if (!data) { return ["no combat data"]; }
		return data.combatlog || ["no messages"];
	},
	fillCombatMessages: function() {
		var data = Gameinfo.findOne();
		var msgs = [];
		if (!data) { msgs = ["no combat data"]; }
		else { msgs = data.combatlog || ["no messages"]; }
		var txt = $("#combatlog");
		
		if (txt) {
			var msg = "";
			var len = msgs.length;
			var i = 0;
			msgs.each((m)=>{
				msg += m + ((i < len-1) ? "\n" : "");
				i += 1;

			});

			txt.text(msg)
			if (txt[0]) {
				txt.scrollTop(txt[0].scrollHeight)
			}
		}
	},
	fillItemMessages: function() {
		var data = Gameinfo.findOne();
		var msgs = [];
		if (!data) { msgs = ["no item data"]; }
		else { msgs = data.itemlog || ["no item messages"]; }
		var txt = $("#itemlog");
		
		if (txt) {
			var msg = "";
			var len = msgs.length;
			var i = 0;
			msgs.each((m)=>{
				msg += m + ((i < len-1) ? "\n" : "");
				i += 1;

			});

			txt.text(msg)
			if (txt[0]) {
				txt.scrollTop(txt[0].scrollHeight)
			}
		}
	},
	generateName: japaneseName,
});

Template.game.events({
	'click #makeItem': function(event) {
		if (event && event.preventDefault) event.preventDefault();
		Meteor.call('testMakeItem');
		return false;
	},
	'click #recruit': function(event) {
		if (event && event.preventDefault) event.preventDefault();
		
		
		//Meteor.call("")
		
		return false;
	},
	"click .toggleLogs": function(event) {
		if (event.preventDefault) event.preventDefault();
		var showlogs = Session.get("showLogs");
		if (!showlogs) { Session.set("showLogs",true); }
		else { Session.set("showLogs",false); }
		return false;
	},
	'click .partyCheck': function(event) {
		if (event && event.preventDefault) event.preventDefault();
		
		var data = {};
		data.id = event.currentTarget.id;
		Meteor.call("toggleUnitInParty", data)
		
		return false;
	},
	'click #newGame': function(event) {
		if (event && event.preventDefault) event.preventDefault();
		
		var data = {}
		data.name = $("#unitName").val()
		data.job = $("#unitJob").val()
		console.log($("#unitName"))
		console.log(data);
		
		Meteor.call('newGame', data)
		
		return false
	},
	'click #inventory': function(event) {
		if (event && event.preventDefault) event.preventDefault();
		Router.go("inventory")
		return false;
	},
	
	'click #startCombat': function(event) {
		if (event && event.preventDefault) event.preventDefault();
		
		var data = {}
		data.region = $("#region").val();
		data.first = true;
		Session.set("lastRegion",data.region);
		//console.log(data);
		
		
		Meteor.call('startCombat', data)
		return false;
	},
	'click #pause': function(event) {
		if (event && event.preventDefault) event.preventDefault();
		
		_pause = !_pause;
		var btn = $("#pause");
		
		if (_pause) {
			btn.removeClass("green").addClass("red").text("PAUSED")
		} else {
			btn.addClass("green").removeClass("red").text("pause");
		}
		
		var units = Unitinfo.find().fetch();
		units.each((u) => {
			console.log(u);	
		})
	},
	
	'click #retry': function(event) {
		if (event && event.preventDefault) event.preventDefault();
		
		_retry = !_retry;
		var btn = $("#retry");
		
		if (_retry) {
			btn.removeClass("darken-4").addClass("darken-1").text("Autofight: On")
		} else {
			btn.addClass("darken-4").removeClass("darken-1").text("Autofight: Off");
		}
	},
		
		
	'click #run': function(event) {
		if (event && event.preventDefault) event.preventDefault();
		
		Meteor.call('runAway');
	},
	'click #shop': function(event) {
		if (event && event.preventDefault) event.preventDefault();
		
	}
		
		
	
});