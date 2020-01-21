function Person(firstname, lastname, health, strength) {

    console.log(this)
    this.firstname = firstname;
    this.lastname = lastname;
    this.level = '1';
    this.health = health;
    this.strength = strength;
}

player = new Person('Alex', 'Doe', "100", "2");

var changeName = function() {
    var name = document.getElementById("nameField").value;
    document.getElementById("playerName").innerHTML = name;
    document.getElementById("face").style.display = "inline-block";
    document.getElementById("playerSubmit").remove();
    window.player = new Person(name, 'Doe', "100", "2");
    document.getElementById("playerInfo").style.display = "inline";
    document.getElementById("nextIcons").style.display = "inline-block";
    document.getElementById("settingInfo").style.display = "inline";

    document.getElementById("locationInfo").innerHTML = section1.location;
    document.getElementById("progressInfo").innerHTML = section1.progress;
    document.getElementById("levelInfo").innerHTML = player.level;
    document.getElementById("heathInfo").innerHTML = player.health;
    document.getElementById("strengthInfo").innerHTML = player.strength;
    document.getElementById("dialog").innerHTML = "Welcome" + ' ' + name + 
    " are you ready to begin a new Journey?, take a step forward..";
};

var section1 = {
    location: "Wicked Forest",
    progress: 0,
    enemies: {
        enemy1: {name: 'Wolfy', level: 1, attack: 6, health: 5},
        enemy2: {name: 'Snaky', level: 1, attack: 4, health: 3},
        enemy3: {name: "Colossal Beetle",level: 1, attack: 12, health: 9},
    },
    challenges: {
        challenge1: {question: "A creature spots you, but seems more intrigued than anything.. choose an action..", 
                    solution: "forward"},
        challenge2: {question: "A wizard appears and seems to be summoning a powerful creature..",
                    solution: "run"},
        challenge3: {question: "You see a small group of stranded survivors. They have weapons.. you're not sure if you've been spotted..",
                    solution: "run"},
        challenge4: {question: "An elderly Lady spots you and waves you over, the coast seems to be clear of any monsters..",
                    solution: "forward"},
        challenge5: {question: "You see Drakie in trouble, but you can be spotted by any of the nearby creatures",
                    solution: "forward"},
        challenge6: {question: "You encounter a wounded man being attacked by a small creature..",
                    solution: "fight"},
        challenge7: {question: "A beast is asleep just off the trail, you can finish him in one blow, but will he wake up?",
                    solution: "fight"},
        challenge8: {question: "A young child seems to be lost. This place is danegerous. Proceed forward and help?",
                    solution: "forward"},
        challenge9: {question: "You hear humming behind trees in the shadows. This can't be good.. proceed forward or run away?",
                    solution: "run"},
        challenge10: {question: "You see an small enemy and believe you can win easily..",
                    solution: "fight"},
    },
    
    challenge: function() {
        document.getElementById("nextIcons").style.display = "none"; //remove nextIcon
        document.getElementById("commandIcons").style.display = "block"; //add commandIcon
            a = Math.floor((Math.random() * 10) + 1);
        if (a === 1) {
            selectedChallenge = section1.challenges.challenge1;
        } else if (a === 2) {
            selectedChallenge = section1.challenges.challenge2;
        } else if (a === 3) {
            selectedChallenge = section1.challenges.challenge3;
        } else if (a === 4) {
            selectedChallenge = section1.challenges.challenge4;
        } else if (a === 5) {
            selectedChallenge = section1.challenges.challenge5;
        } else if (a === 6) {
            selectedChallenge = section1.challenges.challenge6;
        } else if (a === 7) {
            selectedChallenge = section1.challenges.challenge7;
        } else if (a === 8) {
            selectedChallenge = section1.challenges.challenge8;
        } else if (a === 9) {
            selectedChallenge = section1.challenges.challenge9;
        } else if (a === 10) {
            selectedChallenge = section1.challenges.challenge10;
        } 
        document.getElementById("dialog").innerHTML = selectedChallenge.question;
        correctAnswer = selectedChallenge.solution;
            console.log(correctAnswer);

        document.getElementById('forward').onclick = function changeContent() {
            selectedAnswer = 'forward';
            console.log()
            section1.checkAnswer(document.getElementById('forward'));
        }
        document.getElementById('fight').onclick = function changeContent() {
            selectedAnswer = 'fight';
            console.log(selectedAnswer)
            section1.checkAnswer();
        }
        document.getElementById('run').onclick = function changeContent() {
            selectedAnswer = 'run';
            console.log(selectedAnswer)
            section1.checkAnswer();
        }

    },
    checkAnswer: function() {
        if (correctAnswer === selectedAnswer) {
            document.getElementById("dialog").innerHTML = "Correct!!!"
            section1.progress = section1.progress + Math.floor((Math.random() * 10) + 1);
            if (99 < section1.progress) {
                    console.log("You Won")
                    document.getElementById("dialog").innerHTML = "Congratulations! You've successfully escaped the Wicked Forest";
            } else{
                document.getElementById("progressInfo").innerHTML = section1.progress;
                setTimeout(function() { section1.challenge(); },2000)
            }
        } else { 
            console.log("Wrong!!!");
            setTimeout(function() { playerAttacked(); },2000)
        }
    }
};


var selectedName;

function playerAttacked() {
    document.getElementById("commandIcons").style.display = "none"; //remove commandIcon
    //document.getElementById("combatIcons").style.display = "block"; //add combatIcon
    a = Math.floor((Math.random() * 3) + 1);

    if (a === 1) {
        selectedName = section1.enemies.enemy1;
    } else if (a === 2) {
        selectedName = section1.enemies.enemy2;
    } else if (a === 3) {
        selectedName = section1.enemies.enemy3;
    }

    document.getElementById("dialog").innerHTML ="You were ambushed by " + selectedName.name + " and took " + selectedName.attack + " damage";
    player.health = player.health - selectedName.attack;
    document.getElementById("heathInfo").innerHTML = player.health;

    if (player.health < 1) {
        document.getElementById("dialog").innerHTML = "You Have Died!!!";
    } else if (player.health < 30) {
        document.getElementById("dialog").innerHTML = "Be careful, you are getting weak!!!";
        document.getElementById("face").classList.remove('fa-smile-beam');
        document.getElementById("face").classList.add('fa-tired');
        setTimeout(function() { combatSequence(); }, 4000)
    } else {
        setTimeout(function() { combatSequence(); }, 4000)
    }
}


function combatSequence () {
    document.getElementById("dialog").innerHTML = "You are now fighting " + selectedName.name;
    document.getElementById("combatIcons").style.display = "block";
    document.getElementById("attack").onclick = function () {
        for(max1 = i; i > 0; i--) {
            console.log(max1);
            (function(){
                max1;
                max1 = max1 - player.strength;
                player.health = player.health - selectedName.attack;
                console.log(player.strength)
                console.log(max1)
            })();
        } 
           
    }


};








/*Person.prototype.attack = function() {
    return "Attack Something";
}

Person.prototype.getFormalFullName = function() {
    return this.lastname + ', ' + this.firstname;
}*/





