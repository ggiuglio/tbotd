function compareCharactersHp(charA, charB)
{
  if (charA.hp < charB.hp)
     return -1;
  if (charA.hp > charB.hp)
    return 1;
  return 0;
}

function AIWaiter()
{
	actionOnGoing = true;
	timer = setInterval(function(){AIchooseAction()}, 1500);
}


function AIchooseAction()
{
	clearInterval(timer);
	if(gameOver == false)
	{
		actionOnGoing = false;
		
		var attackDone = false;
		var enemiesInView =  new Array();
		var enemiesInReach = new Array();
		if(activeCharacter.character.standardActionDone == true && activeCharacter.character.moveActionDone == true)
		{
			endTurn();
		}
		else
		{
			check_Perception(activeCharacter);
			
			if(activeCharacter.character.AIBehaviour.active && activeCharacter.character.AIBehaviour.seenEnemies.length > 0)
			{		
				// toDo sort Enemies
		
				var enemiesInReach = check_Reach(activeCharacter, activeCharacter.character.AIBehaviour.seenEnemies);
				if ( enemiesInReach.length > 0)
				{
					if(activeCharacter.character.standardActionDone == false)
					{
						activeCharacter.character.standardActionDone = true;
						meleeAttack(activeCharacter, enemiesInReach[0].posX, enemiesInReach[0].posY, null, null); 
						
					}
					else
						endTurn();		
				}
				else
				{	 // walk to enemy
					if((activeCharacter.character.standardActionDone == false || activeCharacter.character.moveActionDone == false) && activeCharacter.character.AIBehaviour.behaviourStyle != "guardPosition")
					{			
						
							var moveDone = walk(activeCharacter.character.AIBehaviour.seenEnemies[0].posX, activeCharacter.character.AIBehaviour.seenEnemies[0].posY);
							if(moveDone == false)
							{
								var closePoint = getClose(activeCharacter, activeCharacter.character.AIBehaviour.seenEnemies[0].posX, activeCharacter.character.AIBehaviour.seenEnemies[0].posY) ;
								if(closePoint == null)
									endTurn();
								else
								{	
									moveDone == walk(closePoint.x, closePoint.y);
									if(moveDone == false)
										endTurn();
								}
									
							}
					}
					else
						endTurn();
				}
			}
		
			else if ( activeCharacter.character.AIBehaviour.active == true)
			{
				if(activeCharacter.character.AIBehaviour.waypointList != null && activeCharacter.character.AIBehaviour.waypointList.length > 0)
				{
					wpList = activeCharacter.character.AIBehaviour.waypointList;
					var minDist = null;
					var colesetsWp = 0;
					var actualWp = null;
					
					for(var i = 0; i <wpList.length; i++ )
					{
						var dist = Math.sqrt((wpList[i][0] - activeCharacter.posX) * (wpList[i][0] - activeCharacter.posX) +  (wpList[i][1] - activeCharacter.posY) * (wpList[i][1] - activeCharacter.posY));
						
						if(dist < activeCharacter.character.radius)
						{
							actualWp = i;
							break;
						}
					
						if(minDist == null || minDist > dist)
						{
							minDist = dist;
							colesetsWp = i;
						}
					}
					
					if(actualWp != null)
					{
						nextWp = actualWp + 1;
						if (nextWp == wpList.length) 
							nextWp = 0;
						
						var movePossible = walk(wpList[nextWp][0], wpList[nextWp][1]);
						if(movePossible == false)
						{
							var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
							var adjCanvasOffsetY = canvasOffsetY * canvasZoom;

							endTurn();
						}
					}
					else
					{
						nextWp = colesetsWp + 1;
						if (nextWp == wpList.length) 
							nextWp = 0;
						
						var movePossible = walk(wpList[nextWp][0], wpList[nextWp][1]);
						if(movePossible  == false)
						{
							var movePossible = walk(wpList[colesetsWp][0], wpList[colesetsWp][1]);
							if(movePossible  == false)
								endTurn();
						}
					}
				}
				else
				{
					endTurn();
				}
			}
		
		}
	}
}

function check_Perception(char)
{
	var deadEnemiesPosition = new Array();
	for(var  j = 0; j < char.character.AIBehaviour.seenEnemies.length; j++ )
	{
		if(char.character.AIBehaviour.seenEnemies[j].character.alive == false)
			deadEnemiesPosition.push(j)
	}
	
	for(var  j = 0; j < deadEnemiesPosition.length; j++)
	{
		char.character.AIBehaviour.seenEnemies.splice( deadEnemiesPosition[j] , 1 );
	}
			
	for(var i = 0; i < players.length; i++)
	{				
		if(players[i].character.team != char.character.team && players[i].character.alive == true)
		{
			var relation = null;
			for(var j = 0; j < char.character.team.teamRelations.length; j ++)
			{
				if(char.character.team.teamRelations[j].team == players[i].character.team.name)
					relation = char.character.team.teamRelations[j].attitude;
			}
			
			var playerAlreadySeen = false;
			for(var  j = 0; j < char.character.AIBehaviour.seenEnemies.length; j++ )
			{
				if(players[i].id == char.character.AIBehaviour.seenEnemies[j].id)
				{
					playerAlreadySeen = true;
					break;
				}
			}
			
			if(playerAlreadySeen == false && relation == "enemy" )
			{
				if(checkTrajector(char.posX, char.posY, players[i].posX, players[i].posY, char.character.radius, players[i].character.radius, null, players[i]) > 0)
				{
					char.character.AIBehaviour.seenEnemies.push(players[i]);						
				}
			}
		}
	}
}

function check_Reach(char, enemies)
{
	var enemiesInReach = new Array();
	
	for(var i = 0; i < enemies.length; i++)
	{				
		var attack = calculateMeleeAttack(char, enemies[i].posX, enemies[i].posY);
		if(attack.possible && attack.cover > 0)
		{
			enemiesInReach.push(enemies[i]);						
		}						
	}

	return enemiesInReach;
}

function getClose(char, x, y)
{

	var squareSize = 100;

	maxX = x + squareSize;
	maxY = y + squareSize;
	minX = x - squareSize;
	minY = y - squareSize;
	var closePoint = new Object();
	
	var move = pathFinder(char.posX, char.posY, x, minY);
	if (move != null)
	{
		closePoint.x = x;
		closePoint.y = minY;
		
		return closePoint;
	}
	
	move = pathFinder(char.posX, char.posY, x, maxY);
	if (move != null)
	{
		closePoint.x = x;
		closePoint.y = maxY;
		
		return closePoint;
	}
	
	move = pathFinder(char.posX, char.posY, minX, y);
	if (move != null)
	{
		closePoint.x = minX;
		closePoint.y = y;
		
		return closePoint;
	}
	
	move = pathFinder(char.posX, char.posY, maxX, y);
	if (move != null)
	{
		closePoint.x = maxX;
		closePoint.y = y;
		
		return closePoint;
	}
	
	move = pathFinder(char.posX, char.posY, minX, minY);
	if (move != null)
	{
		closePoint.x = minX;
		closePoint.y = minY;
		
		return closePoint;
	}
	
	move = pathFinder(char.posX, char.posY, maxX, maxY);
	if (move != null)
	{
		closePoint.x = maxX;
		closePoint.y = maxY;
		
		return closePoint;
	}
		

	
	
	return null;
}