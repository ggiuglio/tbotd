// JavaScript Document    


function calculateThrowArrows(x, y)
{
	var shot = new Object();
	var otherCharacters = new Array();
	
	shot.cover = 0;
	shot.possible = false;
	for(var i =1; i < players.length; i++ )
	{
		if(players[i].id != activeCharacter.id && players[i].character.alive  == true)
		{
			if(Math.sqrt((players[i].posX - x) * (players[i].posX - x)  + (players[i].posY - y) * (players[i].posY - y)  ) <= players[i].character.radius)
			{
				shot.defender = players[i];
				shot.attacker = activeCharacter;
				shot.possible = true;
				shot.x = players[i].posX;
				shot.y = players[i].posY;
				for(var j = 0; j < players.length; j ++)
				{
					if(players[j].id != players[i].id && players[j].id != activeCharacter.id)
						otherCharacters.push(players[j]);
				}
				shot.cover = checkTrajector(activeCharacter.posX, activeCharacter.posY, shot.x, shot.y, activeCharacter.character.radius, players[i].character.radius, null, players[i]);
				
				return shot;
			}
		}

	}
	return shot;
}

function calculateMeleeAttack(attacker, x, y)
{
	var attack = new Object();
	var otherCharacters = new Array();
	attack.cover = 0;
	attack.possible = false;
	for(var i =0; i < players.length; i++ )
	{
		if(players[i].id != attacker.id && players[i].character.alive == true)
		{
			if(Math.sqrt((players[i].posX - x) * (players[i].posX - x)  + (players[i].posY - y) * (players[i].posY - y)  ) <= players[i].character.radius)
			{
				attack.defender = players[i];
				attack.attacker = attacker;
				attack.possible = true;
				attack.x = players[i].posX;
				attack.y = players[i].posY;
				for(var j = 0; j < players.length; j ++)
				{
					if(players[j].id != players[i].id && players[j].id != activeCharacter.id)
						otherCharacters.push(players[j]);
				}
				attack.cover = checkTrajector(attacker.posX, attacker.posY, attack.x, attack.y, attacker.character.radius, players[i].character.radius, null, players[i]);
				if( Math.sqrt(((attack.x - attacker.posX) * (attack.x- attacker.posX)) + ((attack.y - attacker.posY) * (attack.y - attacker.posY))) > attacker.character.radius + attacker.character.reach +  players[i].character.radius)
					attack.possible = false;
				
				
				return attack;
			}
		}

	}
	return attack;
}

function checkTrajector(xA, yA, xB, yB, radiusA, radiusB, objTarget, charTarget)
{	
	if(yA == yB)
	yB = yB + 1;
	
	var throwLine = lineFromPoints(xA, yA, xB, yB);
	
	var checkedLines = new Array();
	checkedLines.push(throwLine);
	
	var diameterA = calculateDiameterPoints(throwLine, xB, yB, xA, yA, radiusA);
	var diameterB = calculateDiameterPoints(throwLine, xA, yA, xB, yB, radiusB);
	
	var otherCharacters = new Array();
	for(var i = 0; i < players.length; i++)
	{
		if (players[i].id != activeCharacter.id)
			otherCharacters.push(players[i]);
	}
	
	for(var i = 0; i < diameterA.length; i ++)
	{
		for(var j = 0; j < diameterB.length; j ++)
		{
			var line = lineFromPoints(diameterA[i].x, diameterA[i].y, diameterB[j].x, diameterB[j].y);			
			checkedLines.push(line);
		}
	}
	
	var cover = 0;
	for(var i = 0; i < checkedLines.length; i ++)
	{		
		var lineCover = 0;
		lineCover = lineIntersecatesWalls(checkedLines[i], walls);
		lineCover = lineCover + lineIntersecatesCharacters(checkedLines[i], otherCharacters, charTarget) 
		lineCover = lineCover + lineIntersecateObjects(checkedLines[i], objects, objTarget);
		
		if (lineCover > 1)
			lineCover = 1;
		
		cover = cover + lineCover;
	}
	
	cover = cover/checkedLines.length;
	
	return 1 -(cover);
}

function drawShotLine(xA, yA, xB, yB)
{
	if(showDebugLines == true)
	{
		var redLine = new createjs.Shape();			
		redLine.graphics.moveTo(xA, yA);	
		redLine.graphics.setStrokeStyle(1).beginStroke("red").lineTo(xB, yB).endStroke();

		backgroundContainer.addChild(redLine);
	}
}

function lineFromPoints(xA, yA, xB, yB)
{
	var line = new Object();
	var det = (xB - xA);
	if(det == 0)
		det = 0.01;
	var ponderateSlop = (yB- yA) / det;
	if(ponderateSlop == 0)
		ponderateSlop = 0.01;
	
	line.m = ponderateSlop;
	line.q = yA -(line.m * xA);
	line.pointA = new Object();
	line.pointB = new Object();
	line.pointA.x = xA;
	line.pointA.y = yA;
	line.pointB.x = xB;
	line.pointB.y = yB;
	
	return line;
}

function calculateDiameterPoints(line, xA, yA, xB, yB, radius)
{
	var checkPoints = new Array();	
	
	var m = -1 / line.m;
	var q = yB - (m * xB);
	
	var d = Math.sqrt((xB - xA) * (xB - xA) + (yB - yA) * (yB - yA));
	
	var alfa = Math.acos((yB - yA) / d);
	var diameterX = Math.cos(alfa) * radius;
	var pointA;
	pointA = new Object();
	pointA.x = xB + diameterX;   // todo calcolare il 50
	pointA.y = pointA.x * m + q;

	
	pointB = new Object();
	pointB.x = xB - diameterX; // todo calcolare il 50
	pointB.y = pointB.x * m + q;
	
	//var da = new createjs.Shape();			
	//da.graphics.moveTo(pointA.x, pointA.y);	
	//da.graphics.setStrokeStyle(1).beginStroke("red").lineTo(pointB.x, pointB.y);
	  
	checkPoints.push(pointA);
	checkPoints.push(pointB);
	
	return checkPoints;
}

function lineIntersecatesWalls(line, walls)
{
	for(var i = 0; i < walls.length; i++)
	{
		var wallLine = lineFromPoints(walls[i][0], walls[i][1], walls[i][2], walls[i][3]);
		
		if(line.m == wallLine.m)
			return 0;
		
		if(walls[i][0] == walls[i][2])
		{
			var intY = walls[i][0] * line.m + line.q;
			if (((line.pointA.x <= walls[i][0] && walls[i][0] <= line.pointB.x ) || (line.pointB.x <= walls[i][0] && walls[i][0] <= line.pointA.x ))
				&&( (walls[i][1] <= intY && intY <= walls[i][3]) || (walls[i][3] <= intY && intY <= walls[i][1]) )
				)
				return 1;
		}
		else
		{				
			var A1 = line.pointB.y - line.pointA.y;
			var B1 = line.pointB.x - line.pointA.x;
			var C1 = A1 * line.pointA.x + B1* line.pointA.y;

			//Line2
			var A2 =  walls[i][3] -  walls[i][1];
			var B2 =  walls[i][2] -  walls[i][0];
			var C2 = A2 * walls[i][0] + B2 * walls[i][1];

			var det = A1*B2 - A2*B1;
			
			var interceptionX =  (line.q - wallLine.q) / (wallLine.m - line.m);
			var interceptionY = interceptionX * line.m + line.q;

			if (((walls[i][0] < interceptionX && interceptionX < walls[i][2]) || (walls[i][2] < interceptionX && interceptionX < walls[i][0]))  
				&& ((line.pointB.x >= interceptionX && interceptionX >= line.pointA.x ) ||(line.pointB.x  <= interceptionX && interceptionX <=line.pointA.x ))
				)
					return 1;
		}		
	}
	return 0;
}

function lineIntersecatesCharacters(line, players, charTarget)
{
	var cover = 0;
	for(var i = 0; i < players.length; i++)
	{
	if( players[i].character.alive && (charTarget == null || players[i] != charTarget))
		{
			if( Math.sqrt(Math.pow((line.pointB.x - players[i].posX), 2) + Math.pow((line.pointB.y - players[i].posY), 2)) < players[i].character.radius)
			{
				cover = cover + 0.2;
			}
			else
			{
				var x = players[i].posX;
				var y = players[i].posY;
				var perpendicularDistance = new Object();
				perpendicularDistance.m = -(1 / line.m);
				perpendicularDistance.q = y - (perpendicularDistance.m * x);
				var interceptionX = (perpendicularDistance.q - line.q) / (line.m - perpendicularDistance.m) ;
				var interceptionY = interceptionX * perpendicularDistance.m + perpendicularDistance.q;
		
				var isInterceprionInLine = ((( line.pointA.x < interceptionX && interceptionX < line.pointB.x) || (line.pointB.x < interceptionX && interceptionX < line.pointA.x))  &&
						((line.pointA.y < interceptionY && interceptionY < line.pointB.y ) || (line.pointB.y < interceptionY && interceptionY < line.pointA.y)) );
		
				var distanceFromChar = Math.sqrt((interceptionX - x) * (interceptionX - x) + (interceptionY - y) * (interceptionY - y) );
		
				// il diametro del personaggio che ostrisce la traiettoria è stato artificialmente dimezzato pre rendere più libero il movimento
				if(distanceFromChar < players[i].character.radius/2 && isInterceprionInLine)
				{
					cover = cover + 0.2;
				}
			}
		}
	}
	
	if(cover > 1)
		cover = 1;
		
	return cover;
}

function checkCharacterOpportunity(line, players)
{
	var opportunities = new Array();
	
	for(var i = 0; i < players.length; i++)
	{
		var x = players[i].posX;
		var y = players[i].posY;
		
		var startDistance = Math.sqrt(Math.pow((line.pointA.x - x), 2) + Math.pow((line.pointA.y - y), 2) );
		var endDistance = Math.sqrt(Math.pow((line.pointB.x - x), 2) + Math.pow((line.pointB.y - y), 2) );
		
		var attackAlreadyDone = false;
			
		for(var j = 0; j< activeCharacter.character.opportunityAttackRecived.length; j++)
		{
			if(activeCharacter.character.opportunityAttackRecived[j] == players[i].id)
			{
				attackAlreadyDone = true;
				break;
			}
		}
		
		if( attackAlreadyDone == false)
		{
			if(startDistance > players[i].character.radius + players[i].character.reach && endDistance > players[i].character.radius + players[i].character.reach)
			{
				var perpendicularDistance = new Object();
				perpendicularDistance.m = -(1 / line.m);
				perpendicularDistance.q = y - (perpendicularDistance.m * x);
				var interceptionX = (perpendicularDistance.q - line.q) / (line.m - perpendicularDistance.m) ;
				var interceptionY = interceptionX * perpendicularDistance.m + perpendicularDistance.q;			
			
				var isInterceprionInLine = ((( line.pointA.x < interceptionX && interceptionX < line.pointB.x) || (line.pointB.x < interceptionX && interceptionX < line.pointA.x))  &&
						((line.pointA.y < interceptionY && interceptionY < line.pointB.y ) || (line.pointB.y < interceptionY && interceptionY < line.pointA.y)) );
		
				var distanceFromChar = Math.sqrt(Math.pow((interceptionX - x), 2) + Math.pow((interceptionY - y), 2));
		
				if(distanceFromChar < players[i].character.radius + players[i].character.reach  && isInterceprionInLine)
				{
					var opportunity = new Object();
					opportunity.player = players[i];
					opportunity.posX = interceptionX;
					opportunity.posY = interceptionY;
					
					opportunities.push(opportunity);
					activeCharacter.character.opportunityAttackRecived.push(players[i].id);
				}
			}
			else if(startDistance < players[i].character.radius + players[i].character.reach && endDistance > players[i].character.radius + players[i].character.reach)
			{
				var opportunity = new Object();
				opportunity.player = players[i];
				opportunity.posX = line.pointA.x;
				opportunity.posY = line.pointA.y;
					
				opportunities.push(opportunity);
				activeCharacter.character.opportunityAttackRecived.push(players[i].id);
			}
		}
	}
	return opportunities;
}

function lineIntersecatesRoundObject(line, object)
{
	var x = object.posX;
	var y = object.posY;
	var perpendicularDistance = new Object();
	perpendicularDistance.m = -(1 / line.m);
	perpendicularDistance.q = y - (perpendicularDistance.m * x);
	var interceptionX = (perpendicularDistance.q - line.q) / (line.m - perpendicularDistance.m) ;
	var interceptionY = interceptionX * perpendicularDistance.m + perpendicularDistance.q;
	
	var cover = 0;

	var isInterceprionInLine = ((( line.pointA.x < interceptionX && interceptionX < line.pointB.x) || (line.pointB.x < interceptionX && interceptionX < line.pointA.x)) && ((line.pointA.y < interceptionY && interceptionY < line.pointB.y ) || (line.pointB.y < interceptionY && interceptionY < line.pointA.y)) );

	var distanceFromChar = Math.sqrt((interceptionX - x) * (interceptionX - x) + (interceptionY - y) * (interceptionY - y) );


	// il raggio dell'oggettp che ostrisce la traiettoria è stato artificialmente dimezzato pre rendere più libero il movimento
	if(distanceFromChar < object.radius/2 && isInterceprionInLine)
	{
		cover = cover + object.cover;
	}
	
	if(cover > 1)
		cover = 1;
		
	return cover;
}

function lineIntersecateObjects(line, objects, objTarget)
{
	var cover = 0;
	for(var i=0; i<objects.length; i++)
	{
		if(objects[i] != objTarget)
		{
			if(objects[i].shape == "rectangular")
			{
				var borders = getObjectBorders(objects[i]);
				var intersection = lineIntersecatesWalls(line, borders);
				
				cover = cover + intersection * objects[i].cover;
			}
			
			if(objects[i].shape == "circular" && (objTarget != objects[i]))
			{
				cover = cover + lineIntersecatesRoundObject(line, objects[i]);
			}
		}
	}
	
	if (cover > 1)
		cover = 1;
	
	
	return cover;
}

function calculateMove(character, x, y)
{
	var objBorders = new Array();
	for(var i= 0; i < objects.length; i++)
	{
		if (objects[i].cover > 0)
		{
			var bdr = getObjectBorders(objects[i]);
			
			for(var j= 0; j < bdr.length; j++)
				objBorders.push(bdr[j]);	
		}
	}
	
	var objTarget = pointInObject(x, y, objects);
	var charTarget = pointInPlayer(x, y, players);
	
	if(objTarget != null && objTarget.shape == "rectangular")
		objTarget = null;
	
	var	adjPointOnWalls = adjustMoveOnWalls(character.posX, character.posY, x,y, character.character.radius, walls);
	var adjPointOnObjs = adjustMoveOnWalls(character.posX, character.posY, x,y, character.character.radius, objBorders);
	
	if(Math.abs(x - adjPointOnWalls.x) >  Math.abs(x - adjPointOnObjs.x) )
		x = adjPointOnWalls.x;
	else
		x = adjPointOnObjs.x;
			
	if(Math.abs(y - adjPointOnWalls.y) >  Math.abs(y - adjPointOnObjs.y) )
		y = adjPointOnWalls.y;
	else
		y = adjPointOnObjs.y;
	
	var cover = checkTrajector(character.posX, character.posY, x, y, character.character.radius, character.character.radius, objTarget, charTarget);
	var movement = new Object();
	
	movement.x = x;
	movement.y = y;
	
	if(cover < 1)
	{
		movement.possible = false;
	}
	else
	{
		movement.possible = true;
	}
	
	return movement;
}

function adjustMoveToTarget(startX, stratY, x, y)
{
	var adjPoint = new Object();
	adjPoint.x = x;
	adjPoint.y = y;
	
	for(var i=1; i < players.length; i++ )
	{
		if(players[i].character.alive && Math.sqrt(Math.pow((players[i].posX - x), 2) + Math.pow((players[i].posY - y), 2)) <= (players[i].character.radius + activeCharacter.character.radius ))
		{								
			adjPoint = adjustMoveOnCircle(startX, stratY, players[i].posX, players[i].posY, activeCharacter.character.radius, players[i].character.radius);
			break;
		}
	}	
	
	for(var i=1; i < objects.length; i++ )
	{
		if(Math.sqrt((objects[i].posX - x) * (objects[i].posX - x)  + (objects[i].posY - y) * (objects[i].posY - y)  ) <= (objects[i].radius + activeCharacter.character.radius ))
		{	
			if(objects[i].shape == "circular")
			{
				adjPoint = adjustMoveOnCircle(startX, stratY, objects[i].posX, objects[i].posY, activeCharacter.character.radius, objects[i].radius);
				break;
			}
		}
	}
	
	return adjPoint;
}

function adjustMoveOnCircle(charX, charY, x, y, charRadius, circleRadius)
{
	var line = lineFromPoints(charX, charY, x, y);
	var d = Math.sqrt((x - charX) * (x - charX) + (y - charY) * (y - charY));
	var alfa = Math.acos((y - charY) / (d));

	var xAdjustment =  Math.sin(alfa) * (circleRadius + charRadius);
	var adjustedPoint = new Object();
	
	if(charX >= x)
		adjustedPoint.x =  x + xAdjustment;
	else
		adjustedPoint.x =  x - xAdjustment;
	
	
	adjustedPoint.y = line.m * adjustedPoint.x + line.q;

	return adjustedPoint;
}

function adjustMoveOnWalls(charX, charY, x, y, charRadius, walls)
{
	var oldx = x;
	var oldy = y;
	charRadius = charRadius + 5;
	var adjPos = new Object();
	adjPos.x = x;
	adjPos.y = y;
	var line = lineFromPoints(charX, charY, x, y);
	
	for(var i = 0; i < walls.length; i++)
	{
		if(walls[i][0] == walls[i][2] || walls[i][1] == walls[i][3])
		{
			if(walls[i][0] == walls[i][2])
			{
				if((walls[i][1] < y && y < walls[i][3]) || (walls[i][3] < y && y < walls[i][1]))
				{
					if(Math.abs(walls[i][0] - x) < charRadius)
					{
						if(charX > x)
							x = walls[i][0] + charRadius;
						else
							x = walls[i][0] - charRadius;
					}
				}
				else
				{
					var interceptionX = walls[i][0];
					var interceptionY = 0;
					if(walls[i][1] < y && y > walls[i][3])
					{
						if( walls[i][1] > walls[i][3])
							interceptionY = walls[i][1];
						else
							interceptionY = walls[i][3];
					}
					else
					{
						if( walls[i][1] > walls[i][3])
							interceptionY = walls[i][3];
						else
							interceptionY = walls[i][1];
					}
					
					var distanceFromEdge = Math.sqrt((interceptionX - x) * (interceptionX - x) + (interceptionY - y) * (interceptionY - y) );
					
					while(distanceFromEdge < charRadius)
					{
						if(Math.abs(charX - x) < 0.1)
							x = charX;
						else
						{
							if(charX > x)
								x = x + 0.1;
							else
								x = x - 0.1;
						}
						y = line.m * x + line.q;
						distanceFromEdge = Math.sqrt((interceptionX - x) * (interceptionX - x) + (interceptionY - y) * (interceptionY - y) );
					}
				}
			}
			
			if( walls[i][1] == walls[i][3])
			{
				if((walls[i][0] < x && x < walls[i][2]) || (walls[i][2] < x && x < walls[i][0]))
				{
					if(Math.abs(walls[i][1] - y) < charRadius)
					{
						if(charY > y)
							y = walls[i][1] + charRadius;
						else
							y = walls[i][1] - charRadius;
					}
				}
				else
				{
					var interceptionY = walls[i][1];
					var interceptionX = 0;
					if(walls[i][0] < y && y > walls[i][2])
					{
						if( walls[i][0] > walls[i][2])
							interceptionX = walls[i][0];
						else
							interceptionX = walls[i][2];
					}
					else
					{
						if( walls[i][0] > walls[i][2])
							interceptionX = walls[i][2];
						else
							interceptionX = walls[i][0];
					}
					
					var distanceFromEdge = Math.sqrt((interceptionX - x) * (interceptionX - x) + (interceptionY - y) * (interceptionY - y) );
					
					while(distanceFromEdge < charRadius)
					{
						if(Math.abs(charX - x) < 0.1)
							x = charX;
						else
						{
							if(charX > x)
								x = x + 0.1;
							else
								x = x - 0.1;
						}
						y = line.m * x + line.q;
						distanceFromEdge = Math.sqrt((interceptionX - x) * (interceptionX - x) + (interceptionY - y) * (interceptionY - y) );
					}
				}
			}
		}
		else
		{
			var wallLine = lineFromPoints(walls[i][0], walls[i][1], walls[i][2], walls[i][3]);
			var perpendicularDistance = new Object();
			perpendicularDistance.m = -(1 / wallLine.m);
			perpendicularDistance.q = y - (perpendicularDistance.m * x);
			var interceptionX = (perpendicularDistance.q - wallLine.q) / (wallLine.m - perpendicularDistance.m) ;
			var interceptionY = interceptionX * perpendicularDistance.m + perpendicularDistance.q;
			
			var isInterceprionInLine = ((( walls[i][0] < interceptionX && interceptionX < walls[i][2]) || (walls[i][2] < interceptionX && interceptionX < walls[i][0]))  &&
				((walls[i][1] < interceptionY && interceptionY < walls[i][3]) || (walls[i][3] < interceptionY && interceptionY < walls[i][1])) );
				
			if(!isInterceprionInLine)
			{
				if(Math.abs(interceptionX - walls[i][0]) < Math.abs(interceptionX - walls[i][2]))
				{
					interceptionX = walls[i][0];
					interceptionY = walls[i][1]
				}
				else
				{
					interceptionX = walls[i][2];
					interceptionY = walls[i][3]
				}
			}
			
			var distanceFromWall = Math.sqrt((interceptionX - x) * (interceptionX - x) + (interceptionY - y) * (interceptionY - y) );

			while(distanceFromWall < charRadius)
			{
				if(Math.abs(charX - x) < 0.1)
					x = charX;
				else
				{
					if(charX > x)
						x = x + 0.1;
					else
						x = x - 0.1;
				}
				y = line.m * x + line.q;
				
				perpendicularDistance.m = -(1 / wallLine.m);
				perpendicularDistance.q = y - (perpendicularDistance.m * x);
				interceptionX = (perpendicularDistance.q - wallLine.q) / (wallLine.m - perpendicularDistance.m) ;
				interceptionY = interceptionX * perpendicularDistance.m + perpendicularDistance.q;
				
				isInterceprionInLine = ((( walls[i][0] < interceptionX && interceptionX < walls[i][2]) || (walls[i][2] < interceptionX && interceptionX < walls[i][0]))  &&
					((walls[i][1] < interceptionY && interceptionY < walls[i][3]) || (walls[i][3] < interceptionY && interceptionY < walls[i][1])) );
					
				if(!isInterceprionInLine)
				{
					if(Math.abs(interceptionX - walls[i][0]) < Math.abs(interceptionX - walls[i][2]))
					{
						interceptionX = walls[i][0];
						interceptionY = walls[i][1]
					}
					else
					{
						interceptionX = walls[i][2];
						interceptionY = walls[i][3]
					}
				}
				
				distanceFromWall = Math.sqrt((interceptionX - x) * (interceptionX - x) + (interceptionY - y) * (interceptionY - y) );	
			}			
		}
		
		adjPos.x = x;
		adjPos.y = y;

	}
	
	return adjPos;
}


function setMoveOnDistance(charX, charY, x, y, distanceLimit)
{
	var adjPos = new Object();
	var distX = x - charX;
	var distY = y - charY;

	var Ipo  = Math.sqrt(distX * distX + distY *distY);		
	var sinA  = distY/Ipo;
	var cosA  = distX/Ipo;
	
	adjPos.x = charX + (distanceLimit * cosA);
	adjPos.y = charY + (distanceLimit * sinA);
	
	return  adjPos;
}

function adjustMultipleMoveOnDistance(char, moveArray, distanceLimit)
{
	var distanceCovered = 0;
	if(moveArray.distance > distanceLimit)
	{
		for(var i=1; i < moveArray.wayPoints.length; i++)
		{
			var partialDist = Math.sqrt(Math.pow((char.posX - moveArray.wayPoints[i][0]), 2) + Math.pow((char.posY - moveArray.wayPoints[i][1]), 2));
			if (partialDist > (distanceLimit - distanceCovered) )
			{
				var adjPos = setMoveOnDistance(moveArray.wayPoints[i-1][0], moveArray.wayPoints[i-1][1], moveArray.wayPoints[i][0], moveArray.wayPoints[i][1], (distanceLimit - distanceCovered));
				moveArray.wayPoints[i][0] = adjPos.x;
				moveArray.wayPoints[i][1] = adjPos.y;
				
				moveArray.wayPoints.splice(i);
				break;
			}
			distanceCovered + distanceCovered + partialDist;
		}
		
		moveArray.distance = distanceLimit;
	}
	
	return moveArray;
}

function getObjectBorders(object)
{
	var borders = new Array();
	var border = new Array();

	border = [(object.posX - object.sizeX),	(object.posY - object.sizeY),	(object.posX - object.sizeX),	(object.posY + object.sizeY)];
	borders.push(border);
	
	border = [(object.posX - object.sizeX),	(object.posY - object.sizeY),	(object.posX + object.sizeX),	(object.posY - object.sizeY)];
	borders.push(border);
	
	border = [(object.posX + object.sizeX),	(object.posY - object.sizeY),	(object.posX + object.sizeX),	(object.posY + object.sizeY)];
	borders.push(border);
	
	border = [(object.posX - object.sizeX),	(object.posY + object.sizeY),	(object.posX + object.sizeX),	(object.posY + object.sizeY)];
	borders.push(border);
	
	return borders;
}

function pointInObject(x, y, objects, excludeRectangular)
{
	var object= null;
	
	for(var i =0; i < objects.length; i++ )
	{
		//circular objects
		if(objects[i].shape == "circular")
		{
			// point is in object
			if(Math.sqrt((objects[i].posX - x) * (objects[i].posX - x)  + (objects[i].posY - y) * (objects[i].posY - y)  ) <= objects[i].radius)
			{
				object = objects[i];
				break;
			}
			
		}
		
		// rectangular object
		else if(objects[i].shape == "rectangular" && !excludeRectangular)
		{
			// point is in object
			if( (objects[i].posX - objects[i].sizeX) < x && (objects[i].posX + objects[i].sizeX) > x && (objects[i].posY - objects[i].sizeY) < y && (objects[i].posY + objects[i].sizeY) > y )
			{
				object = objects[i];
				break;
			}
		}
	}
	return object;
}

function pointInPlayer(x, y, players)
{
	var player = null;
	
	for(var i =0; i < players.length; i++ )
	{	
		if(Math.sqrt((players[i].posX - x) * (players[i].posX - x)  + (players[i].posY - y) * (players[i].posY - y)  ) <= players[i].character.radius)
		{
			player = players[i];
			break;
		}			
	}
	
	return player;
}


function isObjectInReach(object, char)
{
	var inReach = false;
	
	if(object.shape == "circular")
	{
		//object is in reach
		if(Math.sqrt( Math.pow((object.posX - char.posX),2 )  +  Math.pow((object.posY - char.posY), 2)  ) <= (char.character.reach + char.character.radius + object.radius))
		{
			inReach = true;
		}
	}
	else if(object.shape == "rectangular")
	{
		if(	(((object.posX - object.sizeX) < (char.posX + char.character.reach + char.character.radius) && (object.posX > char.posX)) || ((object.posX + object.sizeX) > (char.posX - char.character.reach - char.character.radius) && (object.posX < char.posX))) && 
			(((object.posY - object.sizeY) < (char.posY + char.character.reach + char.character.radius) && (object.posY > char.posY)) || ((object.posY + object.sizeY) > (char.posY -char.character.reach - char.character.radius) && (object.posY < char.posY))) )
		{
			inReach = true;
		}
	}
	
	return inReach;
}


function characterInRect(char, ax, ay, bx, by, dx, dy)
{
	var x = char.posX;
	var y = char.posY;
	var bax = bx - ax;
	var bay = by - ay;
	var dax = dx - ax;
	var day = dy - ay;
	
	if ((x - ax) * bax + (y - ay) * bay < 0.0) return false
	if ((x - bx) * bax + (y - by) * bay > 0.0) return false
	if ((x - ax) * dax + (y - ay) * day < 0.0) return false
	if ((x - dx) * dax + (y - dy) * day > 0.0) return false
	
	return true	
}




function rollD20()
{
	return Math.floor(Math.random() * 20) + 1;
}

function rollD12()
{
	return Math.floor(Math.random() * 12) + 1;
}

function rollD10()
{
	return Math.floor(Math.random() * 10) + 1;
}

function rollD8()
{
	return Math.floor(Math.random() * 8) + 1;
}

function rollD6()
{
	return Math.floor(Math.random() * 6) + 1;
}

function rollD4()
{
	return Math.floor(Math.random() * 4) + 1;
}

function rollD2()
{
	return Math.floor(Math.random() * 2) + 1;
}

