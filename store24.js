
class Store24 extends Phaser.Scene {
    constructor() { //this.변수명으로 선언 및 사용
        super({ key: 'Store24', active: false, auto_start: false });

        this.bg_매대오;
        this.bg_매대왼;
        this.bg_음료매대;

        this.bg_판1;
        this.bg_판2;
        this.bg_판3;
        this.bg_판4;

        this.편순이;

        this.물건속도=3; //작을수록 빠름
        this.speed;
        this.life=3;  //생명갯수변수
        this.hearts; //이미지그룹
        this.diehearts;
        this.점수항목; //score 이미지
        this.콤보항목;
        this.score=0; //실제점수
        this.scoreText; //점수쓸공간
        this.remainText;
        this.money; //계산된 돈
        this.combo=0;  //콤보변수
        this.topcombo=0; //제일 높은 콤보
        this.bonustag=0; //all combo 해서 보너스 있나? 없으면0
        this.그만=0;

        this.총상품=0;
        this.상품간격= 900; //0.9초기준시작
        this.할당량=100; //할당량 실수없이 끝내면 보너스 

        this.products; //group
        this.rand_product;//랜덤으로 뽑을 상품
        this.childs; //상품getchildren()

        this.timedEvent; //timer event
    

        this.inputGood; //맞음, 틀림 팝업 오브젝트
        this.inputBad;
        this.inputMiss;

       
        //상품 리스트
        
        this.snackList=["과자_꼬깔콘","과자_다이제","과자_도리","과자_오징어","과자_초코송이","과자_포카칩","과자_홈런볼"];
        this.noodleList=["라면_까불닭","라면_미역국","라면_신라면","라면_오짬","라면_육개장","라면_진라면","라면_참깨라면"];
        this.drinkList=["음료_데미사과","음료_데미오렌지","음료_데자와","음료_사이다","음료_콜라","음료_포카리","음료_핫6"];
        this.noList=["기타_갈고양이","기타_강아지","기타_검고양이","기타_쓰레기봉지"];
        this.productList=[]; //배열변수자체를 배열의 요소로!

        this.productList_leverl=[this.snackList,this.noodleList];
        this.productList_lever2=[this.snackList,this.noodleList,this.noList];
        this.productList_lever3=[this.snackList,this.noodleList,this.noList,this.drinkList];  //왼 오 스페이스 위 인풋짝

        this.inputList=[]; //랜덤상품고를때마다 눌러야할 키 넣기

        //결과팝업변수
        this.endpopup;
        this.endpopup_Ok;
        this.endpopup_score;
        this.endpopup_combo;
        this.endpopup_joy;
        this.endpopup_money;
        this.okbtn;
    }

    preload ()
    {
        this.add.image(768/2,512/2,'nowloading').setScale(0.4)
        this.load.bitmapFont('myfont', 'assets/main/font/font.png', 'assets/main/font/font.fnt');
        
        this.load.image('라면_까불닭', 'assets/store24/라면_까불닭.png');
        this.load.image('라면_육개장', 'assets/store24/라면_육개장.png');
        this.load.image('라면_미역국', 'assets/store24/라면_미역국.png');
        this.load.image('라면_신라면', 'assets/store24/라면_신라면.png');
        this.load.image('라면_진라면', 'assets/store24/라면_진라면.png');
        this.load.image('라면_오짬', 'assets/store24/라면_오짬.png');
        this.load.image('라면_참깨라면', 'assets/store24/라면_참깨라면.png');

        this.load.image('과자_꼬깔콘', 'assets/store24/과자_꼬깔콘.png');
        this.load.image('과자_오징어', 'assets/store24/과자_오징어.png');
        this.load.image('과자_초코송이', 'assets/store24/과자_초코송이.png');
        this.load.image('과자_포카칩', 'assets/store24/과자_포카칩.png');
        this.load.image('과자_홈런볼', 'assets/store24/과자_홈런볼.png');
        this.load.image('과자_다이제', 'assets/store24/과자_다이제.png');
        this.load.image('과자_도리', 'assets/store24/과자_도리.png');

        this.load.image('음료_데미사과', 'assets/store24/음료_데미사과.png');
        this.load.image('음료_데미오렌지', 'assets/store24/음료_데미오렌지.png');
        this.load.image('음료_데자와', 'assets/store24/음료_데자와.png');
        this.load.image('음료_사이다', 'assets/store24/음료_사이다.png');
        this.load.image('음료_콜라', 'assets/store24/음료_콜라.png');
        this.load.image('음료_포카리', 'assets/store24/음료_포카리.png');
        this.load.image('음료_핫6', 'assets/store24/음료_핫6.png');

        this.load.image('기타_갈고양이', 'assets/store24/기타_갈고양이.png');
        this.load.image('기타_검고양이', 'assets/store24/기타_검고양이.png');
        this.load.image('기타_강아지', 'assets/store24/기타_강아지.png');
        this.load.image('기타_쓰레기봉지', 'assets/store24/기타_쓰레기봉지.png');

        this.load.image('판1', 'assets/store24/판1.png');
        this.load.image('판2', 'assets/store24/판2.png');
        this.load.image('오른매대', 'assets/store24/오른매대상품.png');
        this.load.image('왼매대', 'assets/store24/왼매대상품.png');
        this.load.image('음료매대', 'assets/store24/음료매대.png');

        this.load.image('편순이', 'assets/store24/편순이.png');
        this.load.image('생명컬러', 'assets/store24/생명컬러.png');
        this.load.image('생명흑백', 'assets/store24/생명흑백.png');

        this.load.image('노란타일', 'assets/store24/노란타일.png');
        this.load.image('초록타일', 'assets/store24/초록타일.png');

        this.load.image('점수항목', 'assets/store24/scoretext.png');
        this.load.image('콤보항목', 'assets/store24/콤보ui.png');
        this.load.image('틀림', 'assets/store24/틀림팝업.png');
        this.load.image('맞음', 'assets/store24/맞음팝업.png');
        this.load.image('미스', 'assets/store24/미스팝업.png');

        //결과 팝업창
        this.load.image('버튼포함창','assets/공통팝업창/버튼포함창.png');
        //this.load.image('결과팝업','assets/공통팝업창/편의점결과.png');
        this.load.image('okbtn','/assets/공통팝업창/확인버튼.png');
    }

    

    create ()   //지역 변수는 var 로 정의하고 그냥 변수 이름으로 사용
    {   
        //배경타일설정
        for(var i =0;i<8;i++){
            if(i<4){
                for(var j=0;j<12;j++){
                    var tile=this.add.image(j*64,i*64,'노란타일').setOrigin(0);
                    tile.setScale(1/4,1/4);
                }
            }
            else{
                for(var j=0;j<12;j++){
                    var tile=this.add.image(j*64,i*64,'초록타일').setOrigin(0);
                    tile.setScale(1/4,1/4);
                }
            }
        }

        //리셋하기
        this.init();

        //생명그룹 하트 다섯개
        this.hearts=this.add.group();
        for(var i=0;i<this.life;i++){
            var temp=this.add.image(i*64,0,'생명컬러').setOrigin(0).setScale(1/10,1/10);
            this.hearts.add(temp,{addToScene:true});  //왼쪽부터 0,1,2,3,4 heart
        }

        this.diehearts=this.add.group();
        for(var i=0;i<this.life;i++){
            var temp=this.add.image(i*64,-100,'생명흑백').setOrigin(0).setScale(1/10,1/10);
            this.diehearts.add(temp,{addToScene:true});  //왼쪽부터 0,1,2,3,4 heart
        }
        
        //랜덤으로 선택된 상품그룹화
        this.products=this.add.group();  //디폴트스페이스로처리
        //판그룹=game.add.group();  나중에 무빙효과낼때

        this.bg_판1=this.add.image(0,430,'판1').setOrigin(0).setScale(1/3,1/3);
        this.bg_판2=this.add.image(256,430,'판1').setOrigin(0).setScale(1/3,1/3);
        this.bg_판3=this.add.image(384,430,'판1').setOrigin(0).setScale(1/3,1/3);
        this.bg_판4=this.add.image(512,430,'판1').setOrigin(0).setScale(1/3,1/3);

        this.bg_매대왼=this.add.image(0,64,'왼매대').setOrigin(0).setScale(1/3,1/3);
        this.bg_음료매대=this.add.image(280,30,'음료매대').setOrigin(0).setScale(1/3,1/3);
        this.bg_매대오=this.add.image(512,64,'오른매대').setOrigin(0).setScale(1/3,1/3);    

        this.편순이=this.add.image(280,110,'편순이').setOrigin(0).setScale(1/5,1/5);

        this.점수항목=this.add.image(8*64+20,0,'점수항목').setOrigin(0).setScale(1/4,1/4);
        this.scoreText = this.add.text(10*64+20, 13, '0', { fontFamily: 'fantasy',fontSize: '30px', color: '#000'});
        this.comboText = this.add.text(7*64+30, 13, '0', {fontFamily: 'fantasy',fontSize: '30px', color: '#000'});
        //this.speedText = this.add.text(700, 480, '0', { fontFamily: 'fantasy',fontSize: '30px', color: '#000'});
        this.remainText=this.add.bitmapText(7*64,50,'myfont',this.할당량,20);

        this.콤보항목=this.add.image(5*64-10,-17,'콤보항목').setOrigin(0).setScale(1/2.7,1/2.7);

        this.inputGood=this.add.sprite(300,200,'맞음').setOrigin(0).setScale(0.8,0.8); 
        this.inputBad=this.add.sprite(300,200,'틀림').setOrigin(0).setScale(0.8,0.8); 
        this.inputMiss=this.add.sprite(550,250,'미스').setOrigin(0).setScale(0.5,0.5);
        this.inputGood.alpha=0;
        this.inputBad.alpha=0;
        this.inputMiss.alpha=0;

        //주기적으로 상품 생성하는 함수 호출
        this.timedEvent=this.time.addEvent({ delay: this.상품간격, callback:this.createProduct, callbackScope: this, loop: true }); 
        this.speed = Phaser.Math.GetSpeed(600, this.물건속도);


        //키보드    ->function(event)와 (event) => 차이?무엇...
        this.input.keyboard.on('keydown', (event) => {
            var tempkey;
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT)
            {   
                tempkey='LEFT';
                this.checkInput(tempkey);
                //console.log("스페이스바");
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT)
            {
                tempkey='RIGHT';
                this.checkInput(tempkey);
                //console.log("오른");
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.UP){
                tempkey='UP';
                this.checkInput(tempkey);
                //console.log("위");
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE){
                tempkey='SPACE';
                this.checkInput(tempkey);
                //console.log("왼");
            }
        });
    }
    

    //상품child생성
    createProduct(){

        //점수에 따라 상품 목록 리스트 바뀜
        if (this.score <= 100){
            this.productList=this.productList_leverl;
            //console.log("level1");
        }
        else if(this.score>=200 && this.score<300){   //구간은 위아래 제한 다 있어야해!
            this.productList=this.productList_lever2;
            //console.log("level2");
        }
        else if(this.score >=300){
            this.productList=this.productList_lever3;
            //console.log("level3");
        }

        var rand_productList=this.pickProductList(); //상품종류고르기
        this.rand_product=this.randomProduct(rand_productList); //제품종류고르기->제품이름반환

        var temp=this.add.image(-120,340,this.rand_product).setOrigin(0);
        temp.setScale(1/7,1/7);
        this.products.add(temp,{addToScene:true}); //group에 넣고 displaylist에 넣기 true 처리

        this.총상품 =this.총상품+1; //총상품 갯수

        if(this.총상품==this.할당량){
            this.timedEvent.destroy(); //상품그만만들기
            this.그만=1;
            console.log("그만");
        }

    }
        

    //놓치거나 잘못 입력된 상품 처리 (생명-1)
    failProduct(){
        
        if (this.combo != 0){ //이미콤보가쌓인경우
            this.combo=0; //콤보리셋
        }
        this.comboText.setText(this.combo); //0보이기
        if(this.life >=1){
            this.life -=1;
            this.reduceHeart(); // 하트감소함수호출
        }
    }


    checkInput(inkey){
        
        //키보드 입력과 해당 상품 기대 입력값이 같으면 성공
        if (inkey == this.inputList[0]){
            this.inputBad.alpha=0;
            this.inputGood.alpha=0;
            this.inputMiss.alpha=0;
            this.inputGood.alpha=1;

            this.childs[0].destroy();  //제일 오래전에 만들어진 child 삭제
            this.inputList.shift();
            console.log("성공");
            this.score+=10;
            this.combo+=1; //콤보+1
            this.scoreText.setText(this.score);
            this.comboText.setText(this.combo);
        }
        else{ //잘못 입력했을 경우
            this.inputBad.alpha=0;
            this.inputGood.alpha=0;
            this.inputMiss.alpha=0;
            this.inputBad.alpha=1;

            console.log("실패");
            this.failProduct() //생명감소만한다.
        }

        //콤보올라갈때 마다 top업뎃
        if(this.combo>this.topcombo){
            //combo기록갱신
            this.topcombo=this.combo;
        }
    }

    //하트이미지변환(흑백으로)
    reduceHeart(){
        var dieheartchilds=this.diehearts.getChildren();
        dieheartchilds[this.life].setY(0);
        console.log("하트하나없앰");
    }

    //위치중 제일 오른쪽에 있는 child 받아와서 input 입력값과 

    update(time,delta)
    {
        this.remainText.setText('REMAIN '+(this.할당량-this.총상품));

        this.childs=this.products.getChildren();
        console.log(this.childs);
        if (this.그만==1 && this.childs.length==0){
            console.log("끝!");
            this.endStore24();
        }

        for (var i=0; i<this.childs.length; i++){
            this.childs[i].x += this.speed*delta;
            if(this.childs[i].x > 720){
                this.inputMiss.alpha=1;
                if(this.childs[i].x > 768){
                    this.inputBad.alpha=0;
                    this.inputGood.alpha=0;
                    this.inputMiss.alpha=0;
                    console.log(i); //사라지는 인덱스 출력
                    this.childs[i].destroy(); 
                    this.inputList.shift();  //입력받아야할 배열에서 값 삭제
                    console.log("아웃");
                    this.failProduct(); //여기서 콤보처리
                }
            }
        }

        //점수의 100배수마다 속도 점차 증가
        if(this.score%100==0){
            if(this.speed<0.5){
                var temp=this.score/100;
                this.speed=this.speed+temp*0.0002 //speed 클수록 빠름
                this.상품간격= this.상품간격*temp*0.00001;  //상품나오는 delay 작을수록 좋음
            }
        }



        //게임오버
        if (this.life == 0){
            this.endStore24(); //결과창부르기
            //console.log("게임오버");
        }
    }

        
    


    pickProductList(){
        var tempindex=this.getRandomInt(0,this.productList.length); //상품종류선택 index이용
        //console.log(productList[tempindex]);
        if (tempindex ==0){
            //0:snake
            this.inputList.push('LEFT');
        }
        else if (tempindex ==1){
            //1:noodle
            this.inputList.push('RIGHT');
        } 
        else if (tempindex ==2){
            //2:drink
            this.inputList.push('SPACE');
        } 
        else if (tempindex ==3){
            //3:no
            this.inputList.push('UP');
        } 
        console.log(this.inputList);
        return this.productList[tempindex]; //고른 list이름 반환
    }
    randomProduct(listname){
        var tempindex=this.getRandomInt(0,listname.length);
        //console.log(tempindex);
        console.log(listname[tempindex]);
        return listname[tempindex]; //특정제품이름반환
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }
    //결과처리함수
    endStore24(){
        this.endpopup=this.add.image(0,0,'버튼포함창').setOrigin(0);
        
        //결과팝업text
        this.endpopup_combo= this.add.text(320, 256, this.topcombo, { fontFamily: 'fantasy',fontSize: '40px', color: '#000'});
        this.endpopup_score= this.add.text(320, 192, this.score, { fontFamily: 'fantasy',fontSize: '40px', color: '#000'});
        this.endpopup_joy= this.add.text(384, 352, '', { fontFamily: 'fantasy',fontSize: '40px', color: '#000'});
        this.endpopup_money= this.add.text(192, 352, '', { fontFamily: 'fantasy',fontSize: '40px', color: '#000'});
        //all combo 하면 즐거움+2 ,돈 *2
        if(this.할당량==this.topcombo){
            this.bonustag=1;
        }
        //콤보만큼 100원씩 더줌
        //100점 마다 1000원
        this.money=1000*(this.score/100)+(this.topcombo*100);
        console.log(this.bonustag);
        if(this.bonustag==1){
            this.endpopup_joy.setText('+2'); 
            this.endpopup_money.setText(this.money*2);
        }
        else{ //보통
            this.endpopup_money.setText(this.money);
            this.endpopup_joy.setText('-'); 
        }

        this.okbtn = this.add.image(620, 395, 'okbtn');
        this.okbtn.setInteractive();
        this.okbtn.on('pointerdown', (event) => {
            //날, 돈, 즐거움 소비하고 얻은거 처리
            date=date-1;
            joy=joy-3;//소비
            if(this.bonustag==1){ //보너스
                joy=joy+2;
                money=money+this.money*2;
            }
            else{
                money=money+this.money;
            }
            console.log("clicked!!!!!!!!!!!!!!");
            this.endpopup.visible=false;
            this.scene.restart('store24');
            this.scene.wake('Main'); //이거 없으면 이전 입력을 계속 갖고있음
            music.stop();
            this.scene.switch('Main');
        });
    }

    init(){ //reset 값들
        this.물건속도=3; //작을수록 빠름
        this.life=3;  //생명갯수변수

        this.score=0; //실제점수
        this.combo=0;  //콤보변수
        this.topcombo=0; //제일 높은 콤보
        this.bonustag=0; //all combo 해서 보너스 있나? 없으면0

        this.총상품=0;
        this.상품간격= 900; //0.9초기준시작

        //상품, 인풋 리스트 리셋
        this.rand_productList=[]; //뽑을 리스트 리셋
        this.inputList=[]; //랜덤상품고를때마다 눌러야할 키 넣기

        this.그만=0;
    }

}



