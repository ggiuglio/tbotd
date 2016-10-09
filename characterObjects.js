function team(name, isPCTeam, charList, leader, teamRelations, attitudeChanges)
{
	this.name = name;
	this.isPCTeam = isPCTeam;
	this.charList = charList;
	this.leader = leader;
	this.teamRelations = teamRelations;
	this.attitudeChanges = attitudeChanges;
}

function character(name, longName, description, img, radius, reach, maxMove, level, xp, gold, thaco, str, dex, con, inte, wis, cha,  tsRef, tsFor, tsWill, hp, naturalArmor, isAI, AIBehaviour, team, talksRecived, talksDone)
{ 
	this.name=name;
	this.longName = longName;
	this.description = description;
	this.img = img;
	this.isAI = isAI;
	this.AIBehaviour = AIBehaviour;
	this.team = team;
	this.radius = radius;
	this.reach = reach;
	this.str = str;
	this.dex = dex;
	this.con = con;
	this.inte = inte;
	this.wis = wis;
	this.cha = cha;
	this.hp = hp;
	this.naturalArmor = naturalArmor;
	this.maxHp = hp;
	this.maxMove = maxMove;
	this.moveDone = null;
	this.moveActionDone = false;
	this.standardActionDone = false;
	this.minorActionDone = false;
	this.opportunityAttackRecived = new Array();
	this.selectedMoveStyle = "walk";
	this.selectedAttackStyle = "melee";	
	this.selectedAction = "move";
	this.sleep = 0;
	
	this.level = level;
	this.xp = xp;
	this.gold = gold;
	this.thaco = thaco;
	
	this.strMod = Math.floor((str - 10) / 2);
	this.dexMod = Math.floor((dex - 10) / 2);
	this.conMod = Math.floor((con - 10) / 2);
	this.inteMod = Math.floor((inte - 10) / 2);
	this.wisMod = Math.floor((wis - 10) / 2) ;
	this.chaMod = Math.floor((cha - 10) / 2);
	
	this.tsRef = tsRef;
	this.tsFor = tsFor;
	this.tsWill = tsWill;

	this.rightHand = null;
	this.leftHand = null;
	this.head = null;
	this.armor = null;
	this.rightRing = null;
	this.leftRing = null;
	this.boots = null;
	this.amulet = null;
	this.gloves = null;
	
	this.selectedHand = "right";
	this.selectedWeapon = null;	
	this.selectedSpell = null;
	
	this.inventory = new Array();
	this.spellBook = new Array();
	
	this.alive = true;
	
	this.talksRecived = talksRecived;
	this.talksDone = talksDone;

	this.ac = ac;
	function ac()
	{
		var ac = 10;
		ac = ac + this.naturalArmor;
		ac = ac + this.dexMod;
		if(this.armor != null)
			ac = ac + this.armor.AC + this.armor.armorBonus;
			
		if(this.rightFinger != null && this.rightFinger.armorBonus != null)
			ac = ac + this.rightFinger.armorBonus;
			
		if(this.leftFinger != null && this.leftFinger.armorBonus != null)
			ac = ac + this.leftFinger.armorBonus;
			
		if(this.belt != null && this.belt.armorBonus != null)
			ac = ac + this.belt.armorBonus;
			
		if(this.head != null && this.head.armorBonus != null)
			ac = ac + this.head.armorBonus;
			
		if(this.amulet != null && this.amulet.armorBonus != null)
			ac = ac + this.amulet.armorBonus;
			
		if(this.gloves != null && this.gloves.armorBonus != null)
			ac = ac + this.gloves.armorBonus;	
			
		if(this.leftHand != null && this.leftHand.type == "shield")
			ac = ac + this.leftHand.AC + this.leftHand.armorBonus ;
		
		if(this.rightHand != null && this.rightHand.type == "shield")
			ac = ac + this.rightHand.AC + this.rightHand.armorBonus ;
			
			
		return ac;
	}

	this.hit = hit;
	function hit()
	{
		var toHit = this.thaco;
		
		if(this.selectedHand == 'right')
		{
			if(this.rightHand != null)
			{
				if(this.rightHand.attackBonus != null)
					toHit = toHit + this.rightHand.attackBonus;
				
				if(this.rightHand.weaponGroup == 'heavyBlade' || this.rightHand.weaponGroup == 'axe' || this.rightHand.weaponGroup == 'maul'  )			
					toHit = toHit + this.strMod;
				
				if(this.rightHand.weaponGroup == 'handCrossBow' || this.rightHand.weaponGroup == 'throw' || this.rightHand.weaponGroup == 'lightBlade' )
					toHit = toHit + this.dexMod;
			}
			else
			{
				toHit = toHit + this.strMod;
			}
		}
		
		if(this.selectedHand == 'left')
		{
			if(this.leftHand != null)
			{
				if(this.leftHand.attackBonus != null)
					toHit = toHit + this.leftHand.attackBonus;
					
				if(this.leftHand.weaponGroup == 'heavyBlade' || this.leftHand.weaponGroup == 'axe' || this.leftHand.weaponGroup == 'maul'  )			
					toHit = toHit + this.strMod;
				
				if(this.leftHand.weaponGroup == 'handCrossBow' || this.leftHand.weaponGroup == 'throw' || this.leftHand.weaponGroup == 'lightBlade' )
					toHit = toHit + this.dexMod;
			}
			else
			{
				toHit = toHit + this.strMod;
			}
		}
		
		if(this.selectedHand == 'both')
		{
			if(this.rightHand != null)
			{
				if(this.rightHand.attackBonus != null)
					toHit = toHit + this.rightHand.attackBonus;
				
				if(this.rightHand.weaponGroup == 'heavyBlade' || this.rightHand.weaponGroup == 'axe' || this.rightHand.weaponGroup == 'maul'  )			
					toHit = toHit + this.strMod;
				
				if(this.rightHand.weaponGroup == 'longBow' || this.rightHand.weaponGroup == 'shortBow' || this.rightHand.weaponGroup == 'heavyCrossBow')
					toHit = toHit + this.dexMod;
			}
			else
			{
				toHit = this.strMod - 4;				
			}
		}
		
		if(this.armor != null && this.armor.attackBonus != null)
			toHit = toHit + this.armor.attackBonus;
			
		if(this.rightFinger != null && this.rightFinger.attackBonus != null)
			toHit = toHit + this.rightFinger.attackBonus;
			
		if(this.leftFinger != null && this.leftFinger.attackBonus != null)
			toHit = toHit + this.leftFinger.attackBonus;
			
		if(this.belt != null && this.belt.attackBonus != null)
			toHit = toHit + this.belt.attackBonus;
			
		if(this.head != null && this.head.attackBonus != null)
			toHit = toHit + this.head.attackBonus;
			
		return toHit;
	}
	
	this.damage = damage;
	function damage()
	{
		var totalDamage = 0;
		
		if(this.selectedHand == 'right')
		{
			totalDamage = totalDamage + this.strMod;
			if(this.rightHand != null)
			{	
				totalDamage = totalDamage + this.rightHand.damage();
			}
			else
			{
				totalDamage = totalDamage + this.unarmedDamage();
			}
		}
		
		if(this.selectedHand == 'left')
		{
			totalDamage = totalDamage + this.strMod;
			if(this.leftHand != null)
			{		
				totalDamage = totalDamage + this.leftHand.damage();
			}
			else
			{
				totalDamage = totalDamage + this.unarmedDamage();
			}
		}
		
		if(this.selectedHand == 'both')
		{
			totalDamage = totalDamage + Math.floor(this.strMod * 1.5);
			if(this.rightHand != null)
			{		
				totalDamage = totalDamage + this.rightHand.damage();
			}
			else
			{
				totalDamage = totalDamage + this.unarmedDamage();
			}
		}
		
		if (totalDamage < 0) 
			totalDamage = 0;
			
		return totalDamage;
	}
	
	this.tsRefRoll = tsRefRoll;
	function tsRefRoll()
	{
		return rollD20() + this.tsRef + this.dexMod;	
	}
	
	this.tTsForRoll = tTsForRoll;
	function tTsForRoll()
	{
		return rollD20() + this.tsFor + this.conMod;
	}
	
	this.tsWillRoll = tsWillRoll;
	function tsWillRoll()
	{
		return rollD20() + this.tsWill + this.wisMod;
	}
	
	this.unarmedDamage = unarmedDamage;
	function unarmedDamage()
	{
		return rollD4();
	}
	
	this.equipHead = equipHead;
	function equipHead(head)
	{
		if(head == null || head.type == "helm")
			this.head = head;	
	}
	
	this.equipGloves = equipGloves;
	function equipGloves(gloves)
	{
		if(gloves == null || gloves.type == "gloves")
			this.gloves = gloves;	
	}
	
	this.equipAmulet = equipAmulet;
	function equipAmulet(amulet)
	{
		if(amulet == null || amulet.type == "amulet")
			this.amulet = amulet;	
	}
	
	this.equipArmor = equipArmor;
	function equipArmor(armor)
	{
		if(armor == null || armor.type == "armor")
			this.armor = armor;	
	}
	
	this.equipLeftHand = equipLeftHand;
	function equipLeftHand(weapon)
	{
		if(weapon == null || (weapon.type == "weapon" && (this.rightHand == null || this.rightHand.ID != weapon.ID  )))
		{
			if(weapon != null)
			{
				this.selectdWeapon = this.leftHand;
				
				if(this.leftHand != null && this.leftHand.weaponSize == "twoHands")
					this.rightHand = null;
					
				if(weapon.type == "weapon" )
				{
					this.selectedHand = "left";
					this.selectedWeapon = weapon;
				}
			}
			
			this.leftHand = weapon;
		}	
		else if(weapon.type == "shield" && (this.rightHand == null || this.rightHand.ID != weapon.ID  ))
		{
			if(this.leftHand != null && this.leftHand.weaponSize == "twoHands")
				this.rightHand = null;
				
			this.leftHand = weapon;
		}
		
		if(weapon == null)
			this.selectedWeapon = null;
	}
	
	this.equipRightHand = equipRightHand;
	function equipRightHand(weapon)
	{
		if(weapon == null || (weapon.type == "weapon" && (this.leftHand == null || this.leftHand.ID != weapon.ID  )))
		{	
			if(weapon != null)
			{
				this.selectdWeapon = this.rightHand;
				
				if(this.rightHand != null && this.rightHand.weaponSize == "twoHands")
					this.leftHand = null;
					
				if(weapon.type == "weapon" )
				{
					this.selectedHand = "right";
					this.selectedWeapon = weapon;
				}
			}
			
			this.rightHand = weapon;
		}
		else if(weapon.type == "shield" && (this.leftHand == null || this.leftHand.ID != weapon.ID  ))
		{
			if(this.rightHand != null && this.rightHand.weaponSize == "twoHands")
				this.leftHand = null;
				
			this.rightHand = weapon;
		}
		
		if(weapon == null)
			this.selectedWeapon = null;
	}

	this.equipBothHands = equipBothHands;
	function equipBothHands(weapon)
	{
		if(weapon == null || weapon.type == "weapon")
		{
			this.rightHand = weapon;
			this.leftHand = weapon;
		}	
		if(weapon != null)
		{
			this.selectdWeapon = this.rightHand;
			if(weapon.type == "weapon" )
			{
				this.selectedHand = "both";
				this.selectedWeapon = weapon;
			}
			
		}
		
		if(weapon == null)
			this.selectedWeapon = null;
	}
	
	this.equipLeftRing = equipLeftRing;
	function equipLeftRing(ring)
	{
		if(ring == null || (ring.type == "ring" && (this.rightRing == null || this.rightRing.ID != ring.ID  )))
			this.leftRing = ring;	
	}
	
	this.equipRightRing = equipRightRing;
	function equipRightRing(ring)
	{
		if(ring == null || (ring.type == "ring" && (this.leftRing == null || this.leftRing.ID != ring.ID  )))
			this.rightRing = ring;	
	}
	
	this.equipBoots = equipBoots;
	function equipBoots(boots)
	{
		if(boots == null || boots.type == "boots")
			this.boots = boots;	
	}
}

function weapon(ID, name, type, reachType, weaponSize, weaponGroup, characterSize, damageDice, damageDiceNumber, attackBonus, damageBonus, weaponSprite, missileSprite, imageFile, imgWidth, imgHeight, value)
{
	this.ID = ID;
	this.name = name;
	this.type = type;
	this.reachType = reachType;
	this.weaponSize = weaponSize;
	this.weaponGroup = weaponGroup;
	this.characterSize = characterSize;

	this.damageDice = damageDice;
	this.damageDiceNumber = damageDiceNumber;
	this.attackBonus = attackBonus;
	this.damageBonus = damageBonus;
	
	this.weaponSprite = weaponSprite;
	this.imageFile = imageFile;
	this.missileSprite = missileSprite;
	
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.value = value;
	
	this.selected = false;
	
	this.damage = damage;
	function damage()
	{
		var weaponDamage = 0;
		
		for(var i = 0; i < damageDiceNumber; i++)
		{
			if(this.damageDice  == 12)
				weaponDamage = weaponDamage + rollD12();
			if(this.damageDice  == 10)
				weaponDamage = weaponDamage + rollD10();
			if(this.damageDice  == 8)
				weaponDamage = weaponDamage + rollD8();
			if(this.damageDice  == 6)
				weaponDamage = weaponDamage + rollD6();
			if(this.damageDice  == 4)
				weaponDamage = weaponDamage + rollD4();
		}
		
		weaponDamage = weaponDamage + this.damageBonus;
		
		return weaponDamage;
	}
}

function helm(ID, name, type, armorBonus, imageName, imageFile, imgWidth, imgHeight, value)
{
	this.ID = ID;
	this.name = name;
	this.type = type;
	this.armorBonus = armorBonus;
	
	this.imageName = imageName;
	this.imageFile = imageFile;
	
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.value = value;
	
	this.selected = false;
}

function gloves(ID, name, type, armorBonus, imageName, imageFile, imgWidth, imgHeight, value)
{
	this.ID = ID;
	this.name = name;
	this.type = type;
	this.armorBonus = armorBonus;
	
	this.imageName = imageName;
	this.imageFile = imageFile;
	
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.value = value;
	
	this.selected = false;
}

function amulet(ID, name, type, armorBonus, imageName, imageFile, imgWidth, imgHeight, value)
{
	this.ID = ID;
	this.name = name;
	this.type = type;
	this.armorBonus = armorBonus;
	
	this.imageName = imageName;
	this.imageFile = imageFile;
	
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.value = value;
	
	this.selected = false;
}

function ring(ID, name, type, intBonus, imageName, imageFile, imgWidth, imgHeight, value)
{
	this.ID = ID;
	this.name = name;
	this.type = type;
	this.intBonus = intBonus;
	
	this.imageName = imageName;
	this.imageFile = imageFile;
	
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.value = value;
	
	this.selected = false;
}

function armor(ID, name, type, armorType, AC, armorBonus, imageName, imageFile, imgWidth, imgHeight, value)
{
	this.ID = ID;
	this.name = name;
	this.type = type;
	this.armorType = armorType;
	this.AC = AC;
	this.armorBonus = armorBonus;
	
	this.imageName = imageName;
	this.imageFile = imageFile;
	
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.value = value;
	
	this.selected = false;
}

function boots(ID, name, type, speedBonus, imageName, imageFile, imgWidth, imgHeight, value)
{
	this.ID = ID;
	this.name = name;
	this.type = type;
	this.speedBonus = speedBonus;
	
	this.imageName = imageName;
	this.imageFile = imageFile;
	
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.value = value;
	
	this.selected = false;
}

function shield(ID, name, type, AC, armorBonus,  imageName, imageFile, imgWidth, imgHeight, value)
{
	this.ID = ID;
	this.name = name;
	this.type = type;
	this.AC = AC;
	this.armorBonus = armorBonus;
	
	this.imageName = imageName;
	this.imageFile = imageFile;
	
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.value = value;
	
	this.selected = false;
}

function miscellaneousObject(ID, name, imageName, type, imageFile, imgWidth, imgHeight, params, value)
{
	this.ID = ID;
	this.name = name;
	this.type = type;
	this.imageName = imageName;
	this.imageFile = imageFile;
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.params = params;
	this.value = value;
}

// incantesimi, cosa difficile
function spell(ID, name, description, level, range, targetType, effectType, effectAreaX, effectAreaY,  damageDice, damageDiceNumber, damageBonus, tsType, tsNumber, imageName, imageFile, imgWidth, imgHeight)
{
	this.ID = ID;
	this.name = name;
	this.description = description;
	this.level = level;
	this.range = range;
	this.targetType = targetType;
	this.effectType = effectType;
	this.effectAreaX = effectAreaX;
	this.effectAreaY = effectAreaY;
	this.damageDice = damageDice;
	this.damageDiceNumber = damageDiceNumber;
	this.damageBonus = damageBonus;
	this.tsType = tsType;
	this.imageName = imageName;
	this.imageFile = imageFile;
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.used = false;
	
	this.damage = damage;
	
	function damage()
	{
		var weaponDamage = 0;
		
		for(var i = 0; i < damageDiceNumber; i++)
		{
			if(this.damageDice  == 12)
				weaponDamage = weaponDamage + rollD12();
			if(this.damageDice  == 10)
				weaponDamage = weaponDamage + rollD10();
			if(this.damageDice  == 8)
				weaponDamage = weaponDamage + rollD8();
			if(this.damageDice  == 6)
				weaponDamage = weaponDamage + rollD6();
			if(this.damageDice  == 4)
				weaponDamage = weaponDamage + rollD4();
		}
		
		weaponDamage = weaponDamage + this.damageBonus;
		
		return weaponDamage;
	}
}

// forse da spostare
function actionTrigger(action, actionDescription, addToDescription, notActiveAddToDescription, triggerObject, targetObject, conclusive, easy, objectNeeded, parameters, time)
{
	this.action= action;
	this.actionDescription = actionDescription;
	this.addToDescription = addToDescription;
	this.notActiveAddToDescription = notActiveAddToDescription;
	this.triggerObject = triggerObject;
	this.targetObject = targetObject;
	this.conclusive = conclusive;
	this.easy = easy;
	this.objectNeeded = objectNeeded;
	this.parameters = parameters;
	this.time = time;
}

function AIBehaviour(active, behaviourStyle, waypointList)
{
	this.active = active;
	this.behaviourStyle = behaviourStyle;
	this.waypointList = waypointList;
	this.seenEnemies = new Array();
}

function timedEvent(action, parameter, actionRound)
{
	this.action = action;
	this.parameter = parameter;
	this.actionRound = actionRound;
}

function gameOverSituation(result, character, situation, position)
{
	this.result = result;
	this.character = character;
	this.situation = situation;
	this.position = position;
}

function teamRelation(team, attitude)
{
	this.team = team;
	this.attitude = attitude;
	
}

function talk(id, phrase, teamAttitude, levelState, actionDone, level, levelID, effect, answer)
{
	this.id = id;
	this.phrase = phrase;
	this.teamAttitude = teamAttitude;
	this.levelState = levelState;
	this.actionDone = actionDone;
	this.level = level;
	this.levelID = levelID;
	this.effect = effect;
	this.answer = answer;
}

function attitudeChange(action, team, targetTeam, talkActionId, levelState, currentAttitude, newAttitude, answerId, pickUpObjectId)
{
	this.action = action;
	this.team = team;
	this.targetTeam = targetTeam;
	this.talkActionId = talkActionId;
	this.levelState = levelState;
	this.currentAttitude = currentAttitude;
	this.newAttitude = newAttitude;
	this.answerId = answerId;
	this.pickUpObjectId = pickUpObjectId;
}

// da spostare
function unarmedDamage()
{
	return 1;
} 