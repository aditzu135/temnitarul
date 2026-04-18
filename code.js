const STORAGE_KEY = 'dungeonCrawlerSave';
const USERS_KEY = 'dungeonCrawlerUsers';

const storyByFloor = {
  1: {
    title: 'Intrarea',
    text: 'Aerul este umed. Lumina torței pâlpâie pe pereții de piatră acoperiți de mușchi. Auzi ceva foșnind înainte — gheare mici pe piatra udă. Un goblin sare din umbre.'
  },
  2: {
    title: 'Cazarma',
    text: 'Rânduri de armuri ruginite stau ca soldați adormiți. Apoi una își întoarce orbitele goale spre tine. Oasele își amintesc cum să lupte.'
  },
  3: {
    title: 'Groapa',
    text: 'Un miros te lovește înainte să vezi. Jos, ceva masiv se mișcă. Podeaua se cutremură. Brutul Orc așteaptă.'
  },
  4: {
    title: 'Antecamera Tronului',
    text: 'Săpat în perete: fețele aventurierilor din trecut, înghețate în piatră. Un cavaler în armură neagră blochează ușa mare — încă stând, încă loial, mult după ce stăpânul său a căzut.'
  },
  5: {
    title: 'Camera Uitată',
    text: 'Ușa se deschide în tăcere. Pe un tron dărâmat stă o figură — înarmată, antică, nemișcată. Apoi vorbește: "Încă unul. Nu se opresc niciodată să-i trimită." Se ridică.'
  }
};

const floors = {
  1: { name: 'Goblin', hp: 15, atk: 4, def: 0, xp: 15, gold: 5, loot: { item: 'Poțiune de Sănătate', chance: 0.3 } },
  2: { name: 'Războinic Schelet', hp: 25, atk: 6, def: 1, xp: 25, gold: 10, loot: { item: 'Scut', chance: 0.2 } },
  3: { name: 'Brut Orc', hp: 40, atk: 9, def: 2, xp: 35, gold: 15, loot: { item: 'Sabie de Fier', chance: 0.2 } },
  4: { name: 'Cavaler Întunecat', hp: 55, atk: 12, def: 4, xp: 50, gold: 20, loot: { item: 'Zale', chance: 0.25 } },
  5: { name: 'Regele Uitării', hp: 90, atk: 16, def: 6, xp: 0, gold: 0, loot: null }
};

const shopInventory = {
  2: [
    { name: 'Sabie de Fier', type: 'Armă', effect: '+5 ATK', cost: 20 },
    { name: 'Scut', type: 'Armură', effect: '+3 DEF', cost: 15 },
    { name: 'Poțiune de Sănătate', type: 'Consumabil', effect: 'Restaurează 20 HP', cost: 10 }
  ],
  4: [
    { name: 'Zale', type: 'Armură', effect: '+4 DEF', cost: 25 },
    { name: 'Orb Magic', type: 'Special', effect: 'Cauzează 15 daune fixe', cost: 30 },
    { name: 'Poțiune de Sănătate', type: 'Consumabil', effect: 'Restaurează 20 HP', cost: 10 }
  ]
};

const itemData = {
  'Sabie Ruginită': { type: 'Armă', value: 2, effect: '+2 ATK' },
  'Sabie de Fier': { type: 'Armă', value: 5, effect: '+5 ATK' },
  'Poțiune de Sănătate': { type: 'Consumabil', effect: 'Restaurează 20 HP' },
  Scut: { type: 'Armură', value: 3, effect: '+3 DEF' },
  Zale: { type: 'Armură', value: 4, effect: '+4 DEF' },
  'Orb Magic': { type: 'Special', effect: 'Cauzează 15 daune fixe' }
};

const ui = {
  screenLogin: document.getElementById('screen-login'),
  screenStart: document.getElementById('screen-start'),
  screenStory: document.getElementById('screen-story'),
  screenEvent: document.getElementById('screen-event'),
  screenCombat: document.getElementById('screen-combat'),
  screenShop: document.getElementById('screen-shop'),
  screenEquip: document.getElementById('screen-equip'),
  screenLevelUp: document.getElementById('screen-level-up'),
  screenGameOver: document.getElementById('screen-game-over'),
  screenVictory: document.getElementById('screen-victory'),
  loginUsername: document.getElementById('login-username'),
  loginPassword: document.getElementById('login-password'),
  hubGreeting: document.getElementById('hub-greeting'),
  btnLogin: document.getElementById('btn-login'),
  btnSignup: document.getElementById('btn-signup'),
  btnJoinDungeon: document.getElementById('btn-join-dungeon'),
  btnHubRest: document.getElementById('btn-hub-rest'),
  btnHubShop: document.getElementById('btn-hub-shop'),
  btnLogout: document.getElementById('btn-logout'),
  btnStoryContinue: document.getElementById('btn-story-continue'),
  btnFight: document.getElementById('btn-fight'),
  btnShop: document.getElementById('btn-shop'),
  btnRest: document.getElementById('btn-rest'),
  btnEquip: document.getElementById('btn-equip'),
  btnQuit: document.getElementById('btn-quit'),
  btnEquipBack: document.getElementById('btn-equip-back'),
  btnShopBack: document.getElementById('btn-shop-back'),
  btnActionAttack: document.getElementById('btn-action-attack'),
  btnActionItem: document.getElementById('btn-action-item'),
  btnActionRun: document.getElementById('btn-action-run'),
  btnLevelUpContinue: document.getElementById('btn-level-up-continue'),
  btnPlayAgain: document.getElementById('btn-play-again'),
  btnVictoryAgain: document.getElementById('btn-victory-again'),
  storyTitle: document.getElementById('story-title'),
  storyText: document.getElementById('story-text'),
  displayFloor: document.getElementById('display-floor'),
  eventFloorText: document.getElementById('event-floor-text'),
  displayHp: document.getElementById('display-hp'),
  displayAttack: document.getElementById('display-attack'),
  displayDefense: document.getElementById('display-defense'),
  displayXp: document.getElementById('display-xp'),
  displayGold: document.getElementById('display-gold'),
  displayWeapon: document.getElementById('display-weapon'),
  displayArmor: document.getElementById('display-armor'),
  displayInventory: document.getElementById('display-inventory'),
  combatPlayerHp: document.getElementById('combat-player-hp'),
  combatPlayerAttack: document.getElementById('combat-player-attack'),
  combatPlayerDefense: document.getElementById('combat-player-defense'),
  combatMonsterName: document.getElementById('combat-monster-name'),
  combatMonsterHp: document.getElementById('combat-monster-hp'),
  combatMonsterAttack: document.getElementById('combat-monster-attack'),
  combatMonsterDefense: document.getElementById('combat-monster-defense'),
  combatLog: document.getElementById('combat-log'),
  shopItems: document.getElementById('shop-items'),
  equipItems: document.getElementById('equip-items'),
  levelUpText: document.getElementById('level-up-text'),
  gameOverText: document.getElementById('game-over-text'),
  victoryStats: document.getElementById('victory-stats')
};

let player = null;
let currentMonster = null;
let combatHistory = [];
let queuedLevelUp = null;
let currentUser = null;
let isHubShop = false;

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; 
  }
  return hash.toString();
}

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function login(username, password) {
  const users = getUsers();
  if (users[username] && users[username].password === hashPassword(password)) {
    currentUser = username;
    showHubScreen();
    return true;
  }
  return false;
}

function signup(username, password) {
  const users = getUsers();
  if (users[username]) return false;
  users[username] = { password: hashPassword(password) };
  saveUsers(users);
  currentUser = username;
  showHubScreen();
  return true;
}

function logout() {
  currentUser = null;
  player = null;
  showLoginScreen();
}

function getSavedGame() {
  if (!currentUser) return null;
  const raw = localStorage.getItem(`${STORAGE_KEY}_${currentUser}`);
  if (!raw) return null;
  try {
    const saved = JSON.parse(raw);
    if (saved && typeof saved === 'object') {
      return saved;
    }
  } catch (error) {
    console.warn('Failed to parse saved game', error);
  }
  return null;
}

function saveGame() {
  if (!player || !currentUser) return;
  const copy = { ...player };
  localStorage.setItem(`${STORAGE_KEY}_${currentUser}`, JSON.stringify(copy));
}

function clearSave() {
  if (!currentUser) return;
  localStorage.removeItem(`${STORAGE_KEY}_${currentUser}`);
}

function initPlayer(name) {
  return {
    playerName: name || 'Aventurier',
    hp: 30,
    maxHp: 30,
    attack: 5,
    defense: 1,
    level: 1,
    xp: 0,
    xpToNext: 30,
    gold: 0,
    floor: 1,
    inventory: ['Sabie Ruginită'],
    equippedWeapon: 'Sabie Ruginită',
    equippedArmor: null
  };
}

function changeScreen(activeId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));
  const active = document.getElementById(activeId);
  if (active) {
    active.classList.add('active');
  }
}

function showLoginScreen() {
  changeScreen('screen-login');
  ui.loginUsername.value = '';
  ui.loginPassword.value = '';
}

function showHubScreen() {
  changeScreen('screen-start');
  ui.hubGreeting.textContent = `Salut ${currentUser}, ce ai vrea să faci?`;
}

function joinDungeon() {
  const saved = getSavedGame();
  if (saved) {
    player = {
      ...initPlayer(saved.playerName || 'Aventurier'),
      ...saved
    };
    player.floor = 1; // Reset floor for farming
  } else {
    player = initPlayer('Aventurier');
  }
  saveGame();
  queuedLevelUp = null;
  showStoryScreen();
}

function hubRest() {
  if (!player) {
    alert('Nu ai un personaj salvat. Intră în temniță mai întâi.');
    return;
  }
  player.hp = player.maxHp;
  saveGame();
  alert('Te-ai odihnit și ai HP maxim.');
}

function hubShop() {
  isHubShop = true;
  showShopScreen();
}

function formatInventory() {
  if (!player.inventory.length) return 'Inventar: gol';
  const counts = player.inventory.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .map(([item, qty]) => `${item}${qty > 1 ? ` x${qty}` : ''}`)
    .join(', ');
}

function updatePlayerDisplay() {
  ui.displayFloor.textContent = player.floor;
  ui.eventFloorText.textContent = storyByFloor[player.floor]?.title || 'O nouă provocare te așteaptă.';
  ui.displayHp.textContent = `HP: ${player.hp} / ${player.maxHp}`;
  ui.displayAttack.textContent = `ATK: ${player.attack}`;
  ui.displayDefense.textContent = `DEF: ${player.defense}`;
  ui.displayXp.textContent = `XP: ${player.xp} / ${player.xpToNext}`;
  ui.displayGold.textContent = `Aur: ${player.gold}`;
  ui.displayWeapon.textContent = `Armă: ${player.equippedWeapon || 'Nimic'}`;
  ui.displayArmor.textContent = `Armură: ${player.equippedArmor || 'Nimic'}`;
  ui.displayInventory.textContent = formatInventory();
  ui.btnShop.style.display = [2, 4].includes(player.floor) ? 'inline-flex' : 'none';
  ui.btnRest.style.display = player.floor === 3 ? 'inline-flex' : 'none';
}

function updateCombatDisplay() {
  ui.combatPlayerHp.textContent = `HP: ${player.hp} / ${player.maxHp}`;
  ui.combatPlayerAttack.textContent = `ATK: ${player.attack}`;
  ui.combatPlayerDefense.textContent = `DEF: ${player.defense}`;
  ui.combatMonsterName.textContent = currentMonster.name;
  ui.combatMonsterHp.textContent = `HP: ${currentMonster.hp} / ${currentMonster.maxHp}`;
  ui.combatMonsterAttack.textContent = `ATK: ${currentMonster.atk}`;
  ui.combatMonsterDefense.textContent = `DEF: ${currentMonster.def}`;
  ui.combatLog.innerHTML = combatHistory.map(line => `<div>${line}</div>`).join('');
  ui.combatLog.scrollTop = ui.combatLog.scrollHeight;
}

function addCombatLog(message) {
  combatHistory.push(message);
  if (combatHistory.length > 25) combatHistory.shift();
}

function startNewGame() {
  const name = ui.playerName.value.trim() || 'Aventurier';
  player = initPlayer(name);
  saveGame();
  queuedLevelUp = null;
  showStoryScreen();
}

function loadGame() {
  const saved = getSavedGame();
  if (!saved) return;
  player = {
    ...initPlayer(saved.playerName || 'Aventurier'),
    ...saved
  };
  if (!player.inventory) player.inventory = ['Sabie Ruginită'];
  saveGame();
  showEventScreen();
}

function updateLoadButton() {
  ui.btnLoadGame.disabled = !getSavedGame();
}

function showStoryScreen() {
  changeScreen('screen-story');
  const floor = player.floor;
  const story = storyByFloor[floor] || { title: `Etaj ${floor}`, text: 'Călătoria ta continuă.' };
  ui.storyTitle.textContent = story.title;
  ui.storyText.textContent = story.text;
}

function showEventScreen() {
  changeScreen('screen-event');
  updatePlayerDisplay();
}

function showEquipScreen() {
  changeScreen('screen-equip');
  ui.equipItems.innerHTML = '';
  const equippable = player.inventory.filter(item => {
    const data = itemData[item];
    return data && (data.type === 'Armă' || data.type === 'Armură');
  });
  if (!equippable.length) {
    ui.equipItems.innerHTML = '<p class="hint">Nu ai obiecte echipabile.</p>';
    return;
  }
  equippable.forEach((item) => {
    const data = itemData[item];
    if (!data) return;
    const card = document.createElement('div');
    card.className = 'shop-card';
    card.innerHTML = `
      <h4>${item}</h4>
      <p>${data.effect}</p>
      <small>${data.type}</small>
    `;
    const button = document.createElement('button');
    button.textContent = 'Echipează';
    button.addEventListener('click', () => equipItem(item));
    card.appendChild(button);
    ui.equipItems.appendChild(card);
  });
}

function equipItem(itemName) {
  const data = itemData[itemName];
  if (!data) return;
  const index = player.inventory.indexOf(itemName);
  if (index === -1) return;
  player.inventory.splice(index, 1);
  if (data.type === 'Armă') {
    const oldWeapon = player.equippedWeapon;
    player.equippedWeapon = itemName;
    player.attack = 5 + (data.value || 0);
    if (oldWeapon && oldWeapon !== itemName && player.inventory.length < 5) {
      player.inventory.push(oldWeapon);
    }
  } else if (data.type === 'Armură') {
    const oldArmor = player.equippedArmor;
    player.equippedArmor = itemName;
    player.defense = 1 + (data.value || 0);
    if (oldArmor && oldArmor !== itemName && player.inventory.length < 5) {
      player.inventory.push(oldArmor);
    }
  }
  saveGame();
  showEquipScreen();
}

function showCombatScreen() {
  changeScreen('screen-combat');
  updateCombatDisplay();
}

function showShopScreen() {
  changeScreen('screen-shop');
  ui.shopItems.innerHTML = '';
  const items = isHubShop ? shopInventory[2] : shopInventory[player.floor] || [];
  if (!items.length) {
    ui.shopItems.innerHTML = '<p class="hint">Magazinul este gol.</p>';
    return;
  }
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'shop-card';
    card.innerHTML = `
      <h4>${item.name}</h4>
      <p>${item.effect}</p>
      <small>${item.type} • ${item.cost}a</small>
    `;
    const button = document.createElement('button');
    button.textContent = `Cumpără (${item.cost}a)`;
    button.disabled = player.gold < item.cost || player.inventory.length >= 5 && item.type !== 'Armă' && item.type !== 'Armură';
    button.addEventListener('click', () => buyItem(item));
    card.appendChild(button);
    ui.shopItems.appendChild(card);
  });
}

function buyItem(item) {
  if (player.gold < item.cost) return;
  if (player.inventory.length >= 5 && item.type === 'Consumabil') {
    alert('Inventarul este plin. Folosește sau aruncă un obiect înainte să cumperi mai multe.');
    return;
  }

  player.gold -= item.cost;
  if (item.type === 'Armă') {
    const oldWeapon = player.equippedWeapon;
    player.equippedWeapon = item.name;
    player.attack = 5 + (itemData[item.name]?.value || 0);
    if (oldWeapon && oldWeapon !== item.name && player.inventory.length < 5) {
      player.inventory.push(oldWeapon);
    }
  } else if (item.type === 'Armură') {
    const oldArmor = player.equippedArmor;
    player.equippedArmor = item.name;
    player.defense = 1 + (itemData[item.name]?.value || 0);
    if (oldArmor && oldArmor !== item.name && player.inventory.length < 5) {
      player.inventory.push(oldArmor);
    }
  } else {
    player.inventory.push(item.name);
  }

  saveGame();
  updatePlayerDisplay();
  showShopScreen();
}

function getCurrentMonsterTemplate() {
  const template = floors[player.floor];
  return template ? { ...template, hp: template.hp, maxHp: template.hp } : null;
}

function startCombat() {
  currentMonster = getCurrentMonsterTemplate();
  combatHistory = [];
  addCombatLog(`Apare un ${currentMonster.name}! (HP: ${currentMonster.hp} | ATK: ${currentMonster.atk})`);
  showCombatScreen();
}

function attackMonster() {
  const damage = Math.max(1, player.attack - currentMonster.def);
  currentMonster.hp -= damage;
  addCombatLog(`Ataci pentru ${damage} daune. ${currentMonster.name} are ${Math.max(0, currentMonster.hp)} HP.`);
  if (currentMonster.hp <= 0) {
    return completeCombat(true);
  }
  monsterAttack();
}

function useCombatItem() {
  const consumables = player.inventory.filter(item => item === 'Poțiune de Sănătate' || item === 'Orb Magic');
  if (!consumables.length) {
    addCombatLog('Nu ai obiecte utilizabile.');
    updateCombatDisplay();
    return;
  }

  let selected = consumables[0];
  if (consumables.length > 1) {
    const choice = window.prompt(`Alege un obiect de folosit:\n${consumables.map((item, index) => `${index + 1}. ${item}`).join('\n')}`);
    const index = Number(choice) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= consumables.length) {
      addCombatLog('Folosirea obiectului a fost anulată.');
      updateCombatDisplay();
      return;
    }
    selected = consumables[index];
  }

  handleItemUse(selected);
}

function handleItemUse(itemName) {
  const index = player.inventory.indexOf(itemName);
  if (index === -1) {
    addCombatLog('Nu ai acel obiect.');
    updateCombatDisplay();
    return;
  }

  player.inventory.splice(index, 1);
  if (itemName === 'Poțiune de Sănătate') {
    const heal = 20;
    const healed = Math.min(heal, player.maxHp - player.hp);
    player.hp += healed;
    addCombatLog(`Folosești o Poțiune de Sănătate și restaurezi ${healed} HP. Ai ${player.hp} HP.`);
  } else if (itemName === 'Orb Magic') {
    const damage = 15;
    currentMonster.hp -= damage;
    addCombatLog(`Arunci un Orb Magic și cauzezi ${damage} daune. ${currentMonster.name} are ${Math.max(0, currentMonster.hp)} HP.`);
  }

  if (currentMonster.hp <= 0) {
    return completeCombat(true);
  }
  monsterAttack();
}

function runFromCombat() {
  const success = Math.random() < 0.5;
  if (success) {
    addCombatLog('Scapi cu succes și te întorci la zona evenimentului.');
    saveGame();
    setTimeout(showEventScreen, 800);
    return;
  }
  addCombatLog('Scăparea eșuează! Inamicul atacă.');
  monsterAttack();
}

function monsterAttack() {
  const damage = Math.max(1, currentMonster.atk - player.defense);
  player.hp -= damage;
  addCombatLog(`${currentMonster.name} te lovește pentru ${damage} daune. Ai ${Math.max(0, player.hp)} HP.`);
  if (player.hp <= 0) {
    return completeCombat(false);
  }
  updateCombatDisplay();
}

function completeCombat(playerWon) {
  if (!playerWon) {
    ui.gameOverText.textContent = `Ai fost învins de ${currentMonster.name}. Aventura ta se termină aici.`;
    changeScreen('screen-game-over');
    return;
  }

  const floorTemplate = floors[player.floor];
  player.xp += floorTemplate.xp;
  player.gold += floorTemplate.gold;
  const rewards = [`+${floorTemplate.xp} XP`, `+${floorTemplate.gold} Aur`];

  if (floorTemplate.loot && Math.random() < floorTemplate.loot.chance) {
    const loot = floorTemplate.loot.item;
    if (player.inventory.length < 5) {
      player.inventory.push(loot);
      rewards.push(`Ai găsit pradă: ${loot}`);
    } else {
      rewards.push(`Ai găsit pradă dar inventarul este plin: ${loot}`);
    }
  }

  addCombatLog(`Învingi ${currentMonster.name}! ${rewards.join(' • ')}`);
  saveGame();

  if (player.floor === 5) {
    return showVictory();
  }

  if (handleLevelUp()) {
    queuedLevelUp = true;
    return;
  }

  player.floor += 1;
  saveGame();
  setTimeout(showStoryScreen, 900);
}

function handleLevelUp() {
  let leveled = false;
  let levelCount = 0;
  while (player.xp >= player.xpToNext) {
    player.xp -= player.xpToNext;
    player.level += 1;
    player.maxHp += 5;
    player.attack += 2;
    player.defense += 1;
    player.hp = player.maxHp;
    player.xpToNext += 30;
    levelCount += 1;
    leveled = true;
  }

  if (!leveled) return false;

  ui.levelUpText.textContent = `Ai avansat ${levelCount} nivel${levelCount > 1 ? 'e' : ''}! Ești acum nivel ${player.level}. HP maxim este acum ${player.maxHp}, ATK +2, DEF +1.`;
  saveGame();
  changeScreen('screen-level-up');
  return true;
}

function showVictory() {
  changeScreen('screen-victory');
  ui.victoryStats.innerHTML = `
    <p><strong>Nume:</strong> ${player.playerName}</p>
    <p><strong>Nivel:</strong> ${player.level}</p>
    <p><strong>Etaj atins:</strong> ${player.floor}</p>
    <p><strong>Aur:</strong> ${player.gold}</p>
    <p><strong>Armă:</strong> ${player.equippedWeapon || 'Nimic'}</p>
    <p><strong>Armură:</strong> ${player.equippedArmor || 'Nimic'}</p>
  `;
  // Don't clear save, keep stats for farming
}

function endGameReset() {
  player = null;
  queuedLevelUp = null;
  showHubScreen();
}

function quitGame() {
  saveGame();
  showHubScreen();
}

ui.btnLogin.addEventListener('click', () => {
  const username = ui.loginUsername.value.trim();
  const password = ui.loginPassword.value;
  if (!username || !password) return;
  if (login(username, password)) {
    // success
  } else {
    alert('Nume utilizator sau parolă greșită.');
  }
});

ui.btnSignup.addEventListener('click', () => {
  const username = ui.loginUsername.value.trim();
  const password = ui.loginPassword.value;
  if (!username || !password) return;
  if (signup(username, password)) {
    // success
  } else {
    alert('Nume utilizator deja existent.');
  }
});

ui.btnJoinDungeon.addEventListener('click', joinDungeon);
ui.btnHubRest.addEventListener('click', hubRest);
ui.btnHubShop.addEventListener('click', hubShop);
ui.btnLogout.addEventListener('click', logout);
ui.btnStoryContinue.addEventListener('click', showEventScreen);
ui.btnFight.addEventListener('click', startCombat);
ui.btnShop.addEventListener('click', showShopScreen);
ui.btnRest.addEventListener('click', () => {
  player.hp = Math.min(player.maxHp, player.hp + 10);
  addCombatLog('Te odihnești și restaurezi 10 HP.');
  saveGame();
  updatePlayerDisplay();
  showEventScreen();
});
ui.btnEquip.addEventListener('click', showEquipScreen);
ui.btnQuit.addEventListener('click', quitGame);
ui.btnEquipBack.addEventListener('click', showEventScreen);
ui.btnShopBack.addEventListener('click', () => {
  if (isHubShop) {
    isHubShop = false;
    showHubScreen();
  } else {
    showEventScreen();
  }
});
ui.btnActionAttack.addEventListener('click', attackMonster);
ui.btnActionItem.addEventListener('click', useCombatItem);
ui.btnActionRun.addEventListener('click', runFromCombat);
ui.btnLevelUpContinue.addEventListener('click', () => {
  player.floor += 1;
  saveGame();
  showStoryScreen();
});
ui.btnPlayAgain.addEventListener('click', endGameReset);
ui.btnVictoryAgain.addEventListener('click', endGameReset);

window.addEventListener('load', () => {
  showLoginScreen();
});
