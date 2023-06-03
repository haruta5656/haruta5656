const quiz = [
    {
        question: 'クロネコ海賊団がシロップ村に上陸したときに、ルフィは北の海岸に何秒で行くと言ったか次の内から一つ選べ',
        options: [
            '10秒',
            '20秒',
            '30秒',
            '40秒',
        ],
        correct: '20秒',
    },{
        question: 'にんじんの野望を次の内から一つ選べ',
        options: [
            '大工の棟梁になること',
            '酒場を経営すること',
            '小説家になること',
            '医者になること',
        ],
        correct: '酒場を経営すること',
    },{
        question: 'チョッパーがヒルルクの病を治すために採ってきたキノコの名前を答えよ',
        correct: 'アミウダケ',
    },{
        question: 'アラバスタの気候海域に現れる生物を次の内から一つ選べ',
        options: [
            '海兎',
            'シーモンキー',
            '海ネコ',
            'アイランドクジラ',
        ],
        correct: '海ネコ',
    },{
        question:'「今まで大切にしてくれてどうもありがとう」というメリー号のセリフがある話のサブタイトルを答えよ',
        correct:'降りそそぐ追想の淡雪',
    } ,
];

const $question = document.getElementById('question');
const $button = document.querySelectorAll('.option-btn');
const $input = document.getElementById('input');
const $decide = document.getElementById('decide');

let quizNumber = 0;
let buttonNumber = 0;
let score = 0;

//問題文と選択肢を表示させる
const init = () =>{
    $question.textContent = quiz[quizNumber].question;
    let optionNumber = 0;

    for(let i = 0; i < $button.length; i++){
        $button[i].classList.add('hidden');
        }
    $input.classList.add('hidden');
        
    //選択問題と記述問題とで条件分岐
    
    if(quiz[quizNumber].hasOwnProperty('options')){
        for(let i = 0; i < $button.length; i++){
            $button[i].classList.remove('hidden');
            }
        while(optionNumber < $button.length){
            $button[optionNumber].textContent = quiz[quizNumber].options[optionNumber];
            optionNumber++;
        }
        
    }else{
        $input.classList.remove('hidden');
        

    }

    $decide.disabled = true;
    
};


//選択肢を選ぶ
const selectanswer = ()=>{
    for(let i = 0; i < $button.length; i++){
        $button[i].addEventListener('click', (e)=>{
    
            //押したボタン一つだけ色変わる
            for(let j = 0; j < $button.length; j++){
                if($button[j].classList.contains('clicked')){
                    $button[j].classList.remove('clicked');
                }
            }
            
            e.target.classList.toggle('clicked');
            
    
            //ボタンを一つ選んだら決定ボタン使えるようになる
            if(e.target.classList.contains('clicked')){
                $decide.disabled = false;
            }
            
            
            
        });
    };

};

//記述答え入力
const inputanswer =()=>{
    const $input = document.getElementById('input');
    $input.addEventListener('input',()=>{
        $decide.disabled = false;
    })
    
    
};


//答え決定、正誤判定 
const judge = ()=>{
    $decide.addEventListener('click',()=>{
        if(quiz[quizNumber].hasOwnProperty('options')){
            //選択問題
            let answer = document.querySelector('.clicked');
            console.log(answer.textContent);
            if(answer.textContent === quiz[quizNumber].correct){
                score++;
            }
            for(let i = 0; i < $button.length; i++){
            $button[i].classList.remove('clicked');
            }
            gotonext ();
        }else{
            //記述問題
            console.log($input.value)
            if($input.value === quiz[quizNumber].correct){
                score++;
            }
            $input.value = '';
            gotonext ();
        }
        
        
    })
};


//次の問題表示か終了
const gotonext = () =>{
    quizNumber++;
    if(quizNumber < quiz.length){
        init(quizNumber);
    }else{
        finish();
    }
};

init ();
selectanswer();
inputanswer();
judge();

//結果画面表示
const finish = ()=>{
    console.log(score);
    window.alert('終了！あなたのスコアは' + score + '/' + quiz.length + 'です');

}





