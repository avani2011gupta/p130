song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.position(430,170);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is initialized");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    
    song1_status = song1.isPlaying();
    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);

            song2.stop();

        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song_name").innnerHTML = "Playing - Harry Potter Theme Song";
        }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

            song1.stop();

        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song_name").innnerHTML = "Playing - Peter Pan Song";
        }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + scoreLeftWrist + "Score Right Wrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
    }
}
