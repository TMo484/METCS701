window.onload = init;

let numWorkers = 5;
let workerResults = [];

function init() {

    for(let i=0; i<numWorkers; i++) {
        let worker = new Worker("compute.js")
        worker.onmessage = handleReturn
        worker.postMessage({
            id: i
        })
    }
}

function handleReturn(data) {
    console.log(data)
    workerResults.push(data)
    showData()
}

function showData() {
    let html = ""
    for(let i=0; i<workerResults.length; i++) {
        html += `<p>${workerResults[i]["id"]}</p>`
    }
    document.getElementById("container").innerHTML = html;
}