let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons=[
{
       name: "stick",
       power:5
},
{
    name:" dagger ",
    power:30
},
{
    name:" claw hammer ",
    power:50
},
{
    name: "sword",
    power:100
}

];
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store.\""
    },
	{
		name: "store",
		"button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
		"button functions": [buyHealth, buyWeapon, goTown],
		text: "You enter the store."
	},
    {
		name: "cave",
		"button text": ["fight slime", "fight fanged beast", "Go to town square"],
		"button functions": [fightSlime,fightBeast , goTown],
		text: "You enter the cave. you see monsters"
	},
    {
		name: "fighting hall",
		"button text": ["Attack", "Dodge", "Run"],
		"button functions": [attack,dodge , goTown],
		text: "you are fighting the monster"
	},
    {
		name: "kill monsters",
		"button text": ["Go to town square", "Go to town square", "Go to town square"],
		"button functions": [goTown , goTown , goTown],
		text: 'The monster screams "Arg!" as it dies. you get xp and gold'
	},
    {
		name: "lose",
		"button text": ["Replay!?", "Replay!?", "Replay!?"],
		"button functions": [restart , restart , restart],
		text: 'you die. xx'
	},
    {
		name: "win",
		"button text": ["Replay!?", "Replay!?", "Replay!?"],
		"button functions": [restart , restart , restart],
		text: 'you defeat the dragon you win the game!'
	}
];
const monsters=[
    {
        name:"slime",
        level:2,
        health:15
    },
    {
        name:"fanged beast",
        level:8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health:300
    }
];


// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display="none";
	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];
	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
    text.innerText = location.text;    
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if(gold>=10){
gold=gold-10;
health=health+10;
goldText.innerText=gold;
healthText.innerText=health;
    }
    else
    text.innerText="you don't have enough money to buy health"

}
function buyWeapon() {
    if(currentWeapon<weapons.length){
    if(gold>=30){
        gold-=30;
        currentWeapon+=1;
        let newWeapon=weapons[currentWeapon].name
        text.innerText="you now have a new "+ newWeapon+". ";
        inventory.push(newWeapon);
        text.innerText+=" In your inventory you have "+ inventory;
        goldText.innerText=gold;
    }
    else{
        text.innerText+="You don't have enough gold to buy a weapon";
    }
    }
    else{
    text.innerText+="You already have the most powerful weapon!";
    button2.innerText="sell weapon for 15 gold"
    button2.onclick=sellWeapon;
    }
}
function fightDragon() {
    fighting=2;
   goFight();

}
function fightSlime() {
   fighting=0;
   goFight();

}
function fightBeast() {
    fighting=1;
    goFight();

}
function goFight() {
    update (locations[3])
    monsterHealth=monsters[fighting].health;
    monsterStats.style.display="block";
    monsterNameText.innerText=monsters[fighting].name;
    monsterHealthText.innerText=monsterHealth;

}
function attack() {
    text.innerText="The "+monsters[fighting].name+" attacks";
    text.innerText+="you attack it with your "+weapons[currentWeapon].name;
    health-=monsters[fighting].level;
    monsterHealth-=weapons[currentWeapon].power+Math.floor(Math.random()*xp)+1;
    healthText.innerText=health;
    monsterHealthText.innerText=monsterHealth;
    if(health<=0)
    {
        lose();
    }
    else if(monsterHealth<=0)
    {    if(fighting===2){
          winGame();
    }
    else{
         defeatMonster();
    }
    }
}
function dodge() {
text.innerText="you dodged the attack from the "+monsters[fighting].name;

}
function lose() {
       update(locations[5]);

}
function winGame() {
    update(locations[6]);

}
function defeatMonster() {
   gold+=Math.floor(monsters[fighting].level*6.7);
   xp+=monsters[fighting].level
   goldText.innerText=gold;
   xpText.innerText=xp;
   update(locations[4]);

}
function restart() {
	xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	goTown();
}
function sellWeapon() {
   if(inventory.length>1){
    gold+=15;
    goldText.innerText=gold;
    let currentWeapon=inventory.shift();
    text.innerText="You sold a "+currentWeapon+" ";
    text.innerText+="In your inventory you have "+inventory;
   }
   else{
    text.innerText=" don't sell your only weapon";
   }

}

/*
const changeBackgroundBtn = document.getElementById("button1");

changeBackgroundBtn.addEventListener("click", function() {
  document.body.style.backgroundImage = "url('600px-Dragonshop.jpeg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
});*/











































