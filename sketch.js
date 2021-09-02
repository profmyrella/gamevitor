//Vitor, fiz esse jogo com coisas que me lembram nossas aulas e para você não esquecer da sua prof. O solo é um teclado para lembrarmos de quem sempre bugava nas aulas e os obstáculos são nomes de variáveis enormes do jeito que você ama. Um dos obstáculos é "caidacadeira" porque a cadeira te expulsava todos os finais de aula e não podemos esquecer do obstáculo destinado ao famoso ";". Continue estudando e se dedique ao máximo que para mim você já é melhor que o Bill Gates. Sucesso! :D

var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;
var vitor ,vitorImg, bordas, solo, imagemSolo, soloInvisivel,obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6, pontuacao, grupoObstaculos, gameOverImg, reiniciarImg, gameOver, reiniciar, somAaaaaa;

function preload(){ 
  
  vitorImg = loadAnimation("vitor.png");
  
  imagemSolo = loadImage("soloteclado.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  reiniciarImg = loadImage("restart.png");
  
  obstaculo1 = loadImage("obs1.png");
  obstaculo2 = loadImage("obs2.png");
  obstaculo3 = loadImage("obs3.png");
  obstaculo4 = loadImage("obs4.png");
  obstaculo5 = loadImage("obs5.png");
  obstaculo6 = loadImage("obs6.png");
  
  somAaaaaa = loadSound("aaaaaaaa.ogg");
  
}

function setup(){
  
  createCanvas(600,200);
  
  vitor = createSprite(50,160,20,50);
  vitor.addAnimation("andando", vitorImg);
  vitor.scale = 0.035;
  
  solo = createSprite(300,180,600,20);
  solo.addImage("solo", imagemSolo);
  solo.x = solo.width/2;
  
  soloInvisivel = createSprite(200,190,400,10);
  soloInvisivel.visible = false;
  
  gameOver = createSprite(300,50);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  reiniciar = createSprite(300, 100);
  reiniciar.addImage(reiniciarImg);
  reiniciar.scale = 0.5;
  reiniciar.visible = false;
  
  grupoObstaculos = new Group();
  
  vitor.setCollider("circle",30,30,80);
  
  bordas = createEdgeSprites();
  
  pontuacao = 0;
  
}

function draw(){
  
  background(200);
  
  vitor.depth = solo.depth;
  vitor.depth++;
  
  text("Pontuação: "+ pontuacao, 500,50);
  
   if (estadoJogo === JOGAR){
    solo.velocityX = - (4 + 3*pontuacao/100);
    pontuacao = pontuacao + Math.round((frameRate()/60));
     
     if(solo.x < 0){
    solo.x = solo.width/2;
     }
     
    if(keyDown("space") && vitor.y >= 100){
    vitor.velocityY = -10;
  }
    vitor.velocityY = vitor.velocityY+0.8;
    
    
    gerarObstaculos();
    
    if(grupoObstaculos.isTouching(vitor)){

      estadoJogo = ENCERRAR;
      somAaaaaa.play();
      
    }
  }
  else if(estadoJogo === ENCERRAR){
    
    gameOver.visible = true;
    reiniciar.visible = true;
    
    solo.velocityX = 0;
    vitor.velocityY = 0;
    
    grupoObstaculos.setLifetimeEach(-1);
    
    grupoObstaculos.setVelocityXEach(0);
    
     if(mousePressedOver(reiniciar)){
    reset();
  }
  }
  
  vitor.collide(solo);
  
  drawSprites();

}

function gerarObstaculos(){
  if(frameCount % 60 === 0){
    var obstaculo = createSprite(600, 140, 10, 40);
    obstaculo.velocityX = - (6 + pontuacao/100);
    
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstaculo.addImage(obstaculo1);
        break;
      case 2: obstaculo.addImage(obstaculo2);
        break;
      case 3: obstaculo.addImage(obstaculo3);
        break;
      case 4: obstaculo.addImage(obstaculo4);
        break;
      case 5: obstaculo.addImage(obstaculo5);
        break;
      case 6: obstaculo.addImage(obstaculo6);
        break;
        default: break;
    }
    
    obstaculo.lifetime = 200;
    
    grupoObstaculos.add(obstaculo);
}
}

function reset(){
  
  estadoJogo = JOGAR;
  
  gameOver.visible = false;
  reiniciar.visible = false;
  
  grupoObstaculos.destroyEach();
  
  pontuacao = 0;
}
