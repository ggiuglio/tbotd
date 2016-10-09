function loadlevelJSON() {
    var levelsJSON = {
        "levels": [
        {
            "id": "laFugaDiTzel",
            "chapterName": {
                "it": "La fuga di Tzel",
                "en": "Tzel getaway"
            },
            "levelDescription": {
                "it": "Tzel lavora come pubblico ministero nelle prigioni di Darkhold ma, a seguito di un repentineo cambiamento politico, si ritrova in una brutta situazione, vedendo la concreta possibilita' di passare lato sbagliato della forca decide di cambiare aria al piu' presto. Prima di prendere la diligenza pero' passa in ufficio a recuperare le sue cose e qui si accorge di essersi mosso un po' troppo tardi...",
                "en": "Tzel works as a prosecutor in Darkhold jails but, after a quick political change, he find himself in a bad position with good chances to end up on the wrong side of the gallows. So he decides is time to get away, quickly. Before taking the coach he still needs to check his old office to retrieve his belongings, once there he finds out it's already a bit too late..."
            },
            "winDescrption": {
                "it": "Tzel e' riuscito a scappare dai suoi vendicativi colleghi e ora puo' andare a prendere la diligenza che lo portera' le sue candide chiappe in luoghi piu' salubri",
                "en": "Tzel made it getting away from his former collegues revenge and now he is free to take the coach that will haul is shiny little ass to safer places"
            },
            "looseDescription1": {
                "it": "No. L'idea non era quella di lasciare che questi galantuomi mi impiccassero, strano vero?",
                "en": "Believe it or not, the idea was not to let this gentelmen hung me"
            },
            "looseDescription2": {
                "it": "Tzel e' morto e, per quanto possa sembrare strano, non era questo l'obbiettivo del livello 'La fuga di Tzel' se no l'avremmo chiamato 'La morte di Tzel' non ti pare?'",
                "en": "Tzel is dead and, strange as it sounds, that was not the goal of the 'Tzel getaway' mission, or we would have called it 'Tzel death', isn't it?"
            }
        }
        ]
    }

    return levelsJSON;
}

function loadLevelStrings(level, lang) {
    var json = loadlevelJSON();
    for (var i = 0; i < json.levels.length; i++) {
        if (json.levels[i].id == level) {
            chapterName = json.levels[i].chapterName[lang];
            levelDescription = json.levels[i].levelDescription[lang];
            winDescrption = json.levels[i].winDescrption[lang];
            looseDescription1 = json.levels[i].looseDescription1[lang];
            looseDescription2 = json.levels[i].looseDescription2[lang];
        }
    }
}
