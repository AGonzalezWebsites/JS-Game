/*
Things to Add:
1) Progress Bar for Experience and Level Progress
2) Additional Moves after leveling up
3) Large top-down terrain background that moves down with progression

*/

function Person(firstname, lastname, health, strength) {

    console.log(this)
    this.firstname = firstname;
    this.lastname = lastname;
    this.level = 1;
    this.health = health;
    this.strength = strength;
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
    document.getElementById("nextIcons").style.display = "inline-block";
    document.getElementById("settingInfo").style.display = "inline";
    document.getElementById("locationInfo").innerHTML = section1.location;
    document.getElementById("levelInfo").innerHTML = player.level;
    document.getElementById("heathInfo").innerHTML = player.health;
    document.getElementById("strengthInfo").innerHTML = player.strength;
    document.getElementById("dialog").innerHTML = "Welcome," + ' ' + name + 
    "! Enter the " + section1.location + " to begin";
};

//world 1, which contains enemies and challenge properties as well as challenge and chack answer methods
var a = 0;
var tempProgress = 0;
var section1 = {
    location: "Enchanted Forest",
    progress: 0,
    enemies: {
        enemy1: {name: 'Vengeful Wolf', level: 1, attack: 2, health: 5, picID: "wolf"},
        enemy2: {name: 'Enraged Serpent', level: 1, attack: 5, health: 4, picID: "snake"},
        enemy3: {name: "Colossal Beetle", level: 1, attack: 6, health: 9, picID: "beetle"},
    },
    challenges: {
        challenge1: {question: "A creature spots you, but seems more intrigued than anything.. choose an action..",
                        forward: function() {
                            document.getElementById("dialog").innerHTML = "You Pressed Forward"
                            setTimeout(section1.checkAnswer(), 3000);
                        },
                        avoid: function() {
                            document.getElementById("dialog").innerHTML = "You were scared"
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
            document.getElementById("commandIcons").style.display = "none"; //add commandIcon
            selectedChallenge.forward();
        }
        document.getElementById('run').onclick = function changeContent() {
            document.getElementById("commandIcons").style.display = "none"; //add commandIcon
            selectedChallenge.avoid();
            //section1.checkAnswer();
        }

    },

    //checks if challenge solution is correct. If not, you are ambushed. checks progress, if 100 then you win.
    checkAnswer: function() {
        if (selectedChallenge === selectedChallenge) {
            tempProgress = Math.floor((Math.random() * 10) + 1);
            document.getElementById("dialog").innerHTML = "Success!! " + tempProgress + " progress made!" 
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
                setTimeout(function() {document.getElementById("dialog").innerHTML = "Watch out!"}, 3000)
                setTimeout(function() {forestChallengeMusic.pause(); document.getElementById("forestPic").style.display = "none"; playerAttacked(); }, 5000)
                return
            } else {
            
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
                setTimeout(function() { tempProgress = 0; section1.challenge(); },3000)
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
    enemyRoar.play();
    attackSound.play();
    document.getElementById("dialog").innerHTML ="You were ambushed by " + selectedName.name + " and took " + selectedName.attack + " damage";
    player.health = player.health - selectedName.attack;
    document.getElementById("heathInfo").innerHTML = player.health;
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
        document.getElementById(selectedName.picID).style.animation = "attacked 1s linear";
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
            document.getElementById("heathInfo").innerHTML = player.health;
            setTimeout(function() { document.getElementById("dialog").innerHTML = "You received " + selectedName.attack + " damage"; }, 3000)
            setTimeout(function() { combatSequence(); }, 6000)
            return

        } else if (player.health <= 0) {
            setTimeout(function() { document.getElementById("dialog").innerHTML = "You Died..."; }, 1)
            setTimeout(function() { document.location.reload(true); }, 5000)
            return
        } else if  (section1.enemies.tempEnemyHealth <= 1) {
            document.getElementById("dialog").innerHTML = "Congratulations, you've won the fight!!"; 
            document.getElementById("heathInfo").innerHTML = player.health;
            fightWon.play();
            forestCombatMusic.pause();
            setTimeout(function() { document.getElementById("dialog").innerHTML = "Total Damage Dealt: " + overallDamageGiven; }, 4000)
            setTimeout(function() { document.getElementById("dialog").innerHTML = "Total Damage Received: " + overallDamageTaken; }, 8000)
            setTimeout(function() {
                sequences = 0;
                overallDamageGiven = 0;
                overallDamageTaken = 0;
                document.getElementById(selectedName.picID).style.display = "none";
                section1.challenge()
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
            setTimeout(function() { document.getElementById(selectedName.picID).style.display = "none"; section1.challenge(); }, 2000)
        } else { 
            document.getElementById("dialog").innerHTML = "You could not escape! <br>" + selectedName.attack + " damage taken";
            player.health = player.health - selectedName.attack;
            document.getElementById("heathInfo").innerHTML = player.health;
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





