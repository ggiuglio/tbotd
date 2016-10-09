// JavaScript Document

function drawCurrentWeaponAndSpell()
{
	var selectedWeapon = activeCharacter.character.selectedWeapon;
	
	if(selectedWeapon != null)
		document.getElementById('selectedCharWeapon').innerHTML = ' <img src="' + selectedWeapon.imageFile + '" width="55" height="55" />';
	else
		document.getElementById('selectedCharWeapon').innerHTML = ' <img src="img/obj/fist.png" width="55" height="55" />';
		
	var selectedSpell = null;
	
	selectedSpell = players[0].character.selectedSpell;
	
	if(selectedSpell != null)
		document.getElementById('selectedCharSpell').innerHTML = ' <img src="' + selectedSpell.imageFile + '" width="55" height="55" />';
	else
		document.getElementById('selectedCharSpell').innerHTML = ' <img src="img/obj/empty.png" width="55" height="55" />';		
		
}

function changeSelectedHand(direction)
{
	var  char = players[0].character;
	
	if (char.selectedHand == "right" && char.rightHand != null)
	{
		if(char.leftHand == null && char.rightHand.weaponSize == "one/twoHands")
		{
			char.equipBothHands(char.rightHand);
			char.selectedHand = "both";
			char.selectedWeapon = char.rightHand;
			document.getElementById('rightHandInUse').style.display = 'none';
			document.getElementById('leftHandInUse').style.display = 'none';
			document.getElementById('bothHandInUse').style.display = 'block';
			
			drawCharacterEquipment();	
		}
		
		else if(char.leftHand == null && char.rightHand.weaponSize == "oneHand")
		{
			char.equipLeftHand(char.rightHand);
			char.selectedHand = "left";
			char.selectedWeapon = char.leftHand;
			char.rightHand = null;
			document.getElementById('rightHandInUse').style.display = 'none';
			document.getElementById('leftHandInUse').style.display = 'block';
			document.getElementById('bothHandInUse').style.display = 'none';	
		}
		
		else if(char.leftHand != null && char.leftHand.type == "weapon")
		{
			char.selectedHand = "left";
			char.selectedWeapon = char.leftHand;
			document.getElementById('rightHandInUse').style.display = 'none';
			document.getElementById('leftHandInUse').style.display = 'block';
			document.getElementById('bothHandInUse').style.display = 'none';		
		}
		
	}
	
	else if (char.selectedHand == "left" && char.leftHand != null)
	{
		if(char.rightHand == null && char.leftHand.weaponSize == "one/twoHands")
		{
			char.equipBothHands(char.leftHand);
			char.selectedHand = "both";
			char.selectedWeapon = char.rightHand;
			document.getElementById('rightHandInUse').style.display = 'none';
			document.getElementById('leftHandInUse').style.display = 'none';
			document.getElementById('bothHandInUse').style.display = 'block';
			
			drawCharacterEquipment();	
		}
		
		else if(char.rightHand == null && char.leftHand.weaponSize == "oneHand")
		{
			char.equipRightHand(char.leftHand);
			char.selectedHand = "right";
			char.selectedWeapon = char.righttHand;
			char.leftHand = null;
			document.getElementById('rightHandInUse').style.display = 'block';
			document.getElementById('leftHandInUse').style.display = 'none';
			document.getElementById('bothHandInUse').style.display = 'none';	
		}
		
		else if(char.rightHand != null && char.rightHand.type == "weapon")
		{
			char.selectedHand = "right";
			char.selectedWeapon = char.rightHand;
			document.getElementById('rightHandInUse').style.display = 'block';
			document.getElementById('leftHandInUse').style.display = 'none';
			document.getElementById('bothHandInUse').style.display = 'none';		
		}
	}
	else if (char.selectedHand == "both" && char.rightHand.weaponSize != "twoHands")
	{
		if(direction == "right")
		{
			char.selectedHand = "right";
			char.selectedWeapon = char.rightHand;
			
			char.leftHand = null;
			document.getElementById('rightHandInUse').style.display = 'block';
			document.getElementById('leftHandInUse').style.display = 'none';
			document.getElementById('bothHandInUse').style.display = 'none';
			drawCharacterEquipment();
		}
		
		if(direction == "left")
		{
			char.selectedHand = "left";
			char.selectedWeapon = char.leftHand;
			
			char.rightHand = null;
			document.getElementById('leftHandInUse').style.display = 'none';
			document.getElementById('leftHandInUse').style.display = 'block';
			document.getElementById('bothHandInUse').style.display = 'none';
			drawCharacterEquipment();
		}
	}
	drawCurrentWeaponAndSpell();
}

function selectItem(element)
{
	var inventoryElements = element.parentNode.children;
	
	for(var i = 0; i< inventoryElements.length; i++)
	{
		if(inventoryElements[i].id == element.id)
		{
			var inventoryObj = players[0].character.inventory;
			for(var j = 0; j < inventoryObj.length; j++)
			{
				if(inventoryObj[j].ID == element.id)
				{
					if (inventoryObj[j].selected == true)
					{
						inventoryObj[j].selected = false;
						
						document.getElementById('selectedWeaponImage').innerHTML = '';
						document.getElementById('selectedWeaponName').innerHTML = '';
						document.getElementById('selectedWeaponDetails').innerHTML = '';
						selectedItem = null;
						if(selectedItem == null)
						document.getElementById('selectedItemDetails').style.display = 'none';
					}
					else
					{
						document.getElementById('selectedItemDetails').style.display = 'block';	
						selectedItem = inventoryObj[j];
						inventoryObj[j].selected = true;
					
						drawSelectedItemDetails(selectedItem, null);
					}
				}
				else
				{
					inventoryObj[j].selected = false;
				}						
			}
		}
		else
		{				
			inventoryElements[i].style.backgroundColor="#FFFFFF";  	
		}
	}
	
	document.getElementById("changeHand").style.display = "none";
}

function drawSelectedItemDetails(selectedItem, slot)
{
	document.getElementById('selectedWeaponImage').innerHTML = '<img src = "' + selectedItem.imageFile + '" width="' + selectedItem.imgWidth + '" height="' + selectedItem.imgHeight + '" />';
	document.getElementById('selectedWeaponImage').style.overflow = "hidden";
	document.getElementById('selectedWeaponName').innerHTML = selectedItem.name ;
	
	document.getElementById('selectedWeaponDetails').innerHTML = "";
	
	if(selectedItem.damageDice != null &&  selectedItem.damageDiceNumber)
		createDetailRow("Damage:", selectedItem.damageDiceNumber + "d" +  selectedItem.damageDice);
	if(selectedItem.attackBonus != null)
		createDetailRow("Attack bonus:", selectedItem.attackBonus);
	if(selectedItem.damageBonus != null)
		createDetailRow("Damage bonus:", selectedItem.damageBonus);
	if(selectedItem.armorType != null)
		createDetailRow("Armor type:", selectedItem.armorType);
	if(selectedItem.AC != null)
		createDetailRow("Armor value:", selectedItem.AC);
	if(selectedItem.armorBonus != null)
		createDetailRow("Armor bonus:", selectedItem.armorBonus);
	if(selectedItem.speedBonus != null)
		createDetailRow("Speed bonus:", selectedItem.speedBonus);
	if(selectedItem.strBonus != null)
		createDetailRow("Strength bonus:", selectedItem.strBonus);
	if(selectedItem.dexBonus != null)
		createDetailRow("Dexterity bonus:", selectedItem.dexBonus);
	if(selectedItem.cosBonus != null)
		createDetailRow("Constitution bonus:", selectedItem.cosBonus);
	if(selectedItem.intBonus != null)
		createDetailRow("Intelligence bonus:", selectedItem.intBonus);
	if(selectedItem.wisBonus != null)
		createDetailRow("Wisdom bonus:", selectedItem.wisBonus);
	if(selectedItem.chaBonus != null)
		createDetailRow("Charisma bonus:", selectedItem.chaBonus);
	
	
	var unequip = document.getElementById('unequip');	
	
	if(slot != null)
	{
		unequip.style.display = "block";
		unequip.onclick = createUnequipHandler(slot);
	}
	else
	{
		unequip.style.display = "none";
	}
	
	document.getElementById('selectedItemDetails').style.display = 'block';	
}

function createUnequipHandler(slot)
{
	return function() {  unequip(slot) }; 
}

function unequip(slot)
{
	if(slot == "head")
	{
		activeCharacter.character.equipHead(null);	
	}
	if(slot == "gloves")
	{
		activeCharacter.character.equipGloves(null);	
	}
	if(slot == "amulet")
	{
		activeCharacter.character.equipAmulet(null);	
	}
	if(slot == "leftHand")
	{
		if(activeCharacter.character.leftHand != null && activeCharacter.character.rightHand != null && activeCharacter.character.rightHand == activeCharacter.character.leftHand)
			activeCharacter.character.equipBothHands(null);
		else
			activeCharacter.character.equipLeftHand(null);	
	}
	if(slot == "armor")
	{
		activeCharacter.character.equipArmor(null);	
	}
	if(slot == "rightHand")
	{
		if(activeCharacter.character.leftHand != null && activeCharacter.character.rightHand != null && activeCharacter.character.rightHand == activeCharacter.character.leftHand)
			activeCharacter.character.equipBothHands(null);
		else
			activeCharacter.character.equipRightHand(null);	
	}
	if(slot == "leftRing")
	{
		activeCharacter.character.equipLeftRing(null);	
	}				
	if(slot == "rightRing")
	{
		activeCharacter.character.equipRightRing(null);	
	}
	if(slot == "boots")
	{
		activeCharacter.character.equipBoots(null);	
	}
	
	loadInventory();	
	drawCurrentWeaponAndSpell();
	document.getElementById('selectedItemDetails').style.display = 'none';
}

function createDetailRow(name, value)
{
	var element = document.createElement("div");	
	element.style.width = "180px"; 
	element.style.height = "30px"; 
	element.style.marginLeft = "20px";
	element.style.backgroundImage="url('img/interface/detailLine.png')";
	
	var leftDiv = document.createElement("div");
	leftDiv.style.width = "120px";
	leftDiv.height = "20px;"
	//leftDiv.style.float = "left";
	leftDiv.marginLeft = "0px";
	leftDiv.style.paddingLeft = "5px";
	leftDiv.style.marginTop = "10px";
	leftDiv.innerText = name;
	
	var rightDiv = document.createElement("div");
	rightDiv.style.width = "50px";
	rightDiv.style.marginTop = "-18px";
	//rightDiv.style.float = "right";
	rightDiv.innerText = value;
	rightDiv.style.marginLeft = "125px";
	element.appendChild(leftDiv);
	element.appendChild(rightDiv);
	
	document.getElementById('selectedWeaponDetails').appendChild(element);;
}

function equipItem(slot)
{	
	var equip = false
	if(selectedItem != null)
	{
		if(slot == "head")
		{
			if(selectedItem.type == "helm")
			{
				players[0].character.equipHead(selectedItem);	
				equip = true;
			}
		}
		if(slot == "gloves")
		{
			if(selectedItem.type == "gloves")
			{
				players[0].character.equipGloves(selectedItem);	
				equip = true;
			}
		}
		if(slot == "amulet")
		{
			if(selectedItem.type == "amulet")
			{
				players[0].character.equipAmulet(selectedItem);
				equip = true;
			}
		}
		if(slot == "leftHand")
		{
			if((selectedItem.type == "weapon" || selectedItem.type == "shield") && ( selectedItem != players[0].character.rightHand))
			{
				if(selectedItem != null && selectedItem.weaponSize == "twoHands")
					players[0].character.equipBothHands(selectedItem);
				else if(selectedItem == null && players[0].character.leftHand != null && players[0].character.leftHand.type == 'weapon' && players[0].character.selectedHand == "both" )
				{
					players[0].character.equipBothHands(selectedItem);
					players[0].character.selectedHand = "right";
				}
				else
					players[0].character.equipLeftHand(selectedItem);	
				
				equip = true;
			}
		}
		if(slot == "armor")
		{
			if(selectedItem.type == "armor")
			{
				players[0].character.equipArmor(selectedItem);	
				equip = true;
			}
		}
		if(slot == "rightHand")
		{
			if((selectedItem.type == "weapon" || selectedItem.type == "shield") && ( selectedItem != players[0].character.leftHand))
			{
				if(selectedItem != null && selectedItem.weaponSize == "twoHands")
					players[0].character.equipBothHands(selectedItem);
				else if(selectedItem == null && players[0].character.rightHand != null && players[0].character.rightHand.type == 'weapon' && players[0].character.selectedHand == "both")
				{
					players[0].character.equipBothHands(selectedItem);
					players[0].character.selectedHand = "right";
				}
				else
					players[0].character.equipRightHand(selectedItem);
					
				equip = true;
			}
		}
		if(slot == "leftRing")
		{
			if(selectedItem.type == "ring" && selectedItem != players[0].character.rightRing)
			{
				players[0].character.equipLeftRing(selectedItem);
				equip = true;
			}
		}				
		if(slot == "rightRing")
		{
			if(selectedItem.type == "ring" && selectedItem != players[0].character.leftRing)
			{
				players[0].character.equipRightRing(selectedItem);
				equip = true;
			}
		}
		if(slot == "boots")
		{
			if(selectedItem.type == "boots")
			{
				players[0].character.equipBoots(selectedItem);	
				equip = true;
			}
		}
		
		if(equip)
		{
			drawSelectedItemDetails(selectedItem, slot);
			
			var inventoryObj = players[0].character.inventory;
			for(var j = 0; j < inventoryObj.length; j++)
			{
				if(inventoryObj[j].ID == selectedItem.ID)
				{
					if (inventoryObj[j].selected == true)
					{
						inventoryObj[j].selected = false;
						selectedItem = null;
						break;
					}
				}
			}
			
					
			loadInventory();	
			drawCurrentWeaponAndSpell();
		}
	}
	if (!equip)
	{
		if(slot == "head")
		{
			if(players[0].character.head != null)
				drawSelectedItemDetails(players[0].character.head, "head");
		}
		if(slot == "gloves")
		{
			if(players[0].character.gloves != null)
				drawSelectedItemDetails(players[0].character.gloves, "gloves");
		}
		if(slot == "amulet")
		{
			if(players[0].character.amulet != null)
				drawSelectedItemDetails(players[0].character.amulet, "amulet");
		}
		if(slot == "leftHand")
		{		
			if(players[0].character.leftHand != null)
				drawSelectedItemDetails(players[0].character.leftHand, "leftHand");
		}
		if(slot == "armor")
		{
			if(players[0].character.armor != null)
				drawSelectedItemDetails(players[0].character.armor, "armor");
		}
		if(slot == "rightHand")
		{
			if(players[0].character.rightHand != null)
				drawSelectedItemDetails(players[0].character.rightHand, "rightHand");
		}
		if(slot == "leftRing")
		{
			if(players[0].character.leftRing != null)
				drawSelectedItemDetails(players[0].character.leftRing, "leftRing");
		}				
		if(slot == "rightRing")
		{
			if(players[0].character.rightRing != null)
				drawSelectedItemDetails(players[0].character.rightRing, "rightRing");
		}
		if(slot == "boots")
		{
			if(players[0].character.boots != null)
				drawSelectedItemDetails(players[0].character.boots, "boots");
		}
	}
}

function loadInventory()
{
	if (activeCharacter.type == "PC" )
	{
	// draw object list		
		document.getElementById('objectList').innerHTML = '';
		for(var i=0; i < players[0].character.inventory.length; i++)
		{					
			var inventoryRow = document.createElement("div");
			inventoryRow.setAttribute("id", players[0].character.inventory[i].ID);
			inventoryRow.style.width = "520px";	
			inventoryRow.style.marginLeft = "15px";
			inventoryRow.style.height = "20px";
			inventoryRow.style.cursor = "pointer";
			inventoryRow.style.backgroundImage="url('img/interface/inventoryLine.png')";
			inventoryRow.onclick = function(){ selectItem(this)};
			
			var nameDiv = document.createElement("div");
			nameDiv.style.width = "175px";
			nameDiv.style.marginLeft = "0px";
			nameDiv.style.height = "20px";
			nameDiv.innerHTML = players[0].character.inventory[i].name;
			
			var typeDiv = document.createElement("div");
			typeDiv.style.width = "175px";
			typeDiv.style.marginTop = "-20px";
			typeDiv.style.height = "20px";
			typeDiv.style.marginLeft = "185px";
			typeDiv.innerHTML = players[0].character.inventory[i].type;
			
			
			var statsDiv = document.createElement("div");
			statsDiv.style.width = "150px";
			statsDiv.style.marginTop = "-20px";
			statsDiv.style.height = "20px";
			statsDiv.style.marginLeft = "370px";
			if(players[0].character.inventory[i].reachType != null)
				statsDiv.innerHTML = players[0].character.inventory[i].reachType;
		
			inventoryRow.appendChild(nameDiv);
			inventoryRow.appendChild(typeDiv);
			inventoryRow.appendChild(statsDiv);
			
			document.getElementById('objectList').appendChild(inventoryRow);
		}
	}
		
	// draw character image objects	
	drawCharacterEquipment();
	
	// draw selected hand				
	drawSelectedHand();
	
	// show inventory	
}

function loadSpellBook()
{
	if (activeCharacter.type == "PC" )
	{
		document.getElementById('level1Spells').innerHTML = '';
		document.getElementById('level2Spells').innerHTML = '';
		document.getElementById('level3Spells').innerHTML = '';
	
		for(var i =0; i < activeCharacter.character.spellBook.length; i++)
		{
			var element = document.createElement("div");
			element.style.height = "25px";
		
			element.style.marginLeft = "10px";
			element.style.cursor = "pointer";
			element.style.width = "500px";
			element.style.backgroundImage = "url(img/interface/spellLine.png)";
	
			var cross = document.createElement("div"); 
			cross.id = activeCharacter.character.spellBook[i].name + "_cross";
			cross.innerHTML = "<img src='img/interface/cross.png' />";
			cross.style.marginTop = "-18px";
			cross.style.maxHeight = "20px";
	
			element.onclick = createSpellSelectHandler(players[0].character.spellBook[i], true);
			element.setAttribute("id", players[0].character.spellBook[i].ID);
			
			
			var spellLine = '<span style="display:inline-block; min-width:140px">' + activeCharacter.character.spellBook[i].name + '</span> <span style="display:inline-block; min-width:80px"> Range: ' + activeCharacter.character.spellBook[i].range + "</span>";
			
			if(activeCharacter.character.spellBook[i].effectType == "damage")
			{
				spellLine = spellLine + '<span style="display:inline-block; min-width:180px"> Damage: ' + activeCharacter.character.spellBook[i].damageDiceNumber + "d" + activeCharacter.character.spellBook[i].damageDice + " + " + activeCharacter.character.spellBook[i].damageBonus + "</span>";
			}
			else
			{
				spellLine = spellLine + '<span style="display:inline-block; min-width:180px"> Effect: ' + activeCharacter.character.spellBook[i].effectType + " for " + activeCharacter.character.spellBook[i].damageDiceNumber + "d" + activeCharacter.character.spellBook[i].damageDice + " rounds</span>";
			}
			
			spellLine = spellLine + '<span style="display:inline-block; min-width:80px"> ST: ' + activeCharacter.character.spellBook[i].tsType + "</span>";
			
			element.innerHTML = spellLine;
			
			if(activeCharacter.character.spellBook[i].used)
				element.appendChild(cross);
			
			
			if(activeCharacter.character.spellBook[i].level == 1)
				document.getElementById('level1Spells').appendChild(element);
			
			if(activeCharacter.character.spellBook[i].level == 2)
				document.getElementById('level2Spells').appendChild(element);
			
			if(activeCharacter.character.spellBook[i].level == 3)
				document.getElementById('level3Spells').appendChild(element);
		}
	
		if(activeCharacter.character.selectedSpell != null)
			selectSpell(activeCharacter.character.selectedSpell, false);
			
		showPanel('spellBook');
	}
}

function createSpellSelectHandler(spell, action)
{  
    return function() {  
        selectSpell(spell, action); 
    } 
}

function selectSpell(spell, action)
{
	activeCharacter.character.selectedSpell = spell;
	
	document.getElementById("selectedSpellName").innerText = spell.name;
	document.getElementById("selectedSpellLevel").innerText = spell.level;
	document.getElementById("selectedSpellRange").innerText = spell.range;
	
	if(spell.used)
		document.getElementById("used").style.display = "block";
	else
		document.getElementById("used").style.display = "none";
	
	var effectArea = spell.targetType;
	if (effectArea == "wave")
		effectArea = effectArea + " " + spell.effectAreaX  + "x" + spell.effectAreaY;
	
	if(effectArea == "explosion")
		effectArea = effectArea + " " + spell.effectAreaX;
	
	document.getElementById("selectedSpellEffectArea").innerText = effectArea;
	if(spell.effectType == "damage")
	{
		document.getElementById("selectedSpellDamage").innerText = spell.damageDiceNumber + "d" + spell.damageDice + " + " + spell.damageBonus;
		document.getElementById("selectedSpellDamageTitle").innerText ="Damage";
	}
	else
	{
		document.getElementById("selectedSpellDamage").innerText = spell.effectType;
		document.getElementById("selectedSpellDamageTitle").innerText ="Effect";
	}
	
	
	document.getElementById("selectedSpellSavingThrow").innerText = spell.tsType;
	document.getElementById("selectedSpellDescription").innerText = spell.description;
	document.getElementById("spellImage").innerHTML = " <img src='" + spell.imageFile + "' height='120' width='120' />" ;
	
	drawCurrentWeaponAndSpell();
	
	if(action)
		selectActionButton('cast');
}

function loadCharSheet()
{
	if (activeCharacter.type == "PC" )
	{
		document.getElementById('charSheet_name').innerHTML = activeCharacter.character.longName;
		document.getElementById('charSheet_xp').innerHTML = activeCharacter.character.xp;
		document.getElementById('charSheet_gold').innerHTML = activeCharacter.character.gold;
		
		document.getElementById('charSheet_img').innerHTML = '<img src="' + activeCharacter.character.img + ' " height="190" width="190" />'
		
		document.getElementById('charSheet_str').innerHTML = activeCharacter.character.str;
		document.getElementById('charSheet_dex').innerHTML = activeCharacter.character.dex;
		document.getElementById('charSheet_cos').innerHTML = activeCharacter.character.con;
		document.getElementById('charSheet_int').innerHTML = activeCharacter.character.inte;
		document.getElementById('charSheet_wis').innerHTML = activeCharacter.character.wis;
		document.getElementById('charSheet_cha').innerHTML = activeCharacter.character.cha;
		
		document.getElementById('charSheet_strMod').innerHTML = activeCharacter.character.strMod;
		document.getElementById('charSheet_dexMod').innerHTML = activeCharacter.character.dexMod;
		document.getElementById('charSheet_cosMod').innerHTML = activeCharacter.character.conMod;
		document.getElementById('charSheet_intMod').innerHTML = activeCharacter.character.inteMod;
		document.getElementById('charSheet_wisMod').innerHTML = activeCharacter.character.wisMod;
		document.getElementById('charSheet_chaMod').innerHTML = activeCharacter.character.chaMod;
		
		document.getElementById('charSheet_HP').innerHTML = activeCharacter.character.maxHp;
		document.getElementById('charSheet_Attack').innerHTML = activeCharacter.character.hit();
		document.getElementById('charSheet_AC').innerHTML = activeCharacter.character.ac();
		
		document.getElementById('charSheet_tsRef').innerHTML = activeCharacter.character.tsRef;
		document.getElementById('charSheet_tsFor').innerHTML = activeCharacter.character.tsFor;
		document.getElementById('charSheet_tsWill').innerHTML = activeCharacter.character.tsWill;
		
		document.getElementById('charSheet_description').innerHTML = activeCharacter.character.description;
		
		showPanel('charSheet');
	}
}

function drawSelectedHand()
{
	if(players[0].character.selectedHand == "right")
	{
		document.getElementById('rightHandInUse').style.display = 'block';
		document.getElementById('leftHandInUse').style.display = 'none';
		document.getElementById('bothHandInUse').style.display = 'none';
	}
	
	if(players[0].character.selectedHand == "left")
	{
		document.getElementById('rightHandInUse').style.display = 'none';
		document.getElementById('leftHandInUse').style.display = 'block';
		document.getElementById('bothHandInUse').style.display = 'none';
	}
	
	if(players[0].character.selectedHand == "both")
	{
		document.getElementById('rightHandInUse').style.display = 'none';
		document.getElementById('leftHandInUse').style.display = 'none';
		document.getElementById('bothHandInUse').style.display = 'block';
	}
}

function drawCharacterEquipment()
{	
	var head = players[0].character.head;
	var headImage = "";
	if(head != null)
	{
		headImage = head.imageFile;
		document.getElementById('headSlot').innerHTML = '<img src="' + headImage + '" width=58 height=58 />';
		document.getElementById('headSlot').style.cursor = "pointer";
	}
	else
	{
		document.getElementById('headSlot').innerHTML = '';
		document.getElementById('headSlot').style.cursor = "auto";
	}
		
	var gloves = players[0].character.gloves;
	var glovesImage = "";
	if(gloves != null)
	{
		glovesImage = gloves.imageFile;
		document.getElementById('glovesSlot').innerHTML = '<img src="' + glovesImage + '" width=40 height=40 />';
		document.getElementById('glovesSlot').style.cursor = "pointer";
	}
	else
	{
		document.getElementById('glovesSlot').innerHTML = '';
		document.getElementById('glovesSlot').style.cursor = "auto";
	}
	
	var amulet = players[0].character.amulet;
	var amuletImage = "";
	if(amulet != null)
	{
		amuletImage = amulet.imageFile;				
		document.getElementById('amuletSlot').innerHTML = '<img src="' + amuletImage + '" width=35 height=35 />';
		document.getElementById('amuletSlot').style.cursor = "pointer";
	}
	else
	{
		document.getElementById('amuletSlot').innerHTML = '';
		document.getElementById('amuletSlot').style.cursor = "auto";
	}
	
	var rightHand = players[0].character.rightHand;		
	var rightHandImage = "";		
	if(rightHand != null)
	{
		rightHandImage = rightHand.imageFile;				
		document.getElementById('rightHandSlot').innerHTML = '<img src="' + rightHandImage + '" width=74 height=74 />';
		document.getElementById('rightHandSlot').style.cursor = "pointer";
	}
	else
	{
		document.getElementById('rightHandSlot').innerHTML = '';
		document.getElementById('rightHandSlot').style.cursor = "auto";
	}
		
	var armor = players[0].character.armor;	
	var armorImage = "";
	if(armor != null)
	{
		armorImage = armor.imageFile;
		document.getElementById('armorSlot').innerHTML = '<img src="' + armorImage + '" width=74 height=134 />';
		document.getElementById('armorSlot').style.cursor = "pointer";
	}
	else
	{
		document.getElementById('armorSlot').innerHTML = '';
		document.getElementById('armorSlot').style.cursor = "auto";
	}
	
	var leftHand = players[0].character.leftHand;
	var leftHandImage = "";
	if(leftHand != null)
	{
		leftHandImage = leftHand.imageFile;				
		document.getElementById('leftHandSlot').innerHTML = '<img src="' + leftHandImage + '" width=74 height=74 />';
		document.getElementById('leftHandSlot').style.cursor = "pointer";
	}
	else
	{
		document.getElementById('leftHandSlot').innerHTML = '';
		document.getElementById('leftHandSlot').style.cursor = "auto";
	}
		
	var rightRing = players[0].character.rightRing;	
	var rightRingImage = "";
	if(rightRing != null)
	{
		rightRingImage = rightRing.imageFile;	
		document.getElementById('rightRingSlot').innerHTML = '<img src="' + rightRingImage + '" width=40 height=40 />';
		document.getElementById('rightRingSlot').style.cursor = "pointer";
	}
	else
	{
		document.getElementById('rightRingSlot').innerHTML = '';
		document.getElementById('rightRingSlot').style.cursor = "auto";
	}
	
	var leftRing = players[0].character.leftRing;	
	var leftRingImage = "";
	if(leftRing != null)
	{
		leftRingImage = leftRing.imageFile;
		document.getElementById('leftRingSlot').innerHTML = '<img src="' + leftRingImage + '" width=40 height=40 />';
		document.getElementById('leftRingSlot').style.cursor = "pointer";
	}
	else
	{
		document.getElementById('leftRingSlot').innerHTML = '';
		document.getElementById('leftRingSlot').style.cursor = "auto";
	}
		
	var boots = players[0].character.boots;	
	var bootsImage = "";
	if(boots != null)
	{
		bootsImage = boots.imageFile;
		document.getElementById('bootsSlot').innerHTML = '<img src="' + bootsImage + '" width=60 height=60 />';		
		document.getElementById('bootsSlot').style.cursor = "pointer";
	}
	else
	{
		document.getElementById('bootsSlot').innerHTML = '';	
		document.getElementById('bootsSlot').style.cursor = "auto";
	}
		
	var char = activeCharacter.character;
	if(char.selectedWeapon != null)
	{	
		document.getElementById('changeHand').style.display = 'block';
		if(char.selectedHand == "both" )
		{
			if(char.selectedWeapon.weaponSize == "twoHands")
			{
				document.getElementById('changeHandLeft').style.display = 'none';
				document.getElementById('changeHandRight').style.display = 'none';
			}
			else
			{
				document.getElementById('changeHandLeft').style.display = 'block';
				document.getElementById('changeHandRight').style.display = 'block';
			}
			
		}
		if(char.selectedHand == "right")
		{
			if(char.leftHand != null && char.leftHand.type != 'weapon')
			{
				document.getElementById('changeHandLeft').style.display = 'none';
				document.getElementById('changeHandRight').style.display = 'none';
			}
			else
			{
				document.getElementById('changeHandLeft').style.display = 'block';
				document.getElementById('changeHandRight').style.display = 'none';
			}
		}
		if(char.selectedHand == "left")
		{
			if(char.rightHand != null && char.rightHand.type != 'weapon')
			{
				document.getElementById('changeHandLeft').style.display = 'none';
				document.getElementById('changeHandRight').style.display = 'none';
			}
			else
			{
				document.getElementById('changeHandLeft').style.display = 'none';
				document.getElementById('changeHandRight').style.display = 'block';
			}
		}
	}
	else
		document.getElementById('changeHand').style.display = 'none';
	
}

function selectActionButton(element)
{
	document.getElementById("actionChoice").style.visibility = "hidden";
	activeCharacter.character.selectedAction = element;
	
	if(element == 'move')
	{
		selectAction(activeCharacter.character.selectedMoveStyle);
		document.getElementById("actionMove").style.visibility = "visible";
		document.getElementById("actionImg").src = "img/interface/move.png";
	}
	else
	{
		document.getElementById("actionMove").style.visibility = "hidden";
	}
	
	if(element == 'use')
	{
		selectAction(element);
		document.getElementById("actionUse").style.visibility = "visible";
		document.getElementById("actionImg").src = "img/interface/use.png";
	}
	else
	{
		document.getElementById("actionUse").style.visibility = "hidden";
	}
	
	if(element == 'attack')
	{
		selectAction(activeCharacter.character.selectedAttackStyle);
		document.getElementById("actionAttack").style.visibility = "visible";
		document.getElementById("actionImg").src = "img/interface/attack.png";
	}
	else
	{
		document.getElementById("actionAttack").style.visibility = "hidden";
	}
	
	if(element == 'look')
	{
		selectAction(element);
		document.getElementById("actionLook").style.visibility = "visible";
		document.getElementById("actionImg").src = "img/interface/look.png";
	}
	else
	{
		document.getElementById("actionLook").style.visibility = "hidden";
	}
	
	if(element == 'cast')
	{
		selectAction(element);
		document.getElementById("actionCast").style.visibility = "visible";
		document.getElementById("actionImg").src = "img/interface/cast.png";
	}
	else
	{
		document.getElementById("actionCast").style.visibility = "hidden";
	}
}

function selectMoveStyle(style)
{	
	activeCharacter.character.selectedMoveStyle = style;
	selectActionButton("move");

	var size = 0;
	if(style == 'walk')
	{
		//document.getElementById("moveWalk").style.borderBottom = "1px solid #000000";
		document.getElementById("actionMove").innerText = "Walk";
	}
	else
	{
		//document.getElementById("moveWalk").style.borderBottom = "0px solid #000000";
	}
	
	if(style == 'run')
	{
		//document.getElementById("moveRun").style.borderBottom = "1px solid #000000";
		document.getElementById("actionMove").innerText = "Run";
	}
	else
	{
		//document.getElementById("moveRun").style.borderBottom = "0px solid #000000";
	}
	
	if(style == 'sneak')
	{
		//document.getElementById("moveSneak").style.borderBottom = "1px solid #000000";
		document.getElementById("actionMove").innerText = "Sneak";
	}
	else
	{
		//document.getElementById("moveSneak").style.borderBottom = "0px solid #000000";
	}
	
	if(style == 'step')
	{
		//document.getElementById("moveStep").style.borderBottom = "1px solid #000000";
		document.getElementById("actionMove").innerText = "Step";
	}
	else
	{
		//document.getElementById("moveStep").style.borderBottom = "0px solid #000000";
	}
	
	if(style == 'retreat')
	{
		//document.getElementById("moveRetreat").style.borderBottom = "1px solid #000000";
		document.getElementById("actionMove").innerText = "Retreat";
	}
	else
	{
		//document.getElementById("moveRetreat").style.borderBottom = "0px solid #000000";
	}
	
	//activeCharacter.moveCircle.graphics.clear();
	//activeCharacter.moveCircle.graphics.setStrokeStyle(1).beginFill("green").drawCircle(0, 0, size).endStroke();
}

function selectAttackStyle(style)
{
	activeCharacter.character.selectedAttackStyle = style;
	selectActionButton("attack");

	if(style == 'melee')
	{
		//ocument.getElementById("attackMelee").style.borderBottom = "1px solid #000000";
		document.getElementById("actionAttack").innerText = "Melee attack";
	}
	else
	{
		//document.getElementById("attackMelee").style.borderBottom = "0px solid #000000";
	}
	
	if(style == 'ranged')
	{
		//document.getElementById("attackRanged").style.borderBottom = "1px solid #000000";
		document.getElementById("actionAttack").innerText = "Ranged attack";
	}
	else
	{
		//document.getElementById("attackRanged").style.borderBottom = "0px solid #000000";
	}
	
	if(style == 'charge')
	{
		//document.getElementById("attackCharge").style.borderBottom = "1px solid #000000";
		document.getElementById("actionAttack").innerText = "Charge";
	}
	else
	{
		//document.getElementById("attackCharge").style.borderBottom = "0px solid #000000";
	}
	
	if(style == 'push')
	{
		//document.getElementById("attackPush").style.borderBottom = "1px solid #000000";
		document.getElementById("actionAttack").innerText = "Push attack";
	}
	else
	{
		//document.getElementById("attackPush").style.borderBottom = "0px solid #000000";
	}
	
	if(style == 'disarm')
	{
		//document.getElementById("attackDisarm").style.borderBottom = "1px solid #000000";
	}
	else
	{
		//document.getElementById("attackDisarm").style.borderBottom = "0px solid #000000";
	}
}

function drawCharImageList()
{
	document.getElementById("charcterList").innerHTML = '';

	for(var i = 0; (i < players.length && i < 4); i++)
	{
		var totalHp = players[i].character.maxHp;
		var hp = players[i].character.hp;
		var perc = Math.floor(hp/totalHp * 75);
		if(perc < 0)
			perc = 0;
	
		var newChild = document.createElement("div");
		newChild.style.height = "100px";
		newChild.style.marginTop = "8px";
		
		var image;
		if(players[i].character.alive)
			image = players[i].img;
		else
			image = players[i].deathImg;
			
		
			
		var charImage = document.createElement("div");
		charImage.style.height = "60px";
		charImage.style.width = "75px";
		charImage.style.marginTop = "0px";
		charImage.style.textAlign = "center";
		charImage.style.cursor = "pointer";
		charImage.innerHTML = " <img src='" + image + "' width='60' height='60' > ";
		
		charImage.onclick = createCharClickHander(players[i]);
		
		var charLife = document.createElement("div");
		var charName = document.createElement("div");
		
		charLife.style.width =  perc + "px"; 
		charLife.style.height = "10px"; 
		charLife.style.marginTop = "4px";
		charLife.style.backgroundImage = "url('img/interface/charListLife.png')";
		
		charName.style.width = "75px"; 
		charName.style.height = "10px"; 
		charName.innerHTML = players[i].character.name;
		
		newChild.appendChild(charImage);
		newChild.appendChild(charLife);
		newChild.appendChild(charName);
		
		document.getElementById("charcterList").appendChild(newChild);
	}
}

function createCharClickHander(char)
{
	return function() {  
        moveStageOnChar(char); 
    } 	
}

function drawUsedActions()
{
	if(false)
	{
		if(players[0].character.standardActionDone == true)	
			document.getElementById('standardAction').innerHTML = '<img src="img/x.png" width="120" height="15"  />' ;
		else
			document.getElementById('standardAction').innerHTML = 'Attack action';
			
		if(players[0].character.moveActionDone == true)	
			document.getElementById('moveAction').innerHTML = '<img src="img/x.png" width="90" height="15"  />' ;
		else
			document.getElementById('moveAction').innerHTML = 'Move Action';
			
		if(players[0].character.minorActionDone  == true)	
			document.getElementById('minorAction').innerHTML = '<img src="img/x.png" width="50" height="15"  />' ;
		else
			document.getElementById('minorAction').innerHTML = 'Minor';		
	}
	
	
	
	var standard = players[0].character.standardActionDone;
	var move = players[0].character.moveActionDone
	var minor = players[0].character.minorActionDone
	
	if(activeCharacter.onGoingAction != null && (activeCharacter.onGoingAction.action == "retreat" || activeCharacter.onGoingAction.action == "run"))
	{
		standard = true;
		move = true;
		minor = true;
	}
	
	if(activeCharacter.onGoingAction != null && (activeCharacter.onGoingAction.action == "walk" || activeCharacter.onGoingAction.action == "sneak"))
	{
		if(!move)
			move = true;
		
		else if(!standard)
			standard = true;
		
	}
	
	
	var timeDiv = document.getElementById("timeLeft");
	var timeConsumed = 0;
	if( minor )
		timeConsumed = timeConsumed + 20;
		
	if(move)
		timeConsumed = timeConsumed + 60;
	
	if(standard )
		timeConsumed = timeConsumed + 95;
	
	  timeDiv.style.height = 175 - timeConsumed + "px";
	  timeDiv.style.marginTop = 15 + timeConsumed + "px";
	
	
}

function drawConsolleItems()
{
	var totalHp = players[0].character.maxHp;
	var hp = players[0].character.hp;
		
	if(players[0].character.alive)
		image = players[0].img;
	else
		image = players[0].deathImg;
			
	document.getElementById('selectedCharacterImage').innerHTML = '<img src="' + image + '" width = "120" height = "120" />' ;
	document.getElementById('selectedCharacterName').innerHTML = players[0].character.name;
	document.getElementById('selectedCharacterHp').innerHTML =  hp + '/' + totalHp;
	
	var lifePercentage = Math.round((hp/totalHp * 100));
	
	lifeBallFilling.sourceRect.y = 100- lifePercentage;
	lifeBallFilling.y = 476 + (100- lifePercentage);
	
	if (activeCharacter.type == "PC" )
	{
		document.getElementById('consolleRight').style.visibility = "visible";
		document.getElementById('selectedCharacterHp').style.visibility = "visible";
		document.getElementById('timeLeftContainer').style.visibility = "visible";
		
		if(activeCharacter.character.selectedAction == "move")
			document.getElementById('actionMove').style.visibility = "visible";
		
		if(activeCharacter.character.selectedAction == "attack")
			document.getElementById('actionAttack').style.visibility = "visible";
		
		if(activeCharacter.character.selectedAction == "look")
			document.getElementById('actionLook').style.visibility = "visible";
		
		if(activeCharacter.character.selectedAction == "use")
			document.getElementById('actionUse').style.visibility = "visible";
			
		if(activeCharacter.character.selectedAction == "cast")
			document.getElementById('actionCast').style.visibility = "visible";
		
	}
	else
	{
		document.getElementById('consolleRight').style.visibility = "hidden";
		document.getElementById('selectedCharacterHp').style.visibility = "hidden";
		document.getElementById('actionMove').style.visibility = "hidden";
		document.getElementById('actionAttack').style.visibility = "hidden";
		document.getElementById('actionLook').style.visibility = "hidden";
		document.getElementById('actionUse').style.visibility = "hidden";
		document.getElementById('actionCast').style.visibility = "hidden";
		document.getElementById('timeLeftContainer').style.visibility = "hidden";
		
	}
	
	drawCurrentWeaponAndSpell();
}

function consolleWriter(playerName, message)
{
	var consolleContent = document.getElementById('consolle').innerHTML;
	consolleContent = consolleContent + "</br>" + playerName + ": " + message;
	document.getElementById("consolle").innerHTML = consolleContent;
	
	document.getElementById("consolle").scrollTop =  document.getElementById("consolle").scrollHeight;
}

function refreshInterface()
{
	
	drawUsedActions();
	drawCharImageList();
	selectActionButton(activeCharacter.character.selectedAction);
	drawConsolleItems();
}

function showPanel(panel)
{
    if (activeCharacter.type == "PC") {
        var panels = new Array();
        panels.push(document.getElementById('charSheet'));
        panels.push(document.getElementById('inventory'));
        panels.push(document.getElementById('spellBook'));
        panels.push(document.getElementById("useAndTalk"));
        panels.push(document.getElementById("versionNote"));
        panels.push(document.getElementById("actionChoice"));
        panels.push(document.getElementById("moveChoice"));
        panels.push(document.getElementById("attackChoice"));
        panels.push(document.getElementById("PCTalk"));
        panels.push(document.getElementById("NPCTalk"));
        panels.push(document.getElementById("menu"));

        if (panel == 'charSheet' || panel == 'spellBook' || panel == 'inventory' || panel == 'useAndTalk') {
            windowOpen = true;
        }

        for (var i = 0; i < panels.length; i++) {
            if (panels[i].id == panel) {
                if (panels[i].style.visibility == 'hidden')
                    panels[i].style.visibility = 'visible';
                else if (panel != "useAndTalk")
                    panels[i].style.visibility = 'hidden';
            }
            else
                panels[i].style.visibility = 'hidden';
        }
    }
}

function showObjectName(object)
{
	var left = object.image.x ;
	if(object.type != null )
	{
		var name = object.character.name;
		var top = object.image.y;
		left = left + (object.character.radius * 2 * canvasZoom);
	}
	else
	{
		var name = object.name;
		var top = object.image.y;
		var left = object.image.x;
		
		if(object.shape == "circular")
			left = left + (object.radius * 2 * canvasZoom);
			
		if(object.shape == "rectangular")
		{
			left = left + (object.sizeX * canvasZoom);
			top = top - object.sizeY / 2 * canvasZoom;
		}
	}
	
	document.getElementById('object').innerHTML = name;
	document.getElementById('objectContainer').style.display = "block";
	document.getElementById('objectContainer').style.marginLeft = left + "px";
	document.getElementById('objectContainer').style.top = top + "px";
}