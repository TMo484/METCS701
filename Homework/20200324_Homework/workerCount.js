self.onmessage = messageHandler;

function messageHandler(event) {
    // create an artifical lag for visual purposes
    setTimeout(function() {
        // initialize an accumulator value
        let accumulator = 0;
        // loop through the start -> end values, adding to the accumulator
        for(let i=event.data.start; i<event.data.end; i++) {
            accumulator += i;
        }
        // store the results in an object (plus the ID for identification purposes)
        result = {
            id: event.data.id,
            start: event.data.start,
            end: event.data.end,
            result: accumulator
        }
        // send a message with the object back to the main JS
        self.postMessage(result)
    }, Math.random() * 3000)
}