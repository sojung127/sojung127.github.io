  
//공통변수
date=10; //30일부터 1일 까지 0이면 게임 엔딩
joy=5; //즐거움 1~10일 까지 0이면 게임 오버
money=50000; //돈 10000원에서 시작 0이면 게임 오버 -> 1초당 1000원씩 감소
ending=0; //ending이 1이면 게임오버, ending이 2이면 엔딩씬

playNum=new Array(0,0,0,0);
// 0 공원 1 블랙잭 2 피자나라 3 편의점 
minigame_start=0;
music=null;

class Main extends Phaser.Scene{
    
    constructor ()   //this.변수명으로 선언 및 사용
    {
        super({key:'Main',active:false,auto_start:false});
        this.gameOver=false; //true이면 게임종료
        //메인 화면 UI 설정
        this.mainLeftBar;
        this.moneyBar;
        this.pause=false;

        this.dateText;
        this.joyText;
        this.moneyText;
        //메인 게임 변수

        this.mainCharacter;
        this.playerMove=true;
        this.cursors;
        
        this.button_ok;
        this.button_no;

        this.buildings;
        this.공원;
        this.블랙잭;
        this.편의점;
        this.피자나라;
        this.집;
        this.덤불그룹;
        this.덤불;
        this.땅바닥;
        this.flag;
        this.spacebar;

        this.글귀1;
        this.글귀2;
        this.글귀3;
        this.글귀4;
        this.글귀5;
        this.글귀6;
        this.글귀7;
        this.글귀8;
        this.글귀9;
        this.글귀10;

        this.런닝방법;
        this.블랙잭방법;
        this.피자방법;
        this.편순이방법;
        this.whichGame=0;

        this.timeBar;
        this.graphics;
        playNum;
    }

    create ()   
    {  
        this.pause=false;
        if(joy<=2){
            music=this.sound.add('메인게임나쁨bgm','/assets/music/메인게임나쁨bgm.mp3');
        }
        if(joy>=8){
            music=this.sound.add('메인게임좋음bgm','/assets/music/메인게임좋음bgm.mp3');
        }
        if(joy>=3 && joy<=7){
            music=this.sound.add('메인게임보통bgm','/assets/music/메인게임보통bgm.mp3');
        }
        this.sound.loop=true;
        this.sound.mute=false;
        music.play();
        console.log(music);

       //128,0~   10*8
        for(var i=0; i<7;i++){
            for(var j=0;j<9;j++){
            this.땅바닥=this.add.image(128+62*(j+1),64*(i+1),'땅바닥');
            }
        }
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.덤불 = ['덤불0', '덤불1', '덤불2', '덤불3', '덤불4'];
        this.flag = true;
        this.moneyBar=this.add.image(42,215,'머니바').setOrigin(0).setScale(1,50000/200000);
        this.mainLeftBar = this.add.image(0, 0, '왼쪽바').setOrigin(0);
        this.dateText=this.add.bitmapText(45,45,'myfont',date,36)
        this.joyText = this.add.bitmapText(68,120,'myfont',joy,26,'center')
        this.moneyText = this.add.bitmapText(30,180,'myfont',money,26,'center')

        this.cursors = this.input.keyboard.createCursorKeys(); //위,아래,왼쪽,오른쪽 방향키

        //미니게임 건물 배치
        this.공원=this.physics.add.image(544, 288, '공원');
        this.블랙잭=this.physics.add.image(608, 96, '블랙잭');
        this.편의점=this.physics.add.image(352, 288, '편의점');
        this.피자나라=this.physics.add.image(288, 160, '피자나라');
        this.집=this.physics.add.image(416, 416, '집');
        this.덤불그룹=this.physics.add.staticGroup();
        this.putGrass();
        this.add.bitmapText(300,85,'myfont','"SPACE TO ENTER"',34)
        

        this.mainCharacter=this.physics.add.sprite(480,416,'mainCharacter');
        this.mainCharacter.setCollideWorldBounds(true);

        this.런닝방법=this.add.image(384, 256, '런닝방법').setScale(0.65);
        this.런닝방법.visible=false;

        this.블랙잭방법=this.add.image(384, 256, '블랙잭방법').setScale(0.65);
        this.블랙잭방법.visible=false;

        this.피자방법=this.add.image(384, 256, '피자방법').setScale(0.65);
        this.피자방법.visible=false;

        this.편순이방법=this.add.image(384, 256, '편순이방법').setScale(0.65);
        this.편순이방법.visible=false;
        
        this.button_ok = this.add.image(620, 395, 'okButton').setInteractive();
        this.button_ok.visible=false;

        this.button_no = this.add.image(635, 120,'noButton').setInteractive();
        this.button_no.visible=false;
        
        
        this.button_no.on('pointerdown', (event) => {
            this.pause=false;
            this.button_ok.visible=false;
            this.button_no.visible=false;
            this.mainCharacter.setX(480);
            this.mainCharacter.setY(416);
            this.playerMove=true;
            

            this.런닝방법.visible = false;
            this.블랙잭방법.visible = false;
            this.피자방법.visible = false;
            this.편순이방법.visible = false;
        });

        

        this.button_ok.on('pointerdown', (event) => {
            this.button_ok.visible=false;
            this.button_no.visible=false;
            this.mainCharacter.setX(480);
            this.mainCharacter.setY(416);
        
            
            this.mainCharacter.setY(416);  
            this.playerMove=true;
            //this.events.on('shutdown', this.shutdown, this);
            music.stop();
            if (this.whichGame==1){
                this.런닝방법.visible=false;
                music=this.sound.add('런닝런닝bgm','/assets/music/런닝런닝bgm.mp3');
                this.sound.loop=true;
                this.sound.mute=false;
                music.play();
                console.log("런닝런닝노래");
                playNum[0]+=1
                this.scene.switch('Running');
                console.log('Running clicked');
            }
            else if (this.whichGame==2){
                this.블랙잭방법.visible=false;
                music=this.sound.add('블랙잭bgm','/assets/music/블랙잭bgm.mp3');
                this.sound.loop=true;
                this.sound.mute=false;
                music.play();
                console.log("블랙잭노래");
                playNum[1]+=1
                this.scene.switch('BlackJack');

            }
            else if (this.whichGame==3){
                this.피자방법.visible=false;
                music=this.sound.add('피자나라bgm','/assets/music/피자나라bgm.mp3');
                this.sound.loop=true;
                this.sound.mute=false;
                music.play();
                console.log("피자나라노래");
                playNum[2]+=1
                this.scene.switch('Pizza');
            }
            else if (this.whichGame==4){
                this.편순이방법.visible=false;
                music=this.sound.add('편의점bgm','/assets/music/편의점bgm.mp3');
                this.sound.loop=true;
                this.sound.mute=false;
                music.play();
                console.log("편의점노래");
                playNum[3]+=1
                this.scene.switch('Store24');
            }
            
        });

        //메인캐릭터 상하좌우 움직임
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mainCharacter', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mainCharacter', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('mainCharacter', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('mainCharacter', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'still',
            frames: [ { key: 'mainCharacter', frame: 2 } ],
            frameRate: 10,
            repeat: -1
        });

        //빌딩에 메인 캐릭터가 닿으면 그 씬으로 넘어감
        this.physics.add.overlap(this.mainCharacter, this.공원, this.runningOrNot, null, this);
        this.physics.add.overlap(this.mainCharacter, this.블랙잭, this.blackJackorNot, null, this);
        this.physics.add.overlap(this.mainCharacter, this.피자나라, this.pizzaOrNot, null, this);
        this.physics.add.overlap(this.mainCharacter, this.편의점, this.store24OrNot, null, this);
        //this.physics.add.overlap(this.mainCharacter, this.집, this.houseRandom, null, this);
        
        //this.덤불그룹.create(416, 416, '집');
        this.physics.add.collider(this.mainCharacter, this.덤불그룹);
        //var timedEvent = this.time.addEvent({ delay: 1000, callback: this.putGrass, callbackScope: this, loop: false });
        this.글귀1=this.add.image(416, 365, '글귀1');
        this.글귀2=this.add.image(416, 365, '글귀2');
        this.글귀3=this.add.image(416, 365, '글귀3');
        this.글귀4=this.add.image(416, 365, '글귀4');
        this.글귀5=this.add.image(416, 365, '글귀5');
        this.글귀6=this.add.image(416, 365, '글귀6');
        this.글귀7=this.add.image(416, 365, '글귀7');
        this.글귀8=this.add.image(416, 365, '글귀8');
        this.글귀9=this.add.image(416, 365, '글귀9');
        this.글귀10=this.add.image(416, 365, '글귀10');

        
        this.글귀1.visible=false;
        this.글귀2.visible=false;
        this.글귀3.visible=false;
        this.글귀4.visible=false;
        this.글귀5.visible=false;
        this.글귀6.visible=false;
        this.글귀7.visible=false;
        this.글귀8.visible=false;
        this.글귀9.visible=false;
        this.글귀10.visible=false;
        
        
        
        this.moneyDecrease = this.time.addEvent({ delay:1000, callback:this.howMuchMoney,callbackScope:this,loop:true})
    }

    update()
    {
        this.dateText.setText(date);this.moneyText.setText(money);
        if(this.gameOver==0 && (joy<=0 || money<=0)){
            this.gameOver=2;
            this.scene.start('GameOver')
        }
        if(date<=0){
            this.gameOver=1;
            if(joy>=6){
                console.log(playNum)
                if(playNum[1]>playNum[0])
                    ending=2
                else
                    ending=1
            }else{
                if(playNum[2]>playNum[3])
                    ending=3
                else
                    ending=4
            }

            this.scene.start('GameOver')
        }
        if(joy>9){
            joy=10;
        }
        this.joyText.setText(joy);

          
        this.putGrass();
        this.houseRandom();
        //메인 캐릭터 상하좌우 방향키 누를 때 움직임
        if (this.cursors.left.isDown && this.playerMove) {
            this.mainCharacter.setVelocityX(-160);
            this.mainCharacter.setVelocityY(0);

            this.mainCharacter.anims.play('left', true);
        }
        else if (this.cursors.right.isDown && this.playerMove) {
            this.mainCharacter.setVelocityX(160);
            this.mainCharacter.setVelocityY(0);

            this.mainCharacter.anims.play('right', true);
        }
        else if (this.cursors.up.isDown && this.playerMove) {
            this.mainCharacter.setVelocityX(0);
            this.mainCharacter.setVelocityY(-160);

            this.mainCharacter.anims.play('up', true);
        }
        else if (this.cursors.down.isDown && this.playerMove) {
            this.mainCharacter.setVelocityX(0);
            this.mainCharacter.setVelocityY(160);

            this.mainCharacter.anims.play('down', true);
        }
        else
        {
            this.mainCharacter.setVelocityX(0);
            this.mainCharacter.setVelocityY(0);

            this.mainCharacter.anims.play('still');
        }

        
    }

    //min=0, max=4
    randomNumber(min, max) {
        var randVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return randVal;
    }

    randomGrass(){
        var num=this.randomNumber(0, 4);
        return num;
    }

    randomText(){
        var num=this.randomNumber(1, 10);
        return num;
    }

    putGrass(){
        if(this.flag){
            for (var i = 0; i < 10; i++) {
                this.덤불그룹.create(160 + i * 64, 32, this.덤불[this.randomGrass()]);
                this.덤불그룹.create(160 + i * 64, 480, this.덤불[this.randomGrass()]);
            }
            for (var i = 0; i < 6; i++) {
                this.덤불그룹.create(160, 96 + i * 64, this.덤불[this.randomGrass()]);
                this.덤불그룹.create(736, 96 + i * 64, this.덤불[this.randomGrass()]);
            }
            for (var i = 0; i < 2; i++) {
                this.덤불그룹.create(416 + i * 64, 288, this.덤불[this.randomGrass()]);
            }
            for (var i = 0; i < 2; i++) {
                this.덤불그룹.create(544 + i * 64, 352, this.덤불[this.randomGrass()]);
            }
            this.덤불그룹.create(608, 160, this.덤불[this.randomGrass()]);
            //this.덤불그룹.create(480, 224, this.덤불[this.randomGrass()]);
            this.덤불그룹.create(224, 352, this.덤불[this.randomGrass()]);
            this.덤불그룹.create(352, 416, this.덤불[this.randomGrass()]);
            this.덤불그룹.create(224, 160, this.덤불[this.randomGrass()]);
            
            this.덤불그룹.create(672,192+32-64,this.덤불[this.randomGrass()]);
            this.덤불그룹.create(224,288,this.덤불[this.randomGrass()]);
            this.덤불그룹.create(608-64-64-64,192+32,this.덤불[this.randomGrass()]);
            this.덤불그룹.create(320+32,192+32,this.덤불[this.randomGrass()]);
            this.덤불그룹.create(416,160,this.덤불[this.randomGrass()]);
            this.덤불그룹.create(672,224,this.덤불[this.randomGrass()]);
        }
        this.flag = false;

    }

    howMuchMoney(){
        if(!this.pause){
            var MAX=200000
            money-=1000
            var yScale=money/MAX;
            if(money>MAX)
                yScale=1
            this.moneyBar.setScale(1,yScale);
        }
    }

    //각 미니게임으로 넘어가기
    houseRandom() {
        if (this.mainCharacter.x > 384 && this.mainCharacter.x < 448) {
            if (this.mainCharacter.y > 384 && this.mainCharacter.y < 448) {
                if (this.spacebar.isDown) {
                    var random = this.randomText();
                    if (random == 1) {
                        this.글귀1.visible = true;
                        this.글귀2.visible = false;
                        this.글귀3.visible = false;
                        this.글귀4.visible = false;
                        this.글귀5.visible = false;
                        this.글귀6.visible = false;
                        this.글귀7.visible = false;
                        this.글귀8.visible = false;
                        this.글귀9.visible = false;
                        this.글귀10.visible = false;
                    }
                    else if (random == 2) {
                        this.글귀2.visible = true;
                        this.글귀1.visible = false;
                        this.글귀3.visible = false;
                        this.글귀4.visible = false;
                        this.글귀5.visible = false;
                        this.글귀6.visible = false;
                        this.글귀7.visible = false;
                        this.글귀8.visible = false;
                        this.글귀9.visible = false;
                        this.글귀10.visible = false;

                    }
                    else if (random == 3) {
                        this.글귀3.visible = true;
                        this.글귀1.visible = false;
                        this.글귀2.visible = false;
                        this.글귀4.visible = false;
                        this.글귀5.visible = false;
                        this.글귀6.visible = false;
                        this.글귀7.visible = false;
                        this.글귀8.visible = false;
                        this.글귀9.visible = false;
                        this.글귀10.visible = false;
                    }
                    else if (random == 4) {
                        this.글귀4.visible = true;
                        this.글귀1.visible = false;
                        this.글귀2.visible = false;
                        this.글귀3.visible = false;
                        this.글귀5.visible = false;
                        this.글귀6.visible = false;
                        this.글귀7.visible = false;
                        this.글귀8.visible = false;
                        this.글귀9.visible = false;
                        this.글귀10.visible = false;
                    }
                    else if (random == 5) {
                        this.글귀5.visible = true;
                        this.글귀1.visible = false;
                        this.글귀2.visible = false;
                        this.글귀3.visible = false;
                        this.글귀4.visible = false;
                        this.글귀6.visible = false;
                        this.글귀7.visible = false;
                        this.글귀8.visible = false;
                        this.글귀9.visible = false;
                        this.글귀10.visible = false;
                    }
                    else if (random == 6) {
                        this.글귀6.visible = true;
                        this.글귀1.visible = false;
                        this.글귀2.visible = false;
                        this.글귀3.visible = false;
                        this.글귀4.visible = false;
                        this.글귀5.visible = false;
                        this.글귀7.visible = false;
                        this.글귀8.visible = false;
                        this.글귀9.visible = false;
                        this.글귀10.visible = false;
                    }
                    else if (random == 7) {
                        this.글귀7.visible = true;
                        this.글귀1.visible = false;
                        this.글귀2.visible = false;
                        this.글귀3.visible = false;
                        this.글귀4.visible = false;
                        this.글귀5.visible = false;
                        this.글귀6.visible = false;
                        this.글귀8.visible = false;
                        this.글귀9.visible = false;
                        this.글귀10.visible = false;
                    }
                    else if (random == 8) {
                        this.글귀8.visible = true;
                        this.글귀1.visible = false;
                        this.글귀2.visible = false;
                        this.글귀3.visible = false;
                        this.글귀4.visible = false;
                        this.글귀5.visible = false;
                        this.글귀6.visible = false;
                        this.글귀7.visible = false;
                        this.글귀9.visible = false;
                        this.글귀10.visible = false;
                    }
                    else if (random == 9) {
                        this.글귀9.visible = true;
                        this.글귀1.visible = false;
                        this.글귀2.visible = false;
                        this.글귀3.visible = false;
                        this.글귀4.visible = false;
                        this.글귀5.visible = false;
                        this.글귀6.visible = false;
                        this.글귀7.visible = false;
                        this.글귀8.visible = false;
                        this.글귀10.visible = false;
                    }
                    else if (random == 10) {
                        this.글귀10.visible = true;
                        this.글귀1.visible = false;
                        this.글귀2.visible = false;
                        this.글귀3.visible = false;
                        this.글귀4.visible = false;
                        this.글귀5.visible = false;
                        this.글귀6.visible = false;
                        this.글귀7.visible = false;
                        this.글귀8.visible = false;
                        this.글귀9.visible = false;
                    }
                }


            }
            else {
                this.글귀1.visible = false;
                this.글귀2.visible = false;
                this.글귀3.visible = false;
                this.글귀4.visible = false;
                this.글귀5.visible = false;
                this.글귀6.visible = false;
                this.글귀7.visible = false;
                this.글귀8.visible = false;
                this.글귀9.visible = false;
                this.글귀10.visible = false;

            }

        }
        if (this.mainCharacter.y > 384 && this.mainCharacter.y < 448) {
            if (this.mainCharacter.x > 384 && this.mainCharacter.x < 448) { }
            else {
                this.글귀1.visible = false;
                this.글귀2.visible = false;
                this.글귀3.visible = false;
                this.글귀4.visible = false;
                this.글귀5.visible = false;
                this.글귀6.visible = false;
                this.글귀7.visible = false;
                this.글귀8.visible = false;
                this.글귀9.visible = false;
                this.글귀10.visible = false;
            }
        }
    }

    runningOrNot(){
        if (this.spacebar.isDown) {
            this.pause=true;
            this.whichGame = 1;
            this.playerMove = false;
            this.런닝방법.visible = true;
            this.블랙잭방법.visible = false;
            this.피자방법.visible = false;
            this.편순이방법.visible = false;
            this.button_ok.visible = true;
            this.button_no.visible = true;
        }
    }

    blackJackorNot(){
        if (this.spacebar.isDown) {
            this.pause=true;
            this.whichGame = 2;
            this.블랙잭방법.visible = true;
            this.런닝방법.visible = false;
            this.피자방법.visible = false;
            this.편순이방법.visible = false;
            this.playerMove = false;
            this.button_ok.visible = true;
            this.button_no.visible = true;
        }
    }

    pizzaOrNot() {
        if (this.spacebar.isDown) {
            this.pause=true;
            this.whichGame = 3;
            this.피자방법.visible = true;
            this.런닝방법.visible = false;
            this.블랙잭방법.visible = false;
            this.편순이방법.visible = false;
            this.playerMove = false;
            this.button_ok.visible = true;
            this.button_no.visible = true;
        }
    }

    store24OrNot(){
        if (this.spacebar.isDown) {
            this.pause=true;
            this.whichGame = 4;
            this.편순이방법.visible = true;
            this.런닝방법.visible = false;
            this.블랙잭방법.visible = false;
            this.피자방법.visible = false;
            this.playerMove = false;
            this.button_ok.visible = true;
            this.button_no.visible = true;
        }
    }

    shutdown()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

    init(){
        this.gameOver=false;
        this.pause=false;
    }
    
}

//게임 오버, 게임 엔딩 팝업 관리
class GameOver extends Phaser.Scene {
    constructor () {
        super({key:'GameOver'})
        this.button;

    }
    preload() {
        //this.load.image('popup','assets/ending/endingPopUp.png')
        //this.load.image('title','assets/ending/gameOverTitle.png')

        //게임오버
        this.load.image('즐거움게임오버','/assets/ending/즐거움게임오버.png');
        this.load.image('돈게임오버','/assets/ending/돈게임오버.png');

        //게임엔딩
        this.load.image('공원게임엔딩','/assets/ending/공원게임엔딩.png');
        this.load.image('피자박스게임엔딩','/assets/ending/피자박스게임엔딩.png');
        this.load.image('편순이게임엔딩','/assets/ending/편순이게임엔딩.png');
        this.load.image('블랙잭게임엔딩','/assets/ending/블랙잭게임엔딩.png');

        this.load.image('다시시작버튼','/assets/main/메인으로버튼.png');
    }
    create() {
        //this.add.image(0,0,'popup').setOrigin(0)
        //this.add.image(768/2,115,'title')
        if ( date >0 && money<=0){
            var title = this.add.image(0,0,'돈게임오버').setOrigin(0)
            title.setScale(0.64)
        }
        if( date >0 && joy<=0){
            this.add.image(0,0,'즐거움게임오버').setOrigin(0).setScale(0.64);
        }
        if( date <=0 ){
            if(ending==1)
                this.add.image(0,0,'공원게임엔딩').setOrigin(0).setScale(0.64)
            if (ending == 2)
                this.add.image(0, 0, '블랙잭게임엔딩').setOrigin(0).setScale(0.64)
            if (ending == 3)
                this.add.image(0, 0, '피자박스게임엔딩').setOrigin(0).setScale(0.64)
            if (ending == 4)
                this.add.image(0, 0, '편순이게임엔딩').setOrigin(0).setScale(0.64)

        }

        this.button=this.add.image(600, 110,'다시시작버튼').setInteractive().setScale(0.48);
        this.button.on('pointerdown', (event) => {
            date = 10; //30일부터 1일 까지 0이면 게임 엔딩
            joy = 5; //즐거움 1~10일 까지 0이면 게임 오버
            money = 50000; //돈 10000원에서 시작 0이면 게임 오버 -> 1초당 1000원씩 감소
            ending = 0; //ending이 1이면 게임오버, ending이 2이면 엔딩씬

            playNum = new Array(0, 0, 0, 0);
            // 0 공원 1 블랙잭 2 피자나라 3 편의점 
            minigame_start = 0;
            music.stop();
            music = null;
            this.scene.restart('Main');
            this.scene.switch('Main');
        });

    }
}

class GameStart extends Phaser.Scene {
    constructor () {
        super({key:'GameStart'})
        this.mainButton;
    }
    preload() {
        this.load.image('욜로게임방식팝업','/assets/main/욜로게임방식팝업.png');
        this.load.image('욜로라이프타이틀','/assets/main/욜로라이프타이틀.png');
        this.load.image('메인으로버튼','/assets/main/메인으로버튼.png');
        
   
    }

    create() {
        var title=this.add.image(384, 256, '욜로라이프타이틀');
        title.setScale(0.49);
        var timedEvent=this.time.addEvent({ delay: 5000, callback:this.imageChange, callbackScope: this, loop: false });
    }

    imageChange(){
        var image=this.add.image(384, 256, '욜로게임방식팝업');
        image.setScale(0.49);
        this.mainButton=this.add.image(670, 480, '메인으로버튼');
        this.mainButton.setScale(0.48);
        this.mainButton.setInteractive();
        this.mainButton.on('pointerdown', (event) => {
            this.scene.switch('Preloader');
        });
    }
}
 

class Preloader extends Phaser.Scene{

    constructor ()
    {
        super({
			key: 'Preloader',
			pack: {
			    files: [
			        { type: 'image', key: 'nowloading', url: '/assets/main/로딩중.png' }
			    ]
			}
		});
    }
	
    preload()
    {
		// nowloading image is available in preload :) so like a pre-preloaded image
		this.add.sprite(400, 300, "nowloading");
		
		// load all assets
		//BGM
        this.load.audio('메인게임보통bgm','/assets/music/메인게임보통bgm.mp3');
        this.load.audio('메인게임좋음bgm','/assets/music/메인게임좋음bgm.mp3');
        this.load.audio('메인게임나쁨bgm','/assets/music/메인게임나쁨bgm.mp3');
        this.load.audio('피자나라bgm','/assets/music/피자나라bgm.mp3');
        this.load.audio('런닝런닝bgm','/assets/music/런닝런닝bgm.mp3');
        this.load.audio('블랙잭bgm','/assets/music/블랙잭bgm.mp3');
        this.load.audio('편의점bgm','/assets/music/편의점bgm.mp3');

        //메인게임 날짜, 즐거움, 돈 _ 왼쪽 바
        this.load.image('머니바','/assets/main/money_bar.png')
        this.load.image('왼쪽바', '/assets/main/메인게임UI왼쪽바.png');


        this.load.image('blackjack', '/assets/blackjack/cardA.png');
        this.load.image('pizza', '/assets/pizza/Mr.Pizza.png');
        this.load.image('running', '/assets/running/cat.png');
        this.load.image('store24', '/assets/store24/과자_포카칩.png')


        this.load.spritesheet('mainCharacter','/assets/main/mainCharacter.png', { frameWidth: 64, frameHeight: 64 }); //mainCharacter
        //건물들
        this.load.image('공원','/assets/main/공원.png');
        this.load.image('블랙잭','/assets/main/블랙잭.png');
        this.load.image('편의점','/assets/main/편의점.png');
        this.load.image('피자나라','/assets/main/피자나라.png');
        this.load.image('집','/assets/main/집.png');
        this.load.image('덤불0','/assets/main/덤불0.png');
        this.load.image('덤불1','/assets/main/덤불1.png');
        this.load.image('덤불2','/assets/main/덤불2.png');
        this.load.image('덤불3','/assets/main/덤불3.png');
        this.load.image('덤불4','/assets/main/덤불4.png');
        this.load.image('땅바닥','/assets/main/흙바닥3.png');
        this.load.image('글귀1','/assets/main/글귀1.png');
        this.load.image('글귀2','/assets/main/글귀2.png');
        this.load.image('글귀3','/assets/main/글귀3.png');
        this.load.image('글귀4','/assets/main/글귀4.png');
        this.load.image('글귀5','/assets/main/글귀5.png');
        this.load.image('글귀6','/assets/main/글귀6.png');
        this.load.image('글귀7','/assets/main/글귀7.png');
        this.load.image('글귀8','/assets/main/글귀8.png');
        this.load.image('글귀9','/assets/main/글귀9.png');
        this.load.image('글귀10','/assets/main/글귀10.png');

        this.load.bitmapFont('myfont', '/assets/main/font/font.png', '/assets/main/font/font.fnt');

        this.load.image('okButton','/assets/공통팝업창/확인버튼.png');
        this.load.image('noButton','/assets/공통팝업창/X_버튼.png');

        this.load.image('런닝방법','/assets/running/런닝런닝방법.png');
        this.load.image('블랙잭방법','/assets/blackjack/blackjack_tutorial.png')
        this.load.image('편순이방법','/assets/store24/편순이방법.png');
        this.load.image('피자방법','/assets/pizza/피자_방법.png');
		//etc.
    }

    create()
    {
		// start the game
		this.scene.start('Main');
    }
}


var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    backgroundColor: '#ffffff',
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    },
    scene: [GameStart,Preloader, Main, Pizza, BlackJack, Store24, Running ,GameOver]
};

var game = new Phaser.Game(config);