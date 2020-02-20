
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
        this.boxX = 720;
        this.boxY = 445;
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

        this.life;
        this.lifeGroup;
        this.daedGroup;
        this.timeChange;


    }

    preload() {
        this.add.image(768/2,512/2,'nowloading').setScale(0.4)
        this.load.image('aaaa','assets/pizza/흰색배경.png')

        this.load.image('Domino', 'assets/pizza/도미노.png');
        this.load.image('Mr', 'assets/pizza/미스터피자.png');
        this.load.image('Hut', 'assets/pizza/피자핫.png');
        this.load.image('School', 'assets/pizza/피자스쿨.png');

        this.load.image('up', 'assets/pizza/up.png');
        this.load.image('down', 'assets/pizza/down.png');
        this.load.image('left', 'assets/pizza/left.png');
        this.load.image('right', 'assets/pizza/right.png');
        this.load.image('space', 'assets/pizza/space1.png');
        this.load.image('back1', 'assets/pizza/back1.png');
        this.load.image('back2', 'assets/pizza/back2_1.png');
        this.load.image('scoretext', 'assets/pizza/scoretext.png');
        this.load.image('box', 'assets/pizza/box.png');
        this.load.image('player','assets/pizza/pizza_player.png')
        this.load.image('life_pink','assets/pizza/분홍하트.png');
        this.load.image('life_gray','assets/pizza/회색하트.png');
        this.load.image('게임끝팝업','assets/pizza/피자게임끝.png');
        this.load.image('ok','assets/공통팝업창/확인버튼.png');
        this.load.image('가운데타일','assets/pizza/eeee.png');
        
        this.load.bitmapFont('myfont', 'assets/main/font/font.png', 'assets/main/font/font.fnt');

    }
    
    create() {

        this.init(); //변수초기화

        //배경타일
        for(var i =0;i<4;i++){
            if(i%2==0){
                for(var j=0;j<6;j++){
                    if (j%2==0) {
                        this.add.image(j*128,i*128,'back1').setOrigin(0);
                    }
                    else{
                        this.add.image(j*128,i*128,'back2').setScale(4,4).setOrigin(0);
                    }
                }
            }
            else{
                for(var j=0;j<6;j++){
                    if (j%2==0) {
                        this.add.image(j*128,i*128,'back2').setScale(4,4).setOrigin(0);
                    }
                    else{
                        this.add.image(j*128,i*128,'back1').setOrigin(0);
                    }
                }
            }
        }

        this.lifeGroup=this.add.group();
        this.deadGroup=this.add.group();
        for (var i=0;i<3;i++){
            var temp1 = this.add.image(30+i*50,30,'life_gray').setScale(1.2,1.2).setVisible(true);
            var temp2 = this.add.image(30+i*50,30,'life_pink').setScale(1.2,1.2).setVisible(true);
            this.deadGroup.add(temp1);
            this.lifeGroup.add(temp2);
        }


        
        
        this.add.image(415,256,'가운데타일').setScale(1.3,1.3);
        //타이머 생성
        this.timerEvent = this.time.addEvent({ delay: 5000 });
        this.graphics = this.add.graphics({ x: 253, y: 115 });

        //캐릭터
        this.player = this.add.image(668,400,'player').setScale(0.2,0.2);


        //피자그룹 생성
        this.domino = this.add.image(384, 240, 'Domino').setScale(0.75, 0.75);
        this.mr = this.add.image(384, 240, 'Mr').setScale(0.55,0.55);
        this.hut = this.add.image(384, 240, 'Hut').setScale(0.75, 0.75);
        this.school = this.add.image(384, 240, 'School').setScale(0.75, 0.75);

        this.domino.visible = false;
        this.mr.visible = false;
        this.hut.visible = false;
        this.school.visible = false;

        this.dominoGroup = this.add.group();
        this.mrGroup = this.add.group();
        this.hutGroup = this.add.group();
        this.schoolGroup = this.add.group();
        this.boxGroup = this.add.group();

        
        //피자마다 방향키 패턴 생성
        this.childMaking(this.dominoGroup, this.dominoSequence);
        this.childMaking(this.mrGroup, this.mrSequence);
        this.childMaking(this.hutGroup, this.hutSequence);
        this.childMaking(this.schoolGroup, this.schoolSequence);

        
        

        //피자박스 몇개나 접었는지 
        this.BOX = this.add.image(640, 40,'box').setScale(0.7, 0.7);
        this.boxtext = this.add.bitmapText(705, 32, 'myfont','X 0', 20);


        //각각 방향키, 스페이스바 눌렀을때 반응
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

        //게임 결과창
        this.endPopup=this.add.image(384, 256,'게임끝팝업').setScale(0.6);
        this.endPopup.visible=false;
        this.OKbutton=this.add.image(600, 375,'ok').setInteractive();
        this.OKbutton.visible=false;

        //ok버튼 누르면 메인으로 이동
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



    update() {
        //방향키 누르는거 입력 안되게 하는거
        if (this.arrowflag_flag == 0) {
            this.arrowflag_flag = 1;
            this.arrowright = this.time.addEvent({ delay: 150, callback: this.onEvent1, callbackScope: this });
        }

        //새로운 피자박스 및 방향키 패턴 불러오기
        if (this.pizzaflag == 0) { 

            this.arrowflag = 1;
            //패턴 틀린거면 0.5초 지연
            if (this.isWrong == true) {
                this.pizzaflag=1;
                this.arrowflag=1;
                this.isWrong = false;
                this.life-=1;
                this.lifeDown();
                this.wrongDelay = this.time.addEvent({ delay: 500, callback: this.wrongEvent, callbackScope: this });
            }
            //패턴 맞춘거면 완성된 박스 하나 생성
            if (this.boxflag == 0) {
                this.timeChange=true;
                this.boxflag = 1;
                var BOX = this.add.image(this.boxX, this.boxY - 10 * this.boxNum, 'box').setScale(0.7, 0.7);
                BOX.visible = true;
                this.boxtext.setText('X ' + this.boxNum);
            }
            if (this.timeflag==0){
                this.timeflag=1;
                this.pizzaflag=1;
                this.arrowflag=1;
                this.si=0;
                this.wrongEvent();
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
        this.graphics.fillStyle(0xCEF279);
        if (!this.timeChange && !this.gameOver) {
            this.graphics.fillRect(0, 0, 270 - 270 * this.timerEvent.getProgress(), 30);
            this.timeSource = 270-270 * this.timerEvent.getProgress();
        }
        else {
            this.graphics.fillRect(0, 0, this.timeSource, 30);
        }
        if ((1 - this.timerEvent.getProgress()) == 0) {
            this.timeflag=0;
            this.timeChange=true;
            this.wrongflag=1;
            this.life-=1;
            this.lifeDown();
            this.pizzaflag=0;
        }

        if (this.timeChange){
            this.timeChange=false;
            this.timerEvent = this.time.addEvent({ delay: 5000 });
        }

        if (this.life==0){
            this.gameOver=true;
            this.events.on('shutdown', this.shutdown, this);
            this.endPizza();
        }
    }

    //게임 끝낼때
    endPizza()
    {
        this.endPopup.visible=true;
        this.OKbutton.visible=true;
        this.pizzaText=this.add.bitmapText(410, 220, 'myfont',this.boxNum+' 판',35 );
        this.moneyTExt=this.add.bitmapText(250, 340, 'myfont',this.boxNum*1000,35 );
        this.joyText=this.add.bitmapText(410, 340, 'myfont','-2',35 );
        
    }

    lifeDown(){
        var flag=true;
        this.lifeGroup.children.iterate((child)=>{
            
            if (flag && child.visible==true){
                flag=false;
                child.visible=false;
            }
        })
    }
    shutdown()
    {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

    //초기화함수
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
        this.life=3;
        this.timeChange=false;
        this.timeflag=1;
    }

    //새로운 피자박스 불러오는 함수
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
    //틀려서 재배치될때 나와있던 피자박스 들여보내는 함수 
    wrongEvent() {
        
        this.timeChange=true;
        
        
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
        this.pizzaflag=0;

    }

    //피자박스 배치
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
    //피자박스 정리
    resetting(pizza, group) {
        pizza.visible = false;
        group.children.iterate((child) => {
            child.visible = false;
        });
    }



    //방향키, 스페이스바 눌렀을때 각각의 패턴과 맞는 순서인지 확인하는 함수
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

    //피자박스 그룹의 방향키패턴 생성하는 함수
    childMaking(group, sequence) {
        var temp;
        var x;
        var y;
        for (var i = 0; i < sequence.length; i++) {

            if (sequence[i] == 1) {
                temp = this.add.image(0, 0, 'up').setScale(0.65, 0.65);
            }
            else if (sequence[i] == 2) //아래
            {
                temp = this.add.image(0, 0, 'down').setScale(0.65, 0.65);
            }
            else if (sequence[i] == 3) //아래
            {
                temp = this.add.image(0, 0, 'left').setScale(0.65, 0.65);
            }
            else if (sequence[i] == 4) //아래
            {
                temp = this.add.image(0, 0, 'right').setScale(0.65, 0.65);
            }
            else if (sequence[i] == 5) //아래
            {
                temp = this.add.image(0, 0, 'space').setScale(0.65, 0.65);
            }


            x = 275;
            y = 175;
            if (i < 3) {
                temp.setX(x);
                temp.setY(y + i * 55);
            }
            else if (i > 7) {
                temp.setX(x + 4 * 55);
                temp.setY(y + (10 - i) * 55);
            }
            else {
                temp.setX(x + (i - 3) * 55);
                temp.setY(y + 3 * 55);
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
