function same(){
    document.getElementById("heading1").style.backgroundColor="#f0ad4e";
}
function same1(){
    document.getElementById("speed").style.backgroundColor="#d9534f";
}
function same2(){
    document.getElementById("vol").style.backgroundColor="#d9534f";
}
function preload(){
    song=loadSound("music.mp3")
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("Posenet loaded");
}
function draw(){
    image(video,0,0,600,500);

    if(leftWristScore>0.20){
    fill("red");
    stroke("black");
    circle(leftWristX,leftWristY,20);
    number_leftWristY=Number(leftWristY);
    remove1=floor(number_leftWristY);
    volume=remove1/500;
    song.setVolume(volume);
    document.getElementById("vol").innerHTML="Volume : "+volume;
    }
    if(rightWristScore>0.2){
    fill("red");
    stroke("black");
    circle(rightWristX, rightWristY,20);
    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="Speed : 0.3x";
        song.rate(0.3);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="Speed : 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="Speed : 1x";
        song.rate(1);
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML="Speed : 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML="Speed : 2x";
        song.rate(2);
    }

}
}
function play(){
    song.play();
}
function pause(){
    song.pause();
}
song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWristScore=0;
rightWristScore=0;
function gotPoses(results){
    if(results.length>0){
        leftWristScore=results[0].pose.keypoints[9].score;
        rightWristScore=results[0].pose.keypoints[10].score;
        console.log(results)
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Left Wrist : X = "+leftWristX+" Y = "+leftWristY);
        console.log("Right Wrist : X = "+rightWristX+" Y = "+rightWristY);
        console.log("Left Wrist Score : "+leftWristScore);
        console.log("Right Wrist Score : "+rightWristScore);
    }
}