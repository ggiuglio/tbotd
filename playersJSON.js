// JavaScript Document
function loadPlayersJSON() {
var playersJSON = {
	"players": [
	{
	    "id": "Tzel",
	    "name": {
	        "it": "Tzel",
	        "en": "Tzel"
	    },
		"description" : {
			"it": "E' un uomo giovane, elegante, azimato, con quell`aria da ti faccio impiccare ma senza animosita', il caro vecchio Tzel",
		    "en": "He is a young, stylish and dressed up man with that typical expression witch is telling you: I'll get you hanged, but without hurt feelings. The old good Tzel"
		},
		"talksDone": [
		{
			"id": "TzelStart", 
			"phrase" : {
				"it": "Tra se e se: mmm... se non faccio qualcosa alla svelta questi mi mettono una bella cravatta di canapa, ma devo prendere tempo per recuperare la mia sciabola dal cassetto della scrivania... e dovrebbe esserci qualcos`altro di utile in giro.. ", 
				"en": "Talking to himself: mmm... if I don`t came out with something quickly these guys are going to make me wear a very uncomfortable tie, but I need to buy some time to get my sabre from the desk drawer... and there should be something else useful around..."
			},
			"teamAttitude": null, 
			"levelState": "starttzelOfficeState",
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null, 
			"answer": null
		},
		{
			"id": "WrongCode", 
			"phrase" : {
				"it": "No, il codice non era questo ", 
				"en": "No, that is not the right code "
			},
			"teamAttitude": null, 
			"levelState":  null, 
			"actionDone": "wrongCode", 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null, 
			"answer": null
		},
		{
			"id": "RightCode", 
			"phrase" : {
				"it": "Ahhh certo era questo il codice", 
				"en": "Ohhhh yeah that's the code"
			},
			"teamAttitude": null, 
			"levelState":  null, 
			"actionDone": "rightCode", 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null, 
			"answer": null
		},
        {
            "id": "TzelStartTest",
            "phrase": {
                "it": "Tra se e se: test? che vuol dire test? che dovrei fare?",
                "en": "Tra se e se: test? che vuol dire test? che dovrei fare?"
            },
            "teamAttitude": null,
            "levelState": "starttzelOfficeState",
            "actionDone": null,
            "level": 1,
            "levelID": "testLevel",
            "effect": null,
            "answer": null
        }
		],
		"talksRecived": []
	},
	{
	    "id": "GuardCaptain",
	    "name": {
	        "it": "Capitano delle guardie",
            "en": "Guard's captain"
	    },
		"description" : {
			"it": "E` il capo delle guardie della prigione, non proprio un signore raccomandabile ma neanche il peggio che si puo` trovare in giro. Non ha l`armatura ma si porta appresso un ascia poco rassicurante",
			"en": "He is the captain of the prison guards, not a really nice guy but neither the worst face you can see around in a prison. He does not wear an armor but he carries an axe that doesn’t look so friendly"
		},
		"talksDone": [
		{
			"id": "GuardGiveTime", 
			"phrase": { 
				"it": "Ok, te lo concedo come favore personale visto che eravamo colleghi, ma non ci mettere troppo...", 
				"en": "Ok, just because we used to work togheter, but don't take too long"
			},
			"teamAttitude": "friend", 
			"levelState":  "changeAttitude", 
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null, 
			"answer": null
		},
		{
			"id": "GuardDontMove", 
			"phrase": {
				"it": "Hey amico dove credi di andare?", 
				"en": "Hey man, where you think you are going?"
			},
			"teamAttitude": "enemy", 
			"levelState":  "changeAttitude", 
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null, 
			"answer": null
		},
		{
			"id": "GuarStart", 
			"phrase": {
				"it": "Ok Tzel, lo sai come funziona: mi dispiace ma non ci puoi fare niente oggi tocca a te, seguici senza fare casini e non ci sara` bisongo di passare dal mattatoio... Tu sai di cosa sto parlando..", 
				"en": "Ok Tzel, you know how it works, it's your time nothing you can do about it, follow us without giving any problem and we will skip the slaughter room... you know what I mean..."
			},
			"teamAttitude": null, 
			"levelState": "starttzelOfficeState",
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null, 
			"answer": null
		},
		{
			"id": "GuarInsultAnswer", 
			"phrase": {
				"it": "Tu hai la lingua troppo lunga.. ma rimediamo subito!!", 
				"en": "Your tongue is too long, now I'm gonna fix it!!"
			},
			"teamAttitude": null, 
			"levelState":  null, 
			"actionDone": "answer", 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null, 
			"answer": null
		},
		{
			"id": "GuarAttackAnswer", 
			"phrase": {
				"it": "Ahhh preferisci le maniere forti? Ti accontentiamo subito!!", 
				"en": "Ahhh you like the hard way? Here it comes!!"
			},
			"teamAttitude": null, 
			"levelState":  null, 
			"actionDone": "answer", 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null, 
			"answer": null
		},
		{
			"id": "GuardSwordTaken", 
			"phrase": {
				"it": "Quella non la dovevi prendere!!", 
				"en": "That wasn't a good idea!!"
			}, 
			"teamAttitude": null, 
			"levelState":  null, 
			"actionDone": "answer", 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null, 
			"answer": null
		},
		{
			"id": "GuardSwordTimeOver", 
			"phrase": {
				"it": "Ok, tempo scaduto, ora ti veniamo a prendere!!", 
				"en": "Ok, time's over, now we are coming for you!!"
			},
			"teamAttitude": null, 
			"levelState":  "onGoing", 
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null, 
			"answer": null
		}
		],
		"talksRecived": [
		{
			"id": "TzelSurrender", 
			"phrase": {
				"it": "Ok, vengo con voi, non serve usare la forza", 
				"en": "Ok, I'm coming with you, no need to use strength"
			},
			"teamAttitude": "neutral", 
			"levelState":  null, 
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": "gameOver",
			"answer": "surrender"
		},
		{
			"id": "TzelAskTime", 
			"phrase": {
				"it": "Fatemi solo una cortesia: datemi un attimo per raccogliere le mie cose", 
				"en": "Please be so kind as to give me a moment to collect my stuff"
			},
			"teamAttitude": "neutral", 
			"levelState":  null, 
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": "friend",
			"answer": null
		},
		{
			"id": "TzelInsult", 
			"phrase":{
				"it": "Provaci e ti ficco quell'ascia cosi` in fondo alla gola che fai prima a tirarla fuori da sotto", 
				"en": "You just try and I'm gonna shove that axe so deep into your mouth that will be easier to take it out from the other side"	
			},
			"teamAttitude": "neutral", 
			"levelState":  null, 
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": "enemy",
			"answer": null
		}
		]
	},
	{
	    "id": "Guard",
	    "name": {
	        "it": "Guardia",
	        "en": "Guard"
	    },
		"description": {
			"it": "E` una guardia, niente di particolare ma pu sempre una guardia. Ha una spada e piu` o meno sa anche come usarla",
			"en": "He is a watchman, nothing special but still a soldier. He got a sword and he can use it, more or less"
		},
		"talksDone": [
		{
			"id": "GuardAnswer", 
			"phrase": {
				"it": "Io non so nulla, parlane col capitano", 
				"en": "I know nothing, ask the captain"
			},
			"teamAttitude": null, 
			"levelState":  null, 
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": null,
			"answer": null
		}
		],
		"talksRecived": [
		{
			"id": "TzelQuestionNeutral", 
			"phrase": {
				"it": "Hey guardia dove mi portate?", 
				"en": "Hey guard, where do you take me?"
			},
			"teamAttitude": "neutral", 
			"levelState":  null, 
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": "answer",
			"answer": "GuardAnswer"
		},
		{
			"id": "TzelQuestionNeutral", 
			"phrase": {
				"it": "Hey guardia dove mi portate?", 
				"en": "Hey guard, where do you take me?"
			},
			"teamAttitude": "friend", 
			"levelState":  null, 
			"actionDone": null, 
			"level": 1,
			"levelID": "laFugaDiTzel",
			"effect": "answer",
			"answer": "GuardAnswer"
		}
		]
			
	},

	{
	    "id": "Rondell",
	    "name": {
	        "it": "Rondell",
	        "en": "Rondell"
	    },
	    "description": {
	        "it": "E' uno gnomo basso (grazie e' uno gnome) brutto e spesso con un agghiacciante pizzetto ossigenato",
	        "en": "E' uno gnomo basso (grazie e' uno gnome) brutto e spesso con un agghiacciante pizzetto ossigenato"
	    },
	    "talksDone": [],
	    "talksRecived": []
	},
    {
        "id": "StupidOrck",
        "name": {
            "it": "Stupido orco",
            "en": "Stupid orck"
        },
        "description": {
            "it": "E' uno stupido grosso e brutto orco",
            "en": "He is a dumb big ugly orck"
        },
        "talksDone": [],
        "talksRecived": []
    },
     {
         "id": "GoodOrck",
         "name": {
             "it": "Orco buono",
             "en": "Good orck"
         },
         "description": {
             "it": "Sempre stupido e brutto ma buono",
             "en": "Still dumb and ugly, buit good"
         },
         "talksDone": [],
         "talksRecived": []
     }
	
]
};
return playersJSON;
}

// function for loading json data

function loadPlayerStrings (char, lang)
{
	var json = loadPlayersJSON();
	for(var i=0; i < json.players.length; i++)
	{
		if(json.players[i].id == char.id)
		{
		    char.character.description = json.players[i].description[lang];
		    char.character.name = json.players[i].name[lang];
			
			var talksDone = [];
			for(var j=0; j < json.players[i].talksDone.length; j++)
			{
			    talksDone.push(new talk(json.players[i].talksDone[j].id, json.players[i].talksDone[j].phrase[lang], json.players[i].talksDone[j].teamAttitude, json.players[i].talksDone[j].levelState, json.players[i].talksDone[j].actionDone, json.players[i].talksDone[j].level, json.players[i].talksDone[j].levelID, json.players[i].talksDone[j].effect, json.players[i].talksDone[j].answer))
			}
			
			var talksRecived = [];
			for(var j=0; j < json.players[i].talksRecived.length; j++)
			{
			    talksRecived.push(new talk(json.players[i].talksRecived[j].id, json.players[i].talksRecived[j].phrase[lang], json.players[i].talksRecived[j].teamAttitude, json.players[i].talksRecived[j].levelState, json.players[i].talksRecived[j].actionDone, json.players[i].talksRecived[j].level, json.players[i].talksRecived[j].levelID, json.players[i].talksRecived[j].effect, json.players[i].talksRecived[j].answer))
			}

			char.character.talksDone = talksDone;
			char.character.talksRecived = talksRecived;
		}
	}
}



