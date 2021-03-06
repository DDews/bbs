//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Duckpunching helpers
//Make it easier to punch things into being ducks

function addTo(ptype, name, func) { Object.defineProperty(ptype, name, { value: func, enumerable: false }) }
function addToObject(name, func) { addTo(Object.prototype, name, func) }

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//String Duckpunching

addTo(String.prototype, "regexIndexOf", function(regex, startpos) {
	var indexOf = this.substring(startpos || 0).search(regex);
	return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
});

addTo(String.prototype, "prefix", function(s) { return this.startsWith(s); })
addTo(String.prototype, "suffix", function(s) { return this.endsWith(s); })
addTo(String.prototype, "contains", function(s) { return this.includes(s); })
addTo(String.prototype, "capitalize", function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
})

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Number Duckpunching

addTo(Number.prototype, "times", function(callback) {
	var i; for (i = 0; i < this; i+=1) { callback(i); }
});

formatMiliTime = function(t) {
	var milis = Math.floor(t);
	
	var seconds =	Math.floor(milis /     1000) % 60;
	var minutes =	Math.floor(milis /    60000) % 60;
	var hours =		Math.floor(milis /  3600000) % 24;
	var days =		Math.floor(milis / 86400000);
	
	var str = "";
	if (hours < 10) { hours = "0" + hours; }
	if (minutes < 10) { minutes = "0" + minutes; }
	if (seconds < 10) { seconds = "0" + seconds; }
	
	if (days > 0) { str += days + " days "; }
	str += hours + ":";
	str += minutes + ":";
	str += seconds + "";
	
	return str;
};

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Array duckpunching

addTo(Array.prototype, "each", function(callback) { for (var ind in this) { callback(this[ind]) } })
addTo(Array.prototype, "choose", function() {
	var ind = Math.floor(Math.random() * this.length)
	return this[ind];
})

addTo(Array.prototype, "subtract", function(other) {
	var result = [];
	this.each((v) => {result.push(v); } );
	
	other.each((thing) => {
		if (result.indexOf(thing) >= 0) {
			result.splice(result.indexOf(thing), 1);
		}
	})
	return result
})


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Object Duckpunching 

addToObject("has", function(key) { return this[key] !== undefined && this[key] !== null })


addToObject("each", function(callback) {
	for (var key in this) { if (this.hasOwnProperty(key)) { callback(key, this[key]); } }
});

addToObject("toPairRay", function() {
	var result = [];
	this.each((k,v) => {result.push({key:k, value:v} ) } );
	return result;
});

addToObject("mask", function(msk) {
	var val = {}
	if (msk instanceof Array) { msk.each( (k) => { if (this.has(k)) val[k] = this[k] } ) }
	else if (msk instanceof Object) { msk.each( (k,v) => { if (this.has(k)) val[k] = this[k] } ) }
	return val;
});

addToObject("matchingKeys", function(rule) {
	if (!rule) { rule = {}; }
	result = [];
	var pf = rule.xt("prefix", null);
	var sf = rule.xt("suffix", null);
	var cn = rule.xt("contains", null);

	this.each((k,v) => {
		if ((pf && k.prefix(pf)) || (sf && k.suffix(sf)) || (cn && k.contains(cn)) ) {
			result.push(k);
		}
	})
	
	return result;
	
})

addToObject("setVals", function(vals) { vals.each( (k,v) => { this[k]=vals[k] } ); return this; })

addToObject("xt", function(key, defaultVal) { return this.has(key) ? this[key] : defaultVal })
addToObject("num", function(key) { return this.xt(key, 0) })


addToObject("neg", function() {
	var c = {}
	this.each( (k,v) => { if (this.num(k) !== 0) c[k] = -v; } )
	return c
});

addToObject("sum", function() {
	var c = 0
	this.each( (k,v) => { if (isNumber(v)) { c += v; } } );
	return c
});




addToObject("combine", function(b, method) {
	var c = {};
	this.each( (k,v) => { c[k] = v; } )
	b.each( (k,v) => { c[k] = c[k] ? method(c[k], v) : v } )
	return c;
});

addToObject("combinex", function(b, method) {
	b.each( (k,v) => { this[k] = method(this.num(k), v) } )
});

addToObject("addNums", function(b) { return this.combine(b, add); } );
addToObject("mulNums", function(b) { return this.combine(b, mul); } );
addToObject("ratioNums", function(b) { return this.combine(b, ratio); } );

addToObject("matMul", function(b) {
	c = {};
	b.each( (k,v) => {
		r = 0;
		if (v instanceof Object) { v.each( (kk,vv) => { r += this.num(kk) * vv; } ) }
		else if (v instanceof Number) { r = this.num(k) * v; }
		c[k] = r;
	})
	return c;
});

addToObject("inc", function(thing, val) {
	this[thing] = this.num(thing) + val;
});
			

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Begin the bullshit bullshit!
//Withdrawing an object from the database makes it lose the constructor it was originally created with
//So, we will be duckpunching in basically __ALL__ functionality of our objects
//Just so that it can be used where we need it....
//
//
// 


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Unit Duckpunching

addToObject("recalc", function() {
	var groups = {}
	
	rules.each( (k,v) => { groups[k] = {}; })
	groups.baseStats = this.mask(baseStatCalc);
	var baseCombatStats = this.baseCombatStats;
	if (isString(baseCombatStats)) {
		this.baseCombatStats = baseStatData[baseCombatStats]
		baseCombatStats = this.baseCombatStats;
	}
	
	groups.combatStats = baseCombatStats.mask(combatStats)
	groups.combatRatios = baseCombatStats.mask(combatRatios)
	
	this.equipmentSlots.each((slot) => {
		var equipPiece = this.equipment[slot];
		if (equipPiece) { this.applyRules(groups, equipPiece) }
	})
	
	var genstats = groups.baseStats.matMul(combatStatCalc)
	
	this.applyRules(groups, genstats)
	var results = {};
	groupCombine.each( (s) => { results = results.addNums(groups[s]) } )
	conversions.each( (conv) => { this.applyConversion(results, conv) } )
	
	floors.each((s) => { if (results.has(s)) results[s] = Math.floor(results[s]) } )
	
	this.setVals(results)
});

addToObject("applyConversion", function(results, conv) {
	var curve = curves[conv["curve"]]
	var cmbrule = combineRules[conv["rule"]]
	var stat = conv["stat"]
	var source = conv["source"]
	
	var sourceVal = results.num(source);
	var vals = conv.addNums({x: sourceVal});
	
	var statValue1 = results[stat];
	var statValue2 = curve(vals);
	
	results[stat] = cmbrule(statValue1, statValue2)
});

addToObject("applyRules", function(groups, thing) {
	if (thing) {
		rules.each((key,rule) => {
			var checkRule = statCalcData[key]
			var mask;
			if (checkRule instanceof Array) {
				mask = checkRule;
			} else if (checkRule instanceof Object) {
				mask = thing.matchingKeys(rule);
			}
			var lhs = groups[key];
			var rhs = thing.mask(mask);
			
			var method = combineRules[rule];
			var result = lhs.combine(rhs, method)
			
			groups[key] = result;
		})
	}
	
});

addToObject("inCombat", function() { return this.combat; })
addToObject("dead", function() { return this.hp <= 0; })

addToObject("combatUpdate", function(delta, combatObj) {
	if (this.inCombat() && !this.dead()) {
		if (!this.timer) { this.timer = 0; }
		
		if (this.poseTime > 0) {
			this.poseTime -= delta;
			if (this.poseTime <= 0) { this.cpose = 'normal';	}
		}
		
		this.hp = clamp(this.hp + this.rhp * delta, 0, this.mhp)
		this.mp = clamp(this.mp + this.rhp * delta, 0, this.mmp)
		this.sp = clamp(this.sp + this.rhp * delta, 0, this.msp)
		
		this.timer += delta * this.aspd;
		if (this.timer >= this.timeout) {
			this.timer -= this.timeout;
			var skill = "autoAttack";
			
			this.castSkill(skill, combatObj);
		}
		
		dbupdate(this);
	}
});

addToObject("percentage", function(a, b) {
	var aval = this[a] || 0;
	var bval = this[b] || 1;
	return aval / bval;
});


addToObject("fullHeal", function() {
	this.hp = this.mhp;
	this.mp = this.mmp;
	this.sp = this.msp;
});

addToObject("giveExp", function(xp) {
	this.exp += xp;
	this.totalExp += xp;
	this.spendableExp += xp;
	if (this.exp >= this.tnl) {
		this.level += 1;
		this.exp -= this.tnl;
		this.tnl = expCurve(this.level);
		
		baseStats.each((stat) => {
			this[stat] += 1;
		});
		this.recalc();
	}
		
	
	dbupdatef(this);
})


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Still 'Unit' donkeypunching - these are for the combat system...

addToObject("targetOneEnemy", function(combatObj) { return combatObj.opposition[this.team].choose() } )
addToObject("targetAllEnemy", function(combatObj) { return combatObj.opposition[this.team] } )
addToObject("targetSelf", function(combatObj) { return this._id; } )
addToObject("targetOneAlly", function(combatObj) { return combatObj.byTeam[this.team].choose() } )
addToObject("targetAllAlly", function(combatObj) { return combatObj.byTeam[this.team] } )

addToObject("castSkill", function(skillName, combatObj) {
	if (!this.has("skills")) {
		this.skills = {};
		this.skills["autoAttack"] = skillData["autoAttack"];
	}
	if (!this.has("record")) {
		this.record = {};
	}
	
	var skill = this.skills[skillName]
	if (this.mp < skill.mpCost) { return false; }
	if (this.sp < skill.spCost) { return false; }
	
	this.mp -= skill.mpCost;
	this.sp -= skill.spCost;
	
	if (this.team == 'player') {
		
		this.record.inc(skillName+"_uses", 1)
		this.record.inc("skillsUsed", 1)
		this.record.inc("mpUsed", skill.mpCost)
		this.record.inc("spUsed", skill.spCost)
		
		combatObj.summary.inc("skillsUsed", 1);
		combatObj.summary.inc("mpUsed", skill.mpCost);
		combatObj.summary.inc("spUsed", skill.spCost);
	}
	
	
	if (skill.isAOE()) {
		var targets = skill.isSupport() ? this.targetAllAlly(combatObj) : this.targetAllEnemy(combatObj);
		
		targets.each((target) => {
			var targetObj = dbget("Unitinfo", target);
			
			if (targetObj) {
				combatObj.combatEvent(this.name + " uses " + skill.name + " on " + targetObj.name);
				var results = this.useSkill(skill);
				this.recordResults(results, combatObj, "Dealt");
				targetObj.recordResults(results, combatObj, "Taken");
				
				var kill = targetObj.applyResults(results, combatObj);
				if (kill && this.team == 'player') {
					this.record.inc("kills", 1);
					combatObj.summary.inc("kills", 1);
				}
			}
			
		})
	} else {
		var target;
		if (skill.isSelf()) { target = this.targetSelf(combatObj); }
		else { target = (skill.isSupport()) ? this.targetOneAlly(combatObj) : this.targetOneEnemy(combatObj); }
		
		var targetObj = dbget("Unitinfo", target);
		if (targetObj) {
			combatObj.combatEvent(this.name + " uses " + skill.name + " on " + targetObj.name);
			var results = this.useSkill(skill);
			
			this.recordResults(results, combatObj, "Dealt");
			targetObj.recordResults(results, combatObj, "Taken");

			var kill = targetObj.applyResults(results, combatObj);
			if (kill && this.team == 'player') {
				this.record.inc("kills", 1);
				combatObj.summary.inc("kills", 1);
				
				if (targetObj.job.contains("*")) {
					this.record.inc("eliteKills", 1);
					combatObj.summary.inc("eliteKills", 1);
				}
				
			}
		}
		
	}
	
	dbupdate(this);
});


addToObject("recordResults", function(results, combatObj, action) {
	
	if (this.team == 'player') {
		if (!this.has("record")) { this.record = {} }
		var s = combatObj.summary;
		var r = this.record;
		
		//Action is either "Dealt" or "Taken"
		r.inc("crits" + action, results.crit ? 1 : 0);
		s.inc("crits" + action, results.crit ? 1 : 0);

		if (results.damage) {
			results.damage.each((d) => {
				if (d.miss) { 
					r.inc("misses" + action, 1)
					s.inc("misses" + action, 1)
				} else {
					r.inc("hits" + action, 1)
					s.inc("hits" + action, 1)
					r.inc("damage" + action, Math.floor(d.dmg));
					s.inc("damage" + action, Math.floor(d.dmg));
				}

			})
		}
		
		
	}
})

addToObject("useSkill", function(skill){
	if (skill) {
		var results = {};
		var critRoll = Random.value();
		results["skill"] = skill.name;
		results["source"] = this.name;
		results["crit"] = critRoll < (this.crit + skill.num("critMod"));
		
		if (skill.damage) { this.useAttack(skill, results); }
		
		return results;
	}
	return null;
});

addToObject("useAttack", function(skill, results) {
	var dmg = [];
	var model = skill.damage;
	
	if (model instanceof Array) {
		model.each((d) => {dmg.push(this.singleHit(d, results))});
	} else {
		dmg.push(this.singleHit(model, results));
	}
	
	results["damage"] = dmg;
});

addToObject("singleHit", function(info, results) {
	var crit = results.crit;
	var magical = info.magical ? true : false;
	var o = {}
	
	var damageTypeFrom = this.damageTypeFrom || "handRight";
	var baseDamageType = this.equipment[damageTypeFrom] && this.equipment[damageTypeFrom].element;
	baseDamageType = baseDamageType || "crush";
	
	var hitRoll = Random.value();
	var hit = hitRoll < (magical ? this.macc : this.pacc);
	//console.log(hitRoll + " " + this.pacc + " : " + hit);
	
	if (!hit) { 
		o.miss = true; 
		return o;
	}
	
	var element = info.element;
	if (!element || element == "inherited") {
		element = baseDamageType;
	}
	
	var stat = info.stat;
	var baseAmt = info.xt("baseAmt", 0);
	var statDmg = this[stat];
	var statMult = info.xt("statMult", 1);
	
	var dmg = baseAmt + (statDmg * statMult);
	//TBD: Critical power for dan :)
	dmg *= crit ? 2.5 : 1;
	

	
	var roll = Random.range(.9, 1.15);
	o.dmg = dmg * roll;
	o.magical = magical;
	o.element = element;
	
	return o;
});

addToObject("applyResults", function(results, combatObj) {
	if (this.dead()) { return false; }
	if (!results) { return false; }
		
	if (results.damage) { this.applyDamage(results, combatObj); }
	
	dbupdate(this);
	
	return this.dead();
});

function dmgTextColor(player, crit, antiCrit) {
	if (player) {
		if (crit) {
			if (antiCrit) { return "#33BBCC"}
			return "#FF00DD"
		}
		return "#FF2233"
		
	} else {
		if (crit) {
			if (antiCrit) { return "#EECC55" }
			return "#FF6600"
		}
		return "#FFDD00"
	}
	
}

addToObject("applyDamage", function(results, combatObj) {
	if (this.hp <= 0) { return false; }
	
	var damage = results.damage;
	var crit = results.crit;
	
	var antiCrit = crit ? (Random.value() < this.resi) : false;
	
	var totalDamage = 0;
	var evadedAny = false;
	var cmbt = combatObj;
	
	damage.each((info) => {
		if (!info.miss) {
			var dmg = info.dmg;
			var element = info.element;
			var magical = info.magical;
			
			var evadeRoll = Random.value();
			var evaded = evadeRoll < (magical ? this.meva : this.peva);
			if (evaded) {
				evadedAny = true;
				var dodgeVerb = magical ? " resisted " : " dodged ";
				combatObj.combatEvent(this.name + dodgeVerb + element + " damage");
			} else {
				var resistance = this.num("res_" + element);
				var reduction = 1.0 - ratio(resistance, magical ? this.mdef : this.pdef);
				if (antiCrit) { dmg *= .4; }
				dmg *= reduction;
				var damageVerb = antiCrit ? " takes a reduced " : " takes ";
				var critNoun = crit ? " CRITICAL " : "";
				
				combatObj.combatEvent(this.name + damageVerb + Math.floor(dmg) + " " + element + critNoun + " damage!");
				totalDamage += dmg;
			}
			
		} else {
			//cmbt.combatEvent(results.source + " missed")
		}
			
	});
	
	var currentTurn = combatObj.currentTurn;
	var messages = combatObj.hits[0];
	
	if (totalDamage <= 0) {
		if (evadedAny) {
			messages[this._id] = {text:"Dodge", color:"cyan"};
			combatObj.combatEvent(this.name + " dodged nimbly!");
			this.pose("happy", 1.2);
		
		} else {
			messages[this._id] = {text:"Miss", color:"white"};
			combatObj.combatEvent(results.source + " missed horribly!");
			this.pose("happy", 1.2);
		
		}
	
	} else {
		var tdmg = Math.floor(totalDamage);
		var col = dmgTextColor((this.team == 'player'), crit, antiCrit);
		var bg = crit ? "/critbg.png" : null;
		//var bg = "/critbg.png";
		messages[this._id] = { text:tdmg, color:col, bgimg: bg };
		
		this.pose("hurt", .8);
		if (damage.length > 1) {
			combatObj.combatEvent(this.name + " took a total of " + tdmg + (crit ? " CRITICAL " : "") + " damage");
		}
		this.hp -= totalDamage;
		if (this.hp <= 0) {
			this.hp = 0;
			this.die(combatObj);
			return true;
		}
		
	}
	
	return false;
})


addToObject("die", function(combatObj) {
	if (this.team == 'player') {
		this.record.inc("deaths", 1);
		combatObj.summary.inc("deaths", 1);
	}

	
	combatObj.combatEvent(this.name + " has been felled!");
	this.cpose = 'normal'
	combatObj.rebuildCombatantLists();
})

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Unit cosmetic Duckpunching

addToObject("pose", function(pose, time) {
	this.cpose = pose;
	this.poseTime = time;
});

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Game Duckpunching

addToObject("removeAllCombats", function() {
	var combats = Combatinfo.find({username: this.username});
	
	if (combats.count() > 0) {
		combats = combats.fetch();
		
		combats.each((c) => {
			c.cleanUpCombat();
			c.endCombat();
		});
		
	}
	
	
});

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//Combat Duckpunching

addToObject("combatEvent", function(string) {
	this.combatlog = this.combatlog || [];
	this.combatlog.push(string);
	if (this.combatlog.length > 10) {
		this.combatlog.shift();
	}
	dbupdate(this);
	//console.log(string);
	
});

addToObject("winningTeam", function() {
	if (this.run) { return 'run'; }
	var teams = []
	this.combatants.each((id) => {
		var c = dbget("Unitinfo", id);
		if (!c.dead() && teams.indexOf(c.team) < 0) {
			teams.push(c.team)
		}
	});
	if (teams.length == 1) { return teams[0]; }
	return null;
});

addToObject("rebuildCombatantLists", function() {
	this.opposition = {};
	this.byTeam = {};
	var live = [];
	this.combatants.each( (id) => {
		var c = dbget("Unitinfo", id);
		var team = this.byTeam[c.team] || []
		if (!c.dead()) {
			team.push(c._id)
			live.push(c._id);
			this.byTeam[c.team] = team
		}
	});
	
	this.byTeam.each((team, dudes) => {
		this.opposition[team] = live.subtract(dudes)
	});
	
	dbupdate(this);
})

addToObject("cleanUpCombat", function() {
	var keepers = [];
	
	this.combatants.each( (id) => {
		var c = dbget("Unitinfo", id);
		if (c.team == 'player') { 
			keepers.push(c._id); 
			c.cpose = "normal";
			dbupdate(c);
		} else { 
			dbremove(c); 
		}
	});
	
	this.combatants = keepers;
	dbupdate(this);
});

addToObject("startNewBattle", function(newUnits) {
	newUnits.each( (c) => {
		this.combatants.push(c._id);
		c.username = this.username;
		c.combat = this._id;
		
		dbupdate(c);
	});
	
	this.rebuildCombatantLists();
});

addToObject("endCombat", function() {
	this.combatants.each( (id) => {
		var c = dbget("Unitinfo", id);
		c.combat = null;
		c.fullHeal();
		c.timer = 0;
		dbupdate(c);
	});
	var username = this.username;
	var gamedata = Gameinfo.findOne({username: username});
	
	gamedata.combat = null;
	var msg = this.run ? "Ran Away" : "Defeated";
	var summary = this.summary;
	summary.message = msg;
	
	gamedata.summary = summary;
	
	dbupdate(gamedata);
	
	dbremove(this);
	
});


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//Skill duckpunching

addToObject("isAOE", function() { return this.type.contains("area"); } );
addToObject("isSupport", function() { return this.type.contains("heal") || this.type.contains("buff"); } );
addToObject("isSelf", function() { return this.type.contains("self") } );


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//More duckpunching?

