// =========================
// script.js 
// =========================


// DADOS



let xp =
  Number(localStorage.getItem("xp")) || 0;

let level =
  Number(localStorage.getItem("level")) || 1;

let intelligence =
  Number(localStorage.getItem("intelligence")) || 0;

let strength =
  Number(localStorage.getItem("strength")) || 0;

let discipline =
  Number(localStorage.getItem("discipline")) || 0;


let skillPoints =
  Number(localStorage.getItem("skillPoints")) || 0;

let totalXP =
  Number(localStorage.getItem("totalXP")) || 0;

let streak =
  Number(localStorage.getItem("streak")) || 0;

let playerClass =
  localStorage.getItem("playerClass")
  || "executor";

let achievements =
  JSON.parse(
    localStorage.getItem("achievements")
  ) || [];

let weeklyXP =
  JSON.parse(
    localStorage.getItem("weeklyXP")
  ) || {
    Seg:0,
    Ter:0,
    Qua:0,
    Qui:0,
    Sex:0,
    Sab:0,
    Dom:0
  };

// DATA

const today =
  new Date().toLocaleDateString();

const lastLogin =
  localStorage.getItem("lastLogin");

const lastQuestDate =
  localStorage.getItem("lastQuestDate");



// STREAK

if(lastLogin !== today){

  localStorage.removeItem(
    "completedQuests"
  );

  localStorage.setItem(
    "lastLogin",
    today
  );


  if(lastQuestDate){

    const lastDate =
      new Date(lastQuestDate);

    const currentDate =
      new Date();

    const difference =
      Math.floor(

        (currentDate - lastDate)

        /

        (1000 * 60 * 60 * 24)

      );

    if(difference === 1){

      streak++;

    }

    else if(difference > 1){

      streak = 0;

    }

  }

}



// QUESTS

let completedQuests =
  JSON.parse(
    localStorage.getItem(
      "completedQuests"
    )
  ) || [];


const questsPool = [

  {
    name:"📚 Estudar 1 hora",
    xp:25,
    attribute:"intelligence",
    value:2
  },

  {
    name:"💧 Beber água",
    xp:10,
    attribute:"discipline",
    value:1
  },

  {
    name:"🏋️ Treinar",
    xp:50,
    attribute:"strength",
    value:3
  },

  {
    name:"💻 Programar",
    xp:40,
    attribute:"intelligence",
    value:3
  },

  {
    name:"🚶 Caminhar",
    xp:15,
    attribute:"discipline",
    value:1
  }

];



// ELEMENTOS

const xpFill =
  document.getElementById("xpFill");

const xpText =
  document.getElementById("xpText");

const levelText =
  document.getElementById("levelText");

const intelligenceText =
  document.getElementById(
    "intelligenceText"
  );

const strengthText =
  document.getElementById(
    "strengthText"
  );

const disciplineText =
  document.getElementById(
    "disciplineText"
  );

const skillPointsText =
  document.getElementById(
    "skillPointsText"
  );

const totalXPText =
  document.getElementById(
    "totalXPText"
  );

const questsDoneText =
  document.getElementById(
    "questsDoneText"
  );

const streakText =
  document.getElementById(
    "streakText"
  );

const rankText =
  document.getElementById(
    "rankText"
  );

const achievementsContainer =
  document.getElementById(
    "achievements"
  );

const analytics =
  document.getElementById(
    "analytics"
  );

const questsContainer =
  document.getElementById(
    "questsContainer"
  );

const dashboardButton =
  document.getElementById(
    "dashboardButton"
  );

const missionsButton =
  document.getElementById(
    "missionsButton"
  );

const skillsButton =
  document.getElementById(
    "skillsButton"
  );

const profileButton =
  document.getElementById(
    "profileButton"
  );

const dashboardSection =
  document.getElementById(
    "dashboardSection"
  );

const questsSection =
  document.getElementById(
    "questsSection"
  );

const skillsSection =
  document.getElementById(
    "skillsSection"
  );

const profileSection =
  document.getElementById(
    "profileSection"
  );

const statsSection =
  document.getElementById(
    "statsSection"
  );

const levelPopup =
  document.getElementById(
    "levelPopup"
  );

const popupLevel =
  document.getElementById(
    "popupLevel"
  );

const classSelect =
  document.getElementById(
    "classSelect"
  );

const testXP =
  document.getElementById(
    "testXP"
  );

const resetButton =
  document.getElementById(
    "resetButton"
  );


  const particles =
  document.getElementById(
    "particles"
  );



// UI

updateUI();

updateClassTheme();

generateQuests();

renderAchievements();

renderAnalytics();



// QUESTS

function generateQuests(){

  questsContainer.innerHTML = "";

  const selectedQuests =
    questsPool
      .sort(() => 0.5 - Math.random())
      .slice(0,3);


  selectedQuests.forEach((quest,index)=>{

    const button =
      document.createElement("button");

    button.classList.add("quest");

    button.innerHTML = `

      ${quest.name}

      <br>

      +${quest.xp} XP

    `;


    if(quest.difficulty === "facil"){

      button.style.border =
        "1px solid #3cff75";

    }

    if(quest.difficulty === "media"){

      button.style.border =
        "1px solid orange";

    }

    if(quest.difficulty === "dificil"){

      button.style.border =
        "1px solid red";

    }


    if(completedQuests.includes(index)){

      button.style.background =
        "#3cff75";

      button.disabled = true;

    }


    button.addEventListener("click",()=>{

      xp += quest.xp;
      totalXP += quest.xp;

      // ===== CLASS MULTIPLIERS =====

let multiplier = 1;


switch(playerClass){

  case "executor":

    if(
      quest.attribute ===
      "strength"
    ){

      multiplier = 1.6;

    }

    if(
      quest.attribute ===
      "intelligence"
    ){

      multiplier = 0.7;

    }

  break;



  case "hacker":

    if(
      quest.attribute ===
      "intelligence"
    ){

      multiplier = 1.6;

    }

    if(
      quest.attribute ===
      "strength"
    ){

      multiplier = 0.7;

    }

  break;



  case "monk":

    if(
      quest.attribute ===
      "discipline"
    ){

      multiplier = 1.7;

    }

    if(
      quest.attribute ===
      "strength"
    ){

      multiplier = 0.85;

    }

    if(
      quest.attribute ===
      "intelligence"
    ){

      multiplier = 0.85;

    }

  break;

}



// ===== FINAL VALUE =====

const finalValue =

  Math.round(
    quest.value * multiplier
  );



// ===== STATUS =====

switch(quest.attribute){

  case "intelligence":

    intelligence += finalValue;

  break;



  case "strength":

    strength += finalValue;

  break;



  case "discipline":

    discipline += finalValue;

  break;

}

      const days = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sab"
];

const todayDate =
  days[new Date().getDay()];;


if(!weeklyXP[todayDate]){

  weeklyXP[todayDate] = 0;

}


weeklyXP[todayDate] += quest.xp;


localStorage.setItem(

  "weeklyXP",

  JSON.stringify(weeklyXP)

);



// ===== STATUS =====

switch(quest.attribute){

  case "intelligence":

    intelligence += quest.value;

  break;


  case "strength":

    strength += quest.value;

  break;


  case "discipline":

    discipline += quest.value;

  break;

}




      if(xp >= 100){

        xp -= 100;

        level++;

        skillPoints++;

        showLevelPopup();

      }


      completedQuests.push(index);

      localStorage.setItem(
        "completedQuests",
        JSON.stringify(completedQuests)
      );


      localStorage.setItem(
        "lastQuestDate",
        new Date()
      );


      saveData();

      updateUI();

      renderAnalytics();


      button.style.background =
        "#3cff75";

      button.disabled = true;


    });


    questsContainer.appendChild(button);

  });

}


// SKILLS

const unlockableSkills =
  document.querySelectorAll(
    ".unlockable"
  );

unlockableSkills.forEach((skill)=>{

  skill.addEventListener("click",()=>{

    if(
      skill.classList.contains("locked")
      &&
      skillPoints > 0
    ){

      skill.classList.remove("locked");

      skill.classList.add("unlocked");

      skillPoints--;

      saveData();

      updateUI();

    }

  });

});



// SAVE

function saveData(){

  localStorage.setItem("xp", xp);

  localStorage.setItem("level", level);

  localStorage.setItem(
    "intelligence",
    intelligence
  );

  localStorage.setItem(
    "strength",
    strength
  );

  localStorage.setItem(
    "discipline",
    discipline
  );

  localStorage.setItem(
    "skillPoints",
    skillPoints
  );

  localStorage.setItem(
    "totalXP",
    totalXP
  );

  localStorage.setItem(
    "streak",
    streak
  );

}



// UPDATE UI

function updateUI(){

  xpFill.style.width =
    xp + "%";

  xpText.innerText =
    `${xp} / 100 XP`;

  levelText.innerText =
    `Nível ${level}`;

  intelligenceText.innerText =
    intelligence;

  strengthText.innerText =
    strength;

  disciplineText.innerText =
    discipline;

  skillPointsText.innerText =
    `Skill Points: ${skillPoints}`;

  totalXPText.innerText =
    totalXP;

  questsDoneText.innerText =
    completedQuests.length;

  streakText.innerText =
    streak;


  if(level >= 10){

    rankText.innerText =
      "Lenda";

  }

  else if(level >= 7){

    rankText.innerText =
      "Veterano";

  }

  else if(level >= 4){

    rankText.innerText =
      "Disciplinado";

  }

  else{

    rankText.innerText =
      "Iniciante";

  }


  checkAchievements();

  renderAchievements();

}



// CLASSES

classSelect.addEventListener("change",()=>{

  playerClass =
    classSelect.value;

  localStorage.setItem(
    "playerClass",
    playerClass
  );

  updateClassTheme();

});



function updateClassTheme(){

  if(playerClass === "executor"){

    document.documentElement
      .style
      .setProperty(
        "--main-color",
        "#ff003c"
      );

  }

  if(playerClass === "hacker"){

    document.documentElement
      .style
      .setProperty(
        "--main-color",
        "#00ffff"
      );

  }

  if(playerClass === "monk"){

    document.documentElement
      .style
      .setProperty(
        "--main-color",
        "#b026ff"
      );

  }

}



// POPUP

function showLevelPopup(){

  popupLevel.innerText =
    `Nível ${level}`;

  levelPopup.classList.add(
    "active"
  );

  setTimeout(()=>{

    levelPopup.classList.remove(
      "active"
    );

  },2500);

}



// ACHIEVEMENTS

function checkAchievements(){

  if(
    completedQuests.length >= 1
    &&
    !achievements.includes(
      "firstQuest"
    )
  ){

    achievements.push(
      "firstQuest"
    );

  }


  if(
    level >= 5
    &&
    !achievements.includes(
      "level5"
    )
  ){

    achievements.push(
      "level5"
    );

  }


  if(
    totalXP >= 200
    &&
    !achievements.includes(
      "tenQuests"
    )
  ){

    achievements.push(
      "tenQuests"
    );

  }


  localStorage.setItem(
    "achievements",
    JSON.stringify(achievements)
  );

}



function renderAchievements(){

  achievementsContainer.innerHTML =
    "";


  const achievementsList = [

    {
      id:"firstQuest",
      name:"Primeiro Passo",
      desc:"Complete 1 quest"
    },

    {
      id:"level5",
      name:"Disciplinado",
      desc:"Alcance nível 5"
    },

    {
      id:"tenQuests",
      name:"Persistente",
      desc:"Ganhe 200 XP"
    }

  ];


  achievementsList.forEach((achievement)=>{

    const div =
      document.createElement("div");

    div.classList.add(
      "achievement"
    );


    if(
      achievements.includes(
        achievement.id
      )
    ){

      div.classList.add(
        "unlocked"
      );

    }


    div.innerHTML = `

      <h3>${achievement.name}</h3>

      <p>${achievement.desc}</p>

    `;


    achievementsContainer.appendChild(
      div
    );

  });

}



// ANALYTICS

function renderAnalytics(){

  analytics.innerHTML = "";


  const entries =
    Object.entries(weeklyXP)
      .slice(-7);


  entries.forEach(([date,xp]) => {

    const bar =
      document.createElement("div");

    bar.classList.add("bar");


    bar.style.height =
      `${xp * 2}px`;


    bar.innerHTML = `

      <span>

        ${date.slice(0,5)}

      </span>

    `;


    analytics.appendChild(bar);

  });

}



// NAVEGAÇÃO

function hideAllSections(){

  dashboardSection.style.display =
    "none";

  questsSection.style.display =
    "none";

  skillsSection.style.display =
    "none";

  profileSection.style.display =
    "none";

  statsSection.style.display =
    "none";

}


dashboardButton.addEventListener("click",()=>{

  hideAllSections();

  dashboardSection.style.display =
    "block";

  statsSection.style.display =
    "block";

});


missionsButton.addEventListener("click",()=>{

  hideAllSections();

  questsSection.style.display =
    "block";

});


skillsButton.addEventListener("click",()=>{

  hideAllSections();

  skillsSection.style.display =
    "block";

});


profileButton.addEventListener("click",()=>{

  hideAllSections();

  profileSection.style.display =
    "block";

});



// TEST XP

testXP.addEventListener("click",()=>{

  xp += 100;

  totalXP += 100;

  if(xp >= 100){

    xp -= 100;

    level++;

    skillPoints++;

    showLevelPopup();

  }

  saveData();

  updateUI();

});



// RESET

resetButton.addEventListener("click",()=>{

  localStorage.clear();

  location.reload();

});



// TELA INICIAL

hideAllSections();

dashboardSection.style.display =
  "block";

statsSection.style.display =
  "block";


  function createParticles(){

  for(let i = 0; i < 40; i++){

    const particle =
      document.createElement("div");

    particle.classList.add(
      "particle"
    );


    particle.style.left =
      Math.random() * 100 + "%";


    particle.style.animationDuration =
      (Math.random() * 10 + 8) + "s";


    particle.style.animationDelay =
      Math.random() * 5 + "s";


    particle.style.opacity =
      Math.random();


    const size =
      Math.random() * 5 + 2;

    particle.style.width =
      size + "px";

    particle.style.height =
      size + "px";


    particles.appendChild(
      particle
    );

  }

}

createParticles();

// ===== MOUSE GLOW =====

const cards =
  document.querySelectorAll(
    ".card, .profile-card"
  );


cards.forEach((card)=>{

  const glow =
    document.createElement("div");

  glow.classList.add(
    "mouse-glow"
  );

  card.appendChild(glow);


  card.addEventListener(
    "mousemove",
    (e)=>{

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;


      glow.style.left =
        `${x}px`;

      glow.style.top =
        `${y}px`;

      glow.style.opacity =
        "1";

    }
  );


  card.addEventListener(
    "mouseleave",
    ()=>{

      glow.style.opacity =
        "0";

    }
  );

});

// ===== CLASS SYSTEM =====

classSelect.value =
  playerClass;


classSelect.addEventListener(

  "change",

  ()=>{

    playerClass =
      classSelect.value;


    localStorage.setItem(

      "playerClass",

      playerClass

    );

  }

);
