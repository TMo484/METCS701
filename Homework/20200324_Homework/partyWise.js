window.onload = init;

let senators = [];
let currSenator;

function init() {

    //check local storage for a list of the senators
    let localStorageSenators = window.localStorage.getItem("senators")
    if(localStorageSenators) {
        fetchSenatorsLocalStorage(localStorageSenators)
    } else {
        //if it doesn't exist, AJAX from XML file
        fetchSenatorsAJAX("partyList.xml")
    }

    let members = document.getElementById("members")
    let dropList = document.getElementById("dropLists")

    // add event listeners for the drag & drop events
    members.ondragstart = dragStartHandler
    members.ondragend = dragEndHandler

    dropList.ondragenter = dragEnterHandler;
    dropList.ondragleave = dragLeaveHandler;
    dropList.ondragover = dragOverHandler;
    dropList.ondrop = dropHandler;
}

function fetchSenatorsLocalStorage(list) {
    // parse the list of senators from the string in local storage (passed in)
    senators = JSON.parse(list)
    // update the web application to display the senators (and who has voted)
    loadRollCall()
    // let everyone know we got the data from LocalStorage
    document.getElementById("msg").innerHTML = `From LocalStorage Loaded ${senators.length} Senators`
}

function fetchSenatorsAJAX(file) {
    // async fetch the data from the XML file
    fetch(file).then(response => {
        // read the text of the file
        return response.text()
    }).then(data => {
        // technically not asked for update
        document.getElementById("msg").innerHTML = `AJAX Loaded Senators`
        // once the async call has completed, send it over to be loaded to the web application
        loadSenators(data)
    // watch for any errors
    }).catch(err => {
        document.getElementById("msg").innerHTML = `Failed to AJAX load senators! ${err}`
    })
}

function loadSenators(data) {
    // parse the raw text/XML data
    let xmlData = new DOMParser().parseFromString(data, "text/xml")

    // grab an HTMLCollection for each senator; used to loop through in next step
    let senatorList = xmlData.getElementsByTagName("senator")
    // loop through the HTMLCollection; calling each index, creating an object, and then pushing to an array
    for (let i=0; i<senatorList.length; i++) {
        let senator = {
            name: senatorList[i].getElementsByTagName("name")[0].textContent,
            party: senatorList[i].getElementsByTagName("party")[0].textContent,
            voted: false
        }
        senators.push(senator)
    }
    // add this array (stringified) to the local storage, in case of refreshes
    window.localStorage.setItem("senators", JSON.stringify(senators))
    // similar to the LocalStorage, update the web application
    loadRollCall()
    // let everyone know we got this from AJAX calls
    document.getElementById("msg").innerHTML = `From AJAX Loaded ${senators.length} Senators`
}

function loadRollCall() {
    // initialize some variables for updating the web application
    let senatorRollCall = ""
    let demoVoted = ""
    let repubVoted = ""
    // for each senator in the array, loop through
    for (let i=0; i<senators.length; i++) {
        // update all of them on to the roll call above the voting bins
        senatorRollCall += `<li draggable=true party=${senators[i].party} voted=${senators[i].voted}>${senators[i].name}</li>`
        // if the senator has voted, and is a democrat, add them to the democrat voted list
        if (senators[i].party === "Democrat" && senators[i].voted) {
            demoVoted += `<li>${senators[i].name}</li>`
        // if the senator has voted and is a republican, add them to the republican voted list
        } else if (senators[i].party === "Republican" && senators[i].voted) {
            repubVoted += `<li>${senators[i].name}</li>`
        }
    }
    // update all the necessary HTML tags with the bullet lists
    document.getElementById("members").innerHTML = senatorRollCall
    document.getElementById("democrats").innerHTML = demoVoted
    document.getElementById("republicans").innerHTML = repubVoted
}

function dragStartHandler(elem) {
    // This should be handled by the dataTransfer, but I couldn't get it working (and the ex06 exampl was broken as well)
    currSenator = elem.target
    elem.target.classList.add("dragged")
}

function dragEndHandler(elem) {
    let elems = document.querySelectorAll(".dragged")
    for (let i=0; i<elems.length; i++) {
        elems[i].classList.remove("dragged")
    }
    currSenator = undefined;
}

function dragEnterHandler(elem) {
    // if the party and the senator match, then create add the "highlighted" class to the tag
    if (elem.target.id.toLowerCase().includes(currSenator.getAttribute("party").toLowerCase())) {
        if(elem.target.id === "democrats") {
            elem.target.classList.add("highlightedDemocrats")
        } else if(elem.target.id === "republicans") {
            elem.target.classList.add("highlightedRepublicans")
        }
    }
    elem.preventDefault()
}

function dragLeaveHandler(elem) {
    // once we leave the tag, be sure to remove the "highlighted" class so it doesn't just stick around
    if (elem.target.id.toLowerCase().includes(currSenator.getAttribute("party").toLowerCase())) {
        if(elem.target.id === "democrats") {
            elem.target.classList.remove("highlightedDemocrats")
        } else if(elem.target.id === "republicans") {
            elem.target.classList.remove("highlightedRepublicans")
        }
    }
}

function dragOverHandler(elem) {
    // to ensure that we can't drop people into both parties, only prevent default for the div of the same party
    if (elem.target.id.toLowerCase().includes(currSenator.getAttribute("party").toLowerCase())) {
        if(elem.target.id === "democrats") {
            elem.preventDefault()
        } else if(elem.target.id === "republicans") {
            elem.preventDefault()
        }
    }
}

function dropHandler(elem) {
    // once we drop, handle removing the highlighting
    dragLeaveHandler(elem);  
    // loop through the senators and find the one that just voted; set their voted flag to true
    for(let i=0; i<senators.length; i++) {
        if(senators[i].name === currSenator.innerHTML) {
            senators[i].voted = true;
        }
    }
    // update the web application again
    loadRollCall()
    // overwrite the local storage
    window.localStorage.setItem("senators", JSON.stringify(senators))
}