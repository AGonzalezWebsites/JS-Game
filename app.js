/*
Things to Add:
1) Add unique challenges
2) When a challenge is completed (not when avoided), delete that specific challenge property
2) Additional Moves after leveling up
3) Large top-down terrain background that moves down with progression

*/

function Person(firstname, lastname, health, strength) {

    console.log(this)
    this.firstname = firstname;
    this.lastname = lastname;
    this.level = 1;
    this.health = health;
    this.baseHealth = health;
    this.strength = strength;
    this.progress = 0;
    this.checkLevelProgress = function (){
        if (player.progress >= 100) {
            player.level = player.level + 1;
            player.baseHealth = player.baseHealth + 20;
            player.health = player.baseHealth;
            player.strength = player.strength + 2;
            document.getElementById("levelInfo").innerHTML = player.level;
            document.getElementById("healthInfo").innerHTML = player.health;
            document.getElementById("strengthInfo").innerHTML = player.strength;
            document.getElementById("dialog").innerHTML = "Congratulations, you've leveled up to " + player.level + "!!"
            setTimeout(function() { 
                document.getElementById("dialog").innerHTML = "Your health has increased to " + player.health + "!!"
            }, 3000);
            setTimeout(function() {
                document.getElementById("dialog").innerHTML = "Your Strength has increased to " + player.strength + "!!"
            }, 7000);
            setTimeout(function() {
                section1.challenge();
            }, 10000);
        } else {
            section1.challenge();
        }
    }

}

player = new Person('Alex', 'Doe', "100", "2");
var forestChallengeMusic = document.getElementById("audio1");
var forestCombatMusic = document.getElementById("audio2");
var enemyRoar = document.getElementById("audio3");
var attackSound = document.getElementById("audio4");
var fightWon = document.getElementById("audio5");
//initializing game
var changeName = function() {
    var name = document.getElementById("nameField").value;
    document.getElementById("playerName").innerHTML = name;
    document.getElementById("face").style.display = "inline-block";
    document.getElementById("playerSubmit").remove();
    window.player = new Person(name, 'Doe', 100, 2);
    document.getElementById("playerInfo").style.display = "inline";
    document.getElementById("initialNextIcons").style.display = "inline-block";
    document.getElementById("settingInfo").style.display = "inline";
    document.getElementById("locationInfo").innerHTML = section1.location;
    document.getElementById("levelInfo").innerHTML = player.level;
    document.getElementById("healthInfo").innerHTML = player.health;
    document.getElementById("strengthInfo").innerHTML = player.strength;
    document.getElementById("dialog").innerHTML = "Welcome," + ' ' + name + 
    "! Progress through the " + section1.location + " and overcome challenges to escape..";
};

//world 1, which contains enemies and challenge properties as well as challenge and chack answer methods
var a = 0;
var tempProgress = 0;
var section1 = {
    location: "Enchanted Forest",
    progress: 0,
    enemies: {
        enemy1: {name: 'Vengeful Wolf', level: 1, attack: 3, health: 5, expGiven: 12, picID: "wolf"},
        enemy2: {name: 'Enraged Serpent', level: 1, attack: 6, health: 2, expGiven: 16, picID: "snake"},
        enemy3: {name: "Colossal Beetle", level: 1, attack: 5, health: 8, expGiven: 22, picID: "beetle"},
    },
    firstChallenge: function() {forestChallengeMusic.play(); selectedChallenge = section1.challenges.challenge1; document.getElementById("initialNextIcons").style.display = "none"; section1.checkAnswer(); },
    challenges: {
        
        challenge1: {question: "A small creature spots you, but seems more intrigued than anything.. choose an action..",
                        forward: function() {
                            document.getElementById("dialog").innerHTML = "You Pressed Forward"
                            setTimeout(section1.checkAnswer(), 3000);
                        },
                    },
        challenge2: {question: "A wizard appears and seems to be summoning a powerful creature..",
                    solution: "run"},
        challenge3: {question: "You see a small group of stranded survivors. They have weapons.. you're not sure if you've been spotted..",
                    solution: "run"},
        challenge4: {question: "An elderly Lady spots you and waves you over, the coast seems to be clear of any monsters..",
                    solution: "forward"},
        challenge5: {question: "You see Drakie in trouble, but you can be spotted by any of the nearby creatures",
                    solution: "forward"},
        challenge6: {question: "You encounter a wounded man being attacked by a small creature..",
                    solution: "forward"},
        challenge7: {question: "A beast is asleep just off the trail, you can finish him in one blow, but will he wake up?",
                    solution: "forward"},
        challenge8: {question: "A young child seems to be lost. This place is danegerous. Proceed forward and help?",
                    solution: "forward"},
        challenge9: {question: "You hear humming behind trees in the shadows. This can't be good.. proceed forward or run away?",
                    solution: "run"},
        challenge10: {question: "You see an small enemy and believe you can win easily..",
                    solution: "forward"},
    },
    //challenge method - chooses a random challenge property and outputs it's value
    challenge: function() {
        document.getElementById("nextIcons").style.display = "none"; //remove nextIcon
        document.getElementById("combatIcons").style.display = "none"; //remove combatIcons
        document.getElementById("forestPic").style.display = "inline";
        document.getElementById("commandIcons").style.display = "block"; //add commandIcon
        forestChallengeMusic.play();
            a = Math.floor((Math.random() * 1) + 1);
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

        //gives functionality to answer types
        document.getElementById('forward').onclick = function changeContent() {
            selectedChallenge.forward();
        }
        document.getElementById('run').onclick = function changeContent() {
            document.getElementById("commandIcons").style.display = "none"; //add commandIcon
            document.getElementById("dialog").innerHTML = "Challenge avoided.."
            if (4 < Math.floor((Math.random() * 6) + 1)) {
                for (i = 0; i < tempProgress; i++) {
                    (function(i) {
                        setTimeout(function() {
                            let atPercentage = section1.progress + 1;;
                            section1.progress = atPercentage
                            document.getElementById("progressInfo").style.width = atPercentage + '%'; 
                            document.getElementById("commandIcons").style.display = "none";
                            console.log(i);
                            console.log(document.getElementById("progressInfo").style.width);
                            console.log(section1.progress);
                            console.log("-------------");
                        }, 300 * i);
                    }(i));
                }
                setTimeout(function() {document.getElementById("commandIcons").style.display = "none"; document.getElementById("dialog").innerHTML = "Watch out!"}, 3000)
                setTimeout(function() {forestChallengeMusic.pause(); document.getElementById("forestPic").style.display = "none"; playerAttacked(); }, 5000)
                return
            }
                else {
                section1.checkAnswer()
                }
        }

    },

    //checks if challenge solution is correct. If not, you are ambushed. checks progress, if 100 then you win.
    checkAnswer: function() {
        if (selectedChallenge === selectedChallenge) {
            forestChallengeMusic.play();
            document.getElementById("nextIcons").style.display = "none";
            document.getElementById("forestPic").style.display = "block"
            tempProgress = Math.floor((Math.random() * 7) + 1);
            document.getElementById("commandIcons").style.display = "none";
            document.getElementById("dialog").innerHTML = tempProgress + " progress made!" 
            if (4 < Math.floor((Math.random() * 6) + 1)) {
                for (i = 0; i < tempProgress; i++) {
                    (function(i) {
                        setTimeout(function() {
                            let atPercentage = section1.progress + 1;;
                            section1.progress = atPercentage
                            document.getElementById("progressInfo").style.width = atPercentage + '%'; 
                            document.getElementById("commandIcons").style.display = "none";
                            console.log(i);
                            console.log(document.getElementById("progressInfo").style.width);
                            console.log(section1.progress);
                            console.log("-------------");
                        }, 300 * i);
                    }(i));
                }
                setTimeout(function() {document.getElementById("commandIcons").style.display = "none"; document.getElementById("dialog").innerHTML = "Watch out!"}, 3000)
                setTimeout(function() {forestChallengeMusic.pause(); document.getElementById("forestPic").style.display = "none"; playerAttacked(); }, 5000)
                return
            } else {
                if (5 < Math.floor((Math.random() * 6) + 1)) {
                    for (i = 0; i < tempProgress; i++) {
                        (function(i) {
                            setTimeout(function() {
                                let atPercentage = section1.progress + 1;;
                                section1.progress = atPercentage
                                document.getElementById("progressInfo").style.width = atPercentage + '%'; 
                                document.getElementById("commandIcons").style.display = "none";
                                console.log(i);
                                console.log(document.getElementById("progressInfo").style.width);
                                console.log(section1.progress);
                                console.log("-------------");
                            }, 300 * i);
                        }(i));
                    }
                    setTimeout(function() {section1.challenge();}, 3000)
                    return
                } 
            
                

            }
            if (section1.progress > 99) {
                document.getElementById("dialog").innerHTML = "Congratulations! You've successfully escaped the Wicked Forest";
                setTimeout(function() { document.location.reload(true); },3000)               
                return    
            } else { 
                for (i = 0; i < tempProgress; i++) {
                    (function(i) {
                        setTimeout(function() {
                            let atPercentage = section1.progress + 1;;
                            section1.progress = atPercentage
                            document.getElementById("progressInfo").style.width = atPercentage + '%'; 
                            document.getElementById("commandIcons").style.display = "none";
                            console.log(i);
                            console.log(document.getElementById("progressInfo").style.width);
                            console.log(section1.progress);
                            console.log("-------------");
                        }, 300 * i);
                    }(i));
                }
                setTimeout(function() {tempProgress = 0; document.getElementById("commandIcons").style.display = "none"; document.getElementById("nextIcons").style.display = "inline-block"; document.getElementById("dialog").innerHTML = "No encounters..."; },3000)
            }
        } else { 
            document.getElementById("dialog").innerHTML = "Uh oh..."
            document.getElementById("commandIcons").style.display = "none";
            setTimeout(function() { forestChallengeMusic.pause(); document.getElementById("forestPic").style.display = "none"; playerAttacked(); },3000)
        }
    }
};


//sequence when ambushed
var selectedName;
function playerAttacked() {
    forestCombatMusic.play();
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
    document.getElementById(selectedName.picID).style.display = "inline";
    document.getElementById(selectedName.picID).style.animation = "attacked linear 1s";
    document.getElementById(selectedName.picID).style.animation = "enemyAttack linear 1s";
    enemyRoar.play();
    attackSound.play();
    document.getElementById("dialog").innerHTML ="You were ambushed by " + selectedName.name + " and took " + selectedName.attack + " damage";
    player.health = player.health - selectedName.attack;
    document.getElementById("healthInfo").innerHTML = player.health;
    section1.enemies.tempEnemyHealth = selectedName.health;
    if (player.health < 1) {
        document.getElementById("dialog").innerHTML = "You Have Died!!!";
        setTimeout(function() { document.location.reload(true); }, 2000)
    } else if (player.health < 30) {
        document.getElementById("dialog").innerHTML = "Be careful, you are getting weak!!!";
        document.getElementById("face").classList.remove('fa-smile-beam');
        document.getElementById("face").classList.add('fa-tired');
        setTimeout(function() { combatSequence(); }, 4000)
    } else {
        setTimeout(function() { combatSequence(); }, 4000)
    }
}
  
//fight sequence 

var overallDamageGiven = 0;
var overallDamageTaken = 0;
var sequences = 0;
function combatSequence() {
    document.getElementById("dialog").innerHTML = "<b>Fighting</b>: " + selectedName.name
        + "<br><b>Lvl</b>: " + selectedName.level + " <b>Atk</b>: " + selectedName.attack + " <b>HP</b>: " + section1.enemies.tempEnemyHealth;
    document.getElementById("combatIcons").style.display = "block";
    //sdfvkasbeldjkblvnesdlgvkbsendlfgvjnsedfl3vbjngsdlfkjvbnsldfg

    document.getElementById("attack").onclick = function () {
    attackSound.play();
    enemyRoar.play();
    document.getElementById("combatIcons").style.display = "none";
    section1.enemies.tempEnemyHealth = section1.enemies.tempEnemyHealth - player.strength;
    i = section1.enemies.tempEnemyHealth;
    player.health = player.health - selectedName.attack;
    overallDamageGiven = overallDamageGiven + player.strength;
    overallDamageTaken = overallDamageTaken + selectedName.attack;              
    console.log(selectedName)
    sequences = sequences + 1;
    console.log(sequences);
            
        //Determines if player is still alive. Game ends if not.
        if (section1.enemies.tempEnemyHealth >= 1 && player.health >= 1) {

            document.getElementById("dialog").innerHTML = "You dealt " + player.strength + " damage to " + selectedName.name; 
            document.getElementById("healthInfo").innerHTML = player.health;
            setTimeout(function() { document.getElementById("dialog").innerHTML = "You received " + selectedName.attack + " damage"; }, 3000)
            setTimeout(function() { combatSequence(); }, 6000)
            return

        } else if (player.health <= 0) {
            setTimeout(function() { document.getElementById("dialog").innerHTML = "You Died..."; }, 1)
            setTimeout(function() { document.location.reload(true); }, 5000)
            return
        } else if  (section1.enemies.tempEnemyHealth <= 1) {
            document.getElementById(selectedName.picID).style.animation = "attacked linear 1s";
            document.getElementById("commandIcons").style.display = "none";
            document.getElementById("dialog").innerHTML = "Congratulations, you've won the fight!!"; 
            document.getElementById("healthInfo").innerHTML = player.health;
            fightWon.play();
            forestCombatMusic.pause();
            setTimeout(function() { document.getElementById("dialog").innerHTML = "Total Damage Dealt: " + overallDamageGiven; }, 3000)
            setTimeout(function() { document.getElementById("dialog").innerHTML = "Total Damage Received: " + overallDamageTaken; }, 6000)
            setTimeout(function() {
                document.getElementById("dialog").innerHTML = "You gained " + selectedName.expGiven + " XP!!!"
                for (i = 0; i < selectedName.expGiven; i++) {
                    (function(i) {
                        setTimeout(function() {
                            let atPercentage = player.progress + 1;
                            player.progress = atPercentage
                            document.getElementById("playerProgressInfo").style.width = atPercentage + '%'; 
                            console.log(i);
                            console.log(document.getElementById("progressInfo").style.width);
                            console.log(player.progress);
                            console.log("-------------");
                        }, 100 * i);
                    }(i));
                }
            }, 9000)
            setTimeout(function() {
                sequences = 0;
                overallDamageGiven = 0;
                overallDamageTaken = 0;
                document.getElementById("commandIcons").style.display = "none";
                document.getElementById(selectedName.picID).style.display = "none";
                document.getElementById("nextIcons").style.display = "inline-block";
            }, 12000)
        }
    };

    //Attempts to run away. 50/50 chance.
    document.getElementById("runAway").onclick = function () {
        document.getElementById("combatIcons").style.display = "none";
        var runChance = Math.floor((Math.random() * 2) + 0);
        if (runChance == true) {
            document.getElementById("dialog").innerHTML = "You escaped!!";
            forestCombatMusic.play();
            forestCombatMusic.pause();
            document.getElementById(selectedName.picID).style.display = "none";
            document.getElementById("nextIcons").style.display = "inline-block";
        } else { 
            document.getElementById("dialog").innerHTML = "You could not escape! <br>" + selectedName.attack + " damage taken";
            player.health = player.health - selectedName.attack;
            document.getElementById("healthInfo").innerHTML = player.health;
            attackSound.play();
            setTimeout(function() { combatSequence(); }, 2000)
        }
    };
    
};








/*Person.prototype.attack = function() {
    return "Attack Something";
}

Person.prototype.getFormalFullName = function() {
    return this.lastname + ', ' + this.firstname;
}*/





