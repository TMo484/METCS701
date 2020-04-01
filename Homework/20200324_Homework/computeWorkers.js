window.onload = init;

let numWorkers = 5;
let workerResults = [];

function init() {

    // clear the local storage, incase the key already exists
    window.localStorage.removeItem("workerSums")

    // start 5 workers, and send them each a message for the start and end values
    for(let i=0; i<numWorkers; i++) {
        // create the worker
        let worker = new Worker("workerCount.js")
        // handle the response from the worker
        worker.onmessage = handleReceipt;
        // send the message to the worker; containing start and end values (plus, and ID for identification later)
        worker.postMessage({
            id: i,
            start: (1000 * i) + 1,
            end: (1000 * (i+1))
        })
    }
}

function handleReceipt(event) {
    // retrieve data from the workers, add it to the list
    workerResults.push(event.data)
    // store the results in local storage
    window.localStorage.setItem("workerSums", JSON.stringify(workerResults))
    // refresh the web application
    showWork();
}

function showWork() {
    // initialize some variables for handling results
    let workerBullets = "";
    let total = 0;
    // loop through the completed workers
    for (let i=0; i<workerResults.length; i++) {
        currWorker = workerResults[i]
        // add an <li> for each worker to the list
        workerBullets += `<li>Worker #${currWorker.id} computed the sum between ${currWorker.start} and ${currWorker.end}; for a total of: ${currWorker.result}</li>`
        // compute the running total of all workers completed so far
        total += currWorker.result
    }

    // update the web application tags
    document.getElementById("workerList").innerHTML = workerBullets;
    document.getElementById("accumulatedValue").innerHTML = `Total Accumulated: ${total}`
}