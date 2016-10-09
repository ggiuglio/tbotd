
function loadObjectsJSON() {
    var objectsJSON = {
        "objects": [
            {
                "id" : "table",
                "name": {
                    "it": "Tavolo",
                    "en": "table"
                },
                "description": {
                    "it": "E' un tavolo, sopra di esso ci sono diverse pile di documenti, per come si sono messe le cose potrebbero tornarmi utili solo se in bagno fosse finita la carta. <br/> Il tavolo ha un cassetto che si apre tramite una leva nascosta",
                    "en": "It's a big desk, on it are piled some documents, for how things are going now they will be of some use only if we run of of paper in the toilet. <br/> The desk has an hidden drawer which I can open by an hidden command"
                },
                "containsDescription" : {
                    "it": "<br /> Nel cassetto c`è la mia cara vecchia sciabole, la tengo sempre a portata di mano",
                    "en": "<br /> In the drawer there's my good all sabre, I always keep it close"
                },
                "triggers": [ 
                {
                    "action": "checkInside", 
                    "actionDescription": {
                        "it": "Apri il cassetto",
                        "en": "open drawer"
                    },
                    "addToDescription": null,
                    "notActiveAddToDescription": null, 
                }
                ],
                "contentTrigger": [
                {
                    "action": "pickUp",  
                    "actionDescription": { 
                        "it": "Predi la sciabola",
                        "en": "Pick up the sabre"
                    },
                    "addToDescription": null,
                    "notActiveAddToDescription": null, 
                }
                ]
            },
            {
                "id" : "bigShelf1",
                "name": {
                    "it": "Libreria",
                    "en": "Bookshelf"
                },
                "description": {
                    "it": "E' una libreria, piena di inutili libri di legge, quelli che contengono tutte quelle leggi che usavo ignorare quando lavoravo qui",
                    "en": "It' a bookshelf, it's full of useless law books, those where are written all the laws that I used to ignore when I was working here"
                },
                "containsDescription" : null,
                "triggers": [],
                "contentTrigger": []
            },
            {
                "id" : "bigShelf2",
                "name": {
                    "it": "Libreria",
                    "en": "Bookshelf"
                },
                "description": {
                    "it": "E' una libreria, piena di inutili libri di legge, quelli che contengono tutte quelle leggi che usavo ignorare quando lavoravo qui",
                    "en": "It' a bookshelf, it's full of useless law books, those where are written all the laws that I used to ignore when I was working here"
                },
                "containsDescription" : null,

                "triggers": [],
                "contentTrigger": []
            },
            {
                "id" : "stairs",
                "name": {
                    "it": "Scale",
                    "en": "Stairs"
                },
                "description": {
                    "it": "Sono le scale che portano alle prigioni al piano di sotto.. non una gran bella destinazione ma la mia unica via di fuga...",
                    "en": ""
                },
                "containsDescription" : null,
                "triggers": [
                {
                    "action": "checkInside", 
                    "actionDescription": {
                        "it": "Scendi le scale",
                        "en": "Go downstairs"
                    },
                    "addToDescription": {
                        "it": "<br /> Ok ho preso tutto, posso andare",
                        "en": "<br /> Ok I got everything I can go"
                    },
                    "notActiveAddToDescription": {
                        "it": "<br /> Prima di andarmene devo assolutamente recuperare il biglietto della diligenza, senza quello se anche se riesco a uscire da qui non vado lontano",
                        "en": "<br /> Before I go I must thake the coach tiket, without that even if I can get out of here I won't go far"
                    } 
                }
                ],
                "contentTrigger": []
            },
            {
                "id" : "vertShelf1",
                "name": {
                    "it": "Libreria",
                    "en": "Bookshelf"
                },
                "description": {
                    "it": "E' una piccola libreria dove tengo un po' di tutto, foto di me con la famiglia, ricordi di vacanze mai fatte e di amici impiccati (da me) insomma le solite cianfrusaglie...",
                    "en": "It' a small bookshelf, where I keep a little bit of everything: family pictures, memories from holliday I dind't have and from friend who were hanged (by me)..."
                },
                "containsDescription" :{
                    "it": " Ah ecco qui c'e' anche quell'amuleto di protezione che avevo preso a un condannato a morte settimana scorsa... certo a lui non l'ha protetto granche",
                    "en": "Ah here ther is that protection amulet I thook from that guy sent to death last week... sure it didn't protect him well enought"
                },

                "triggers": [],
                "contentTrigger": []
            },
            {
                "id" : "vertShelf2",
                "name": {
                    "it": "Libreria",
                    "en": "Bookshelf"
                },
                "description": {
                    "it": "Qui tengo la mia collezione di the rari, a me piace particolarmente quello marca kammarth... (che in realta' e' una droga molto simile alla cocaina N.d.a)",
                    "en": "Here I keep my precious tea collection, I particulary like the kammart one... (which is a kind of drug similar to cocain A.n.)"
                },
                "containsDescription" : null,
                "triggers": [],
                "contentTrigger": []
            },
            {
                "id" : "corridorDoor1",
                "name": {
                    "it": "Sgabuzzino delle scope",
                    "en": "Maid room"
                },
                "description": {
                    "it": "E' lo stanzino della signora delle pulizie",
                    "en": "That's the maid room"
                },
                "containsDescription" : {
                    "it": "<br /> La signora poveraccia non e' molto attrezzata qui dentro c'e': <br />",
                    "en": "<br /> The poor maid is not very well equipped, here there is: <br />"
                },
                "triggers": [],
                "contentTrigger": [
                {
                    "action": "pickUp", 
                    "actionDescription": {
                        "it": "Prendi il mocio",
                        "en": "Pick up the mocio"
                    },
                    "addToDescription": {
                        "it": "<br /> Un mocio per pulire in terra",
                        "en": "<br /> A mocio to wash the floor"
                    },
                    "notActiveAddToDescription": null
                }, 
                {
                    "action": "pickUp", 
                    "actionDescription": {
                        "it": "Prendi il secchio",
                        "en": "Pick up the bucket"
                    },
                    "addToDescription": {
                        "it": "<br /> Un secchio",
                        "en": "<br /> A bucket"
                    },
                    "notActiveAddToDescription": null
                },
                {
                    "action": "pickUp", 
                    "actionDescription": {
                        "it": "Prendi il completino",
                        "en": "Pick the dress"
                    },
                    "addToDescription": {
                        "it": "<br /> Un simpatico completino da cameriera (che se ripenso a come sta alla signora coboldo che fa le pulizie qui quasi quasi cambio idea e mi lascio impiccare)",
                        "en": "<br /> A cute maid outfit (if I think too much at how it looks on the cobold lady in charge off cleaning the office I might change my mind and let them hung me)"
                    },
                    "notActiveAddToDescription": null
                },	 
                ]
            },
            {
                "id" : "corridorDoor2",
                "name": {
                    "it": "Ufficio di Brammar",
                    "en": "Brammar's office"
                },
                "description": {
                    "it": "Josh Brammar, e' un bravo ragazzo uno dei pochi che farebbe piacere incontrare (se solo si lavasse i denti)",
                    "en": "Josh Brammar, he is a good guy, one of the few I would like to meet (if only he would brush his teeth sometimes)"
                },
                "containsDescription" : null,
                "triggers": [],
                "contentTrigger": []
            },
            {
                "id" : "corridorDoor3",
                "name": {
                    "it": "Ufficio di Ruammar",
                    "en": "Ruammar's office"
                },
                "description": {
                    "it": "Il vecchio Ruammar, campione indiscusso di battute brutte di tutta la contea",
                    "en": "The old Rummar, undisputed champion of orrible jokes in all the county"
                },
                "containsDescription" : null,
                "triggers": [],
                "contentTrigger": []
            },
            {
                "id" : "corridorDoor4",
                "name": {
                    "it": "Ufficio di Lammar",
                    "en": "Lammar's office"
                },
                "description": {
                    "it": "Paul Lammar, questo e' un pubblico ministero serio, finalmente uno che sa fare il suo lavoro",
                    "en": "Paul Rummar, he is a seriour prosecutor, at least somebody who can do his job"
                },
                "containsDescription" : null,
                "triggers": [],
                "contentTrigger": []
            },
            {
                "id" : "corridorDoor5",
                "name": {
                    "it": "Ufficio di Mhammar",
                    "en": "Mhammar's office"
                },
                "description": {
                    "it": "Homar Mhammar ma come cazzo si spiega che tutti qui hanno il cognome che finisce per hammar?? chi ha fatto le assunzioni l'ulima volta deve decisamente fumare di meno, questo poi l'hanno scelto solo per il nome, l'unica cosa che sa di giursprudenza e' 'impiccatelo'",
                    "en": "Homar Mhammar, how it comes that all the guys name here end by 'hammar'? There's somebody in the HR who sould definitely quit smoking. This one here has surely been chosen just for his name: the only thing he knows about law is: 'hung 'em'"
                },
                "containsDescription" : null,
                "triggers": [],
                "contentTrigger": []
            },
            {
                "id" : "bigShelf3",
                "name": {
                    "it": "Libreria",
                    "en": "Bookshelf"
                },
                "description": {
                    "it": "In questa libreria c'e' astutamente camuffata la mia cassaforte personale, dentro ci sono un paio di oggettini che mi farebbero comodo, solo che non sono sicuro di ricordarmi il codice...",
                    "en": "In this bookshelf I had foxily hidden my personal safe, inside there are a couple o things I may need, problem is I'm not sure to remember the pin... "
                },
                "containsDescription" : {
                    "it": "<br /> In cassaforte tengo: <br />",
                    "en": "<br /> In the safe I have: <br />"
                },
                "triggers": [
                {
                    "action": "tryCode", 
                    "actionDescription": {
                        "it": "Provo a inserire 210871, la data di nascita del mio pappagallo",
                        "en": "I try 210871, my parrot birthday "
                    },
                    "addToDescription": null,
                    "notActiveAddToDescription": null
                }, 
                {
                    "action": "tryCode", 
                    "actionDescription": {
                        "it": "Provo a inserire 347431, il numero dei mie capelli",
                        "en": "I try 347431, the number of my hair"
                    },
                    "addToDescription": null,
                    "notActiveAddToDescription": null
                },
                {
                    "action": "tryCode", 
                    "actionDescription": {
                        "it": "Provo a inserire 123456, che in effetti non ho mai avuto fantasia per i codici",
                        "en": "I try 123456, I now that I never had much immagination for pins"
                    },
                    "addToDescription": null,
                    "notActiveAddToDescription": null
                },	 
                {
                    "action": "pickUp", 
                    "actionDescription": {
                        "it": "Predi l'amuleto",
                        "en": "Take the amulet"
                    },
                    "addToDescription": {
                        "it": "<br /> Un amuleto di protezione, non molto macho ma ti puo' davvero salvare la vita",
                        "en": "<br /> A protection amulet, it's not very manly but it can really save your life"
                    },
                    "notActiveAddToDescription": null
                },	 
                {
                    "action": "pickUp", 
                    "actionDescription": {
                        "it": "Prendi le monete d'oro",
                        "en": "Take the gold coins"
                    },
                    "addToDescription": {
                        "it": "<br />Un sacchetto con 237 monete d'oro",
                        "en": "<br />A bag with 237 gold coins inside"
                    },
                    "notActiveAddToDescription": null
                },	 
                {
                    "action": "pickUp", 
                    "actionDescription": {
                        "it": "Prendi il biglietto della diligenza",
                        "en": "Take the coach ticket"
                    },
                    "addToDescription": {
                        "it": "<br />Il biglietto della diligenza per domani",
                        "en": "<br />The ticket of the coach leaving tomorrow"
                    },
                    "notActiveAddToDescription": null
                },	 
                ],
                "contentTrigger": []
            },
            {
                "id" : "bigShelf4",
                "name": {
                    "it": "Armadio",
                    "en": "Wardrobe"
                },
                "description": {
                    "it": "E' l'armadio del mio ufficio",
                    "en": "It's my office wardrobe "
                },
                "containsDescription" : {
                    "it": "<br /> qui dentro tengo:",
                    "en": "<br /> here I keep:"
                },
                "triggers": [],
                "contentTrigger": [
                {
                    "action": "pickUp", 
                    "actionDescription": {
                        "it": "Prendi l'elegante cappello",
                        "en": "Take the elegant hat"
                    },
                    "addToDescription": {
                        "it": " <br /> Un elegante cappelo con piuma di fagaino",
                        "en": " <br /> An elegant hat with a turkey feahter on it"
                    },
                    "notActiveAddToDescription": null
                },
                {
                    "action": "pickUp", 
                    "actionDescription": {
                        "it": "Prendi l'armatura di cuoio",
                        "en": "Take leather armor"
                    },
                    "addToDescription": {
                        "it": " <br /> Un armatura di cuoio, la mia migliore amica, si puo' mettere sotto la giacca e ti puo' evitare operazioni di appendicite non richieste",
                        "en": " <br /> A leather armor, it's my best friend, you can wear it under the jacket and it's perfect to avoid unwanted surgeys"
                    },
                    "notActiveAddToDescription": null
                }
                ]
            },
            {
                "id": "door",
                "name": {
                    "it": "Door",
                    "en": "Porta"
                },
                "description": {
                    "it": "E' una porta, di quelle proprio a forma di porta, con una maniglia per aprirla e una porta tutto attorno, sono quasi sicuro che hai capito di cosa si tratta",
                    "en": "It'a door, door shaped with an handle in the middle an door all around, I'm almost sure you got it"
                },
                "containsDescription": null,
                "triggers": [
                {
                    "action": "openClose",
                    "actionDescription": {
                        "it": "Apri la port",
                        "en": "Open the door",
                    },
                    "addToDescription": null,
                    "notActiveAddToDescription": null
                },
                
            ],
            "contentTrigger": []
    }
]};
return objectsJSON;
}

function loadObjectsStrings (object, lang)
{
	var json = loadObjectsJSON();
	for(var i=0; i < json.objects.length; i++)
	{
		if(json.objects[i].id == object.id)
		{
			object.name = json.objects[i].name[lang];
			object.description = json.objects[i].description[lang];
			
			if(object.containsDescription)
			{
				object.containsDescription = json.objects[i].containsDescription[lang];
			}
			for(var j=0; j < object.triggers.length; j++)
			{
				object.triggers[j].actionDescription = json.objects[i].triggers[j].actionDescription[lang];
				if(object.triggers[j].addToDescription)
				{
					object.triggers[j].addToDescription = json.objects[i].triggers[j].addToDescription[lang];
				}
				if(object.triggers[j].notActiveAddToDescription)
				{
					object.triggers[j].notActiveAddToDescription = json.objects[i].triggers[j].notActiveAddToDescription[lang];
				}
			}
			for(var j=0; j < json.objects[i].contentTrigger.length; j++)
			{
				object.contentTrigger[j].actionDescription = json.objects[i].contentTrigger[j].actionDescription[lang];
				if(object.contentTrigger[j].addToDescription)
				{
					object.contentTrigger[j].addToDescription = json.objects[i].contentTrigger[j].addToDescription[lang];
				}
				if(object.contentTrigger[j].notActiveAddToDescription)
				{
					object.contentTrigger[j].notActiveAddToDescription = json.objects[i].contentTrigger[j].notActiveAddToDescription[lang];
				}
			}
			
		}
	}
}
