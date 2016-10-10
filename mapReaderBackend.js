function loadLevelDescription(level)
{
	if(level == 'laFugaDiTzel')
	{
		chapterName = "La fuga di Tzel";
		levelDescription = "Tzel lavora come pubblico ministero nelle prigioni di Darkhold ma, a seguito di un repentineo cambiamento politico si ritrova in una brutta situazione, vedendo la concreta possibilita' di passare dall'altro lato della forca decide di cambiare aria al piu' presto. Prima di prendere la diligenza pero' passa in ufficio a recuperare le sue cose e qui si accorge di essersi mosso un po' troppo tardi...";
	
		winDescrption = "Tzel e' riuscito a scappare dai suoi vendicativi colleghi e ora puo' andare a prendere la diligenza che lo portera' le sue candide chiappe in luoghi piu' salubri";
		
		looseDescription1 = "No. L'idea non era quella di lasciare che questi galantuomi mi impiccassero, strano vero?";
		looseDescription2 = "Tzel e' morto e, per quanto possa sembrare strano, non era questo l'obbiettivo del livello 'La fuga di Tzel' se no l'avremmo chiamato 'La morte di Tzel' non ti pare?'";

		loadLevelStrings(level, lang);
		looseDescription.push(new Object({ reason: "dead", description: looseDescription2 }));
		looseDescription.push(new Object({ reason: "surrender", description: looseDescription1 }));
	}

	if (level == "testLevel") {
	    chapterName = "Test level";
	    levelDescription = "E' il livello di test, per testare";

	    winDescrption = "Tzel e Rondel fanno dei test";
	    looseDescription1 = "Perso? si";
	    looseDescription.push(new Object({ reason: "dead", description: looseDescription1 }));
	}
}

function loadStageWalls(stage)
{
	var stageWalls = [];
	if (stage.id == 'tzelOffice')
	{
		var wallLine = [920,	2420,	2000,	2420];
		stageWalls.push(wallLine);
		
		var wallLine = [920,	1880,	1620,	1880];
		stageWalls.push(wallLine);
		
		var wallLine = [1610,	2085,	1655,	2085];
		stageWalls.push(wallLine);
		
		var wallLine = [1610,	2205,	1665,	2205];
		stageWalls.push(wallLine);
		
		//vertical
		var wallLine = [920,	1880,	920,	2420];
		stageWalls.push(wallLine);
		
		var wallLine = [1610,	2205,	1610,	2405];
		stageWalls.push(wallLine);
		var wallLine = [1665,	2205,	1665,	2420];
		stageWalls.push(wallLine);
		
		var wallLine = [1610,	505,	1610,	2085];
		stageWalls.push(wallLine);
		
		var wallLine = [1655,	505,	1655,	1050];
		stageWalls.push(wallLine);
		
		var wallLine = [1655,	1175,	1655,	1520];
		stageWalls.push(wallLine);
		
		var wallLine = [1655,	1640,	1655,	2085];
		stageWalls.push(wallLine);
		
		var wallLine = [1960,	505,	1960,	1050];
		stageWalls.push(wallLine);
		
		var wallLine = [1960,	1190,	1960,	1510];
		stageWalls.push(wallLine);
		
		var wallLine = [1960,	1640,	1960,	2100];
		stageWalls.push(wallLine);
		
		var wallLine = [1950,	2205,	1950,	2420];
		stageWalls.push(wallLine);
		
		var wallLine = [1990,	505,	1990,	2420];
		stageWalls.push(wallLine);
	
	}	
	if (stage.id == 'prison') 
	{
		var wallLine = [1005,	2070,	2410,	2070];
		stageWalls.push(wallLine);
		
		var wallLine = [2410,	2070,	2410,	2280];
		stageWalls.push(wallLine);
		
		var wallLine = [2410,	2480,	2665,	2480];
		stageWalls.push(wallLine);
		
		var wallLine = [2665,	1800,	2665,	2280];
		stageWalls.push(wallLine);
		
		var wallLine = [2280,	1800,	2665,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [2280,	1410,	2280,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [2025,	1410,	2280,	1410];
		stageWalls.push(wallLine);
		
		var wallLine = [2025,	1410,	2025,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [2000,	1800,	2025,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [2000,	1410,	2000,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [1765,	1410,	2000,	1410];
		stageWalls.push(wallLine);
		
		var wallLine = [1765,	1410,	1765,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [1740,	1800,	1765,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [1740,	1410,	1740,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [1515,	1410,	1740,	1410];
		stageWalls.push(wallLine);
		
		var wallLine = [1515,	1410,	1515,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [1255,	1800,	1515,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [1255,	1640,	1255,	1800];
		stageWalls.push(wallLine);
		
		var wallLine = [1255,	1640,	1280,	1640];
		stageWalls.push(wallLine);
		
		var wallLine = [1280,	1640,	1280,	1775];
		stageWalls.push(wallLine);
		
		var wallLine = [1280,	1775,	1490,	1775];
		stageWalls.push(wallLine);
		
		var wallLine = [1490,	1410,	1490,	1775];
		stageWalls.push(wallLine);
		
		var wallLine = [1280,	1410,	1490,	1410];
		stageWalls.push(wallLine);
		
		var wallLine = [1280,	1410,	1280,	1550];
		stageWalls.push(wallLine);
		
		var wallLine = [1255,	1550,	1280,	1550];
		stageWalls.push(wallLine);
		
		var wallLine = [1255,	1140,	1255,	1550];
		stageWalls.push(wallLine);
		
		var wallLine = [1255,	1140,	1285,	1140];
		stageWalls.push(wallLine);
		
		var wallLine = [1285,	1140,	1285,	1375];
		stageWalls.push(wallLine);
	
		var wallLine = [1285,	1375,	1610,	1375]; 
		stageWalls.push(wallLine);
		
		var wallLine = [1610,	1010,	1610,	1375];
		stageWalls.push(wallLine);
		
		var wallLine = [1255,	1010,	1610,	1010];
		stageWalls.push(wallLine);
		
		var wallLine = [1255,	745,	1255,	1010]; 
		stageWalls.push(wallLine);
		
		var wallLine = [745,	745,	1255,	745];
		stageWalls.push(wallLine);
		
		var wallLine = [745,	615,	745,	745];
		stageWalls.push(wallLine);
		
		var wallLine = [365,	615,	745,	615];
		stageWalls.push(wallLine);
		
		var wallLine = [365,	615,	365,	810];
		stageWalls.push(wallLine);
		
		var wallLine = [365,	955,	365,	1135];
		stageWalls.push(wallLine);
		
		var wallLine = [365,	1135,	745,	1135];
		stageWalls.push(wallLine);
	
		var wallLine = [745,	1005,	745,	1135]; 
		stageWalls.push(wallLine);
		
		var wallLine = [745,	1005,	1005,	1005];
		stageWalls.push(wallLine);
		
		var wallLine = [1005,	1127,	1005,	2070];
		stageWalls.push(wallLine);
		
		var wallLine = [1005,	1005,	1005,	1054];
		stageWalls.push(wallLine);
	}
	
	return stageWalls;
}

function loadStageEnemies(stage, equipments)
{
	var enemies = [];
	var imgDeath = "img/level1/death.png";
	
	if (stage.id == 'tzelOffice')
	{
		GuardCaptain = new Object();
		GuardCaptain.id = 'GuardCaptain';    //works as id it must be unique
		GuardCaptain.type = "NPC";
		GuardCaptain.size = 25;
		GuardCaptain.posX = 1250;
		GuardCaptain.posY = 2150;
		GuardCaptain.scale = 0.25;
		GuardCaptain.img = "img/level1/guardCaptain.png";
		GuardCaptain.image = new createjs.Bitmap(GuardCaptain.img);
		GuardCaptain.image.zIndex = 10;
		GuardCaptain.image.x = GuardCaptain.posX - GuardCaptain.size;
		GuardCaptain.image.y = GuardCaptain.posY - GuardCaptain.size;
		GuardCaptain.image.scaleX = 0.25;
		GuardCaptain.image.scaleY = 0.25;
		GuardCaptain.deathImage = new createjs.Bitmap(imgDeath);
		GuardCaptain.deathImg = imgDeath;
		GuardCaptain.deathImage.x = GuardCaptain.posX - GuardCaptain.size;
		GuardCaptain.deathImage.y = GuardCaptain.posY - GuardCaptain.size;	 
		GuardCaptain.deathImage.scaleX  = 0.25;
		GuardCaptain.deathImage.scaleY  = 0.25;
		GuardCaptain.initiative = Math.floor(Math.random() * (20 - 1) + 1);
		GuardCaptain.initiative = 24;
		GuardCaptain.xp = 70;
	
		var talksRecived = new Array();
		talksRecived.push(new talk("TzelSurrender"));
		talksRecived.push(new talk("TzelAskTime"));
		talksRecived.push(new talk("TzelInsult"));
		
		var talksDone= new Array();
		talksDone.push(new talk("GuardGiveTime"));
		talksDone.push(new talk("GuardDontMove"));
		talksDone.push(new talk("GuarStart"));
		talksDone.push(new talk("GuarInsultAnswer"));
		talksDone.push(new talk("GuarAttackAnswer"));
		talksDone.push(new talk("GuardSwordTaken"));
		talksDone.push(new talk("GuardSwordTimeOver"));
		
	
		GuardCaptain.character = new character("Capitano", "Capitano delle guardie", null, "", 35.35, 50, 9, 1, 0, 0, 1, 14, 14, 14, 14, 14, 14, 2, 2, 2, 20, 0, false,  new AIBehaviour(true, "standard", null), null, talksRecived, talksDone);
	
		Guard = new Object();
		Guard.id = 'Guard';    //works as id it must be unique
		Guard.type = "NPC";
		Guard.size = 25;
		Guard.posX = 1550;
		Guard.posY = 2155;
		Guard.scale = 0.25;
		Guard.img = "img/level1/guard.png";
		Guard.image = new createjs.Bitmap(Guard.img);
		Guard.image.zIndex = 10;
		Guard.image.x = Guard.posX - Guard.size;
		Guard.image.y = Guard.posY - Guard.size;
		Guard.image.scaleX = 0.25;
		Guard.image.scaleY = 0.25;
		Guard.deathImage = new createjs.Bitmap(imgDeath);
		Guard.deathImg = imgDeath;
		Guard.deathImage.x = Guard.posX - Guard.size;
		Guard.deathImage.y = Guard.posY - Guard.size;	 
		Guard.deathImage.scaleX  = 0.25;
		Guard.deathImage.scaleY  = 0.25;
		Guard.initiative = 24;
		Guard.xp = 50;
	
		var talksRecived = new Array();
		talksRecived.push(new talk("TzelQuestionNeutral", "Hey guardia dove mi portate?", "neutral", null, null, null, null, "answer", "GuardAnswer"));
		talksRecived.push(new talk("TzelQuestionFriend", "Hey guardia dove mi portate?", "friend", null, null, null, null, "answer", "GuardAnswer"));
		
		var talksDone= new Array();
		talksDone.push(new talk("GuardAnswer", "Io non so nulla, parlane col capitano", null, null, null, null, null, null, null));
		
		var description = "E' una guardia, niente di particolare ma pu sempre una guardia. Ha una spada e piu' o meno sa anche come usarla";
		Guard.character = new character("Guardia", "Guardia", description, "", 35.35, 50, 9, 1, 0, 0, 1, 11, 11, 11, 11, 11, 11, 2, 2, 2, 15, 0, false, 
										new AIBehaviour(true, "standard", null), null, talksRecived, talksDone		);

		GuardCaptain.character.inventory.push(equipment["ascia"]);
		GuardCaptain.character.equipBothHands(equipment["ascia"]);
		GuardCaptain.character.selectedHand = "both";	
		GuardCaptain.character.selectedWeapon = GuardCaptain.character.rightHand;	
			
		Guard.character.inventory.push(equipment["spada1"]);
		Guard.character.equipRightHand(equipment["spada1"]);
		Guard.character.selectedHand = "right";	
		Guard.character.selectedWeapon = Guard.character.rightHand;	
		
		
		enemies.push(GuardCaptain);
		enemies.push(Guard);
	}
	if (stage.id == 'prison') 
	{
		var Guard1 = new Object();
		Guard1.id = 'Guard1';    //works as id it must be unique
		Guard1.type = "NPC";
		Guard1.size = 25;
		Guard1.posX = 500;
		Guard1.posY = 765;
		Guard1.scale = 0.25;
		Guard1.img = "img/level2/guard.png";
		Guard1.image = new createjs.Bitmap(Guard1.img);
		Guard1.image.zIndex = 10;
		Guard1.image.x = Guard1.posX - Guard1.size;
		Guard1.image.y = Guard1.posY - Guard1.size;
		Guard1.image.scaleX = 0.25;
		Guard1.image.scaleY = 0.25;
		Guard1.deathImage = new createjs.Bitmap(imgDeath);
		Guard1.deathImg = imgDeath;
		Guard1.deathImage.x = Guard1.posX - Guard1.size;
		Guard1.deathImage.y = Guard1.posY - Guard1.size;	 
		Guard1.deathImage.scaleX  = 0.25;
		Guard1.deathImage.scaleY  = 0.25;
		Guard1.initiative = 24;
		Guard1.xp = 50;
		
		var talksRecived = new Array();
		talksRecived.push(new talk("TzelQuestionNeutral", "Hey guardia dove mi portate?", "neutral", null, null, null, null, "answer", "GuardAnswer"));
		talksRecived.push(new talk("TzelQuestionFriend", "Hey guardia dove mi portate?", "friend", null, null, null, null, "answer", "GuardAnswer"));
		
		var talksDone= new Array();
		talksDone.push(new talk("GuardAnswer", "Io non so nulla, parlene col capitano", null, null, null, null, null, null, null));
		
		var description = "E' una guardia, niente di particolare ma pur sempre una guardia. Ha una spada e piu' o meno sa anche come usarla";
		Guard1.character = new character("Guardia 1", "Guardia", description, "", 35.35, 50, 9, 1, 0, 0, 1, 10, 10, 10, 10, 10, 10, 2, 2, 2, 15, 0, false,  
										 new AIBehaviour(true, "standard", null), null, talksRecived, talksDone);
	
		var Guard2 = new Object();
		Guard2.id = 'Guard2';    //works as id it must be unique
		Guard2.type = "NPC";
		Guard2.size = 25;
		Guard2.posX = 500;
		Guard2.posY = 865;
		Guard2.scale = 0.25;
		Guard2.img = "img/level2/guard.png";
		Guard2.image = new createjs.Bitmap(Guard1.img);
		Guard2.image.zIndex = 10;
		Guard2.image.x = Guard2.posX - Guard2.size;
		Guard2.image.y = Guard2.posY - Guard2.size;
		Guard2.image.scaleX = 0.25;
		Guard2.image.scaleY = 0.25;
		Guard2.deathImage = new createjs.Bitmap(imgDeath);
		Guard2.deathImg = imgDeath;
		Guard2.deathImage.x = Guard2.posX - Guard2.size;
		Guard2.deathImage.y = Guard2.posY - Guard2.size;	 
		Guard2.deathImage.scaleX  = 0.25;
		Guard2.deathImage.scaleY  = 0.25;
		Guard2.initiative = 24;
		Guard2.xp = 50;
	
		var talksRecived = new Array();
		talksRecived.push(new talk("TzelQuestionNeutral", "Hey guardia dove mi portate?", "neutral", null, null, null, null, "answer", "GuardAnswer"));
		talksRecived.push(new talk("TzelQuestionFriend", "Hey guardia dove mi portate?", "friend", null, null, null, null, "answer", "GuardAnswer"));
		
		var talksDone= new Array();
		talksDone.push(new talk("GuardAnswer", "Io non so nulla, parlene col capitano", null, null, null, null, null, null, null));
		
		var description = "E' una guardia, niente di particolare ma pur sempre una guardia. Ha una spada e piu' o meno sa anche come usarla";
		Guard2.character = new character("Guardia 2", "Guardia", description, "", 35.35, 50, 9, 1, 0, 0, 1, 12, 12, 12, 12, 12, 12, 2, 2, 2, 15, 0, false,
										 new AIBehaviour(true, "standard", null), null, talksRecived, talksDone);
	
		var Guard3 = new Object();
		Guard3.id = 'Guard3';    //works as id it must be unique
		Guard3.type = "NPC";
		Guard3.size = 25;
		Guard3.posX = 500;
		Guard3.posY = 965;
		Guard3.scale = 0.25;
		Guard3.img = "img/level2/guard.png";
		Guard3.image = new createjs.Bitmap(Guard2.img);
		Guard3.image.zIndex = 10;
		Guard3.image.x = Guard3.posX - Guard3.size;
		Guard3.image.y = Guard3.posY - Guard3.size;
		Guard3.image.scaleX = 0.25;
		Guard3.image.scaleY = 0.25;
		Guard3.deathImage = new createjs.Bitmap(imgDeath);
		Guard3.deathImg = imgDeath;
		Guard3.deathImage.x = Guard3.posX - Guard3.size;
		Guard3.deathImage.y = Guard3.posY - Guard3.size;	 
		Guard3.deathImage.scaleX  = 0.25;
		Guard3.deathImage.scaleY  = 0.25;
		Guard3.initiative = 24;
		Guard3.xp = 50;
		
		var talksRecived = new Array();
		talksRecived.push(new talk("TzelQuestionNeutral", "Hey guardia dove mi portate?", "neutral", null, null, null, null, "answer", "GuardAnswer"));
		talksRecived.push(new talk("TzelQuestionFriend", "Hey guardia dove mi portate?", "friend", null, null, null, null, "answer", "GuardAnswer"));
		
		var talksDone= new Array();
		talksDone.push(new talk("GuardAnswer", "Io non so nulla, parlene col capitano", null, null, null, null, null, null, null));
		
		var description = "E' una guardia, niente di particolare ma pu sempre una guardia. Ha una spada e piu' o meno sa anche come usarla";
		Guard3.character = new character("Guardia 3", "Guardia", description, "", 35.35, 50, 9, 1, 0, 0, 1, 9, 9, 9, 9, 12, 12, 2, 2, 2, 15, 0, false,
										 new AIBehaviour(true, "standard", null), null, talksRecived, talksDone);
	
		var Guard4 = new Object();
		Guard4.id = 'Guard4';    //works as id it must be unique
		Guard4.type = "NPC";
		Guard4.size = 25;
		Guard4.posX = 1050;
		Guard4.posY = 1200;
		Guard4.scale = 0.25;
		Guard4.img = "img/level2/guard.png";
		Guard4.image = new createjs.Bitmap(Guard2.img);
		Guard4.image.zIndex = 10;
		Guard4.image.x = Guard4.posX - Guard4.size;
		Guard4.image.y = Guard4.posY - Guard4.size;
		Guard4.image.scaleX = 0.25;
		Guard4.image.scaleY = 0.25;
		Guard4.deathImage = new createjs.Bitmap(imgDeath);
		Guard4.deathImg = imgDeath;
		Guard4.deathImage.x = Guard4.posX - Guard4.size;
		Guard4.deathImage.y = Guard4.posY - Guard4.size;	 
		Guard4.deathImage.scaleX  = 0.25;
		Guard4.deathImage.scaleY  = 0.25;
		Guard4.initiative = 24;
		Guard4.xp = 50;
	
		var talksRecived = new Array();
		talksRecived.push(new talk("TzelQuestionNeutral", "Hey guardia dove mi portate?", "neutral", null, null, null, null, "answer", "GuardAnswer"));
		talksRecived.push(new talk("TzelQuestionFriend", "Hey guardia dove mi portate?", "friend", null, null, null, null, "answer", "GuardAnswer"));
		
		var talksDone= new Array();
		talksDone.push(new talk("GuardAnswer", "Io non so nulla, parlene col capitano", null, null, null, null, null, null, null));
		
		var description = "E' una guardia, niente di particolare ma pu sempre una guardia. Ha una spada e piu' o meno sa anche come usarla";
		Guard4.character = new character("Guardia 4", "Guardia", description, "", 35.35, 50, 9, 1, 0, 0, 1, 10, 10, 12, 12, 12, 12, 2, 2, 2, 15, 0, false,
										 new AIBehaviour(true, "standard", null), null, talksRecived, talksDone);
	
		var Guard5 = new Object();
		Guard5.id = 'Guard5';    //works as id it must be unique
		Guard5.type = "NPC";
		Guard5.size = 25;
		Guard5.posX = 1190;
		Guard5.posY = 1200;
		Guard5.scale = 0.25;
		Guard5.img = "img/level2/guard.png";
		Guard5.image = new createjs.Bitmap(Guard5.img);
		Guard5.image.zIndex = 10;
		Guard5.image.x = Guard5.posX - Guard5.size;
		Guard5.image.y = Guard5.posY - Guard5.size;
		Guard5.image.scaleX = 0.25;
		Guard5.image.scaleY = 0.25;
		Guard5.deathImage = new createjs.Bitmap(imgDeath);
		Guard5.deathImg = imgDeath;
		Guard5.deathImage.x = Guard5.posX - Guard5.size;
		Guard5.deathImage.y = Guard5.posY - Guard5.size;	 
		Guard5.deathImage.scaleX  = 0.25;
		Guard5.deathImage.scaleY  = 0.25;
		Guard5.initiative = 24;
		Guard5.xp = 50;
		
		var talksRecived = new Array();
		talksRecived.push(new talk("TzelQuestionNeutral", "Hey guardia dove mi portate?", "neutral", null, null, null, null, "answer", "GuardAnswer"));
		talksRecived.push(new talk("TzelQuestionFriend", "Hey guardia dove mi portate?", "friend", null, null, null, null, "answer", "GuardAnswer"));
		
		var talksDone= new Array();
		talksDone.push(new talk("GuardAnswer", "Io non so nulla, parlene col capitano", null, null, null, null, null, null, null));
		
		var description = "E' una guardia, niente di particolare ma pu sempre una guardia. Ha una spada e piu' o meno sa anche come usarla";
		Guard5.character = new character("Guardia 5", "Guardia", description, "", 35.35, 50, 9, 1, 0, 0, 1, 12, 12, 12, 12, 12, 12, 2, 2, 2, 15, 0, false,  
										 new AIBehaviour(true, "standard", null), null, talksRecived,    talksDone);
	
		
		var Prisoner1 = new Object();
		Prisoner1.id = 'Prisoner1';    //works as id it must be unique
		Prisoner1.type = "NPC";
		Prisoner1.size = 25;
		Prisoner1.posX = 2200;
		Prisoner1.posY = 1690;
		Prisoner1.scale = 0.25;
		Prisoner1.img = "img/level2/prisoner.png";
		Prisoner1.image = new createjs.Bitmap(Prisoner1.img);
		Prisoner1.image.zIndex = 10;
		Prisoner1.image.x = Prisoner1.posX - Prisoner1.size;
		Prisoner1.image.y = Prisoner1.posY - Prisoner1.size;
		Prisoner1.image.scaleX = 0.25;
		Prisoner1.image.scaleY = 0.25;
		Prisoner1.deathImage = new createjs.Bitmap(imgDeath);
		Prisoner1.deathImg = imgDeath;
		Prisoner1.deathImage.x = Prisoner1.posX - Prisoner1.size;
		Prisoner1.deathImage.y = Prisoner1.posY - Prisoner1.size;	 
		Prisoner1.deathImage.scaleX  = 0.25;
		Prisoner1.deathImage.scaleY  = 0.25;
		Prisoner1.initiative = 10;
		
		var wPonits = new Array();
		var wp = [1315, 1860];
		wPonits.push(wp);
		wp = [1066, 1343];
		wPonits.push(wp);
		wp = [507, 928];
		wPonits.push(wp);
	
		
		var description = "E' un poveraccio che e' ospite involontario delle prigioni, per quanto ne so potrei pure avercelo messo io, non si presenta molto bene ma dopo qualche mese in questo posto, o anche dopo qualche giorno, lo posso anche capire";
		Prisoner1.character = new character("Prigioniero 1", "Prigioniero", description, "", 35.35, 50, 9, 1, 0, 0, 1, 14, 14, 14, 14, 14, 14, 2, 2, 2, 14, 0, false,  
											new AIBehaviour(true, "standard", wPonits), null, null, null);
			
		var Prisoner2 = new Object();
		Prisoner2.id = 'Prisoner2';    //works as id it must be unique
		Prisoner2.type = "NPC";
		Prisoner2.size = 25;
		Prisoner2.posX = 1900;
		Prisoner2.posY = 1680;
		Prisoner2.scale = 0.25;
		Prisoner2.img = "img/level2/prisoner.png";
		Prisoner2.image = new createjs.Bitmap(Prisoner1.img);
		Prisoner2.image.zIndex = 10;
		Prisoner2.image.x = Prisoner2.posX - Prisoner2.size;
		Prisoner2.image.y = Prisoner2.posY - Prisoner2.size;
		Prisoner2.image.scaleX = 0.25;
		Prisoner2.image.scaleY = 0.25;
		Prisoner2.deathImage = new createjs.Bitmap(imgDeath);
		Prisoner2.deathImg = imgDeath;
		Prisoner2.deathImage.x = Prisoner2.posX - Prisoner2.size;
		Prisoner2.deathImage.y = Prisoner2.posY - Prisoner2.size;	 
		Prisoner2.deathImage.scaleX  = 0.25;
		Prisoner2.deathImage.scaleY  = 0.25;
		Prisoner2.initiative = 10;
		
		var wPonits = new Array();
		var wp = [1345, 1870];
		wPonits.push(wp);
		wp = [1096, 1393];
		wPonits.push(wp);
		wp = [477, 978];
		wPonits.push(wp);
	
		var description = "E' un poveraccio che e' ospite involontario delle prigioni, per quanto ne so potrei pure avercelo messo io, non si presenta molto bene ma dopo qualche mese in questo posto, o anche dopo qualche giorno, lo posso anche capire";
		Prisoner2.character = new character("Prigioniero 2", "Prigioniero", description, "", 35.35, 50, 9, 1, 0, 0, 1, 14, 14, 14, 14, 14, 14, 2, 2, 2, 14, 0, false,  
											new AIBehaviour(true, "standard", wPonits), null, null, null);

		var Prisoner3 = new Object();
		Prisoner3.id = 'Prisoner3';    //works as id it must be unique
		Prisoner3.type = "NPC";
		Prisoner3.size = 25;
		Prisoner3.posX = 1600;
		Prisoner3.posY = 1700;
		Prisoner3.scale = 0.25;
		Prisoner3.img = "img/level2/prisoner.png";
		Prisoner3.image = new createjs.Bitmap(Prisoner1.img);
		Prisoner3.image.zIndex = 10;
		Prisoner3.image.x = Prisoner3.posX - Prisoner3.size;
		Prisoner3.image.y = Prisoner3.posY - Prisoner3.size;
		Prisoner3.image.scaleX = 0.25;
		Prisoner3.image.scaleY = 0.25;
		Prisoner3.deathImage = new createjs.Bitmap(imgDeath);
		Prisoner3.deathImg = imgDeath;
		Prisoner3.deathImage.x = Prisoner3.posX - Prisoner3.size;
		Prisoner3.deathImage.y = Prisoner3.posY - Prisoner3.size;	 
		Prisoner3.deathImage.scaleX  = 0.25;
		Prisoner3.deathImage.scaleY  = 0.25;
		Prisoner3.initiative = 10;
		
		var wPonits = new Array();
		var wp = [1345, 1970];
		wPonits.push(wp);
		wp = [1196, 1393];
		wPonits.push(wp);
		wp = [497, 978];
		wPonits.push(wp);
	
		var description = "E' un poveraccio che e' ospite involontario delle prigioni, per quanto ne so potrei pure avercelo messo io, non si presenta molto bene ma dopo qualche mese in questo posto,	o anche dopo qualche giorno, lo posso anche capire";
		Prisoner3.character = new character("Prigioniero 3", "Prigioniero", description, "", 35.35, 50, 9, 1, 0, 0, 1, 14, 14, 14, 14, 14, 14, 2, 2, 2, 14, 0, false, 
											new AIBehaviour(true, "standard", wPonits), null, null, null);
		


		Guard1.character.inventory.push(equipment["spada2"]);
		Guard1.character.equipRightHand(equipment["spada2"]);
		Guard1.character.selectedHand = "right";	
		Guard1.character.selectedWeapon = Guard1.character.rightHand;	
		
		Guard2.character.inventory.push(equipment["spada3"]);
		Guard2.character.equipRightHand(equipment["spada3"]);
		Guard2.character.selectedHand = "right";	
		Guard2.character.selectedWeapon = Guard2.character.rightHand;	
			
		Guard3.character.inventory.push(equipment["spada4"]);
		Guard3.character.equipRightHand(equipment["spada4"]);
		Guard3.character.selectedHand = "right";	
		Guard3.character.selectedWeapon = Guard3.character.rightHand;	
		
		Guard4.character.inventory.push(equipment["spada5"]);
		Guard4.character.equipRightHand(equipment["spada5"]);
		Guard4.character.selectedHand = "right";	
		Guard4.character.selectedWeapon = Guard4.character.rightHand;	
		
		Guard5.character.inventory.push(equipment["spada6"]);
		Guard5.character.equipRightHand(equipment["spada6"]);
		Guard5.character.selectedHand = "right";	
		Guard5.character.selectedWeapon = Guard5.character.rightHand;	


		enemies.push(Guard1);
		enemies.push(Guard2);
		enemies.push(Guard3);
		enemies.push(Guard4);
		enemies.push(Guard5);
		enemies.push(Prisoner1);
		enemies.push(Prisoner2);
		enemies.push(Prisoner3);
	}

	if (stage.id == 'testLevel')
	{
	    var Orck = new Object();
	    Orck.id = 'StupidOrck';    //works as id it must be unique
	    Orck.type = "NPC";
	    Orck.size = 75;
	    Orck.posX = 500;
	    Orck.posY = 865;
	    Orck.scale = 0.75;
	    Orck.img = "img/testLevel/stupido_orco.png";
	    Orck.image = new createjs.Bitmap(Orck.img);
	    Orck.image.zIndex = 10;
	    Orck.image.x = Orck.posX - Orck.size;
	    Orck.image.y = Orck.posY - Orck.size;
        Orck.image.scaleX = 0.75;
        Orck.image.scaleY = 0.75;
        Orck.deathImage = new createjs.Bitmap(imgDeath);
        Orck.deathImg = imgDeath;
        Orck.deathImage.x = Orck.posX - Orck.size;
        Orck.deathImage.y = Orck.posY - Orck.size;
        Orck.deathImage.scaleX = 0.75;
        Orck.deathImage.scaleY = 0.75;
        Orck.initiative = 1;
	
        var talksRecived = new Array();
        var talksDone= new Array();
 
		
        var description = "E' uno stupido orco";
        Orck.character = new character("Stupido Orco", "StupidOrck", description, "", 106.05, 150, 9, 1, 0, 0, 1, 12, 12, 12, 12, 12, 12, 2, 2, 2, 15, 0, false,
                                         new AIBehaviour(true, "standard", null), null, talksRecived, talksDone);

        enemies.push(Orck);
	}
	
	for(var i = 0; i < enemies.length; i++)
	{
		loadPlayerStrings (enemies[i], lang);
	}
	
	return enemies;
}

function loadStageObjects(stage, equipment)
{
	var stageObjects = [];
	
	if (stage.id == 'tzelOffice')
	{
		stageObjects[0] = new Object();
		stageObjects[0].id = "table";  //works as id it must be unique
		stageObjects[0].name = "Tavolo";
		stageObjects[0].shape = "rectangular";
		stageObjects[0].description = "E' un tavolo, sopra di esso ci sono diverse pile di documenti, per come si sono messe le cose potrebbero tornarmi utili solo se in bagno fosse finita la carta. <br/> Il tavolo ha un cassetto che si apre tramite una leva nascosta";
		stageObjects[0].containsDescription = "<br /> Nel cassetto c'è la mia cara vecchia sciabole, la tengo sempre a portata di mano";
		stageObjects[0].cover = 0.5;
		stageObjects[0].sizeX = 50;
		stageObjects[0].sizeY = 115;
		stageObjects[0].posX = 1150;
		stageObjects[0].posY = 2140;
		stageObjects[0].scaleX = 10;
		stageObjects[0].scaleY = 10;
		stageObjects[0].image = null;
		stageObjects[0].radius = 115;
		stageObjects[0].triggers = [new actionTrigger('checkInside', 'Apri il cassetto', null, null, stageObjects[0], stageObjects[0], false, false, null, "minor")];
		stageObjects[0].contentTrigger = [new actionTrigger('pickUp', 'Predi la sciabola', null, null, stageObjects[0], equipment["sciabolaTzel"], true, false, null , null, "minor")];
		stageObjects[0].open = false;
		
		stageObjects[1] = new Object();
		stageObjects[1].id = "door";  //works as id it must be unique
		stageObjects[1].name = "Porta";
		stageObjects[1].shape = "rectangular";
		stageObjects[1].description = "E' una porta, di quelle proprio a forma di porta, con una maniglia per aprirla e una porta tutto attorno, sono quasi sicuro che hai capito di cosa si tratta";
		stageObjects[1].cover = 1;
		stageObjects[1].sizeX = 157;
		stageObjects[1].sizeY = 24;
		stageObjects[1].posX = 1816;
		stageObjects[1].posY = 858;
		stageObjects[1].orientation = "horizzontal";
		stageObjects[1].openingSide = "left";
		stageObjects[1].facing = "north";
		stageObjects[1].scaleX = 1;
		stageObjects[1].scaleY = 1;
		stageObjects[1].img = "img/level1/door1.png";
		stageObjects[1].image = new createjs.Bitmap("img/level1/door1.png");
		stageObjects[1].image.x = stageObjects[1].posX;
		stageObjects[1].image.y = stageObjects[1].posY;
		stageObjects[1].image.scaleX = 1;
		stageObjects[1].image.scaleY = 1;
		stageObjects[1].image.regX = stageObjects[1].sizeX;
		stageObjects[1].image.regY = stageObjects[1].sizeY;
		stageObjects[1].character = null;
		stageObjects[1].radius = 157;
		stageObjects[1].triggers = [new actionTrigger('openClose', 'Apri la porta', null, null, stageObjects[1], stageObjects[1], true, true, null)];
		stageObjects[1].doorOpen = false;
		
		stageObjects[2] = new Object();
		stageObjects[2].id = "bigShelf1";  //works as id it must be unique
		stageObjects[2].name = "Libreria";
		stageObjects[2].shape = "rectangular";
		stageObjects[2].description = "E' una libreria, piena di inutili libri di legge, quelli che contengono tutte quelle leggi che usavo ignorare quando lavoravo qui";
		stageObjects[2].cover = 1;
		stageObjects[2].sizeX = 140;
		stageObjects[2].sizeY = 30;
		stageObjects[2].posX = 1116;
		stageObjects[2].posY = 1905;
		stageObjects[2].orientation = "horizzontal";
		stageObjects[2].openingSide = "left";
		stageObjects[2].facing = "north";
		stageObjects[2].scaleX = 1;
		stageObjects[2].scaleY = 1;
		stageObjects[2].image =  null;
		stageObjects[2].radius = 140;
		stageObjects[2].triggers = [];
			
		stageObjects[3] = new Object();
		stageObjects[3].id = "bigShelf2";  //works as id it must be unique
		stageObjects[3].name = "Libreria";
		stageObjects[3].shape = "rectangular";
		stageObjects[3].description = "E' una libreria, piena di inutili libri di legge, quelli che contengono tutte quelle leggi che usavo ignorare quando lavoravo qui.";
		stageObjects[3].cover = 1;
		stageObjects[3].sizeX = 140;
		stageObjects[3].sizeY = 30;
		stageObjects[3].posX = 1116;
		stageObjects[3].posY = 2400;
		stageObjects[3].orientation = "horizzontal";
		stageObjects[3].openingSide = "left";
		stageObjects[3].facing = "north";
		stageObjects[3].scaleX = 1;
		stageObjects[3].scaleY = 1;
		stageObjects[3].image = null;
		stageObjects[3].radius = 140;
		stageObjects[3].triggers = [];
		stageObjects[3].contentTrigger = [];//[new actionTrigger('pickUp', "Predi l'amuleto", null, null, stageObjects[3], equipment["amuletOfProtection"], true, false, null)];
		stageObjects[3].open = true;
		
		stageObjects[4] = new Object();
		stageObjects[4].id = "stairs";  //works as id it must be unique
		stageObjects[4].name = "Scale";
		stageObjects[4].shape = "rectangular";
		stageObjects[4].description = "Sono le scale che portano alle prigioni al piano di sotto.. non una gran bella destinazione ma la mia unica via di fuga...";
		stageObjects[4].cover = 1;
		stageObjects[4].sizeX = 157;
		stageObjects[4].sizeY = 137;
		stageObjects[4].posX = 1816;
		stageObjects[4].posY = 698;
		stageObjects[4].scaleX = 1;
		stageObjects[4].scaleY = 1;
		stageObjects[4].image = null;
		stageObjects[4].character = null;
		stageObjects[4].radius = 157;
		stageObjects[4].triggers = [new actionTrigger('changeLevel', 'Scendi le scale', null, null,  stageObjects[4], stageObjects[4], true, false, null , ['prison'], "standard" )];	
			
		stageObjects[5] = new Object();
		stageObjects[5].id = "vertShelf1";  //works as id it must be unique
		stageObjects[5].name = "Libreria";
		stageObjects[5].shape = "rectangular";
		stageObjects[5].description = "E' una piccola libreria dove tengo un po' di tutto, foto di me con la famiglia, ricordi di vacanze mai fatte e di amici impiccati (da me) insomma le solite cianfrusaglie...";
		stageObjects[5].cover = 1;
		stageObjects[5].sizeX = 27;
		stageObjects[5].sizeY = 55;
		stageObjects[5].posX = 952;
		stageObjects[5].posY = 1990;
		stageObjects[5].scaleX = 1;
		stageObjects[5].scaleY = 1;
		stageObjects[5].image = null;
		stageObjects[5].radius = 55;
		stageObjects[5].triggers = [];
		stageObjects[5].contentTrigger = [];
		stageObjects[5].open = true;
		
		stageObjects[6] = new Object();
		stageObjects[6].id = "vertShelf2";  //works as id it must be unique
		stageObjects[6].name = "Libreria";
		stageObjects[6].shape = "rectangular";
		stageObjects[6].description = "Qui tengo la mia collezione di the rari, a me piace particolarmente quello marca kammarth...'";
		stageObjects[6].cover = 1;
		stageObjects[6].sizeX = 30;
		stageObjects[6].sizeY = 70;
		stageObjects[6].posX = 956;
		stageObjects[6].posY = 2300;
		stageObjects[6].scaleX = 1;
		stageObjects[6].scaleY = 1;
		stageObjects[6].image = null;
		stageObjects[6].radius = 70;
		stageObjects[6].triggers = [];
		stageObjects[6].contentTrigger = [new actionTrigger('pickUp', 'Prendi la bustina di Kammart', null, null, stageObjects[6], equipment["kammart"], true, false, null, "minor")];
		stageObjects[6].open = true;
		
		stageObjects[7] = new Object();
		stageObjects[7].id = "corridorDoor1";  //works as id it must be unique
		stageObjects[7].name = "Sgabuzzino delle scope";
		stageObjects[7].shape = "rectangular";
		stageObjects[7].description = "E' lo stanzino della signora delle pulizie";
		stageObjects[7].containsDescription = "<br /> La signora poveraccia non e' molto attrezzata qui dentro c'e': <br />";
		stageObjects[7].cover = 1;
		stageObjects[7].sizeX = 25;
		stageObjects[7].sizeY = 55;
		stageObjects[7].posX = 1975;
		stageObjects[7].posY = 2150;
		stageObjects[7].scaleX = 1;
		stageObjects[7].scaleY = 1;
		stageObjects[7].image = null;
		stageObjects[7].radius = 70;
		stageObjects[7].triggers = [];
		stageObjects[7].contentTrigger = [new actionTrigger('pickUp', 'Prendi il mocio', "<br />Un mocio per pulire in terra", null, stageObjects[7], equipment["mop"], true, false, null, "minor"), 
		new actionTrigger('pickUp', 'Prendi il secchio', "<br />Un secchio", null, stageObjects[7], equipment["bucket"], true, false, null, "minor"),
		new actionTrigger('pickUp', 'Prendi il completino', "<br /> Un simpatico completino da cameriera (che se ripenso a come sta indosso alla signora coboldo che fa le pulizie qui quasi quasi cambio idea e mi lascio impiccare)", null, stageObjects[7], equipment["maidDress"], true, false, null, "minor")];
		stageObjects[7].open = true;
		
		stageObjects[8] = new Object();
		stageObjects[8].id = "corridorDoor2";  //works as id it must be unique
		stageObjects[8].name = "Ufficio di Brammar";
		stageObjects[8].shape = "rectangular";
		stageObjects[8].description = "Josh Brammar, e' un bravo ragazzo uno dei pochi che farebbe piacere incontrare (se solo si lavasse i denti)";
		stageObjects[8].cover = 1;
		stageObjects[8].sizeX = 20;
		stageObjects[8].sizeY = 60;
		stageObjects[8].posX = 1975;
		stageObjects[8].posY = 1572;
		stageObjects[8].scaleX = 1;
		stageObjects[8].scaleY = 1;
		stageObjects[8].image = null;
		stageObjects[8].radius = 70;
		stageObjects[8].triggers = [];
		stageObjects[8].contentTrigger = null;
		
		stageObjects[9] = new Object();
		stageObjects[9].id = "corridorDoor3";  //works as id it must be unique
		stageObjects[9].name = "Ufficio di Ruammar";
		stageObjects[9].shape = "rectangular";
		stageObjects[9].description = "Il vecchio Ruammar, campione indiscusso di battute brutte di tutta la contea";
		stageObjects[9].cover = 1;
		stageObjects[9].sizeX = 20;
		stageObjects[9].sizeY = 70;
		stageObjects[9].posX = 1975;
		stageObjects[9].posY = 1120;
		stageObjects[9].scaleX = 1;
		stageObjects[9].scaleY = 1;
		stageObjects[9].image = null;
		stageObjects[9].radius = 70;
		stageObjects[9].triggers = [];
		stageObjects[9].contentTrigger = null;
		
		stageObjects[10] = new Object();
		stageObjects[10].id = "corridorDoor4";  //works as id it must be unique
		stageObjects[10].name = "Ufficio di Lammar";
		stageObjects[10].shape = "rectangular";
		stageObjects[10].description = "Paul Lammar, questo e' un pubblico ministero serio, finalmente uno che sa fare il suo lavoro";
		stageObjects[10].cover = 1;
		stageObjects[10].sizeX = 20;
		stageObjects[10].sizeY = 60;
		stageObjects[10].posX = 1630;
		stageObjects[10].posY = 1580;
		stageObjects[10].scaleX = 1;
		stageObjects[10].scaleY = 1;
		stageObjects[10].image = null;
		stageObjects[10].radius = 70;
		stageObjects[10].triggers = [];
		stageObjects[10].contentTrigger = null;
		
		stageObjects[11] = new Object();
		stageObjects[11].id = "corridorDoor5";  //works as id it must be unique
		stageObjects[11].name = "Ufficio di Mhammar";
		stageObjects[11].shape = "rectangular";
		stageObjects[11].description = "Homar Mhammar ma come cazzo si spiega che tutti qui hanno il cognome che finisce per hammar?? chi ha fatto le assunzioni l'ulima volta deve decisamente fumare di meno, questo poi l'hanno scelto solo per il nome, l'unica cosa che sa di giursprudenza e' 'impiccatelo' ";
		stageObjects[11].cover = 1;
		stageObjects[11].sizeX = 20;
		stageObjects[11].sizeY = 60;
		stageObjects[11].posX = 1645;
		stageObjects[11].posY = 1110;
		stageObjects[11].scaleX = 1;
		stageObjects[11].scaleY = 1;
		stageObjects[11].image = null;
		stageObjects[11].radius = 70;
		stageObjects[11].triggers = [];
		stageObjects[11].contentTrigger = null;
		
		
		stageObjects[12] = new Object();
		stageObjects[12].id = "bigShelf3";  //works as id it must be unique
		stageObjects[12].name = "Libreria";
		stageObjects[12].shape = "rectangular";
		stageObjects[12].description = "In questa libreria c'e' astutamente camuffata la mia cassaforte personale, dentro ci sono un paio di oggettini che mi farebbero comodo, solo che non sono sicuro di ricordarmi il codice...";
		stageObjects[12].containsDescription = "<br /> In cassaforte tengo: <br />";
		stageObjects[12].cover = 1;
		stageObjects[12].sizeX = 180;
		stageObjects[12].sizeY = 30;
		stageObjects[12].posX = 1436;
		stageObjects[12].posY = 1905;
		stageObjects[12].orientation = "horizzontal";
		stageObjects[12].openingSide = "left";
		stageObjects[12].facing = "north";
		stageObjects[12].scaleX = 1;
		stageObjects[12].scaleY = 1;
		stageObjects[12].image =  null;
		stageObjects[12].radius = 180;
		stageObjects[12].triggers =  [new actionTrigger('tryCode', 'Provo a inserire 210871, la data di nascita del mio pappagallo', null, null, stageObjects[12], stageObjects[12], false, false, null, [210871], "minor" ), new actionTrigger('tryCode', 'Provo a inserire 347431, il numero dei mie capelli', null, null, stageObjects[12], stageObjects[12], false, false, null, [347431], "minor" ), new actionTrigger('tryCode', 'Provo a inserire 123456, che in effetti non ho mai avuto fantasia per i codici', null, null, stageObjects[12], stageObjects[12], false, false, null, [123456], "minor" )];
		stageObjects[12].contentTrigger = [new actionTrigger('pickUp', "Predi l'amuleto", "<br /> Un amuleto di protezione, non molto macho ma ti puo' davvero salvare la vita", null, stageObjects[12], equipment["amuletOfProtection"], true, false, null, "minor"), new actionTrigger('pickUp', "Prendi le monete d'oro", "<br />Un sacchetto con 237 monete d'oro", null, stageObjects[12], equipment["gold"], true, false, null, "minor"), new actionTrigger('pickUp', "Prendi il biglietto della diligenza", "<br />Il biglietto della diligenza per domani", null, stageObjects[12], equipment["ticket"], true, false, null, "minor")];
		stageObjects[12].open = false;
		stageObjects[12].code = 123456;
			
		stageObjects[13] = new Object();
		stageObjects[13].id = "bigShelf4";  //works as id it must be unique
		stageObjects[13].name = "Armadio";
		stageObjects[13].shape = "rectangular";
		stageObjects[13].description = "E' l'armadio del mio ufficio";
	
		stageObjects[13].containsDescription = "<br /> qui dentro tengo:";
		stageObjects[13].cover = 1;
		stageObjects[13].sizeX = 180;
		stageObjects[13].sizeY = 30;
		stageObjects[13].posX = 1436;
		stageObjects[13].posY = 2400;
		stageObjects[13].orientation = "horizzontal";
		stageObjects[13].openingSide = "left";
		stageObjects[13].facing = "north";
		stageObjects[13].scaleX = 1;
		stageObjects[13].scaleY = 1;
		stageObjects[13].image = null;
		stageObjects[13].radius = 180;
		stageObjects[13].triggers = [];
		stageObjects[13].contentTrigger = [new actionTrigger('pickUp', "Prendi l'elegante cappello", "<br /> Un elegante cappelo con piuma di fagaino", null, stageObjects[13], equipment["elegantHat"], false, false, null, "minor"), new actionTrigger('pickUp', "Prendi l'armatura di cuoio", "<br /> Un armatura di cuoio, la mia migliore amica, si puo' mettere sotto la giacca e ti puo' evitare operazioni di appendicite non richieste", null, stageObjects[13], equipment["leatherArmor"], true, false, null, "minor")];
		
		stageObjects[13].open = true;
	}
	
	if(stage.id == 'prison')
	{
		stageObjects[0] = new Object();
		stageObjects[0].id = "door3";  //works as id it must be unique
		stageObjects[0].name = "Porta";
		stageObjects[0].shape = "rectangular";
		stageObjects[0].description = "E' una grata di acciacio questa non la butta giu' neanche un troll col mal di denti";
		stageObjects[0].cover = 1;
		stageObjects[0].sizeX = 115;
		stageObjects[0].sizeY = 14
		stageObjects[0].posX = 1882;
		stageObjects[0].posY = 1788;
		stageObjects[0].orientation = "horizzontal";
		stageObjects[0].openingSide = "left";
		stageObjects[0].facing = "south";
		stageObjects[0].scaleX = 1;
		stageObjects[0].scaleY = 1;
		stageObjects[0].img = "img/level2/door1.png";
		stageObjects[0].image = new createjs.Bitmap(stageObjects[0].img);
		stageObjects[0].image.x = stageObjects[0].posX;
		stageObjects[0].image.y = stageObjects[0].posY;
		stageObjects[0].image.scaleX = 1;
		stageObjects[0].image.scaleY = 1;
		stageObjects[0].image.regX = stageObjects[0].sizeX;
		stageObjects[0].image.regY = stageObjects[0].sizeY;
		stageObjects[0].character = null;
		stageObjects[0].radius = 115;
		stageObjects[0].triggers = [];
		stageObjects[0].doorOpen = false;
		
		stageObjects[1] = new Object();
		stageObjects[1].id = "door4";  //works as id it must be unique
		stageObjects[1].name = "Porta";
		stageObjects[1].shape = "rectangular";
		stageObjects[1].description = "E' una grata di acciacio questa non la butta giu' neanche un troll col mal di denti";
		stageObjects[1].cover = 1;
		stageObjects[1].sizeX = 115;
		stageObjects[1].sizeY = 14;
		stageObjects[1].posX = 1625;
		stageObjects[1].posY = 1788;
		stageObjects[1].orientation = "horizzontal";
		stageObjects[1].openingSide = "left";
		stageObjects[1].facing = "south";
		stageObjects[1].scaleX = 1;
		stageObjects[1].scaleY = 1;
		stageObjects[1].img = "img/level2/door1.png";
		stageObjects[1].image = new createjs.Bitmap(stageObjects[1].img);
		stageObjects[1].image.x = stageObjects[1].posX;
		stageObjects[1].image.y = stageObjects[1].posY;
		stageObjects[1].image.scaleX = 1;
		stageObjects[1].image.scaleY = 1;
		stageObjects[1].image.regX = stageObjects[1].sizeX;
		stageObjects[1].image.regY = stageObjects[1].sizeY;
		stageObjects[1].character = null;
		stageObjects[1].radius = 115;
		stageObjects[1].triggers = [];
		stageObjects[1].doorOpen = false;
		
		stageObjects[2] = new Object();
		stageObjects[2].id = "door1";  //works as id it must be unique
		stageObjects[2].name = "Porta";
		stageObjects[2].shape = "rectangular";
		stageObjects[2].description = "E' una grata di acciacio questa non la butta giu' neanche un troll col mal di denti";
		stageObjects[2].cover = 1;
		stageObjects[2].sizeX = 14;
		stageObjects[2].sizeY = 130;
		stageObjects[2].posX = 2400;
		stageObjects[2].posY = 1935;
		stageObjects[2].orientation = "vertical";
		stageObjects[2].openingSide = "right";
		stageObjects[2].facing = "east";
		stageObjects[2].scaleX = 1;
		stageObjects[2].scaleY = 1;
		stageObjects[2].img = "img/level2/door2.png";
		stageObjects[2].image = new createjs.Bitmap(stageObjects[2].img);
		stageObjects[2].image.x = stageObjects[2].posX;
		stageObjects[2].image.y = stageObjects[2].posY;
		stageObjects[2].image.scaleX = 1;
		stageObjects[2].image.scaleY = 1;
		stageObjects[2].image.regX = stageObjects[2].sizeX;
		stageObjects[2].image.regY = stageObjects[2].sizeY;
		stageObjects[2].character = null;
		stageObjects[2].radius = 130;
		stageObjects[2].triggers = [];
		stageObjects[2].doorOpen = false;
		
		stageObjects[3] = new Object();
		stageObjects[3].id = "door2";  //works as id it must be unique
		stageObjects[3].name = "Porta";
		stageObjects[3].shape = "rectangular";
		stageObjects[3].description = "E' una grata di acciacio questa non la butta giu' neanche un troll col mal di denti";
		stageObjects[3].cover = 1;
		stageObjects[3].sizeX = 128;
		stageObjects[3].sizeY = 14;
		stageObjects[3].posX = 2150;
		stageObjects[3].posY = 1790;
		stageObjects[3].orientation = "horizzontal";
		stageObjects[3].openingSide = "left";
		stageObjects[3].facing = "south";
		stageObjects[3].scaleX = 1;
		stageObjects[3].scaleY = 1;
		stageObjects[3].img = "img/level2/door3.png";
		stageObjects[3].image = new createjs.Bitmap(stageObjects[3].img);
		stageObjects[3].image.x = stageObjects[3].posX;
		stageObjects[3].image.y = stageObjects[3].posY;
		stageObjects[3].image.scaleX = 1;
		stageObjects[3].image.scaleY = 1;
		stageObjects[3].image.regX = stageObjects[3].sizeX;
		stageObjects[3].image.regY = stageObjects[3].sizeY;
		stageObjects[3].character = null;
		stageObjects[3].radius = 128;
		stageObjects[3].triggers = [];
		stageObjects[3].doorOpen = false;
		
		stageObjects[4] = new Object();
		stageObjects[4].id = "lever";  //works as id it must be unique
		stageObjects[4].shape = "circular";
		stageObjects[4].name = "Leve di controllo";
		stageObjects[4].description = "E' un meccanismo con 4 leve, servono ad aprire le grate";
		stageObjects[4].cover = 0;
		stageObjects[4].size = 25;
		stageObjects[4].posX = 2560;
		stageObjects[4].posY = 1820;
		stageObjects[4].scaleX = 0.25;
		stageObjects[4].scaleY = 0.25;
		stageObjects[4].image = null;
		stageObjects[4].character = null;
		stageObjects[4].radius = 40;
		stageObjects[4].triggers = [new actionTrigger('openClose', 'Tira prima leva', null, null,stageObjects[4], stageObjects[2], false, true, null, null), new actionTrigger('openClose', 'Tira seconda leva', null, null, stageObjects[4], stageObjects[1], false, true, null, null), new actionTrigger('openClose', 'Tira terza leva', null, null, stageObjects[4], stageObjects[0], false, true, null, null), new actionTrigger('openClose', 'Tira quarta leva', null, null, stageObjects[4], stageObjects[3], false, true, null, null)];
		
		stageObjects[5] = new Object();
		stageObjects[5].id = "manHole";  //works as id it must be unique
		stageObjects[5].shape = "circular";
		stageObjects[5].name = "Botola";
		stageObjects[5].description = "E' una botola, da qui parte un passaggio segreto che portera' il mio collo al sicuro da quella cravatta di canapa di cui si parlava";
		stageObjects[5].cover = 0;
		stageObjects[5].size = 25;
		stageObjects[5].posX = 2455; //1455
		stageObjects[5].posY = 2190; //1190
		stageObjects[5].scaleX = 0.25;
		stageObjects[5].scaleY = 0.25;
		stageObjects[5].image = null;
		stageObjects[5].character = null;
		stageObjects[5].radius = 30;
		stageObjects[5].triggers = [new actionTrigger('exitChapter', 'Entra nella botola','<br /> Ok ho preso tutto, posso andare', "<br /> Prima di andarmene devo assolutamente recuperare il biglietto della diligenza, senza quello se anche se riesco a uscire da qui non vado lontano", stageObjects[5], stageObjects[5], 'ticket', true, null, "standard")];	
		
		stageObjects[6] = new Object();
		stageObjects[6].id = "wc";  //works as id it must be unique
		stageObjects[6].shape = "circular";
		stageObjects[6].name = "cesso";
		stageObjects[6].description = "E'il cesso della prigione, e' solo per gli impiegati ma la qualita' della mensa lo rende comunque il piu' utilizzato della citta'";
		stageObjects[6].cover = 0;
		stageObjects[6].size = 20;
		stageObjects[6].posX = 802;
		stageObjects[6].posY = 1087;
		stageObjects[6].scaleX = 0.25;
		stageObjects[6].scaleY = 0.25;
		stageObjects[6].image = null;
		stageObjects[6].character = null;
		stageObjects[6].radius = 25;
		stageObjects[6].triggers = [new actionTrigger('specialAction', 'Intasa il cesso', '<br /> A vederlo mi verrebbe voglia di fare uno scherzetto ai miei ex-colleghi e questo mocio fa proprio al caso mio..', 
													  "<br /> A vederlo mi verrebbe voglia di fare uno scherzetto ai miei ex-colleghi, purtroppo mi manca l'oggetto giusto per farlo, peccato...",  
													  stageObjects[6], stageObjects[6], true, false, "mop", "standard" )];	
		
		stageObjects[7] = new Object();
		stageObjects[7].id = "stairs";  //works as id it must be unique
		stageObjects[7].name = "Scale";
		stageObjects[7].shape = "rectangular";
		stageObjects[7].description = "Sono le scale che portano agli uffici del piano di sopra, sono sorprendentemente simili a quelle che ho usato per scendere qui";
		stageObjects[7].cover = 1;
		stageObjects[7].sizeX = 127;
		stageObjects[7].sizeY = 87;
		stageObjects[7].posX = 2540;
		stageObjects[7].posY = 2360;
		stageObjects[7].scaleX = 1;
		stageObjects[7].scaleY = 1;
		stageObjects[7].image = null;
		stageObjects[7].character = null;
		stageObjects[7].radius = 157;
		stageObjects[7].triggers = [new actionTrigger('changeLevel', 'Sali le scale', '<br /> Ok torno su ma vedaimo di non fare nottata che qui mi vogliono impiccare', null,  stageObjects[7], stageObjects[7], true, false, null , ['tzelOffice'], null, "standard" )];	
	}
	
	for (var i = 0; i < stageObjects.length; i++)
	{
		loadObjectsStrings (stageObjects[i], lang);
	}	
	
	return stageObjects;
}

function loadStageTeams(stage)
{
	stageTeams = [];
	if (stage.id == 'tzelOffice')
	{
		var teamMembers = new Array();
		teamMembers.push(heroes[0]);
		var relations = new Array();
		relations.push(new teamRelation("dungeonGuard", "neutral"));
		var myTeam = new team("UB", true, teamMembers, heroes[0], relations, null);
		
		var enemyTeamMembers = new Array();
		enemyTeamMembers.push(GuardCaptain);
		enemyTeamMembers.push(Guard);
		
		var attitudeChangeList = new Array();
		attitudeChangeList.push( new attitudeChange("move", "dungeonGuard", "UB", null, "any", "neutral", "enemy", "GuardDontMove", null));
		attitudeChangeList.push( new attitudeChange("attack", "dungeonGuard", "UB", null, "any", "any", "enemy", "GuarAttackAnswer", null));
		attitudeChangeList.push( new attitudeChange("talk", "dungeonGuard", "UB", "TzelInsult", "any", "any", "enemy", "GuarInsultAnswer", null));
		attitudeChangeList.push( new attitudeChange("talk", "dungeonGuard", "UB", "TzelAskTime", "any", "neutral", "friend", "GuardGiveTime", null));
		attitudeChangeList.push( new attitudeChange("pickUp", "dungeonGuard", "UB", null, "any", "any", "enemy", "GuardSwordTaken", "sciabolaTzel"));
		attitudeChangeList.push( new attitudeChange("timeOver", "dungeonGuard", "UB", null, "timeOver", "neutral", "enemy", "GuardSwordTimeOver", null));

		
		relations = new Array();
		relations.push(new teamRelation("UB", "neutral"));
		var guardTeam = new team("dungeonGuard", false, enemyTeamMembers, GuardCaptain, relations, attitudeChangeList);
		
		stageTeams.push(myTeam);
		stageTeams.push(guardTeam);
		
		// rally really really temp
		players[0].character.team = myTeam;
		players[1].character.team = guardTeam;
		players[2].character.team = guardTeam;
	}
	if(stage.id == 'prison')
	{
		var attitudeChangeList = new Array();
	
		var relations = new Array();
		relations.push(new teamRelation("dungeonGuard", "enemy"));
		relations.push(new teamRelation("prisoners", "neutral"));
		var teamMembers = new Array();
		teamMembers.push(players[0]);
		var ub = new team("UB", true, teamMembers, players[0], relations, null);
		teams.push(ub);
		
		relations = new Array();
		relations.push(new teamRelation("UB", "enemy"));
		relations.push(new teamRelation("prisoners", "enemy"));
		teamMembers = new Array();
		
		teamMembers.push(players[1]);
		teamMembers.push(players[2]);
		teamMembers.push(players[3]);
		teamMembers.push(players[4]);
		teamMembers.push(players[5]);
		
		var guards = new team("dungeonGuard", false, teamMembers, players[1], relations, attitudeChangeList);
		teams.push(guards);
		
		var relations = new Array();
		relations.push(new teamRelation("dungeonGuard", "enemy"));
		relations.push(new teamRelation("UB", "neutral"));
		teamMembers = new Array();
		teamMembers.push(players[6]);
		teamMembers.push(players[7]);
		teamMembers.push(players[8]);
		var prisoners = new team("prisoners", false, teamMembers, players[6], relations, attitudeChangeList);
		teams.push(prisoners);
		
		players[0].character.team = ub;
		players[1].character.team = guards;
		players[2].character.team = guards;
		players[3].character.team = guards;
		players[4].character.team = guards;
		players[5].character.team = guards;
		
		players[6].character.team = prisoners;
		players[7].character.team = prisoners;
		players[8].character.team = prisoners;
		
		stageTeams.push(ub);
		stageTeams.push(guards);
		stageTeams.push(prisoners);
	}

	if (stage.id == 'start') {
	    var attitudeChangeList = new Array();

	    var relations = new Array();
	    relations.push(new teamRelation("monsters", "enemy"));
	    var teamMembers = new Array();
	    teamMembers.push(players[0]);
	    teamMembers.push(players[1]);
	    teamMembers.push(players[2]);
	    var ub = new team("UB", true, teamMembers, players[0], relations, null);
	    teams.push(ub);

	    relations = new Array();
	    relations.push(new teamRelation("UB", "enemy"));
	    teamMembers = new Array();

	    teamMembers.push(players[3]);

	    var monsters = new team("monsters", false, teamMembers, players[2], relations, attitudeChangeList);
	    teams.push(monsters);
        
	    players[0].character.team = ub;
	    players[1].character.team = ub;
	    players[2].character.team = ub;
	    players[3].character.team = monsters;
	 
	    stageTeams.push(ub);
	    stageTeams.push(monsters);
	}
	
	return stageTeams;
}

function getStages(level) 
{
    stages = [];

    if (level == 'laFugaDiTzel') {
        stages.push({
            id: 'tzelOffice',
            name: 'Tzel office',
            imgMap: "img/level1/map.png",
            objects: [],
            enemies: [],
            startPositions: [{
                id: 'start',
                positions: [{ x: 1050, y: 2220 }]
            },
            {
                id: 'stairs',
                positions: [{ x: 1816, y: 928 }]
            }]

        });

        stages.push({
            id: 'prison',
            name: 'Prison',
            imgMap: "img/level2/map.png",
            objects: [],
            enemies: [],
            startPositions: [{
                id: 'start',
                positions: [{ x: 2550, y: 2240 }]
                //positions: [{ x: 1450, y: 1220 }]
            },
            {
                id: 'stairs',
                positions: [{ x: 2550, y: 2240 }]
            }]

        });
    }

    if (level == 'testLevel')
    {
        stages.push({
            id: 'test',
            name: 'Test 1',
            imgMap: "img/testLevel/map.png",
            objects: [],
            enemies: [],
            startPositions: [{
                id: 'start',
                positions: [
                    { x: 1000, y: 1000 },
                    { x: 800, y: 1000 },
                    { x: 600, y: 1200 }
                ]
            }]
        });
    }
    return stages;
}