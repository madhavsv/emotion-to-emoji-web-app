prediction1="";
preadiction2="";
Webcam.set({
    width:400,
    height:400,
    image_format:'png',
    png_quality:100
});

camera=document.getElementById("camera");
Webcam.attach('#camera');
function snapshot() {
    Webcam.snap(function (data_uri) {
      document.getElementById("result").innerHTML='<img id="capture_image" src="' + data_uri +'">';
    });
}
console.log('ml5:version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7ikGPcV9k/model.json',modelLoaded);
function modelLoaded() {
    console.log("model loaded!");
}
    function speak() {
        var synth=window.speechSynthesis;
        speak_data1="the first prediction is" + prediction1;
        speak_data2="and the second prediction is" + preadiction2;
        utterthis=new SpeechSynthesisUtterance(speak_data1 + speak_data2);
        synth.speak(utterthis);
    }
    function get_prediction() {
        img=document.getElementById("capture_image");
        classifier.classify(img,gotResult);
        
    }
function gotResult(error,results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if (results[0].label=="happy") {
            document.getElementById("result_emotion_emoji").innerHTML="&#128522;"; 
        }
        if (results[0].label == "sad") {
            document.getElementById("result_emotion_emoji").innerHTML="&#128532;";
            
        }
        if (results[0].label == "angry") {
            document.getElementById("result_emotion_emoji").innerHTML="&#128548;";
            
        }
        if (results[1].label == "happy") {
            document.getElementById("result_emotion_emoji2").innerHTML="&#128522;";

            
        }
        if (results[1].label == "sad") {
            document.getElementById("result_emotion_emoji2").innerHTML="&#128532;";

            
        }
        if (results[1].label == "angry") {
            document.getElementById("result_emotion_emoji2").innerHTML="&#128548;";
            
        }
    }
    
}
