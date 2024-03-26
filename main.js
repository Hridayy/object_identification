var Status = ""
objects = [];
function setup() {
    canvas = createCanvas(380, 380);
    canvas.position(550,220);
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("Status").innerHTML = "Status= Object Detecting"

}
function modelLoaded() {
    console.log("modelLoaded")
    Status = "true"

}
function gotresults(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results)
    objects = results;
}
function draw() {
    image(video, 0, 0, 380, 380)
    if (Status == "true") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotresults)
        for (i = 0; i < objects.length; i++) {
            fill(r, g, b);
            console.log("fill")
            text(objects[i].label, objects[i].x + 15, objects[i].y + 15)
            console.log("text")
            document.getElementById("Status").innerHTML = "Status = Object Detected"
            document.getElementById("number_of_objects").innerHTML = "Number of objects Detected are : " + objects.length
            noFill()
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}