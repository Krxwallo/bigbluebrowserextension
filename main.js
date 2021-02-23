console.log("TEST:");


var oldMap;
function loop() {
    var participants = document.body
        .querySelector('main[class^="main"]')
        .querySelector('div[class^="userListColumn"]') // userListColumn
        .querySelector('div[class^="scrollableList"]') // scrollable list
        .querySelector('div[class^="list"]')           // list
        .firstElementChild // actual user list with child elements: div class=participantsList
        .children
    ;

    var statusMap = {};
    var changedMap = [];
    let i;
    for (i = 0; i < participants.length; i++) {
        var name = participants[i]
            .querySelector('div[class^="userName"]')
            .getAttribute('aria-label')
            .split('  ')[0]
        ;
        var status = participants[i]
            .querySelector('div[class^="avatar"]')
            .getAttribute('class')
            .split(' ')[1] // e.g. muted--2oPUk4
            .split('--')[0] // e.g. muted
        ;
        // Ignore noVoice
        if (status === "noVoice") continue;
        statusMap[name] = status;
        if (oldMap) {
            if (oldMap[name] !== status) {
                changedMap.push([name, status]);
                console.log("Got changed status: " + name + "  |  " + status);
            }
        }

    }
    oldMap = statusMap;


    if (changedMap.length > 0) {
        let x;
        for (x=0; x<changedMap.length; x++) {
            // noinspection JSUnresolvedFunction
            browser.runtime.sendMessage(changedMap[x][0] + "_" + changedMap[x][1]);
        }
    }
    //browser.runtime.sendMessage("Hi from main.js");


}

setInterval(loop, 20);
console.log("THE END");