//https://teachablemachine.withgoogle.com/models/q9ENZUTyX/model.json

prediction_1 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/q9ENZUTyX/model.json" , modelLoaded);

 function modelLoaded() {
    console.log("Model Loaded! ");
 }
 function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
 }


 function gotResult(error, results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("status").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        var synth = window.speechSynthesis;
        speak_data = "Your "+results[0].label;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
        if (results[0].label == "Entry Accepted") {
            document.getElementById("update_emoji").innerHTML = "&#x1F637;";
        } else {
            document.getElementById("update_emoji").innerHTML = "&#x26d4;";
        }
    }
 }

