// JavaScript Document

function createMouseOverHandler(object)
{  
    return function()
	{
        showObjectName(object); 
	}  
}

function createMouseOutHandler()
{  
    return function()
	{
        document.getElementById('objectContainer').style.display = "none";
	}  
}


function initStage()
{
	backgroundContainer.addChild(mapImage.image);
	
	var lifeBall =  new createjs.Shape();
	
	lifeBall = new createjs.Bitmap("img/interface/life_ball_empty.png");
	lifeBall.x = 4;
	lifeBall.y = 478;
	 
	lifeBallFilling = new createjs.Bitmap("img/interface/life_ball_filling.png");
	lifeBallFilling.x = 0;
	lifeBallFilling.y = 478;
		
	lifeBallFilling.sourceRect = new createjs.Rectangle(0,0,100,100);
	 
	spriteContainer.addChild(lifeBall);
	spriteContainer.addChild(lifeBallFilling);
	 
	if(showDebugLines)
	{
		for(var i = 0; i < rooms.length; i ++)
		{
			rooms[i].image = new createjs.Shape();
			rooms[i].image.posX = rooms[i].square[0];
			rooms[i].image.posY = rooms[i].square[1];
			rooms[i].image.graphics.setStrokeStyle(1).beginStroke("blue").drawRect(0, 0, rooms[i].square[2], rooms[i].square[3])
			backgroundContainer.addChild(rooms[i].image);
		}
	}
	
	for(var i = 0; i < objects.length; i ++)
	{
		if(objects[i].image == null)
		{
			objects[i].image = new createjs.Bitmap("img/obj/invisible.png");
			objects[i].image.x = objects[i].posX ;
			objects[i].image.y = objects[i].posY ;
			objects[i].image.alpha = 0.02;
			
			if (objects[i].shape == "rectangular")
			{
				objects[i].scaleX = (objects[i].sizeX / 50) * 2;
				objects[i].scaleY = (objects[i].sizeY / 50) * 2;		
			}
			
			if (objects[i].shape == "circular")
			{
				objects[i].scaleX = objects[i].radius / 25;
				objects[i].scaleY = objects[i].radius / 25;
				objects[i].image.x = objects[i].posX - objects[i].radius ;
				objects[i].image.y = objects[i].posY - objects[i].radius ;
			}
			
			objects[i].image.regX = objects[i].sizeX / objects[i].scaleX  ;
			objects[i].image.regY = objects[i].sizeY / objects[i].scaleY  ;
		}
		
		if(objects[i].image != null)
		{
			objects[i].image.addEventListener("mouseover", createMouseOverHandler(objects[i]) );
			objects[i].image.addEventListener("mouseout", createMouseOutHandler());
			
			objects[i].image.cursor='pointer';
		
			objects[i].image.visible = true;
			objects[i].image.ScaleX = objects[i].scale;
			objects[i].image.ScaleY = objects[i].scale;
			
			objectsContainer.addChild(objects[i].image);
		}
		
		if(showDebugLines)
		{
			objects[i].sizeCircle = new createjs.Shape();		
			objects[i].sizeCircle.x = objects[i].posX;
			objects[i].sizeCircle.y = objects[i].posY;
			objects[i].sizeCircle.graphics.setStrokeStyle(1).beginStroke("red").drawCircle(0, 0, (objects[i].radius)).endStroke();
			objects[i].sizeCircle.visible = true;
			objectsContainer.addChild(objects[i].sizeCircle);
			
			if(objects[i].shape == "rectangular")
			{
				objects[i].borders = new Array();
				var borders = getObjectBorders(objects[i]);
				for(var j = 0; j < borders.length; j ++)
				{
					objects[i].borders[j] = new Object();
					objects[i].borders[j].wallLine = new createjs.Shape();
					objects[i].borders[j].wallLine.posX = borders[j][0];
					objects[i].borders[j].wallLine.posY =  borders[j][1]; 
					objects[i].borders[j].wallLine.x = objects[i].borders[j].wallLine.posX;
					objects[i].borders[j].wallLine.y = objects[i].borders[j].wallLine.posY;
					objects[i].borders[j].wallLine.graphics.moveTo(0, 0);
		
					objects[i].borders[j].wallLine.graphics.setStrokeStyle(1).beginStroke("green").lineTo(Math.abs(borders[j][2] - borders[j][0]), Math.abs(borders[j][3] - borders[j][1]));
					objects[i].borders[j].wallLine.visible = true;	
					
					backgroundContainer.addChild(objects[i].borders[j].wallLine);
				}
			}
		}	
	}
	
	for (var element in equipment) 
	{
		if (equipment.hasOwnProperty(element)) 
		{
			if(equipment[element].weaponSprite != null)
			{
				spriteContainer.addChild(equipment[element].weaponSprite.image);	
				equipment[element].weaponSprite.image.visible = false;	
			}
			if(equipment[element].missileSprite != null)
			{
				spriteContainer.addChild(equipment[element].missileSprite.image);	
				equipment[element].missileSprite.image.visible = false;	
			}
					
		}
		
		spriteContainer.addChild(fistSprite.image);
		fistSprite.image.visible = false;
	}
    // use hasOwnProperty to filter out keys from the Object.prototype
    

	for(var i = 0; i < equipment.length; i ++)
	{
		if(equip[i].weaponSprite != null)
		{
			spriteContainer.addChild(equipment[i].weaponSprite.image);	
			equipment[i].weaponSprite.image.visible = false;	
		}
		if(equip[i].missileSprite != null)
		{
			spriteContainer.addChild(equipment[i].missileSprite.image);	
			equipment[i].missileSprite.image.visible = false;	
		}
	}
	
	for(var i = 0; i < spellSprites.length; i ++)
	{			
		spriteContainer.addChild(spellSprites[i].image);	
		spellSprites[i].image.visible = false;	
		
		
		
		spriteContainer.addChild(spellSprites[i].animation)
		
	}
	
	for(var i = 0; i < players.length; i ++)
	{
		players[i].image.addEventListener("mouseover", createMouseOverHandler(players[i]) );
		players[i].image.addEventListener("mouseout", createMouseOutHandler());	
		players[i].image.cursor='pointer';
		
		playersContainer.addChild(players[i].image);	
		players[i].image.visible = true;
		players[i].image.ScaleX = players[i].scale;
		players[i].image.ScaleY = players[i].scale;
		
		backgroundContainer.addChild(players[i].deathImage);
		players[i].deathImage.visible = false;
		players[i].deathImage.ScaleX = players[i].scale;
		players[i].deathImage.ScaleY = players[i].scale;
		
		players[i].reachCircle = new createjs.Shape();		
		players[i].reachCircle.x = players[i].posX;
		players[i].reachCircle.y = players[i].posY;
		players[i].reachCircle.alpha = 0.1;
		players[i].reachCircle.graphics.setStrokeStyle(1).beginFill("red").drawCircle(0, 0, (players[i].character.reach + players[i].character.radius)).endStroke();	
		players[i].reachCircle.visible = false;

		players[i].sizeCircle = new createjs.Shape();		
		players[i].sizeCircle.x = players[i].posX;
		players[i].sizeCircle.y = players[i].posY;
		players[i].sizeCircle.alpha = 0.5;
		players[i].sizeCircle.graphics.setStrokeStyle(4).beginStroke("blue").drawCircle(0, 0, (players[i].character.radius)).endStroke();
		players[i].sizeCircle.visible = false;
		
		players[i].moveCircle = new createjs.Shape();		
		players[i].moveCircle.x = players[i].posX;
		players[i].moveCircle.y = players[i].posY;
		players[i].moveCircle.alpha = 0.1;
		players[i].moveCircle.graphics.setStrokeStyle(1).beginFill("green").drawCircle(0, 0, (players[i].character.maxMove * 100)).endStroke();
		players[i].moveCircle.visible = false;	
		
		players[i].castCircle = new createjs.Shape();		
		players[i].castCircle.x = players[i].posX;
		players[i].castCircle.y = players[i].posY;
		players[i].castCircle.alpha = 0.1;
		players[i].castCircle.graphics.setStrokeStyle(1).beginFill("#007FFF").drawCircle(0, 0, 0).endStroke();
		players[i].castCircle.visible = false;

		aureasContainer.addChild(players[i].reachCircle);
		aureasContainer.addChild(players[i].sizeCircle);
		aureasContainer.addChild(players[i].moveCircle);
		aureasContainer.addChild(players[i].activeCircle);	
		aureasContainer.addChild(players[i].castCircle);	
	}
	
	drawWalls();
	
	stage.addChild(backgroundContainer);
	stage.addChild(aureasContainer);
	stage.addChild(playersContainer);
	stage.addChild(objectsContainer);
	stage.addChild(spriteContainer);
	
	loaded = true;
}

function addPlayerToCanvas(player)
{
	playersContainer.addChild(player.image);	
	player.image.visible = true;
	player.image.ScaleX = player.scale;
	player.image.ScaleY = player.scale;
	
	backgroundContainer.addChild(player.deathImage);
	player.deathImage.visible = false;
	player.deathImage.ScaleX = player.scale;
	player.deathImage.ScaleY = player.scale;
	
	player.reachCircle = new createjs.Shape();		
	player.reachCircle.x = player.posX;
	player.reachCircle.y = player.posY;
	player.reachCircle.graphics.setStrokeStyle(1).beginStroke("red").drawCircle(0, 0, (player.character.reach + player.character.radius)).endStroke();	
	player.reachCircle.visible = false;

	player.sizeCircle = new createjs.Shape();		
	player.sizeCircle.x = player.posX;
	player.sizeCircle.y = player.posY;
	player.sizeCircle.graphics.setStrokeStyle(1).beginStroke("red").drawCircle(0, 0, (player.character.radius)).endStroke();
	player.sizeCircle.visible = false;
	
	player.moveCircle = new createjs.Shape();		
	player.moveCircle.x = player.posX;
	player.moveCircle.y = player.posY;
	player.moveCircle.graphics.setStrokeStyle(1).beginStroke("green").drawCircle(0, 0, (player.character.maxMove * 100)).endStroke();
	player.moveCircle.visible = false;	
	
	playersContainer.addChild(player.reachCircle);
	playersContainer.addChild(player.sizeCircle);
	playersContainer.addChild(player.moveCircle);
	playersContainer.addChild(player.activeCircle);
	
	stage.update();
}
		
function startMoveCanvasUp()
{
	if(!actionOnGoing)
		canvasMovingTimer = setInterval(function(){moveCanvasUp()}, 10);
}

function startMoveCanvasDown()
{
	if(!actionOnGoing)
		canvasMovingTimer = setInterval(function(){moveCanvasDown()}, 10);
}

function startMoveCanvasLeft()
{
	if(!actionOnGoing)
		canvasMovingTimer = setInterval(function(){moveCanvasLeft()}, 10);
}

function startMoveCanvasRight()
{
	if(!actionOnGoing)
		canvasMovingTimer = setInterval(function(){moveCanvasRight()}, 10);
}

function startZoomCanvasIn()
{ 
	if(!actionOnGoing)
		canvasMovingTimer = setInterval(function(){zoomCanvasIn()}, 10);
}

function startZoomCanvasOut()
{ 
	if(!actionOnGoing)
		canvasMovingTimer = setInterval(function(){zoomCanvasOut()}, 10);
}
		
function moveCanvasUp()
{
	canvasOffsetY = canvasOffsetY + 100;
	
	setScalesAndPositions();
}

function moveCanvasDown()
{
	canvasOffsetY = canvasOffsetY - 100;
	
	setScalesAndPositions();
}

function moveCanvasLeft()
{
	canvasOffsetX = canvasOffsetX + 100;
	
	setScalesAndPositions();
}

function moveCanvasRight()
{
	canvasOffsetX = canvasOffsetX - 100;
	
	setScalesAndPositions();
}	

function zoomCanvasIn()
{
	if(canvasZoom < 3)
	{
		canvasZoom = canvasZoom + 0.1;
		
		setScalesAndPositions();
	}
}

function zoomCanvasOut()
{
	if(canvasZoom > 0.3)
	{
		canvasZoom = canvasZoom - 0.1;
		
		setScalesAndPositions();
	}
}

function moveStage(x, y)
{
	if(!actionOnGoing)
	{
		canvasOffsetX = canvasOffsetX + x;
		canvasOffsetY = canvasOffsetY + y;
		
		setScalesAndPositions();
	}
}

function zoomStage(delta)
{
	canvasZoom = canvasZoom + delta/100;
	if(canvasZoom < 0.3)
		canvasZoom = 0.3;
		
	if(canvasZoom > 3)
		canvasZoom = 3;
		
	setScalesAndPositions();
}

function moveStageOnChar(char)
{
	if(!actionOnGoing)
	{
		canvasOffsetX = -((char.posX ) - (512 / canvasZoom)) + (char.size / 2 * canvasZoom );
		canvasOffsetY = -((char.posY ) - (260 / canvasZoom)) + (char.size / 2 * canvasZoom);
			
		setScalesAndPositions();
	}
}

function setZoom(zoom)
{
	canvasZoom = zoom;
	setScalesAndPositions();
}

function setScalesAndPositions()
{
	document.getElementById('objectContainer').style.display = "none";
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;

	 mapImage.image.x = adjCanvasOffsetX;
	 mapImage.image.y = adjCanvasOffsetY;
	 mapImage.image.scaleX = canvasZoom;
	 mapImage.image.scaleY = canvasZoom;
	
	for(var i = 0; i < players.length; i++)
	{
		players[i].image.x = (players[i].posX * canvasZoom) - (players[i].size * canvasZoom) + adjCanvasOffsetX ;
		players[i].image.y = (players[i].posY * canvasZoom) - (players[i].size * canvasZoom) + adjCanvasOffsetY;
		players[i].image.scaleX = canvasZoom * players[i].scale;
		players[i].image.scaleY = canvasZoom * players[i].scale;
		
		players[i].deathImage.x = (players[i].posX * canvasZoom) - (players[i].size * canvasZoom) + adjCanvasOffsetX ;
		players[i].deathImage.y = (players[i].posY * canvasZoom) - (players[i].size * canvasZoom) + adjCanvasOffsetY;
		players[i].deathImage.scaleX = canvasZoom * players[i].scale;
		players[i].deathImage.scaleY = canvasZoom * players[i].scale;
		
		players[i].reachCircle.x = players[i].posX * canvasZoom + adjCanvasOffsetX;
		players[i].reachCircle.y = players[i].posY * canvasZoom + adjCanvasOffsetY;
		players[i].reachCircle.scaleX = canvasZoom;
		players[i].reachCircle.scaleY = canvasZoom;
		
		players[i].sizeCircle.x = players[i].posX * canvasZoom + adjCanvasOffsetX;
		players[i].sizeCircle.y = players[i].posY * canvasZoom + adjCanvasOffsetY;
		players[i].sizeCircle.scaleX = canvasZoom;
		players[i].sizeCircle.scaleY = canvasZoom;
		
		players[i].moveCircle.x = players[i].posX * canvasZoom + adjCanvasOffsetX;
		players[i].moveCircle.y = players[i].posY * canvasZoom + adjCanvasOffsetY;
		players[i].moveCircle.scaleX = canvasZoom;
		players[i].moveCircle.scaleY = canvasZoom;
		
		players[i].castCircle.x = players[i].posX * canvasZoom + adjCanvasOffsetX;
		players[i].castCircle.y = players[i].posY * canvasZoom + adjCanvasOffsetY;
		players[i].castCircle.scaleX = canvasZoom;
		players[i].castCircle.scaleY = canvasZoom;
	}
	
	for(var i = 0; i < weaponSprites.length; i++)
	{
		weaponSprites[i].image.scaleX = canvasZoom * weaponSprites[i].scale;
		weaponSprites[i].image.scaleY = canvasZoom * weaponSprites[i].scale;
	}
	
	for(var i = 0; i < spellSprites.length; i++)
	{
		spellSprites[i].image.scaleX = canvasZoom * spellSprites[i].image.scalaX;
		spellSprites[i].image.scaleY = canvasZoom * spellSprites[i].image.scalaX;
		if(spellSprites[i].animation != null)
		{
			spellSprites[i].animation.scaleX = Math.round(canvasZoom * spellSprites[i].animation.scalaX);
			spellSprites[i].animation.scaleY = Math.round(canvasZoom * spellSprites[i].animation.scalaY);
		}
	}
	
	for(var j = 0; j < objects.length; j++)
	{
		if(objects[j].image != null)
		{
			if (objects[i].shape == "rectangular")
			{
				objects[j].image.x = (objects[j].posX * canvasZoom)  + adjCanvasOffsetX;
				objects[j].image.y = (objects[j].posY * canvasZoom)  + adjCanvasOffsetY;
			}
			
			if (objects[j].shape == "circular")
			{
				objects[j].image.x = (objects[j].posX * canvasZoom) - (objects[j].radius * canvasZoom) + adjCanvasOffsetX;
				objects[j].image.y = (objects[j].posY * canvasZoom) - (objects[j].radius * canvasZoom) + adjCanvasOffsetY;
			}
			
			objects[j].image.scaleX = canvasZoom * objects[j].scaleX;
			objects[j].image.scaleY = canvasZoom * objects[j].scaleY;
		}
		
		if(showDebugLines)
		{
			objects[j].sizeCircle.x = objects[j].posX * canvasZoom + adjCanvasOffsetX;
			objects[j].sizeCircle.y = objects[j].posY * canvasZoom + adjCanvasOffsetY;
			objects[j].sizeCircle.scaleX = canvasZoom;
			objects[j].sizeCircle.scaleY = canvasZoom;
			
			if(objects[j].shape == "rectangular")
			{
				for(var k = 0; k < objects[j].borders.length; k++)
				{
					objects[j].borders[k].wallLine.x = objects[j].borders[k].wallLine.posX * canvasZoom + adjCanvasOffsetX;
					objects[j].borders[k].wallLine.y = objects[j].borders[k].wallLine.posY * canvasZoom + adjCanvasOffsetY;
					objects[j].borders[k].wallLine.scaleX = canvasZoom;
					objects[j].borders[k].wallLine.scaleY = canvasZoom;
				}
			}
		}
	}
	
	if(showDebugLines)
	{
		for(var j = 0; j < wallLines.length; j++)
		{
			wallLines[j].x = wallLines[j].posX * canvasZoom + adjCanvasOffsetX;
			wallLines[j].y = wallLines[j].posY * canvasZoom + adjCanvasOffsetY;
			wallLines[j].scaleX = canvasZoom;
			wallLines[j].scaleY = canvasZoom;
		}
		
		for(var j = 0; j < rooms.length; j++)
		{
			rooms[j].image.x = rooms[j].image.posX * canvasZoom + adjCanvasOffsetX;
			rooms[j].image.y = rooms[j].image.posY * canvasZoom + adjCanvasOffsetY;
			rooms[j].image.scaleX = canvasZoom;
			rooms[j].image.scaleY = canvasZoom;
		}
		
		if(aImg != null)
		{
			aImg.x = (aImg.posX * canvasZoom)  + adjCanvasOffsetX;
			aImg.y = (aImg.posY * canvasZoom)  + adjCanvasOffsetY;
			
	
			
		}
		if(bImg != null)
		{
			bImg.x = (bImg.posX * canvasZoom)  + adjCanvasOffsetX;
			bImg.y = (bImg.posY * canvasZoom)  + adjCanvasOffsetY;
		}
		
		if(cImg != null)
		{
			cImg.x = (cImg.posX * canvasZoom)  + adjCanvasOffsetX;
			cImg.y = (cImg.posY * canvasZoom)  + adjCanvasOffsetY;
		}
		
		if(dImg != null)
		{
			dImg.x = (dImg.posX * canvasZoom)  + adjCanvasOffsetX;
			dImg.y = (dImg.posY * canvasZoom)  + adjCanvasOffsetY;
		}
		
	}

}


function stopMoveCanvas()
{
	clearInterval(canvasMovingTimer);
}


// old

function drawWalls()
{
	if(showDebugLines)
	{
		for(var j = 0; j < walls.length; j ++)
		{

			wallLines[j] = new createjs.Shape();	
			wallLines[j].posX = walls[j][0];
			wallLines[j].posY =  walls[j][1];
			wallLines[j].x = wallLines[j].posX;
			wallLines[j].y = wallLines[j].posY;
			wallLines[j].graphics.moveTo(0, 0);
		
			wallLines[j].graphics.setStrokeStyle(1).beginStroke("green").lineTo(Math.abs(walls[j][2] - walls[j][0]), Math.abs(walls[j][3] - walls[j][1]));
			wallLines[j].visible = true;
			//points: [wallsArrray[j][0], wallsArrray[j][1], wallsArrray[j][2], wallsArrray[j][3]],
			//stroke: 'green',
			//strokeWidth: 2,
			//lineCap: 'round',
			//lineJoin: 'round'
			backgroundContainer.addChild(wallLines[j]);
		
		}
		stage.update();
	}
}