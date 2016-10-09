// JavaScript Document

function checkInside(container)
{
	if (container.open == false )
	{
		if(document.getElementById("useAndTalk").style.visibility == 'visible' )
		{
			//document.getElementById("useAndTalkDescription").innerHTML =  document.getElementById("useAndTalkDescription").innerHTML + "<br />" + container.hiddenDescription;
			
			for(var j=0; j<container.contentTrigger.length; j++)
			{					
				var actionDiv = document.createElement('div');
				actionDiv.id = container.contentTrigger[j].targetObject.ID;
				actionDiv.innerHTML= container.contentTrigger[j].actionDescription;
				actionDiv.onclick = createUseHandler(container.contentTrigger[j].action, container.contentTrigger[j].targetObject, container.contentTrigger[j].triggerObject, container.contentTrigger[j].conclusive);					
				document.getElementById("useAndTalkActions").appendChild(actionDiv);	
						
			}
		}	

		var triggerNum = 0;
		container.triggers = [];

		container.open = true;
		use(container, null, "look");
	}
}

function pickUp(container, inventoryObj)
{
	if(inventoryObj.type == "gold")
	{
		activeCharacter.character.gold = activeCharacter.character.gold + inventoryObj.params[0];
		for(var i = 0; i< container.contentTrigger.length; i++)
		{
			if (container.contentTrigger[i].targetObject.ID == inventoryObj.ID)
			{
				triggerNum = i;
				break;
			}
		}
		container.contentTrigger.splice(triggerNum, 1);
		
	}
	else
	{
		activeCharacter.character.inventory.push(inventoryObj);
		if(document.getElementById("useAndTalk").style.visibility == 'visible' )
		{
			var element = document.getElementById(inventoryObj.ID);
			element.parentNode.removeChild(element);
		}
		
		var triggerNum = 0;
		if(container.contentTrigger != null)
		{
			for(var i = 0; i< container.contentTrigger.length; i++)
			{
				if (container.contentTrigger[i].targetObject.ID == inventoryObj.ID)
				{
					triggerNum = i;
					break;
				}
			}
			container.contentTrigger.splice(triggerNum, 1);
		}
		
		if(container.character != null && container.character.inventory != null)
		{
			for(var i = 0; i< container.character.inventory.length; i++)
			{
				if (container.character.inventory[i].ID == inventoryObj.ID)
				{
					triggerNum = i;
					break;
				}
			}
			container.character.inventory.splice(triggerNum, 1);
		}
		
		checkTeamAttitudeChange("pickUp", null, inventoryObj.ID);
	}
	use(container, null, "look");
}

function openCloseDoor(door)
{
	if(door.doorOpen == false)
	{
		if(door.orientation == "horizzontal")
		{
			if(door.openingSide == "left")
			{
				if(door.facing  == "south")
					openDoorHoriSouthSX(door);
					
				if(door.facing  == "north")
					openDoorHoriNorthSX(door);
			}
		}
		if(door.orientation == "vertical")
		{
			if(door.openingSide == "left")
			{
				if(door.facing  == "west")
					openDoorVertWestSX(door)
				
				if(door.facing  == "east")
					openDoorVertEastSX(door)
			}
			
			if(door.openingSide == "right")
			{
				if(door.facing  == "west")
					openDoorVertWestDX(door)
				
				if(door.facing  == "east")
					openDoorVertEastDX(door)
			}
		}
	}
	else if(door.doorOpen == true)
	{
		if(door.orientation == "horizzontal")
		{
			if(door.openingSide == "left")
			{
				if(door.facing  == "south")
					closeDoorHoriSouthSX(door)
				
				if(door.facing  == "north")
					closeDoorHoriNorthSX(door)
			}
		}
		if(door.orientation == "vertical")
		{
			if(door.openingSide == "left")
			{
				if(door.facing  == "west")
					closeDoorVertWestSX(door)
				
				if(door.facing  == "east")
					closeDoorVertEastSX(door)
			}
			
			if(door.openingSide == "right")
			{
				if(door.facing  == "west")
					closeDoorVertWestDX(door)
				
				if(door.facing  == "east")
					closeDoorVertEastDX(door)
			}
		}
		
	}
}

function openDoorHoriSouthSX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX = sy;
	door.sizeY = sx;
	door.posX = door.posX + (door.sizeY - door.sizeX );
	door.posY = door.posY - (door.sizeY - door.sizeX);
	
	door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	door.image.rotation = 90;
	door.doorOpen = true;
}

function closeDoorHoriSouthSX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX= sy;
	door.sizeY= sx;
	door.posX = door.posX - (door.sizeX - door.sizeY);
	door.posY = door.posY - (door.sizeY - door.sizeX);
	
	
	door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	door.image.rotation = 0;
	door.doorOpen = false;
}

function openDoorHoriNorthSX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX = sy;
	door.sizeY = sx;
	door.posX = door.posX - (door.sizeY - door.sizeX );
	door.posY = door.posY + (door.sizeY - door.sizeX);
	
	door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	door.image.rotation = 90;
	door.doorOpen = true;
}

function closeDoorHoriNorthSX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX= sy;
	door.sizeY= sx;
	door.posX = door.posX + (door.sizeX - door.sizeY);
	door.posY = door.posY + (door.sizeY - door.sizeX);
	
	
	door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	door.image.rotation = 0;
	door.doorOpen = false;
}

function openDoorVertWestSX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX = sy;
	door.sizeY = sx;
	door.posX = door.posX - (door.sizeX - door.sizeY);
	door.posY = door.posY - (door.sizeX - door.sizeY);
	
	door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	
	door.image.rotation = 90;
	door.doorOpen = true;
}

function closeDoorVertWestSX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX= sy;
	door.sizeY= sx;
	door.posX = door.posX - (door.sizeX - door.sizeY);
	door.posY = door.posY + (door.sizeY - door.sizeX);
	
    door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	door.image.rotation = 0;
	door.doorOpen = false;
}

function openDoorVertEastSX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX = sy;
	door.sizeY = sx;
	door.posX = door.posX + (door.sizeX - door.sizeY);
	door.posY = door.posY - (door.sizeX - door.sizeY);
	
	door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	
	door.image.rotation = 90;
	door.doorOpen = true;
}

function closeDoorVertEastSX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX= sy;
	door.sizeY= sx;
	door.posX = door.posX + (door.sizeX - door.sizeY);
	door.posY = door.posY + (door.sizeY - door.sizeX);
	
    door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	door.image.rotation = 0;
	door.doorOpen = false;
}

function openDoorVertEastDX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX = sy;
	door.sizeY = sx;
	door.posX = door.posX - (door.sizeX - door.sizeY);
	door.posY = door.posY + (door.sizeX - door.sizeY);
	
	door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	
	door.image.rotation = 90;
	door.doorOpen = true;
}

function closeDoorVertEastDX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX= sy;
	door.sizeY= sx;
	door.posX = door.posX - (door.sizeX - door.sizeY);
	door.posY = door.posY - (door.sizeY - door.sizeX);
	
    door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	door.image.rotation = 0;
	door.doorOpen = false;
}

function openDoorVertWestDX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX = sy;
	door.sizeY = sx;
	door.posX = door.posX + (door.sizeX - door.sizeY);
	door.posY = door.posY + (door.sizeX - door.sizeY);
	
	door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	
	door.image.rotation = 90;
	door.doorOpen = true;
}

function closeDoorWestDX(door)
{
	var adjCanvasOffsetX = canvasOffsetX * canvasZoom;
	var adjCanvasOffsetY = canvasOffsetY * canvasZoom;
	
	var sx = door.sizeX;
	var sy = door.sizeY;
	door.sizeX= sy;
	door.sizeY= sx;
	door.posX = door.posX + (door.sizeX - door.sizeY);
	door.posY = door.posY - (door.sizeY - door.sizeX);
	
    door.image.x = (door.posX * canvasZoom) + adjCanvasOffsetX;
	door.image.y = (door.posY * canvasZoom) + adjCanvasOffsetY;
	
	door.image.rotation = 0;
	door.doorOpen = false;
}