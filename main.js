Webcam.set({ 
    height:300,
    width:350, 
    image_format:'png',
    png_quality:90
}); 

Webcam.attach("#camera");  

function take_snapshot() 
{ 
    Webcam.snap(function(data_uri)  
    { 
        document.getElementById("result").innerHTML = '<img id="captured_img"src="'+data_uri+'">'; 

    }); 

}  

var prediction1="" ;

var prediction2="" ; 


console.log('ml5 version:',ml5.version); 
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelloaded); 
 
function modelloaded() 
{ 
    console.log("model has been loaded");
} 

function speak() 
{ 
 var synth = window.speechSynthesis; 
 speak_data_1 = "the first prediction is " + prediction1; 
 speak_data_2 = "and the second prediction is " + prediction2; 
 var utterthis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);  
 synth.speak(utterthis);
}

function check() 
{ 
    console.log("inside check");
     img=document.getElementById("captured_img");
     classifier.classify(img,gotResult); 
}  


function gotResult(error,results) 
{  
    console.log("inside got result");
if(error) 
{
    console.log(error) ;
} 
if(results) 
{ 
     console.log(results); 
     prediction1=results[0].label; 
     prediction2=results[1].label; 
     document.getElementById("Pridiction1").innerHTML=prediction1; 


     document.getElementById("Pridiction2").innerHTML=prediction2;  
     
     if(prediction1=="happy")
     { 
document.getElementById("emoji1").innerHTML="&#128512;"; 
    }
    if(prediction1=="sad")
    { 
document.getElementById("emoji1").innerHTML="&#128532;"; 
   } 
   if(prediction1=="angry")
     { 
document.getElementById("emoji1").innerHTML="&#128545;"; 
    }

    if(prediction2=="happy")
    { 
document.getElementById("emoji2").innerHTML="&#128512;"; 
   }
   if(prediction2=="sad")
   { 
document.getElementById("emoji2").innerHTML="&#128532;"; 
  } 
  if(prediction2=="angry")
    { 
document.getElementById("emoji2").innerHTML="&#128545;"; 
   }
speak();
}

} 

