//Transition of tiles was done
//620098053

var start = false;
var shuffleButton, puzzlePiece, puzzleArea;
var puzzleTop = 0, puzzleLeft = 0, move = 0;

window.onload = function(){
 
    puzzleArea = document.getElementById("puzzlearea");
  
	puzzlePiece = puzzleArea.getElementsByTagName("div");
	shuffleButton = document.getElementById("shufflebutton");
	shuffleButton.onclick = shuffle;
	var img = "url ('downloads.jpg')";
    setGrid(img);
};
function setGrid(){
    var a;
    for (a = 0; a < puzzlePiece.length; a++){
        puzzlePiece[a].className = "puzzlepiece";
        puzzlePiece[a].style.left = (a%4*100)+'px';
		puzzlePiece[a].style.top = (parseInt(a/4)*100) + 'px';
		puzzlePiece[a].style.backgroundPosition= '-' + puzzlePiece[a].style.left + ' ' + '-' + puzzlePiece[a].style.top;
        puzzlePiece[a].style.transition = "750ms ease";
        puzzlePiece[a].style.backgroundImage = "url('micki.jpg')";
        puzzleLeft = puzzleLeft + 100;
    
        if(puzzleLeft > 300){
            puzzleTop = puzzleTop + 100;
            puzzleLeft = 0;
        }
        
        puzzlePiece[a].onmouseover = function(){
            if(canMove(this.style.left, this.style.top)){
                this.classList.add("movablepiece");
                this.style.cursor = "pointer";
            }
        }
    
        puzzlePiece[a].onmousedown = function(){
            if(canMove(this.style.left, this.style.top)){
                movementCount();
                var lst = moveTile(this.style.left, this.style.top);
                this.style.left = lst[0];
                this.style.top = lst[1];
            }
        }
    }
    puzzleTop = 300;
    puzzleLeft = 300;
}
function canMove(leftPx,topPx){
    var yesMove = false;
    var q = parseInt(leftPx);
    var r = parseInt(topPx);
    if(q + 100 === puzzleLeft  && r === puzzleTop){
        yesMove = true;   
    }
    else if(q - 100 === puzzleLeft && r === puzzleTop){
        yesMove = true;
    }
    else if(r + 100 === puzzleTop && q === puzzleLeft){
        yesMove = true;
    }
    else if (r - 100 === puzzleTop && q === puzzleLeft){
        yesMove = true;
    }
    else {
        yesMove = false;
    }
    return yesMove;
}
function moveTile(leftPx, topPx){
    var tempVal = leftPx;
    leftPx = puzzleLeft + "px";
    puzzleLeft = parseInt(tempVal);
    tempVal = topPx;
    topPx = puzzleTop +"px";
    puzzleTop = parseInt(tempVal);
    return [leftPx, topPx];
}

function movementCount(){
    move++;
}

function shuffle(){
    if(!start){
        var s, m;
        var list = [];
        for(m = 0; m < 100; m++){
            for(s = 0; s < puzzlePiece.length; s++){
                if(canMove(puzzlePiece[s].style.left, puzzlePiece[s].style.top)){
                    list.push([puzzlePiece[s],s]);
                }
            }
            if(list.length != 0){
                var random = Math.floor(Math.random() * list.length);
                var lst = moveTile(list[random][0].style.left, list[random][0].style.top);
                list[random][0].style.left = lst[0];
                list[random][0].style.top = lst[1];
            }
            else{
                m--;
            }
            list = [];
        }
        start = false;
    }
}


