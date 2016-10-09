function loadRoomsJSON() {
var roomsJSON = {
"rooms": [
	{
		"name": "TzelOffice",
		"description": {
		"it": "Questo e' il mio ufficio, bellino vero?",
		"en": "That's my office, you like it?"
		}
	},
	{
		"name": "corridor",
		"description": {
		"it": "Il corridoio degli uffici... ovviamente le porte sono tutte chiuse, lavoro con un branco di fancazzisti. Forse possiamo scusare quelli che saranno stati impiccati subito prima che toccasse a me",
		"en": "The office corridor... needless to say all doors closed, I used to works with a bunch of lazy bastards. We can do an exception for the guys who got hanged but before me"
		}
	}
]};

return roomsJSON;
}

function loadRoomsStrings (room, lang)
{
	var json = loadRoomsJSON();
	for(var i=0; i < json.rooms.length; i++)
	{
		if(json.rooms[i].name == room.name)
		{
			room.description = 	json.rooms[i].description[lang];
		}
	}
}