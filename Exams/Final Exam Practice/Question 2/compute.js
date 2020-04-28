self.onmessage = handleMessage;

function handleMessage(data) {
    data = JSON.stringify(data)
    console.log("worker")
    setTimeout(() => { self.postMessage(data) }, 1000)
}