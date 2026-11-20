/*
 * JUNGLE OF TENSES — THE LOST EXPEDITION
 * Original two-player English grammar board game.
 * Vanilla JavaScript; no backend, accounts, or external libraries required.
 */
'use strict';

const QUESTION_BANK = [
  // WILL: decisions made right now, offers, promises, predictions based on opinion.
  { s: "The phone is ringing. I ___ answer it!", a: 'will', fill: 'will', why: 'The speaker decides at the moment of speaking. For spontaneous decisions, use WILL.' },
  { s: "You dropped your books! Don't worry, I ___ help you pick them up.", a: 'will', fill: 'will', why: 'Offering help right now is a spontaneous offer. Use WILL.' },
  { s: "I promise I ___ call you after school.", a: 'will', fill: 'will', why: 'WILL is commonly used for promises and commitments.' },
  { s: "I think humans ___ live on Mars one day.", a: 'will', fill: 'will', why: '“I think” expresses an opinion about the future, not visible evidence. Use WILL.' },
  { s: "I'm sure you ___ love this movie.", a: 'will', fill: 'will', why: 'This is the speaker’s belief about the future. WILL fits opinion-based predictions.' },
  { s: "We ___ never give up. I promise!", a: 'will', fill: 'will', why: 'The sentence is a promise. Use WILL to make promises.' },
  { s: "Would you like some water? I ___ get you a glass.", a: 'will', fill: 'will', why: 'The speaker makes an offer at the moment of speaking. Use WILL.' },
  { s: "I bet our team ___ win tomorrow.", a: 'will', fill: 'will', why: '“I bet” is a personal prediction without clear present evidence. Use WILL.' },
  { s: "Maybe people ___ travel to other galaxies in the future.", a: 'will', fill: 'will', why: 'This is speculation about the distant future. Use WILL for predictions based on belief.' },
  { s: "I swear I ___ keep your secret.", a: 'will', fill: 'will', why: '“I swear” signals a promise. WILL expresses promises clearly.' },
  { s: "Someone is knocking! I ___ see who it is.", a: 'will', fill: 'will', why: 'The speaker decides what to do right now. Use WILL.' },
  { s: "I believe she ___ become a great artist.", a: 'will', fill: 'will', why: '“I believe” introduces a personal opinion about the future. Use WILL.' },
  { s: "This suitcase is heavy. Here, I ___ carry it for you.", a: 'will', fill: 'will', why: 'An offer made immediately uses WILL.' },
  { s: "Oops! I forgot my pencil. I ___ ask the teacher for one.", a: 'will', fill: 'will', why: 'The speaker decides what to do now. This is a spontaneous decision: WILL.' },
  { s: "I think this expedition ___ be unforgettable.", a: 'will', fill: 'will', why: '“I think” signals a personal prediction. Use WILL.' },
  { s: "Don't be scared. I ___ stay with you.", a: 'will', fill: 'will', why: 'The speaker promises to stay with someone. Use WILL.' },
  { s: "I'm sure we ___ finish the game before lunch.", a: 'will', fill: 'will', why: 'This is an opinion-based prediction, so WILL is the most natural choice.' },
  { s: "Perhaps our class ___ go on a trip next year.", a: 'will', fill: 'will', why: '“Perhaps” suggests speculation rather than an existing plan. Use WILL.' },
  { s: "I promise I ___ practice English every day.", a: 'will', fill: 'will', why: 'Promises are a key use of WILL.' },
  { s: "It's getting late. Okay, I ___ take a taxi!", a: 'will', fill: 'will', why: '“Okay” shows a decision being made right now. Use WILL.' },
  { s: "I hope everyone ___ enjoy the presentation.", a: 'will', fill: 'will', why: 'This sentence expresses a hope about the future. WILL works naturally.' },
  { s: "The door is open. I ___ close it for you.", a: 'will', fill: 'will', why: 'This is an offer at the moment of speaking. Use WILL.' },
  // GOING TO: previously decided plans / intentions; predictions with observable evidence.
  { s: "Look at those dark clouds! It ___ rain.", a: 'going', fill: 'is going to', why: 'Dark clouds are visible evidence right now. Use BE GOING TO for evidence-based predictions.' },
  { s: "I bought paint yesterday. I ___ repaint my bedroom this weekend.", a: 'going', fill: 'am going to', why: 'Buying paint shows the decision was made before speaking. Use BE GOING TO for a plan.' },
  { s: "Watch out! That glass ___ fall off the table!", a: 'going', fill: 'is going to', why: 'You can see the glass about to fall. Visible evidence calls for BE GOING TO.' },
  { s: "She already signed up for lessons. She ___ learn French.", a: 'going', fill: 'is going to', why: 'Signing up for lessons shows an existing intention. Use BE GOING TO.' },
  { s: "We packed our backpacks and checked the map. We ___ explore the forest tomorrow.", a: 'going', fill: 'are going to', why: 'The preparations show this was planned in advance. Use BE GOING TO.' },
  { s: "The bus is pulling away and he is still far away. He ___ miss it!", a: 'going', fill: 'is going to', why: 'The situation provides clear evidence of what is about to happen. Use BE GOING TO.' },
  { s: "They saved money for months. They ___ buy new bicycles.", a: 'going', fill: 'are going to', why: 'Saving for months indicates an earlier plan. Use BE GOING TO.' },
  { s: "I've already chosen my course. I ___ study computer science.", a: 'going', fill: 'am going to', why: 'The speaker made the decision earlier. Use BE GOING TO for intentions.' },
  { s: "The baby is yawning and rubbing her eyes. She ___ fall asleep.", a: 'going', fill: 'is going to', why: 'Yawning and rubbing her eyes are observable evidence. Use BE GOING TO.' },
  { s: "We planned a picnic and packed our food. We ___ eat in the park.", a: 'going', fill: 'are going to', why: 'The picnic is already planned. Use BE GOING TO.' },
  { s: "She has trained for months and registered for the race. She ___ run a marathon.", a: 'going', fill: 'is going to', why: 'The registration and training show a plan formed beforehand. Use BE GOING TO.' },
  { s: "Look! That old tree is leaning dangerously. It ___ fall!", a: 'going', fill: 'is going to', why: 'The leaning tree provides visual evidence. Use BE GOING TO.' },
  { s: "He packed his suitcase and bought a plane ticket. He ___ travel tomorrow.", a: 'going', fill: 'is going to', why: 'The ticket and suitcase reveal a plan already in place. Use BE GOING TO.' },
  { s: "I decided last week: I ___ start a new routine on Monday.", a: 'going', fill: 'am going to', why: 'The decision was made last week, before this conversation. Use BE GOING TO.' },
  { s: "The score is 5–0 with two seconds left. Our team ___ win!", a: 'going', fill: 'is going to', why: 'The scoreboard is strong present evidence of the result. Use BE GOING TO.' },
  { s: "We booked a table for 7 p.m. We ___ have dinner together.", a: 'going', fill: 'are going to', why: 'Booking the table indicates a plan. Use BE GOING TO.' },
  { s: "Look at that cyclist speeding toward the puddle. He ___ get soaked!", a: 'going', fill: 'is going to', why: 'The current situation is evidence for the prediction. Use BE GOING TO.' },
  { s: "I've made a study schedule. I ___ review English tonight.", a: 'going', fill: 'am going to', why: 'The schedule shows an intention formed before speaking. Use BE GOING TO.' },
  { s: "Those waves are enormous! The small boat ___ tip over!", a: 'going', fill: 'is going to', why: 'The waves are visible evidence of what might happen. Use BE GOING TO.' },
  { s: "She bought seeds and pots yesterday. She ___ start a garden.", a: 'going', fill: 'is going to', why: 'Buying supplies reveals a pre-existing intention. Use BE GOING TO.' },
  { s: "They chose a route and prepared hiking boots. They ___ hike on Saturday.", a: 'going', fill: 'are going to', why: 'The route and boots show a decision made before speaking. Use BE GOING TO.' },
  { s: "That vase is wobbling on the edge! It ___ fall!", a: 'going', fill: 'is going to', why: 'The vase is visibly unstable. This is an evidence-based prediction: BE GOING TO.' }
];

const SPECIAL_SPACES = {
  4: { kind: 'boost', delta: 2, label: 'TOTEM', title: 'Golden Totem', text: 'The ancient totem protects you. Advance 2 extra spaces!' },
  8: { kind: 'trap', delta: -2, label: 'VINES', title: 'Tangled Vines', text: 'The jungle grabs your boots. Go back 2 spaces!' },
  11: { kind: 'boost', delta: 3, label: 'BRIDGE', title: 'Hidden Bridge', text: 'You found a hidden shortcut. Advance 3 extra spaces!' },
  15: { kind: 'trap', delta: -2, label: 'STORM', title: 'Tropical Storm', text: 'A storm blocks your way. Go back 2 spaces!' },
  19: { kind: 'boost', delta: 2, label: 'RELIC', title: 'Ancient Relic', text: 'The relic reveals a safer trail. Advance 2 extra spaces!' },
  23: { kind: 'trap', delta: -3, label: 'QUICKSAND', title: 'Quicksand', text: 'You step into quicksand. Go back 3 spaces!' },
  27: { kind: 'boost', delta: 3, label: 'CANOPY', title: 'Canopy Walkway', text: 'A passage through the treetops! Advance 3 spaces!' },
  31: { kind: 'trap', delta: -2, label: 'VIPERS', title: "Viper's Nest", text: 'You spotted a nest of vipers! Go back 2 spaces!' },
  34: { kind: 'boost', delta: 2, label: 'PATH', title: 'Temple Passage', text: 'A golden passage leads forward. Advance 2 spaces!' }
};

const $ = id => document.getElementById(id);
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const state = {
  phase: 'setup', players: [{ name: 'Explorer 1', pos: 0 }, { name: 'Explorer 2', pos: 0 }],
  turn: 0, goal: 18, roll: 1, question: null, correctLast: false,
  asked: 0, correct: 0, deck: [], sound: false, toastTimer: null
};

const board = $('board');
const pipDie = $('die');
let audioContext = null;

function playTone(frequency = 440, duration = .12, type = 'sine', volume = .035, delayTime = 0) {
  if (!state.sound) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioContext ||= new AC();
    if (audioContext.state === 'suspended') audioContext.resume();
    const osc = audioContext.createOscillator();
    const amp = audioContext.createGain();
    osc.type = type; osc.frequency.value = frequency;
    const start = audioContext.currentTime + delayTime;
    amp.gain.setValueAtTime(.001, start);
    amp.gain.exponentialRampToValueAtTime(volume, start + .018);
    amp.gain.exponentialRampToValueAtTime(.001, start + duration);
    osc.connect(amp); amp.connect(audioContext.destination);
    osc.start(start); osc.stop(start + duration + .02);
  } catch { /* Sound is optional; never block the game. */ }
}
function soundEffect(name) {
  if (name === 'roll') { playTone(180, .08, 'triangle'); playTone(240, .07, 'triangle', .03, .09); }
  if (name === 'correct') { playTone(392, .19, 'sine', .035); playTone(523, .2, 'sine', .035, .12); playTone(659, .34, 'sine', .025, .25); }
  if (name === 'wrong') { playTone(240, .15, 'triangle', .026); playTone(185, .3, 'triangle', .022, .14); }
  if (name === 'move') playTone(330, .085, 'sine', .013);
  if (name === 'win') [330, 392, 494, 659, 784].forEach((f, i) => playTone(f, .35, 'sine', .03, i * .13));
}
function setDie(value) { pipDie.dataset.value = String(value); pipDie.setAttribute('aria-label', `Dice showing ${value}`); }
function shuffle(input) {
  const list = [...input];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}
function nextQuestion() {
  if (state.deck.length === 0) state.deck = shuffle(QUESTION_BANK);
  return state.deck.pop();
}
function newToken(playerIndex) {
  const token = document.createElement('span');
  token.className = `token token--${playerIndex ? 'two' : 'one'}`;
  token.textContent = String(playerIndex + 1);
  token.setAttribute('title', state.players[playerIndex].name);
  return token;
}
function drawBoard() {
  board.innerHTML = '';
  for (let number = 1; number <= 36; number++) {
    const rowFromBottom = Math.floor((number - 1) / 6);
    const positionInRow = (number - 1) % 6;
    const column = rowFromBottom % 2 === 0 ? positionInRow : 5 - positionInRow;
    const tile = document.createElement('div');
    tile.className = 'tile' + (number % 3 === 0 ? ' tile--alt' : '');
    tile.style.gridRow = String(6 - rowFromBottom);
    tile.style.gridColumn = String(column + 1);
    tile.dataset.space = String(number);
    tile.setAttribute('aria-label', `Space ${number}`);
    const special = SPECIAL_SPACES[number];
    let label = '', emblem = '✧';
    if (number === state.goal) { tile.classList.add('tile--final'); label = state.goal === 18 ? 'SHRINE' : 'TEMPLE'; emblem = '◆'; }
    else if (number === 18) { tile.classList.add('tile--checkpoint'); label = 'SHRINE'; emblem = '✺'; }
    else if (special) { tile.classList.add(special.kind === 'boost' ? 'tile--boost' : 'tile--trap'); label = special.label; emblem = special.kind === 'boost' ? '✦' : '⚠'; }
    else if (number === 1) { tile.classList.add('tile--start'); label = 'ENTRY'; emblem = '⌁'; }
    else if (number % 5 === 0) { label = 'TRAIL'; emblem = '❧'; }
    if (number > state.goal) tile.classList.add('tile--locked');
    const numberSpan = document.createElement('span'); numberSpan.className = 'tile-number'; numberSpan.textContent = String(number).padStart(2, '0');
    const emblemSpan = document.createElement('span'); emblemSpan.className = 'tile-emblem'; emblemSpan.textContent = emblem;
    const labelSpan = document.createElement('span'); labelSpan.className = 'tile-label'; labelSpan.textContent = label || '·';
    const tokens = document.createElement('span'); tokens.className = 'tile-tokens';
    tile.append(numberSpan, emblemSpan, labelSpan, tokens);
    board.appendChild(tile);
  }
  drawPlayers();
}
function drawPlayers() {
  const tokensBySpace = new Map();
  for (const [idx, player] of state.players.entries()) {
    if (!tokensBySpace.has(player.pos)) tokensBySpace.set(player.pos, []);
    tokensBySpace.get(player.pos).push(idx);
  }
  document.querySelectorAll('.tile-tokens').forEach(cell => cell.replaceChildren());
  const base = $('baseTokens'); base.replaceChildren();
  for (const [space, indices] of tokensBySpace) {
    const parent = space === 0 ? base : board.querySelector(`.tile[data-space="${space}"] .tile-tokens`);
    if (!parent) continue;
    indices.forEach(idx => parent.appendChild(newToken(idx)));
  }
}
function updateUI() {
  state.players.forEach((player, i) => {
    $(`p${i + 1}Name`).textContent = player.name;
    $(`p${i + 1}Pos`).textContent = String(player.pos).padStart(2, '0');
    $(`p${i + 1}Pos`).nextElementSibling.textContent = `/ ${state.goal}`;
    $(`p${i + 1}State`).textContent = player.pos === 0 ? 'AT BASE CAMP' : player.pos >= state.goal ? 'REACHED THE TEMPLE' : `SPACE ${String(player.pos).padStart(2, '0')}`;
    const card = document.querySelector(`.player-card--${i ? 'two' : 'one'}`);
    card.classList.toggle('player-card--active', state.turn === i && state.phase !== 'setup' && state.phase !== 'ended');
  });
  $('rollBtn').disabled = state.phase !== 'ready';
  $('boardStatus').textContent = state.phase === 'setup' ? 'AWAITING EXPLORERS' : state.phase === 'ended' ? 'EXPEDITION COMPLETE' : `${state.goal} SPACES · ${state.goal === 18 ? 'SHORT QUEST' : 'FULL ADVENTURE'}`;
  $('turnText').textContent = state.phase === 'setup' ? 'Gather your team to begin' : state.phase === 'ended' ? 'A legend has returned from the jungle' : state.phase === 'moving' ? 'Traversing the ancient path...' : `${state.players[state.turn].name}'s turn — ${state.phase === 'ready' ? 'roll the die!' : 'answer the challenge!'}`;
  $('accuracyCount').textContent = `${state.correct} / ${state.asked}`;
  drawPlayers();
}
function toggleOverlay(id, visible) {
  const overlay = $(id);
  overlay.classList.toggle('overlay--hidden', !visible);
  overlay.setAttribute('aria-hidden', String(!visible));
  if (visible) {
    const focused = overlay.querySelector('button:not(:disabled),input');
    if (focused) setTimeout(() => focused.focus({preventScroll:true}), 70);
  }
}
function startGame() {
  const n1 = $('name1').value.trim() || 'Explorer 1';
  const n2 = $('name2').value.trim() || 'Explorer 2';
  state.players = [{ name: n1, pos: 0 }, { name: n2, pos: 0 }];
  state.goal = document.querySelector('input[name="mode"]:checked').value === 'full' ? 36 : 18;
  state.turn = 0; state.roll = 1; state.asked = 0; state.correct = 0;
  state.phase = 'ready'; state.deck = shuffle(QUESTION_BANK);
  setDie(1); $('diceCallout').textContent = '?'; $('diceStatus').textContent = 'The path is waiting.';
  $('rollHint').textContent = 'Answer the jungle’s questions to earn your next move.';
  $('diceStatus').textContent = 'The path is waiting.';
  toggleOverlay('setupOverlay', false);
  drawBoard(); updateUI();
  showToast(`The expedition begins! ${n1}, the first roll is yours.`, 2800);
}
let rollAnimationToken = 0;
async function rollDice() {
  if (state.phase !== 'ready') return;
  state.phase = 'rolling'; updateUI();
  const token = ++rollAnimationToken;
  $('diceStatus').textContent = 'Fate is in motion...';
  pipDie.classList.add('rolling');
  soundEffect('roll');
  const result = Math.floor(Math.random() * 6) + 1;
  for (let i = 0; i < 10; i++) {
    if (token !== rollAnimationToken) return;
    setDie(Math.floor(Math.random() * 6) + 1);
    await delay(67 + i * 5);
  }
  pipDie.classList.remove('rolling');
  setDie(result);
  state.roll = result;
  $('diceCallout').textContent = String(result).padStart(2, '0');
  $('diceStatus').textContent = `${result} possible step${result === 1 ? '' : 's'}.`;
  state.phase = 'question'; state.question = nextQuestion();
  updateUI();
  openQuestion();
}
function setSentence(text) {
  const element = $('questionText'); element.replaceChildren();
  const pieces = text.split('___');
  for (let i = 0; i < pieces.length; i++) {
    element.appendChild(document.createTextNode(pieces[i]));
    if (i < pieces.length - 1) {
      const blank = document.createElement('span'); blank.className = 'blank'; blank.textContent = '________';
      element.appendChild(blank);
    }
  }
}
function openQuestion() {
  const { question: q, asked, players, turn } = state;
  setSentence(q.s);
  $('challengeCounter').textContent = `CHALLENGE ${String(asked + 1).padStart(2, '0')}`;
  $('challengeHeading').textContent = `${players[turn].name}, choose your destiny.`;
  $('feedback').hidden = true;
  $('choiceGrid').classList.remove('answered');
  document.querySelectorAll('[data-choice]').forEach(button => {
    button.disabled = false;
    button.classList.remove('correct', 'wrong');
  });
  $('challengeFootnote').hidden = false;
  toggleOverlay('questionOverlay', true);
}
function answerQuestion(choice) {
  if (state.phase !== 'question' || !['will', 'going'].includes(choice)) return;
  state.phase = 'feedback';
  const q = state.question;
  const correct = choice === q.a;
  state.correctLast = correct;
  state.asked++;
  if (correct) state.correct++;
  soundEffect(correct ? 'correct' : 'wrong');
  document.querySelectorAll('[data-choice]').forEach(button => {
    button.disabled = true;
    if (button.dataset.choice === q.a) button.classList.add('correct');
    else if (button.dataset.choice === choice) button.classList.add('wrong');
  });
  $('choiceGrid').classList.add('answered');
  $('feedback').hidden = false;
  $('feedbackSymbol').textContent = correct ? '✦' : '✕';
  $('feedbackSymbol').style.color = correct ? '#e7c880' : '#e18e72';
  $('feedbackTitle').textContent = correct ? 'The jungle approves.' : 'The jungle has a lesson.';
  const completeSentence = q.s.replace('___', q.fill);
  $('feedbackExplanation').textContent = `“${completeSentence}” — ${q.why}`;
  $('feedbackResult').textContent = correct ? `CORRECT! YOU WILL ADVANCE ${state.roll} SPACE${state.roll === 1 ? '' : 'S'}.` : `THE CORRECT ANSWER IS ${q.a === 'will' ? 'WILL' : 'BE GOING TO'}. YOU STAY ON YOUR SPACE.`;
  $('challengeFootnote').hidden = true;
  updateUI();
}
async function continueExpedition() {
  if (state.phase !== 'feedback') return;
  const move = state.correctLast;
  state.phase = 'moving';
  toggleOverlay('questionOverlay', false);
  updateUI();
  if (move) {
    await movePlayer(Math.min(state.goal, state.players[state.turn].pos + state.roll));
    if (checkVictory()) return;
    const landed = state.players[state.turn].pos;
    const special = SPECIAL_SPACES[landed];
    if (special) {
      showToast(`${special.kind === 'boost' ? '✦' : '⚠'} ${special.title}: ${special.text}`, 2300);
      if (special.kind === 'boost') soundEffect('correct');
      else soundEffect('wrong');
      await delay(1600);
      await movePlayer(Math.max(0, Math.min(state.goal, landed + special.delta)));
      if (checkVictory()) return;
    }
  } else {
    showToast('Not every path is easy. Learn the rule and try again next turn!', 1700);
    await delay(450);
  }
  state.turn = 1 - state.turn;
  state.phase = 'ready';
  $('rollHint').textContent = `${state.players[state.turn].name}, your future is in your hands.`;
  updateUI();
}
async function movePlayer(destination) {
  const player = state.players[state.turn];
  const step = player.pos <= destination ? 1 : -1;
  while (player.pos !== destination) {
    player.pos += step;
    soundEffect('move');
    updateUI();
    const newTile = board.querySelector(`.tile[data-space="${player.pos}"]`);
    if (newTile) {
      newTile.classList.add('tile--active');
      await delay(158);
      newTile.classList.remove('tile--active');
    } else await delay(135);
  }
}
function checkVictory() {
  if (state.players[state.turn].pos < state.goal) return false;
  state.phase = 'ended';
  soundEffect('win');
  const winner = state.players[state.turn].name;
  $('winnerText').textContent = `${winner} conquered the jungle and mastered the future!`;
  $('resultQuestions').textContent = String(state.asked).padStart(2, '0');
  $('resultCorrect').textContent = String(state.correct).padStart(2, '0');
  $('resultAccuracy').textContent = `${Math.round(100 * state.correct / Math.max(1, state.asked))}%`;
  updateUI();
  toggleOverlay('victoryOverlay', true);
  return true;
}
function showToast(message, duration = 2400) {
  clearTimeout(state.toastTimer);
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  state.toastTimer = setTimeout(() => toast.classList.remove('visible'), duration);
}
function resetToSetup() {
  ++rollAnimationToken;
  state.phase = 'setup'; state.turn = 0; state.goal = 18;
  state.players.forEach(player => player.pos = 0);
  state.asked = state.correct = 0;
  document.querySelector('input[name="mode"][value="quick"]').checked = true;
  $('name1').value = state.players[0].name;
  $('name2').value = state.players[1].name;
  toggleOverlay('victoryOverlay', false);
  drawBoard(); updateUI();
  toggleOverlay('setupOverlay', true);
}
function showInfo(id) {
  if (!$('questionOverlay').classList.contains('overlay--hidden')) return;
  toggleOverlay(id, true);
}

$('startBtn').addEventListener('click', startGame);
$('rollBtn').addEventListener('click', rollDice);
$('againBtn').addEventListener('click', resetToSetup);
$('guideBtn').addEventListener('click', () => showInfo('guideOverlay'));
$('examplesBtn').addEventListener('click', () => showInfo('guideOverlay'));
$('rulesBtn').addEventListener('click', () => showInfo('rulesOverlay'));
$('soundBtn').addEventListener('click', () => {
  state.sound = !state.sound;
  $('soundBtn').setAttribute('aria-label', `Sound ${state.sound ? 'on' : 'off'}`);
  $('soundCross').classList.toggle('visible', !state.sound);
  if (state.sound) soundEffect('move');
});
$('soundCross').classList.add('visible');
$('choiceGrid').addEventListener('click', event => {
  const button = event.target.closest('[data-choice]');
  if (button) answerQuestion(button.dataset.choice);
});
$('continueBtn').addEventListener('click', continueExpedition);
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => toggleOverlay(button.dataset.close, false)));
for (const id of ['guideOverlay', 'rulesOverlay']) {
  $(id).addEventListener('click', event => { if (event.target === $(id)) toggleOverlay(id, false); });
}
for (const id of ['name1','name2']) {
  $(id).addEventListener('keydown', e => { if (e.key === 'Enter') startGame(); });
}
document.addEventListener('keydown', event => {
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (event.key === 'Escape') {
    for (const id of ['guideOverlay','rulesOverlay']) {
      if (!$(id).classList.contains('overlay--hidden')) toggleOverlay(id, false);
    }
    return;
  }
  if (!$('guideOverlay').classList.contains('overlay--hidden') || !$('rulesOverlay').classList.contains('overlay--hidden') || !$('setupOverlay').classList.contains('overlay--hidden')) return;
  if ((event.code === 'Space' || event.key === ' ') && state.phase === 'ready') { event.preventDefault(); rollDice(); }
  if (state.phase === 'question' && event.key.toLowerCase() === 'a') answerQuestion('will');
  if (state.phase === 'question' && event.key.toLowerCase() === 'b') answerQuestion('going');
  if (state.phase === 'feedback' && event.key === 'Enter') continueExpedition();
});

// Paint the board before the first player enters.
setDie(1);
drawBoard();
updateUI();
