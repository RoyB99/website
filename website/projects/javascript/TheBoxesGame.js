var single_player;
var single_player_choosen = 1;
// window width & height
var ww = window.innerWidth;
var wh = window.innerHeight;
// hash map for keys
var keys = {};
// arrays for boxes & score boxes
var boxes = [];
var score_boxes=[];
// intervals
var p_interval;
var b_interval;
var create_boxes;
var create_score_boxes;
var t_interval;
// players
var p1;
var p2;
// timer duration
var time;
var seconds = document.getElementById('seconds');
var minutes = document.getElementById('minutes');
var single_seconds = document.getElementById('single_seconds');
var single_minutes = document.getElementById('single_minutes');
// game over boolean
var draw;
var game_over = true;
// check if esc is pressed
document.addEventListener('keydown',function(e){ checkkeypress(e); });
// starts the game
//window.onload = startgame();

//
//			First screen options
//
function showsingleplayer(){
	document.getElementById('choose_game_type').style.visibility = 'hidden';
	document.getElementById('start_singleplayer').style.visibility = 'visible';
}
function showmultiplayer(){
	document.getElementById('choose_game_type').style.visibility = 'hidden';
	document.getElementById('start_multiplayer').style.visibility = 'visible';
} 
//
//				Singleplayer
//
function startsinglegame(){
	game_over = false;
	reset_timer();
	document.getElementById('start_singleplayer').style.visibility = 'hidden';
	document.getElementById('end_singleplayer').style.visibility = 'hidden';
	document.getElementById('single_game_bar').style.visibility = 'visible';
	single_player = true;
	ww = window.innerWidth;
	wh = window.innerHeight;
	boxes = [];
	score_boxes=[];
	time = 0;
	single_setsetting(single_player_choosen);
	document.addEventListener('keydown',function(e){down(e);});
	document.addEventListener('keyup',function(e){up(e);});
	b_interval = setInterval(move_b,10);
	setTimeout(createinitials_b,30);
	create_score_boxes = setInterval(create_score_box,2000);
	t_interval = setInterval(single_timer,1000);	
}
function single_setsetting(p_num){
	var lives_object = 'player_lives', score_object = 'player_score';
	if(p_num) // true for player 1
	{
		p1 = new player('r',lives_object,score_object,'red','#ff4d4d','600px',1,"");
		p1.score = 0;
		p1.lives = 3;
		p1.lives_object.innerHTML = '3';
		p1.score_object.innerHTML = '0';
		p_interval = setInterval(single_player1move,6);
		document.getElementById('single_game_bar').style.backgroundColor = 'red';		
	}
	else
	{
		p2 = new player('b',lives_object,score_object,'blue','#8080ff','600px',2,"");
		p2.score = 0;
		p2.lives = 3;
		p2.lives_object.innerHTML = '3';
		p2.score_object.innerHTML = '0';
		p_interval = setInterval(single_player2move,6);
		document.getElementById('single_game_bar').style.backgroundColor = 'blue';
	}
}
function single_player1move(){
	if(p1.lives)
	{
		// p1 properties
		var p1_l = parseInt(p1.id_object.style.left), p1_t = parseInt(p1.id_object.style.top);
		// p1 check if is touching box
		if(iftouching_b(p1.id_object)  && !p1.ishitted)
		{
			 strike(p1);
		}
		// score handler
		touched_s_b(p1);
		// p1_move_functions
		if(keys[68] && allowmoveright(p1.id_object))//right
		{
			p1.id_object.style.left = parseInt(p1_l + 1) + "px";
		}
		if(keys[65] && allowmoveleft(p1.id_object))//left
		{
			p1.id_object.style.left = parseInt(p1_l - 1) + "px";
		}
		if(keys[87] && allowmoveup(p1.id_object))//up
		{
			p1.id_object.style.top = parseInt(p1_t - 1) + "px";
		}
		if(keys[83] && allowmovedown(p1.id_object))//down
		{
			p1.id_object.style.top = parseInt(p1_t + 1) + "px";
		}
	}
}
function single_player2move(){
	if(p2.lives)
	{
		// p2 properties
		var p2_l = parseInt(p2.id_object.style.left), p2_t = parseInt(p2.id_object.style.top);
		// p2 check if is touching box
		if(iftouching_b(p2.id_object) && !p2.ishitted)
		{
			strike(p2);
		}
		// score handler
		touched_s_b(p2);
		// p2_move_functions
		if(keys[39] && allowmoveright(p2.id_object))//right
		{
			p2.id_object.style.left = parseInt(p2_l + 1) + "px";
		}
		if(keys[37] && allowmoveleft(p2.id_object))//left
		{
			p2.id_object.style.left = parseInt(p2_l - 1) + "px";
		}
		if(keys[38] && allowmoveup(p2.id_object))//up
		{
			p2.id_object.style.top = parseInt(p2_t - 1) + "px";
		}
		if(keys[40] && allowmovedown(p2.id_object))//down
		{
			p2.id_object.style.top = parseInt(p2_t + 1) + "px";
		}
	}
}
function single_timer(){
	if(!game_over)
	{
		time++;
		if(time % 60 < 10)
		{
			single_seconds.innerHTML = '0' + time % 60;
		}
		else
		{
			single_seconds.innerHTML = time % 60;
		}
		single_minutes.innerHTML = Math.floor(time/60);
	}
}
function single_gameover(){
	game_over = true;
	single_player = false;
	document.removeEventListener('keydown',function(e){down(e);});
	document.removeEventListener('keyup',function(e){up(e);});
	clearInterval(b_interval);
	clearInterval(p_interval);
	clearInterval(create_boxes);
	clearInterval(create_score_boxes);
	clearInterval(t_interval);
	boxes.forEach(function(b) {	b.box.remove();});
	score_boxes.forEach(function(b) { b.box.remove();});
	document.getElementById('single_game_bar').style.visibility = 'hidden';
	single_endgamescreen();
}
//
//				Multiplayer
//
function startgame(p1_name,p2_name){
	game_over = false;
	draw = false;
	single_player = false;
	ww = window.innerWidth;
	wh = window.innerHeight;
	p1 = new player('r','player1lives','player1score','red','#ff4d4d','400px',p1_name);
	p2 = new player('b','player2lives','player2score','blue','#8080ff','800px',p2_name);
	document.getElementById('p1_name').innerHTML = p1_name;
	document.getElementById('p2_name').innerHTML = p2_name;
	document.getElementById('game_bar').style.visibility = 'visible';
	boxes = [];
	score_boxes=[];
	time = 120;
	reset_timer();
	reset_score();
	reset_lives();
	document.addEventListener('keydown',function(e){down(e);});
	document.addEventListener('keyup',function(e){up(e);});
	p_interval = setInterval(move,6);
	b_interval = setInterval(move_b,9);
	setTimeout(createinitials_b,30);
	create_score_boxes = setInterval(create_score_box,5900);
	t_interval = setInterval(timer,1000);
}
//
//		objects
//
//		player object
function player(id,lives_object,score_object,color,hittedcolor,left,name){
	this.id = id;
	this.lives = 3;
	this.lives_object = document.getElementById(lives_object);
	this.score = 0;
	this.score_object = document.getElementById(score_object);
	this.color = color;
	this.ishitted = false;
	this.hittedcolor = hittedcolor;
	this.top = '250px';
	this.left = left;
	this.id_object = create_player_look(color,'250px',left,id);
	this.name = name;
}
//		box object
function box(d) {
	if(!game_over)
	{
		var box = document.createElement('div');
		box.style.position = 'absolute';
		box.style.width = '70px';
		box.style.height = '70px';
		box.style.backgroundColor = 'black';
		box.setAttribute('class', 'box');
		if(d)
		{
			// horizontal box
			box.style.left = '5px';
			box.style.top = Math.floor((Math.random() * (wh-105))+35)+'px';
			this.move = function(){ move_b_h(box); };
		}
		else
		{
			// vertical box
			box.style.top = '35px';
			box.style.left = Math.floor((Math.random() * (ww-75)) + 5)+'px';	
			this.move = function(){ move_b_v(box); };
		}
		document.body.appendChild(box);
		this.box = box;
		this.lim = true;
	}
}
//		score_box object
function score_box(){
	if(!game_over)
	{
		var s_box = document.createElement('div');
		s_box.style.position = 'absolute';
		s_box.style.width = '15px';
		s_box.style.height = '15px';
		s_box.style.zIndex  = '1';
		s_box.style.backgroundColor = 'gold';
		s_box.setAttribute('class', 'score_box');
		s_box.style.left = Math.floor((Math.random() * (ww-170))+100) +'px';
		s_box.style.top = Math.floor((Math.random() * (wh-100)) + 50)+'px';
		document.body.appendChild(s_box);	
		this.box = s_box;
		this.collected = false;
	}
}

//
//		window limits
//
// check if an object is in the end of the window 
function allowmoveleft(x){
	if(0 >= parseInt(x.style.left))
		return false;
	return true;
}
function allowmoveright(x){
	if(ww <= parseInt(x.style.left) + parseInt(x.style.width))
		return false;
	return true;
}
function allowmoveup(x){
	if(30 >= parseInt(x.style.top))
		return false;
	return true;
}
function allowmovedown(x){
	if(wh <= parseInt(x.style.top) + parseInt(x.style.height))
		return false;
	return true;
}	

//
//		player objects
//	
// creats the players look
function create_player_look(color,top,left,id){
	var player = document.createElement('div');
	player.style.position = 'absolute';
	player.style.backgroundColor = color;
	player.style.top = top;
	player.style.left = left;
	player.style.width = '30px';
	player.style.height = '30px';
	player.style.zIndex = '2';
	player.style.textAlign = 'center';
	player.style.fontSize = '25px';
	player.style.fontWeight = '700';
	player.setAttribute('id', id);
	document.body.appendChild(player);
	return player;
}
// check if there is a keydown that moves the players
function down(e) 
{
	var x = e.which || e.keyCode;
	if(x == 65 || x == 68 || x == 87 || x == 83)
	{
		keys[x] = true;
	}
	if(x == 37 || x == 39 || x == 38 || x == 40)
	{
		keys[x] = true;
	}
}
// check if there is a keyup that moves the players
function up(e)
{
	var x = e.which || e.keyCode;
	if(x == 65 || x == 68 || x == 87 || x == 83)
	{
		keys[x] = false;
	}
	if(x == 37 || x == 39 || x == 38 || x == 40)
	{
		keys[x] = false;
	}
}
// move the players
function move(){
	if(p1.lives)
	{
		// p1 properties
		var p1_l = parseInt(p1.id_object.style.left), p1_t = parseInt(p1.id_object.style.top);
		// p1 check if is touching box
		if(iftouching_b(p1.id_object)  && !p1.ishitted)
		{
			 strike(p1);
		}
		// score handler
		if(p1.score >= 100)
		{
			gameover(p1);
		}
		touched_s_b(p1);
		// p1_move_functions
		if(keys[68] && allowmoveright(p1.id_object))//right
		{
			p1.id_object.style.left = parseInt(p1_l + 1) + "px";
		}
		if(keys[65] && allowmoveleft(p1.id_object))//left
		{
			p1.id_object.style.left = parseInt(p1_l - 1) + "px";
		}
		if(keys[87] && allowmoveup(p1.id_object))//up
		{
			p1.id_object.style.top = parseInt(p1_t - 1) + "px";
		}
		if(keys[83] && allowmovedown(p1.id_object))//down
		{
			p1.id_object.style.top = parseInt(p1_t + 1) + "px";
		}
	}
	if(p2.lives)
	{
		// p2 properties
		var p2_l = parseInt(p2.id_object.style.left), p2_t = parseInt(p2.id_object.style.top);
		// p2 check if is touching box
		if(iftouching_b(p2.id_object) && !p2.ishitted)
		{
			strike(p2);
		}
		// score handler
		touched_s_b(p2);
		if(p2.score >= 100)
		{
			gameover(p2);
		}
		// p2_move_functions
		if(keys[39] && allowmoveright(p2.id_object))//right
		{
			p2.id_object.style.left = parseInt(p2_l + 1) + "px";
		}
		if(keys[37] && allowmoveleft(p2.id_object))//left
		{
			p2.id_object.style.left = parseInt(p2_l - 1) + "px";
		}
		if(keys[38] && allowmoveup(p2.id_object))//up
		{
			p2.id_object.style.top = parseInt(p2_t - 1) + "px";
		}
		if(keys[40] && allowmovedown(p2.id_object))//down
		{
			p2.id_object.style.top = parseInt(p2_t + 1) + "px";
		}
	}
}

//
//		players lives & score
//
// check if the players touched box
function iftouching_b(p){
	for(var i = 0;i < boxes.length;i++)
	{
		if(compareposition(p,boxes[i].box))
		{
			return true;
		}
	}
	return false;
}
// check if player touched score box
function touched_s_b(p){
	for(var i = 0;i < score_boxes.length;i++)
	{
		if(compareposition(p.id_object,score_boxes[i].box))
		{
			if(!score_boxes[i].touched)
			{
				addpoints(p);
				score_boxes[i].touched = true;
				score_boxes[i].box.remove();
				if(single_player)
				{
					document.getElementById('player_score').innerHTML = p.score;
					if(p.score % 100 == 0 && p.score <= 500)
					{
						clearInterval(b_interval);
						b_interval = setInterval(move_b,(9-p.score / 100));	
					}					
				}
			}
		}
	}
}
// compare positions with the player and the boxes
function compareposition(x,y){
	var x_l = parseInt(x.style.left), x_t = parseInt(x.style.top),
		x_w = parseInt(x.style.width), x_h = parseInt(x.style.height);
	var y_l = parseInt(y.style.left), y_t = parseInt(y.style.top),
		y_w = parseInt(y.style.width), y_h = parseInt(y.style.height);
	if(x_l + x_w > y_l && x_l < y_l + y_w && x_t + x_h > y_t && x_t < y_t + y_h)
		return true;
	return false;
}
// boxes - lowering life by 1 and checking if dead
function strike(p){
	if(p.lives > 0 && !p.hitted)
	{
		p.hitted = true;
		p.lives--;
		p.id_object.style.backgroundColor = p.hittedcolor;
		p.id_object.innerHTML = '3';
		updatelives(p);
		setTimeout(function(){p.id_object.innerHTML = '2'},1000);
		setTimeout(function(){p.id_object.innerHTML = '1'},2000);
		setTimeout(function(){p.id_object.style.backgroundColor = p.color; p.id_object.innerHTML = '';p.hitted = false;},3000);
	}
	if(!p.lives)
	{
		p.id_object.remove();
		if(!single_player)
		{
			if(!p1.lives && !p2.lives)
			{
				if(p1.score == p2.score)
				{
					gameover(p);
				}
				else if(p1.score > p2.score)
				{
					gameover(p1);
				}
				else
				{
					gameover(p2);
				}
			}
			else
			{
				clearInterval(b_interval);
				b_interval = setInterval(move_b,6);
			}
		}
		else
		{
			single_gameover();
		}
	}
}

// updates player lives  
function updatelives(p){
	p.lives_object.innerHTML = p.lives;
}
// reset players lives
function reset_lives(){
	updatelives(p1);
	updatelives(p2);
}
// score boxes - adding 10 points to player
function addpoints(p){
	p.score+=10;
	updatescore(p);
}
// updates player score  
function updatescore(p){
	p.score_object.innerHTML = p.score;
}
// reset players score
function reset_score(){
	updatescore(p1);
	updatescore(p2);
}
//
//		score boxes
//
// creates the score boxes
function create_score_box(){
	if(!game_over)
	{
		score_boxes.push(new score_box(Math.floor(Math.random() * (2))));
	}
}

//
//		boxes
//
// move the boxes
function move_b()
{
	for(var i =0; i < boxes.length;i++)
	{
		boxes[i].move();
	}
}
// moves the vertical boxes
function move_b_v(b){
	var b_t = parseInt(b.style.top);
	if(!allowmovedown(b))
		{b.lim = false;}
	else if(!allowmoveup(b))
		{b.lim = true;}
	if(b.lim)
		{b.style.top = parseInt(b_t + 1) + 'px';}
	else
		{b.style.top = parseInt(b_t - 1) + 'px';}
}
// moves the horizontal boxes
function move_b_h(b){
	var b_l = parseInt(b.style.left);
	if(!allowmoveright(b))
		{b.lim = false;}
	else if(!allowmoveleft(b))
		{b.lim = true;}
	if(b.lim)
		{b.style.left = parseInt(b_l + 1) + 'px';}
	else
		{b.style.left = parseInt(b_l - 1) + 'px';}
}
// create the boxes
function createinitials_b(){
    boxes.push(new box(0));
	boxes.push(new box(1));
	create_boxes = setInterval(create_b_loop,5000);
}
function create_b_loop(){
	if(!game_over && boxes.length <= 20)
	{
		boxes.push(new box(Math.floor(Math.random() * (2))));
	}
}

//
//		timer
//
// display seconds && minutes
function timer(){
	time--;
	if(time == 0)
	{
		if(p1.lives && p2.lives)
		{
			if(p1.score == p2.score)
			{
				draw = true;
				gameover(p1);
			}
			else if(p1.score > p2.score)
			{
				gameover(p1);
			}
			else
			{
				gameover(p2);
			}
		}
		else if(!p1.lives && p2.lives)
		{
			gameover(p2);
		}
		else
		{
			gameover(p1)
		}
	}
	else
	{
		if(time % 60 < 10)
		{
			seconds.innerHTML = '0' + time % 60;
		}
		else
		{
			seconds.innerHTML = time % 60;
		}
		minutes.innerHTML = Math.floor(time/60);
	}
} 
function reset_timer(){
		single_seconds.innerHTML = '00';
		single_minutes.innerHTML = '0';
		seconds.innerHTML = '00';
		minutes.innerHTML = '2';
}
//		game over function
function gameover(p){
	game_over = true;
	document.removeEventListener('keydown',function(e){down(e);});
	document.removeEventListener('keyup',function(e){up(e);});
	clearInterval(b_interval);
	clearInterval(p_interval);
	clearInterval(create_boxes);
	clearInterval(create_score_boxes);
	clearInterval(t_interval);
	boxes.forEach(function(b) {	b.box.remove();});
	score_boxes.forEach(function(b) { b.box.remove();});
	if(p1.id_object)
	{
		p1.id_object.remove();
	}
	if(p2.id_object)
	{
		p2.id_object.remove();
	}
	reset_timer();
	if(draw)
	{
		document.getElementById('winordraw').innerHTML = 'Draw';
	}
	else
	{
		document.getElementById('winordraw').innerHTML = 'Winner';
		document.getElementById('winner_name').innerHTML = p.name;
	}
	document.getElementById('game_bar').style.visibility = 'hidden';
	endgamescreen();
}

//
//		multiplayer
//		
//		start game screen
function startgamescreen(){
	var name1 = document.getElementById('p1name').value;
	var name2 = document.getElementById('p2name').value;
	document.getElementById('start_multiplayer').style.visibility = 'hidden';
	if(name1 == "")
	{
		name1 = 'Player 1';
	}
	else if(name1.length > 13)
	{
		name1 = name1.slice(0,13);
	}
	if(name2 == "")
	{
		name2 = 'Player 2';
	}
	else if(name2.length > 13)
	{
		name2 = name1.slice(0,13);
	}
	startgame(name1,name2);
}

//		end game screen
function endgamescreen(){
	document.getElementById('end_multiplayer').style.visibility = 'visible';
	// set players results
	// player 1
	document.getElementById('player1_name').placeholder = p1.name;
	document.getElementById('player1_end_score').innerHTML = p1.score;
	document.getElementById('player1_end_lives').innerHTML = p1.lives;
	// player 2
	document.getElementById('player2_name').placeholder = p2.name;
	document.getElementById('player2_end_score').innerHTML = p2.score;
	document.getElementById('player2_end_lives').innerHTML = p2.lives;
}
//		play again function
function playagain(){
	var name1 = document.getElementById('player1_name').value;
	var name2 = document.getElementById('player2_name').value;
	document.getElementById('player1_name').value = '';
	document.getElementById('player2_name').value = '';
	document.getElementById('end_multiplayer').style.visibility = 'hidden';
	if(name1 == "")
	{
		name1 = p1.name;
	}
	else if(name1.length > 13)
	{
		name1 = name1.slice(0,13);
	}
	if(name2 == "")
	{
		name2 = p2.name;
	}
	else if(name2.length > 13)
	{
		name2 = name1.slice(0,13);
	}
	startgame(name1,name2);
}
//
//		singleplayer
//
//		end game screen
function single_endgamescreen(){
	document.getElementById('end_singleplayer').style.visibility = 'visible';
	//		set player results
	if(single_player_choosen)
	{
		document.getElementById('single_score').innerHTML = p1.score;
	}
	else
	{
		document.getElementById('single_score').innerHTML = p2.score;
	}
	var t_sec = '00', t_min = '0';
	if(time % 60 < 10)
	{
		t_sec = '0' + time % 60;
	}
	else
	{
		t_sec = time % 60;
	}
	t_min = Math.floor(time/60);	
		document.getElementById('single_time').innerHTML = t_min + ':' + t_sec;
}
//
//		Esc Key Press Event
// 

function checkkeypress(e){
	var x = e.which || e.keyCode;
	if(x == 27)
	{
		if(!game_over)
		{
			if(single_player)
			{
				single_gameoveresc();
			}
			else
			{
				gameoveresc();
			}
		}
	}
}
function gameoveresc(){
	game_over = true;
	document.removeEventListener('keydown',function(e){down(e);});
	document.removeEventListener('keyup',function(e){up(e);});
	clearInterval(b_interval);
	clearInterval(p_interval);
	clearInterval(create_boxes);
	clearInterval(create_score_boxes);
	clearInterval(t_interval);
	boxes.forEach(function(b) {	b.box.remove();});
	score_boxes.forEach(function(b) { b.box.remove();});
	if(p1.id_object)
	{
		p1.id_object.remove();
	}
	if(p2.id_object)
	{
		p2.id_object.remove();
	}
	reset_timer();
	document.getElementById('game_bar').style.visibility = 'hidden';
	document.getElementById('choose_game_type').style.visibility = 'visible';
} 
function single_gameoveresc(){
	game_over = true;
	single_player = false;
	document.removeEventListener('keydown',function(e){down(e);});
	document.removeEventListener('keyup',function(e){up(e);});
	clearInterval(b_interval);
	clearInterval(p_interval);
	clearInterval(create_boxes);
	clearInterval(create_score_boxes);
	clearInterval(t_interval);
	boxes.forEach(function(b) {	b.box.remove();});
	score_boxes.forEach(function(b) { b.box.remove();});
	if(p1)
	{
		p1.id_object.remove();
	}
	if(p2)
	{
		p2.id_object.remove();
	}
	reset_timer();
	document.getElementById('single_game_bar').style.visibility = 'hidden';
	document.getElementById('choose_game_type').style.visibility = 'visible';
} 
//
//		Go Back buttons
//
//		multiplayer
function multiplayer_goback(){
	document.getElementById('start_multiplayer').style.visibility = 'hidden';
	document.getElementById('choose_game_type').style.visibility = 'visible';
}
function end_multiplayer_goback(){
	document.getElementById('end_multiplayer').style.visibility = 'hidden';
	document.getElementById('choose_game_type').style.visibility = 'visible';
}
//		singleplayer
function singleplayer_goback(){
	document.getElementById('start_singleplayer').style.visibility = 'hidden';
	document.getElementById('choose_game_type').style.visibility = 'visible';
}
function end_singleplayer_goback(){
	document.getElementById('end_singleplayer').style.visibility = 'hidden';
	document.getElementById('choose_game_type').style.visibility = 'visible';
}
//
//		single player screen - player selected function
//
document.getElementById('single_choose_player1').addEventListener('click',function(){change_to_single_player1();});
function change_to_single_player1(){
	document.getElementById('single_choose_player1').style.borderColor = 'white';
	document.getElementById('single_choose_player2').style.borderColor = 'transparent';
	single_player_choosen = 1;
}
document.getElementById('single_choose_player2').addEventListener('click',function(){change_to_single_player2();});
function change_to_single_player2(){
	document.getElementById('single_choose_player2').style.borderColor = 'white';
	document.getElementById('single_choose_player1').style.borderColor = 'transparent';
	single_player_choosen = 0;
}