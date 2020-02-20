class BlackJack extends Phaser.Scene{

    constructor() {
        super({ key: 'BlackJack'});
        console.log('sceneB called')

        this.button_go
        this.button_stop
        this.button_result

        this.sum1=0
        this.sum2 = 0
        this.dealerSum1 = 0
        this.dealerSum2 = 0

        
        this.money = 100

        this.cards;
        this.cardlocate = 0;
        this.click_stop = false;
        this.click_go = false;
        this.click_result=false;

        this.GAME_OVER = 0
        this.GAME_START = 1
        this.TURN_STOP = 2
        this.READY=3
        this.gameState = this.GAME_OVER

        this.PLAYER = 1
        this.DEALER = 2

        this.playNum;
        this.playText;
        

    }
    preload() {
        this.add.image(768/2,512/2,'nowloading').setScale(0.4)

        this.load.image('stop', '/assets/blackjack/stop.png');
        this.load.image('go', '/assets/blackjack/go.png');
        this.load.image('result','/assets/blackjack/result.png')

        this.load.image('card1', '/assets/blackjack/card1.png')
        this.load.image('card2', '/assets/blackjack/card2.png')
        this.load.image('card8', '/assets/blackjack/card8.png')
        this.load.image('carda', '/assets/blackjack/cardA.png')
        this.load.image('card3', '/assets/blackjack/card 3.png')
        this.load.image('card4', '/assets/blackjack/card 4.png')
        this.load.image('card5', '/assets/blackjack/card 5.png')
        this.load.image('card6', '/assets/blackjack/card 6.png')
        this.load.image('card7', '/assets/blackjack/card 7.png')
        this.load.image('card9', '/assets/blackjack/card 9.png')
        this.load.image('cardk', '/assets/blackjack/card k.png')

        this.load.image('bg_tile','/assets/blackjack/bg_pattern4.png')
        this.load.image('board','/assets/blackjack/board.png')
        this.load.image('cactus','/assets/blackjack/cactus.png')
        this.load.image('주인공','/assets/blackjack/player (3).png')
        this.load.image('dealerC','/assets/blackjack/dealer (1).png')
        
        this.load.image('ending','/assets/blackjack/버튼포함창.png')
        this.load.image('ok_button','/assets/blackjack/확인버튼.png')
        this.load.bitmapFont('myfont', '/assets/main/font/font.png', '/assets/main/font/font.fnt');
    }
    create() {

        //변수 초기화
        this.sum1=0
        this.sum2 = 0
        this.dealerSum1 = 0
        this.dealerSum2 = 0

        this.moneyText
        this.money = 5000

        this.cardlocate = 769/2+512/2-15;
        this.click_stop = false;
        this.click_go = false;
        this.click_result=false;

        this.GAME_OVER = 0
        this.GAME_START = 1
        this.TURN_STOP = 2
        this.READY=3

        this.PLAYER = 1
        this.DEALER = 2

        this.playNum=1;
        this.cardNum=0;
        this.Aappear=false;

      
        
        //배경 꾸미기
        this.add.tileSprite(0,0,768,512,'bg_tile').setOrigin(0)
        this.add.image(768/2,512/2,'board')
        var cactus=this.add.image(768/2+512/2,100,'cactus').setOrigin(0)
        cactus.setScale(0.2)
        var character=this.add.image(768/2+512/2+50,400,'주인공')
        character.setScale(0.2)
        var dealerCharacter = this.add.image(768/2-512/2-50,125,'dealerC')
        dealerCharacter.setScale(0.2)


        
        this.button_stop = this.add.image(525, 275, 'stop', 0);
        this.button_stop.scale = 0.1
        this.button_go = this.add.image(525, 225, 'go', 0)
        this.button_go.scale = 0.1
        this.cards = this.add.group();

        this.button_stop.setInteractive();
        this.button_stop.on('pointerdown', function (event) {
            if (!this.click_stop) this.click_stop = true;
        },this);
        this.button_go.setInteractive();
        this.button_go.on('pointerdown', function (event) {
            if (!this.click_go) this.click_go = true;
        },this)

        this.button_result=this.add.image(525,245,'result')
        this.button_result.setInteractive();
        this.button_result.setScale(0.15)
        this.button_result.on('pointerdown', function (event) {
            if (!this.click_result) 
                this.click_result = true;
            console.log('click'+this.click_result)
        },this)
        this.button_result.setVisible(false)

        this.gameState = this.GAME_START
        this.playText=this.add.bitmapText(300,225,'myfont','한판더?',48)
        this.playText.setVisible(false);

    }
    
    update(){
        var rand;
        var card;
        if (this.gameState == this.GAME_START) {
        if (this.click_go) {  // 클릭 시 카드 추가
                var cardname = this.random_card(this.PLAYER);
                this.cardNum+=1;
                var cardY=410;
                if(this.cardNum==6){
                    this.cardlocate=768/2+512/2-75*5-15;
                }
                if(this.cardNum>5){
                    cardY=300;
                    
                }
                card = this.add.image(this.cardlocate, cardY, cardname, 0);
                this.cards.add(card)
                card.scale = 0.2

                this.click_go = false;

                // 합계가 21을 초과하면 게임 오버
                if (this.sum1 > 21 || this.cardNum>= 9) {
                    this.sum1 = 0
                    this.sum2 = 0
                    this.gameState = this.GAME_OVER
                    if(this.money>0){
                        this.money *= -1
                        this.playNum *= -1
                    }
                    console.log(this.gameState)
                }
            }

            if (this.click_stop) {
                this.gameState = this.TURN_STOP
                this.Aappear=false;
                console.log(this.gameState)
                // 딜러 카드 오픈
                this.cardlocate = 768/2-512/2+10
                this.cardNum=0;
                var cardY=100;
                while (this.dealerSum1 <=11 && this.cardNum<8) {
                    var cardname = this.random_card(this.DEALER);
                    this.cardNum+=1;
                    if(this.cardNum==6)
                        this.cardlocate = 768/2-512/2+10+75
                    if(this.cardNum>5){
                        cardY=200
                    }
                    card = this.add.image(this.cardlocate, cardY, cardname, 0);
                    this.cards.add(card)
                    card.scale = 0.2

                    // 카드의 합 계산

                }
                while (this.dealerSum1 <= 21 && this.cardNum<8) {
                    rand = Math.floor(Math.random())
                    if (rand == 1) {
                        if (this.cardNum == 6)
                            this.cardlocate = 768 / 2 - 512 / 2 + 10+75
                        if (this.cardNum > 5) {
                            cardY = 200
                        }
                        var cardname = this.random_card(this.DEALER);
                        card = this.add.image(this.cardlocate, cardY, cardname, 0);
                        this.cardNum+=1
                        this.cards.add(card)
                        card.scale = 0.2
                    }
                    else {
                        break;
                    }
                }
                this.Aappear=false;
                if (this.sum2 <= 21)
                    this.sum1 = this.sum2
                if (this.dealerSum2 <= 21)
                    this.dealerSum1 = this.dealerSum2
                if (this.sum1 >= this.dealerSum1) {
                    if(this.playNum!=5)
                        this.playText.setVisible(true);
                }
                else {
                    if(this.money>0){
                    this.money *= -1
                    this.playNum*=-1
                    }
                    this.gameState = this.GAME_OVER
                }
                this.click_stop = false
            }
        }
        if (this.gameState == this.TURN_STOP && this.playNum<5) {
            if (this.click_go) {
                this.cards.clear(true, true)
                this.playNum+=1;
                this.cardNum=0;
                this.playText.setVisible(false);
                this.sum1 = this.sum2 = this.dealerSum1 = this.dealerSum2 = 0;
                this.cardlocate=769/2+512/2;
                this.click_go = false
                this.gameState = this.GAME_START
                this.money *= 2
            }
            if (this.click_stop) {
                this.click_stop = false
                this.gameState = this.GAME_OVER
            }
        }if(this.gameState == this.TURN_STOP && this.playNum==5){
            this.gameState=this.GAME_OVER
        }
        if (this.gameState == this.GAME_OVER) {
            this.button_go.setVisible(false)
            this.button_stop.setVisible(false)
            if(this.money>0){
                this.playText.setText('WIN!!')
            }else
                this.playText.setText('LOSE!!')
            this.playText.setVisible(true)
            this.button_result.setVisible(true)
            this.gameState=this.READY
            console.log(this.gameState)
        }
        if(this.gameState==this.READY){
            if (this.click_result) {
                console.log('function')
                this.add.image(0, 0, 'ending').setOrigin(0)
                if (this.money > 0)
                    this.add.bitmapText(370, 205, 'myfont', 'WIN', '34')
                else
                    this.add.bitmapText(370, 210, 'myfont', 'LOSE', 34)
                this.add.bitmapText(400, 260, 'myfont', '' + Math.abs(this.playNum) + '판', 34)
                //175,360
                this.add.bitmapText(175, 365, 'myfont', this.money, 38)
                this.add.bitmapText(400, 365, 'myfont', this.playNum, 34)
                var ok = this.add.image(565 + 112 / 2, 365 + 65 / 2, 'ok_button');
                ok.setInteractive();
                ok.on('pointerdown', function (event) {
                    this.backToMain();
                }, this)
            this.click_result=false;
            }


        }
    }
    backToMain(){
        money+=this.money
        date-=1
        joy+=this.playNum
        this.scene.restart('blackJack')
        this.scene.wake('Main')
                music.stop();
                this.scene.switch('Main')
    }

    random_card(who){
        var rand = Math.floor(Math.random() * (11)) + 1;
        var cardname;
        while ((rand==1 || rand==11) && this.Aappear){
            rand=Math.floor(Math.random()*10)+2;
        }
        if( (rand==1 || rand==11 ) && !this.Aappear){
            this.Aappear=true;
        }
        if (rand == 10)
            cardname = 'cardk'
        else if (rand == 11)
            cardname = 'carda'
        else
            cardname = 'card' + rand

        // 카드의 합 계산
        if (who == this.PLAYER) {
            if (this.cardNum > 5)
                this.cardlocate += 75;
            else
                this.cardlocate -= 75;
            if (rand == 11) {
                this.sum1 += 1
                this.sum2 += 11
            } else {
                this.sum1 += rand
                this.sum2 += rand
            }
        }
        if (who == this.DEALER) {
            this.cardlocate += 75;
            if (rand == 11) {
                this.dealerSum1 += 1
                this.dealerSum2 += 11
            } else {
                this.dealerSum1 += rand
                this.dealerSum2 += rand
            }
        }
        return cardname;
    }
}


