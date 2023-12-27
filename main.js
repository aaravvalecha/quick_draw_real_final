var array_1=["rain","chair","banana","door","donut","legs","line","smiley_face","apple","basketball","rain","brain","grapes","grass"];
var random_number= Math.floor((Math.random()*array_1.length)+1);
var quick_draw_data_set  = array_1[random_number];
document.getElementById("sketch_drawn").innerHTML="Sketch to be Drawn : "+quick_draw_data_set;



var timer_counter=0;

var timer_check="";

var drawn_sketch="";

var answer_holder="";

var score=0;



function setup(){

    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classify_canvas);

    

}
function updateCanvas(){
   
    background("white");
    var random_number= Math.floor((Math.random()*array_1.length)+1);
    var quick_draw_data_set  = array_1[random_number];
    document.getElementById("sketch_drawn").innerHTML="Sketch to be Drawn : "+quick_draw_data_set;
    console.log( quick_draw_data_set);
    
    
}






function preload(){
    classifier=ml5.imageClassifier('DoodleNet',model_loaded);
}
function model_loaded(){
    console.log("maodel loaded");
}


function classify_canvas(){

    classifier.classify(canvas,gotresult);
}
function gotresult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);

    drawn_sketch=results[0].label;

    document.getElementById("label").innerHTML="Your Sketch: "+drawn_sketch;
    document.getElementById("confidence").innerHTML="Confidence: "+(results[0].confidence*100).toFixed(0)+"%";

}

function draw(){
    strokeWeight(8);
    stroke(0);
   
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }

check_sketch();

if(drawn_sketch==quick_draw_data_set){

    answer_holder="set";

    score= +1 ;
    
    document.getElementById("score").innerHTML="score: "+score;

  
}

}

function check_sketch(){
    

        timer_counter++ ;
        document.getElementById("timer").innerHTML="Timer:"+timer_counter;
        console.log(timer_counter);


    if(timer_counter>900){
         timer_counter=0;
         timer_check="completed"; 

         
         if(timer_check=="completed" || answer_holder=="set"){

            timer_check= "";
            answer_holder= "";
            updateCanvas();
            
         }
    }
    


}