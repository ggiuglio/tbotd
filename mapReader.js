function loadLevel(level) 
{
	loadLevelDescription(level);
	equipment = loadEquipment(level);
	var spells = loadSpells(level);
	heroes = loadLevelHeroes(level);
	
	for (var i = 0; i < heroes.length; i++)
	{
		loadPlayerEquipments(heroes[i], equipment)
	}
	
	stages = loadStages(level, equipment);

    // TODO change this to change start stage in level
	selectStage(stages[0].id, 'start');
	gameOverSituations.push(new gameOverSituation("loose", heroes[0], "dead", null));
}

// JSON readers
function loadEquipment(level)
{
	if (level == 'laFugaDiTzel')
	{
		fistSprite = createWeaponSprite('fist', "img/obj/fist.png");
		var equip = new Array();
		
		equip["spada1"] = new weapon ("spada1", "spada", "weapon", "melee", "one/twoHands", "heavyBlade", "medium", 8, 1, 0, 0, createWeaponSprite('sword', "img/obj/longsword.png"), null, "img/obj/longsword.png", 50, 50); 
		equip["spada2"] = new weapon ("spada2", "spada", "weapon", "melee", "one/twoHands", "heavyBlade", "medium", 8, 1, 0, 0, createWeaponSprite('sword', "img/obj/longsword.png"), null, "img/obj/longsword.png", 50, 50); 
		equip["spada3"] = new weapon ("spada3", "spada", "weapon", "melee", "one/twoHands", "heavyBlade", "medium", 8, 1, 0, 0, createWeaponSprite('sword', "img/obj/longsword.png"), null, "img/obj/longsword.png", 50, 50); 
		equip["spada4"] = new weapon ("spada3", "spada", "weapon", "melee", "one/twoHands", "heavyBlade", "medium", 8, 1, 0, 0, createWeaponSprite('sword', "img/obj/longsword.png"), null, "img/obj/longsword.png", 50, 50); 
		equip["spada5"] = new weapon ("spada3", "spada", "weapon", "melee", "one/twoHands", "heavyBlade", "medium", 8, 1, 0, 0, createWeaponSprite('sword', "img/obj/longsword.png"), null, "img/obj/longsword.png", 50, 50); 
		equip["spada6"] = new weapon ("spada3", "spada", "weapon", "melee", "one/twoHands", "heavyBlade", "medium", 8, 1, 0, 0, createWeaponSprite('sword', "img/obj/longsword.png"), null, "img/obj/longsword.png", 50, 50); 
		equip["bow"] =    new weapon("bow", "long bow", "weapon", "ranged", "twoHands", "longBow", "medium", 8, 1, 0, 0, null, createWeaponSprite('arrow', "img/obj/arrow_sprite.png"), "img/obj/bow.jpg", 50, 50);
		
		equip["sciabolaTzel"] = new weapon ("sciabolaTzel", "Sciabola perfetta", "weapon", "melee", "one/twoHands", "heavyBlade", "medium", 8, 1, 1, 0, createWeaponSprite('sabre', "img/obj/sabre.png"), null, "img/obj/sabre.png", 50, 50, 50); 
		equip["ascia"] = new weapon ("asciaN", "ascia nanica", "weapon", "melee", "one/twoHands", "axe", "medium", 8, 1, 0, 0, createWeaponSprite('axe', "img/obj/battle_axe.png"), null, "img/obj/battle_axe.png", 50, 50); 
		equip["amuletOfProtection"]  = new amulet ("amuletProtection", "Amulet of protection", "amulet", 1, "amuleto", "img/obj/pendant.png", 50, 50);
		
		equip["elegantHat"] = new helm ("elegantHat", "Cappello elegante", "helm", 0, "hat", "img/obj/hat.png", 50, 50); 
		equip["leatherArmor"] = new armor ("leatherArmor", "Armatura di cuoio", "armor", "light", 2, 0, "leatherArmor", "img/obj/leatherArmor.png", 50, 88); 
		
		equip["kammart"]  = new miscellaneousObject("kammart", "bustina di kammarth", "kammarth", "misc", "img/obj/kammarth.png", 50, 50, 100);
		equip["mop"]  = new miscellaneousObject("mop", "Mocio vileda", "mop", "misc", "img/obj/mop.png", 50, 50);
		equip["bucket"]  = new miscellaneousObject("bucket", "Secchio", "bucket", "misc", "img/obj/bucket.png", 50, 50);
		equip["maidDress"]  = new miscellaneousObject("maidDress", "Vesito da cameriera", "maidDress", "misc", "img/obj/grembiule.png", 50, 50);
		equip["gold"]  = new miscellaneousObject("gold", "Monete d'oro", "gold", "gold", null, 50, 50, [237], 237);
		equip["ticket"] = new miscellaneousObject("ticket", "Biglietto della diligenza", "ticket", "misc", "img/obj/ticket.png", 50, 50);
		
		for (var key in equip) 
		{
			loadInventoryStrings(equip[key], lang);	
		}
	}

	if (level == 'testLevel')
	{
	    fistSprite = createWeaponSprite('fist', "img/obj/fist.png");
	    var equip = new Array();

	    equip["sciabolaTzel"] = new weapon("sciabolaTzel", "Sciabola perfetta", "weapon", "melee", "one/twoHands", "heavyBlade", "medium", 8, 1, 1, 0, createWeaponSprite('sabre', "img/obj/sabre.png"), null, "img/obj/sabre.png", 50, 50);
	    equip["ascia"] = new weapon("asciaN", "ascia nanica", "weapon", "melee", "one/twoHands", "axe", "medium", 8, 1, 0, 0, createWeaponSprite('axe', "img/obj/battle_axe.png"), null, "img/obj/battle_axe.png", 50, 50);
	    equip["bow"] = new weapon("bow", "long bow", "weapon", "ranged", "twoHands", "longBow", "medium", 8, 1, 0, 0, null, createWeaponSprite('arrow', "img/obj/arrow_sprite.png"), "img/obj/bow.jpg", 50, 50);

	    for (var key in equip) {
	        loadInventoryStrings(equip[key], lang);
	    }
	}
	
	return equip;
}

function createWeaponSprite(name, imgPath) 
{
	var sprite = new Object();
	sprite.name = name;
	sprite.type = "weapon";
	sprite.radius = 70.71;
	sprite.size = 50;
	sprite.posX = 1000;
	sprite.posY = 1000;
	sprite.img = imgPath;
	sprite.image = new createjs.Bitmap(sprite.img);
	sprite.image.x = 950,
	sprite.image.y = 950,
	sprite.image.regX = -25;
	sprite.image.regY = 25;
	sprite.scale = 1;	
	
	return sprite
}

function loadSpells(level)
{
	var spells = new Array();
	if (level == 1)
	{
		spells["magicMissile"] = new spell ("magicMissile", "Dardo incantato", "E' un dardo incantato", 1, 10, "character", "damage", null, null, 4, 1, 1, "no", 0, "magicMissile", "img/spells/magicMissile.png", 60, 60);	
		spells["burningHands"] = new spell ("burningHands", "Mani brucianti", "Il caro vecchio mani bruciant", 2, 3, "wave", "damage", 5, 3, 6, 3, 3, "reflex", 0, "burningHands", "img/spells/burningHands.png", 60, 60); 
		spells["sleep"] = new spell ("sleep", "Sonno", "Il temibile sonno", 1, 6, "character", "sleep", null, null, 4, 1, 0, "will", 0, "magicMissile", "img/spells/zzz.png", 60, 60); 
		spells["fireBall"] = new spell ("fireBall", "Palla di fuoco", "La palla di fuoco, cha altro dire?", 3, 10, "explosion", "damage", 3, 3, 6, 3, 3, "reflex", 0, "fireBall", "img/spells/fireBall.png", 60, 60); 
	}
	return spells;
}

function loadSpellSprites()
{
	spellSprites[0] = new Object();
	spellSprites[0].name = "magicMissile";
	spellSprites[0].type = "spell";
	spellSprites[0].radius = 70.71;
	spellSprites[0].size = 50;
	spellSprites[0].posX = 1000;
	spellSprites[0].posY = 1000;
	spellSprites[0].img = "img/spells/magicMissile_sprite.png";
	spellSprites[0].image = new createjs.Bitmap(spellSprites[0].img);
	spellSprites[0].image.x = 950,
	spellSprites[0].image.y = 950,
	spellSprites[0].image.regX = -25;
	spellSprites[0].image.regY = 25;
	spellSprites[0].image.scalaX = 1;
	spellSprites[0].image.scalaY = 1;
	
	spellSprites[1] = new Object();
	spellSprites[1].name = "burningHands";
	spellSprites[1].type = "spell";
	spellSprites[1].radius = 70.71;
	spellSprites[1].size = 50;
	spellSprites[1].posX = 1000;
	spellSprites[1].posY = 1000;
	spellSprites[1].img = "img/spells/burningHands_sprite.png";
	spellSprites[1].image = new createjs.Bitmap(spellSprites[1].img);
	spellSprites[1].image.x = 950,
	spellSprites[1].image.y = 950,
	spellSprites[1].image.regX = -25;
	spellSprites[1].image.regY = 125;
	spellSprites[1].image.scalaX = 1;
	spellSprites[1].image.scalaY = 1;
	
	var ss = new createjs.SpriteSheet({ "animations":{
			"boom":[0, 24]},
			"images":["img/spells/explosion.png"],
			"frames":{
				"regX":0,
				"regY":0,
				"height":65,
				"width":65,
				"count":25
			}
		});
	
	spellSprites[1].animation = new createjs.Sprite(ss, "boom");
	spellSprites[1].animation.x = 200;
	spellSprites[1].animation.y = 200;
	spellSprites[1].animation.regX = 32;
	spellSprites[1].animation.regY = 32;
	spellSprites[1].animation.speed = 1;
	spellSprites[1].animation.scalaX = 4;
	spellSprites[1].animation.scalaY = 4;
	spellSprites[1].animation.visible = false;
	spellSprites[1].animation.stop();
	
	spellSprites[2] = new Object();
	spellSprites[2].name = "fireBall";
	spellSprites[2].type = "spell";
	spellSprites[2].radius = 70.71;
	spellSprites[2].size = 50;
	spellSprites[2].posX = 1000;
	spellSprites[2].posY = 1000;
	spellSprites[2].img = "img/spells/fireBall.png";
	spellSprites[2].image = new createjs.Bitmap(spellSprites[2].img);
	spellSprites[2].image.x = 950,
	spellSprites[2].image.y = 950,
	spellSprites[2].image.regX = 50;
	spellSprites[2].image.regY = 50;
	spellSprites[2].image.scalaX = 1;
	spellSprites[2].image.scalaY = 1;
		
	var ss = new createjs.SpriteSheet({ "animations":{
			"boom":[0, 12]},
			"images":["img/spells/explosion2.png"],
			"frames":{
				"regX":0,
				"regY":0,
				"height":128,
				"width":256,
				"count":12
			}
		});
	
	spellSprites[2].animation = new createjs.Sprite(ss, "boom");
	spellSprites[2].animation.x = 200;
	spellSprites[2].animation.y = 200;
	spellSprites[2].animation.regX = 128;
	spellSprites[2].animation.regY = 64;
	spellSprites[2].animation.speed = 1;
	spellSprites[2].animation.scalaX = 3;
	spellSprites[2].animation.scalaY = 5;
	spellSprites[2].animation.visible = false;
	spellSprites[2].animation.stop();
}

function loadLevelHeroes(level)
{
	var heroes = []; // replace with JSON
	
	var imgDeath = "img/level1/death.png";
	
	if (level == 'laFugaDiTzel')
	{
		var tzel = new Object();
		tzel.id = 'Tzel';    //works as id it must be unique
		tzel.type = "PC";
		tzel.size = 25;
		tzel.posX = 1050;
		tzel.posY = 2220;
		tzel.scale = 0.25;
		tzel.img = "img/level1/Tzel.png";
		tzel.image = new createjs.Bitmap(tzel.img);
		tzel.image.zIndex = 10;
		tzel.image.x = tzel.posX - tzel.size;
		tzel.image.y = tzel.posY - tzel.size;
		tzel.image.scaleX = 0.25;
		tzel.image.scaleY = 0.25;
		tzel.deathImage = new createjs.Bitmap(imgDeath);
		tzel.deathImg = imgDeath;
		tzel.deathImage.x = tzel.posX - tzel.size;
		tzel.deathImage.y = tzel.posY - tzel.size;	 
		tzel.deathImage.scaleX  = 0.25;
		tzel.deathImage.scaleY  = 0.25;
		tzel.initiative = Math.floor(Math.random() * (20 - 1) + 1);
	
		var talksDone = new Array();
		talksDone.push(new talk("TzelStart", "Tra se e se: mmm... se non faccio qualcosa alla svelta questi mi mettono una bella cravatta di canapa, ma devo prendere tempo per recuperare la mia sciabola dal cassetto della scrivania... e dovrebbe esserci qualcos'altro di utile in giro.. ", null, "starttzelOfficeState", null, 1, "tzelOffice", null, null));
		
		talksDone.push(new talk("WrongCode", "No, il codice non era questo ", null, null, "wrongCode", 1, "tzelOffice", null, null));
		talksDone.push(new talk("RightCode", "Ahhh certo era questo il codice", null, null, "rightCode", 1, "tzelOffice", null, null));
	 
		var description = "E' un uomo giovane, elegante, azimato, con quell'aria da ti faccio impiccare ma senza animosita', il caro vecchio Tzel";
		
		tzel.character = new character("Tzel", "Tzel Deadsoul" , description, "img/level1/Tzel_big.png", 35.35, 50, 9, 1, 0, 0, 1, 14, 16, 10, 13, 17, 8, 2, 2, 2, 50, 0, false,  null, null, null, talksDone);
		tzel.initiative = Math.floor(Math.random() * (20 - 1) + 1) + tzel.character.dexMod;
		
		tzel.equipmentsID = [];
		tzel.inventory = [];
		
		loadPlayerStrings (tzel, lang);
		heroes.push(tzel);
	}

	if (level == 'testLevel') {
	    var tzel = new Object();
	    tzel.id = 'Tzel';    //works as id it must be unique
	    tzel.type = "PC";
	    tzel.size = 25;
	    tzel.posX = 1050;
	    tzel.posY = 2220;
	    tzel.scale = 0.25;
	    tzel.img = "img/testLevel/Tzel.png";
	    tzel.image = new createjs.Bitmap(tzel.img);
	    tzel.image.zIndex = 10;
	    tzel.image.x = tzel.posX - tzel.size;
	    tzel.image.y = tzel.posY - tzel.size;
	    tzel.image.scaleX = 0.25;
	    tzel.image.scaleY = 0.25;
	    tzel.deathImage = new createjs.Bitmap(imgDeath);
	    tzel.deathImg = imgDeath;
	    tzel.deathImage.x = tzel.posX - tzel.size;
	    tzel.deathImage.y = tzel.posY - tzel.size;
	    tzel.deathImage.scaleX = 0.25;
	    tzel.deathImage.scaleY = 0.25;
	    tzel.initiative = Math.floor(Math.random() * (20 - 1) + 1);

	    var talksDone = new Array();
	    talksDone.push(new talk("TzelStartTest", "Tra se e se: test? che vuol dire test? che dovrei fare?", null, "startState", null, 1, "testLevel", null, null));


	    var description = "E' un uomo giovane, elegante, azimato, con quell'aria da ti faccio impiccare ma senza animosita', il caro vecchio Tzel";

	    tzel.character = new character("Tzel", "Tzel Deadsoul", description, "img/testLevel/Tzel_big.png", 35.35, 50, 9, 1, 0, 0, 1, 14, 16, 10, 13, 17, 8, 2, 2, 2, 30, 0, false, null, null, null, talksDone);
	    tzel.initiative = Math.floor(Math.random() * (20 - 1) + 1) + tzel.character.dexMod;

	    tzel.equipmentsID = [];
	    tzel.inventory = [];

	    loadPlayerStrings(tzel, lang);
	    heroes.push(tzel);

	    var rondell = new Object();
	    rondell.id = 'Rondell';    //works as id it must be unique
	    rondell.type = "PC";
	    rondell.size = 25;
	    rondell.posX = 1050;
	    rondell.posY = 1000;
	    rondell.scale = 0.25;
	    rondell.img = "img/testLevel/Rondell.png";
	    rondell.image = new createjs.Bitmap(rondell.img);
	    rondell.image.zIndex = 10;
	    rondell.image.x = rondell.posX - rondell.size;
	    rondell.image.y = rondell.posY - rondell.size;
	    rondell.image.scaleX = 0.25;
	    rondell.image.scaleY = 0.25;
	    rondell.deathImage = new createjs.Bitmap(imgDeath);
	    rondell.deathImg = imgDeath;
	    rondell.deathImage.x = rondell.posX - rondell.size;
	    rondell.deathImage.y = rondell.posY - rondell.size;
	    rondell.deathImage.scaleX = 0.25;
	    rondell.deathImage.scaleY = 0.25;
	    rondell.initiative = Math.floor(Math.random() * (20 - 1) + 1);

	    var talksDone = new Array();
	    var description = "E' uno gnomo basso (grazie e' uno gnome) brutto e spesso con un agghiacciante pizzetto ossigenato";

	    rondell.character = new character("Rondell", "Rondell lo scuro", description, "img/testLevel/Rondell.png", 35.35, 50, 9, 1, 0, 0, 1, 14, 16, 10, 13, 17, 8, 2, 2, 2, 30, 0, false, null, null, null, talksDone);
	    rondell.initiative = Math.floor(Math.random() * (20 - 1) + 1) + rondell.character.dexMod;

	    rondell.equipmentsID = [];
	    rondell.inventory = [];

	    loadPlayerStrings(rondell, lang);
	    heroes.push(rondell);



	    var goodOrck = new Object();
	    goodOrck.id = 'GoodOrck';    //works as id it must be unique
	    goodOrck.type = "PC";
	    goodOrck.size = 75;
	    goodOrck.posX = 500;
	    goodOrck.posY = 865;
	    goodOrck.scale = 0.75;
	    goodOrck.img = "img/testLevel/stupido_orco.png";
	    goodOrck.image = new createjs.Bitmap(goodOrck.img);
	    goodOrck.image.zIndex = 10;
	    goodOrck.image.x = goodOrck.posX - goodOrck.size;
	    goodOrck.image.y = goodOrck.posY - goodOrck.size;
	    goodOrck.image.scaleX = 0.75;
	    goodOrck.image.scaleY = 0.75;
	    goodOrck.deathImage = new createjs.Bitmap(imgDeath);
	    goodOrck.deathImg = imgDeath;
	    goodOrck.deathImage.x = goodOrck.posX - goodOrck.size;
	    goodOrck.deathImage.y = goodOrck.posY - goodOrck.size;
	    goodOrck.deathImage.scaleX = 0.75;
	    goodOrck.deathImage.scaleY = 0.75;
	    goodOrck.initiative = 2;

	    var talksRecived = new Array();
	    var talksDone = new Array();


	    var description = "E' uno stupido orco";
	    goodOrck.character = new character("Stupido Orco", "StupidOrck", description, "img/testLevel/Ork.png", 106.05, 150, 21, 1, 0, 0, 1, 12, 12, 12, 12, 12, 12, 2, 2, 2, 15, 0, false, null, null, talksRecived, talksDone);


	    goodOrck.equipmentsID = [];
	    goodOrck.inventory = [];
	    heroes.push(goodOrck);
	}

	return heroes;
	
}

function loadTeams(level) // really temp
{
	
}

function loadStages(level, equipments)
{
    var stages = getStages(level);

    for (var i = 0; i < stages.length; i++)
    {
        loadStageMap(stages[i]);
        stages[i].objects = loadStageObjects(stages[i], equipments);
        stages[i].enemies = loadStageEnemies(stages[i], equipments);
        stages[i].walls = loadStageWalls(stages[i]);
    }

	return stages;
}

function loadStageMap(stage)
{
	stage.mapImage = new Object();
	stage.mapImage.type = "background";
	stage.mapImage.posX = 0;
	stage.mapImage.posY = 0;
	stage.mapImage.image = new createjs.Bitmap(stage.imgMap)
	stage.mapImage.image.x = 0;
	stage.mapImage.image.y = 0;
	stage.mapImage.image.regX = 0;
	stage.mapImage.image.regY = 0;	
}

// objects loading

function loadPlayerEquipments(player, equipments)
{
	for (var i = 0; i < player.equipmentsID.length; i++)
	{
		player.character.inventory.push(equipments[player.equipmentsID[i]]);
	}
}

function selectStage(stage, startingLocation)
{
	var selectedStage = {};
	for (var i = 0; i < stages.length; i++)
	{
		if(stages[i].id == stage)
		{
			selectedStage = stages[i];	
		}
	}
	
	mapImage = selectedStage.mapImage;
	
	for (var i = 0; i < selectedStage.startPositions.length; i++)
	{
		if(selectedStage.startPositions[i].id == startingLocation)	
		{
			var position = selectedStage.startPositions[i];
		}	
	}
	
	players = new Array();
	for (var i = 0; i < heroes.length; i++)
	{
	    heroes[i].posX = position.positions[i].x;
	    heroes[i].posY = position.positions[i].y;
		players.push(heroes[i]);	
	}
	
	for (var i = 0; i < selectedStage.enemies.length; i++)
	{
		players.push(selectedStage.enemies[i]);
	}
	
	objects = new Array();
	for (var i = 0; i < selectedStage.objects.length; i++)
	{
		objects.push(selectedStage.objects[i]);
	}
	
	walls = new Array();
	for (var i = 0; i < selectedStage.walls.length; i++)
	{
		walls.push(selectedStage.walls[i]);
	}
	
	teams = loadStageTeams(selectedStage);
	currentStage = selectedStage;
	
	timedEvents = [];
	if (selectedStage.id == "tzelOffice")
	{
		timedEvents[0] = new timedEvent("setLevelState", "timeOver", 3);
		timedEvents[1] = new timedEvent("setLevelState", "onGoing", 2);
	}

	//setZoom(0.7);
	levelState = "start" + currentStage.id + "State";
}