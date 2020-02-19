

class Pizza extends Phaser.Scene {

    constructor() {

        super({ key: 'Pizza', active: false, auto_start: false });
        //super();
        

        this.gameOver = false;
        this.pizza;
        this.nextPizza = Phaser.Math.Between(1, 4);
        this.Next;
        this.pizzaflag; //피자 새로 불러올지 말지 결정
        this.arrowflag; //방향키 입력 받을지 안받을지 결정
        this.boxflag; //피자박스 누적
        this.domino;
        this.mr;
        this.hut;
        this.school;
        this.dominoSequence = [1, 5, 3, 2, 4, 5, 3, 2, 1, 5, 3]; //11
        this.mrSequence = [1, 4, 2, 4, 5, 1, 3, 4, 5, 2, 5]; //13
        this.hutSequence = [1, 3, 2, 5, 1, 3, 4, 2, 4, 3, 5]; //11
        this.schoolSequence = [3, 2, 4, 5, 3, 4, 1, 3, 4, 2, 1]; //10
        this.dominoGroup;
        this.mrGroup;
        this.hutGroup;
        this.schoolGroup;
        this.boxGroup;
        this.boxNum;
        this.timerEvent;
        this.graphics;
        this.arrowdelay;
        this.arrowflag_flag;
        this.arrowright;
        this.si; //화살표 패턴 점수 인덱스
        this.ai; //화살표 생성시 활성화된 화살표 인덱스
        this.bacc1;
        this.back2;
        this.BOX;
        this.boxX = 710;
        this.boxY = 432;
        this.boxtext;
        this.isWrong; //틀렸을때 딜레이
        this.wrongDelay;
        this.wrongflag; //틀렸을때 잠시 지연
        this.timeSource;
        this.player;

        this.endPopop;
        this.OKbutton;

        this.pizzaText;
        this.moneyText;
        this.joyText;

        this.ThisArrow;
    }

    preload() {
        this.add.image(768/2,512/2,'nowloading').setScale(0.4)


        this.load.image('Domino', 'assets/pizza/미피4.png');
        this.load.image('Mr', 'assets/pizza/미피3.png');
        this.load.image('Hut', 'assets/pizza/미피5.png');
        this.load.image('School', 'assets/pizza/미피6.png');

        this.load.image('up', 'assets/pizza/up.png');
        this.load.image('down', 'assets/pizza/down.png');
        this.load.image('left', 'assets/pizza/left.png');
        this.load.image('right', 'assets/pizza/right.png');
        this.load.image('space', 'assets/pizza/space1.png');
        this.load.image('back1', 'assets/pizza/back1.png');
        this.load.image('back2', 'assets/pizza/back2.png');
        this.load.image('back3', 'assets/pizza/back3.png');
        this.load.image('scoretext', 'assets/pizza/scoretext.png');
        this.load.image('box', 'assets/pizza/box.png');
        this.load.image('player','assets/pizza/pizza_player.png')
        //this.load.image('timeBar','assets/pizza/timeBar.png')

        this.load.image('게임끝팝업','assets/pizza/피자_게임끝.png');
        this.load.image('ok','assets/공통팝업창/확인버튼.png');

        this.load.image('dd','assets/pizza/dd.png');
        this.load.image('aa','assets/pizza/cc.png');
        this.load.image('타임바','assets/pizza/타임바1.png');
        this.load.image('타임바_위','assets/pizza/타임바2.png');
        this.load.image('타임바_아래','assets/pizza/타임바3.png');
        this.load.bitmapFont('myfont', 'assets/main/font/font.png', 'assets/main/font/font.fnt');

    }
    //키보드 버튼 하나 누르는 거에 반응하는 곳
    create() {

        for(var i =0;i<4;i++){
            if(i%2==0){
                for(var j=0;j<6;j++){
                    if (j%2==0) {
                        this.add.image(j*128,i*128,'back1').setOrigin(0);
                    }
                    else{
                        this.add.image(j*128,i*128,'back2').setOrigin(0);
                    }
                }
            }
            else{
                for(var j=0;j<6;j++){
                    if (j%2==0) {
                        this.add.image(j*128,i*128,'back2').setOrigin(0);
                    }
                    else{
                        this.add.image(j*128,i*128,'back1').setOrigin(0);
                    }
                }
            }
        }

        this.add.image(400,256,'dd').setScale(1.3,1.3);
        this.timerEvent = this.time.addEvent({ delay: 30000 });
        this.graphics = this.add.graphics({ x: 20, y: 430 });
        this.graphics.angle = -90;

        for (var i=0; i<11;i++){
            this.add.image(19,60+32*i,'타임바').setOrigin(0).setScale(0.6);
        }
        var 위 = this.add.image(19,20,'타임바_위').setOrigin(0).setScale(0.6);
        var 아래 = this.add.image(67,475,'타임바_아래').setOrigin(0).setScale(0.6);
        아래.angle=180;
        //this.add.image(3,,'왼').setOrigin(0);
        //this.add.image(35,20,'오른').setOrigin(0);



        this.init();
        this.player = this.add.image(668,400,'player').setScale(0.2,0.2);

        this.domino = this.add.image(384, 240, 'Domino').setScale(0.6, 0.6);
        this.mr = this.add.image(384, 240, 'Mr').setScale(0.6,0.6);
        this.hut = this.add.image(384, 240, 'Hut').setScale(0.6, 0.6);
        this.school = this.add.image(384, 240, 'School').setScale(0.6, 0.6);

        this.domino.visible = false;
        this.mr.visible = false;
        this.hut.visible = false;
        this.school.visible = false;

        this.dominoGroup = this.add.group();
        this.mrGroup = this.add.group();
        this.hutGroup = this.add.group();
        this.schoolGroup = this.add.group();
        this.boxGroup = this.add.group();

        this.add.image(264,175,'aa').setScale(1.2,1.2);

        this.childMaking(this.dominoGroup, this.dominoSequence);
        this.childMaking(this.mrGroup, this.mrSequence);
        this.childMaking(this.hutGroup, this.hutSequence);
        this.childMaking(this.schoolGroup, this.schoolSequence);

        
        this.BOX = this.add.image(640, 40,'box').setScale(0.7, 0.7);
        this.boxtext = this.add.bitmapText(705, 32, 'myfont','X 0', 20);


        this.input.keyboard.on('keyup_UP', (event) => {
            if ((!this.gameOver) && (this.arrowflag == 0)) {
                if (this.pizza == 1) {
                    this.up_right(this.domino, this.dominoGroup, this.dominoSequence);
                }
                else if (this.pizza == 2) {
                    this.up_right(this.mr, this.mrGroup, this.mrSequence);
                }
                else if (this.pizza == 3) {
                    this.up_right(this.hut, this.hutGroup, this.hutSequence);
                }
                else if (this.pizza == 4) {
                    this.up_right(this.school, this.schoolGroup, this.schoolSequence);
                }
            }
        });
        this.input.keyboard.on('keyup_DOWN', (event) => {
            if (!this.gameOver && this.arrowflag == 0) {
                if (this.pizza == 1) {
                    this.down_right(this.domino, this.dominoGroup, this.dominoSequence);
                }
                else if (this.pizza == 2) {
                    this.down_right(this.mr, this.mrGroup, this.mrSequence);
                }
                else if (this.pizza == 3) {
                    this.down_right(this.hut, this.hutGroup, this.hutSequence);
                }
                else if (this.pizza == 4) {
                    this.down_right(this.school, this.schoolGroup, this.schoolSequence);
                }
            }
        });
        this.input.keyboard.on('keyup_LEFT', (event) => {
            if (!this.gameOver && this.arrowflag == 0) {
                if (this.pizza == 1) {
                    this.left_right(this.domino, this.dominoGroup, this.dominoSequence);
                }
                else if (this.pizza == 2) {
                    this.left_right(this.mr, this.mrGroup, this.mrSequence);
                }
                else if (this.pizza == 3) {
                    this.left_right(this.hut, this.hutGroup, this.hutSequence);
                }
                else if (this.pizza == 4) {
                    this.left_right(this.school, this.schoolGroup, this.schoolSequence);
                }
            }
        });
        this.input.keyboard.on('keyup_RIGHT', (event) => {
            if (!this.gameOver && this.arrowflag == 0) {
                if (this.pizza == 1) {
                    this.right_right(this.domino, this.dominoGroup, this.dominoSequence);
                }
                else if (this.pizza == 2) {
                    this.right_right(this.mr, this.mrGroup, this.mrSequence);
                }
                else if (this.pizza == 3) {
                    this.right_right(this.hut, this.hutGroup, this.hutSequence);
                }
                else if (this.pizza == 4) {
                    this.right_right(this.school, this.schoolGroup, this.schoolSequence);
                }
            }
        });
        this.input.keyboard.on('keyup_SPACE', (event) => {
            if (!this.gameOver && this.arrowflag == 0) {
                if (this.pizza == 1) {
                    this.space_right(this.domino, this.dominoGroup, this.dominoSequence);
                }
                else if (this.pizza == 2) {
                    this.space_right(this.mr, this.mrGroup, this.mrSequence);
                }
                else if (this.pizza == 3) {
                    this.space_right(this.hut, this.hutGroup, this.hutSequence);
                }
                else if (this.pizza == 4) {
                    this.space_right(this.school, this.schoolGroup, this.schoolSequence);
                }
            }
        });

        this.endPopup=this.add.image(384, 256,'게임끝팝업').setScale(0.6);
        this.endPopup.visible=false;
        this.OKbutton=this.add.image(600, 375,'ok').setInteractive();
        this.OKbutton.visible=false;

        this.OKbutton.on('pointerdown', (event) => {

            this.endPopup.visible=false;
            this.OKbutton.visible=false;

            date-=1;
            joy-=2;
            money+=this.boxNum*1000;
            this.scene.restart('pizza');
            this.scene.wake('Main'); //이거 없으면 이전 입력을 계속 갖고있음
            music.stop();
            console.log("노래끔");
            this.scene.switch('Main');

        });


    }



    //키보드 꾹 누르고 있는게 계속 반영되는 곳
    update() {

        

        if (this.arrowflag_flag == 0) {
            this.arrowflag_flag = 1;
            this.arrowright = this.time.addEvent({ delay: 150, callback: this.onEvent1, callbackScope: this });
        }

        if (this.pizzaflag == 0) { //새로운 피자박스 및 방향키 패턴 불러오기

            this.arrowflag = 1;
            if (this.isWrong == true) {
                this.isWrong = false;
                this.wrongDelay = this.time.addEvent({ delay: 500, callback: this.wrongEvent, callbackScope: this });
            }
            if (this.boxflag == 0) {
                this.boxflag = 1;
                var BOX = this.add.image(this.boxX, this.boxY - 10 * this.boxNum, 'box').setScale(0.7, 0.7);
                BOX.visible = true;
                this.boxtext.setText('X ' + this.boxNum);
            }
            if (this.wrongflag == 0) {
                this.pizzaflag = 1;
                this.pizza = this.nextPizza;
                this.nextPizza = Phaser.Math.Between(1, 4);
                /*switch (this.nextPizza) {
                    case 1: this.add.image(708, 60, 'Domino').setScale(0.5, 0.5); break;
                    case 2: this.add.image(708, 60, 'Mr').setScale(0.5, 0.5); break;
                    case 3: this.add.image(708, 60, 'Hut').setScale(0.5, 0.5); break;
                    case 4: this.add.image(708, 60, 'School').setScale(0.5, 0.5); break;
                }*/
                this.arrowdelay = this.time.addEvent({ delay: 100, callback: this.onEvent, callbackScope: this, repeat: 10 });

            }
        }

        //타이머
        this.graphics.clear();
        this.graphics.fillStyle(0xFF5E00);
        if (!this.gameOver) {
            this.graphics.fillRect(0, 0, 370 - 370 * this.timerEvent.getProgress(), 40);
            this.timeSource = 370-370 * this.timerEvent.getProgress();
        }
        else {
            this.graphics.fillRect(0, 0, this.timeSource, 30);
        }
        if ((1 - this.timerEvent.getProgress()) == 0) {
            this.gameOver = true;
            this.wrongEvent();
            this.events.on('shutdown', this.shutdown, this);
            this.endPizza();
        }
    }

    endPizza()
    {
        this.endPopup.visible=true;
        this.OKbutton.visible=true;
        this.pizzaText=this.add.bitmapText(420, 220, 'myfont',this.boxNum+'판',35 );
        this.moneyTExt=this.add.bitmapText(370, 280, 'myfont',this.boxNum*1000,35 );
        this.joyText=this.add.bitmapText(370, 340, 'myfont','-2',35 );
        
    }
    shutdown()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

    init(){
        
        this.gameOver=false;
        this.pizzaflag = 0; //피자 새로 불러올지 말지 결정
        this.arrowflag = 0; 
        this.boxNum = 0;
        this.nextPizza = Phaser.Math.Between(1, 4);
        this.boxflag = 1; //피자박스 누적
        this.boxNum = 0;
        this.arrowflag_flag = 1;
        this.si = 0; //화살표 패턴 점수 인덱스
        this.ai = 0; //화살표 생성시 활성화된 화살표 인덱스
        this.wrongflag = 0; //틀렸을때 잠시 지연
    }

    onEvent() {

        switch (this.pizza) {
            case 1: this.setting(this.domino, this.dominoGroup); break;
            case 2: this.setting(this.mr, this.mrGroup); break;
            case 3: this.setting(this.hut, this.hutGroup); break;
            case 4: this.setting(this.school, this.schoolGroup); break;
        }

    }
    onEvent1() {
        this.arrowflag = 0;
    }
    wrongEvent() {
        if (this.pizza == 1) {
            this.resetting(this.domino, this.dominoGroup);
        }
        else if (this.pizza == 2) {
            this.resetting(this.mr, this.mrGroup);
        }
        else if (this.pizza == 3) {
            this.resetting(this.hut, this.hutGroup);
        }
        else if (this.pizza == 4) {
            this.resetting(this.school, this.schoolGroup);
        }
        this.wrongflag = 0;
    }

    setting(pizza, group) {
        pizza.visible = true;
        var flag = 0;
        group.children.iterate((child) => {
            if (child.visible == false && flag == 0) {
                child.clearTint();
                child.visible = true;
                flag = 1;
                this.ai += 1;
            }
            if (this.ai == 10) //화살표 모두 활성화 시켰으면 인덱스 원상복귀
            {
                this.arrowflag_flag = 0;
                this.ai = 0;
            }
        });


    }
    resetting(pizza, group) {
        pizza.visible = false;
        group.children.iterate((child) => {
            child.visible = false;
        });
    }



    up_right(pizza, group, sequence) {
        var now = 0;
        var flag = 0;
        group.children.iterate((child) => {

            //현재 자식과 같은지
            if (flag == 0 && now == this.si) {
                if (sequence[now] == 1) //위쪽화살표이면
                {
                    child.visible = false;
                    this.si++;
                    flag = 1;
                    if (now == sequence.length - 1) {
                        this.si = 0;
                        this.boxNum += 1;
                        this.boxflag = 0;
                        this.pizzaflag = 0;
                        pizza.visible = false;
                    }
                }
                else {
                    child.tint = 0xa6a6a6;
                    this.wrongflag = 1;
                    this.isWrong = true;
                    this.si = 0;
                    this.pizzaflag = 0;
                }
            }
            now++; //현재 판단해야하는 자식이 아니면 다음자식으로
        });

    }
    down_right(pizza, group, sequence) {
        var now = 0;
        var flag = 0;
        group.children.iterate((child) => {

            //현재 자식과 같은지
            if (flag == 0 && now == this.si) {
                if (sequence[now] == 2) //위쪽화살표이면
                {
                    child.visible = false;
                    this.si++;
                    flag = 1;
                    if (now == sequence.length - 1) {
                        this.si = 0;
                        this.boxNum += 1;
                        this.boxflag = 0;
                        this.pizzaflag = 0;
                        pizza.visible = false;
                    }
                }
                else {
                    child.tint = 0xa6a6a6;
                    this.wrongflag = 1;
                    this.isWrong = true;
                    this.si = 0;
                    this.pizzaflag = 0;
                }
            }
            now++; //현재 판단해야하는 자식이 아니면 다음자식으로
        });

    }
    left_right(pizza, group, sequence) {
        var now = 0;
        var flag = 0;
        group.children.iterate((child) => {

            //현재 자식과 같은지
            if (flag == 0 && now == this.si) {
                if (sequence[now] == 3) //위쪽화살표이면
                {
                    child.visible = false;
                    this.si++;
                    flag = 1;
                    if (now == sequence.length - 1) {
                        this.si = 0;
                        this.boxNum += 1;
                        this.boxflag = 0;
                        this.pizzaflag = 0;
                        pizza.visible = false;
                    }
                }
                else {
                    child.tint = 0xa6a6a6;
                    this.wrongflag = 1;
                    this.isWrong = true;
                    this.si = 0;
                    this.pizzaflag = 0;
                }
            }
            now++; //현재 판단해야하는 자식이 아니면 다음자식으로
        });
    }
    right_right(pizza, group, sequence) {
        var now = 0;
        var flag = 0;
        group.children.iterate((child) => {

            //현재 자식과 같은지
            if (flag == 0 && now == this.si) {
                if (sequence[now] == 4) //위쪽화살표이면
                {
                    child.visible = false;
                    this.si++;
                    flag = 1;
                    if (now == sequence.length - 1) {
                        this.si = 0;
                        this.boxNum += 1;
                        this.pizzaflag = 0;
                        this.boxflag = 0;
                        pizza.visible = false;
                    }
                }
                else {
                    child.tint = 0xa6a6a6;
                    this.wrongflag = 1;
                    this.isWrong = true;
                    this.si = 0;
                    this.pizzaflag = 0;
                }
            }
            now++; //현재 판단해야하는 자식이 아니면 다음자식으로
        });

    }

    space_right(pizza, group, sequence) {
        var now = 0;
        var flag = 0;
        group.children.iterate((child) => {

            //현재 자식과 같은지
            if (flag == 0 && now == this.si) {
                if (sequence[now] == 5) //위쪽화살표이면
                {
                    child.visible = false;
                    this.si++;
                    flag = 1;
                    if (now == sequence.length - 1) {
                        this.si = 0;
                        this.boxNum += 1;
                        this.pizzaflag = 0;
                        this.boxflag = 0;
                        pizza.visible = false;
                    }
                }
                else {
                    child.tint = 0xa6a6a6;
                    this.wrongflag = 1;
                    this.isWrong = true;
                    this.si = 0;
                    this.pizzaflag = 0;
                }
            }
            now++; //현재 판단해야하는 자식이 아니면 다음자식으로
        });

    }



    childMaking(group, sequence) {
        var temp;
        var x;
        var y;
        for (var i = 0; i < sequence.length; i++) {

            if (sequence[i] == 1) {
                temp = this.add.image(0, 0, 'up').setScale(0.7, 0.7);
            }
            else if (sequence[i] == 2) //아래
            {
                temp = this.add.image(0, 0, 'down').setScale(0.7, 0.7);
            }
            else if (sequence[i] == 3) //아래
            {
                temp = this.add.image(0, 0, 'left').setScale(0.7, 0.7);
            }
            else if (sequence[i] == 4) //아래
            {
                temp = this.add.image(0, 0, 'right').setScale(0.7, 0.7);
            }
            else if (sequence[i] == 5) //아래
            {
                temp = this.add.image(0, 0, 'space').setScale(0.7, 0.7);
            }


            x = 264;
            y = 175;
            if (i < 3) {
                temp.setX(x);
                temp.setY(y + i * 60);
            }
            else if (i > 7) {
                temp.setX(x + 4 * 60);
                temp.setY(y + (10 - i) * 60);
            }
            else {
                temp.setX(x + (i - 3) * 60);
                temp.setY(y + 3 * 60);
            }

            temp.visible = false;
            group.add(temp);

        }

    }
}

/*
var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    backgroundColor: '#ffffff',
    scene: Pizza
};

var game = new Phaser.Game(config);
*/