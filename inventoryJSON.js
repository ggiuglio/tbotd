function loadInventoryJSON() {
var inventoryJSON = {
"inventory": [
	{
		"id": "spada1",
		"name": {
		"it": "Spada",
		"en": "Long sword"
		}
	},
	{
		"id": "spada2",
		"name": {
		"it": "Spada",
		"en": "Long sword"
		}
	},
	{
		"id": "spada3",
		"name": {
		"it": "Spada",
		"en": "Long sword"
		}
	},
	{
		"id": "spada4",
		"name": {
		"it": "Spada",
		"en": "Long sword"
		}
	},
	{
		"id": "spada5",
		"name": {
		"it": "Spada",
		"en": "Long sword"
		}
	},
	{
		"id": "spada6",
		"name": {
		"it": "Spada",
		"en": "Long sword"
		}
	},
	{
		"id": "bow",
		"name": {
		"it": "Arco lungo",
		"en": "Long bow"
		}
	},
	{
		"id": "sciabolaTzel",
		"name": {
		"it": "Sciabola perfetta",
		"en": "Perfect sabre"
		}
	},
	{
		"id": "asciaN",
		"name": {
		"it": "Ascia naninca",
		"en": "Dwarven axe"
		}
	},
	{
		"id": "amuletProtection",
		"name": {
		"it": "Amuleto di protezione",
		"en": "Amulet of protection"
		}
	},
	{
		"id": "elegantHat",
		"name": {
		"it": "Cappello elegante",
		"en": "Elegat hat"
		}
	},
	{
		"id": "leatherArmor",
		"name": {
		"it": "Armatura di cuoio",
		"en": "Leather armor"
		}
	},
	{
		"id": "kammart",
		"name": {
		"it": "Bustina di kammarth",
		"en": "Kammart bag"
		}
	},
	{
		"id": "mop",
		"name": {
		"it": "Mocio Vileda",
		"en": "Mocio viledag"
		}
	},
	{
		"id": "bucket",
		"name": {
		"it": "Secchio",
		"en": "Bucket"
		}
	},
	{
		"id": "maidDress",
		"name": {
		"it": "Vestito da cameriera",
		"en": "Maid dress"
		}
	},
	{
		"id": "gold",
		"name": {
		"it": "Monet d`oro",
		"en": "Gold coins"
		}
	},
	{
		"id": "ticket",
		"name": {
		"it": "Biglietto della diligenza",
		"en": "Coach ticket"
		}
	},
]};

return inventoryJSON;
}

function loadInventoryStrings (inventory, lang)
{
	var json = loadInventoryJSON();
	for(var i=0; i < json.inventory.length; i++)
	{
		if(json.inventory[i].id == inventory.ID)
		{
			inventory.name = 	json.inventory[i].name[lang];
		}
	}
}