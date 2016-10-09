// action you can do in the game

function use(object, char, useType)
{
	//var object = pointInObject(x, y, objects);
	var isInReach = false;
		
	// load description
	if(object != null)
	{
		if(useType == "use")
		{
			if(object.triggers != null && object.triggers.length > 0)
			{
				 var action = null;
			
				 for(var i = 0; i < object.triggers.length; i++)
				 {
					if(object.triggers[i].easy)
					{
						action = object.triggers[i];
						break;
					}
				 }
				 
				 if(action != null)
				 {
				 	object.triggers.splice(i, 1);
					object.triggers.push(action);
					applyUseAction(action.action, activeCharacter, object.triggers[0].targetObject,  object.triggers[0].triggerObject, true); 
				 }
			}
			else
			{
				if(object.open != null && object.contentTrigger != null && object.contentTrigger.length > 0)
				{
					applyUseAction(object.contentTrigger[0].action, activeCharacter, object.contentTrigger[0].targetObject,  object.contentTrigger[0].triggerObject, true); 

				}
			}
		}
		else if(useType == "look")
		{
			isInReach = isObjectInReach(object, activeCharacter);
			objectIsReachable = (checkTrajector(activeCharacter.posX, activeCharacter.posY, object.posX, object.posY, activeCharacter.character.radius, activeCharacter.character.radius, object, null ) > 0);	
			
			document.getElementById("useAndTalkTitle").innerHTML = object.name;
			var description = object.description;

			document.getElementById("useAndTalkDescription").innerHTML = description;
			document.getElementById("useAndTalkActions").style.display = 'none';
			document.getElementById("useAndTalkActionsTitle").style.display = 'none';
			
			if(isInReach && objectIsReachable)
			{
				if(object.open && object.contentTrigger != null && object.contentTrigger.length >0)
				{
					if(object.containsDescription != null && object.containsDescription != "")
						description = description + object.containsDescription;
						
					for(var i = 0; i < object.contentTrigger.length; i ++)
					{
						if( object.contentTrigger[i].addToDescription != null && object.contentTrigger[i].addToDescription != "")
						description = description + object.contentTrigger[i].addToDescription ;
					}
				}
				if(object.triggers != null && object.triggers.length > 0)
				{
					for(var i = 0; i < object.triggers.length; i ++)
					{
						var triggerActive = false;
						var hasObject = false;
						if(object.triggers[i].objectNeeded != null)
						{
							for( k = 0; k < activeCharacter.character.inventory.length; k ++)	
							{
								if(activeCharacter.character.inventory[k].ID == object.triggers[i].objectNeeded)	
								{
									 hasObject = true;
									 break;
								}
							}
						}
						
						if(object.triggers[i].objectNeeded == null || hasObject)
							triggerActive = true;
						
						if( triggerActive && object.triggers[i].addToDescription != null && object.triggers[i].addToDescription != "" )
							description = description + object.triggers[i].addToDescription ;
						
						
						if( !triggerActive && object.triggers[i].notActiveAddToDescription != null && object.triggers[i].notActiveAddToDescription != "" )
							description = description + object.triggers[i].notActiveAddToDescription ;
					}
				}
				document.getElementById("useAndTalkDescription").innerHTML = description;
				
				//load actions
				document.getElementById("useAndTalkActions").innerHTML='';
				
				for(var j=0; j<object.triggers.length; j++)
				{
					var hasObject = false;
					if(object.triggers[j].objectNeeded != null)
					{
						for( k = 0; k < activeCharacter.character.inventory.length; k ++)	
						{
							if(activeCharacter.character.inventory[k].ID == object.triggers[j].objectNeeded)	
							{
								 hasObject = true;
								 break;
							}
						}
					}
					
					if(object.triggers[j].objectNeeded == null || hasObject)
					{
						var actionDiv = document.createElement('div');
						actionDiv.innerHTML= object.triggers[j].actionDescription;
						actionDiv.style.cursor = "pointer";
						actionDiv.id = object.triggers[j].action;
						actionDiv.onclick = createUseHandler(object.triggers[j].action, object.triggers[j].targetObject, object.triggers[j].triggerObject,  object.triggers[j].parameters, object.triggers[j].conclusive);					
						document.getElementById("useAndTalkActions").appendChild(actionDiv);	
					}
				}
				
				if(object.open)
				{
					for(var j=0; j<object.contentTrigger.length; j++)
					{					
						var actionDiv = document.createElement('div');
						actionDiv.innerHTML= object.contentTrigger[j].actionDescription;
						actionDiv.style.cursor = "pointer";
						actionDiv.id = object.contentTrigger[j].targetObject.ID;
						actionDiv.onclick = createUseHandler(object.contentTrigger[j].action, object.contentTrigger[j].targetObject, object.contentTrigger[j].triggerObject, object.contentTrigger[j].conclusive);					
						document.getElementById("useAndTalkActions").appendChild(actionDiv);				
					}
				}
				
				document.getElementById("useAndTalkActions").style.display = 'block';
				document.getElementById("useAndTalkActionsTitle").style.display = 'block';
			}
							
			showPanel("useAndTalk");
		}
	}
	else if(useType == "look" )
	{
		document.getElementById("useAndTalkActions").style.display = 'none';
		document.getElementById("useAndTalkActionsTitle").style.display = 'none';
		
		if(char != null)
		{
			document.getElementById("useAndTalkTitle").innerHTML = char.character.name;
			showPanel("useAndTalk");
			if(char.character.alive)
			{
				document.getElementById("useAndTalkDescription").innerHTML = char.character.description;
				document.getElementById("useAndTalkActions").innerHTML='';
				if(char.character.talksRecived != null)
				{
					document.getElementById("useAndTalkActions").style.display = 'block';
					document.getElementById("useAndTalkActionsTitle").style.display = 'block';
					var targetCharTeamRelation = "";
					
					for(var i= 0; i < char.character.team.teamRelations.length; i++)
					{
						if(char.character.team.teamRelations[i].team == activeCharacter.character.team.name)
							targetCharTeamRelation = char.character.team.teamRelations[i].attitude;
					}
					
					for(var j=0; j<char.character.talksRecived.length; j++)
					{	
						if((char.character.talksRecived[j].levelState == levelState || char.character.talksRecived[j].levelState == null) &&
						   (char.character.talksRecived[j].teamAttitude == targetCharTeamRelation))
						{
							var actionDiv = document.createElement('div');
							actionDiv.style.marginBottom = "5px";
							actionDiv.innerHTML = char.character.talksRecived[j].phrase;
							actionDiv.style.cursor = "pointer";
							actionDiv.id = char.character.talksRecived[j].id;
							console.log("talk recived", char.character.talksRecived[j]);
							actionDiv.onclick = createTalkHandler(char.character.talksRecived[j], activeCharacter, char);					
							document.getElementById("useAndTalkActions").appendChild(actionDiv);
						}
					}
				}	
			}
			else
			{
			    if (lang == "it") {
			        document.getElementById("useAndTalkDescription").innerHTML = "E' morto, al di la' di tutte le implicazioni filosofiche della cosa, questo chiaramente ti autorizza a frugare il cadavere e derubarlo";
			    }
			    if (lang == "en") {
			        document.getElementById("useAndTalkDescription").innerHTML = "He's dead, besides all philosophical implications that means that now you can pillage the corpse";
			    }
				document.getElementById("useAndTalkActions").innerHTML='';
				document.getElementById("useAndTalkActions").style.display = 'block';
				document.getElementById("useAndTalkActionsTitle").style.display = 'block';
				
				for(var j=0; j<char.character.inventory.length; j++)
				{
					var actionDiv = document.createElement('div');
					actionDiv.style.marginBottom = "5px";
					if (lang == "it") {
					    actionDiv.innerHTML = "Prendi " + char.character.inventory[j].name;
					}
					if (lang == "en") {
					    actionDiv.innerHTML = "Pick up " + char.character.inventory[j].name;
					}
					actionDiv.style.cursor = "pointer";
					actionDiv.id = char.character.inventory[j].ID;
					actionDiv.onclick = createUseHandler("pickUp", char.character.inventory[j], char, false);							
					document.getElementById("useAndTalkActions").appendChild(actionDiv);
				}
			}
		}
	}
}

function createUseHandler(actionName, target, trigger, parameters, conclusive)
{  
    return function() {  
        applyUseAction(actionName, activeCharacter, target, trigger, parameters, conclusive); 

    } 
}

function createTalkHandler(talk, charTalking, charTalkingTo)
{  
    return function() {  
        doTalk(talk, charTalking, charTalkingTo); 
    } 
}

function doTalk(talk, charTalking, charTalkingTo)
{
	document.getElementById('useAndTalk').style.visibility = 'hidden'; 
	document.getElementById('useAndTalkActions').style.display = 'none';
	document.getElementById("useAndTalkActionsTitle").style.display = 'none';
	windowOpen = false;
	
	document.getElementById('PCTalkImage').innerHTML = '<img src="' + charTalking.img + '" height="100" width="100" />';
	document.getElementById('PCTalkPhrase').innerHTML = talk.phrase;
	
	document.getElementById('PCTalk').style.visibility = 'visible';
	console.log(talk);
	
	if(talk.effect == "friend" || talk.effect == "enemy" || talk.effect == "neutral")
	{
		checkTeamAttitudeChange("talk", charTalkingTo.character.team.name, talk.id, null)
	}
	if(talk.effect == "gameOver")
	{
		for(var k = 0; k < looseDescription.length; k++ )
		{
			if(looseDescription[k].reason == talk.answer)
				endLevel("loose", looseDescription[k].description);
		}
	}
	if(talk.effect == "answer")
	{
		answer(charTalkingTo, talk.answer)
	}
}

function answer(charTalkingTo, answerId)
{
	for(var i = 0; i < players.length; i++)
	{
		if(players[i].id == charTalkingTo.id)
		{
			for(var j = 0; j < players[i].character.talksDone.length; j++)
			{
				if(players[i].character.talksDone[j].id == answerId)
				{
					document.getElementById('NPCTalkImage').innerHTML = '<img src="' + players[i].img + '" height="100" width="100" />';
					document.getElementById('NPCTalkPhrase').innerHTML = players[i].character.talksDone[j].phrase;
					document.getElementById('NPCTalk').style.visibility = 'visible';	
				}
			}
		}
	}
}

function applyUseAction(action, player, targetObject, triggerObject, parameters, conclusive)
{
	var opportunityAttack = false
	var timeForAction = true
	
	if(action == "pickUp")
		timeForAction = checkIsTimeForAction(activeCharacter.character.standardActionDone, activeCharacter.character.moveActionDone, activeCharacter.character.minorActionDone, activeCharacter.onGoingAction, "minor");
	
	if(action == "exitLevel" || action == "exitChapter")
		timeForAction = checkIsTimeForAction(activeCharacter.character.standardActionDone, activeCharacter.character.moveActionDone, activeCharacter.character.minorActionDone, activeCharacter.onGoingAction, "move");
		
	if(timeForAction)
	{
		if(action == "pickUp")
		{
			opportunityAttack = notMovingOpportunityAttack(activeCharacter, triggerObject, targetObject, action, null, null, null);
		}
		
		if(!opportunityAttack && conclusive)
		{
			document.getElementById('useAndTalk').style.visibility = 'hidden'; 
			document.getElementById('useAndTalkActions').style.display = 'none';
			document.getElementById('useAndTalkActionsTitle').style.display = 'none';
			windowOpen = false;
		}	
		
		if(action == "openClose")
		{
			openCloseDoor(targetObject, conclusive);
		}
		
		if(action == "checkInside")
		{
			checkInside(targetObject, conclusive);
		}
	
		if (action == "pickUp")
		{
			
			if(!opportunityAttack)
				pickUp(triggerObject, targetObject);
				
			else
			{	
				if(activeCharacter.character.minorActionDone == false)
					activeCharacter.character.minorActionDone = true;
				else
				{
					if(activeCharacter.character.moveActionDone == false)
						activeCharacter.character.moveActionDone = true;
					else
						activeCharacter.character.standardActionDone = true;
				}
			}
		}
	
		if (action == "changeLevel")
		{
			changeLevel(parameters[0], triggerObject.id);
		}
	
		if (action == "exitChapter")
		{	
			endLevel("win", winDescription);
		}
		
		if (action == "specialAction")
		{
			for(var i = 0; i< targetObject.triggers.length; i++)
			{
				if (targetObject.triggers[i].action == action)
				{
					triggerNum = i;
					break;
				}
			}
			targetObject.triggers.splice(triggerNum, 1);	
			
			checkTalkingSituation(action);
		}
		
		if(action == "tryCode")
		{
			if(parameters[0] == targetObject.code)
			{
				checkInside(targetObject, conclusive);
				checkTalkingSituation("rightCode");
			}
			else
			{
				checkTalkingSituation("wrongCode");
			}
		}
	}
	else
	{
		consolleWriter(activeCharacter.character.name, "Not enough time to do that");
		document.getElementById('useAndTalk').style.visibility = 'hidden'; 
		document.getElementById('useAndTalkActions').style.display = 'none';
		document.getElementById('useAndTalkActionsTitle').style.display = 'none';	
		windowOpen = false;
	}
}

function getMovementTokens(x,y, maxDist, checkOpportunityAttack)
{
	var moveDone = activeCharacter.character.moveDone;
	var moveArray = pathFinder(activeCharacter.posX, activeCharacter.posY, x, y);
	if (moveArray != null)
	{
		moveArray = adjustMultipleMoveOnDistance(activeCharacter, moveArray, (maxDist - moveDone));
		
		var length = moveArray.wayPoints.length;
		var secondLastPoint = new Object();
		if(length >= 2)
		{
			secondLastPoint.x = moveArray.wayPoints[length - 2][0];
			secondLastPoint.y = moveArray.wayPoints[length - 2][1];
		}
		else
		{
			secondLastPoint.x = activeCharacter.posX;
			secondLastPoint.y = activeCharacter.posY;
		}
		
		var barriers = [];
		for(var i= 0; i < walls.length; i++)
		{
			barriers.push(walls[i]);
		}
		for(var i= 0; i < objects.length; i++)
		{
			if (objects[i].cover > 0)
			{
				var bdr = getObjectBorders(objects[i]);
				
				for(var j= 0; j < bdr.length; j++)
					barriers.push(bdr[j]);	
			}
		}
		var adjPoint = adjustMoveToTarget(secondLastPoint.x, secondLastPoint.y, moveArray.wayPoints[length - 1][0], moveArray.wayPoints[length - 1][1]);
		var	adjPointOnWalls = adjustMoveOnWalls(secondLastPoint.x, secondLastPoint.y,  adjPoint.x,  adjPoint.y, activeCharacter.character.radius, barriers);
		
		moveArray.wayPoints[length - 1][0] = adjPointOnWalls.x;
		moveArray.wayPoints[length - 1][1] = adjPointOnWalls.y;
		
		actionOnGoing = true;
	
		var tokens = new Array();
		
		for(var j = 0; j < moveArray.wayPoints.length; j++)
		{
			var opportunities = [];
			
			if(j == 0)
			{	
				var tempX = activeCharacter.posX;
				var tempY = activeCharacter.posY;
			}
			else
			{		
				var tempX = moveArray.wayPoints[j - 1][0];
				var tempY = moveArray.wayPoints[j - 1][1];	
			}
			if(checkOpportunityAttack)
			{
				opportunities = checkOpportunities(activeCharacter, tempX, tempY, moveArray.wayPoints[j][0], moveArray.wayPoints[j][1]);	
			}
		
			var token;
				
			for(var i =0; i < opportunities.length; i++)
			{
				token = new Object();
				token.character = activeCharacter;
				
				token.pointA = new Object();
				token.pointB = new Object();
				token.pointA.x = tempX;
				token.pointA.y = tempY;
				token.pointB.x = opportunities[i].posX;
				token.pointB.y = opportunities[i].posY;	
				token.dist = Math.sqrt( Math.pow((token.pointA.x - token.pointB.x), 2) + Math.pow((token.pointA.y - token.pointB.y),2) );
				
				tempX = opportunities[i].posX;
				tempY = opportunities[i].posY;
				
				token.attacker = opportunities[i].player;
				token.nextIndex =  tokens.length + 1;
				
				tokens.push(token);
			}
			
			token = new Object();
			token.character = activeCharacter;
			
			token.pointA = new Object();
			token.pointB = new Object();
			token.pointA.x = tempX;
			token.pointA.y = tempY;
			token.pointB.x = moveArray.wayPoints[j][0];
			token.pointB.y = moveArray.wayPoints[j][1];
			token.dist = Math.sqrt( Math.pow((token.pointA.x - token.pointB.x), 2) + Math.pow((token.pointA.y - token.pointB.y),2) );
			
			token.nextIndex = tokens.length + 1;
			token.attacker = null;
			tokens.push(token);
		}
		
		activeCharacter.character.moveDone = activeCharacter.character.moveDone + moveArray.distance;
		tokens[0].dist = tokens[0].dist ;
		return tokens
	}
	else
	{
		return null
	}
}

function walk(x, y)
{		
	if(loaded && !actionOnGoing)
	{
		var maxDist = activeCharacter.character.maxMove * meterEquivalence;
		var tokens = getMovementTokens(x, y, maxDist, true)
		if (tokens != null)
			doMovement(tokens, 0, null, 'walk');			
		else
		if(activeCharacter.type == "NPC")
			return false;
		else
			consolleWriter(activeCharacter.character.name, "I cannot reach that place");
	}
}

function run(x, y)
{		
	if(loaded && !actionOnGoing)
	{
		var maxDist = activeCharacter.character.maxMove * 3 * meterEquivalence;
		var tokens = getMovementTokens(x, y, maxDist, true)
		if (tokens != null)
			doMovement(tokens, 0,  null, 'run');			
		else
		if(activeCharacter.type == "NPC")
			return false;
		else
			consolleWriter(activeCharacter.character.name, "I cannot reach that place");
	}		
}

function retreat(x, y)
{
	if(loaded && !actionOnGoing)
	{
		var maxDist = activeCharacter.character.maxMove * meterEquivalence;
		var tokens = getMovementTokens(x, y, maxDist, false)
		if (tokens != null)
			doMovement(tokens, 0, null, 'retreat');			
		else
		if(activeCharacter.type == "NPC")
			return false;
		else
			consolleWriter(activeCharacter.character.name, "I cannot reach that place");
	}		
}

function sneak(x, y)
{		
	if(loaded && !actionOnGoing)
	{	
		var maxDist = activeCharacter.character.maxMove / 2 * meterEquivalence;
		var tokens = getMovementTokens(x, y, maxDist, true)
		if (tokens != null)
			doMovement(tokens, 0, null, 'sneak');			
		else
		if(activeCharacter.type == "NPC")
			return false;
		else
			consolleWriter(activeCharacter.character.name, "I cannot reach that place");	
	}		
}

function step(x, y)
{
	var move = calculateMove(activeCharacter, x, y);
	if(move.possible)
	{
		var adjPoint = adjustMoveToTarget(activeCharacter.posX, activeCharacter.posY, move.x, move.y);
		move.x = adjPoint.x;
		move.y = adjPoint.y;
		var maxDist = 1 * meterEquivalence;
		
		var dist = Math.sqrt(Math.pow((activeCharacter.posX - move.x), 2) + Math.pow((activeCharacter.posY - move.y),2));
		
		if(dist < maxDist)
		{
			var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
			var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
			var speed = 0.5;		
			var visualizedPosX = move.x * canvasZoom + adjCanvasOffsetX;
			var visualizedPosY = move.y * canvasZoom + adjCanvasOffsetY;
			
			activeCharacter.posX = move.x;
			activeCharacter.posY = move.y;
								
			var adjustedVisualizedPosX = visualizedPosX - (activeCharacter.size * canvasZoom);
			var adjustedVisualizedPosY = visualizedPosY - (activeCharacter.size * canvasZoom);
		
			createjs.Tween.get(activeCharacter.image).to({x:adjustedVisualizedPosX, y:adjustedVisualizedPosY}, (dist/speed), Ease.getPowInOut(2.0)).call(moveComplete, ['step']);	
			createjs.Tween.get(activeCharacter.deathImage).to({x:adjustedVisualizedPosX, y:adjustedVisualizedPosY}, (dist/speed), Ease.getPowInOut(2.0));
			
			createjs.Tween.get(activeCharacter.sizeCircle).to({x:visualizedPosX, y:visualizedPosY}, (dist/speed), Ease.getPowInOut(2.0));
		}
		else
			consolleWriter(activeCharacter.character.name, "Target too far away");
	}
}

function doMovement(tokens, index, lastAttack, moveType, attackX, attackY)
{
	if(lastAttack != null)
	{
		meleeAttackComplete(lastAttack);		
	}
	if(index <= (tokens.length - 1))
	{
		var token = tokens[index];
		var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
		var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
		var character = token.character;
		
		if (moveType == 'walk' || moveType == 'retreat')
			var speed = 0.5;
		if (moveType == 'run' || moveType == 'charge')
			var speed = 0.7;
		if (moveType == 'sneak')
			var speed = 0.3;
					
		character.posX = token.pointB.x;
		character.posY = token.pointB.y;
		
		var visualizedPosX = (token.pointB.x + canvasOffsetX) * canvasZoom ;
		var visualizedPosY = (token.pointB.y + canvasOffsetY) * canvasZoom ;
						
		var adjustedVisualizedPosX = visualizedPosX - (character.size * canvasZoom);
		var adjustedVisualizedPosY = visualizedPosY - (character.size * canvasZoom);
		
		var attacker = tokens[index].attacker;
		
		if(attacker != null)
		{
			createjs.Tween.get(character.image).to({x:adjustedVisualizedPosX, y:adjustedVisualizedPosY}, (token.dist/speed), Ease.getPowInOut(2.0)).call(meleeAttack, [attacker, token.pointB.x , token.pointB.y, tokens, token.nextIndex, moveType, attackX, attackY]);
			
			createjs.Tween.get(character.deathImage).to({x:adjustedVisualizedPosX, y:adjustedVisualizedPosY}, (token.dist/speed), Ease.getPowInOut(2.0));
			
			createjs.Tween.get(character.sizeCircle).to({x:visualizedPosX, y:visualizedPosY}, (token.dist/speed), Ease.getPowInOut(2.0));
		}
		else
		{
			createjs.Tween.get(character.image).to({x:adjustedVisualizedPosX, y:adjustedVisualizedPosY}, (token.dist/speed), Ease.getPowInOut(2.0)).call(doMovement, [tokens, token.nextIndex, null, moveType, attackX, attackY]);	
			createjs.Tween.get(character.deathImage).to({x:adjustedVisualizedPosX, y:adjustedVisualizedPosY}, (token.dist/speed), Ease.getPowInOut(2.0));
			
			createjs.Tween.get(character.sizeCircle).to({x:visualizedPosX, y:visualizedPosY}, (token.dist/speed), Ease.getPowInOut(2.0));
		}
			
	}
	else
	{
		moveComplete(moveType, attackX, attackY);
	}
}

function moveComplete(moveType, targetX, targetY)
{
	actionOnGoing = false;	
	activeCharacter.deathImage.x = activeCharacter.image.x;
	activeCharacter.deathImage.y = activeCharacter.image.y;
	var maxMove = activeCharacter.character.maxMove;
	if (moveType == 'sneak')
		maxMove = maxMove / 2
		
	var moveLeft = (maxMove * meterEquivalence - activeCharacter.character.moveDone);
	if(moveType == 'step')
	{
		moveLeft = 0;
		maxMove = 100;
	}
	if(moveType == 'charge')
	{
		moveLeft = 0;
		maxMove = 0;
	}
		
	activeCharacter.moveCircle.graphics.clear();
	activeCharacter.moveCircle.graphics.setStrokeStyle(1).beginFill("green").drawCircle(0, 0, moveLeft * meterEquivalence).endStroke();
	
	var onGoingAction = new Object();
	onGoingAction.action = actionSelected;
	onGoingAction.actionType = activeCharacter.character.selectedMoveStyle;
	
	if(moveType == 'walk' || moveType == 'sneak' || moveType == 'charge')
		onGoingAction.actionDuration = "move";
	if(moveType == 'retreat' || moveType == 'run')
		onGoingAction.actionDuration = "full";
	if(moveType == 'step')
		onGoingAction.actionDuration = "minor";
	
	activeCharacter.onGoingAction = onGoingAction;
	if( moveType == 'charge') 
	{
		doChargeAttack(activeCharacter, targetX, targetY);
	} 
	else if(moveLeft < (activeCharacter.character.radius + 20) && activeCharacter.type != "NPC")
	{
		activeCharacter.moveCircle.visible = false;
		
		if(moveType == 'walk' || moveType == 'sneak')
			setActionDone('move');
		if(moveType == 'retreat' || moveType == 'run')
			setActionDone('full');
		if(moveType == 'step')
			setActionDone('minor');
			
		activeCharacter.onGoingAction = null;
		activeCharacter.character.moveDone = 0;
		
		if((moveType == 'step' && (!activeCharacter.character.minorActionDone || !activeCharacter.character.moveActionDone || !activeCharacter.character.standardActionDone )) || 
			(moveType != 'step' && (!activeCharacter.character.moveActionDone || !activeCharacter.character.standardActionDone )) )
		{
			console.log('step');
			activeCharacter.moveCircle.graphics.clear();
			activeCharacter.moveCircle.graphics.setStrokeStyle(1).beginFill("green").drawCircle(0, 0, maxMove * 100).endStroke();
			activeCharacter.moveCircle.visible = true;
		}
		
		drawUsedActions();
	}
	moveStageOnChar(activeCharacter);
	if(activeCharacter.type == "NPC")
	{
		if(moveType == 'walk' || moveType == 'sneak')
			setActionDone('move')
		if(moveType == 'retreat' || moveType == 'run')
			setActionDone('full')
			
		activeCharacter.character.moveDone = 0;
		AIWaiter();
	}
	else
	{
		checkRoomEntered(activeCharacter);	
	}
	refreshInterface();

	checkTeamAttitudeChange("move", null, null, null);
}

function rangedAttack(x, y)
{
	var shot = calculateThrowArrows(x, y);
	if(loaded && !actionOnGoing)
	{
		if(shot.possible && shot.cover > 0)
		{
			var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
			var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
		
			var weapon = "";
			
			for(var j = 0; j < weaponSprites.length; j++)
			{	
				if(activeCharacter.character.selectedWeapon.missileImageName == weaponSprites[j].name)
					weaponImage =  weaponSprites[j];
			}
		
			x1 = shot.x;
			y1 = shot.y;
			actionOnGoing = true;
			
			var distX = x1 - (activeCharacter.posX);
			var distY = y1 - (activeCharacter.posY)
		
			var Ipo  = Math.sqrt(distX * distX + distY *distY);		
			var sinA  = distY/Ipo;
			var cosA  = distX/Ipo;
			
			var rotatedSizeX = weaponImage.size * cosA;
			var rotatedSizeY = weaponImage.size * sinA;
			
			distX = x1 - (weaponImage.image.x + rotatedSizeX);
			distY = y1 - (weaponImage.image.y + rotatedSizeY);		
			
			var angleDiff = Math.asin(sinA);
	
			if(cosA < 0 )
			{
				angleDiff = Math.acos(cosA);			
				if(sinA < 0)
					angleDiff = -angleDiff ;	
			}
			
			weaponImage.image.x = activeCharacter.posX * canvasZoom + adjCanvasOffsetX; 
			weaponImage.image.y = activeCharacter.posY * canvasZoom + adjCanvasOffsetY;
			weaponImage.image.rotation = angleDiff * 180 / Math.PI;				
			weaponImage.image.visible = true;
							
			var dist = Math.sqrt(((activeCharacter.posX - shot.x) * (activeCharacter.posX - shot.x)) + ((activeCharacter.posY - shot.y) * (activeCharacter.posY - shot.y)));
			var speed = 0.5;
			var time = dist / speed;
			
			var destX = x1 * canvasZoom + adjCanvasOffsetX;
			var destY = y1 * canvasZoom + adjCanvasOffsetY;
			
			createjs.Tween.get(weaponImage.image).to({x:destX, y:destY}, time).call(rangedAttackComplete, [shot]);	
	
			return true;
		}
		else
			consolleWriter(activeCharacter.character.name, "I can't throw there");
	}
}

function rangedAttackComplete(shot)
{
	actionOnGoing = false;
	weaponImage.image.visible = false;
	weaponImage.image.rotation = 0;
	var attack = doAttack(shot.attacker, shot.defender, "right", shot.cover);
	checkAttackResult(attack);		
	refreshInterface();
	
	checkTeamAttitudeChange("attack", shot.defender.character.team.name, null, null);
}

function meleeAttack(attacker, x, y, opportunityAttackTokens, tokenIndex, callBack)
{
	if(attacker.character.selectedWeapon == null || attacker.character.selectedWeapon.reachType == "melee" || attacker.character.selectedWeapon.reachType == "melee/ranged")
	{
		var attack = calculateMeleeAttack(attacker, x, y);
		if(actionOnGoing == false || opportunityAttackTokens != null)
		{
			if(attack.possible == true && attack.cover > 0)
			{
				actionOnGoing = true;
				
				if(attacker.character.selectedWeapon == null)
				{				
					weaponImage = fistSprite;
				}
				else
				{
					weaponImage = attacker.character.selectedWeapon.weaponSprite;
				}
				
				weaponImage.image.x = attacker.image.x + (attacker.size);
				weaponImage.image.y = attacker.image.y - (attacker.size);
				weaponImage.image.visible = true;
			
				var increasingAngle = 0;		
				weaponImage.image.rotation = -20;
				var totalAngle = 50;
											
				if(opportunityAttackTokens != null)
				{
					if(callBack == "walk")
						createjs.Tween.get(weaponImage.image).to({rotation: totalAngle}, 300).call(doMovement, [opportunityAttackTokens, tokenIndex, attack, "walk"]);	
				
					if(callBack == "run")
						createjs.Tween.get(weaponImage.image).to({rotation: totalAngle}, 300).call(doRun, [opportunityAttackTokens, tokenIndex, attack]);	
					
					if(callBack == "sneak")
						createjs.Tween.get(weaponImage.image).to({rotation: totalAngle}, 300).call(doSneak, [opportunityAttackTokens, tokenIndex, attack]);	
						
					if(callBack == "charge")
						createjs.Tween.get(weaponImage.image).to({rotation: totalAngle}, 300).call(doCharge, [opportunityAttackTokens, tokenIndex, attack]);	
						
				}
				else
					createjs.Tween.get(weaponImage.image).to({rotation: totalAngle}, 300).call(meleeAttackComplete,[attack],true);	
		
				return true;
			}
			else
			if(opportunityAttackTokens != null)
			{
				if(callBack == "walk")
					doWalk([opportunityAttackTokens, tokenIndex]);
				
				if(callBack == "run")
					doRun([opportunityAttackTokens, tokenIndex]);
					
				if(callBack == "sneak")
					doSneak([opportunityAttackTokens, tokenIndex]);
				
				if(callBack == "charge")
					doCharge([opportunityAttackTokens, tokenIndex]);
				
			}
			else
				consolleWriter(attacker.character.name, "It's out of reach");
		}
	}
}

function meleeAttackComplete(attack)
{
	actionOnGoing = false;
	weaponImage.image.visible = false;
	weaponImage.image.rotation = 0;
	
	var selectedHand = attack.attacker.character.selectedHand;
	
	var attackDone = doAttack(attack.attacker, attack.defender, selectedHand, attack.cover);
	
	checkAttackResult(attackDone);
	
	moveStageOnChar(activeCharacter);
	
	if(activeCharacter.type == "NPC")
	{
		AIWaiter();
	}
	
	refreshInterface();
	checkTeamAttitudeChange("attack", attack.defender.character.team.name, null, null);
}

function charge(attacker, x, y)
{
	if(actionOnGoing == false)
	{
		var move = calculateMove(attacker, x, y);
		var dist = Math.sqrt(Math.pow((activeCharacter.posX - move.x), 2) + Math.pow((activeCharacter.posY - move.y),2));
		
		if(move.possible && dist <= (attacker.character.maxMove * meterEquivalence))
		{
			actionOnGoing = true;
			
			var adjPoint = adjustMoveToTarget(activeCharacter.posX, activeCharacter.posY, move.x, move.y)
			move.x = adjPoint.x;
			move.y = adjPoint.y; 

			x1 = move.x - (activeCharacter.size * canvasZoom);
			y1 = move.y - (activeCharacter.size * canvasZoom);
			
			var opportunities = checkOpportunities(activeCharacter, activeCharacter.posX, activeCharacter.posY, x, y);				
			var tokens = new Array(); 
			var tempX = activeCharacter.posX;
			var tempY = activeCharacter.posY;
			
			for(var i =0; i < opportunities.length; i++)
			{
				var token = new Object();
				token.character = activeCharacter;
				
				token.pointA = new Object();
				token.pointB = new Object();
				token.pointA.x = tempX;
				token.pointA.y = tempY;
				token.pointB.x = opportunities[i].posX;
				token.pointB.y = opportunities[i].posY;	
				token.dist = Math.sqrt( Math.pow((token.pointA.x - token.pointB.x), 2) + Math.pow((token.pointA.y - token.pointB.y),2) );
				
				tempX = opportunities[i].posX;
				tempY = opportunities[i].posY;
				
				token.attacker = opportunities[i].player;
				token.nextIndex = i+1;
				
				tokens.push(token);
			}
		
			var token = new Object();
			token.character = activeCharacter;
			
			token.pointA = new Object();
			token.pointB = new Object();
			token.pointA.x = tempX;
			token.pointA.y = tempY;
			token.pointB.x = move.x;
			token.pointB.y = move.y;	
			token.dist = Math.sqrt( Math.pow((token.pointA.x - token.pointB.x), 2) + Math.pow((token.pointA.y - token.pointB.y),2) );
			
			tempX =  move.x;
			tempY =  move.y;
			
			token.nextIndex =  opportunities.length+1;
			token.attacker = null;
			token.chargeAttackX = x;
			token.chargeAttackY = y;
			tokens.push(token);
				
			activeCharacter.character.moveDone = activeCharacter.character.moveDone + dist;
			
			doMovement(tokens, 0, null, 'charge', x, y);	
			
			return true;
			
		}
		else
			consolleWriter(attacker.character.name, "It's out of reach");
		
	}
}

function doChargeAttack(attacker, x, y)
{
	var attack = calculateMeleeAttack(attacker, x, y);
	if(attack.possible)
	{
		activeCharacter.moveCircle.visible = false;
		if(attacker.character.selectedWeapon == null)
		{				
			weaponImage = fistSprite;
		}
		else
		{
			weaponImage = attacker.character.selectedWeapon.weaponSprite;
		}
		
		weaponImage.image.x = activeCharacter.image.x + (activeCharacter.size);
		weaponImage.image.y = activeCharacter.image.y - (activeCharacter.size);
		weaponImage.image.visible = true;
	
		var increasingAngle = 0;		
		weaponImage.image.rotation = -20;
		var totalAngle = 50;

		createjs.Tween.get(weaponImage.image).to({rotation: totalAngle}, 300).call(chargeAttackComplete,[attack]);
	}
}

function chargeAttackComplete(attack)
{
	actionOnGoing = false;
	weaponImage.image.visible = false;
	weaponImage.image.rotation = 0;
	
	activeCharacter.castCircle.x = (activeCharacter.posX * canvasZoom) + canvasOffsetX * canvasZoom;
	activeCharacter.castCircle.y = (activeCharacter.posX * canvasZoom) + canvasOffsetX * canvasZoom;
	activeCharacter.reachCircle.x = (activeCharacter.posX * canvasZoom) + canvasOffsetX * canvasZoom;
	activeCharacter.reachCircle.y = (activeCharacter.posX * canvasZoom) + canvasOffsetX * canvasZoom;
	activeCharacter.moveCircle.x = (activeCharacter.posX * canvasZoom) + canvasOffsetX * canvasZoom;
	activeCharacter.moveCircle.y = (activeCharacter.posY * canvasZoom) + canvasOffsetY * canvasZoom;
	
	var selectedHand = attack.attacker.character.selectedHand;
	
	var attackDone = doAttack(attack.attacker, attack.defender, selectedHand);
	
	checkAttackResult(attackDone);
	
	moveStageOnChar(activeCharacter);
	refreshInterface();
	checkTeamAttitudeChange("attack", attack.defender.character.team.name, null, null);
}

function pushAttack(attacker, x, y)
{
	if(attacker.character.selectedWeapon == null || attacker.character.selectedWeapon.reachType == "melee" || attacker.character.selectedWeapon.reachType == "melee/ranged")
	{
		var attack = calculateMeleeAttack(attacker, x, y);
		
		if(attack.possible == true)
		{
			actionOnGoing = true;
				
			if(attacker.character.selectedWeapon == null)
			{				
				weaponImage = fistSprite;
			}
			else
			{
				weaponImage = attacker.character.selectedWeapon.weaponSprite;
			}
				
			weaponImage.image.x = attacker.image.x + (attacker.size);
			weaponImage.image.y = attacker.image.y - (attacker.size);
			weaponImage.image.visible = true;
		
			var increasingAngle = 0;		
			weaponImage.image.rotation = -20;
			var totalAngle = 50;

			createjs.Tween.get(weaponImage.image).to({rotation: totalAngle}, 300).call(pushAttackComplete,[attack]);	
		
			return true;	
		}
	}
	else
		return false;
}

function pushAttackComplete(attack)
{
	weaponImage.image.visible = false;
	weaponImage.image.rotation = 0;
	
	var selectedHand = attack.attacker.character.selectedHand;
	
	var attackDone = doAttack(attack.attacker, attack.defender, selectedHand);
	
	checkAttackResult(attackDone);
	
	if(attackDone.hit == true)
	{
		 var line  = lineFromPoints(attack.attacker.posX, attack.attacker.posY, attack.defender.posX, attack.defender.posY);
		 var pushX = 0;
		 if(attack.attacker.posX < attack.defender.posX)
		 	pushX = attack.defender.posX + Math.cos(Math.atan(line.m)) * meterEquivalence;
		 else
		 	pushX = attack.defender.posX - Math.cos(Math.atan(line.m)) * meterEquivalence;
			
		var pushY = pushX * line.m + line.q;
		
		var move = calculateMove(attack.defender, pushX, pushY);
		if(move.possible)
		{
			var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
			var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
		
			var speed = 0.5;
					
			var visualizedPosX = move.x * canvasZoom + adjCanvasOffsetX;
			var visualizedPosY = move.y * canvasZoom + adjCanvasOffsetY;
			
			attack.defender.posX = move.x;
			attack.defender.posY = move.y;
								
			var adjustedVisualizedPosX = visualizedPosX - (activeCharacter.size * canvasZoom);
			var adjustedVisualizedPosY = visualizedPosY - (activeCharacter.size * canvasZoom);
		
			createjs.Tween.get(attack.defender.image).to({x:adjustedVisualizedPosX, y:adjustedVisualizedPosY}, (meterEquivalence/speed), Ease.getPowInOut(2.0)).call(pushAttackMoveDone);	
			createjs.Tween.get(attack.defender.deathImage).to({x:adjustedVisualizedPosX, y:adjustedVisualizedPosY}, (meterEquivalence/speed), Ease.getPowInOut(2.0));
			
			createjs.Tween.get(attack.defender.sizeCircle).to({x:visualizedPosX, y:visualizedPosY}, (meterEquivalence/speed), Ease.getPowInOut(2.0));
		}
		else
		{
			actionOnGoing = false;
			checkTeamAttitudeChange("attack", attack.defender.character.team.name, null, null);
		}
	}
	else
	{
		actionOnGoing = false;
		checkTeamAttitudeChange("attack", attack.defender.character.team.name, null, null);
	}
	refreshInterface();
}

function pushAttackMoveDone()
{
	setCharactersSizeCircle();
	actionOnGoing = false;
}

function beginCast(char, spell, x, y)
{
	var dist = 0; 
	var canCast = false;
	if(spell.targetType == "character")
	{
		var shot = calculateThrowArrows(x, y);
		dist = Math.sqrt(Math.pow((char.posX - shot.x), 2) + Math.pow((char.posY - shot.y), 2));
		if(shot.possible && shot.cover > 0 && dist <= (spell.range * meterEquivalence))
		{
			canCast = true;
		}
	}
	if(spell.targetType == "wave")
	{
		dist = Math.sqrt(Math.pow((char.posX - x), 2) + Math.pow((char.posY - y), 2));
		if( dist <= (spell.range * meterEquivalence))
			canCast = true;
	}
	
	if(spell.targetType == "explosion")
	{
		var objTarget = pointInObject(x, y, objects);
		var charTarget = pointInPlayer(x, y, players);
		var cover = checkTrajector(char.posX , char.posY , x, y, char.character.radius, 10, objTarget, charTarget);
		
		dist = Math.sqrt(Math.pow((char.posX - x), 2) + Math.pow((char.posY - y), 2));
		if( dist <= (spell.range * meterEquivalence) && cover > 0)
			canCast = true;
	}
	
	if(canCast == false)
		consolleWriter(activeCharacter.character.name, "I can't cast there");
	else
	{
		var opportunityAttack = notMovingOpportunityAttack(activeCharacter, null, null, "cast", spell, x, y);
		if(!opportunityAttack)
			cast(char, spell, x, y);	
	}
	
	return canCast;
}

function cast(char, spell, x, y)
{
	if(!actionOnGoing)
	{	
		var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
		var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
		
		var weapon = "";
		for(var j = 0; j < spellSprites.length; j++)
		{	
			if(activeCharacter.character.selectedSpell.imageName == spellSprites[j].name)
				weaponImage =  spellSprites[j];
		}
		
		if(spell.targetType == "character")
		{	
			var shot = calculateThrowArrows(x, y);
			actionOnGoing = true;
			
			var distX =  shot.x - (activeCharacter.posX);
			var distY =  shot.y - (activeCharacter.posY);
		
			var Ipo  = Math.sqrt(distX * distX + distY *distY);		
			var sinA  = distY/Ipo;
			var cosA  = distX/Ipo;
			var rotatedSizeX = weaponImage.size * cosA;
			var rotatedSizeY = weaponImage.size * sinA;
			
			distX =  shot.x - (weaponImage.image.x + rotatedSizeX);
			distY =  shot.y - (weaponImage.image.y + rotatedSizeY);		
			
			var angleDiff = Math.asin(sinA);
	
			if(cosA < 0 )
			{
				angleDiff = Math.acos(cosA);			
				if(sinA < 0)
					angleDiff = -angleDiff ;	
			}
			
			weaponImage.image.x = activeCharacter.posX * canvasZoom + adjCanvasOffsetX; 
			weaponImage.image.y = activeCharacter.posY * canvasZoom + adjCanvasOffsetY;
			weaponImage.image.rotation = angleDiff * 180 / Math.PI;				
			weaponImage.image.visible = true;
							
			var dist = Math.sqrt(Math.pow((activeCharacter.posX - shot.x), 2) + Math.pow((activeCharacter.posY - shot.y), 2));
			var speed = 0.5;
			var time = dist / speed;
			
			var destX = shot.x * canvasZoom + adjCanvasOffsetX - rotatedSizeX;
			var destY = shot.y * canvasZoom + adjCanvasOffsetY - rotatedSizeY;
			
			createjs.Tween.get(weaponImage.image).to({x:destX, y:destY}, time).call(castComplete, [char, shot, spell, null, null, null]);	
			return true;
		}
		
		if(spell.targetType == "wave")
		{
			
			var adjPos = setMoveOnDistance(char.posX, char.posY, x, y, spell.effectAreaY * meterEquivalence);
			actionOnGoing = true;

			var distX =  adjPos.x - activeCharacter.posX;
			var distY =  adjPos.y - activeCharacter.posY;
		
			var Ipo  = Math.sqrt(distX * distX + distY *distY);		
			var sinA  = distY/Ipo;
			var cosA  = distX/Ipo;
			var rotatedSizeX = weaponImage.animation.regX * 4 * cosA;
			var rotatedSizeY = weaponImage.animation.regY * 4 * sinA;
			
			var angleDiff = Math.asin(sinA);
	
			if(cosA < 0 )
			{
				angleDiff = Math.acos(cosA);			
				if(sinA < 0)
					angleDiff = -angleDiff ;	
			}
		
			weaponImage.animation.x = activeCharacter.posX * canvasZoom + adjCanvasOffsetX + rotatedSizeX; // * canvasZoom; 
			weaponImage.animation.y = activeCharacter.posY * canvasZoom + adjCanvasOffsetY + rotatedSizeY; // * canvasZoom;
			weaponImage.animation.rotation = angleDiff * 180 / Math.PI;				
			weaponImage.animation.visible = true;
							
			var dist = Math.sqrt(((activeCharacter.posX - adjPos.x) * (activeCharacter.posX - adjPos.x)) + ((activeCharacter.posY - adjPos.y) * (activeCharacter.posY - adjPos.y)));
			var speed = 0.5;
			var time = dist / speed;
			
			var destX = adjPos.x * canvasZoom + adjCanvasOffsetX - rotatedSizeX;
			var destY = adjPos.y * canvasZoom + adjCanvasOffsetY - rotatedSizeY;
			
			//createjs.Tween.get(weaponImage.image).to({x:destX, y:destY}, time).call(castComplete, [char, shot, spell, x, y]);	
			
			weaponImage.animation.play();
			weaponImage.animation.addEventListener("animationend", function(){castComplete(char, shot, spell, x, y, weaponImage.animation)});
			
			return true;
		}
		
		if(spell.targetType == "explosion")
		{
			actionOnGoing = true;
			
			var distX =  x - (activeCharacter.posX);
			var distY =  y - (activeCharacter.posY)
		
			var Ipo  = Math.sqrt(distX * distX + distY *distY);		
			var sinA  = distY/Ipo;
			var cosA  = distX/Ipo;
			var rotatedSizeX = weaponImage.size * cosA;
			var rotatedSizeY = weaponImage.size * sinA;
			
			distX =  x - (weaponImage.image.x + rotatedSizeX);
			distY =  y - (weaponImage.image.y + rotatedSizeY);		
			
			var angleDiff = Math.asin(sinA);
	
			if(cosA < 0 )
			{
				angleDiff = Math.acos(cosA);			
				if(sinA < 0)
					angleDiff = -angleDiff ;	
			}
			
			weaponImage.image.x = char.posX * canvasZoom + adjCanvasOffsetX; 
			weaponImage.image.y = char.posY * canvasZoom + adjCanvasOffsetY;
			weaponImage.image.rotation = angleDiff * 180 / Math.PI;				
			weaponImage.image.visible = true;
							
			var dist = Math.sqrt(Math.pow((activeCharacter.posX - x), 2) + Math.pow((activeCharacter.posY - y), 2));
			var speed = 0.5;
			var time = dist / speed;
			
			var destX = x * canvasZoom + adjCanvasOffsetX;
			var destY = y * canvasZoom + adjCanvasOffsetY;
			
			weaponImage.animation.x = destX;
			weaponImage.animation.y = destY;
			
			createjs.Tween.get(weaponImage.image).to({x:destX, y:destY}, time).call(secondSpellAnimation, [char, shot, spell, x, y, weaponImage.animation]);	
			return true;

		}
	}
}

function secondSpellAnimation(char, shot, spell, x, y, sprite)
{
	weaponImage.image.visible = false;
	sprite.visible = true;
	sprite.play();
	sprite.addEventListener("animationend", function(){castComplete(char, shot, spell, x, y, sprite)});
}

function castComplete(char, shot, spell, x, y, sprite)
{
	if(sprite != null)
	{
		sprite.stop();
		sprite.visible = false;
	}
	
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	actionOnGoing = false;
	weaponImage.image.visible = false;
	var tsPassed = false;
	spell.used = true;
	
	var message = "Cast " + spell.name;	
	consolleWriter(char.character.name, message);
	
	if(spell.targetType == "character")
	{
		if (spell.tsType == "reflex")
		{
			tsPassed =  shot.defender.character.tsRefRoll() >= (10 + spell.level + char.character.inteMod) 
		}
		
		if (spell.tsType == "fortitude")
		{
			tsPassed =  shot.defender.character.tsForRoll() >= (10 + spell.level + char.character.inteMod) 
		}
		
		if (spell.tsType == "will")
		{
			tsPassed =  shot.defender.character.tsWillRoll() >= (10 + spell.level + char.character.inteMod) 
		}
		
		message = " Hit by " + spell.name; 
		
		if(spell.effectType == "damage")
		{
			var damage = spell.damage();
			if (tsPassed)
				damage = Math.floor(damage / 2);
				
			 shot.defender.character.hp =  shot.defender.character.hp - damage;
			if(spell.tsType != "no")
			{
				if(tsPassed)
					message = message + ", " + shot.defender.character.name + " saves"
				else
					message = message + ", " + shot.defender.character.name + " doesn't save"
			}
			
			message = message + ", damage: " + damage;
			consolleWriter(shot.defender.character.name, message);
		}
		
		if(spell.effectType == "sleep")
		{
			if(tsPassed)
					message = message + ", " + shot.defender.character.name + " saves"
				else
					message = message + ", " + shot.defender.character.name + " doesn't save"
					
			consolleWriter(shot.defender.character.name, message);	
			
			if(!tsPassed)
			{
				var damage = spell.damage();
				shot.defender.character.sleep = damage;
				message = message + ", falls asleep for " + damage + " rounds";
				consolleWriter(shot.defender.character.name, message);
			}
		}
		
		checkTeamAttitudeChange("attack", shot.defender.character.team.name, null, null);
		checkAlive(shot.defender);
	}
	
	if(spell.targetType == "wave")
	{
		var adjPos = setMoveOnDistance(char.posX, char.posY, x, y, spell.effectAreaY * meterEquivalence);
			
		var line = lineFromPoints(char.posX, char.posY, adjPos.x, adjPos.y);
		var m1 = -(1/line.m);
		var q1 = 1/line.m * char.posX + char.posY;

		var aX;
		if(x > char.posX)
			aX= char.posX - 20;
		else
			aX= char.posX + 20;
			
		var aY = aX * m1 + q1;
		var adj = setMoveOnDistance(char.posX, char.posY, aX, aY, ((spell.effectAreaX / 2) * meterEquivalence));
		aX = adj.x;
		aY = adj.y;
		
		var bX;
		if(x > char.posX)
			bX= char.posX + 20;
		else
			bX= char.posX - 20;
			
		var bY = bX * m1 + q1;
		adj = setMoveOnDistance(char.posX, char.posY, bX, bY, ((spell.effectAreaX / 2) * meterEquivalence));
		bX = adj.x;
		bY = adj.y;
		
		var m2 = line.m;
		var q2 = -line.m * bX + bY;
		
		var cX;
		if(x > char.posX)
			cX= bX + 20;
		else
			cX= bX - 20;
		
		var cY = cX * m2 + q2;
		adj = setMoveOnDistance(bX, bY, cX, cY, ((spell.effectAreaY) * meterEquivalence));
		cX = adj.x;
		cY = adj.y;
		
		for(var i = 1; i < players.length; i++)
		{
			var objTarget = pointInObject(x, y, objects);
			var charTarget = pointInPlayer(x, y, players);
			var cover = checkTrajector(char.posX , char.posY , x, y, char.character.radius, 10, objTarget, charTarget);
			var coverBonus = 0
			if(cover >0)
				coverBonus = Math.ceil((1 - cover) * 5);
			
			if (players[i].character.alive && characterInRect(players[i], aX, aY, bX, bY, cX, cY) && cover > 0)
			{
				var ts = 0;
				tsPassed = false;
				if (spell.tsType == "reflex")
				{
					ts = players[i].character.tsRefRoll()
					tsPassed = ts >= (10 + spell.level + char.character.inteMod - coverBonus) 
				}
				
				if (spell.tsType == "fortitude")
				{
					ts = players[i].character.tsForRoll()
					tsPassed =  ts >= (10 + spell.level + char.character.inteMod - coverBonus) 
				}
				
				if (spell.tsType == "will")
				{
					ts = players[i].character.tsWillRoll()
					tsPassed = ts  >= (10 + spell.level + char.character.inteMod - coverBonus) 
				}
				
				var damage = spell.damage();
				if (tsPassed)
					damage = Math.floor(damage / 2);
					
				players[i].character.hp = players[i].character.hp - damage;
				
				message = " Hit by " + spell.name; 
				if(spell.tsType != "no")
				{
					if(tsPassed)
						message = message + ", ST: " + ts + ", cover: " + coverBonus + ", " + players[i].character.name + " saves"
					else
						message = message + ", ST: " + ts + ", cover: " + coverBonus + ", " + players[i].character.name + " doesn't save"
				}
				
				message = message + ", damage: " + damage;
				consolleWriter(players[i].character.name, message);
					
				checkTeamAttitudeChange("attack", players[i].character.team.name, null, null);
				checkAlive(players[i]);
			}
		}
	}
	
	if(spell.targetType == "explosion")
	{
		for(var i = 0; i < players.length; i++)
		{
			var dist =  Math.sqrt(Math.pow((players[i].posX - x), 2) + Math.pow((players[i].posY - y), 2));
			if (players[i].character.alive && dist <= spell.effectAreaX * meterEquivalence)
			{
				var ts = 0;
				tsPassed = false;
				if (spell.tsType == "reflex")
				{
					ts = players[i].character.tsRefRoll()
					tsPassed = ts >= (10 + spell.level + char.character.inteMod - coverBonus) 
				}
				
				if (spell.tsType == "fortitude")
				{
					ts = players[i].character.tsForRoll()
					tsPassed =  ts >= (10 + spell.level + char.character.inteMod - coverBonus) 
				}
				
				if (spell.tsType == "will")
				{
					ts = players[i].character.tsWillRoll()
					tsPassed = ts  >= (10 + spell.level + char.character.inteMod - coverBonus) 
				}
				
				var damage = spell.damage();
				if (tsPassed)
					damage = Math.floor(damage / 2);
					
				players[i].character.hp = players[i].character.hp - damage;
				
				message = " Hit by " + spell.name; 
				if(spell.tsType != "no")
				{
					if(tsPassed)
						message = message + ", " + players[i].character.name + " saves"
					else
						message = message + ", " + players[i].character.name + " doesn't save"
				}
				
				message = message + ", damage: " + damage;
				consolleWriter(players[i].character.name, message);
					
				checkTeamAttitudeChange("attack", players[i].character.team.name, null, null);
				checkAlive(players[i]);
			}
		}
	}
	
	refreshInterface();
}

function checkOpportunities(character, startX, startY,  goalX, goalY)
{
	var throwLine = lineFromPoints(startX, startY, goalX, goalY);
	
	var enemies = new Array();
	for(var i=1; i<players.length; i++)
	{
		if(players[i].character.alive == true && players[i].character.sleep == false && players[i].character.selectedWeapon != null && players[i].character.selectedWeapon.reachType == "melee" && players[i].character.team != character.team)
		{
			var enemyTeam = false;
			for(var j = 0; j < players[i].character.team.teamRelations.length; j++)
			{
				if(players[i].character.team.teamRelations[j].team == character.character.team.name && players[i].character.team.teamRelations[j].attitude == "enemy")
				{
					enemyTeam = true;
					break;
				}
			}
			if(enemyTeam)
				enemies.push(players[i]);
		}
	}
	
	var opp = checkCharacterOpportunity(throwLine, enemies);
	
	return opp;
}

function endTurn()
{	
	if(actionOnGoing == false && gameOver == false)
	{
		orderChar = new Array();
		
		for(var i = 1; i < players.length; i++)
		{
			orderChar.push(players[i]);
		}
		orderChar.push(players[0]);
		
		players = orderChar;
	
	    activeCharacter = players[0];
		
		if(activeCharacter == roundSetter)
		{
			increaseRound();	
			checkCurrentRoundEvents();
			roundSetter =  players[0];
		}
		
		activeCharacter = players[0];
			
		activeCharacter.character.minorActionDone = false;
		activeCharacter.character.moveActionDone = false;
		activeCharacter.character.standardActionDone = false;
		activeCharacter.character.moveDone = 0;
		activeCharacter.character.opportunityAttackRecived = new Array();
		activeCharacter.onGoingAction = null;
		
		activeCharacter.moveCircle.graphics.clear();
		var moveSize = activeCharacter.character.maxMove * 100 ;
		activeCharacter.moveCircle.graphics.setStrokeStyle(1).beginFill("green").drawCircle(0, 0, moveSize).endStroke();
			
		moveStageOnChar(activeCharacter);
		
		if (activeCharacter.character.alive == false)
			endTurn();
		else
		{
			//activeCharacter.activeCircle.visible = true;
			setCharactersSizeCircle();
		
			if(checkCharacterAffections(activeCharacter) == false)
			{
				endTurn();
			}
			else
			{
				if (activeCharacter.type == "NPC")
				{
					for(var i = 0; i < players.length; i++)
					{
						players[i].moveCircle.visible = false;
						players[i].reachCircle.visible = false;
					}
					AIWaiter();
					
				}
				else
				{
					checkTalkingSituation(null);
					var selectedAction = activeCharacter.character.selectedAction
					selectAttackStyle(activeCharacter.character.selectedAttackStyle);
					selectMoveStyle(activeCharacter.character.selectedMoveStyle);
					selectActionButton(selectedAction);	
				}
			}
		}
					
		refreshInterface();
	}
}

function doAttack(attacker, defender, hand, cover)
{
	var coverBonus = 0
	if(cover >0)
		coverBonus = Math.ceil((1 - cover) * 5);
		
	var attack = new Object();
	attack.attacker = attacker;
	attack.defender = defender;
	attack.toHit = attacker.character.hit(hand);
	attack.def = defender.character.ac();
	attack.roll = rollD20();
	attack.cover = coverBonus;
	attack.hit = (attacker.character.hit() + attack.roll - coverBonus) >= attack.def;
	return attack;
}

function doDamage(attacker, defender)
{
	var damage = attacker.character.damage();	
	defender.character.hp = defender.character.hp - damage;
		
	return damage;
}

function notMovingOpportunityAttack(character, triggerObject, targetObject, onGoingAction, spell, x, y)
{
	for(var i = 0; i < players.length; i++)
	{
		for(var j = 0; j < players[i].character.team.teamRelations.length; j++)
		{
			if(players[i].character.team.teamRelations[j].team == character.character.team.name)
			{
				if(players[i].character.team.teamRelations[j].attitude == "enemy")
				{
					if(players[i].character.alive == true && players[i].character.selectedWeapon != null && players[i].character.selectedWeapon.reachType == "melee" )
					{
						var dist = Math.sqrt(Math.pow((character.posX - players[i].posX), 2) + Math.pow((character.posY - players[i].posY), 2));
						
						if(dist < character.character.radius + players[i].character.reach)
						{
							var attack = calculateMeleeAttack(players[i], character.posX, character.posY);
							if(attack.possible && attack.cover > 0)
							{
							    weaponImage = attack.attacker.character.selectedWeapon.weaponSprite;

								weaponImage.image.x = attack.attacker.image.x + (attack.attacker.size);
								weaponImage.image.y = attack.attacker.image.y - (attack.attacker.size);
								weaponImage.image.visible = true;
							
								var increasingAngle = 0;		
								weaponImage.image.rotation = -20;
								var totalAngle = 50;
								
								document.getElementById('useAndTalk').style.visibility = 'hidden'; 
								document.getElementById('useAndTalkActions').style.display = 'none';
								document.getElementById('useAndTalkActionsTitle').style.display = 'none';
								windowOpen = false;
								
								createjs.Tween.get(weaponImage.image).to({rotation: totalAngle}, 300).call(notMovingOpportunityAttackComplete,[character, attack, triggerObject, targetObject, onGoingAction, spell, x, y],true);	
								
								return true;
							}
						}				
					}
				}
			}
		}
	}
	
	return false;
}
	
function notMovingOpportunityAttackComplete(character, attack, triggerObject, targetObject, onGoingAction, spell, x, y)
{
	actionOnGoing = false;
	weaponImage.image.visible = false;
	weaponImage.image.rotation = 0;
	
	var selectedHand = attack.attacker.character.selectedHand;
	var attackDone = doAttack(attack.attacker, attack.defender, selectedHand);
	
	checkAttackResult(attackDone);
	
	if(character.character.alive && onGoingAction == "pickUp")
	{
		pickUp(triggerObject, targetObject);
	}
	
	if(character.character.alive && onGoingAction == "cast")
	{
		cast(character, spell, x, y);
	}
}

function checkCharacterAffections(char)
{
	var canPlay = true;
	if(char.character.sleep > 0)
	{
		char.character.sleep-- ;

		message = "is sleeping, he will sleep for " + char.character.sleep + " more rounds" ;
		consolleWriter(char.character.name, message);
		canPlay = false;
		
	}
	
	return canPlay;
}

function setActionDone(actionType)
{
	if(actionType == 'minor')
	{
		if (activeCharacter.character.minorActionDone == false)
			activeCharacter.character.minorActionDone = true;
		else
		{
			if(activeCharacter.character.moveActionDone == false)
				activeCharacter.character.moveActionDone = true;
			else
				activeCharacter.character.standardActionDone = true;
		}
	}
	if(actionType == 'move')
	{
		if(activeCharacter.character.moveActionDone == false)
			activeCharacter.character.moveActionDone = true;
		else
			activeCharacter.character.standardActionDone = true;
		
	}
	if(actionType == 'attack')
	{
		activeCharacter.character.standardActionDone = true;
	}
	if(actionType == 'full')
	{
		activeCharacter.character.minorActionDone = true;
		activeCharacter.character.moveActionDone = true;
		activeCharacter.character.standardActionDone = true;
	}
}

