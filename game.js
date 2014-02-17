//GLOBALS
var mover = [
	{"name":"frog" , "x": 179, "y": 497, "width": 24,"height": 19, "offx": 12, "offy": 367},
	{"name":"truck", "x": 70, "y": 327, "width": 49,"height": 20, "offx": 105, "offy":302, "dir": "l","speed":4},
	{"name": "car1", "x": 320, "y": 358, "width": 30,"height": 27, "offx": 46, "offy": 264, "dir":"r","speed":4},
	{"name": "car2", "x": 14, "y": 395, "width": 30,"height": 24, "offx": 9, "offy": 265, "dir":"l","speed":4},
	{"name": "car3", "x": 122, "y": 430, "width": 30,"height": 24, "offx": 8, "offy": 300, "dir":"r","speed":4},
	{"name": "car4", "x": 320, "y": 463, "width": 26,"height": 28, "offx": 80, "offy": 263, "dir":"l","speed":4},
	{"name": "log1", "x": 89, "y": 112, "width": 116,"height": 23, "offx": 7, "offy":197, "dir":"r","speed":4},
	{"name": "log2", "x": 250, "y": 182, "width": 179,"height": 23, "offx": 7, "offy":165, "dir":"r","speed":4},
	{"name": "log3", "x": 45, "y": 217, "width": 85,"height": 23, "offx": 7, "offy": 229, "dir":"r", "speed":4},
    {"name": "log3-2", "x": 320, "y": 217, "width": 85,"height": 23, "offx": 7, "offy": 229, "dir":"r", "speed":4},
	{"name": "turtle1", "x": 200, "y": 147, "width": 33,"height": 23, "offx": 14, "offy":406, "dir":"l", "speed": 3},
	{"name": "turtle2", "x": 24, "y": 252, "width": 33,"height": 23, "offx": 14, "offy":406, "dir": "l", "speed": 3},
];
var score, highscore, lives;


function start_game() {
    canvas = document.getElementById('game');
    up = down = left = right = false;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        gamebackground();
        img = new Image();
        img.src = "assets/frogger_sprites.png";
        img.onload = function(){
        	initglobals();
        	gameloopID = setInterval(gameloop,30);
        }     
    }
    else {alert('Canvas is not supported on your browser');}
}
//called from html body event attribute
function userinput(event){
    console.log(event.keyCode);
	if(event.keyCode == 37 && mover[0].x > mover[0].width)mover[0].x -= 28; //left
	if(event.keyCode == 38 && mover[0].y > 110){  //up
		mover[0].y -= 35;
		moveup = true;
	}
	if(event.keyCode == 39 && mover[0].x < 350)mover[0].x += 28; //right
	if(event.keyCode == 40 && mover[0].y < 497)mover[0].y += 35; //down

}
function gameloop(){
    gamebackground();
    renderbackgroundelems(img);
	rendergameinfo();
    rendermovingitems(img);  
    collisiondetection(); 
    incrementmovers();
}
//checks for collision with vehicles, water, or green zone. Calls death() if frog has 
//collided. Also increases score if successfully moved up or got home. Calls nextlevel()
//if appropriate
function collisiondetection(){
	switch(mover[0].y)
	{
		case 462:
			if((mover[0].x + mover[0].width) >= mover[5].x && mover[0].x < (mover[5].x + mover[5].width)) death();
			break;
		case 427:
			if((mover[0].x + mover[0].width) >= mover[4].x && mover[0].x <= (mover[4].x + mover[4].width)) death();
			break;
		case 392:
			if((mover[0].x + mover[0].width) >= mover[3].x && mover[0].x < (mover[3].x + mover[3].width)) death();
			break;
		case 357:
			if((mover[0].x + mover[0].width) >= mover[2].x && mover[0].x <= (mover[2].x + mover[2].width)) death();
			break;
		case 322:
			if((mover[0].x + mover[0].width) >= mover[1].x && mover[0].x < (mover[1].x + mover[1].width)) death();
			break;
		//DEATH WATER
	    case 252:
	        if((mover[0].x + mover[0].width) <= mover[11].x || mover[0].x > (mover[11].x + 3*mover[11].width))death();
	        else mover[0].x -= mover[11].speed;
			break;
		case 217:
		    if(((mover[0].x + mover[0].width) <= mover[8].x || mover[0].x > (mover[8].x + mover[8].width)) && 
		       ((mover[0].x + mover[0].width) <= mover[9].x || mover[0].x > (mover[9].x + mover[9].width)))death();
	        else mover[0].x += mover[8].speed;
			break;
		case 182:
		    if((mover[0].x + mover[0].width) <= mover[7].x || mover[0].x > (mover[7].x + mover[7].width))death();
	        else mover[0].x += mover[7].speed;
			break;
		case 147:
		    if((mover[0].x + mover[0].width) <= mover[10].x || mover[0].x > (mover[10].x + 3*mover[10].width))death();
	        else mover[0].x -= mover[10].speed;
			break;
		case 112:
	    	if((mover[0].x + mover[0].width) <= mover[6].x || mover[0].x > (mover[6].x + mover[6].width))death();
	        else mover[0].x += mover[6].speed;
	        break;
	    case 77:
	    	var check = false
	    	for(var i = 9; i <= 349; i += 85){
	    		if( (mover[0].x + mover[0].width) >= i && mover[0].x <= (i+35))check = true;
	    	}
	    	if(check == false) death();
	    	else{
	    		score += 50;
	    		mover[0].x = 179;
				mover[0].y = 497;
				froghome += 1;
				if(froghome == 5)
				{
					nextlevel();
				}	
	    	}
	    	break;
		
	}
    if(moveup == true) score += 10;
    moveup = false;
    if(score > highscore) highscore = score;
    if(score == 10000 && lives < 4)lives++;
}
function nextlevel(){
	score += 1000;
	level ++;
	for(i = 1; i < 12; i++){
		mover[i].speed += 0.5;
	}
}
function death(){
	lives--;
	moveup = false;
	if( lives == -1) {
		clearInterval(gameloopID);
	    mover[0].offx = 272;
	   	mover[0].offy = 196;
		gamebackground();
    	renderbackgroundelems(img);
		rendergameinfo();
    	rendermovingitems(img); 
		ctx.drawImage(deadfrg, 0, 0, 30, 30, mover[0].x, mover[0].y, 60, 60);
		mover[0].offx = 179;
	   	mover[0].offy = 497;
	}
	mover[0].x = 179;
	mover[0].y = 497;
 }
//initglobals() must be called first to assure there are valid
//x,y coordinates for all moving sprites
//Places player-frog, logs, and cars
function rendermovingitems(img){
	//Turtles
    ctx.drawImage(img, mover[10].offx, mover[10].offy, mover[10].width, mover[10].height, mover[10].x, mover[10].y, mover[10].width, mover[10].height);	
    ctx.drawImage(img, mover[10].offx, mover[10].offy, mover[10].width, mover[10].height, mover[10].x + mover[10].width, mover[10].y, mover[10].width, mover[10].height);	
	//-----
	ctx.drawImage(img, mover[11].offx, mover[11].offy, mover[11].width, mover[11].height, mover[11].x, mover[11].y, mover[11].width, mover[11].height);	
    ctx.drawImage(img, mover[11].offx, mover[11].offy, mover[11].width, mover[11].height, mover[11].x + mover[11].width, mover[11].y, mover[11].width, mover[11].height);	
    ctx.drawImage(img, mover[11].offx, mover[11].offy, mover[11].width, mover[11].height, mover[11].x + 2 * mover[11].width, mover[11].y, mover[11].width, mover[11].height);	
    //Frog, Logs, and Car
	for(var i = 9; i >= 0; i--){
    	ctx.drawImage(img, mover[i].offx, mover[i].offy, mover[i].width, mover[i].height, mover[i].x, mover[i].y, mover[i].width, mover[i].height); //(Truck)
	}
}

function incrementmovers(){
     for(var i = 1; i < 12; i++){
    	if(mover[i].dir == "r"){
    		 if(mover[i].x >= 399) mover[i].x = (0 - mover[i].width);
    		 mover[i].x += mover[i].speed;
    	}
    	else if( i == 11 || i == 10){
    		if(mover[i].x <= (0 - ((i-7) * mover[i].width))) mover[i].x =399;
    		mover[i].x -= mover[i].speed;
    	}
    	else{
    		if(mover[i].x <= (0 - mover[i].width)) mover[i].x =399;
    		mover[i].x -= mover[i].speed;    
    	}
     }
}
function renderbackgroundelems(img){
    //Frogger Header + Grass
	ctx.drawImage(img, 0, 0, 399, 110, 0, 0, 399, 110);    
	
	//Purple Safe Zones
	ctx.drawImage(img, 0, 120, 399, 35, 0, 284, 399, 35); 
	ctx.drawImage(img, 0, 120, 399, 35, 0, 494, 399, 35);    
}

//initglobals() must be called before to assure vars level,
//highscore and score are up to date
function rendergameinfo(){	
	//Level (Need Level Var)
	ctx.fillStyle ="#76EE00";
	ctx.font = '13pt arial';
	ctx.fillText( "Level " + level, 50, 542);
	
	//Score (Need Score Var)
	ctx.font = '10pt arial';
	ctx.fillText( "Score:" + score, 0, 560);
	ctx.fillText( "Highscore:" + highscore, 75, 560);
	
    //Lives (WILL NEED VAR FOR LIVES AND MAKE A LOOP
	for(i = 0; i < lives; i++){
		ctx.drawImage(img, 11, 335, 20, 22, (14 * i), 529, 13, 15); 
	}
}


function gamebackground(){
	ctx.fillStyle = "#191970";
	ctx.fillRect( 0, 0, 399, 282);
	ctx.fillStyle = "#000000";
	ctx.fillRect( 0, 282, 399, 283);
}
//Set global variables to their initial 
function initglobals(){
    score = highscore = 0;  
    level = 1;
    lives = 3;
    froghome = 0;
    deadfrg = new Image();
	deadfrg.src = "assets/dead_frog.png";
	moveup =false;
}