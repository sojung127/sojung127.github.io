class Running extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'Running',active:false,auto_start:false });


        this.move;
        this.movingspeed=3;

        //배경 변수
        this.cloud1;
        this.cloud2;
        this.cloud3;
        this.cloud4;
        this.tree1;
        this.tree2;
        this.tree3;
        this.tree4;
        this.grass1;
        this.grass2;
        this.grass3;
        this.grass4;
        this.bench;
        this.platforms;
        this.limit; //검정색 뒤로 배경 움직이게
        this.limitground;

        this.cursors;
        this.score;
        this.gameOver;
        this.scoreText;

        this.heartText;
        this.objectText;
        this.otherText;

        this.sprite; //뛰는 캐릭터
        this.timebar;
        this.timerEvent;
        this.random;
                
        //그룹
        this.hearts; //하트 담는 그룹
        this.objects; //고양이, 쓰레기
        this.others; //바나나, 돌
        this.nameObjects;
        this.randomList;
        this.black;

        //result 팝업
        this.happiness;
        this.okButton;
        this.okText;
        this.resultPOP;
        this.scoreResultText;
        this.totalScoreText;
        this.totalText;
        this.popup;

        //+1, +5, -5
        this.plus1;
        this.plus5;
        this.minus5;
        this.plus1Text;
        this.plus5Text;
        this.minus5Text;
    }

    preload ()
    {
        this.add.image(768/2,512/2,'nowloading').setScale(0.4)
        //640,360
        /* 배경 */
        this.load.image('background', 'assets/running/background4.png');
        this.load.image('bg', 'assets/running/bg5.png');
        this.load.image('ground2','assets/running/ground4.png');
        this.load.image('cloud', 'assets/running/cloud3.png');
        this.load.image('tree', 'assets/running/tree.png');
        this.load.image('tree2', 'assets/running/tree2.png');
        this.load.image('limitbg', 'assets/running/limit4.png');
        this.load.image('tree3', 'assets/running/tree3.png');
        this.load.image('tree4', 'assets/running/tree4.png');
        this.load.image('grass', 'assets/running/grass.png');
        this.load.image('bench', 'assets/running/bench2.png');
        this.load.image('timebar', 'assets/running/timebar2.png');
        this.load.image('score', 'assets/running/score.png');
        this.load.image('+1', 'assets/running/+1.png');
        this.load.image('+5', 'assets/running/+5.png');
        this.load.image('-5', 'assets/running/-5.png');
        this.load.image('limitground', 'assets/running/limit.png');

        this.load.spritesheet('character', 'assets/running/character.png', { frameWidth: 64, frameHeight: 64 });

        //오브젝트들
        this.load.image('heart', 'assets/running/heart.png');
        this.load.image('banana', 'assets/running/banana.png');
        this.load.image('cat', 'assets/running/cat.png');
        this.load.image('rock', 'assets/running/rock.png');
        this.load.image('trash', 'assets/running/trash.png');

        //result 팝업
        this.load.image('happiness', 'assets/running/result/happiness.png');
        this.load.image('okButton', 'assets/공통팝업창/확인버튼.png');
        this.load.image('resultPOP', 'assets/running/result/result.png');
        this.load.image('scoreResultText', 'assets/running/result/scoreResultText.png');
        this.load.image('totalScoreText', 'assets/running/result/totalScoreText.png');
        this.load.image('totalText', 'assets/running/result/totalText.png');
         
    }

    create ()
    {
        this.score = 0;
        this.gameOver = false;
        this.nameObjects= new Array(); //고양이, 쓰레기 이름 담는 배열
        this.randomList=['heart', 'banana', 'cat', 'rock', 'trash'];
        this.limitground=this.physics.add.image(384, 426, 'limitground');
        this.platforms = this.physics.add.staticGroup(); //캐릭터가 뛰는 바닥 static
        this.add.image(384, 256, 'background'); //검정 바탕
        this.add.image(384, 256, 'bg'); //하늘색 바탕
        this.platforms.create(384, 426, 'ground2'); //캐릭터가 뛰는 바닥
        this.speed = Phaser.Math.GetSpeed(550, this.movingspeed); //움직이는 배경 스피드
        this.speed2 = Phaser.Math.GetSpeed(600, this.movingspeed);
        //  The score
        this.scoreText = this.add.text(678, 20, ': 0', { fontSize: '25px', fill: '#fff' });
        this.plus1Text
        this.plus5Text
        this.minus5Text

        this.add.image(663, 30, 'heart'); //획득한 하트
        
        var timebarBg = this.add.image(485, 30, 'timebar'); //타임바

        /* 뒤에서 움직이는 애들 */
        this.cloud1 = this.add.image(200, 160, 'cloud');
        this.cloud2 = this.add.image(360, 200, 'cloud');
        this.cloud3 = this.add.image(580, 180, 'cloud');
        this.cloud4 = this.add.image(790, 210, 'cloud');
        this.tree1 = this.add.image(250, 312, 'tree');
        this.tree2 = this.add.image(500, 312, 'tree2');
        this.tree3 = this.add.image(750, 312, 'tree3');
        this.tree4 = this.add.image(900, 312, 'tree4');
        this.grass1 = this.add.image(150, 363, 'grass');
        this.grass2 = this.add.image(230, 363, 'grass');
        this.grass3 = this.add.image(680, 363, 'grass');
        this.grass4 = this.add.image(800, 363, 'grass');
        this.bench = this.add.image(370, 345, 'bench');

        //this.add.image(140, 280, 'score');

        

        /* 움직이는 애들 검정색 뒤로 사라지게 검정색 하나 더 놔둠*/
        this.limit = this.physics.add.staticGroup();
        this.limit.create(35, 256, 'limitbg');
        this.limit.create(740, 256, 'limitbg');
        
        //+1, +5, -5
        this.plus1=this.add.sprite(120, 250,'+1');
        this.plus5=this.add.sprite(120, 250,'+5');
        this.minus5=this.add.sprite(120, 250,'-5');
        this.plus1.alpha=0;
        this.plus5.alpha=0;
        this.minus5.alpha=0;

        /*캐릭터가 계속 움직이게 하는 */
        var characterAnimation = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('character'),
            frameRate: 30,
            repeat: -1
        });

        this.sprite = this.physics.add.sprite(90, 345, 'character');
        this.sprite.setGravityY(750);
        this.sprite.setBounce(0.2);
        this.sprite.play('walk');

        /*타임바 */
        this.timerEvent = this.time.addEvent({ delay: 7000 });
        this.timebar = this.add.graphics({ x: 0, y: 0 });

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.sprite, this.platforms);

        //만들어진 오브젝트 모두 group화
        this.objects = this.physics.add.group();
        this.others = this.physics.add.group();
        this.hearts = this.physics.add.group();
        this.black = this.add.group();

        //오브젝트 만드는 함수
        var timedEvent2 = this.time.addEvent({ delay: 550, callback: this.spawnObject, callbackScope: this, loop: true });

       
    }


    update(time, delta) {
        //this.howToPopUp();
        if (this.gameOver) {
            this.sprite.anims.setRepeat(0); //캐릭터 뛰는 거 멈춤
            this.popUp();
            //오브젝트 안보이게
            this.sprite.visible=false;
            //this.init();
            
            
            return;
        }

        //점프 체크
        if (this.cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-400);
        }


        this.moveBackground(time, delta); //뒤에 배경 움직이게
        this.timeBar(this.timebar); //타임바
        this.moveObject(time, delta); //오브젝트 모두 움직이게
        this.destroyFailObject(); //오브젝트가 sprite 지나가면 destroy

        this.checkObject();
        var heartChildren = this.hearts.getChildren();
        //var object=objects.getChildren();
        var temp = this.others.getChildren();
        this.physics.add.overlap(this.sprite, heartChildren, this.collectHeart, null, this); //하트는 겹치면 점수 얻음
        //this.physics.add.overlap(sprite, object[0], checkObject, null, this); //sprite랑 겹칠 때 left, down 키보드 누르기(고양이, 쓰레기)
        this.physics.add.overlap(this.sprite, temp[0], this.checkOther, null, this); //sprite랑 겹치면 실패(바나나, 돌) 점프해서 피해야 함


        
    }

    initGame(){
        this.score=0;
        this.gameOver=false;
                
        //그룹
        var heartChildren = this.hearts.getChildren();
        var temp=this.others.getChildren();
        var object=this.objects.getChildren();
        var blackChildren=this.black.getChildren();

        heartChildren.destroy();
        temp.destroy();
        object.destroy();
        blackChildren.destroy();
        
        /*for(var i=0;i<heartChildren.length;i++){
            heartChildren[i].destroy();
        }
        for(var i=0;i<temp.length;i++){
            temp[i].destroy();
        }
        for(var i=0;i<object.length;i++){
            object[i].destroy();
        }*/
        for(var i=0;i<this.nameObjects.length;i++){
            this.nameObjects.pop();
        }

    }

    popUp(){
        this.add.image(35, 256, 'limitbg');
        this.add.image(740, 256, 'limitbg');
        this.resultPOP = this.add.image(384, 256, 'resultPOP');
        this.happiness = this.add.image(320, 300, 'happiness');
        this.happiness.setScale(1/8,1/8);
        this.okButton = this.add.image(620, 395, 'okButton');
        this.okButton.setInteractive();
        this.okButton.on('pointerdown', (event) => {
            if(this.score<0){
                joy+=0;
            }
            else if(this.score<=50){
                joy+=1;
            }
            else if(this.score<=90){
                joy+=2;
            }
            else if(this.score>90){
                joy+=3;
            }
            this.resultPOP.visible=false;
            date-=1;
            this.scene.restart('Running');
            this.scene.wake('Main'); //이거 없으면 이전 입력을 계속 갖고있음
            music.stop();
            this.scene.switch('Main');
            
        });
        this.scoreResultText = this.add.image(200, 230, 'scoreResultText');
        this.totalScoreText = this.add.image(384, 110, 'totalScoreText');
        this.totalText = this.add.image(200, 300, 'totalText');
        


        var scoreText2=this.add.bitmapText(300, 210, 'myfont',': 0',  40);
        scoreText2.setText(this.score);
        var totalText2=this.add.bitmapText(350, 280, 'myfont',': 0', 40);
        if(this.score<0){
            totalText2.setText(0);
        }
        else if(this.score<=50){
            totalText2.setText(1);
        }
        else if(this.score<=90){
            totalText2.setText(2);
        }
        else if(this.score>90){
            totalText2.setText(3);
        }
    }

        //min=1, max=4
    randomNumber(min, max) {
        var randVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return randVal;
    }
    //min=450, max=900
    randomNum(min, max) {
        var randVal = Math.floor(Math.random() * (max - min + 1)) + min;
        return randVal;
    }

    //확률이 높으면 0 리턴, 나머지는 random 함수로부터 숫자 하나 불러짐(1~4)
    randomObject() {
        //randomList=["heart", "banana", "cat", "rock", "trash"]
        if (Math.random() < 0.7) {
            //random=randomList[0];
            this.random = 0;
        }
        else {
            var num = this.randomNumber(1, 4);
            //random=randomList[num];
            this.random = num;
        }
        return this.random;
    }

    //마지막 위치에 새로운 오브젝트 생성->loop를 통해 반복
    spawnObject(time, delta) {
        if (!this.gameOver) {
            var temp = this.randomObject(); //0~4사이 숫자
            if (temp == 0) {
                var object = this.physics.add.image(790, 360, this.randomList[temp]);
                this.physics.add.collider(this.sprite, object);
                this.physics.add.collider(object, this.platforms);
                this.hearts.add(object);
                this.black.create(740, 256, 'limitbg');
            }
            else if (temp == 1) {
                var object = this.add.image(790, 360, this.randomList[temp]);
                this.physics.add.collider(this.sprite, object);
                this.physics.add.collider(object, this.platforms);
                this.others.add(object);
                this.black.create(740, 256, 'limitbg');
            }
            else if (temp == 2) {
                this.nameObjects.push("cat");
                var object = this.add.image(790, 360, this.randomList[temp]);
                this.physics.add.collider(this.sprite, object);
                this.physics.add.collider(object, this.platforms);
                this.objects.add(object);
                this.black.create(740, 256, 'limitbg');
            }

            else if (temp == 3) {
                var object = this.add.image(790, 360, this.randomList[temp]);
                this.physics.add.collider(this.sprite, object);
                this.physics.add.collider(object, this.platforms);
                this.others.add(object);
                this.black.create(740, 256, 'limitbg');
            }

            else if (temp == 4) {
                this.nameObjects.push("trash");
                var object = this.add.image(790, 360, this.randomList[temp]);
                this.physics.add.collider(this.sprite, object);
                this.physics.add.collider(object, this.platforms);
                this.objects.add(object);
                this.black.create(740, 256, 'limitbg');
            }

        }
    }
    //고양이, 쓰레기일 때 제대로 키보드 눌렀는 지 확인
    checkObject() {
        var object = this.objects.getChildren();
        if (object.length > 0) {
            if (object[0].x < 120 && object[0].x > 60) {
                var temp = this.nameObjects[0];
                if (temp == 'cat') {
                    if (this.cursors.left.isDown) {
                        this.plus1.alpha = 0;
                        this.plus5.alpha = 1;
                        this.minus5.alpha = 0;
                        this.score += 5;
                        this.scoreText.setText(':' + this.score);
                        object[0].destroy();
                        this.nameObjects.shift();
                        
                    }
                }
                else if (temp == 'trash') {
                    if (this.cursors.down.isDown) {
                        this.plus1.alpha=0;
                        this.plus5.alpha = 1;
                        this.minus5.alpha = 0;
                        this.score += 5;
                        this.scoreText.setText(':' + this.score);
                        object[0].destroy();
                        this.nameObjects.shift();
                    }
                }
            }
        }
    }

    delayObjectText() {
        this.objectText.visible = false;
    }

    //바나나, 돌일 때는 점프해서 피해야 하는데 실패했을 경우
    checkOther(time, delta) {
        var temp = this.others.getChildren();
        temp[0].destroy();
        this.score -= 5;
        this.scoreText.setText(':' + this.score);
        this.plus1.alpha=0;
        this.plus5.alpha=0;
        this.minus5.alpha=1;
        //this.minus5.visible = true;
        /*
        this.time.addEvent({
            delay: 700,
            callback: this.delayOtherText,
            loop: false
        })
        */

    }

    //하트랑 sprite랑 겹치면 점수 얻게하는 함수
    collectHeart() {
        var heartChildren = this.hearts.getChildren();
        heartChildren[0].destroy();
        this.score += 1;
        this.scoreText.setText(':' + this.score);
        this.plus1.alpha=1;
        this.plus5.alpha=0;
        this.minus5.alpha=0;

    }

    //타임바
    timeBar() {
        this.timebar.clear();
        //D27FFF
        this.timebar.fillStyle(0xA807FF);
        var timeSource;
        if (!this.gameOver) {
            this.timebar.fillRect(400, 20, 200 - 200 * this.timerEvent.getProgress(), 20);
            timeSource = 200 - 200 * this.timerEvent.getProgress();
        }
        else {
            this.timebar.fillRect(400, 20, timeSource, 20);
        }
        if ((1 - this.timerEvent.getProgress()) == 0) {
            this.gameOver = true;
        }

    }
    //모든 오브젝트 움직이는 함수
    moveObject(time, delta) {
        if (!this.gameOver) {
            var heartChildren = this.hearts.getChildren();
            var object = this.objects.getChildren();
            var temp = this.others.getChildren();
            for (var i = 0; i < heartChildren.length; i++) {
                heartChildren[i].x += -this.speed2 * delta;
            }
            for (var j = 0; j < object.length; j++) {
                object[j].x += -this.speed2 * delta;
            }
            for (var k = 0; k < temp.length; k++) {
                temp[k].x += -this.speed2 * delta;
            }
        }
        
    }

    //오브젝트 적당한 처리 실패했을 때 오브젝트 없애기
    destroyFailObject() {
        var object = this.objects.getChildren();
        var heartChildren = this.hearts.getChildren();
        var temp = this.others.getChildren();
        if (object.length > 0) {
            if (object[0].x < 60) {
                object[0].destroy();
                this.plus1.alpha=0;
                this.plus5.alpha = 0;
                this.minus5.alpha = 1;
                this.nameObjects.shift();
                this.score -= 5;
                this.scoreText.setText(':' + this.score);
            }
        }
        if (heartChildren.length > 0) {
            for (var i = 0; i < heartChildren.length; i++) {
                if (heartChildren[i].x < 60) {
                    heartChildren[i].destroy();
                }
            }
        }

        if (temp.length > 0) {
            for (var j = 0; j < temp.length; j++) {
                if (temp[j].x < 60) {
                    temp[j].destroy();
                }
            }
        }
    }

    //배경 움직이는 것
    moveBackground(time, delta) {
        if (!this.gameOver) {
            this.cloud1.x += -this.speed * delta;
            this.cloud2.x += -this.speed * delta;
            this.cloud3.x += -this.speed * delta;
            this.cloud4.x += -this.speed * delta;
            this.tree1.x += -this.speed * delta;
            this.tree2.x += -this.speed * delta;
            this.tree3.x += -this.speed * delta;
            this.tree4.x += -this.speed * delta;
            this.grass1.x += -this.speed * delta;
            this.grass2.x += -this.speed * delta;
            this.grass3.x += -this.speed * delta;
            this.grass4.x += -this.speed * delta;
            this.bench.x += -this.speed * delta;
            if (this.cloud1.x < 0) {
                this.cloud1.x = 800;
            }
            if (this.cloud2.x < 0) {
                this.cloud2.x = 800;
            }
            if (this.cloud3.x < 0) {
                this.cloud3.x = 800;
            }
            if (this.cloud4.x < 0) {
                this.cloud4.x = 800;
            }
            if (this.tree1.x < 0) {
                this.tree1.x = 800;
            }
            if (this.tree2.x < 0) {
                this.tree2.x = 800;
            }
            if (this.tree3.x < 0) {
                this.tree3.x = 800;
            }
            if (this.tree4.x < 0) {
                this.tree4.x = 800;
            }
            if (this.grass1.x < 0) {
                this.grass1.x = 800;
            }
            if (this.grass2.x < 0) {
                this.grass2.x = 800;
            }
            if (this.grass3.x < 0) {
                this.grass3.x = 800;
            }
            if (this.grass4.x < 0) {
                this.grass4.x = 800;
            }
            if (this.bench.x < 0) {
                this.bench.x = 800;
            }
        }


    }

};
