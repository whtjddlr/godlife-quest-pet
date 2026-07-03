if (window.location.protocol === "file:") {
  window.location.replace("http://localhost:5173/");
}

const sprites = {
  tori: {
    body: "#fff1df",
    shade: "#f2b589",
    ear: "#ffbfd0",
    blush: "#ff9fba",
    accent: "#ffcf70",
    kind: "bunny",
  },
  momo: {
    body: "#bfe7ff",
    shade: "#82bee8",
    ear: "#d7f2ff",
    blush: "#ffacc4",
    accent: "#ffe27a",
    kind: "elephant",
  },
  bami: {
    body: "#d9aa74",
    shade: "#a97445",
    ear: "#f1c995",
    blush: "#ffb3a5",
    accent: "#7b4f2c",
    kind: "bear",
  },
  maru: {
    body: "#ffe1a6",
    shade: "#f4b96f",
    ear: "#ffd8b5",
    blush: "#ff9fba",
    accent: "#ffd86b",
    kind: "ham",
  },
  ruru: {
    body: "#ffc2a2",
    shade: "#ef8e68",
    ear: "#ffe4cf",
    blush: "#ff98ae",
    accent: "#fff1d6",
    kind: "fox",
  },
  poyo: {
    body: "#fff1a8",
    shade: "#f2c75f",
    ear: "#fff8d3",
    blush: "#ffa6b9",
    accent: "#ffb95f",
    kind: "chick",
  },
  nabi: {
    body: "#d9a66e",
    shade: "#9d663c",
    ear: "#f4c58d",
    blush: "#ffb0a5",
    accent: "#fff0cf",
    kind: "squirrel",
  },
  dami: {
    body: "#bff3c8",
    shade: "#76cf93",
    ear: "#fff0a9",
    blush: "#ff9fba",
    accent: "#9be8c1",
    kind: "lizard",
  },
  somi: {
    body: "#fffdf7",
    shade: "#3f4a5e",
    ear: "#f4f0e8",
    blush: "#ff9fb3",
    accent: "#a9e7bd",
    kind: "panda",
  },
  kobi: {
    body: "#c8d2cc",
    shade: "#889891",
    ear: "#e7ece6",
    blush: "#ffadb8",
    accent: "#9bd7aa",
    kind: "koala",
  },
  leo: {
    body: "#ffd18a",
    shade: "#cf7d3c",
    ear: "#ffe3ac",
    blush: "#ffaaa0",
    accent: "#f29b4a",
    kind: "lion",
  },
  hoya: {
    body: "#ffbf72",
    shade: "#2f4057",
    ear: "#ffe2a7",
    blush: "#ff9f9f",
    accent: "#fff0cf",
    kind: "tiger",
  },
  ari: {
    body: "#7c5c45",
    shade: "#4b382f",
    ear: "#fff7df",
    blush: "#ffb29e",
    accent: "#ffd25f",
    kind: "eagle",
  },
  moki: {
    body: "#be8a62",
    shade: "#7a5038",
    ear: "#f1c394",
    blush: "#ffad9c",
    accent: "#ffd974",
    kind: "monkey",
  },
  boots: {
    body: "#f6b16e",
    shade: "#aa653b",
    ear: "#ffe2c0",
    blush: "#ff9fb0",
    accent: "#c85c4a",
    kind: "bootscat",
  },
  lumi: {
    body: "#fff6cf",
    shade: "#f4d783",
    ear: "#fffaf0",
    blush: "#ffb7c8",
    accent: "#8fd7bf",
    kind: "bapsae",
  },
  loki: {
    body: "#d96f45",
    shade: "#8d3d2c",
    ear: "#fff0d8",
    blush: "#ffad9e",
    accent: "#fff6df",
    kind: "redpanda",
  },
  miru: {
    body: "#fffdf7",
    shade: "#eef2f2",
    ear: "#ffe0ea",
    blush: "#ffb7c8",
    accent: "#ffb763",
    kind: "snowbunny",
  },
  melly: {
    body: "#ffc1d6",
    shade: "#ff8fbd",
    ear: "#ffd9e7",
    blush: "#ff9fc2",
    accent: "#ff6fa8",
    kind: "hoodbunny",
  },
  pomi: {
    body: "#fffaf0",
    shade: "#eadfcf",
    ear: "#ffe8d6",
    blush: "#ffb0bd",
    accent: "#ffd86b",
    kind: "pomeranian",
  },
  chacha: {
    body: "#d8b28b",
    shade: "#695545",
    ear: "#f2dbc4",
    blush: "#c48782",
    accent: "#fff1d6",
    kind: "tibetanfox",
  },
  soli: {
    body: "#c89062",
    shade: "#7a523b",
    ear: "#f3c89b",
    blush: "#ffb7a7",
    accent: "#fff1d6",
    kind: "quokka",
  },
  pepe: {
    body: "#b9825b",
    shade: "#72513c",
    ear: "#d8a47a",
    blush: "#ffa9a0",
    accent: "#f4d19a",
    kind: "capybara",
  },
  nunu: {
    body: "#ffd2df",
    shade: "#f596b4",
    ear: "#ffe9ef",
    blush: "#ff8faf",
    accent: "#9ed7ff",
    kind: "axolotl",
  },
  toto: {
    body: "#c9bba8",
    shade: "#6c6258",
    ear: "#efe3d3",
    blush: "#f0a1a7",
    accent: "#e6d2b6",
    kind: "pallas",
  },
};

const starterCharacters = [
  { id: "tori", name: "토리", species: "말랑 토끼", rarity: "NORMAL", rarityLabel: "노말" },
  { id: "momo", name: "코코", species: "솜귀 코끼리", rarity: "NORMAL", rarityLabel: "노말" },
  { id: "bami", name: "바미", species: "몽실 곰돌이", rarity: "NORMAL", rarityLabel: "노말" },
  { id: "maru", name: "마루", species: "볼빵 햄찌", rarity: "NORMAL", rarityLabel: "노말" },
  { id: "poyo", name: "포요", species: "구름 병아리", rarity: "NORMAL", rarityLabel: "노말" },
  { id: "kobi", name: "코비", species: "낮잠 코알라", rarity: "NORMAL", rarityLabel: "노말" },
];

const characterDescriptions = {
  tori: "작은 성공에도 귀가 쫑긋 서는 루틴 친구예요.",
  momo: "느긋하지만 한 번 정하면 꾸준히 밀고 가는 타입이에요.",
  bami: "포근한 응원으로 컨디션을 지켜주는 든든한 친구예요.",
  maru: "작은 할 일을 모아 큰 성취로 굴리는 부지런한 햄찌예요.",
  ruru: "새벽 루틴과 빠른 집중을 좋아하는 꼬리 여우예요.",
  poyo: "가벼운 시작을 잘 만들어주는 햇살 같은 병아리예요.",
  kobi: "쉬는 타이밍을 잘 아는 낮잠 코알라예요.",
  moki: "새로운 행동을 재주처럼 익히는 장난꾸러기예요.",
  nabi: "보상을 차곡차곡 모으는 볼주머니 수집가예요.",
  dami: "천천히 자라지만 회복력이 좋은 초록 친구예요.",
  somi: "묵묵히 루틴을 지키는 대나무 숲의 단단한 친구예요.",
  leo: "작은 목표도 당당하게 해내는 미니 사자예요.",
  hoya: "몰입할 때 줄무늬가 반짝이는 집중형 친구예요.",
  ari: "멀리 보고 목표를 잡는 하늘 감시자예요.",
  boots: "꾸미기와 성취 자랑을 좋아하는 장화 친구예요.",
  lumi: "조용하지만 희귀한 행운을 데려오는 동글 뱁새예요.",
  loki: "장난기 많지만 결정적인 순간에 반짝이는 레서판다예요.",
  miru: "종류 · 원피스 토끼",
  melly: "종류 · 리본 후드토끼",
  pomi: "종류 · 화이트 포메",
  chacha: "종류 · 티벳여우",
  soli: "종류 · 쿼카",
  pepe: "종류 · 카피바라",
  nunu: "종류 · 아홀로틀",
  toto: "종류 · 마눌고양이",
};

const petCatalog = [
  ...starterCharacters.map((pet) => ({ ...pet, starter: true })),
  { id: "ruru", name: "루루", species: "꼬리 여우", rarity: "RARE", rarityLabel: "레어" },
  { id: "nabi", name: "다람", species: "볼주머니 다람쥐", rarity: "EPIC", rarityLabel: "에픽" },
  { id: "dami", name: "다미", species: "초록 도마뱀", rarity: "EPIC", rarityLabel: "에픽" },
  { id: "somi", name: "판다", species: "대나무 팬더", rarity: "EPIC", rarityLabel: "에픽" },
  { id: "leo", name: "레오", species: "미니 사자", rarity: "EPIC", rarityLabel: "에픽" },
  { id: "hoya", name: "호야", species: "줄무늬 호랑이", rarity: "EPIC", rarityLabel: "에픽" },
  { id: "ari", name: "아리", species: "꼬마 독수리", rarity: "EPIC", rarityLabel: "에픽" },
  { id: "moki", name: "모키", species: "재주 원숭이", rarity: "RARE", rarityLabel: "레어" },
  { id: "boots", name: "부츠", species: "장화신은 고양이", rarity: "EPIC", rarityLabel: "에픽" },
  { id: "chacha", name: "티티", species: "티벳여우", rarity: "RARE", rarityLabel: "레어" },
  { id: "soli", name: "쿼카", species: "쿼카", rarity: "RARE", rarityLabel: "레어" },
  { id: "pepe", name: "카피", species: "카피바라", rarity: "RARE", rarityLabel: "레어" },
  { id: "nunu", name: "아호", species: "아홀로틀", rarity: "EPIC", rarityLabel: "에픽" },
  { id: "toto", name: "마눌", species: "마눌고양이", rarity: "EPIC", rarityLabel: "에픽" },
  { id: "lumi", name: "포포", species: "동글 뱁새", rarity: "LEGEND", rarityLabel: "레전드", locked: true },
  { id: "loki", name: "로키", species: "장난 레서판다", rarity: "LEGEND", rarityLabel: "레전드", locked: true },
  { id: "miru", name: "미루", species: "원피스 토끼", rarity: "LEGEND", rarityLabel: "레전드" },
  { id: "melly", name: "마멜로", species: "리본 후드토끼", rarity: "LEGEND", rarityLabel: "레전드" },
  { id: "pomi", name: "호두", species: "화이트 포메", rarity: "LEGEND", rarityLabel: "레전드" },
].map((pet) => ({ ...pet, description: characterDescriptions[pet.id] || "루틴을 함께 키워가는 작은 친구예요." }));

const petActionCatalog = [
  { id: "walk", label: "산책", icon: "◇", unlockLevel: 2, dailyLimit: 2, rewardText: "컨디션 +6 · 코인 +2" },
  { id: "workout", label: "운동매트", icon: "▱", unlockLevel: 3, dailyLimit: 2, rewardText: "컨디션 +9 · 코인 +3" },
  { id: "youtube", label: "영상휴식", icon: "▶", unlockLevel: 4, dailyLimit: 1, rewardText: "컨디션 +4 · 코인 +2" },
  { id: "bench", label: "벤치", icon: "▰", unlockLevel: 5, dailyLimit: 1, rewardText: "컨디션 +12 · 코인 +8" },
  { id: "treadmill", label: "런닝", icon: "▣", unlockLevel: 7, dailyLimit: 1, rewardText: "컨디션 +14 · 코인 +10" },
];

const colorPalettes = [
  { id: "berry", name: "베리", body: "#ffd9e8", shade: "#f07fa6", ear: "#fff1f7", blush: "#ff6f9d", accent: "#b7a4ff" },
  { id: "mint", name: "민트", body: "#d9f8ea", shade: "#72cfa8", ear: "#f3fff9", blush: "#ffadc3", accent: "#78b9e7" },
  { id: "cocoa", name: "코코아", body: "#d6a16f", shade: "#8a5638", ear: "#f1c998", blush: "#ffa79a", accent: "#ffe08a" },
  { id: "sky", name: "하늘", body: "#d8eeff", shade: "#77b7df", ear: "#f4fbff", blush: "#ffabc0", accent: "#ffd86b" },
];
const colorPaletteById = Object.fromEntries(colorPalettes.map((palette) => [palette.id, palette]));

const accessoryRecipes = [
  { id: "star-pin", slot: "pin", slotLabel: "핀", name: "반짝 별핀", rarity: "RARE", materialId: "routine-spark", materialName: "루틴별 조각", need: 3, effectLabel: "XP +20 · 우정 +1" },
  { id: "heart-scarf", slot: "neck", slotLabel: "목", name: "하트 목도리", rarity: "RARE", materialId: "cheer-thread", materialName: "응원실 조각", need: 3, effectLabel: "우정 +4" },
  { id: "moon-badge", slot: "badge", slotLabel: "배지", name: "달빛 배지", rarity: "RARE", materialId: "moon-chip", materialName: "달빛 조각", need: 3, effectLabel: "컨디션 +4" },
  { id: "clover-hat", slot: "head", slotLabel: "머리", name: "네잎 모자", rarity: "RARE", materialId: "clover-chip", materialName: "네잎 조각", need: 3, effectLabel: "우정 +2 · 컨디션 +3" },
  { id: "tiny-bell", slot: "charm", slotLabel: "방울", name: "딸랑 방울", rarity: "RARE", materialId: "bell-chip", materialName: "방울 조각", need: 3, effectLabel: "XP +15 · 컨디션 +2" },
  { id: "focus-glasses", slot: "face", slotLabel: "얼굴", name: "동글 안경", rarity: "EPIC", materialId: "focus-lens", materialName: "집중렌즈 조각", need: 3, effectLabel: "집중 +6" },
  { id: "leaf-cape", slot: "back", slotLabel: "등", name: "잎망토", rarity: "EPIC", materialId: "green-leaf", materialName: "초록잎 조각", need: 3, effectLabel: "컨디션 +10" },
  { id: "ribbon-tail", slot: "tail", slotLabel: "꼬리", name: "리본 꼬리", rarity: "EPIC", materialId: "ribbon-chip", materialName: "리본 조각", need: 3, effectLabel: "XP +35 · 우정 +2" },
  { id: "cloud-pouch", slot: "pouch", slotLabel: "주머니", name: "구름 주머니", rarity: "EPIC", materialId: "cloud-chip", materialName: "구름 조각", need: 3, effectLabel: "코인 +12 · 컨디션 +4" },
  { id: "blossom-pin", slot: "pin", slotLabel: "핀", name: "꽃잎 핀", rarity: "RARE", materialId: "blossom-chip", materialName: "꽃잎 조각", need: 3, effectLabel: "우정 +2 · XP +12" },
  { id: "sprout-cap", slot: "head", slotLabel: "머리", name: "새싹 모자", rarity: "RARE", materialId: "sprout-chip", materialName: "새싹 조각", need: 3, effectLabel: "컨디션 +5" },
  { id: "cocoa-mug", slot: "charm", slotLabel: "참", name: "코코아 머그", rarity: "RARE", materialId: "cocoa-chip", materialName: "코코아 조각", need: 3, effectLabel: "컨디션 +3 · 우정 +1" },
  { id: "sleep-mask", slot: "face", slotLabel: "얼굴", name: "포근 수면안대", rarity: "EPIC", materialId: "sleep-chip", materialName: "꿈결 조각", need: 3, effectLabel: "컨디션 +8" },
  { id: "picnic-blanket", slot: "back", slotLabel: "등", name: "소풍 담요", rarity: "EPIC", materialId: "picnic-chip", materialName: "소풍 조각", need: 3, effectLabel: "우정 +3 · 컨디션 +5" },
  { id: "acorn-pouch", slot: "pouch", slotLabel: "주머니", name: "도토리 주머니", rarity: "EPIC", materialId: "acorn-chip", materialName: "도토리 조각", need: 3, effectLabel: "코인 +10 · XP +20" },
  { id: "star-crown", slot: "head", slotLabel: "머리", name: "별꼬리 왕관", rarity: "LEGEND", materialId: "star-tail", materialName: "별꼬리 조각", need: 2, effectLabel: "XP +120 · 우정 +6" },
];
const accessorySlotOrder = ["back", "tail", "neck", "face", "badge", "pouch", "charm", "pin", "head", "misc"];

const materialSourceLabels = {
  "routine-spark": "일일 미션 코인 뽑기",
  "cheer-thread": "그룹 인증 코인 뽑기",
  "focus-lens": "공부 미션 코인 뽑기",
  "green-leaf": "건강 미션 코인 뽑기",
  "star-tail": "주간·월간 보상 뽑기",
};

const achievementIcons = {
  first_brag: "☆",
  friend_reaction: "♡",
  proof_partner: "✓",
  streak_spark: "5",
  first_accessory: "◇",
  first_pet_draw: "P",
  healthy_glow: "+",
  tiny_collector: "3",
  rare_keeper: "R",
  epic_keeper: "E",
  loki_star: "L",
  mutual_circle: "∞",
};

const temptationLabels = { party: "유흥", game: "게임" };
const temptationHealthPenalty = { party: 12, game: 8 };
const friendRewardCatalog = [
  { id: "friend-3", requiredBond: 3, title: "첫 응원 선물", note: "코인 +20 · 컨디션 +3" },
  { id: "friend-7", requiredBond: 7, title: "색상 변경권", note: "펫 색상 1회 변경" },
  { id: "friend-12", requiredBond: 12, title: "하트 목도리", note: "우정 전용 액세서리" },
  { id: "friend-20", requiredBond: 20, title: "단짝 캡슐", note: "코인 · XP · 컨디션" },
  { id: "friend-35", requiredBond: 35, title: "그룹 오라", note: "공유 루틴 보너스" },
  { id: "friend-50", requiredBond: 50, title: "베스트 루틴 상자", note: "오래 함께한 보상" },
];

let quests = [];
let missions = {
  daily: { key: "", items: [], secondsLeft: 0 },
  weekly: { key: "", items: [], secondsLeft: 0 },
  monthly: { key: "", items: [], secondsLeft: 0 },
};
let serverTime = null;
let gameState = {
  level: 1,
  xp: 0,
  xpMax: 100,
  coin: 400,
  bond: 0,
  completion: 0,
  streak: 0,
  weeklyLeft: 5,
  penalty: 0,
  penaltyReason: "",
  temptations: {
    key: "",
    counts: { party: 0, game: 0 },
    limits: { party: 1, game: 3 },
  },
  stats: {
    power: 10,
    focus: 10,
    skill: 10,
    will: 10,
  },
  health: 50,
  mood: "Lv.1 루틴을 시작했어요",
  feedLog: { key: "", count: 0, limit: 3, lastFedAt: "" },
  petActions: { key: "", counts: {} },
  lastUnlockedPetActions: [],
  conditionDecay: { key: "", previousKey: "", amount: 0, reasons: [] },
  lastCompletedMission: null,
};
let messages = [];
let inventory = [];
let accessories = [];
let equippedAccessories = {};
let equippedAccessory = "";
let petPalette = "";
let characters = [];
let proofs = [];
let shares = [];
let room = null;
let rooms = [];
let achievements = [];
let friendRewards = { claimed: [] };
let recentPetActionUnlockIds = new Set();
let selectedQuestByList = {};
let homeMissionSelectedId = "";
let missionCategoryOpen = { daily: true, weekly: false, monthly: false };
let openQuestId = "";
let profile = { completed: false, theme: "default", petName: "아기 토리", temptationLimits: { party: 1, game: 3 } };
let profileEditorOpen = false;
let pendingMissionEditId = "";
let pendingTemptationType = "";
let preparedProofPhoto = "";
let pushStatusRefreshing = false;
let character = {
  id: "tori",
  name: "아기 토리",
  rarity: "NORMAL",
  rarityLabel: "노말",
  level: 1,
  xp: 0,
  xpMax: 100,
  paletteId: "",
  feedLog: { key: "", count: 0, limit: 3, lastFedAt: "" },
  petActions: { key: "", counts: {} },
  homeTier: 1,
  growthStage: "baby",
};
let gacha = { cost: 20, lastDraw: null, odds: [] };
let petGacha = { cost: 90, lastDraw: null };
let accessoryFilter = "all";
let deferredInstallPrompt = null;
let activeRequestCount = 0;
const pendingRequests = new Map();
const approvingProofIds = new Set();
const locallyResolvedProofIds = new Set();
const savedUserIdKey = "godlife-user-id";
const savedNicknameKey = "godlife-nickname";
const savedClientTokenKey = "godlife-client-token";
const savedResetAtKey = "godlife-reset-at";
const savedInstallPetKey = "godlife-install-pet";
const savedInstallPetNameKey = "godlife-install-pet-name";
const savedInstallAppNameKey = "godlife-install-app-name";

let userId = getSavedUserId();
const featureWindow = document.querySelector("#featureWindow");
const featureWindowTitle = document.querySelector("#featureWindowTitle");
const featureWindowClose = document.querySelector("#featureWindowClose");
const installAppButton = document.querySelector("#installAppButton");
const metaThemeColor = document.querySelector('meta[name="theme-color"]');
const appleWebAppTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
const notificationButton = document.querySelector("#notificationButton");
const notificationModal = document.querySelector("#notificationModal");
const notificationClose = document.querySelector("#notificationClose");
const notificationList = document.querySelector("#notificationList");
const notificationCount = document.querySelector("#notificationCount");
const pushSettingsCard = document.querySelector("#pushSettingsCard");
const pushSettingsTitle = document.querySelector("#pushSettingsTitle");
const pushSettingsStatus = document.querySelector("#pushSettingsStatus");
const pushEnableButton = document.querySelector("#pushEnableButton");
const headerPetFace = document.querySelector("#headerPetFace");
const headerGroupName = document.querySelector("#headerGroupName");
const headerNickname = document.querySelector("#headerNickname");
const screenGrid = document.querySelector(".screen-grid");
const petRoom = document.querySelector(".pet-room");
const celestialBody = document.querySelector(".pixel-sun");
const petSprite = document.querySelector("#petSprite");
const petName = document.querySelector("#petName");
const petDescription = document.querySelector("#petDescription");
const petMood = document.querySelector("#petMood");
const petLevel = document.querySelector("#petLevel");
const petRarity = document.querySelector("#petRarity");
const rewardPop = document.querySelector("#rewardPop");
const petXp = document.querySelector("#petXp");
const xpProgressText = document.querySelector("#xpProgressText");
const xpBar = document.querySelector("#xpBar");
const petCoin = document.querySelector("#petCoin");
const petBond = document.querySelector("#petBond");
const petHealth = document.querySelector("#petHealth");
const coinPile = document.querySelector("#coinPile");
const petCareGrid = document.querySelector("#petCareGrid");
const petFeedButton = document.querySelector("#petFeedButton");
const petFeedCooldown = document.querySelector("#petFeedCooldown");
const petActionList = document.querySelector("#petActionList");
const attendanceButton = document.querySelector("#attendanceButton");
const quickShareCard = document.querySelector("#quickShareCard");
const quickShareTitle = document.querySelector("#quickShareTitle");
const quickShareButton = document.querySelector("#quickShareButton");
const gachaButton = document.querySelector("#gachaButton");
const gachaResult = document.querySelector("#gachaResult");
const gachaOdds = document.querySelector("#gachaOdds");
const gachaResultPanel = document.querySelector("#gachaResultPanel");
const petDrawButton = document.querySelector("#petDrawButton");
const petDrawResult = document.querySelector("#petDrawResult");
const petCollection = document.querySelector("#petCollection");
const inventoryGrid = document.querySelector("#inventoryGrid");
const inventoryCount = document.querySelector("#inventoryCount");
const colorPalettePanel = document.querySelector("#colorPalettePanel");
const colorTicketBadge = document.querySelector("#colorTicketBadge");
const craftSectionTitle = document.querySelector("#craftSectionTitle");
const craftList = document.querySelector("#craftList");
const accessoryFilterBar = document.querySelector("#accessoryFilterBar");
const accessoryList = document.querySelector("#accessoryList");
const sharePetName = document.querySelector("#sharePetName");
const sharePetSummary = document.querySelector("#sharePetSummary");
const shareMoodHint = document.querySelector("#shareMoodHint");
const dailyShareNote = document.querySelector("#dailyShareNote");
const sharePetButton = document.querySelector("#sharePetButton");
const shareFeed = document.querySelector("#shareFeed");
const achievementList = document.querySelector("#achievementList");
const roomCard = document.querySelector("#roomCard");
const groupMemberList = document.querySelector("#groupMemberList");
const roomModal = document.querySelector("#roomModal");
const roomForm = document.querySelector("#roomForm");
const roomCancel = document.querySelector("#roomCancel");
const roomGateModal = document.querySelector("#roomGateModal");
const roomGateForm = document.querySelector("#roomGateForm");
const roomGateCode = document.querySelector("#gateRoomCode");
const roomGateHint = document.querySelector("#roomGateHint");
const roomGateLogout = document.querySelector("#roomGateLogout");
const loginModal = document.querySelector("#loginModal");
const loginForm = document.querySelector("#loginForm");
const loginNickname = document.querySelector("#loginNickname");
const profileModal = document.querySelector("#profileModal");
const profileForm = document.querySelector("#profileForm");
const profileClose = document.querySelector("#profileClose");
const profileStarter = document.querySelector("#profileStarter");
const profilePetNameInput = document.querySelector("#profilePetName");
const profileGoalInput = document.querySelector("#profileGoal");
const profileRoutineInput = document.querySelector("#profileRoutine");
const profilePeriodInput = document.querySelector("#profilePeriod");
const profileEndDateInput = document.querySelector("#profileEndDate");
const profilePeriodSummary = document.querySelector("#profilePeriodSummary");
const profileWakeInput = document.querySelector("#profileWake");
const wakeHourWheel = document.querySelector("#wakeHourWheel");
const wakeMinuteWheel = document.querySelector("#wakeMinuteWheel");
const wakeWheelSummary = document.querySelector("#wakeWheelSummary");
const profileFocusInput = document.querySelector("#profileFocus");
const profilePartyLimitInput = document.querySelector("#profilePartyLimit");
const profileGameLimitInput = document.querySelector("#profileGameLimit");
const partyLimitDisplay = document.querySelector("#partyLimitDisplay");
const gameLimitDisplay = document.querySelector("#gameLimitDisplay");
const profileAutoRulesInput = document.querySelector("#profileAutoRules");
const profileThemeInput = document.querySelector("#profileTheme");
const themeSwatchSummary = document.querySelector("#themeSwatchSummary");
const routineTemplateExample = document.querySelector("#routineTemplateExample");
const routinePolishStatus = document.querySelector("#routinePolishStatus");
const starterOptions = document.querySelector("#starterOptions");
const proofModal = document.querySelector("#proofModal");
const proofForm = document.querySelector("#proofForm");
const proofPhoto = document.querySelector("#proofPhoto");
const proofPreview = document.querySelector("#proofPreview");
const proofCancel = document.querySelector("#proofCancel");
const missionEditModal = document.querySelector("#missionEditModal");
const missionEditForm = document.querySelector("#missionEditForm");
const missionEditCancel = document.querySelector("#missionEditCancel");
const missionEditType = document.querySelector("#missionEditType");
const missionEditTitle = document.querySelector("#missionEditTitle");
const missionEditNote = document.querySelector("#missionEditNote");
const missionEditReason = document.querySelector("#missionEditReason");
const temptationConfirmModal = document.querySelector("#temptationConfirmModal");
const temptationConfirmForm = document.querySelector("#temptationConfirmForm");
const temptationConfirmTitle = document.querySelector("#temptationConfirmTitle");
const temptationConfirmText = document.querySelector("#temptationConfirmText");
const temptationConfirmIcon = document.querySelector("#temptationConfirmIcon");
const temptationConfirmCancel = document.querySelector("#temptationConfirmCancel");
const temptationConfirmClose = document.querySelector("#temptationConfirmClose");
const temptationConfirmSubmit = document.querySelector("#temptationConfirmSubmit");
const questModal = document.querySelector("#questModal");
const questModalClose = document.querySelector("#questModalClose");
const questModalContent = document.querySelector("#questModalContent");
const questModalHeading = document.querySelector("#questModalHeading");
const questModalMeta = document.querySelector("#questModalMeta");
let pendingQuestId = null;
let selfRuleTouched = false;
const statTargets = [
  document.querySelector("#statPower"),
  document.querySelector("#statFocus"),
  document.querySelector("#statSkill"),
  document.querySelector("#statWill"),
];

const routineTemplateExampleText = [
  "[최종 목표] 6개월 안에 코딩테스트 자신감 만들기",
  "[기간] 6개월",
  "[기상] 평일 6시 20분",
  "[평일 루틴]",
  "- 07:30-08:15 아침운동",
  "- 20:00 알고리즘 1문제 풀이",
  "- 21:00 SSAFY 개발 복습 40분",
  "- 22:00 오늘 배운 내용 3줄 회고",
  "[주말 루틴]",
  "- 토요일 프로젝트 기능 1개 개선",
  "- 일요일 다음 주 계획 15분",
  "[일일 미션으로 받고 싶은 것]",
  "- 알고리즘 풀이 기록 사진 인증",
  "- 개발 복습 노트 또는 GitHub 커밋 인증",
  "[주간 미션]",
  "- 알고리즘 5문제 누적",
  "- 그룹원 인증 2번 확인해주기",
  "[월간 미션]",
  "- 코딩테스트 루틴 성공률 80%",
  "[자기관리 기준]",
  "- 유흥 주 1회까지",
  "- 게임 주 3회까지",
  "[바로가기]",
  "- GitHub: https://github.com",
  "- Notion: https://www.notion.so",
].join("\n");

if (routineTemplateExample) {
  routineTemplateExample.value = routineTemplateExampleText;
}

function getSavedUserId() {
  const savedNickname = getSavedNickname();
  if (savedNickname) {
    const nicknameUserId = nicknameToUserId(savedNickname);
    window.localStorage.setItem(savedUserIdKey, nicknameUserId);
    return nicknameUserId;
  }
  const saved = window.localStorage.getItem(savedUserIdKey) || "";
  return saved.startsWith("nick_") ? saved : "";
}

function getSavedNickname() {
  return window.localStorage.getItem(savedNicknameKey) || "";
}

function getSavedResetAt() {
  return window.localStorage.getItem(savedResetAtKey) || "";
}

function rememberResetAt(resetAt) {
  const value = String(resetAt || "");
  if (value) {
    window.localStorage.setItem(savedResetAtKey, value);
  }
}

function hasSavedLoginIdentity() {
  return Boolean(getSavedNickname() || window.localStorage.getItem(savedUserIdKey));
}

function shouldClearSavedLoginForReset(nextState) {
  const resetAt = String(nextState?.resetAt || "");
  return Boolean(resetAt && hasSavedLoginIdentity() && getSavedResetAt() !== resetAt);
}

function clearSavedLoginForReset(resetAt) {
  rememberResetAt(resetAt);
  window.localStorage.removeItem(savedUserIdKey);
  window.localStorage.removeItem(savedNicknameKey);
  userId = "";
}

function createClientToken() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  const randomPart = Array.from(window.crypto?.getRandomValues?.(new Uint32Array(2)) || [Date.now(), Math.random() * 1e9])
    .map((value) => Math.floor(Number(value)).toString(36))
    .join("");
  return `client_${Date.now().toString(36)}_${randomPart}`;
}

function getClientToken() {
  const saved = window.localStorage.getItem(savedClientTokenKey);
  if (saved) {
    return saved;
  }
  const token = createClientToken();
  window.localStorage.setItem(savedClientTokenKey, token);
  return token;
}

function nicknameToUserId(nickname) {
  const normalized = String(nickname || "").trim().toLowerCase();
  let hash = 5381;
  for (const char of normalized) {
    hash = ((hash << 5) + hash + char.codePointAt(0)) >>> 0;
  }
  return `nick_${hash.toString(36)}`;
}

function showLoginModal() {
  if (!loginModal) {
    return;
  }
  loginModal.classList.remove("hidden");
  if (loginNickname) {
    loginNickname.value = getSavedNickname();
    window.setTimeout(() => loginNickname.focus(), 0);
  }
}

function hideLoginModal() {
  loginModal?.classList.add("hidden");
}

function hasActiveRoom() {
  return Boolean(room && room.status !== "closed");
}

function showRoomGateModal() {
  if (!roomGateModal) {
    return;
  }
  roomGateModal.classList.remove("hidden");
  setRoomGateMessage("지금 바로 시작할 수 있어요. 그룹은 나중에 만들어도 돼요.");
  // 모바일에서 입력창에 포커스하면 키보드가 바로 올라와 주요 행동(혼자 시작)을 가린다.
  window.setTimeout(() => document.querySelector("#soloStartButton")?.focus(), 0);
}

function hideRoomGateModal() {
  roomGateModal?.classList.add("hidden");
}

function setRoomGateMessage(message, tone = "default") {
  if (!roomGateHint) {
    return;
  }
  roomGateHint.textContent = message;
  roomGateHint.classList.toggle("is-error", tone === "error");
}

function normalizeTheme(theme = "default") {
  return ["default", "pink", "sky", "sunny"].includes(theme) ? theme : "default";
}

function applyTheme(theme = "default") {
  const safeTheme = normalizeTheme(theme);
  const themeColors = {
    default: "#8fd7bf",
    pink: "#f7a7c8",
    sky: "#89c9f2",
    sunny: "#ffd457",
  };
  document.body.dataset.theme = safeTheme;
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", themeColors[safeTheme] || themeColors.default);
  }
}

function syncThemeSwatches(theme = profileThemeInput?.value || profile.theme || "default") {
  const safeTheme = normalizeTheme(theme);
  const labels = {
    default: "\ubbfc\ud2b8",
    pink: "\ud551\ud06c",
    sky: "\ud558\ub298",
    sunny: "\ub178\ub791",
  };
  if (profileThemeInput) {
    profileThemeInput.value = safeTheme;
  }
  if (themeSwatchSummary) {
    themeSwatchSummary.textContent = labels[safeTheme] || labels.default;
  }
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.classList.toggle("active", button.dataset.themeChoice === safeTheme);
  });
}

function currentPetName() {
  return String(profile.petName || character.name || "아기 펫").trim() || "아기 펫";
}

function activePetLevel() {
  return Math.max(1, Math.floor(Number(character.level || gameState.level || 1)));
}

function petConditionState(health = gameState.health) {
  const value = Math.min(100, Math.max(0, Math.round(Number(health ?? 50))));
  if (value >= 85) {
    return "spark";
  }
  if (value >= 65) {
    return "happy";
  }
  if (value >= 38) {
    return "steady";
  }
  if (value >= 18) {
    return "tired";
  }
  return "low";
}

const petConditionLabels = {
  spark: "반짝반짝",
  happy: "방긋",
  steady: "느긋",
  tired: "꾸벅",
  low: "이불 타임",
};

function syncPetCondition(health = gameState.health) {
  if (!petSprite) {
    return;
  }
  const state = petConditionState(health);
  const label = petConditionLabels[state] || petConditionLabels.steady;
  petSprite.dataset.condition = state;
  petSprite.dataset.conditionLabel = label;
  petSprite.setAttribute("aria-label", `${currentPetName()} 픽셀 캐릭터, ${label}`);
  petRoom?.setAttribute("data-condition", state);
  const conditionCard = document.querySelector(".condition-card");
  conditionCard?.setAttribute("data-condition", state);
  conditionCard?.setAttribute("data-condition-label", label);
}

function homeTierForLevel(level = 1) {
  const value = Math.max(1, Math.floor(Number(level || 1)));
  if (value >= 8) {
    return 4;
  }
  if (value >= 5) {
    return 3;
  }
  if (value >= 2) {
    return 2;
  }
  return 1;
}

function growthStageForLevel(level = 1) {
  const value = Math.max(1, Math.floor(Number(level || 1)));
  if (value >= 8) {
    return "glow";
  }
  if (value >= 5) {
    return "big";
  }
  if (value >= 2) {
    return "soft";
  }
  return "baby";
}

function selectedInstallPetId() {
  if (profile.completed && character?.id) {
    return character.id;
  }
  return profileStarter?.value || profile.starterId || character.id || "tori";
}

function installIconVersion(petId, petName, appName) {
  return encodeURIComponent(`${petId || "tori"}-${petName || "루틴 펫"}-${appName || "Godlife Quest"}`.toLowerCase());
}

function upsertHeadLink(id, attributes) {
  const existing = document.querySelector(`#${id}`);
  const hasChanged = !existing || Object.entries(attributes).some(([key, value]) => existing.getAttribute(key) !== value);
  if (!hasChanged) {
    return existing;
  }
  const link = document.createElement("link");
  link.id = id;
  Object.entries(attributes).forEach(([key, value]) => {
    link.setAttribute(key, value);
  });
  if (existing) {
    existing.replaceWith(link);
  } else {
    document.head.appendChild(link);
  }
  return link;
}

function currentInstallAppName() {
  const groupName = hasActiveRoom() ? String(room?.name || "").trim() : "";
  return (groupName || "Godlife Quest").slice(0, 20);
}

function updatePwaIdentity(petId = selectedInstallPetId(), petName = currentPetName()) {
  const rawPet = petId || "tori";
  const rawName = petName || "루틴 펫";
  const rawAppName = currentInstallAppName();
  const safePet = encodeURIComponent(rawPet);
  const safeName = encodeURIComponent(rawName);
  const safeAppName = encodeURIComponent(rawAppName);
  const iconVersion = installIconVersion(rawPet, rawName, rawAppName);
  document.cookie = `godlife_pet=${safePet}; max-age=31536000; path=/; samesite=lax`;
  document.cookie = `godlife_pet_name=${safeName}; max-age=31536000; path=/; samesite=lax`;
  document.cookie = `godlife_app_name=${safeAppName}; max-age=31536000; path=/; samesite=lax`;
  try {
    window.localStorage.setItem(savedInstallPetKey, rawPet);
    window.localStorage.setItem(savedInstallPetNameKey, rawName);
    window.localStorage.setItem(savedInstallAppNameKey, rawAppName);
  } catch {
    // Storage can be unavailable in private browsing; cookies still cover normal installs.
  }
  const manifestHref = `/api/manifest.webmanifest?pet=${safePet}&name=${safeName}&app=${safeAppName}&v=${iconVersion}`;
  const appleIconHref = `/api/icon/180.png?pet=${safePet}&name=${safeName}&v=${iconVersion}`;
  const shortcutIconHref = `/api/icon/192.png?pet=${safePet}&name=${safeName}&v=${iconVersion}`;
  upsertHeadLink("pwaManifestLink", { rel: "manifest", href: manifestHref });
  upsertHeadLink("appleTouchIconLink", { rel: "apple-touch-icon", sizes: "180x180", href: appleIconHref });
  upsertHeadLink("shortcutIconLink", { rel: "icon", type: "image/png", sizes: "192x192", href: shortcutIconHref });
  if (appleWebAppTitleMeta) {
    appleWebAppTitleMeta.setAttribute("content", rawAppName);
  }
  document.title = rawAppName;
}

function isStandaloneApp() {
  return window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone === true;
}

function isAppleMobileInstallBrowser() {
  const ua = window.navigator.userAgent || "";
  const platform = window.navigator.platform || "";
  const iOSDevice = /iPhone|iPad|iPod/i.test(ua) || (platform === "MacIntel" && Number(window.navigator.maxTouchPoints || 0) > 1);
  const webkit = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua);
  return iOSDevice && webkit;
}

function isSafariInstallBrowser() {
  const ua = window.navigator.userAgent || "";
  return /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|Edg|EdgiOS|OPR/i.test(ua);
}

function syncDisplayModeClass() {
  document.body.classList.toggle("pwa-standalone", isStandaloneApp());
  document.body.classList.toggle("safari-browser", isSafariInstallBrowser());
}

function syncViewportMetrics() {
  const viewport = window.visualViewport;
  const height = Math.round(viewport?.height || window.innerHeight || document.documentElement.clientHeight || 0);
  const layoutHeight = Math.round(window.innerHeight || document.documentElement.clientHeight || height || 0);
  const viewportHeight = Math.round(viewport?.height || height || 0);
  const offsetTop = Math.round(viewport?.offsetTop || 0);
  const bottomInset = Math.max(0, layoutHeight - viewportHeight - offsetTop);
  if (height > 0) {
    document.documentElement.style.setProperty("--app-height", `${height}px`);
  }
  document.documentElement.style.setProperty("--visual-bottom-inset", `${bottomInset}px`);
  syncDisplayModeClass();
}

function preventMobileZoomGestures() {
  let lastTouch = { time: 0, x: 0, y: 0 };

  document.addEventListener("dblclick", (event) => {
    event.preventDefault();
  }, { passive: false });

  document.addEventListener("touchend", (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch) {
      return;
    }
    const now = Date.now();
    const closeTap = Math.abs(touch.clientX - lastTouch.x) < 28 && Math.abs(touch.clientY - lastTouch.y) < 28;
    if (now - lastTouch.time < 320 && closeTap) {
      event.preventDefault();
    }
    lastTouch = { time: now, x: touch.clientX, y: touch.clientY };
  }, { passive: false });

  ["gesturestart", "gesturechange", "gestureend"].forEach((type) => {
    window.addEventListener(type, (event) => {
      event.preventDefault();
    }, { passive: false });
  });
}

function syncInstallButton() {
  if (!installAppButton) {
    return;
  }
  syncDisplayModeClass();
  const installed = isStandaloneApp();
  const canPrompt = Boolean(deferredInstallPrompt);
  const canManualInstall = isSafariInstallBrowser();
  const visible = !installed && (canPrompt || canManualInstall);
  installAppButton.classList.toggle("hidden", !visible);
  installAppButton.disabled = false;
  const safariManual = canManualInstall && !canPrompt;
  installAppButton.textContent = safariManual ? (isAppleMobileInstallBrowser() ? "홈추가" : "Dock추가") : "설치";
  installAppButton.setAttribute("aria-label", safariManual ? "Safari 앱 추가 안내" : "앱 설치");
  installAppButton.title = safariManual
    ? (isAppleMobileInstallBrowser() ? "공유 버튼에서 홈 화면에 추가" : "Safari에서 Dock에 추가")
    : "선택한 펫 아이콘으로 앱 설치";
}

function headers() {
  return {
    "Content-Type": "application/json",
    "X-User-Id": userId,
    "X-Login-Token": getClientToken(),
  };
}

function applyPetPalette(sprite, paletteId = petPalette) {
  const palette = colorPaletteById[paletteId];
  if (!palette) {
    return sprite;
  }
  return {
    ...sprite,
    body: palette.body,
    shade: palette.shade,
    ear: palette.ear,
    blush: palette.blush,
    accent: palette.accent,
  };
}

function spriteForCharacter(characterId, paletteId = "") {
  return applyPetPalette(sprites[characterId] || sprites.tori, paletteId);
}

function isPaletteTicket(item = {}) {
  return (
    item.type === "palette-ticket"
    || item.materialId === "color-ticket"
    || String(item.id || "").startsWith("color-ticket")
  );
}

function colorTicketCount() {
  return inventory.filter(isPaletteTicket).length;
}

function normalizeClientPalette(paletteId = "") {
  const requested = paletteId === "default" ? "" : String(paletteId || "");
  return colorPaletteById[requested] ? requested : "";
}

function activePetPalette() {
  return normalizeClientPalette(character?.paletteId ?? petPalette);
}

function accessoryRecipeById(id) {
  return accessoryRecipes.find((item) => item.id === id);
}

function accessorySlotFor(id) {
  return accessoryRecipeById(id)?.slot || "misc";
}

function normalizeEquippedAccessories(raw = equippedAccessories, legacyId = equippedAccessory) {
  const ownedIds = new Set((accessories || []).map((item) => item.id));
  const hasEquippedMap = raw && typeof raw === "object";
  const source = hasEquippedMap ? raw : {};
  const next = {};
  Object.values(source).forEach((id) => {
    const accessoryId = String(id || "");
    if (ownedIds.has(accessoryId)) {
      next[accessorySlotFor(accessoryId)] = accessoryId;
    }
  });
  if (!hasEquippedMap && legacyId && ownedIds.has(legacyId)) {
    next[accessorySlotFor(legacyId)] ||= legacyId;
  }
  return next;
}

function equippedAccessoryIds(source = equippedAccessories, legacyId = equippedAccessory) {
  const normalized = normalizeEquippedAccessories(source, legacyId);
  return accessorySlotOrder
    .map((slot) => normalized[slot])
    .filter(Boolean);
}

function primaryEquippedAccessory() {
  return equippedAccessoryIds()[0] || "";
}

function petDescriptionFor(id = character.id) {
  return characterDescriptions[id]
    || petCatalog.find((pet) => pet.id === id)?.description
    || "루틴을 함께 키워가는 작은 친구예요.";
}

function skyPhaseForDate(date = new Date()) {
  const hour = date.getHours() + date.getMinutes() / 60;
  if (hour >= 5 && hour < 7) {
    return "dawn";
  }
  if (hour >= 7 && hour < 11) {
    return "morning";
  }
  if (hour >= 11 && hour < 16.5) {
    return "day";
  }
  if (hour >= 16.5 && hour < 19) {
    return "evening";
  }
  return "night";
}

function moonPhaseForDate(date = new Date()) {
  const synodicMonth = 29.530588853;
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const daysSinceKnownNew = (date.getTime() - knownNewMoon) / 86_400_000;
  const age = ((daysSinceKnownNew % synodicMonth) + synodicMonth) % synodicMonth;
  const phase = age / synodicMonth;
  const illumination = (1 - Math.cos(phase * Math.PI * 2)) / 2;
  const visible = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
  const waxing = phase < 0.5;
  let label = "초승달";
  if (phase < 0.03 || phase > 0.97) {
    label = "삭";
  } else if (phase < 0.22) {
    label = "초승달";
  } else if (phase < 0.28) {
    label = "상현달";
  } else if (phase < 0.47) {
    label = "차오르는 달";
  } else if (phase < 0.53) {
    label = "보름달";
  } else if (phase < 0.72) {
    label = "기우는 달";
  } else if (phase < 0.78) {
    label = "하현달";
  } else {
    label = "그믐달";
  }
  return { illumination, label, phase, visible, waxing };
}

function updateRoomSky(date = new Date()) {
  const phase = skyPhaseForDate(date);
  screenGrid?.setAttribute("data-sky-phase", phase);
  petRoom?.setAttribute("data-sky-phase", phase);
  if (!celestialBody) {
    return;
  }
  const isNight = phase === "night";
  celestialBody.dataset.celestial = isNight ? "moon" : "sun";
  if (!isNight) {
    celestialBody.removeAttribute("data-moon-phase");
    celestialBody.style.removeProperty("--moon-shadow-x");
    celestialBody.style.removeProperty("--moon-shadow-opacity");
    celestialBody.setAttribute("title", "태양");
    return;
  }
  const moon = moonPhaseForDate(date);
  const direction = moon.waxing ? -1 : 1;
  const shadowOffset = Math.round(direction * moon.visible * 96);
  celestialBody.dataset.moonPhase = moon.label;
  celestialBody.style.setProperty("--moon-shadow-x", `${shadowOffset}%`);
  celestialBody.style.setProperty("--moon-shadow-opacity", moon.illumination > 0.985 ? "0" : "1");
  celestialBody.setAttribute("title", moon.label);
}

function renderSprite() {
  const paletteId = activePetPalette();
  const sprite = spriteForCharacter(character.id, paletteId);
  const level = activePetLevel();
  petSprite.className = "pixel-sprite svg-sprite";
  petSprite.dataset.growthStage = character.growthStage || growthStageForLevel(level);
  petSprite.style.gridTemplateColumns = "";
  petSprite.style.gridTemplateRows = "";
  petSprite.setAttribute("aria-label", `${currentPetName()} 픽셀 캐릭터`);
  petSprite.innerHTML = `
    ${createPetStackSvg(character.id, equippedAccessoryIds(), sprite)}
    <span class="pet-condition-effect" aria-hidden="true"></span>
  `;
  syncPetCondition();
  if (petRoom) {
    petRoom.dataset.houseTier = String(character.homeTier || homeTierForLevel(level));
    const decorClass = level >= 7
      ? "level-treadmill"
      : level >= 5
        ? "level-bench"
        : level >= 4
          ? "level-media"
          : level >= 3
            ? "level-workout"
            : level >= 2
              ? "level-walk"
              : "";
    petRoom.classList.remove("level-walk", "level-workout", "level-media", "level-bench", "level-treadmill");
    if (decorClass) {
      petRoom.classList.add(decorClass);
    }
  }
  if (screenGrid) {
    screenGrid.dataset.houseTier = String(character.homeTier || homeTierForLevel(level));
  }
  updateRoomSky();
}

function renderHeaderPetFace() {
  if (!headerPetFace) {
    return;
  }
  const sprite = spriteForCharacter(character.id, activePetPalette());
  headerPetFace.innerHTML = createPetSvg(sprite);
  headerPetFace.setAttribute("title", currentPetName());
}

function rect(x, y, width, height, fill) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}"/>`;
}

function rows(parts, fill) {
  return parts.map(([y, x, width]) => rect(x, y, width, 1, fill)).join("");
}

function createPetSvg(sprite) {
  const line = "#2f4057";
  const eye = "#253143";
  const shine = "#fffdf7";
  const cream = "#fff4e4";
  if (sprite.kind === "elephant") {
    return createElephantSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "bear") {
    return createBearSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "panda") {
    return createPandaSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "ham") {
    return createHamsterSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "squirrel") {
    return createSquirrelSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "fox") {
    return createFoxSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "tibetanfox") {
    return createTibetanFoxSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "quokka") {
    return createQuokkaSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "capybara") {
    return createCapybaraSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "axolotl") {
    return createAxolotlSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "pallas") {
    return createPallasCatSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "redpanda") {
    return createRedPandaSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "snowbunny") {
    return createSnowBunnySvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "hoodbunny") {
    return createHoodBunnySvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "pomeranian") {
    return createPomeranianSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "koala") {
    return createKoalaSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "lion") {
    return createLionSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "tiger") {
    return createTigerSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "eagle") {
    return createEagleSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "monkey") {
    return createMonkeySvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "bootscat") {
    return createBootsCatSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "deskcat" || sprite.kind === "fluffycat" || sprite.kind === "cat") {
    return createCatSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "bird" || sprite.kind === "chick") {
    return createBirdSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "bapsae") {
    return createBapsaeSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "lizard") {
    return createLizardSvg(sprite, { line, eye, shine, cream });
  }
  if (sprite.kind === "trickster") {
    return createTricksterSvg(sprite, { line, eye, shine, cream });
  }
  const headOutline = rows([
    [8, 11, 10],
    [9, 9, 14],
    [10, 8, 16],
    [11, 7, 18],
    [12, 6, 20],
    [13, 6, 20],
    [14, 6, 20],
    [15, 6, 20],
    [16, 6, 20],
    [17, 7, 18],
    [18, 8, 16],
    [19, 10, 12],
  ], line);
  const headFill = rows([
    [9, 12, 8],
    [10, 10, 12],
    [11, 9, 14],
    [12, 8, 16],
    [13, 8, 16],
    [14, 8, 16],
    [15, 8, 16],
    [16, 8, 16],
    [17, 9, 14],
    [18, 10, 12],
  ], sprite.body);
  const body = `
    ${rows([[20, 11, 10], [21, 10, 12], [22, 9, 14], [23, 9, 14], [24, 10, 12], [25, 11, 10]], line)}
    ${rows([[21, 12, 8], [22, 11, 10], [23, 11, 10], [24, 12, 8]], sprite.shade)}
    ${rows([[22, 13, 6], [23, 12, 8], [24, 13, 6]], sprite.accent)}
    ${rect(7, 21, 3, 3, line)}${rect(8, 21, 2, 2, sprite.body)}
    ${rect(22, 21, 3, 3, line)}${rect(22, 21, 2, 2, sprite.body)}
    ${rect(10, 25, 5, 2, line)}${rect(11, 25, 3, 1, sprite.ear)}
    ${rect(17, 25, 5, 2, line)}${rect(18, 25, 3, 1, sprite.ear)}
  `;
  const face = `
    ${rows([[15, 13, 6], [16, 12, 8], [17, 13, 6]], cream)}
    ${rect(11, 13, 2, 2, eye)}${rect(19, 13, 2, 2, eye)}
    ${rect(12, 13, 1, 1, shine)}${rect(20, 13, 1, 1, shine)}
    ${rect(8, 16, 3, 1, sprite.blush)}${rect(21, 16, 3, 1, sprite.blush)}
    ${rect(15, 15, 2, 1, eye)}
    ${rect(14, 17, 1, 1, sprite.shade)}${rect(17, 17, 1, 1, sprite.shade)}
  `;
  const earParts = {
    bunny: `
      ${rows([[2, 10, 3], [3, 9, 4], [4, 9, 4], [5, 9, 4], [6, 9, 4], [7, 10, 3]], line)}
      ${rows([[3, 10, 2], [4, 10, 2], [5, 10, 2], [6, 10, 2]], sprite.ear)}
      ${rows([[2, 19, 3], [3, 19, 4], [4, 19, 4], [5, 19, 4], [6, 19, 4], [7, 19, 3]], line)}
      ${rows([[3, 20, 2], [4, 20, 2], [5, 20, 2], [6, 20, 2]], sprite.ear)}
    `,
    ham: `
      ${rows([[6, 7, 5], [7, 6, 7], [8, 6, 7], [9, 7, 5]], line)}
      ${rows([[7, 8, 3], [8, 8, 3]], sprite.ear)}
      ${rows([[6, 20, 5], [7, 19, 7], [8, 19, 7], [9, 20, 5]], line)}
      ${rows([[7, 21, 3], [8, 21, 3]], sprite.ear)}
    `,
    bear: `
      ${rows([[5, 7, 5], [6, 6, 7], [7, 6, 7], [8, 7, 5]], line)}
      ${rows([[6, 8, 3], [7, 8, 3]], sprite.ear)}
      ${rows([[5, 20, 5], [6, 19, 7], [7, 19, 7], [8, 20, 5]], line)}
      ${rows([[6, 21, 3], [7, 21, 3]], sprite.ear)}
    `,
    cat: `
      ${rows([[4, 9, 2], [5, 8, 4], [6, 7, 6], [7, 7, 6]], line)}
      ${rows([[5, 10, 1], [6, 9, 3], [7, 9, 3]], sprite.ear)}
      ${rows([[4, 21, 2], [5, 20, 4], [6, 19, 6], [7, 19, 6]], line)}
      ${rows([[5, 21, 1], [6, 20, 3], [7, 20, 3]], sprite.ear)}
    `,
    fox: `
      ${rows([[4, 9, 2], [5, 8, 4], [6, 7, 6], [7, 7, 6]], line)}
      ${rows([[5, 10, 1], [6, 9, 3], [7, 9, 3]], sprite.ear)}${rect(8, 6, 1, 1, cream)}
      ${rows([[4, 21, 2], [5, 20, 4], [6, 19, 6], [7, 19, 6]], line)}
      ${rows([[5, 21, 1], [6, 20, 3], [7, 20, 3]], sprite.ear)}${rect(23, 6, 1, 1, cream)}
    `,
  };
  const tail = sprite.kind === "fox"
    ? `
      ${rows([[19, 23, 5], [20, 22, 7], [21, 22, 7], [22, 23, 5]], line)}
      ${rows([[20, 23, 4], [21, 23, 4]], sprite.shade)}
      ${rect(27, 20, 1, 2, cream)}
    `
    : sprite.kind === "cat"
      ? `
        ${rows([[20, 23, 5], [21, 24, 5], [22, 24, 4]], line)}
        ${rows([[21, 25, 3], [22, 25, 2]], sprite.shade)}
      `
      : "";

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${earParts[sprite.kind] || earParts.bunny}
      ${headOutline}
      ${headFill}
      ${face}
    </svg>
  `;
}

function accessoryIdList(accessoryInput = "") {
  const sortIds = (ids) => [...new Set(ids.filter(Boolean).map(String))]
    .sort((a, b) => accessorySlotOrder.indexOf(accessorySlotFor(a)) - accessorySlotOrder.indexOf(accessorySlotFor(b)));
  if (Array.isArray(accessoryInput)) {
    return sortIds(accessoryInput);
  }
  if (accessoryInput && typeof accessoryInput === "object") {
    return sortIds(Object.values(accessoryInput));
  }
  return accessoryInput ? [String(accessoryInput)] : [];
}

function createPetStackSvg(characterId, accessoryId = "", spriteOverride = null, paletteId = "") {
  const sprite = spriteOverride || spriteForCharacter(characterId, paletteId);
  return `
    <span class="pet-svg-stack">
      ${createPetSvg(sprite)}
      ${accessoryIdList(accessoryId).map((id) => createAccessorySvg(id)).join("")}
    </span>
  `;
}

function createAccessorySvg(accessoryId) {
  const line = "#2f4057";
  const gold = "#ffd86b";
  const coral = "#ff8b73";
  const mint = "#8fd7bf";
  const blue = "#78b9e7";
  const lilac = "#c7b7ff";
  const white = "#fffdf7";
  const parts = {
    "star-pin": `
      ${rect(23, 5, 2, 1, line)}${rect(22, 6, 4, 1, line)}${rect(21, 7, 6, 2, line)}${rect(22, 9, 4, 1, line)}${rect(23, 10, 2, 1, line)}
      ${rect(24, 5, 1, 5, gold)}${rect(22, 7, 5, 1, gold)}${rect(23, 8, 3, 1, gold)}
      ${rect(20, 10, 4, 1, coral)}
    `,
    "heart-scarf": `
      ${rows([[18, 9, 14], [19, 8, 16], [20, 9, 14]], line)}
      ${rows([[18, 11, 10], [19, 10, 12], [20, 11, 10]], coral)}
      ${rect(22, 20, 3, 4, line)}${rect(22, 20, 2, 3, coral)}${rect(24, 23, 2, 2, line)}${rect(24, 23, 1, 1, gold)}
    `,
    "moon-badge": `
      ${rect(22, 10, 5, 5, line)}${rect(23, 11, 3, 3, "#ffe9a8")}
      ${rect(25, 10, 2, 1, white)}${rect(25, 14, 2, 1, white)}
      ${rect(21, 14, 2, 2, blue)}
    `,
    "clover-hat": `
      ${rows([[6, 10, 12], [7, 9, 14], [8, 11, 10]], line)}
      ${rows([[7, 10, 12], [8, 12, 8]], mint)}
      ${rect(12, 4, 3, 3, line)}${rect(17, 4, 3, 3, line)}${rect(14, 2, 4, 3, line)}
      ${rect(13, 5, 1, 1, "#6abf8f")}${rect(18, 5, 1, 1, "#6abf8f")}${rect(15, 3, 2, 1, "#6abf8f")}
    `,
    "tiny-bell": `
      ${rect(21, 16, 6, 5, line)}${rows([[17, 22, 4], [18, 21, 6], [19, 21, 6], [20, 22, 4]], gold)}
      ${rect(23, 14, 2, 2, line)}${rect(23, 15, 2, 1, coral)}
      ${rect(23, 21, 2, 2, line)}${rect(24, 22, 1, 1, white)}
    `,
    "focus-glasses": `
      ${rect(9, 12, 6, 1, line)}${rect(9, 13, 1, 3, line)}${rect(14, 13, 1, 3, line)}${rect(10, 15, 4, 1, line)}
      ${rect(17, 12, 6, 1, line)}${rect(17, 13, 1, 3, line)}${rect(22, 13, 1, 3, line)}${rect(18, 15, 4, 1, line)}
      ${rect(15, 13, 2, 1, line)}
      ${rect(10, 13, 4, 2, "rgba(120, 185, 231, 0.42)")}${rect(18, 13, 4, 2, "rgba(120, 185, 231, 0.42)")}
    `,
    "leaf-cape": `
      ${rows([[17, 7, 18], [18, 6, 20], [19, 6, 20], [20, 7, 18], [21, 8, 16], [22, 9, 14], [23, 10, 12], [24, 12, 8]], line)}
      ${rows([[18, 8, 16], [19, 8, 16], [20, 9, 14], [21, 10, 12], [22, 11, 10], [23, 12, 8]], mint)}
      ${rect(16, 17, 1, 6, "#3c8c7a")}${rect(12, 20, 8, 1, "#3c8c7a")}
    `,
    "ribbon-tail": `
      ${rect(23, 17, 2, 2, line)}
      ${rows([[15, 19, 4], [16, 18, 6], [17, 19, 4]], line)}
      ${rows([[15, 25, 4], [16, 24, 6], [17, 25, 4]], line)}
      ${rect(20, 16, 3, 1, coral)}${rect(25, 16, 3, 1, coral)}
      ${rect(23, 17, 2, 1, gold)}
    `,
    "cloud-pouch": `
      ${rows([[18, 20, 8], [19, 18, 12], [20, 18, 12], [21, 19, 10], [22, 21, 6]], line)}
      ${rows([[19, 20, 8], [20, 19, 10], [21, 20, 8]], "#d8eeff")}
      ${rect(21, 17, 2, 2, blue)}${rect(25, 17, 2, 2, blue)}
      ${rect(23, 20, 2, 1, white)}
    `,
    "blossom-pin": `
      ${rect(22, 6, 5, 5, line)}${rect(23, 5, 3, 7, line)}${rect(21, 7, 7, 3, line)}
      ${rect(23, 6, 3, 5, "#ffb7c8")}${rect(22, 8, 5, 1, "#ff8faf")}
      ${rect(24, 8, 1, 1, gold)}${rect(20, 11, 4, 1, mint)}
    `,
    "sprout-cap": `
      ${rows([[6, 9, 14], [7, 8, 16], [8, 9, 14], [9, 11, 10]], line)}
      ${rows([[7, 10, 12], [8, 11, 10]], mint)}
      ${rect(15, 2, 2, 5, line)}${rect(16, 3, 1, 4, "#5ebd84")}
      ${rows([[3, 11, 4], [4, 10, 5], [5, 11, 3]], line)}
      ${rows([[3, 18, 4], [4, 18, 5], [5, 19, 3]], line)}
      ${rect(12, 4, 2, 1, "#78d69a")}${rect(19, 4, 2, 1, "#78d69a")}
    `,
    "cocoa-mug": `
      ${rect(22, 17, 6, 7, line)}${rect(23, 18, 4, 5, "#f4c58d")}
      ${rect(28, 19, 3, 4, line)}${rect(28, 20, 1, 2, white)}
      ${rect(24, 16, 2, 1, white)}${rect(26, 15, 2, 1, white)}
      ${rect(23, 21, 4, 1, "#8a5638")}${rect(24, 23, 2, 1, gold)}
    `,
    "sleep-mask": `
      ${rows([[11, 8, 16], [12, 7, 18], [13, 8, 16], [14, 10, 12]], line)}
      ${rows([[12, 9, 14], [13, 10, 12]], lilac)}
      ${rect(10, 13, 4, 1, "#8b7bc7")}${rect(18, 13, 4, 1, "#8b7bc7")}
      ${rect(14, 10, 4, 1, white)}${rect(15, 14, 2, 1, white)}
    `,
    "picnic-blanket": `
      ${rows([[18, 5, 22], [19, 5, 22], [20, 5, 22], [21, 5, 22], [22, 6, 20], [23, 7, 18]], line)}
      ${rows([[19, 7, 18], [20, 7, 18], [21, 8, 16], [22, 9, 14]], "#fff1df")}
      ${rect(9, 19, 2, 4, coral)}${rect(15, 19, 2, 4, coral)}${rect(21, 19, 2, 4, coral)}
      ${rect(7, 20, 18, 1, coral)}${rect(7, 22, 16, 1, mint)}
    `,
    "acorn-pouch": `
      ${rows([[17, 21, 7], [18, 19, 11], [19, 18, 13], [20, 18, 13], [21, 19, 11], [22, 21, 7]], line)}
      ${rows([[19, 20, 9], [20, 19, 11], [21, 20, 9]], "#b98252")}
      ${rows([[17, 22, 5], [18, 20, 9]], "#7a5038")}
      ${rect(23, 16, 3, 2, line)}${rect(24, 16, 1, 1, mint)}
      ${rect(23, 20, 2, 1, gold)}
    `,
    "star-crown": `
      ${rows([[4, 10, 12], [5, 9, 14], [6, 9, 14], [7, 10, 12]], line)}
      ${rect(10, 3, 3, 3, line)}${rect(15, 2, 3, 4, line)}${rect(20, 3, 3, 3, line)}
      ${rows([[5, 10, 12], [6, 10, 12]], gold)}
      ${rect(11, 4, 1, 2, gold)}${rect(16, 3, 1, 3, gold)}${rect(21, 4, 1, 2, gold)}
      ${rect(14, 6, 2, 1, coral)}${rect(18, 6, 2, 1, lilac)}
      ${rect(16, 1, 1, 1, white)}
    `,
  };

  if (!parts[accessoryId]) {
    return "";
  }

  return `
    <svg class="accessory-svg" viewBox="0 0 32 32" width="124" height="124" aria-hidden="true" shape-rendering="crispEdges">
      ${parts[accessoryId]}
    </svg>
  `;
}

function createBearSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const ears = `
    ${rows([[6, 7, 5], [7, 6, 7], [8, 6, 7], [9, 7, 5]], line)}
    ${rows([[7, 8, 3], [8, 8, 3]], sprite.ear)}
    ${rows([[6, 20, 5], [7, 19, 7], [8, 19, 7], [9, 20, 5]], line)}
    ${rows([[7, 21, 3], [8, 21, 3]], sprite.ear)}
  `;
  const head = `
    ${rows([[8, 10, 12], [9, 8, 16], [10, 7, 18], [11, 6, 20], [12, 6, 20], [13, 6, 20], [14, 6, 20], [15, 7, 18], [16, 8, 16], [17, 10, 12]], line)}
    ${rows([[9, 11, 10], [10, 9, 14], [11, 8, 16], [12, 8, 16], [13, 8, 16], [14, 8, 16], [15, 9, 14], [16, 11, 10]], sprite.body)}
  `;
  const body = `
    ${rows([[18, 10, 12], [19, 9, 14], [20, 8, 16], [21, 8, 16], [22, 9, 14], [23, 10, 12], [24, 12, 8]], line)}
    ${rows([[19, 11, 10], [20, 10, 12], [21, 10, 12], [22, 11, 10], [23, 13, 6]], sprite.shade)}
    ${rows([[20, 13, 6], [21, 12, 8], [22, 13, 6]], cream)}
    ${rect(7, 20, 4, 4, line)}${rect(8, 20, 2, 3, sprite.body)}
    ${rect(21, 20, 4, 4, line)}${rect(22, 20, 2, 3, sprite.body)}
    ${rect(10, 25, 5, 2, line)}${rect(11, 25, 3, 1, sprite.ear)}
    ${rect(17, 25, 5, 2, line)}${rect(18, 25, 3, 1, sprite.ear)}
  `;
  const face = `
    ${rows([[13, 13, 6], [14, 12, 8], [15, 12, 8], [16, 13, 6]], cream)}
    ${rect(11, 12, 2, 2, eye)}${rect(20, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(21, 12, 1, 1, shine)}
    ${rect(15, 14, 2, 1, eye)}${rect(14, 16, 1, 1, eye)}${rect(17, 16, 1, 1, eye)}
    ${rect(8, 15, 3, 1, sprite.blush)}${rect(22, 15, 3, 1, sprite.blush)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${ears}
      ${body}
      ${head}
      ${face}
    </svg>
  `;
}

function createPandaSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const dark = sprite.shade;
  const ears = `
    ${rows([[5, 7, 5], [6, 6, 7], [7, 6, 7], [8, 7, 5]], line)}
    ${rows([[6, 8, 3], [7, 8, 3]], dark)}
    ${rows([[5, 20, 5], [6, 19, 7], [7, 19, 7], [8, 20, 5]], line)}
    ${rows([[6, 21, 3], [7, 21, 3]], dark)}
  `;
  const head = `
    ${rows([[8, 10, 12], [9, 8, 16], [10, 7, 18], [11, 7, 18], [12, 6, 20], [13, 6, 20], [14, 7, 18], [15, 8, 16], [16, 10, 12]], line)}
    ${rows([[9, 11, 10], [10, 9, 14], [11, 9, 14], [12, 8, 16], [13, 8, 16], [14, 9, 14], [15, 11, 10]], sprite.body)}
  `;
  const patches = `
    ${rows([[11, 9, 5], [12, 8, 6], [13, 8, 6], [14, 9, 4]], dark)}
    ${rows([[11, 18, 5], [12, 18, 6], [13, 18, 6], [14, 19, 4]], dark)}
    ${rows([[14, 13, 6], [15, 12, 8], [16, 13, 6]], cream)}
  `;
  const body = `
    ${rows([[18, 11, 10], [19, 10, 12], [20, 10, 12], [21, 11, 10], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 12, 8], [20, 11, 10], [21, 12, 8], [22, 13, 6]], sprite.body)}
    ${rows([[19, 12, 8], [20, 13, 6], [21, 14, 4]], cream)}
    ${rect(7, 18, 5, 4, line)}${rect(8, 18, 3, 3, dark)}
    ${rect(21, 18, 5, 4, line)}${rect(22, 18, 3, 3, dark)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, dark)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, dark)}
    ${rect(24, 18, 2, 1, sprite.accent)}${rect(25, 17, 1, 4, sprite.accent)}
  `;
  const face = `
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(9, 15, 2, 1, sprite.blush)}${rect(21, 15, 2, 1, sprite.blush)}
    ${rect(15, 14, 2, 1, eye)}${rect(15, 15, 1, 1, eye)}${rect(17, 15, 1, 1, eye)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${body}
      ${ears}
      ${head}
      ${patches}
      ${face}
    </svg>
  `;
}

function createHamsterSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const ears = `
    ${rows([[7, 8, 4], [8, 7, 6], [9, 8, 4]], line)}
    ${rect(9, 8, 2, 1, sprite.ear)}
    ${rows([[7, 20, 4], [8, 19, 6], [9, 20, 4]], line)}
    ${rect(21, 8, 2, 1, sprite.ear)}
  `;
  const head = `
    ${rows([[9, 10, 12], [10, 8, 16], [11, 7, 18], [12, 6, 20], [13, 5, 22], [14, 5, 22], [15, 5, 22], [16, 6, 20], [17, 8, 16], [18, 10, 12]], line)}
    ${rows([[10, 11, 10], [11, 9, 14], [12, 8, 16], [13, 7, 18], [14, 7, 18], [15, 7, 18], [16, 8, 16], [17, 10, 12]], sprite.body)}
  `;
  const cheeks = `
    ${rows([[14, 8, 5], [15, 7, 7], [16, 8, 5]], cream)}
    ${rows([[14, 19, 5], [15, 18, 7], [16, 19, 5]], cream)}
    ${rect(8, 15, 2, 1, sprite.blush)}${rect(22, 15, 2, 1, sprite.blush)}
  `;
  const body = `
    ${rows([[19, 11, 10], [20, 10, 12], [21, 10, 12], [22, 11, 10], [23, 12, 8]], line)}
    ${rows([[20, 12, 8], [21, 12, 8], [22, 13, 6]], sprite.shade)}
    ${rect(9, 21, 4, 2, line)}${rect(10, 21, 2, 1, sprite.body)}
    ${rect(19, 21, 4, 2, line)}${rect(20, 21, 2, 1, sprite.body)}
    ${rect(11, 24, 4, 2, line)}${rect(17, 24, 4, 2, line)}
  `;
  const face = `
    ${rect(11, 13, 2, 2, eye)}${rect(19, 13, 2, 2, eye)}
    ${rect(12, 13, 1, 1, shine)}${rect(20, 13, 1, 1, shine)}
    ${rect(15, 15, 2, 1, eye)}
    ${rect(14, 16, 1, 1, eye)}${rect(17, 16, 1, 1, eye)}
    ${rect(15, 18, 2, 1, sprite.accent)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${body}
      ${ears}
      ${head}
      ${cheeks}
      ${face}
    </svg>
  `;
}

function createFoxSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const tail = `
    ${rows([[16, 22, 5], [17, 21, 7], [18, 20, 9], [19, 20, 9], [20, 21, 8], [21, 22, 6], [22, 24, 4]], line)}
    ${rows([[17, 23, 3], [18, 22, 5], [19, 22, 5], [20, 23, 4]], sprite.shade)}
    ${rows([[18, 27, 2], [19, 27, 2], [20, 27, 1]], cream)}
  `;
  const ears = `
    ${rows([[3, 8, 2], [4, 7, 4], [5, 6, 6], [6, 6, 7], [7, 7, 5]], line)}
    ${rows([[5, 8, 3], [6, 8, 3], [7, 9, 2]], sprite.ear)}
    ${rect(7, 4, 2, 2, cream)}
    ${rows([[3, 22, 2], [4, 21, 4], [5, 20, 6], [6, 19, 7], [7, 20, 5]], line)}
    ${rows([[5, 21, 3], [6, 21, 3], [7, 21, 2]], sprite.ear)}
    ${rect(23, 4, 2, 2, cream)}
  `;
  const head = `
    ${rows([[7, 11, 10], [8, 9, 14], [9, 8, 16], [10, 7, 18], [11, 7, 18], [12, 8, 16], [13, 9, 14], [14, 10, 12]], line)}
    ${rows([[8, 12, 8], [9, 10, 12], [10, 9, 14], [11, 9, 14], [12, 10, 12], [13, 12, 8]], sprite.body)}
    ${rows([[12, 12, 8], [13, 11, 10], [14, 12, 8], [15, 13, 6]], cream)}
  `;
  const body = `
    ${rows([[16, 11, 10], [17, 10, 12], [18, 9, 14], [19, 9, 14], [20, 10, 12], [21, 11, 10], [22, 13, 6]], line)}
    ${rows([[17, 12, 8], [18, 11, 10], [19, 11, 10], [20, 12, 8], [21, 13, 6]], sprite.shade)}
    ${rows([[18, 14, 4], [19, 13, 6], [20, 14, 4]], cream)}
    ${rect(8, 19, 4, 3, line)}${rect(9, 19, 2, 2, sprite.body)}
    ${rect(20, 19, 4, 3, line)}${rect(21, 19, 2, 2, sprite.body)}
    ${rect(10, 23, 5, 2, line)}${rect(11, 23, 3, 1, cream)}
    ${rect(17, 23, 5, 2, line)}${rect(18, 23, 3, 1, cream)}
  `;
  const face = `
    ${rect(11, 11, 2, 2, eye)}${rect(19, 11, 2, 2, eye)}
    ${rect(12, 11, 1, 1, shine)}${rect(20, 11, 1, 1, shine)}
    ${rect(15, 13, 2, 1, eye)}${rect(14, 15, 1, 1, eye)}${rect(17, 15, 1, 1, eye)}
    ${rect(9, 14, 3, 1, sprite.blush)}${rect(20, 14, 3, 1, sprite.blush)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createTibetanFoxSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const tail = `
    ${rows([[17, 23, 4], [18, 22, 6], [19, 22, 7], [20, 23, 6], [21, 24, 4]], line)}
    ${rows([[18, 24, 3], [19, 24, 4], [20, 25, 2]], sprite.shade)}
    ${rect(28, 19, 1, 1, cream)}
  `;
  const body = `
    ${rows([[18, 10, 12], [19, 9, 14], [20, 8, 16], [21, 8, 16], [22, 9, 14], [23, 10, 12]], line)}
    ${rows([[19, 11, 10], [20, 10, 12], [21, 10, 12], [22, 11, 10]], sprite.shade)}
    ${rows([[20, 14, 4], [21, 13, 6], [22, 14, 4]], cream)}
    ${rect(8, 20, 4, 3, line)}${rect(9, 20, 2, 2, sprite.body)}
    ${rect(20, 20, 4, 3, line)}${rect(21, 20, 2, 2, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, cream)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, cream)}
  `;
  const ears = `
    ${rows([[5, 8, 3], [6, 7, 5], [7, 7, 6], [8, 8, 4]], line)}
    ${rows([[6, 9, 2], [7, 9, 2]], sprite.ear)}
    ${rows([[5, 21, 3], [6, 20, 5], [7, 19, 6], [8, 20, 4]], line)}
    ${rows([[6, 21, 2], [7, 21, 2]], sprite.ear)}
  `;
  const head = `
    ${rows([[8, 8, 16], [9, 6, 20], [10, 5, 22], [11, 4, 24], [12, 4, 24], [13, 5, 22], [14, 5, 22], [15, 6, 20], [16, 8, 16], [17, 10, 12]], line)}
    ${rows([[9, 9, 14], [10, 7, 18], [11, 6, 20], [12, 6, 20], [13, 7, 18], [14, 8, 16], [15, 9, 14], [16, 11, 10]], sprite.body)}
    ${rows([[12, 8, 5], [13, 7, 7], [14, 8, 6]], sprite.shade)}
    ${rows([[12, 19, 5], [13, 18, 7], [14, 18, 6]], sprite.shade)}
    ${rows([[13, 12, 8], [14, 11, 10], [15, 12, 8], [16, 14, 4]], cream)}
  `;
  const face = `
    ${rect(10, 12, 4, 1, eye)}${rect(18, 12, 4, 1, eye)}
    ${rect(11, 11, 1, 1, shine)}${rect(19, 11, 1, 1, shine)}
    ${rect(15, 14, 2, 1, eye)}${rect(14, 16, 4, 1, eye)}
    ${rect(8, 15, 3, 1, sprite.blush)}${rect(21, 15, 3, 1, sprite.blush)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createQuokkaSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const ears = `
    ${rows([[5, 8, 4], [6, 7, 6], [7, 8, 4]], line)}
    ${rows([[6, 9, 2], [7, 9, 2]], sprite.ear)}
    ${rows([[5, 20, 4], [6, 19, 6], [7, 20, 4]], line)}
    ${rows([[6, 21, 2], [7, 21, 2]], sprite.ear)}
  `;
  const head = `
    ${rows([[7, 10, 12], [8, 8, 16], [9, 7, 18], [10, 6, 20], [11, 6, 20], [12, 6, 20], [13, 7, 18], [14, 8, 16], [15, 10, 12], [16, 12, 8]], line)}
    ${rows([[8, 11, 10], [9, 9, 14], [10, 8, 16], [11, 8, 16], [12, 8, 16], [13, 9, 14], [14, 10, 12], [15, 12, 8]], sprite.body)}
    ${rows([[12, 12, 8], [13, 11, 10], [14, 12, 8], [15, 14, 4]], cream)}
  `;
  const body = `
    ${rows([[17, 11, 10], [18, 10, 12], [19, 9, 14], [20, 9, 14], [21, 10, 12], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[18, 12, 8], [19, 11, 10], [20, 11, 10], [21, 12, 8], [22, 14, 4]], sprite.shade)}
    ${rows([[19, 14, 4], [20, 13, 6], [21, 14, 4]], sprite.accent)}
    ${rect(7, 19, 5, 3, line)}${rect(8, 19, 3, 2, sprite.body)}
    ${rect(20, 19, 5, 3, line)}${rect(21, 19, 3, 2, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, cream)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, cream)}
  `;
  const face = `
    ${rect(11, 11, 2, 2, eye)}${rect(19, 11, 2, 2, eye)}
    ${rect(12, 11, 1, 1, shine)}${rect(20, 11, 1, 1, shine)}
    ${rect(15, 13, 2, 1, eye)}
    ${rect(13, 14, 1, 1, eye)}${rect(14, 15, 1, 1, eye)}${rect(15, 16, 2, 1, eye)}${rect(17, 15, 1, 1, eye)}${rect(18, 14, 1, 1, eye)}
    ${rect(9, 14, 3, 1, sprite.blush)}${rect(20, 14, 3, 1, sprite.blush)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createCapybaraSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const ears = `
    ${rows([[5, 10, 3], [6, 9, 5], [7, 10, 3]], line)}
    ${rect(11, 6, 1, 1, sprite.ear)}
    ${rows([[5, 20, 3], [6, 19, 5], [7, 20, 3]], line)}
    ${rect(21, 6, 1, 1, sprite.ear)}
  `;
  const head = `
    ${rows([[8, 8, 17], [9, 6, 21], [10, 5, 23], [11, 5, 23], [12, 6, 22], [13, 7, 21], [14, 9, 18], [15, 11, 14]], line)}
    ${rows([[9, 9, 15], [10, 7, 18], [11, 7, 19], [12, 8, 18], [13, 9, 16], [14, 11, 12]], sprite.body)}
    ${rows([[11, 17, 8], [12, 18, 7], [13, 18, 6], [14, 18, 5]], sprite.accent)}
  `;
  const body = `
    ${rows([[16, 9, 15], [17, 7, 19], [18, 6, 21], [19, 6, 22], [20, 7, 21], [21, 8, 19], [22, 10, 15], [23, 12, 10]], line)}
    ${rows([[17, 10, 12], [18, 8, 17], [19, 8, 18], [20, 9, 16], [21, 10, 14], [22, 12, 10]], sprite.shade)}
    ${rect(9, 22, 5, 3, line)}${rect(10, 22, 3, 2, sprite.body)}
    ${rect(19, 22, 5, 3, line)}${rect(20, 22, 3, 2, sprite.body)}
    ${rect(10, 25, 5, 2, line)}${rect(11, 25, 3, 1, cream)}
    ${rect(18, 25, 5, 2, line)}${rect(19, 25, 3, 1, cream)}
  `;
  const face = `
    ${rect(11, 11, 2, 2, eye)}${rect(20, 11, 2, 2, eye)}
    ${rect(12, 11, 1, 1, shine)}${rect(21, 11, 1, 1, shine)}
    ${rect(23, 13, 2, 1, eye)}${rect(22, 14, 1, 1, eye)}${rect(24, 14, 1, 1, eye)}
    ${rect(9, 14, 2, 1, sprite.blush)}${rect(19, 14, 2, 1, sprite.blush)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createAxolotlSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const gills = `
    ${rect(5, 9, 4, 2, line)}${rect(4, 7, 2, 2, sprite.shade)}${rect(3, 11, 2, 2, sprite.shade)}${rect(5, 13, 3, 2, sprite.shade)}
    ${rect(23, 9, 4, 2, line)}${rect(26, 7, 2, 2, sprite.shade)}${rect(27, 11, 2, 2, sprite.shade)}${rect(24, 13, 3, 2, sprite.shade)}
    ${rect(6, 8, 3, 1, line)}${rect(6, 12, 3, 1, line)}${rect(23, 8, 3, 1, line)}${rect(23, 12, 3, 1, line)}
  `;
  const head = `
    ${rows([[8, 10, 12], [9, 8, 16], [10, 7, 18], [11, 6, 20], [12, 6, 20], [13, 7, 18], [14, 8, 16], [15, 10, 12], [16, 12, 8]], line)}
    ${rows([[9, 11, 10], [10, 9, 14], [11, 8, 16], [12, 8, 16], [13, 9, 14], [14, 10, 12], [15, 12, 8]], sprite.body)}
    ${rows([[13, 12, 8], [14, 12, 8], [15, 14, 4]], cream)}
  `;
  const body = `
    ${rows([[17, 11, 10], [18, 10, 12], [19, 9, 14], [20, 9, 14], [21, 10, 12], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[18, 12, 8], [19, 11, 10], [20, 11, 10], [21, 12, 8], [22, 14, 4]], sprite.body)}
    ${rows([[20, 14, 4], [21, 13, 6], [22, 14, 4]], sprite.accent)}
    ${rows([[18, 22, 5], [19, 23, 6], [20, 23, 6], [21, 22, 5]], line)}
    ${rows([[19, 24, 3], [20, 24, 3]], sprite.shade)}
    ${rect(8, 20, 4, 2, line)}${rect(9, 20, 2, 1, sprite.shade)}
    ${rect(20, 20, 4, 2, line)}${rect(21, 20, 2, 1, sprite.shade)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, cream)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, cream)}
  `;
  const face = `
    ${rect(11, 11, 2, 2, eye)}${rect(19, 11, 2, 2, eye)}
    ${rect(12, 11, 1, 1, shine)}${rect(20, 11, 1, 1, shine)}
    ${rect(9, 14, 3, 1, sprite.blush)}${rect(20, 14, 3, 1, sprite.blush)}
    ${rect(14, 14, 1, 1, eye)}${rect(15, 15, 2, 1, eye)}${rect(17, 14, 1, 1, eye)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${body}
      ${gills}
      ${head}
      ${face}
    </svg>
  `;
}

function createPallasCatSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const tail = `
    ${rows([[18, 23, 5], [19, 24, 5], [20, 24, 5], [21, 23, 6], [22, 22, 5]], line)}
    ${rows([[19, 25, 3], [20, 25, 3], [21, 24, 3]], sprite.body)}
    ${rect(25, 19, 3, 1, sprite.shade)}${rect(24, 21, 4, 1, sprite.shade)}
  `;
  const ears = `
    ${rows([[6, 8, 4], [7, 7, 6], [8, 8, 4]], line)}
    ${rect(9, 7, 2, 1, sprite.ear)}
    ${rows([[6, 20, 4], [7, 19, 6], [8, 20, 4]], line)}
    ${rect(21, 7, 2, 1, sprite.ear)}
  `;
  const head = `
    ${rows([[8, 10, 12], [9, 7, 18], [10, 5, 22], [11, 4, 24], [12, 4, 24], [13, 5, 22], [14, 5, 22], [15, 6, 20], [16, 8, 16], [17, 10, 12]], line)}
    ${rows([[9, 11, 10], [10, 8, 16], [11, 7, 18], [12, 7, 18], [13, 8, 16], [14, 8, 16], [15, 9, 14], [16, 11, 10]], sprite.body)}
    ${rows([[12, 11, 10], [13, 10, 12], [14, 11, 10], [15, 13, 6]], cream)}
    ${rect(7, 12, 4, 1, sprite.shade)}${rect(21, 12, 4, 1, sprite.shade)}
    ${rect(9, 15, 3, 1, sprite.shade)}${rect(20, 15, 3, 1, sprite.shade)}
  `;
  const body = `
    ${rows([[18, 10, 12], [19, 9, 14], [20, 9, 14], [21, 10, 12], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 11, 10], [20, 10, 12], [21, 11, 10], [22, 13, 6]], sprite.shade)}
    ${rows([[20, 14, 4], [21, 13, 6]], sprite.accent)}
    ${rect(8, 20, 4, 2, line)}${rect(9, 20, 2, 1, sprite.body)}
    ${rect(20, 20, 4, 2, line)}${rect(21, 20, 2, 1, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, cream)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, cream)}
  `;
  const face = `
    ${rect(10, 12, 4, 1, eye)}${rect(18, 12, 4, 1, eye)}
    ${rect(11, 11, 1, 1, shine)}${rect(19, 11, 1, 1, shine)}
    ${rect(15, 14, 2, 1, eye)}${rect(14, 16, 1, 1, eye)}${rect(17, 16, 1, 1, eye)}
    ${rect(8, 14, 2, 1, sprite.blush)}${rect(22, 14, 2, 1, sprite.blush)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createSquirrelSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const tail = `
    ${rows([[9, 22, 4], [10, 21, 6], [11, 20, 8], [12, 20, 9], [13, 21, 9], [14, 22, 8], [15, 23, 6], [16, 23, 6], [17, 22, 7], [18, 21, 7], [19, 21, 6], [20, 22, 4]], line)}
    ${rows([[10, 23, 2], [11, 22, 4], [12, 22, 5], [13, 23, 5], [14, 24, 4], [15, 25, 2], [17, 24, 3], [18, 23, 3], [19, 23, 2]], sprite.shade)}
    ${rows([[12, 27, 2], [13, 28, 2], [14, 28, 1]], cream)}
  `;
  const ears = `
    ${rows([[5, 9, 3], [6, 8, 5], [7, 8, 5]], line)}
    ${rect(10, 6, 1, 2, sprite.ear)}
    ${rows([[5, 20, 3], [6, 19, 5], [7, 19, 5]], line)}
    ${rect(21, 6, 1, 2, sprite.ear)}
  `;
  const head = `
    ${rows([[8, 10, 12], [9, 8, 16], [10, 7, 18], [11, 7, 18], [12, 6, 20], [13, 6, 20], [14, 7, 18], [15, 8, 16], [16, 10, 12]], line)}
    ${rows([[9, 11, 10], [10, 9, 14], [11, 9, 14], [12, 8, 16], [13, 8, 16], [14, 9, 14], [15, 11, 10]], sprite.body)}
  `;
  const body = `
    ${rows([[18, 11, 10], [19, 10, 12], [20, 10, 12], [21, 11, 10], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 12, 8], [20, 11, 10], [21, 12, 8], [22, 13, 6]], sprite.shade)}
    ${rows([[20, 14, 4], [21, 13, 6], [22, 14, 4]], sprite.accent)}
    ${rect(8, 20, 4, 2, line)}${rect(9, 20, 2, 1, sprite.body)}
    ${rect(20, 20, 4, 2, line)}${rect(21, 20, 2, 1, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, sprite.ear)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, sprite.ear)}
  `;
  const face = `
    ${rows([[13, 10, 12], [14, 9, 14], [15, 11, 10]], cream)}
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(9, 15, 3, 1, sprite.blush)}${rect(20, 15, 3, 1, sprite.blush)}
    ${rect(15, 14, 2, 1, eye)}${rect(15, 15, 1, 1, eye)}${rect(17, 15, 1, 1, eye)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createRedPandaSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const tail = `
    ${rows([[18, 23, 4], [19, 24, 5], [20, 24, 5], [21, 23, 6], [22, 22, 6], [23, 21, 5]], line)}
    ${rows([[19, 25, 3], [21, 24, 4], [23, 22, 3]], sprite.shade)}
    ${rows([[20, 25, 3], [22, 23, 3]], sprite.accent)}
  `;
  const ears = `
    ${rows([[4, 8, 3], [5, 7, 5], [6, 7, 5], [7, 8, 3]], line)}
    ${rows([[5, 9, 2], [6, 9, 2]], sprite.ear)}
    ${rows([[4, 21, 3], [5, 20, 5], [6, 20, 5], [7, 21, 3]], line)}
    ${rows([[5, 22, 2], [6, 22, 2]], sprite.ear)}
  `;
  const head = `
    ${rows([[8, 10, 12], [9, 8, 16], [10, 7, 18], [11, 7, 18], [12, 6, 20], [13, 6, 20], [14, 7, 18], [15, 8, 16], [16, 10, 12]], line)}
    ${rows([[9, 11, 10], [10, 9, 14], [11, 9, 14], [12, 8, 16], [13, 8, 16], [14, 9, 14], [15, 11, 10]], sprite.body)}
    ${rows([[11, 9, 5], [12, 8, 6], [13, 9, 5]], sprite.shade)}
    ${rows([[11, 18, 5], [12, 18, 6], [13, 18, 5]], sprite.shade)}
    ${rows([[13, 12, 8], [14, 11, 10], [15, 12, 8]], cream)}
  `;
  const body = `
    ${rows([[18, 11, 10], [19, 10, 12], [20, 10, 12], [21, 11, 10], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 12, 8], [20, 11, 10], [21, 12, 8], [22, 13, 6]], sprite.shade)}
    ${rows([[20, 14, 4], [21, 13, 6]], sprite.accent)}
    ${rect(7, 19, 4, 3, line)}${rect(8, 19, 2, 2, sprite.body)}
    ${rect(22, 19, 4, 3, line)}${rect(23, 19, 2, 2, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, sprite.shade)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, sprite.shade)}
  `;
  const face = `
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(9, 15, 2, 1, sprite.blush)}${rect(21, 15, 2, 1, sprite.blush)}
    ${rect(15, 14, 2, 1, eye)}${rect(15, 15, 1, 1, eye)}${rect(17, 15, 1, 1, eye)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createSnowBunnySvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const ears = `
    ${rows([[1, 10, 4], [2, 9, 5], [3, 9, 5], [4, 9, 5], [5, 9, 5], [6, 9, 5], [7, 10, 4], [8, 10, 3]], line)}
    ${rows([[2, 11, 2], [3, 10, 3], [4, 10, 3], [5, 10, 3], [6, 10, 3], [7, 11, 2]], sprite.body)}
    ${rows([[1, 19, 4], [2, 18, 5], [3, 18, 5], [4, 18, 5], [5, 18, 5], [6, 18, 5], [7, 19, 4], [8, 19, 3]], line)}
    ${rows([[2, 20, 2], [3, 19, 3], [4, 19, 3], [5, 19, 3], [6, 19, 3], [7, 20, 2]], sprite.body)}
    ${rect(15, 7, 2, 4, line)}
  `;
  const head = `
    ${rows([[8, 9, 14], [9, 7, 18], [10, 6, 20], [11, 5, 22], [12, 5, 22], [13, 5, 22], [14, 6, 20], [15, 7, 18], [16, 9, 14], [17, 11, 10]], line)}
    ${rows([[9, 10, 12], [10, 8, 16], [11, 7, 18], [12, 7, 18], [13, 7, 18], [14, 8, 16], [15, 9, 14], [16, 11, 10]], sprite.body)}
    ${rect(7, 11, 1, 1, shine)}${rect(24, 11, 1, 1, shine)}
  `;
  const body = `
    ${rows([[18, 11, 10], [19, 10, 12], [20, 9, 14], [21, 9, 14], [22, 8, 16], [23, 8, 16]], line)}
    ${rows([[19, 12, 8], [20, 11, 10], [21, 10, 12], [22, 10, 12]], sprite.accent)}
    ${rect(14, 18, 2, 1, cream)}${rect(17, 18, 2, 1, cream)}${rect(16, 19, 1, 1, cream)}
    ${rect(7, 19, 5, 4, line)}${rect(8, 20, 3, 3, sprite.body)}
    ${rect(20, 19, 5, 4, line)}${rect(21, 20, 3, 3, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, sprite.body)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, sprite.body)}
  `;
  const face = `
    ${rect(10, 12, 2, 2, eye)}${rect(20, 12, 2, 2, eye)}
    ${rect(15, 15, 1, 1, eye)}${rect(17, 15, 1, 1, eye)}
    ${rect(16, 16, 1, 1, eye)}
    ${rect(15, 17, 1, 1, eye)}${rect(17, 17, 1, 1, eye)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createHoodBunnySvg(sprite, colors) {
  const { line, cream } = colors;
  const eye = "#6d2f24";
  const nose = "#ffd84f";
  const ears = `
    ${rows([[10, 1, 5], [11, 1, 6], [12, 2, 6], [13, 2, 6], [14, 3, 5], [15, 4, 4]], line)}
    ${rows([[11, 2, 4], [12, 3, 3], [13, 3, 3], [14, 4, 2]], sprite.ear)}
    ${rows([[10, 26, 5], [11, 25, 6], [12, 24, 6], [13, 24, 6], [14, 24, 5], [15, 24, 4]], line)}
    ${rows([[11, 26, 4], [12, 26, 3], [13, 26, 3], [14, 26, 2]], sprite.ear)}
  `;
  const bow = `
    ${rows([[3, 10, 5], [4, 8, 8], [5, 8, 8], [6, 9, 6]], line)}
    ${rows([[4, 11, 4], [5, 10, 5]], sprite.accent)}
    ${rows([[3, 17, 5], [4, 16, 8], [5, 16, 8], [6, 17, 6]], line)}
    ${rows([[4, 18, 4], [5, 17, 5]], sprite.accent)}
    ${rect(15, 4, 2, 3, line)}${rect(15, 5, 2, 1, "#ffb6d0")}
  `;
  const hood = `
    ${rows([[7, 8, 16], [8, 6, 20], [9, 5, 22], [10, 4, 24], [11, 4, 24], [12, 5, 22], [13, 5, 22], [14, 5, 22], [15, 6, 20], [16, 7, 18], [17, 9, 14]], line)}
    ${rows([[8, 9, 14], [9, 7, 18], [10, 6, 20], [11, 6, 20], [12, 7, 18], [13, 7, 18], [14, 7, 18], [15, 8, 16], [16, 10, 12]], sprite.body)}
    ${rect(7, 8, 2, 2, "#ffdce8")}${rect(23, 8, 2, 2, "#ffdce8")}
  `;
  const faceMask = `
    ${rows([[12, 8, 16], [13, 7, 18], [14, 7, 18], [15, 8, 16], [16, 9, 14], [17, 11, 10]], cream)}
  `;
  const body = `
    ${rows([[19, 11, 10], [20, 10, 12], [21, 10, 12], [22, 11, 10], [23, 12, 8]], line)}
    ${rows([[20, 12, 8], [21, 12, 8], [22, 13, 6]], sprite.body)}
    ${rect(9, 20, 4, 3, line)}${rect(10, 21, 2, 2, cream)}
    ${rect(20, 20, 4, 3, line)}${rect(21, 21, 2, 2, cream)}
    ${rect(11, 24, 5, 2, line)}${rect(12, 24, 3, 1, cream)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, cream)}
  `;
  const face = `
    ${rect(11, 14, 2, 3, eye)}${rect(20, 14, 2, 3, eye)}
    ${rect(16, 16, 2, 2, nose)}
    ${rect(15, 18, 1, 1, eye)}${rect(18, 18, 1, 1, eye)}
    ${rect(16, 19, 2, 1, eye)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${body}
      ${ears}
      ${bow}
      ${hood}
      ${faceMask}
      ${face}
    </svg>
  `;
}

function createPomeranianSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const tail = `
    ${rows([[15, 23, 5], [16, 24, 5], [17, 24, 5], [18, 23, 6], [19, 22, 5], [20, 23, 3]], line)}
    ${rows([[16, 25, 3], [17, 25, 3], [18, 24, 3], [19, 24, 2]], sprite.body)}
  `;
  const ears = `
    ${rows([[6, 7, 4], [7, 6, 6], [8, 7, 5], [9, 8, 3]], line)}
    ${rows([[7, 8, 3], [8, 8, 3]], sprite.ear)}
    ${rows([[6, 21, 4], [7, 20, 6], [8, 20, 5], [9, 21, 3]], line)}
    ${rows([[7, 21, 3], [8, 21, 3]], sprite.ear)}
  `;
  const fluff = `
    ${rows([[7, 10, 12], [8, 8, 16], [9, 6, 20], [10, 5, 22], [11, 5, 22], [12, 4, 24], [13, 5, 22], [14, 5, 22], [15, 7, 18], [16, 9, 14]], line)}
    ${rows([[8, 11, 10], [9, 9, 14], [10, 7, 18], [11, 7, 18], [12, 6, 20], [13, 7, 18], [14, 8, 16], [15, 10, 12]], sprite.body)}
    ${rect(6, 12, 2, 2, sprite.shade)}${rect(24, 12, 2, 2, sprite.shade)}
    ${rect(9, 8, 2, 1, shine)}${rect(21, 8, 2, 1, shine)}
  `;
  const body = `
    ${rows([[18, 10, 12], [19, 9, 14], [20, 9, 14], [21, 10, 12], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 11, 10], [20, 11, 10], [21, 12, 8], [22, 14, 4]], sprite.shade)}
    ${rows([[20, 14, 4], [21, 13, 6]], cream)}
    ${rect(8, 20, 4, 2, line)}${rect(9, 20, 2, 1, sprite.body)}
    ${rect(20, 20, 4, 2, line)}${rect(21, 20, 2, 1, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, sprite.ear)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, sprite.ear)}
  `;
  const face = `
    ${rows([[12, 12, 8], [13, 11, 10], [14, 12, 8], [15, 13, 6]], cream)}
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(15, 14, 2, 2, eye)}${rect(14, 16, 1, 1, eye)}${rect(17, 16, 1, 1, eye)}
    ${rect(9, 15, 2, 1, sprite.blush)}${rect(21, 15, 2, 1, sprite.blush)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${ears}
      ${fluff}
      ${face}
    </svg>
  `;
}

function createCatSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const fluffy = sprite.kind === "fluffycat";
  const ears = `
    ${rows([[4, 8, 2], [5, 7, 4], [6, 6, 6], [7, 6, 6]], line)}
    ${rows([[5, 9, 1], [6, 8, 3], [7, 8, 3]], sprite.ear)}
    ${rows([[4, 22, 2], [5, 21, 4], [6, 20, 6], [7, 20, 6]], line)}
    ${rows([[5, 22, 1], [6, 21, 3], [7, 21, 3]], sprite.ear)}
    ${fluffy ? `${rect(15, 6, 2, 2, sprite.accent)}${rect(17, 5, 2, 3, sprite.accent)}` : ""}
  `;
  const tail = fluffy
    ? `
      ${rows([[17, 23, 4], [18, 24, 5], [19, 24, 5], [20, 23, 6], [21, 21, 5]], line)}
      ${rows([[18, 25, 3], [19, 25, 3], [20, 24, 3], [21, 23, 2]], sprite.shade)}
      ${rect(27, 17, 2, 2, cream)}
    `
    : `
      ${rows([[17, 24, 3], [18, 25, 3], [19, 25, 3], [20, 24, 4], [21, 23, 4], [22, 23, 3]], line)}
      ${rows([[18, 26, 1], [19, 26, 1], [20, 25, 2], [21, 24, 2]], sprite.shade)}
    `;
  const head = `
    ${rows([[8, 10, 12], [9, 8, 16], [10, 7, 18], [11, 7, 18], [12, 6, 20], [13, 6, 20], [14, 7, 18], [15, 8, 16], [16, 10, 12]], line)}
    ${rows([[9, 11, 10], [10, 9, 14], [11, 9, 14], [12, 8, 16], [13, 8, 16], [14, 9, 14], [15, 11, 10]], sprite.body)}
  `;
  const faceMask = fluffy
    ? `${rows([[13, 10, 12], [14, 9, 14], [15, 11, 10]], cream)}`
    : `${rows([[13, 13, 6], [14, 12, 8], [15, 13, 6]], cream)}`;
  const body = `
    ${rows([[18, 11, 10], [19, 10, 12], [20, 10, 12], [21, 11, 10], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 12, 8], [20, 12, 8], [21, 13, 6], [22, 14, 4]], sprite.shade)}
    ${rect(8, 20, 4, 2, line)}${rect(9, 20, 2, 1, sprite.body)}
    ${rect(20, 20, 4, 2, line)}${rect(21, 20, 2, 1, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, sprite.ear)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, sprite.ear)}
  `;
  const whiskers = `
    ${rect(7, 14, 3, 1, line)}${rect(22, 14, 3, 1, line)}
    ${rect(8, 16, 3, 1, line)}${rect(21, 16, 3, 1, line)}
  `;
  const face = `
    ${faceMask}
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(15, 14, 2, 1, sprite.accent)}
    ${rect(15, 15, 1, 1, eye)}${rect(17, 15, 1, 1, eye)}
    ${rect(9, 15, 2, 1, sprite.blush)}${rect(21, 15, 2, 1, sprite.blush)}
    ${whiskers}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createKoalaSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const ears = `
    ${rows([[6, 3, 7], [7, 2, 9], [8, 1, 10], [9, 1, 10], [10, 2, 9], [11, 3, 7]], line)}
    ${rows([[7, 4, 5], [8, 3, 6], [9, 3, 6], [10, 4, 5]], sprite.ear)}
    ${rows([[6, 22, 7], [7, 21, 9], [8, 21, 10], [9, 21, 10], [10, 21, 9], [11, 22, 7]], line)}
    ${rows([[7, 23, 5], [8, 23, 6], [9, 23, 6], [10, 23, 5]], sprite.ear)}
  `;
  const head = `
    ${rows([[8, 10, 12], [9, 8, 16], [10, 7, 18], [11, 7, 18], [12, 6, 20], [13, 6, 20], [14, 7, 18], [15, 8, 16], [16, 10, 12]], line)}
    ${rows([[9, 11, 10], [10, 9, 14], [11, 9, 14], [12, 8, 16], [13, 8, 16], [14, 9, 14], [15, 11, 10]], sprite.body)}
  `;
  const body = `
    ${rows([[18, 11, 10], [19, 10, 12], [20, 10, 12], [21, 11, 10], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 12, 8], [20, 11, 10], [21, 12, 8], [22, 13, 6]], sprite.shade)}
    ${rows([[20, 14, 4], [21, 13, 6], [22, 14, 4]], cream)}
    ${rect(7, 20, 4, 2, line)}${rect(8, 20, 2, 1, sprite.body)}
    ${rect(21, 20, 4, 2, line)}${rect(22, 20, 2, 1, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, sprite.ear)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, sprite.ear)}
    ${rect(23, 15, 2, 5, sprite.accent)}${rect(22, 16, 4, 2, sprite.accent)}
  `;
  const face = `
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(14, 14, 4, 2, line)}${rect(15, 14, 2, 1, sprite.shade)}
    ${rect(9, 15, 3, 1, sprite.blush)}${rect(20, 15, 3, 1, sprite.blush)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createLionSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const mane = `
    ${rows([[5, 10, 12], [6, 8, 16], [7, 7, 18], [8, 6, 20], [9, 5, 22], [10, 5, 22], [11, 5, 22], [12, 5, 22], [13, 5, 22], [14, 6, 20], [15, 7, 18], [16, 8, 16]], line)}
    ${rows([[6, 11, 10], [7, 9, 14], [8, 8, 16], [9, 7, 18], [10, 7, 18], [11, 7, 18], [12, 7, 18], [13, 8, 16], [14, 9, 14], [15, 11, 10]], sprite.shade)}
    ${rect(7, 7, 2, 2, sprite.accent)}${rect(24, 7, 2, 2, sprite.accent)}
  `;
  const face = `
    ${rows([[8, 11, 10], [9, 10, 12], [10, 9, 14], [11, 9, 14], [12, 9, 14], [13, 10, 12], [14, 11, 10]], sprite.body)}
    ${rows([[12, 12, 8], [13, 11, 10], [14, 12, 8], [15, 13, 6]], cream)}
    ${rect(11, 11, 2, 2, eye)}${rect(19, 11, 2, 2, eye)}
    ${rect(12, 11, 1, 1, shine)}${rect(20, 11, 1, 1, shine)}
    ${rect(15, 13, 2, 1, eye)}${rect(15, 14, 1, 1, eye)}${rect(17, 14, 1, 1, eye)}
    ${rect(9, 14, 2, 1, sprite.blush)}${rect(21, 14, 2, 1, sprite.blush)}
  `;
  const body = `
    ${rows([[18, 11, 10], [19, 10, 12], [20, 10, 12], [21, 11, 10], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 12, 8], [20, 11, 10], [21, 12, 8], [22, 13, 6]], sprite.body)}
    ${rect(22, 18, 5, 2, line)}${rect(25, 17, 3, 3, sprite.shade)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, sprite.ear)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, sprite.ear)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${body}
      ${mane}
      ${face}
    </svg>
  `;
}

function createTigerSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const ears = `
    ${rows([[4, 8, 3], [5, 7, 5], [6, 7, 5], [7, 8, 3]], line)}
    ${rows([[5, 9, 2], [6, 9, 2]], sprite.ear)}
    ${rows([[4, 21, 3], [5, 20, 5], [6, 20, 5], [7, 21, 3]], line)}
    ${rows([[5, 22, 2], [6, 22, 2]], sprite.ear)}
  `;
  const tail = `
    ${rows([[17, 24, 3], [18, 25, 4], [19, 25, 4], [20, 24, 5], [21, 23, 4]], line)}
    ${rows([[18, 26, 2], [20, 25, 2]], sprite.body)}
    ${rect(26, 19, 2, 1, sprite.shade)}${rect(24, 21, 2, 1, sprite.shade)}
  `;
  const head = `
    ${rows([[8, 10, 12], [9, 8, 16], [10, 7, 18], [11, 7, 18], [12, 6, 20], [13, 6, 20], [14, 7, 18], [15, 8, 16], [16, 10, 12]], line)}
    ${rows([[9, 11, 10], [10, 9, 14], [11, 9, 14], [12, 8, 16], [13, 8, 16], [14, 9, 14], [15, 11, 10]], sprite.body)}
    ${rect(15, 8, 2, 4, sprite.shade)}${rect(11, 10, 3, 1, sprite.shade)}${rect(18, 10, 3, 1, sprite.shade)}
    ${rect(8, 12, 3, 1, sprite.shade)}${rect(21, 12, 3, 1, sprite.shade)}
  `;
  const body = `
    ${rows([[18, 11, 10], [19, 10, 12], [20, 10, 12], [21, 11, 10], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 12, 8], [20, 11, 10], [21, 12, 8], [22, 13, 6]], sprite.body)}
    ${rect(12, 19, 2, 3, sprite.shade)}${rect(18, 19, 2, 3, sprite.shade)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, sprite.ear)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, sprite.ear)}
  `;
  const face = `
    ${rows([[13, 12, 8], [14, 11, 10], [15, 12, 8]], cream)}
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(15, 14, 2, 1, eye)}${rect(15, 15, 1, 1, eye)}${rect(17, 15, 1, 1, eye)}
    ${rect(9, 15, 2, 1, sprite.blush)}${rect(21, 15, 2, 1, sprite.blush)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createMonkeySvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const tail = `
    ${rows([[14, 23, 4], [15, 24, 5], [16, 25, 4], [17, 24, 5], [18, 23, 4]], line)}
    ${rows([[15, 25, 3], [16, 26, 2], [17, 25, 2]], sprite.shade)}
  `;
  const ears = `
    ${rows([[9, 4, 5], [10, 3, 7], [11, 3, 7], [12, 4, 5]], line)}
    ${rows([[10, 5, 3], [11, 5, 3]], sprite.ear)}
    ${rows([[9, 23, 5], [10, 22, 7], [11, 22, 7], [12, 23, 5]], line)}
    ${rows([[10, 24, 3], [11, 24, 3]], sprite.ear)}
  `;
  const head = `
    ${rows([[8, 10, 12], [9, 8, 16], [10, 7, 18], [11, 7, 18], [12, 6, 20], [13, 6, 20], [14, 7, 18], [15, 8, 16], [16, 10, 12]], line)}
    ${rows([[9, 11, 10], [10, 9, 14], [11, 9, 14], [12, 8, 16], [13, 8, 16], [14, 9, 14], [15, 11, 10]], sprite.body)}
    ${rows([[11, 10, 12], [12, 9, 14], [13, 10, 12], [14, 11, 10], [15, 12, 8]], cream)}
  `;
  const body = `
    ${rows([[18, 11, 10], [19, 10, 12], [20, 10, 12], [21, 11, 10], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 12, 8], [20, 11, 10], [21, 12, 8], [22, 13, 6]], sprite.shade)}
    ${rows([[20, 14, 4], [21, 13, 6]], cream)}
    ${rect(7, 19, 4, 3, line)}${rect(8, 19, 2, 2, sprite.body)}
    ${rect(22, 19, 4, 3, line)}${rect(23, 19, 2, 2, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, sprite.ear)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, sprite.ear)}
    ${rect(5, 21, 4, 1, sprite.accent)}
  `;
  const face = `
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(15, 14, 2, 1, eye)}${rect(15, 15, 1, 1, eye)}${rect(17, 15, 1, 1, eye)}
    ${rect(9, 15, 2, 1, sprite.blush)}${rect(21, 15, 2, 1, sprite.blush)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${ears}
      ${head}
      ${face}
    </svg>
  `;
}

function createBootsCatSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const tail = `
    ${rows([[17, 24, 3], [18, 25, 4], [19, 25, 4], [20, 24, 5], [21, 23, 4]], line)}
    ${rows([[18, 26, 2], [19, 26, 2], [20, 25, 2]], sprite.shade)}
  `;
  const ears = `
    ${rows([[5, 8, 3], [6, 7, 5], [7, 7, 5]], line)}
    ${rect(9, 6, 2, 2, sprite.ear)}
    ${rows([[5, 21, 3], [6, 20, 5], [7, 20, 5]], line)}
    ${rect(22, 6, 2, 2, sprite.ear)}
  `;
  const hat = `
    ${rect(11, 3, 11, 2, line)}${rect(13, 1, 7, 3, line)}
    ${rect(12, 4, 9, 1, sprite.accent)}${rect(14, 2, 5, 2, sprite.shade)}
    ${rect(20, 2, 2, 1, cream)}
  `;
  const head = `
    ${rows([[8, 10, 12], [9, 8, 16], [10, 7, 18], [11, 7, 18], [12, 6, 20], [13, 6, 20], [14, 7, 18], [15, 8, 16], [16, 10, 12]], line)}
    ${rows([[9, 11, 10], [10, 9, 14], [11, 9, 14], [12, 8, 16], [13, 8, 16], [14, 9, 14], [15, 11, 10]], sprite.body)}
  `;
  const body = `
    ${rows([[18, 11, 10], [19, 10, 12], [20, 10, 12], [21, 11, 10], [22, 12, 8], [23, 13, 6]], line)}
    ${rows([[19, 12, 8], [20, 11, 10], [21, 12, 8], [22, 13, 6]], sprite.shade)}
    ${rect(13, 20, 6, 2, sprite.accent)}
    ${rect(9, 24, 6, 3, line)}${rect(10, 24, 4, 2, sprite.accent)}
    ${rect(17, 24, 6, 3, line)}${rect(18, 24, 4, 2, sprite.accent)}
    ${rect(7, 19, 4, 3, line)}${rect(8, 19, 2, 2, sprite.body)}
    ${rect(22, 19, 4, 3, line)}${rect(23, 19, 2, 2, sprite.body)}
  `;
  const face = `
    ${rows([[13, 12, 8], [14, 11, 10], [15, 12, 8]], cream)}
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(15, 14, 2, 1, sprite.accent)}
    ${rect(15, 15, 1, 1, eye)}${rect(17, 15, 1, 1, eye)}
    ${rect(8, 14, 3, 1, line)}${rect(21, 14, 3, 1, line)}
    ${rect(9, 15, 2, 1, sprite.blush)}${rect(21, 15, 2, 1, sprite.blush)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${ears}
      ${head}
      ${face}
      ${hat}
    </svg>
  `;
}

function createElephantSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const earFill = sprite.ear;
  const leftEar = `
    ${rows([[8, 3, 7], [9, 2, 9], [10, 1, 10], [11, 1, 10], [12, 1, 10], [13, 2, 9], [14, 3, 7], [15, 4, 5]], line)}
    ${rows([[9, 4, 5], [10, 3, 6], [11, 3, 6], [12, 3, 6], [13, 4, 5], [14, 5, 3]], earFill)}
  `;
  const rightEar = `
    ${rows([[8, 22, 7], [9, 21, 9], [10, 21, 10], [11, 21, 10], [12, 21, 10], [13, 21, 9], [14, 22, 7], [15, 23, 5]], line)}
    ${rows([[9, 23, 5], [10, 23, 6], [11, 23, 6], [12, 23, 6], [13, 23, 5], [14, 24, 3]], earFill)}
  `;
  const head = `
    ${rows([[7, 10, 12], [8, 8, 16], [9, 7, 18], [10, 6, 20], [11, 6, 20], [12, 6, 20], [13, 6, 20], [14, 7, 18], [15, 8, 16], [16, 9, 14]], line)}
    ${rows([[8, 11, 10], [9, 9, 14], [10, 8, 16], [11, 8, 16], [12, 8, 16], [13, 8, 16], [14, 9, 14], [15, 10, 12]], sprite.body)}
  `;
  const body = `
    ${rows([[18, 10, 12], [19, 9, 14], [20, 9, 14], [21, 10, 12], [22, 11, 10], [23, 11, 10]], line)}
    ${rows([[19, 11, 10], [20, 11, 10], [21, 12, 8], [22, 13, 6]], sprite.shade)}
    ${rect(7, 20, 3, 3, line)}${rect(8, 20, 2, 2, sprite.body)}
    ${rect(22, 20, 3, 3, line)}${rect(22, 20, 2, 2, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, cream)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, cream)}
  `;
  const trunk = `
    ${rect(14, 14, 5, 1, line)}
    ${rect(13, 15, 7, 1, line)}${rect(15, 15, 3, 1, sprite.shade)}
    ${rect(13, 16, 6, 1, line)}${rect(15, 16, 2, 1, sprite.shade)}
    ${rect(14, 17, 5, 1, line)}${rect(15, 17, 2, 1, sprite.shade)}
    ${rect(14, 18, 5, 1, line)}${rect(15, 18, 2, 1, sprite.shade)}
    ${rect(15, 19, 5, 1, line)}${rect(16, 19, 2, 1, sprite.shade)}${rect(19, 18, 1, 1, line)}
  `;
  const face = `
    ${rect(10, 12, 2, 2, eye)}${rect(21, 12, 2, 2, eye)}
    ${rect(11, 12, 1, 1, shine)}${rect(22, 12, 1, 1, shine)}
    ${rect(8, 15, 3, 1, sprite.blush)}${rect(22, 15, 3, 1, sprite.blush)}
    ${trunk}
    ${rect(15, 10, 3, 1, shine)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${leftEar}
      ${rightEar}
      ${body}
      ${head}
      ${face}
    </svg>
  `;
}

function createBirdSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const wing = sprite.shade;
  const beak = "#ffc763";
  const outline = `
    ${rows([[8, 11, 10], [9, 9, 14], [10, 8, 16], [11, 7, 18], [12, 7, 18], [13, 6, 20], [14, 6, 20], [15, 7, 18], [16, 8, 16], [17, 9, 14], [18, 11, 10]], line)}
    ${rect(8, 7, 3, 2, line)}${rect(21, 7, 3, 2, line)}
  `;
  const body = `
    ${rows([[9, 12, 8], [10, 10, 12], [11, 9, 14], [12, 9, 14], [13, 8, 16], [14, 8, 16], [15, 9, 14], [16, 10, 12], [17, 12, 8]], sprite.body)}
    ${rows([[13, 11, 10], [14, 10, 12], [15, 11, 10], [16, 13, 6]], cream)}
    ${rect(9, 7, 2, 1, sprite.accent)}${rect(21, 7, 2, 1, sprite.accent)}
    ${rect(6, 13, 3, 3, line)}${rect(7, 13, 2, 2, wing)}
    ${rect(23, 13, 3, 3, line)}${rect(23, 13, 2, 2, wing)}
  `;
  const face = `
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(14, 14, 4, 2, beak)}${rect(15, 16, 2, 1, beak)}
    ${rect(9, 15, 3, 1, sprite.blush)}${rect(20, 15, 3, 1, sprite.blush)}
  `;
  const feet = `
    ${rect(11, 19, 4, 2, line)}${rect(12, 19, 2, 1, beak)}
    ${rect(17, 19, 4, 2, line)}${rect(18, 19, 2, 1, beak)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${outline}
      ${body}
      ${face}
      ${feet}
    </svg>
  `;
}

function createEagleSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const wing = sprite.shade;
  const beak = sprite.accent;
  const wings = `
    ${rows([[12, 3, 6], [13, 2, 8], [14, 1, 9], [15, 2, 8], [16, 3, 6], [17, 4, 4]], line)}
    ${rows([[13, 4, 4], [14, 3, 5], [15, 4, 4]], wing)}
    ${rows([[12, 23, 6], [13, 22, 8], [14, 22, 9], [15, 22, 8], [16, 23, 6], [17, 24, 4]], line)}
    ${rows([[13, 24, 4], [14, 24, 5], [15, 24, 4]], wing)}
  `;
  const body = `
    ${rows([[8, 11, 10], [9, 9, 14], [10, 8, 16], [11, 7, 18], [12, 7, 18], [13, 6, 20], [14, 6, 20], [15, 7, 18], [16, 8, 16], [17, 9, 14], [18, 11, 10]], line)}
    ${rows([[9, 12, 8], [10, 10, 12], [11, 9, 14], [12, 8, 16], [13, 8, 16], [14, 9, 14], [15, 10, 12], [16, 11, 10], [17, 13, 6]], sprite.body)}
    ${rows([[8, 12, 8], [9, 10, 12], [10, 9, 14], [11, 10, 12]], sprite.ear)}
    ${rows([[19, 11, 10], [20, 10, 12], [21, 10, 12], [22, 11, 10], [23, 12, 8]], line)}
    ${rows([[20, 12, 8], [21, 11, 10], [22, 12, 8]], sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, beak)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, beak)}
  `;
  const face = `
    ${rect(11, 11, 2, 2, eye)}${rect(19, 11, 2, 2, eye)}
    ${rect(12, 11, 1, 1, shine)}${rect(20, 11, 1, 1, shine)}
    ${rect(10, 10, 4, 1, line)}${rect(18, 10, 4, 1, line)}
    ${rect(15, 13, 2, 1, line)}${rect(14, 14, 4, 1, beak)}${rect(15, 15, 2, 1, beak)}
    ${rect(9, 15, 2, 1, sprite.blush)}${rect(21, 15, 2, 1, sprite.blush)}
  `;
  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${wings}
      ${body}
      ${face}
    </svg>
  `;
}

function createBapsaeSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const beak = "#ffc763";
  const tail = `
    ${rows([[14, 23, 4], [15, 24, 4], [16, 24, 3]], line)}
    ${rows([[15, 24, 2], [16, 25, 1]], sprite.accent)}
  `;
  const body = `
    ${rows([[8, 12, 8], [9, 10, 12], [10, 8, 16], [11, 7, 18], [12, 6, 20], [13, 6, 20], [14, 6, 20], [15, 6, 20], [16, 7, 18], [17, 8, 16], [18, 10, 12], [19, 12, 8]], line)}
    ${rows([[9, 13, 6], [10, 11, 10], [11, 9, 14], [12, 8, 16], [13, 8, 16], [14, 8, 16], [15, 8, 16], [16, 9, 14], [17, 11, 10], [18, 13, 6]], sprite.body)}
    ${rows([[14, 11, 10], [15, 10, 12], [16, 11, 10], [17, 13, 6]], cream)}
    ${rect(7, 13, 3, 3, line)}${rect(8, 13, 2, 2, sprite.shade)}
    ${rect(22, 13, 3, 3, line)}${rect(22, 13, 2, 2, sprite.shade)}
  `;
  const crest = `
    ${rect(14, 6, 2, 2, sprite.accent)}${rect(17, 5, 2, 3, sprite.accent)}
  `;
  const face = `
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(15, 14, 3, 1, beak)}${rect(16, 15, 1, 1, beak)}
    ${rect(9, 15, 2, 1, sprite.blush)}${rect(21, 15, 2, 1, sprite.blush)}
  `;
  const feet = `
    ${rect(11, 20, 4, 2, line)}${rect(12, 20, 2, 1, beak)}
    ${rect(17, 20, 4, 2, line)}${rect(18, 20, 2, 1, beak)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${crest}
      ${face}
      ${feet}
    </svg>
  `;
}

function createLizardSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const belly = "#fff8d8";
  const body = `
    ${rows([[9, 11, 10], [10, 9, 14], [11, 8, 16], [12, 7, 18], [13, 7, 18], [14, 8, 16], [15, 9, 14], [16, 11, 10]], line)}
    ${rows([[10, 12, 8], [11, 10, 12], [12, 9, 14], [13, 9, 14], [14, 10, 12], [15, 12, 8]], sprite.body)}
    ${rows([[17, 11, 10], [18, 10, 12], [19, 10, 12], [20, 11, 10], [21, 12, 8]], line)}
    ${rows([[18, 12, 8], [19, 12, 8], [20, 13, 6]], sprite.shade)}
    ${rows([[18, 14, 4], [19, 13, 6], [20, 14, 4]], belly)}
  `;
  const crest = `
    ${rect(13, 7, 2, 2, sprite.accent)}${rect(16, 6, 2, 2, sprite.accent)}${rect(19, 7, 2, 2, sprite.accent)}
  `;
  const face = `
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(14, 15, 4, 1, cream)}
    ${rect(8, 15, 3, 1, sprite.blush)}${rect(21, 15, 3, 1, sprite.blush)}
  `;
  const limbs = `
    ${rect(7, 18, 4, 3, line)}${rect(8, 18, 2, 2, sprite.body)}
    ${rect(22, 18, 4, 3, line)}${rect(22, 18, 2, 2, sprite.body)}
    ${rect(10, 22, 5, 2, line)}${rect(11, 22, 3, 1, sprite.accent)}
    ${rect(17, 22, 5, 2, line)}${rect(18, 22, 3, 1, sprite.accent)}
  `;
  const tail = `
    ${rows([[19, 22, 5], [20, 23, 5], [21, 24, 4], [22, 25, 3]], line)}
    ${rows([[20, 24, 3], [21, 25, 2]], sprite.accent)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${crest}
      ${face}
      ${limbs}
    </svg>
  `;
}

function createTricksterSvg(sprite, colors) {
  const { line, eye, shine, cream } = colors;
  const hood = `
    ${rows([[6, 10, 12], [7, 8, 16], [8, 7, 18], [9, 6, 20], [10, 6, 20], [11, 6, 20], [12, 7, 18], [13, 8, 16]], line)}
    ${rows([[7, 11, 10], [8, 9, 14], [9, 8, 16], [10, 8, 16], [11, 8, 16], [12, 10, 12]], sprite.shade)}
    ${rect(8, 5, 3, 3, line)}${rect(9, 5, 1, 2, sprite.ear)}
    ${rect(21, 5, 3, 3, line)}${rect(22, 5, 1, 2, sprite.ear)}
    ${rect(12, 5, 2, 2, sprite.accent)}${rect(18, 5, 2, 2, sprite.accent)}
  `;
  const face = `
    ${rows([[11, 10, 12], [12, 9, 14], [13, 9, 14], [14, 10, 12], [15, 11, 10]], cream)}
    ${rect(11, 12, 2, 2, eye)}${rect(19, 12, 2, 2, eye)}
    ${rect(12, 12, 1, 1, shine)}${rect(20, 12, 1, 1, shine)}
    ${rect(9, 15, 3, 1, sprite.blush)}${rect(21, 15, 3, 1, sprite.blush)}
    ${rect(15, 14, 2, 1, eye)}${rect(17, 15, 1, 1, eye)}
  `;
  const body = `
    ${rows([[17, 11, 10], [18, 10, 12], [19, 9, 14], [20, 9, 14], [21, 10, 12], [22, 11, 10], [23, 12, 8]], line)}
    ${rows([[18, 12, 8], [19, 11, 10], [20, 11, 10], [21, 12, 8], [22, 13, 6]], sprite.body)}
    ${rect(15, 19, 2, 1, sprite.accent)}${rect(14, 20, 4, 1, sprite.accent)}${rect(15, 21, 2, 1, sprite.accent)}
    ${rect(7, 19, 4, 3, line)}${rect(8, 19, 2, 2, sprite.body)}
    ${rect(22, 19, 4, 3, line)}${rect(22, 19, 2, 2, sprite.body)}
    ${rect(10, 24, 5, 2, line)}${rect(11, 24, 3, 1, sprite.ear)}
    ${rect(17, 24, 5, 2, line)}${rect(18, 24, 3, 1, sprite.ear)}
  `;
  const tail = `
    ${rows([[18, 23, 4], [19, 24, 5], [20, 25, 4], [21, 25, 3]], line)}
    ${rows([[19, 25, 3], [20, 26, 2]], sprite.accent)}
  `;

  return `
    <svg viewBox="0 0 32 32" width="124" height="124" role="img" aria-hidden="true" shape-rendering="crispEdges">
      ${tail}
      ${body}
      ${hood}
      ${face}
    </svg>
  `;
}

function renderCharacter() {
  const level = activePetLevel();
  if (headerGroupName) {
    headerGroupName.textContent = hasActiveRoom() ? (room.name || "루틴 인증방") : "Godlife Quest";
    headerGroupName.setAttribute("title", headerGroupName.textContent);
  }
  if (headerNickname) {
    headerNickname.textContent = profile.nickname || getSavedNickname() || "루틴 펫";
  }
  petName.textContent = currentPetName();
  if (petDescription) {
    petDescription.textContent = character.description || petDescriptionFor(character.id);
  }
  petRarity.textContent = character.rarityLabel || character.rarity;
  petRarity.className = `rarity-badge ${String(character.rarity || "RARE").toLowerCase()}`;
  if (petLevel) {
    petLevel.textContent = `Lv. ${level}`;
  }
  renderHeaderPetFace();
  renderSprite();
  updatePwaIdentity(character.id, currentPetName());
  syncInstallButton();
}

function selectStarter(starterId) {
  const selectedStarter = starterCharacters.find((starter) => starter.id === starterId && !starter.locked);
  const safeId = selectedStarter ? selectedStarter.id : "tori";
  if (profileStarter) {
    profileStarter.value = safeId;
  }
  if (!profile.completed && profilePetNameInput && selectedStarter && profilePetNameInput.dataset.touched !== "true") {
    profilePetNameInput.value = selectedStarter.name;
  }
  starterOptions?.querySelectorAll("[data-starter-id]").forEach((button) => {
    const selected = button.dataset.starterId === safeId;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  updatePwaIdentity(safeId, profilePetNameInput?.value || selectedStarter?.name || currentPetName());
}

function renderStarterPicker(selectedId = character.id || "tori") {
  if (!starterOptions) {
    return;
  }
  starterOptions.innerHTML = starterCharacters
    .map((starter) => {
      const preview = createPetSvg(sprites[starter.id] || sprites.tori);
      const locked = Boolean(starter.locked);
      return `
        <button class="starter-card ${locked ? "locked" : ""}" type="button" data-starter-id="${starter.id}" aria-pressed="false" ${locked ? "disabled" : ""}>
          <span class="starter-preview">${preview}</span>
          <strong>${escapeHtml(starter.name)}</strong>
          <span>${escapeHtml(starter.species)}</span>
          <em class="${starter.rarity.toLowerCase()}">${escapeHtml(starter.rarityLabel)}</em>
        </button>
      `;
    })
    .join("");
  selectStarter(selectedId);
}

function isProviderMissionLabel(value = "") {
  return /^(solar|gemini|upstage|ai)$/i.test(String(value || "").trim());
}

function stripMissionTimePrefix(value = "") {
  return String(value || "")
    .trim()
    .replace(
      /^\s*(?:(?:오전|오후)\s*)?\d{1,2}(?::\d{2}|시(?:\s*\d{1,2}\s*분?)?)\s*(?:[-~–—]\s*(?:(?:오전|오후)\s*)?\d{1,2}(?::\d{2}|시(?:\s*\d{1,2}\s*분?)?)\s*)?/,
      "",
    )
    .replace(/^[\s·:：,.-]+/, "")
    .trim();
}

function readableMissionTitle(quest = {}) {
  const title = stripMissionTimePrefix(quest.title || "");
  if (title === "체크인" && /기상|알람|일어나/.test(`${quest.type || ""} ${quest.title || ""}`)) {
    return "기상 체크인";
  }
  return title || String(quest.title || "").trim() || "루틴 미션";
}

function missionTypeLabel(value = "") {
  const type = String(value || "").trim();
  if (!type || isProviderMissionLabel(type)) {
    return "개인화";
  }
  return type;
}

function missionOpenTitle(quest = {}) {
  const title = readableMissionTitle(quest);
  if (title && !isProviderMissionLabel(title)) {
    return title;
  }
  const type = String(quest.type || "").trim();
  if (type && !isProviderMissionLabel(type)) {
    return `${type} 미션`;
  }
  return "루틴 미션";
}

// 카테고리 키를 반환하면 CSS가 data-icon 마스크로 아웃라인 아이콘을 그린다.
function questIconKey(quest = {}) {
  const text = `${quest.type || ""} ${quest.title || ""}`;
  if (/기상|알람|일어나/.test(text)) {
    return "wake";
  }
  if (/운동|건강|러닝|헬스|물/.test(text)) {
    return "health";
  }
  if (/알고리즘|공부|개발|영어|학습|문제/.test(text)) {
    return "study";
  }
  if (/회고|정리|기록|일기/.test(text)) {
    return "note";
  }
  if (quest.period === "weekly") {
    return "weekly";
  }
  if (quest.period === "monthly") {
    return "monthly";
  }
  return "star";
}

function questListAction(quest = {}) {
  const id = escapeHtml(quest.id || "");
  if (quest.state === "done") {
    return `<button class="quest-list-action done" type="button" disabled>완료</button>`;
  }
  if (quest.state === "pending" || quest.state === "edit_pending") {
    return `<button class="quest-list-action waiting" type="button" disabled>${quest.state === "edit_pending" ? "승인 대기" : "검증 대기"}</button>`;
  }
  return `<button class="quest-list-action request quest-action todo" type="button" data-quest-id="${id}">완료 요청</button>`;
}

function missionAutoProgressHtml(quest = {}) {
  const progress = quest.autoProgress || {};
  const target = Math.max(0, Math.floor(Number(progress.target || 0)));
  if (!target || !["weekly", "monthly"].includes(quest.period)) {
    return "";
  }
  const done = Math.max(0, Math.min(target, Math.floor(Number(progress.done || 0))));
  const percent = Math.round((done / target) * 100);
  return `
    <div class="mission-auto-progress ${done >= target ? "ready" : ""}" aria-label="일일 미션 누적 ${done}/${target}">
      <span><i style="width: ${percent}%"></i></span>
      <em>${done >= target ? "자동 충족" : `일일 완료 누적 ${done}/${target}`}</em>
    </div>
  `;
}

function missionPeriodShortLabel(period = "daily") {
  if (period === "weekly") {
    return "주간";
  }
  if (period === "monthly") {
    return "월간";
  }
  return "일일";
}

function createMissionListCard(quest = {}, index = 0, listId = "dailyQuestList") {
  const rewardBits = rewardBitsForQuest(quest);
  const rewardPills = rewardPillsForQuest(quest);
  const autoProgress = missionAutoProgressHtml(quest);
  return `
    <article class="quest-list-card ${escapeHtml(quest.state || "todo")}" style="--card-index: ${index % 4}">
      <span class="quest-list-icon" data-icon="${escapeHtml(questIconKey(quest))}" aria-hidden="true"></span>
      <div class="quest-list-body">
        <div class="quest-list-meta">
          <span>${escapeHtml(missionPeriodShortLabel(quest.period))} · ${escapeHtml(missionTypeLabel(quest.type))}</span>
          <em>${escapeHtml(rewardBits)}</em>
        </div>
        <strong>${escapeHtml(missionOpenTitle(quest))}</strong>
        <div class="mission-reward-pills" aria-label="미션 보상">
          ${rewardPills}
        </div>
        ${autoProgress}
        <p>${escapeHtml(quest.note || "사진 인증 후 그룹 확인")}</p>
        <div class="quest-list-actions">
          ${questListAction(quest)}
          <button class="quest-list-detail" type="button" data-open-quest-id="${escapeHtml(quest.id || "")}" data-mission-tab="${escapeHtml(listId)}">보기</button>
        </div>
      </div>
    </article>
  `;
}

function renderMissionList(listId, items = []) {
  const list = document.querySelector(`#${listId}`);
  if (!list) {
    return;
  }
  list.innerHTML = "";
  if (items.length === 0) {
    list.innerHTML = `<div class="proof-empty">아직 퀘스트가 없어요.</div>`;
    return;
  }

  const nextQuest = items.find((quest) => quest.state !== "done") || items[0];
  selectedQuestByList[listId] = selectedQuestByList[listId] || nextQuest.id;
  const cards = items.map((quest, index) => createMissionListCard(quest, index, listId)).join("");

  const stage = document.createElement("div");
  stage.className = "mission-stage";
  stage.innerHTML = `
    <div class="mission-card-list" aria-label="퀘스트 목록">
      ${cards}
    </div>
  `;
  list.appendChild(stage);
}

function syncMissionCategoryPanels() {
  document.querySelectorAll("[data-mission-category]").forEach((section) => {
    const key = section.dataset.missionCategory;
    const isOpen = Boolean(missionCategoryOpen[key]);
    section.classList.toggle("open", isOpen);
    const toggle = section.querySelector("[data-toggle-mission-category]");
    toggle?.setAttribute("aria-expanded", String(isOpen));
  });
}

function questStateLabel(state = "todo") {
  if (state === "done") {
    return "완료";
  }
  if (state === "edit_pending") {
    return "승인중";
  }
  if (state === "pending") {
    return "검증중";
  }
  return "열기";
}

function createQuestCard(quest) {
  const rewardBits = rewardBitsForQuest(quest);
  const rewardPills = rewardPillsForQuest(quest);
  const autoProgress = missionAutoProgressHtml(quest);
  const displayTitle = missionOpenTitle(quest);
  const statusOnly = quest.state === "pending" || quest.state === "edit_pending";
  const links = (quest.links || [])
    .map(
      (link) => `
        <a class="quest-link" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">
          ${escapeHtml(link.label)}
        </a>
      `,
    )
    .join("");
  return `
    <article class="quest-item ${quest.state || "todo"}">
      <div class="quest-main">
        <div class="quest-topline">
          <span class="quest-type ${escapeHtml(quest.period || "")}">${escapeHtml(missionPeriodShortLabel(quest.period))} · ${escapeHtml(missionTypeLabel(quest.type))}</span>
          <span class="quest-reward">${rewardTextHtml(rewardBits)}</span>
        </div>
        <h3>${escapeHtml(displayTitle)}</h3>
        <div class="mission-reward-pills" aria-label="미션 보상">
          ${rewardPills}
        </div>
        ${autoProgress}
        <p>${escapeHtml(quest.note)}</p>
        <div class="quest-links" aria-label="${escapeHtml(displayTitle)} 바로가기">
          ${links}
          <button class="link-add" type="button" data-quest-id="${escapeHtml(quest.id)}">+ 링크</button>
        </div>
      </div>
      <div class="quest-actions">
        <button class="quest-action ${quest.state}" type="button" data-quest-id="${escapeHtml(quest.id)}" ${statusOnly ? "disabled" : ""}>
          ${escapeHtml(quest.action)}
        </button>
        ${quest.state !== "done" ? `<button class="quest-edit" type="button" data-edit-quest-id="${escapeHtml(quest.id)}" ${quest.state === "edit_pending" ? "disabled" : ""}>대체 미션 제안</button>` : ""}
        ${quest.state === "done" ? `<button class="quest-share" type="button" data-share-quest-id="${escapeHtml(quest.id)}">펫 공유</button>` : ""}
      </div>
    </article>
  `;
}

function openQuestModal(questId) {
  openQuestId = questId || "";
  renderQuestModal();
  questModal?.classList.remove("hidden");
}

function closeQuestModal() {
  openQuestId = "";
  questModal?.classList.add("hidden");
}

function questListIdForQuest(questId) {
  const buckets = [
    ["dailyQuestList", missions.daily?.items || []],
    ["weeklyQuestList", missions.weekly?.items || []],
    ["monthlyQuestList", missions.monthly?.items || []],
  ];
  const match = buckets.find(([, items]) => items.some((item) => item.id === questId));
  return match?.[0] || "dailyQuestList";
}

function questNavigation(questId) {
  const listId = questListIdForQuest(questId);
  const items = missionItemsForList(listId);
  const currentIndex = Math.max(0, items.findIndex((item) => item.id === questId));
  const total = items.length;
  if (total <= 1) {
    return { listId, items, currentIndex, total, previous: null, next: null };
  }
  return {
    listId,
    items,
    currentIndex,
    total,
    previous: items[(currentIndex - 1 + total) % total],
    next: items[(currentIndex + 1) % total],
  };
}

function moveQuest(offset = 1) {
  if (!openQuestId) {
    return;
  }
  const navigation = questNavigation(openQuestId);
  if (navigation.total <= 1) {
    return;
  }
  const nextIndex = (navigation.currentIndex + offset + navigation.total) % navigation.total;
  const nextQuest = navigation.items[nextIndex];
  if (!nextQuest) {
    return;
  }
  selectedQuestByList[navigation.listId] = nextQuest.id;
  openQuestId = nextQuest.id;
  renderQuestModal(openQuestId);
}

function renderQuestModal(questId = openQuestId) {
  if (!questModal || !questModalContent || !questModalHeading || !questModalMeta) {
    return;
  }
  const quest = findQuestById(questId);
  if (!quest) {
    if (!questModal.classList.contains("hidden")) {
      closeQuestModal();
    }
    return;
  }
  const periodLabel = {
    daily: "일일 퀘스트",
    weekly: "주간 퀘스트",
    monthly: "월간 퀘스트",
  }[quest.period] || "퀘스트";
  const navigation = questNavigation(quest.id);
  const canPage = navigation.total > 1;
  questModalHeading.textContent = missionOpenTitle(quest);
  questModalMeta.textContent = `${periodLabel} · ${missionTypeLabel(quest.type)} · ${questStateLabel(quest.state)}`;
  questModalContent.innerHTML = `
    <div class="quest-swipe-shell" data-quest-swipe-shell>
      ${canPage ? `<div class="quest-swipe-hint" aria-hidden="true">
        <span>‹</span>
        드래그해서 미션 넘기기
        <span>›</span>
      </div>` : ""}
      ${createQuestCard(quest)}
      ${canPage ? `<div class="quest-pager" aria-label="미션 이동">
        <button type="button" data-quest-move="-1" ${navigation.previous ? "" : "disabled"}>이전</button>
        <span>${navigation.total ? navigation.currentIndex + 1 : 0}/${navigation.total || 0}</span>
        <button type="button" data-quest-move="1" ${navigation.next ? "" : "disabled"}>다음</button>
      </div>` : ""}
    </div>
  `;
}

function renderQuests() {
  quests = missions.daily?.items || quests;
  renderMissionOverview();
  renderMissionList("dailyQuestList", missions.daily?.items || []);
  renderMissionList("weeklyQuestList", missions.weekly?.items || []);
  renderMissionList("monthlyQuestList", missions.monthly?.items || []);
  syncMissionCategoryPanels();
}

function rewardBitsForQuest(quest) {
  const reward = quest.reward || {};
  const parts = [];
  if (reward.xp) {
    parts.push(`+${reward.xp} XP`);
  }
  if (reward.coin) {
    parts.push(`+${reward.coin}코인`);
  }
  if (reward.bond) {
    parts.push(`우정 +${reward.bond}`);
  }
  return parts.slice(0, 2).join(" · ") || "보상";
}

function rewardPillsForQuest(quest) {
  const reward = quest.reward || {};
  const pills = [];
  if (reward.xp) {
    pills.push({ className: "xp", srLabel: "XP", label: `+${Math.round(Number(reward.xp))}` });
  }
  if (reward.coin) {
    pills.push({ className: "coin", srLabel: "코인", label: `+${Math.round(Number(reward.coin))}` });
  }
  if (reward.bond) {
    pills.push({ className: "bond", srLabel: "우정", label: `+${Math.round(Number(reward.bond))}` });
  }
  if (reward.health) {
    pills.push({ className: "health", srLabel: "컨디션", label: `+${Math.round(Number(reward.health))}` });
  }
  return pills.slice(0, 4).map((pill) => (
    `<span class="reward-pill ${escapeHtml(pill.className)}" aria-label="${escapeHtml(`${pill.srLabel} ${pill.label}`)}">${escapeHtml(pill.label)}</span>`
  )).join("");
}

function allMissionItems() {
  return [
    ...(missions.daily?.items || []),
    ...(missions.weekly?.items || []),
    ...(missions.monthly?.items || []),
  ];
}

function findQuestById(id) {
  return allMissionItems().find((item) => item.id === id);
}

function missionItemsForList(listId) {
  if (listId === "weeklyQuestList") {
    return missions.weekly?.items || [];
  }
  if (listId === "monthlyQuestList") {
    return missions.monthly?.items || [];
  }
  return missions.daily?.items || [];
}

function homeMissionStatusText(quest) {
  if (!quest) {
    return "대기";
  }
  if (quest.state === "done") {
    return "완료";
  }
  if (quest.state === "pending") {
    return "검증중";
  }
  if (quest.state === "edit_pending") {
    return "승인중";
  }
  return "진행";
}

function homeMissionHintText(quest, allDone = false) {
  if (!quest) {
    return allDone ? "펫 소식으로 공유하기" : "다음 미션을 확인해요";
  }
  if (quest.state === "todo") {
    return "드래그해서 넘기고, 눌러서 바로 사진 인증";
  }
  if (quest.state === "pending") {
    return "그룹 확인을 기다리는 중";
  }
  if (quest.state === "edit_pending") {
    return "대체 미션 승인 대기";
  }
  if (quest.state === "done") {
    return "완료한 미션 보기";
  }
  return "드래그해서 다른 미션 보기";
}

function selectHomeMission(dailyItems, nextMission) {
  if (!dailyItems.length) {
    homeMissionSelectedId = "";
    return null;
  }
  const current = dailyItems.find((item) => item.id === homeMissionSelectedId);
  if (current) {
    return current;
  }
  const fallback = nextMission || dailyItems.find((item) => item.state !== "done") || dailyItems[0];
  homeMissionSelectedId = fallback?.id || "";
  return fallback || null;
}

function moveHomeMission(direction) {
  const dailyItems = missions.daily?.items || [];
  if (dailyItems.length <= 1) {
    return;
  }
  const currentIndex = Math.max(0, dailyItems.findIndex((item) => item.id === homeMissionSelectedId));
  const nextIndex = (currentIndex + direction + dailyItems.length) % dailyItems.length;
  homeMissionSelectedId = dailyItems[nextIndex].id;
  renderMissionOverview();
}

function selectNextQuestFromState(nextState, questId) {
  const buckets = [
    ["dailyQuestList", nextState.missions?.daily?.items || []],
    ["weeklyQuestList", nextState.missions?.weekly?.items || []],
    ["monthlyQuestList", nextState.missions?.monthly?.items || []],
  ];
  const [listId, items] = buckets.find(([, bucketItems]) => bucketItems.some((item) => item.id === questId)) || [];
  if (!listId) {
    return "";
  }
  const currentIndex = items.findIndex((item) => item.id === questId);
  const nextOpen = items.slice(currentIndex + 1).find((item) => item.state !== "done")
    || items.find((item) => item.state !== "done")
    || items[currentIndex];
  if (nextOpen) {
    selectedQuestByList[listId] = nextOpen.id;
    return nextOpen.id;
  }
  return "";
}

function renderMissionOverview() {
  const dailyItems = missions.daily?.items || [];
  const doneCount = dailyItems.filter((item) => item.state === "done").length;
  const nextTodoMission = dailyItems.find((item) => item.state === "todo");
  const nextPendingMission = dailyItems.find((item) => item.state === "pending");
  const nextMission = nextTodoMission || nextPendingMission;
  const selectedMission = selectHomeMission(dailyItems, nextMission);
  const pendingInfo = pendingGroupApprovalInfo();
  renderHomeProofBubble(pendingInfo);
  const summary = document.querySelector("#dailyMissionSummary");
  const hint = document.querySelector("#nextMissionHint");
  const homeMissionCard = document.querySelector("#homeMissionCard");
  const homeMissionState = document.querySelector("#homeMissionState");
  const homeMissionTitle = document.querySelector("#homeMissionTitle");
  const total = dailyItems.length || 5;
  const selectedIndex = selectedMission ? dailyItems.findIndex((item) => item.id === selectedMission.id) : -1;
  const allDone = dailyItems.length > 0 && doneCount >= dailyItems.length;
  if (summary) {
    summary.textContent = `${doneCount}/${total} 완료`;
  }
  if (homeMissionState) {
    homeMissionState.textContent = selectedMission
      ? `오늘 ${selectedIndex + 1}/${total}`
      : `오늘 ${doneCount}/${total}`;
  }
  if (homeMissionTitle) {
    homeMissionTitle.textContent = selectedMission ? missionOpenTitle(selectedMission) : "오늘 미션 완료";
  }
  if (hint) {
    hint.textContent = homeMissionHintText(selectedMission, allDone);
  }
  if (homeMissionCard) {
    delete homeMissionCard.dataset.homeProofId;
    delete homeMissionCard.dataset.homeAttendance;
    delete homeMissionCard.dataset.homeApproveProofId;
    delete homeMissionCard.dataset.homeMode;
    delete homeMissionCard.dataset.panelJump;
    delete homeMissionCard.dataset.openQuestId;
    delete homeMissionCard.dataset.missionTab;
    homeMissionCard.dataset.homeAction = "열기";
    homeMissionCard.dataset.homeMissionIndex = selectedIndex >= 0 ? String(selectedIndex + 1) : "0";
    homeMissionCard.dataset.homeMissionTotal = String(total);
    homeMissionCard.dataset.swipeable = dailyItems.length > 1 ? "true" : "false";
    if (selectedMission?.state === "todo") {
      homeMissionCard.dataset.homeProofId = selectedMission.id;
      homeMissionCard.dataset.homeAction = "인증";
    } else if (selectedMission?.state === "pending" || selectedMission?.state === "edit_pending") {
      homeMissionCard.dataset.panelJump = "verify";
      homeMissionCard.dataset.homeAction = "대기";
    } else if (selectedMission?.id) {
      homeMissionCard.dataset.openQuestId = selectedMission.id;
      homeMissionCard.dataset.missionTab = "dailyQuestList";
      homeMissionCard.dataset.homeAction = "보기";
    } else {
      homeMissionCard.dataset.panelJump = "brag";
      homeMissionCard.dataset.homeAction = "공유";
    }
  }
}

function renderChat() {
  const thread = document.querySelector(".chat-thread");
  if (!thread) {
    return;
  }
  thread.innerHTML = "";
  if (!room || room.status === "closed") {
    thread.innerHTML = `<div class="proof-empty">그룹 방을 만들면 대화와 인증 흐름이 시작돼요.</div>`;
    return;
  }
  const activeMessages = Array.isArray(room?.messages) && room.messages.length > 0
    ? room.messages.map((chat) => ({ ...chat, mine: chat.userId === userId }))
    : [];
  if (activeMessages.length === 0) {
    thread.innerHTML = `<div class="proof-empty">아직 방 메시지가 없어요. 그룹에 응원을 보내보세요.</div>`;
    return;
  }
  const maxVisibleMessages = 5;
  const visibleMessages = activeMessages.slice(-maxVisibleMessages);
  const hiddenCount = Math.max(0, activeMessages.length - visibleMessages.length);
  if (hiddenCount > 0) {
    const note = document.createElement("div");
    note.className = "chat-history-note";
    note.textContent = `최근 ${visibleMessages.length}개만 표시 · 이전 ${hiddenCount}개 보관`;
    thread.appendChild(note);
  }
  visibleMessages.forEach((chat) => {
    const bubble = document.createElement("div");
    bubble.className = chat.mine ? "chat-bubble mine" : "chat-bubble";
    bubble.innerHTML = `<span>${escapeHtml(chat.name)}</span><p>${escapeHtml(cozyAppMessage(chat.message))}</p>`;
    thread.appendChild(bubble);
  });
  thread.scrollTop = thread.scrollHeight;
}

const cozyPokeWords = ["당근", "딸기", "솜사탕", "복숭아", "푸딩", "별사탕", "마시멜로", "메론빵"];

function cozyPokeWord(seed = "") {
  const text = String(seed || "godlife");
  let hash = 0;
  for (const char of text) {
    hash = (hash + char.codePointAt(0)) % 997;
  }
  return cozyPokeWords[hash % cozyPokeWords.length];
}

function cozyPokeWordFrom(seed = "") {
  const value = String(seed || "");
  const existingWord = cozyPokeWords.find((word) => value.includes(word));
  if (existingWord) {
    return existingWord;
  }
  if (/응원|찔렀어요|불렀어요/.test(value)) {
    return "딸기";
  }
  return cozyPokeWord(value);
}

function hasFinalConsonant(text = "") {
  const word = String(text || "").trim();
  if (!word) {
    return false;
  }
  const code = word.codePointAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

function cozyPokeObject(seed = "") {
  const word = cozyPokeWordFrom(seed);
  return `${word}${hasFinalConsonant(word) ? "을" : "를"}`;
}

function cozyPokeSubject(seed = "") {
  const word = cozyPokeWordFrom(seed);
  return `${word}${hasFinalConsonant(word) ? "이" : "가"}`;
}

function cozyAppMessage(text = "") {
  const value = String(text || "").trim();
  if (!value) {
    return "";
  }
  const groupTreatPoke = value.match(/^(.+?)님이 (.+?)님에게 (.+?)(?:을|를) 보냈어요\.$/);
  if (groupTreatPoke) {
    return `${groupTreatPoke[1]}님이 ${groupTreatPoke[2]}님에게 ${cozyPokeObject(groupTreatPoke[3])} 보냈어요.`;
  }
  const ownTreatPoke = value.match(/^(.+?)님에게 (.+?)(?:을|를) 보냈어요\.$/);
  if (ownTreatPoke) {
    return `${ownTreatPoke[1]}님에게 ${cozyPokeObject(ownTreatPoke[2])} 보냈어요.`;
  }
  const ownTreatPokeMood = value.match(/^(.+?)님에게 (.+?)(?:을|를) 보냈어요\. 살금살금 같이 가요\.$/);
  if (ownTreatPokeMood) {
    return `${ownTreatPokeMood[1]}님에게 ${cozyPokeObject(ownTreatPokeMood[2])} 보냈어요. 살금살금 같이 가요.`;
  }
  const receivedTreatPoke = value.match(/^(.+?)님이 (.+?)(?:을|를) 보냈어요\. 미션 하나만 살짝 해볼까요\?$/);
  if (receivedTreatPoke) {
    return `${receivedTreatPoke[1]}님이 ${cozyPokeObject(receivedTreatPoke[2])} 보냈어요. 미션 하나만 살짝 해볼까요?`;
  }
  const groupTreatCheer = value.match(/^(.+?)님이 (.+?)님에게 (.+?) 응원을 톡 보냈어요\.$/);
  if (groupTreatCheer) {
    return `${groupTreatCheer[1]}님이 ${groupTreatCheer[2]}님에게 ${cozyPokeObject(groupTreatCheer[3])} 보냈어요.`;
  }
  const ownTreatCheer = value.match(/^(.+?)님에게 (.+?) 응원을 보냈어요\.$/);
  if (ownTreatCheer) {
    return `${ownTreatCheer[1]}님에게 ${cozyPokeObject(ownTreatCheer[2])} 보냈어요.`;
  }
  const ownTreatCheerMood = value.match(/^(.+?)님에게 (.+?) 응원을 톡 보냈어요\. 살금살금 같이 가요\.$/);
  if (ownTreatCheerMood) {
    return `${ownTreatCheerMood[1]}님에게 ${cozyPokeObject(ownTreatCheerMood[2])} 보냈어요. 살금살금 같이 가요.`;
  }
  const receivedTreatCheer = value.match(/^(.+?) 응원이 도착했어요\. 미션 하나만 살짝 해볼까요\?$/);
  if (receivedTreatCheer) {
    return `${cozyPokeSubject(receivedTreatCheer[1])} 도착했어요. 미션 하나만 살짝 해볼까요?`;
  }
  const groupSoftPoke = value.match(/^(.+?)님이 (.+?)님에게 작은 응원을 톡 보냈어요\.$/);
  if (groupSoftPoke) {
    return `${groupSoftPoke[1]}님이 ${groupSoftPoke[2]}님에게 ${cozyPokeObject(value)} 보냈어요.`;
  }
  const ownSoftPokeMood = value.match(/^(.+?)님에게 응원을 톡 보냈어요\. 천천히 같이 걸어요\.$/);
  if (ownSoftPokeMood) {
    return `${ownSoftPokeMood[1]}님에게 ${cozyPokeObject(value)} 보냈어요. 살금살금 같이 가요.`;
  }
  const ownSoftPoke = value.match(/^(.+?)님에게 응원을 보냈어요\.$/);
  if (ownSoftPoke) {
    return `${ownSoftPoke[1]}님에게 ${cozyPokeObject(value)} 보냈어요.`;
  }
  const groupPoke = value.match(/^(.+?)님이 (.+?)님을 (?:콕|꼭) 찔렀어요\. 오늘 루틴 같이 가요\.$/);
  if (groupPoke) {
    return `${groupPoke[1]}님이 ${groupPoke[2]}님에게 ${cozyPokeObject(value)} 보냈어요.`;
  }
  const ownPokeMood = value.match(/^(.+?)님을 (?:콕|꼭) 찔렀어요\. 같이 움직이면 더 오래 가요\.$/);
  if (ownPokeMood) {
    return `${ownPokeMood[1]}님에게 ${cozyPokeObject(value)} 보냈어요. 살금살금 같이 가요.`;
  }
  const ownPoke = value.match(/^(.+?)님을 (?:콕|꼭) 찔렀어요\.$/);
  if (ownPoke) {
    return `${ownPoke[1]}님에게 ${cozyPokeObject(value)} 보냈어요.`;
  }
  if (/^(?:콕|꼭) 찔렀어요\. 오늘 미션 하나 같이 시작해요\.$/.test(value)) {
    return `${cozyPokeSubject(value)} 도착했어요. 미션 하나만 살짝 해볼까요?`;
  }
  if (/^작은 응원이 도착했어요\. 미션 하나만 살짝 해볼까요\?$/.test(value)) {
    return `${cozyPokeSubject(value)} 도착했어요. 미션 하나만 살짝 해볼까요?`;
  }
  const pushPoke = value.match(/^(.+?)님이 오늘 루틴 같이 하자고 불렀어요\.$/);
  if (pushPoke) {
    return `${pushPoke[1]}님이 ${cozyPokeObject(value)} 보냈어요.`;
  }
  return value;
}

function notificationReadKey() {
  return `godlife-read-notifications:${userId || "guest"}`;
}

function readNotificationIdSet() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(notificationReadKey()) || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function saveReadNotificationIds(readIds) {
  const ids = Array.from(readIds).filter(Boolean).slice(-80);
  window.localStorage.setItem(notificationReadKey(), JSON.stringify(ids));
}

function messageNotificationId(message = {}) {
  return [
    "message",
    message.id || "",
    message.createdAt || "",
    message.name || "",
    message.message || "",
  ].join(":");
}

function notificationItems() {
  const items = [];
  if (gameState.mood) {
    items.push({ id: `mood:${gameState.mood}`, icon: "펫", title: "펫 상태", text: cozyAppMessage(gameState.mood) });
  }
  const roomPendingProofs = (room?.proofs || []).filter((proof) => proof.status !== "approved" && proof.userId !== userId);
  if (roomPendingProofs.length > 0) {
    const proofIds = roomPendingProofs.map((proof) => proof.id || proof.questTitle || "").join("|");
    const firstProof = roomPendingProofs[0];
    const editCount = roomPendingProofs.filter((proof) => proof.kind === "mission_edit").length;
    items.push({
      id: `room-proof:${proofIds}`,
      icon: "인증",
      title: editCount > 0 ? `대체 미션 승인 ${editCount}건` : `그룹 인증 요청 ${roomPendingProofs.length}건`,
      text: firstProof.kind === "mission_edit"
        ? `${firstProof.author || "그룹원"} · ${firstProof.proposed?.title || "대체 미션"}`
        : `${firstProof.author || "그룹원"} · ${firstProof.questTitle || "미션 확인"}`,
    });
  }
  const pendingProofs = proofs.filter((proof) => proof.status !== "approved");
  if (pendingProofs.length > 0) {
    const proofIds = pendingProofs.map((proof) => proof.id || proof.questTitle || "").join("|");
    const firstProof = pendingProofs[0];
    const editCount = pendingProofs.filter((proof) => proof.kind === "mission_edit").length;
    items.push({
      id: `own-proof:${proofIds}`,
      icon: "인증",
      title: editCount > 0 ? `대체 미션 승인 대기 ${editCount}건` : `그룹 확인 대기 ${pendingProofs.length}건`,
      text: firstProof.kind === "mission_edit"
        ? firstProof.proposed?.title || "대체 미션이 그룹 승인을 기다려요."
        : firstProof.questTitle || "사진 인증이 그룹 승인을 기다려요.",
    });
  }
  if (gameState.lastCompletedMission?.title) {
    items.push({
      id: `completed:${gameState.lastCompletedMission.id || gameState.lastCompletedMission.title}:${gameState.lastCompletedMission.completedAt || ""}`,
      icon: "완료",
      title: "최근 성공",
      text: `${gameState.lastCompletedMission.title} 완료. 펫 소식에 공유할 수 있어요.`,
    });
  }
  messages
    .slice(-5)
    .reverse()
    .forEach((message) => {
      items.push({
        id: messageNotificationId(message),
        icon: message.mine ? "나" : "그룹",
        title: message.name || (message.mine ? "나" : "그룹원"),
        text: cozyAppMessage(message.message),
      });
    });
  return items.slice(0, 8);
}

function unreadNotificationCount() {
  const readIds = readNotificationIdSet();
  return notificationItems().filter((item) => !readIds.has(item.id)).length;
}

function updateAppBadge(count = unreadNotificationCount()) {
  const safeCount = Math.max(0, Math.min(99, Math.floor(Number(count || 0))));
  try {
    if (safeCount > 0 && "setAppBadge" in navigator) {
      navigator.setAppBadge(safeCount);
    } else if (safeCount === 0 && "clearAppBadge" in navigator) {
      navigator.clearAppBadge();
    }
  } catch {
    // Badge support is limited to installed web apps on iOS/iPadOS.
  }
}

function isPushNotificationSupported() {
  return Boolean(
    "serviceWorker" in navigator
    && "PushManager" in window
    && "Notification" in window
    && window.isSecureContext,
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = `${base64String}${padding}`.replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

function currentPushPermissionLabel(subscription = null) {
  if (!isPushNotificationSupported()) {
    return isAppleMobileInstallBrowser()
      ? "홈 화면 앱에서 사용 가능"
      : "이 브라우저는 앱 알림을 지원하지 않아요";
  }
  if (Notification.permission === "denied") {
    return "설정에서 알림을 다시 켤 수 있어요";
  }
  if (Notification.permission === "granted" && subscription) {
    return "";
  }
  if (Notification.permission === "granted") {
    return "알림 준비 완료";
  }
  return "미션 소식만 살짝 알려드려요";
}

async function refreshPushStatus() {
  if (!pushSettingsCard || pushStatusRefreshing) {
    return;
  }
  pushStatusRefreshing = true;
  try {
    let subscription = null;
    if (isPushNotificationSupported()) {
      const registration = await navigator.serviceWorker.ready.catch(() => null);
      subscription = await registration?.pushManager?.getSubscription?.();
    }
    const supported = isPushNotificationSupported();
    pushSettingsCard.classList.toggle("unsupported", !supported);
    pushSettingsCard.classList.toggle("enabled", Boolean(subscription && Notification.permission === "granted"));
    if (pushSettingsTitle) {
      pushSettingsTitle.textContent = subscription ? "앱 알림 켜짐" : "앱 알림";
    }
    if (pushSettingsStatus) {
      pushSettingsStatus.textContent = currentPushPermissionLabel(subscription);
    }
    if (pushEnableButton) {
      pushEnableButton.disabled = !supported || Notification.permission === "denied";
      pushEnableButton.textContent = subscription && Notification.permission === "granted" ? "끄기" : "켜기";
      pushEnableButton.setAttribute("aria-pressed", subscription && Notification.permission === "granted" ? "true" : "false");
    }
  } finally {
    pushStatusRefreshing = false;
  }
}

async function currentPushSubscription() {
  if (!isPushNotificationSupported()) {
    return null;
  }
  const registration = await navigator.serviceWorker.ready.catch(() => null);
  return await registration?.pushManager?.getSubscription?.() || null;
}

async function enablePushNotifications() {
  if (!isPushNotificationSupported()) {
    petMood.textContent = isAppleMobileInstallBrowser()
      ? "홈 화면에 추가한 앱에서 알림을 켤 수 있어요"
      : "이 브라우저는 앱 알림을 지원하지 않아요";
    showReward("알림 제한");
    await refreshPushStatus();
    return;
  }
  const registration = await navigator.serviceWorker.ready;
  let permission = Notification.permission;
  if (permission === "default") {
    permission = await Notification.requestPermission();
  }
  if (permission !== "granted") {
    petMood.textContent = "알림 권한이 필요해요";
    showReward("권한 필요");
    await refreshPushStatus();
    return;
  }
  const keyResponse = await fetch("/api/push/public-key", { cache: "no-store", headers: headers() });
  const keyData = await keyResponse.json().catch(() => ({}));
  if (!keyResponse.ok || !keyData.publicKey) {
    throw new Error("알림 키를 불러오지 못했어요");
  }
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(keyData.publicKey),
    });
  }
  const result = await api("/api/push/subscribe", {
    subscription: subscription.toJSON ? subscription.toJSON() : subscription,
    platform: isAppleMobileInstallBrowser() ? "ios-pwa" : navigator.platform || "web",
  });
  applyState(result.state, result.reward, { animate: false });
  petMood.textContent = "알림 켜짐. 필요한 소식만 살짝 알려드릴게요";
  updateAppBadge();
  await refreshPushStatus();
}

async function disablePushNotifications() {
  const subscription = await currentPushSubscription();
  if (subscription) {
    try {
      await subscription.unsubscribe();
    } catch {
      // Server-side unsubscribe still clears the saved subscription.
    }
  }
  const result = await api("/api/push/unsubscribe");
  applyState(result.state, result.reward, { animate: false });
  petMood.textContent = "알림을 잠시 쉬어요";
  updateAppBadge(0);
  await refreshPushStatus();
}

async function togglePushNotifications() {
  const subscription = await currentPushSubscription();
  if (subscription && Notification.permission === "granted") {
    await disablePushNotifications();
    return;
  }
  await enablePushNotifications();
}

function renderNotifications(options = {}) {
  if (!notificationList || !notificationCount) {
    return;
  }
  const items = notificationItems();
  const readIds = readNotificationIdSet();
  const visibleItems = items.filter((item) => !readIds.has(item.id));
  if (options.markRead) {
    visibleItems.forEach((item) => readIds.add(item.id));
    saveReadNotificationIds(readIds);
  }
  const unreadCount = items.filter((item) => !readIds.has(item.id)).length;
  const displayItems = items;
  notificationCount.textContent = Math.min(9, unreadCount);
  notificationButton?.classList.toggle("all-read", unreadCount === 0);
  updateAppBadge(unreadCount);
  refreshPushStatus();
  notificationList.innerHTML = displayItems.length > 0
    ? displayItems
        .map(
          (item) => {
            const isRead = readIds.has(item.id);
            return `
            <article class="notification-item ${isRead ? "read" : "unread"}">
              <span class="notification-icon">${escapeHtml(item.icon)}</span>
              <div>
                <strong><span>${escapeHtml(item.title)}</span><em>${isRead ? "읽음" : "새 알림"}</em></strong>
                <p>${escapeHtml(item.text)}</p>
              </div>
            </article>
          `;
          },
        )
        .join("")
    : `<div class="proof-empty">아직 알림이 없어요.</div>`;
}

function openNotificationModal() {
  renderNotifications({ markRead: true });
  notificationModal?.classList.remove("hidden");
}

function closeNotificationModal() {
  notificationModal?.classList.add("hidden");
}

function renderProofs() {
  const cards = document.querySelector("#proofList");
  if (!cards) {
    return;
  }
  cards.innerHTML = "";
  if (!room || room.status === "closed") {
    cards.innerHTML = `<div class="proof-empty">그룹 방을 만들거나 참가하면 사진 인증 요청이 여기에 떠요.</div>`;
    return;
  }
  const roomPendingProofs = (room?.proofs || [])
    .filter((proof) => proof.status !== "approved" && proof.userId !== userId && !locallyResolvedProofIds.has(String(proof.id || "")))
    .map((proof) => ({
      ...proof,
      canApprove: true,
      scopeLabel: proof.kind === "mission_edit"
        ? `${proof.author || "그룹원"}의 대체 미션`
        : `${proof.author || "그룹원"}이 보낸 인증`,
      actionLabel: proof.kind === "mission_edit" ? "내가 승인할 차례" : "내가 확인할 차례",
    }));
  const knownProofIds = new Set((room?.proofs || []).flatMap((proof) => [
    proof.id,
    proof.missionId,
    proof.questId,
  ].map((value) => String(value || "")).filter(Boolean)));
  const snapshotPendingProofs = (room?.members || [])
    .filter((member) => member?.userId && member.userId !== userId)
    .flatMap((member) => (member.snapshot?.missions || [])
      .filter((mission) => (
        (mission.state === "pending" && mission.proofId)
        || (mission.state === "edit_pending" && mission.editRequestId)
      ))
      .map((mission) => {
        const proofId = mission.state === "edit_pending" ? mission.editRequestId : mission.proofId;
        return {
          id: proofId,
          kind: mission.state === "edit_pending" ? "mission_edit" : "",
          userId: member.userId,
          author: member.name || "그룹원",
          missionId: mission.id,
          missionPeriod: mission.period || "daily",
          missionType: mission.type || "미션",
          questTitle: mission.title || "미션 인증",
          note: mission.note || "그룹원이 확인을 기다리고 있어요.",
          performedAt: mission.requestedAt ? String(mission.requestedAt).slice(0, 10) : "",
          status: "pending",
          canApprove: true,
          scopeLabel: mission.state === "edit_pending"
            ? `${member.name || "그룹원"}의 대체 미션`
            : `${member.name || "그룹원"}이 보낸 인증`,
          actionLabel: mission.state === "edit_pending" ? "내가 승인할 차례" : "내가 확인할 차례",
          fromSnapshot: true,
        };
      }))
    .filter((proof) => proof.id && !knownProofIds.has(proof.id) && !locallyResolvedProofIds.has(String(proof.id || "")));
  const ownPendingProofs = proofs
    .filter((proof) => proof.status !== "approved")
    .map((proof) => ({
      ...proof,
      canApprove: false,
      scopeLabel: proof.kind === "mission_edit" ? "내가 보낸 대체 미션" : "내가 보낸 인증",
      actionLabel: proof.kind === "mission_edit" ? "그룹 승인 기다리는 중" : "그룹 확인 기다리는 중",
    }));
  const pendingProofs = [...roomPendingProofs, ...snapshotPendingProofs, ...ownPendingProofs];
  if (pendingProofs.length === 0) {
    cards.innerHTML = `<div class="proof-empty">대기 중인 인증 요청이 없어요. 미션 카드에서 인증을 보내면 여기에 떠요.</div>`;
    return;
  }
  pendingProofs.forEach((proof) => {
    const card = document.createElement("article");
    const isEditRequest = proof.kind === "mission_edit";
    const isLateProof = !isEditRequest && proof.performedAt && proof.performedAt !== today();
    const proposed = proof.proposed || {};
    const proofVisual = isEditRequest
      ? `<div class="proof-edit-icon" aria-hidden="true">수정</div>`
      : proof.photo
        ? `<img src="${proof.photo}" alt="${escapeHtml(proof.questTitle)} 인증 사진" />`
        : `<div class="proof-photo-fallback" aria-hidden="true">사진 없음</div>`;
    card.className = `proof-card ${proof.canApprove ? "shared" : "mine"} ${isEditRequest ? "mission-edit" : ""}`;
    card.innerHTML = `
      ${proofVisual}
      <div>
        <span class="label">${escapeHtml(isEditRequest ? "대체 미션 승인" : proof.actionLabel)}${isEditRequest ? "" : ` · 수행일 ${escapeHtml(proof.performedAt || "")}`}</span>
        <strong>${escapeHtml(isEditRequest ? `${proof.questTitle} → ${proposed.title || "새 미션"}` : proof.questTitle)}</strong>
        <span class="proof-owner">${escapeHtml(proof.scopeLabel)}</span>
        ${proof.canApprove
          ? `<button class="proof-approve" type="button" data-approve-proof-id="${escapeHtml(proof.id)}" ${approvingProofIds.has(proof.id) ? "disabled" : ""}>${approvingProofIds.has(proof.id) ? "처리 중" : (isEditRequest ? "대체 미션 승인" : isLateProof ? "지난 인증 확인" : "그룹 인증하기")}</button>`
          : `<span class="proof-waiting">${isEditRequest ? "승인 기다림" : "확인 기다림"}</span>`}
        <p>${escapeHtml(isEditRequest ? `${proposed.type || "미션"} · ${proposed.note || "대체 미션 제안"}${proof.note ? ` / 이유: ${proof.note}` : ""}` : (proof.note || "사진 인증을 확인해 주세요."))}</p>
      </div>
    `;
    cards.appendChild(card);
  });
}

function proofModeLabel(mode = "photo") {
  if (mode === "check") {
    return "그룹 확인";
  }
  if (mode === "hybrid") {
    return "사진 + 그룹";
  }
  return "사진 중심";
}

function memberInitial(member = {}) {
  return String(member.initial || member.name || "그").trim().slice(0, 1) || "그";
}

function memberProfileEffect(snapshot = {}) {
  const effect = snapshot.profileEffect || {};
  const streak = Math.max(0, Math.floor(Number(
    snapshot.attendanceStreak
    || effect.streak
    || snapshot.attendance?.streak
    || 0,
  )));
  const id = ["spark", "aura", "star", "crown", "frame"].includes(effect.id)
    ? effect.id
    : streak >= 100
      ? "frame"
      : streak >= 30
        ? "crown"
        : streak >= 14
          ? "star"
          : streak >= 7
            ? "aura"
            : streak >= 3
              ? "spark"
              : "none";
  const labels = {
    spark: "반짝",
    aura: "오라",
    star: "별빛",
    crown: "왕관",
    frame: "프레임",
  };
  return {
    id,
    streak,
    label: effect.shortLabel || labels[id] || "",
    title: effect.label || (labels[id] ? `${streak}일 ${labels[id]}` : ""),
  };
}

function currentDailyKey() {
  return serverTime?.daily?.key || missions?.daily?.key || today();
}

function pendingGroupApprovalCount() {
  return pendingGroupApprovalProofs().length;
}

function pendingGroupApprovalProofs() {
  if (!hasActiveRoom()) {
    return [];
  }
  return (room?.proofs || [])
    .filter((proof) => proof.status !== "approved" && proof.userId && proof.userId !== userId && !locallyResolvedProofIds.has(String(proof.id || "")));
}

function pendingGroupApprovalInfo() {
  const pending = pendingGroupApprovalProofs();
  return { count: pending.length, first: pending[0] || null };
}

function renderHomeProofBubble(info = pendingGroupApprovalInfo()) {
  const bubble = document.querySelector("#homeProofBubble");
  if (!bubble) {
    return;
  }
  const label = document.querySelector("#homeProofBubbleLabel");
  const title = document.querySelector("#homeProofBubbleTitle");
  const hint = document.querySelector("#homeProofBubbleHint");
  const proof = info.first;
  const proofId = String(proof?.id || "");
  if (!proof || !proofId || locallyResolvedProofIds.has(proofId)) {
    bubble.classList.remove("hidden", "has-mail");
    bubble.classList.add("is-empty");
    bubble.disabled = false;
    delete bubble.dataset.homeApproveProofId;
    delete bubble.dataset.homeMode;
    bubble.dataset.panelJump = "verify";
    if (label) {
      label.textContent = "0";
    }
    if (title) {
      title.textContent = "확인할 편지 없음";
    }
    if (hint) {
      hint.textContent = "요청이 오면 편지가 차요";
    }
    bubble.setAttribute("aria-label", "비어 있는 인증 편지함, 그룹 인증 화면 열기");
    return;
  }
  const author = String(proof.author || "그룹원").trim() || "그룹원";
  const isEditRequest = proof.kind === "mission_edit";
  const requestTitle = isEditRequest
    ? (proof.proposed?.title || proof.questTitle || "대체 미션")
    : (proof.questTitle || "미션 인증");
  const typeLabel = isEditRequest ? "대체 미션" : (proof.missionType || proof.type || "미션");
  if (label) {
    label.textContent = String(info.count || 1);
  }
  if (title) {
    title.textContent = info.count > 1 ? `${author} 외 ${info.count - 1}명` : `${author} 인증`;
  }
  if (hint) {
    hint.textContent = `${typeLabel} · ${requestTitle}`;
  }
  delete bubble.dataset.homeApproveProofId;
  bubble.dataset.homeMode = "verify";
  bubble.dataset.panelJump = "verify";
  bubble.disabled = false;
  bubble.classList.remove("hidden", "is-empty");
  bubble.classList.add("has-mail");
  bubble.setAttribute("aria-label", `확인할 인증 요청 ${info.count || 1}개, 그룹 인증 리스트 열기`);
}

function ownPendingProofInfo() {
  const ownProofs = (proofs || []).filter((proof) => proof.status !== "approved");
  if (ownProofs.length > 0) {
    return { count: ownProofs.length, first: ownProofs[0] || null };
  }
  const pendingMissions = allMissionItems().filter((mission) => (
    mission.state === "pending" || mission.state === "edit_pending"
  ));
  return { count: pendingMissions.length, first: pendingMissions[0] || null };
}

function canClaimAttendance() {
  const key = currentDailyKey();
  return Boolean(key && gameState?.attendance?.lastKey !== key);
}

function groupAttendanceProgressFromMembers(members = []) {
  const key = currentDailyKey();
  const attended = new Set();
  const activeMembers = members.filter((member) => member.userId);
  activeMembers.forEach((member) => {
    const snapshot = member.snapshot || {};
    if (snapshot.attendanceLastKey === key || (member.userId === userId && gameState?.attendance?.lastKey === key)) {
      attended.add(member.userId);
    }
  });
  const target = 3;
  return {
    key,
    done: attended.size,
    total: activeMembers.length,
    target,
    rate: Math.min(100, Math.round((attended.size / target) * 100)),
    eligible: attended.size >= target,
  };
}

function roomStreakProgress() {
  const created = new Date(room?.createdAt || "");
  const ageDays = Number.isNaN(created.getTime())
    ? 0
    : Math.max(1, Math.floor((Date.now() - created.getTime()) / (24 * 60 * 60 * 1000)) + 1);
  const target = 7;
  return {
    key: "unlock",
    done: Math.min(ageDays, target),
    total: target,
    target,
    ageDays,
    rate: Math.min(100, Math.round((ageDays / target) * 100)),
    eligible: ageDays >= target,
  };
}

function groupDailyProgressFromMembers(members = []) {
  const key = currentDailyKey();
  let total = 0;
  let done = 0;
  const activeMembers = members.filter((member) => member.userId);
  activeMembers.forEach((member) => {
    const missionsForToday = (member.snapshot?.missions || []).filter((mission) => {
      if ((mission.period || "daily") !== "daily") {
        return false;
      }
      return !mission.snapshotKey || mission.snapshotKey === key;
    });
    total += missionsForToday.length;
    done += missionsForToday.filter((mission) => mission.state === "done").length;
  });
  const target = total > 0 ? Math.max(1, Math.ceil(total * 0.8)) : 0;
  return {
    key,
    done,
    total,
    target,
    rate: total > 0 ? Math.round((done / total) * 100) : 0,
    eligible: total > 0 && done >= target,
    memberCount: activeMembers.length,
  };
}

function groupRewardItem({ type, label, title, note, progress, claimed }) {
  const percent = progress.target > 0 ? Math.min(100, Math.round((progress.done / progress.target) * 100)) : 0;
  const buttonText = claimed
    ? "완료"
    : progress.eligible
      ? "받기"
      : progress.target > 0
        ? `${Math.max(0, progress.target - progress.done)} 남음`
        : "대기";
  return `
    <article class="group-reward-card ${progress.eligible ? "ready" : ""} ${claimed ? "claimed" : ""}">
      <div>
        <span class="label">${escapeHtml(label)}</span>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(note)}</p>
        <div class="group-reward-track" aria-hidden="true"><span style="width: ${percent}%"></span></div>
      </div>
      <button type="button" data-claim-group-reward="${escapeHtml(type)}" ${progress.eligible && !claimed ? "" : "disabled"}>${escapeHtml(buttonText)}</button>
    </article>
  `;
}

function groupRewardCard(joinedMembers = []) {
  const daily = groupDailyProgressFromMembers(joinedMembers);
  const attendance = groupAttendanceProgressFromMembers(joinedMembers);
  const streak = roomStreakProgress();
  const attendanceClaims = room?.groupRewardClaims?.attendance?.[attendance.key] || [];
  const streakClaims = room?.groupRewardClaims?.room_streak?.[streak.key] || [];
  const roomEffectUnlocked = Boolean(room?.effects?.roomStreak);
  return `
    <div class="group-reward-board" aria-label="그룹 공동 보상">
      ${groupRewardItem({
        type: "daily_box",
        label: "오늘 그룹 상자",
        title: daily.memberCount > 1 ? "방 전체 80% 달성" : "그룹원이 모이면 시작",
        note: daily.total > 0 ? `오늘 인증 ${daily.done}/${daily.target}개 · 코인/우정` : "오늘 미션이 갱신되면 열려요.",
        progress: daily,
        claimed: (room?.dailyRewardClaims?.[daily.key] || []).includes(userId),
      })}
      ${groupRewardItem({
        type: "attendance",
        label: "단체 출석",
        title: "3명 이상 출석하면 코인",
        note: `오늘 출석 ${attendance.done}/${attendance.target}명 · 단체 코인`,
        progress: attendance,
        claimed: attendanceClaims.includes(userId),
      })}
      ${groupRewardItem({
        type: "room_streak",
        label: "방 유지 보상",
        title: roomEffectUnlocked ? "배경 효과 적용 중" : "7일 유지하면 배경 효과",
        note: `방 유지 ${streak.done}/${streak.target}일 · 그룹 프로필 효과`,
        progress: streak,
        claimed: roomEffectUnlocked || streakClaims.includes(userId),
      })}
    </div>
  `;
}

function roomMemberFace(member = {}, index = 0) {
  const snapshot = member.snapshot || {};
  const isMe = member.userId === userId;
  const effect = memberProfileEffect(snapshot);
  const effectClass = effect.id !== "none" ? `profile-effect-${effect.id}` : "";
  const fallbackCharacterId = isMe ? character.id : "tori";
  const fallbackPalette = isMe ? activePetPalette() : "";
  const face = createPetStackSvg(
    snapshot.characterId || fallbackCharacterId,
    snapshot.accessoryIds || snapshot.accessoryId || "",
    null,
    snapshot.paletteId || fallbackPalette,
  );
  const name = member.name || snapshot.petName || `그룹원 ${index + 1}`;
  return `
    <span class="room-member-face ${isMe ? "me" : ""} ${effectClass}" title="${escapeHtml(name)}" aria-label="${escapeHtml(name)}">
      ${face}
    </span>
  `;
}

function roomEmptySlot(index = 0) {
  return `<span class="room-member-face empty" title="빈 자리" aria-label="빈 자리 ${index + 1}"></span>`;
}

function roomOverflowSlot(count = 0) {
  return `<span class="room-member-face more" title="추가 그룹원 ${count}명" aria-label="추가 그룹원 ${count}명">+${count}</span>`;
}

function renderGroupMembers() {
  if (!groupMemberList) {
    return;
  }
  groupMemberList.innerHTML = "";
  if (!hasActiveRoom()) {
    groupMemberList.innerHTML = `<div class="proof-empty">처음에 방을 만들거나 들어가면 그룹원의 펫 상태가 여기에 보여요.</div>`;
    return;
  }
  const joinedMembers = (Array.isArray(room.members) ? room.members : []).filter((member) => member.userId);
  if (joinedMembers.length === 0) {
    groupMemberList.innerHTML = `<div class="proof-empty">아직 입장한 그룹원이 없어요.</div>`;
    return;
  }
  groupMemberList.innerHTML = groupRewardCard(joinedMembers) + joinedMembers
    .map((member) => {
      const snapshot = member.snapshot || {};
      const characterId = snapshot.characterId || "tori";
      const sprite = createPetStackSvg(characterId, snapshot.accessoryIds || snapshot.accessoryId || "", null, snapshot.paletteId || "");
      const isMe = member.userId === userId;
      const health = Math.min(100, Math.max(0, Math.round(Number(snapshot.health ?? 50))));
      const completion = Math.min(100, Math.max(0, Math.round(Number(snapshot.completion || 0))));
      const missionCount = Array.isArray(snapshot.missions) ? snapshot.missions.length : 0;
      const effect = memberProfileEffect(snapshot);
      const effectClass = effect.id !== "none" ? `profile-effect-${effect.id}` : "";
      const snapshotMood = cozyAppMessage(snapshot.mood) || (snapshot.profileCompleted ? "루틴 진행 중" : "프로필 준비 중");
      return `
        <article class="group-member-card ${isMe ? "me" : ""} ${effectClass}">
          <div class="group-member-pet">
            ${sprite}
            ${effect.id !== "none" ? `<span class="profile-effect-ring" aria-hidden="true"></span>` : ""}
          </div>
          <div class="group-member-body">
            <div class="group-member-head">
              <strong>${escapeHtml(member.name || "그룹원")}${isMe ? " · 나" : ""}</strong>
              <div class="group-member-badges" ${effect.id !== "none" ? `title="${escapeHtml(effect.title)}"` : ""}>
                <span>Lv. ${Math.max(1, Math.floor(Number(snapshot.level || 1)))}</span>
              </div>
            </div>
            <p>${escapeHtml(`${snapshot.petName || "아기 펫"} · ${snapshotMood}${effect.streak ? ` · 출석 ${effect.streak}일` : ""}`)}</p>
            <div class="group-member-bars">
              <span style="--value: ${health}%"><em>컨디션</em></span>
              <span style="--value: ${completion}%"><em>달성</em></span>
            </div>
            <div class="group-member-actions">
              <button class="member-mission-button" type="button" data-member-missions="${escapeHtml(member.userId)}">
                ${escapeHtml(missionCount > 0 ? "미션 보기" : "미션 대기")}
              </button>
              ${isMe ? "" : `<button class="member-poke-button" type="button" data-poke-member="${escapeHtml(member.userId)}">찌르기</button>`}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function memberMissionPeriodLabel(period = "daily") {
  if (period === "weekly") {
    return "주간";
  }
  if (period === "monthly") {
    return "월간";
  }
  return "일일";
}

function memberMissionPad(value) {
  return String(value).padStart(2, "0");
}

function periodKeyFromKstDate(value = "", period = "daily") {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const year = kstDate.getUTCFullYear();
  const month = memberMissionPad(kstDate.getUTCMonth() + 1);
  const day = memberMissionPad(kstDate.getUTCDate());
  if (period === "monthly") {
    return `${year}-${month}`;
  }
  if (period === "weekly") {
    const weekStart = new Date(Date.UTC(year, kstDate.getUTCMonth(), kstDate.getUTCDate()));
    const mondayOffset = (weekStart.getUTCDay() + 6) % 7;
    weekStart.setUTCDate(weekStart.getUTCDate() - mondayOffset);
    return `${weekStart.getUTCFullYear()}-${memberMissionPad(weekStart.getUTCMonth() + 1)}-${memberMissionPad(weekStart.getUTCDate())}`;
  }
  return `${year}-${month}-${day}`;
}

function currentMemberPeriodKey(period = "daily") {
  if (period === "weekly") {
    return serverTime?.weekly?.key || "";
  }
  if (period === "monthly") {
    return serverTime?.monthly?.key || "";
  }
  return serverTime?.daily?.key || "";
}

function memberMissionSnapshotKey(mission = {}, snapshot = {}) {
  const period = ["daily", "weekly", "monthly"].includes(mission.period) ? mission.period : "daily";
  const directKey = String(mission.snapshotKey || mission.periodKey || "").trim();
  if (directKey) {
    return directKey;
  }
  const id = String(mission.id || "");
  if (period === "monthly") {
    return id.match(/monthly-(\d{4}-\d{2})/)?.[1]
      || id.match(/(\d{4}-\d{2})(?:-|$)/)?.[1]
      || periodKeyFromKstDate(mission.completedAt || snapshot.updatedAt, period);
  }
  return id.match(/(\d{4}-\d{2}-\d{2})/)?.[1]
    || periodKeyFromKstDate(mission.completedAt || snapshot.updatedAt, period);
}

function isArchivedMemberMission(mission = {}, snapshot = {}) {
  const period = ["daily", "weekly", "monthly"].includes(mission.period) ? mission.period : "daily";
  const currentKey = currentMemberPeriodKey(period);
  const missionKey = memberMissionSnapshotKey(mission, snapshot);
  return Boolean(currentKey && missionKey && currentKey !== missionKey);
}

function memberMissionRecordLabel(mission = {}, snapshot = {}) {
  const period = ["daily", "weekly", "monthly"].includes(mission.period) ? mission.period : "daily";
  const key = memberMissionSnapshotKey(mission, snapshot);
  if (period === "monthly" && /^\d{4}-\d{2}$/.test(key)) {
    return `${Number(key.slice(5, 7))}월 기록`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
    return `${Number(key.slice(5, 7))}/${Number(key.slice(8, 10))} 기록`;
  }
  return "";
}

function memberMissionCompletedLabel(mission = {}, snapshot = {}) {
  const completedAt = String(mission.completedAt || "").trim();
  const date = new Date(completedAt);
  if (completedAt && !Number.isNaN(date.getTime())) {
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const month = kstDate.getUTCMonth() + 1;
    const day = kstDate.getUTCDate();
    const hour = memberMissionPad(kstDate.getUTCHours());
    const minute = memberMissionPad(kstDate.getUTCMinutes());
    return `${month}/${day} ${hour}:${minute} 완료`;
  }
  const period = ["daily", "weekly", "monthly"].includes(mission.period) ? mission.period : "daily";
  const key = memberMissionSnapshotKey(mission, snapshot);
  if (period === "monthly" && /^\d{4}-\d{2}$/.test(key)) {
    return `${Number(key.slice(5, 7))}월 완료`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
    return `${Number(key.slice(5, 7))}/${Number(key.slice(8, 10))} 완료`;
  }
  return "완료";
}

function memberMissionStatusLabel(mission = {}, snapshot = {}) {
  if (mission.state === "done") {
    return memberMissionCompletedLabel(mission, snapshot);
  }
  if (isArchivedMemberMission(mission, snapshot)) {
    return "이전 기록";
  }
  if (mission.state === "pending") {
    return "검증중";
  }
  if (mission.state === "edit_pending") {
    return "승인중";
  }
  return "미진행";
}

function pendingProofForMemberMission(memberId = "", mission = {}) {
  const missionId = String(mission.id || "");
  const proofId = String(mission.proofId || mission.editRequestId || "");
  const wantedKind = mission.state === "edit_pending" ? "mission_edit" : "";
  return (room?.proofs || []).find((proof) => {
    if (!proof || proof.status === "approved" || proof.userId !== memberId || proof.userId === userId) {
      return false;
    }
    if (wantedKind && proof.kind !== wantedKind) {
      return false;
    }
    const ids = [
      proof.id,
      proof.missionId,
      proof.questId,
    ].map((value) => String(value || ""));
    return Boolean(
      (proofId && ids.includes(proofId))
      || (missionId && ids.includes(missionId)),
    );
  }) || null;
}

function memberMissionActionHtml(member = {}, mission = {}) {
  const pendingProof = pendingProofForMemberMission(member.userId, mission);
  if (!pendingProof) {
    return `<em>${escapeHtml(mission.statusLabel)}</em>`;
  }
  const isEditRequest = pendingProof.kind === "mission_edit";
  const isApproving = approvingProofIds.has(pendingProof.id);
  const label = isApproving
    ? "처리 중"
    : isEditRequest
      ? "대체 승인"
      : "승인";
  return `
    <button
      class="member-proof-approve"
      type="button"
      data-approve-proof-id="${escapeHtml(pendingProof.id)}"
      data-member-mission-owner="${escapeHtml(member.userId)}"
      ${isApproving ? "disabled" : ""}
    >${escapeHtml(label)}</button>
  `;
}

function memberSnapshotUpdatedLabel(value = "") {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const formatted = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return `마지막 갱신 ${formatted}`;
}

function openMemberMissionModal(memberId) {
  if (!questModal || !questModalContent || !questModalHeading || !questModalMeta) {
    return;
  }
  const member = (Array.isArray(room?.members) ? room.members : []).find((item) => item.userId === memberId);
  if (!member) {
    return;
  }
  openQuestId = "";
  const snapshot = member.snapshot || {};
  const missions = Array.isArray(snapshot.missions) ? snapshot.missions : [];
  const visibleMissions = missions.map((mission) => {
    const archived = isArchivedMemberMission(mission, snapshot);
    return {
      ...mission,
      archived,
      displayState: archived ? "archived" : mission.state || "todo",
      recordLabel: archived ? memberMissionRecordLabel(mission, snapshot) : "",
      statusLabel: memberMissionStatusLabel(mission, snapshot),
    };
  });
  const activeMissions = visibleMissions.filter((mission) => !mission.archived);
  const activeDoneCount = activeMissions.filter((mission) => mission.state === "done").length;
  const archivedCount = visibleMissions.length - activeMissions.length;
  const petName = snapshot.petName || "아기 펫";
  questModalHeading.textContent = `${member.name || "그룹원"} 미션`;
  questModalMeta.textContent = visibleMissions.length > 0
    ? (archivedCount > 0
      ? (activeMissions.length > 0
        ? `현재 ${activeDoneCount}/${activeMissions.length} · 이전 기록 ${archivedCount}개 · ${petName}`
        : `이전 기록 ${archivedCount}개 · ${petName}`)
      : `현재 ${activeDoneCount}/${visibleMissions.length} · ${petName}`)
    : "아직 미션 정보 없음";
  const updatedLabel = memberSnapshotUpdatedLabel(snapshot.updatedAt);
  questModalContent.innerHTML = visibleMissions.length > 0
    ? `
      ${updatedLabel ? `<p class="member-sync-note">${escapeHtml(updatedLabel)}</p>` : ""}
      <div class="member-mission-list">
        ${visibleMissions.map((mission) => `
          <article class="member-mission-row ${escapeHtml(mission.displayState)}">
            <div>
              <span>${escapeHtml(memberMissionPeriodLabel(mission.period))} · ${escapeHtml(missionTypeLabel(mission.type))}${mission.recordLabel ? ` · ${escapeHtml(mission.recordLabel)}` : ""}</span>
              <strong>${escapeHtml(missionOpenTitle(mission))}</strong>
              <p>${escapeHtml(mission.note || "사진 인증 후 그룹 확인")}</p>
            </div>
            ${memberMissionActionHtml(member, mission)}
          </article>
        `).join("")}
      </div>
    `
    : `<div class="proof-empty">그룹원이 앱을 다시 열면 미션 정보가 갱신돼요.</div>`;
  questModal.classList.remove("hidden");
}

function renderRoom() {
  if (!roomCard) {
    return;
  }
  if (!room || room.status === "closed") {
    roomCard.classList.add("empty");
    roomCard.classList.remove("room-effect-streak");
    roomCard.innerHTML = `
      <div>
        <span class="label">그룹 방</span>
        <strong>함께할 방을 먼저 연결해요</strong>
        <p>초대코드로 들어가거나 새 방을 만들어 그룹 인증 흐름을 시작해요.</p>
      </div>
      <div class="room-join">
        <input id="roomJoinCode" type="text" maxlength="8" placeholder="초대코드" autocomplete="off" />
        <button type="button" data-join-room="true">참가</button>
        <button class="room-primary" type="button" data-open-room="true">방 만들기</button>
      </div>
    `;
    return;
  }

  const members = Array.isArray(room.members) ? room.members : [];
  const joinedMembers = members.filter((member) => member.userId);
  const visibleMembers = joinedMembers.length > 0 ? joinedMembers : members;
  const joinedCount = joinedMembers.length;
  const capacity = Math.max(joinedCount || 1, Number(room.capacity || joinedCount || 1));
  const waitingCount = Math.max(0, capacity - joinedCount);
  const faceLimit = Math.min(6, capacity);
  const overflowCount = Math.max(0, visibleMembers.length - faceLimit);
  const memberFaces = [
    ...visibleMembers.slice(0, faceLimit).map((member, index) => roomMemberFace(member, index)),
    ...(overflowCount > 0 ? [roomOverflowSlot(overflowCount)] : []),
    ...Array.from({ length: overflowCount > 0 ? 0 : Math.max(0, faceLimit - visibleMembers.length) }, (_, index) => roomEmptySlot(index)),
  ].join("");
  roomCard.classList.remove("empty");
  roomCard.classList.toggle("room-effect-streak", Boolean(room.effects?.roomStreak));
  roomCard.innerHTML = `
    <div class="room-info">
      <div class="room-title-row">
        <div>
          <span class="label">활성 방 · ${escapeHtml(proofModeLabel(room.proofMode))}</span>
          <strong>${escapeHtml(room.name || "루틴 인증방")}</strong>
        </div>
        <span class="room-count-pill">${joinedCount}/${capacity}명</span>
      </div>
      <p>${escapeHtml(room.goal || "그룹원끼리 서로 루틴 인증하기")}</p>
      <div class="room-member-strip" aria-label="방 멤버 펫 얼굴">
        ${memberFaces}
      </div>
    </div>
    <div class="room-side">
      <button class="room-code-chip" type="button" data-copy-room-code="${escapeHtml(room.code || "")}" aria-label="초대코드 복사">
        <span>코드</span>
        <strong>${escapeHtml(room.code || "------")}</strong>
      </button>
      <div class="room-actions">
        <span class="room-seat-chip">${waitingCount > 0 ? `${waitingCount}자리 남음` : "정원 완료"}</span>
        <button type="button" class="ghost" data-leave-room="true">나가기</button>
      </div>
    </div>
  `;
}

function renderSocial() {
  if (sharePetName) {
    sharePetName.textContent = `${currentPetName()} · ${character.rarityLabel || character.rarity}`;
  }
  if (sharePetSummary) {
    sharePetSummary.textContent = `오늘 달성 ${Math.round(Number(gameState.completion || 0))}% · 컨디션 ${Math.round(Number(gameState.health || 0))}`;
  }
  syncShareMoodHint();
  renderShares();
  renderAchievements();
}

function renderShares() {
  if (!shareFeed) {
    return;
  }
  shareFeed.innerHTML = "";
  const shareMap = new Map();
  shares.forEach((share) => shareMap.set(share.id, share));
  (room?.shares || []).forEach((share) => shareMap.set(share.id, share));
  const activeShares = [...shareMap.values()].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  if (activeShares.length === 0) {
    shareFeed.innerHTML = `<div class="proof-empty">아직 오늘의 한마디가 없어요. 첫 줄을 남겨봐요.</div>`;
    return;
  }
  activeShares.forEach((share) => {
    const reactions = share.reactions || {};
    const isMine = isOwnShare(share);
    const shareSprite = createPetStackSvg(share.characterId || character.id, share.accessoryIds || share.accessoryId || "", null, share.paletteId || "");
    const shareMessage = cozyAppMessage(share.message || share.petMood) || "오늘도 한 칸 움직였어요.";
    const shareLabel = share.missionTitle ? "성공 기록" : "오늘의 한마디";
    const card = document.createElement("article");
    card.className = `share-card pose-${escapeHtml(share.pose || share.moodTag || "proud")}`;
    card.innerHTML = `
      <div class="share-pose">
        <span class="share-avatar" aria-hidden="true">${shareSprite}</span>
        <div class="share-line-card">
          <span>${escapeHtml(shareLabel)}</span>
          <p>${escapeHtml(shareMessage)}</p>
        </div>
      </div>
      <div class="share-meta">
        <span>${escapeHtml(share.author || "나")}</span>
        <span>${escapeHtml(share.moodLabel || shareLabel)}</span>
      </div>
      <div>
        <strong>${escapeHtml(share.missionTitle ? `${share.petName || "아기 펫"}의 성공 순간` : `${share.petName || "아기 펫"}의 한마디`)}</strong>
        ${share.missionTitle ? `<em class="share-mission">${escapeHtml(share.missionTitle)}</em>` : ""}
        ${share.accessoryName ? `<em class="share-accessory">${escapeHtml(share.accessoryName)} 착용</em>` : ""}
        ${share.missionTitle ? `<p>${escapeHtml(shareMessage)}</p>` : ""}
      </div>
      <div class="share-stats" aria-label="공유된 펫 상태">
        <span>달성 ${Math.round(Number(share.completion || 0))}%</span>
        <span>컨디션 ${Math.round(Number(share.health || 0))}</span>
        <span>우정 ${Math.round(Number(gameState.bond || 0))}</span>
      </div>
      <div class="share-reactions" aria-label="그룹 반응">
        ${isMine
          ? `<span class="share-reaction-note">내 소식</span>`
          : `
            <button type="button" data-react-share="${escapeHtml(share.id)}" data-reaction="cheer">응원 ${Number(reactions.cheer || 0)}</button>
            <button type="button" data-react-share="${escapeHtml(share.id)}" data-reaction="cute">귀여워 ${Number(reactions.cute || 0)}</button>
            <button type="button" data-react-share="${escapeHtml(share.id)}" data-reaction="proud">인정 ${Number(reactions.proud || 0)}</button>
          `}
      </div>
    `;
    shareFeed.appendChild(card);
  });
}

function isOwnShare(share = {}) {
  const shareUserId = String(share.userId || "");
  if (shareUserId && shareUserId === userId) {
    return true;
  }
  const author = String(share.author || "").trim();
  const myName = String(profile.nickname || getSavedNickname() || "").trim();
  return Boolean(author && myName && author === myName);
}

function renderAchievements() {
  if (!achievementList) {
    return;
  }
  achievementList.innerHTML = "";
  if (achievements.length === 0) {
    achievementList.innerHTML = `<div class="proof-empty">업적을 불러오는 중이에요.</div>`;
    return;
  }
  achievements.forEach((achievement) => {
    const secretLocked = achievement.hidden && !achievement.unlocked;
    const card = document.createElement("article");
    card.className = `achievement-card ${achievement.unlocked ? "unlocked" : "locked"} ${achievement.hidden ? "secret" : ""}`;
    card.dataset.icon = secretLocked ? "?" : achievementIcons[achievement.id] || "★";
    card.innerHTML = `
      <div class="achievement-top">
        <strong>${escapeHtml(secretLocked ? "???" : achievement.title)}</strong>
        <em>${achievement.unlocked ? "완료" : achievement.hidden ? "히든" : "진행"}</em>
      </div>
      <p>${escapeHtml(secretLocked ? "조건을 만족하면 열리는 숨은 미션이에요." : achievement.note)}</p>
    `;
    achievementList.appendChild(card);
  });
}

function materialCount(materialId) {
  return inventory.filter((item) => (item.materialId || "").trim() === materialId).length;
}

function hasAccessory(accessoryId) {
  return accessories.some((accessory) => accessory.id === accessoryId);
}

const accessoryFilterOptions = [
  { id: "all", label: "전체", slots: null },
  { id: "equipped", label: "착용중", slots: null },
  { id: "head", label: "머리", slots: ["head", "pin"] },
  { id: "face", label: "얼굴", slots: ["face"] },
  { id: "body", label: "몸", slots: ["neck", "back"] },
  { id: "tail", label: "꼬리", slots: ["tail"] },
  { id: "small", label: "소품", slots: ["badge", "pouch", "charm", "misc"] },
];

function accessoryRecipeFor(accessory = {}) {
  return accessoryRecipes.find((item) => item.id === accessory.id) || {};
}

function accessoryMatchesFilter(accessory = {}, filterId = accessoryFilter, equippedIds = new Set()) {
  const recipe = accessoryRecipeFor(accessory);
  const slot = recipe.slot || "misc";
  if (filterId === "all") {
    return true;
  }
  if (filterId === "equipped") {
    return equippedIds.has(accessory.id);
  }
  const option = accessoryFilterOptions.find((item) => item.id === filterId);
  return option?.slots?.includes(slot) || false;
}

function renderAccessoryFilters(equippedIds = new Set()) {
  if (!accessoryFilterBar) {
    return;
  }
  if (!accessoryFilterOptions.some((option) => option.id === accessoryFilter)) {
    accessoryFilter = "all";
  }
  accessoryFilterBar.innerHTML = accessoryFilterOptions
    .map((option) => {
      const active = option.id === accessoryFilter;
      const count = accessories.filter((accessory) => accessoryMatchesFilter(accessory, option.id, equippedIds)).length;
      return `
        <button type="button" class="${active ? "active" : ""}" data-accessory-filter="${escapeHtml(option.id)}" aria-pressed="${active ? "true" : "false"}">
          <span>${escapeHtml(option.label)}</span>
          <em>${count}</em>
        </button>
      `;
    })
    .join("");
}

function rarityText(rarity = "RARE") {
  return {
    NORMAL: "노말",
    RARE: "레어",
    EPIC: "에픽",
    LEGEND: "레전드",
  }[rarity] || rarity;
}

function materialGroups(sourceItems = inventory) {
  const groups = new Map();
  sourceItems.forEach((item) => {
    const materialId = item.materialId || String(item.id || "").replace(/-\d+$/, "");
    const recipe = accessoryRecipes.find((entry) => entry.materialId === materialId);
    const key = materialId || item.id;
    const current = groups.get(key) || {
      materialId: key,
      name: recipe?.materialName || item.name || "미확인 조각",
      rarity: item.rarity || recipe?.rarity || "RARE",
      effectLabel: item.effectLabel || (recipe ? `${recipe.need}개 모으면 ${recipe.name}` : "제작 재료"),
      count: 0,
    };
    current.count += 1;
    groups.set(key, current);
  });
  return Array.from(groups.values()).sort((a, b) => {
    const recipeIndexA = accessoryRecipes.findIndex((recipe) => recipe.materialId === a.materialId);
    const recipeIndexB = accessoryRecipes.findIndex((recipe) => recipe.materialId === b.materialId);
    return (recipeIndexA === -1 ? 99 : recipeIndexA) - (recipeIndexB === -1 ? 99 : recipeIndexB);
  });
}

function renderPalettePanel() {
  if (!colorPalettePanel) {
    return;
  }
  const ticketCount = colorTicketCount();
  if (colorTicketBadge) {
    colorTicketBadge.textContent = `${ticketCount}장`;
  }
  const baseSprite = sprites[character.id] || sprites.tori;
  const options = [
    {
      id: "default",
      name: "기본",
      body: baseSprite.body,
      shade: baseSprite.shade,
      accent: baseSprite.accent,
    },
    ...colorPalettes,
  ];
  const activePalette = activePetPalette() || "default";
  colorPalettePanel.innerHTML = `
    <div class="palette-help">
      <strong>색상 변경권</strong>
      <span>${ticketCount > 0 ? "원하는 색을 고르면 1장 사용돼요." : "보상 캡슐에서 색상 변경권을 뽑아야 바꿀 수 있어요."}</span>
    </div>
    <div class="palette-options">
      ${options.map((palette) => {
        const active = activePalette === palette.id;
        const disabled = !active && ticketCount <= 0;
        return `
          <button
            class="palette-option ${active ? "active" : ""}"
            type="button"
            data-palette-id="${escapeHtml(palette.id)}"
            style="--swatch-body: ${escapeHtml(palette.body)}; --swatch-shade: ${escapeHtml(palette.shade)}; --swatch-accent: ${escapeHtml(palette.accent)}"
            ${disabled ? "disabled" : ""}
          >
            <span class="palette-swatch" aria-hidden="true"></span>
            <strong>${escapeHtml(palette.name)}</strong>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function renderInventory() {
  const visibleInventory = inventory.filter(isPaletteTicket);
  inventoryCount.textContent = `${visibleInventory.length}개`;
  inventoryGrid.innerHTML = "";
  if (visibleInventory.length === 0) {
    inventoryGrid.innerHTML = `<div class="inventory-empty">색상 변경권이 여기에 보여요. 액세서리는 뽑는 즉시 보관함에 들어와요.</div>`;
  } else {
    materialGroups(visibleInventory).forEach((item) => {
      const recipe = accessoryRecipes.find((entry) => entry.materialId === item.materialId);
      const progress = recipe ? `${item.count}/${recipe.need}` : `${item.count}개`;
      const card = document.createElement("article");
      card.className = `inventory-item ${String(item.rarity || "RARE").toLowerCase()}`;
      card.innerHTML = `
        <span>${escapeHtml(rarityText(item.rarity))}</span>
        <strong>${escapeHtml(item.name)}</strong>
        <small>${rewardTextHtml(item.effectLabel || "제작 재료")}</small>
        <em>${escapeHtml(progress)}</em>
      `;
      inventoryGrid.appendChild(card);
    });
  }
  renderPalettePanel();
  renderCrafting();
  renderAccessories();
}

function renderCrafting() {
  if (!craftList) {
    return;
  }
  craftSectionTitle?.classList.add("hidden");
  craftList.classList.add("hidden");
  craftList.innerHTML = "";
}

function renderAccessories() {
  if (!accessoryList) {
    return;
  }
  accessoryList.innerHTML = "";
  equippedAccessories = normalizeEquippedAccessories();
  equippedAccessory = primaryEquippedAccessory();
  const equippedIds = equippedAccessoryIds();
  renderAccessoryFilters(new Set(equippedIds));
  if (accessories.length === 0) {
    accessoryList.innerHTML = `<div class="inventory-empty">뽑은 액세서리가 여기에 바로 모여요. 착용하면 공유 카드에도 같이 보여요.</div>`;
    return;
  }

  if (accessoryFilter === "all" || accessoryFilter === "equipped") {
    const emptyCard = document.createElement("article");
    emptyCard.className = `accessory-card clear ${equippedIds.length ? "" : "equipped"}`;
    emptyCard.innerHTML = `
      <div class="accessory-preview">${createPetStackSvg(character.id, equippedIds, null, activePetPalette())}</div>
      <div>
        <strong>착용 중 ${equippedIds.length}개</strong>
        <span>부위가 다르면 함께 착용돼요</span>
      </div>
      <button type="button" data-clear-accessories="true" ${equippedIds.length ? "" : "disabled"}>${equippedIds.length ? "전체 해제" : "기본"}</button>
    `;
    accessoryList.appendChild(emptyCard);
  }

  const visibleAccessories = accessories.filter((accessory) => accessoryMatchesFilter(accessory, accessoryFilter, new Set(equippedIds)));
  if (visibleAccessories.length === 0) {
    const option = accessoryFilterOptions.find((item) => item.id === accessoryFilter);
    accessoryList.insertAdjacentHTML("beforeend", `<div class="inventory-empty">${escapeHtml(option?.label || "선택한")} 아이템은 아직 없어요.</div>`);
    return;
  }

  visibleAccessories.forEach((accessory) => {
    const recipe = accessoryRecipeFor(accessory);
    const slot = recipe?.slot || "misc";
    const slotLabel = recipe?.slotLabel || "장식";
    const equipped = equippedAccessories[slot] === accessory.id;
    const occupied = Boolean(equippedAccessories[slot]);
    const buttonLabel = equipped ? "해제" : occupied ? "교체" : "착용";
    const card = document.createElement("article");
    card.className = `accessory-card ${String(accessory.rarity || recipe?.rarity || "RARE").toLowerCase()} ${equipped ? "equipped" : ""}`;
    card.innerHTML = `
      <div class="accessory-preview">${createPetStackSvg(character.id, accessory.id, null, activePetPalette())}</div>
      <div>
        <strong>${escapeHtml(accessory.name || recipe?.name || "액세서리")}</strong>
        <span><em>${escapeHtml(slotLabel)}</em> ${rewardTextHtml(accessory.description || recipe?.effectLabel || "펫 꾸미기 아이템")}</span>
      </div>
      <button type="button" data-equip-accessory="${escapeHtml(accessory.id)}">${buttonLabel}</button>
    `;
    accessoryList.appendChild(card);
  });
}

function ownedCharacterIds() {
  return new Set((characters || []).map((item) => item.id));
}

function renderPetCollection() {
  if (!petCollection) {
    return;
  }
  const owned = ownedCharacterIds();
  petCollection.innerHTML = petCatalog
    .map((pet) => {
      const ownedPet = (characters || []).find((item) => item.id === pet.id);
      const isOwned = owned.has(pet.id);
      const active = character.id === pet.id;
      const locked = pet.locked || !isOwned;
      const previewPalette = isOwned ? normalizeClientPalette(ownedPet?.paletteId) : "";
      const preview = createPetStackSvg(pet.id, active ? equippedAccessoryIds() : "", null, previewPalette);
      const statusText = active ? "함께중" : locked ? "잠금" : "보유";
      const canEquip = isOwned && !active && !pet.locked;
      const levelText = isOwned ? `Lv. ${Math.max(1, Math.floor(Number(ownedPet?.level || 1)))}` : "";
      return `
        <button
          class="pet-card ${String(pet.rarity || "NORMAL").toLowerCase()} ${active ? "active" : ""} ${locked ? "locked" : ""}"
          type="button"
          ${canEquip ? `data-equip-character="${escapeHtml(pet.id)}"` : "disabled"}
          aria-label="${escapeHtml(`${pet.name} ${pet.species} ${statusText}`)}"
        >
          <span class="pet-card-status">${escapeHtml(statusText)}</span>
          <span class="pet-card-preview">${preview}</span>
          <strong>${escapeHtml(pet.name)}</strong>
          ${levelText ? `<small>${escapeHtml(levelText)}</small>` : ""}
          <span class="pet-card-description">${escapeHtml(pet.species ? `종류 · ${pet.species}` : petDescriptionFor(pet.id))}</span>
          <em>${escapeHtml(pet.rarityLabel || rarityText(pet.rarity))}</em>
        </button>
      `;
    })
    .join("");
}

function drawablePetLockedCount() {
  const owned = ownedCharacterIds();
  return petCatalog.filter((pet) => !pet.starter && !pet.locked && !owned.has(pet.id)).length;
}

function clampRuleLimit(value, fallback) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(14, Math.max(0, number));
}

function lineLimitForKeywords(text, keywords, fallback) {
  const lines = String(text || "")
    .split(/\n|,|;|\/|·|•/g)
    .map((line) => line.trim())
    .filter(Boolean);
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (!keywords.some((keyword) => lower.includes(keyword))) {
      continue;
    }
    const explicit = line.match(/(\d{1,2})\s*(회|번)?/);
    if (explicit) {
      return clampRuleLimit(explicit[1], fallback);
    }
    if (/금지|끊|안\s*하|하지\s*않|제로|0회|노/.test(line)) {
      return 0;
    }
    if (/줄|절제|적게|최소/.test(line)) {
      return Math.min(fallback, 1);
    }
  }
  return fallback;
}

function inferSelfRuleLimitsFromText(text) {
  return {
    party: lineLimitForKeywords(text, ["유흥", "술", "파티", "회식", "음주", "drink", "alcohol", "party"], 1),
    game: lineLimitForKeywords(text, ["게임", "롤", "피파", "오버워치", "배그", "game"], 3),
  };
}

function syncSelfRuleDisplays() {
  if (partyLimitDisplay && profilePartyLimitInput) {
    partyLimitDisplay.textContent = `${clampRuleLimit(profilePartyLimitInput.value, 1)}회`;
  }
  if (gameLimitDisplay && profileGameLimitInput) {
    gameLimitDisplay.textContent = `${clampRuleLimit(profileGameLimitInput.value, 3)}회`;
  }
}

function setSelfRuleLimit(type, value) {
  const input = type === "game" ? profileGameLimitInput : profilePartyLimitInput;
  const fallback = type === "game" ? 3 : 1;
  if (!input) {
    return;
  }
  input.value = clampRuleLimit(value, fallback);
  selfRuleTouched = true;
  if (profileAutoRulesInput) {
    profileAutoRulesInput.value = "false";
  }
  syncSelfRuleDisplays();
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function localDateValue(date = new Date()) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function addCalendarMonths(date, months) {
  const next = new Date(date);
  const originalDay = next.getDate();
  next.setDate(1);
  next.setMonth(next.getMonth() + months);
  const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(originalDay, lastDay));
  return next;
}

function targetPeriodToEndDate(period) {
  const text = String(period || "").trim();
  const explicitDate = text.match(/(\d{4})[-.](\d{1,2})[-.](\d{1,2})/);
  if (explicitDate) {
    return `${explicitDate[1]}-${pad2(explicitDate[2])}-${pad2(explicitDate[3])}`;
  }
  const todayDate = new Date();
  const monthMatch = text.match(/(\d{1,2})\s*개월/);
  if (monthMatch) {
    return localDateValue(addCalendarMonths(todayDate, Number(monthMatch[1])));
  }
  const weekMatch = text.match(/(\d{1,2})\s*주/);
  if (weekMatch) {
    const next = new Date(todayDate);
    next.setDate(next.getDate() + Number(weekMatch[1]) * 7);
    return localDateValue(next);
  }
  const dayMatch = text.match(/(\d{1,3})\s*일/);
  if (dayMatch) {
    const next = new Date(todayDate);
    next.setDate(next.getDate() + Number(dayMatch[1]));
    return localDateValue(next);
  }
  return localDateValue(addCalendarMonths(todayDate, 3));
}

function daysUntilDateValue(value) {
  const selected = new Date(`${value}T00:00:00`);
  const now = new Date();
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = selected.getTime() - todayDate.getTime();
  return Math.max(0, Math.round(diff / 86400000));
}

function updatePeriodFromDate() {
  if (!profileEndDateInput || !profilePeriodInput) {
    return;
  }
  const value = profileEndDateInput.value || targetPeriodToEndDate(profile.targetPeriod || "3개월");
  profileEndDateInput.value = value;
  profilePeriodInput.value = `${value}까지`;
  if (profilePeriodSummary) {
    const days = daysUntilDateValue(value);
    profilePeriodSummary.textContent = `오늘부터 ${days}일 동안`;
  }
}

function parseWakeTime(value) {
  const text = String(value || "").trim();
  const colon = text.match(/(\d{1,2})\s*:\s*(\d{1,2})/);
  const korean = text.match(/(\d{1,2})\s*시(?:\s*(\d{1,2})\s*분?)?/);
  const match = colon || korean;
  const hour = match ? Number(match[1]) : 6;
  const minute = match && match[2] !== undefined ? Number(match[2]) : 0;
  return {
    hour: Math.min(23, Math.max(0, Number.isFinite(hour) ? hour : 6)),
    minute: Math.min(55, Math.max(0, Math.round((Number.isFinite(minute) ? minute : 0) / 5) * 5)),
  };
}

function ensureWakeWheelOptions() {
  if (wakeHourWheel && !wakeHourWheel.children.length) {
    wakeHourWheel.innerHTML = Array.from({ length: 24 }, (_, hour) => (
      `<button type="button" data-wake-hour="${hour}">${pad2(hour)}</button>`
    )).join("");
  }
  if (wakeMinuteWheel && !wakeMinuteWheel.children.length) {
    wakeMinuteWheel.innerHTML = Array.from({ length: 12 }, (_, index) => index * 5)
      .map((minute) => `<button type="button" data-wake-minute="${minute}">${pad2(minute)}</button>`)
      .join("");
  }
}

function selectedWakePart(container, selector, fallback) {
  if (!container) {
    return fallback;
  }
  const box = container.getBoundingClientRect();
  const center = box.top + box.height / 2;
  let best = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  container.querySelectorAll("button").forEach((button) => {
    const rect = button.getBoundingClientRect();
    const distance = Math.abs((rect.top + rect.height / 2) - center);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = button;
    }
  });
  return best ? Number(best.dataset[selector]) : fallback;
}

function setWakeTime(hour, minute, options = {}) {
  ensureWakeWheelOptions();
  const safeHour = Math.min(23, Math.max(0, Number(hour) || 0));
  const safeMinute = Math.min(55, Math.max(0, Math.round((Number(minute) || 0) / 5) * 5));
  if (profileWakeInput) {
    profileWakeInput.value = safeMinute ? `${safeHour}시 ${safeMinute}분` : `${safeHour}시`;
  }
  if (wakeWheelSummary) {
    wakeWheelSummary.textContent = `${safeHour}시 ${pad2(safeMinute)}분`;
  }
  wakeHourWheel?.querySelectorAll("button").forEach((button) => {
    const active = Number(button.dataset.wakeHour) === safeHour;
    button.classList.toggle("active", active);
    if (active && options.scroll !== false) {
      button.scrollIntoView({ block: "center", behavior: options.smooth ? "smooth" : "auto" });
    }
  });
  wakeMinuteWheel?.querySelectorAll("button").forEach((button) => {
    const active = Number(button.dataset.wakeMinute) === safeMinute;
    button.classList.toggle("active", active);
    if (active && options.scroll !== false) {
      button.scrollIntoView({ block: "center", behavior: options.smooth ? "smooth" : "auto" });
    }
  });
}

let wakeWheelScrollTimer = 0;

function syncWakeFromScroll() {
  window.clearTimeout(wakeWheelScrollTimer);
  wakeWheelScrollTimer = window.setTimeout(() => {
    const current = parseWakeTime(profileWakeInput?.value || "");
    const hour = selectedWakePart(wakeHourWheel, "wakeHour", current.hour);
    const minute = selectedWakePart(wakeMinuteWheel, "wakeMinute", current.minute);
    setWakeTime(hour, minute, { scroll: false });
  }, 120);
}

function applyPromptSelfRuleSuggestion({ force = false } = {}) {
  if (!force && selfRuleTouched) {
    return;
  }
  const text = `${profileGoalInput?.value || ""}\n${profileRoutineInput?.value || ""}`;
  const limits = inferSelfRuleLimitsFromText(text);
  if (profilePartyLimitInput) {
    profilePartyLimitInput.value = limits.party;
  }
  if (profileGameLimitInput) {
    profileGameLimitInput.value = limits.game;
  }
  syncSelfRuleDisplays();
  if (profileAutoRulesInput) {
    profileAutoRulesInput.value = "true";
  }
}

async function copyRoutineTemplate() {
  const text = routineTemplateExampleText;
  let copied = false;
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
  }
  if (!copied && routineTemplateExample) {
    routineTemplateExample.focus();
    routineTemplateExample.select();
    copied = document.execCommand?.("copy") || false;
  }
  showReward(copied ? "양식 복사" : "양식 선택");
  petMood.textContent = copied ? "미션 작성 양식을 복사했어요" : "양식을 선택해뒀어요";
}

function insertRoutineTemplate() {
  if (!profileRoutineInput) {
    return;
  }
  const maxLength = Number(profileRoutineInput.maxLength || 1000);
  profileRoutineInput.value = routineTemplateExampleText.slice(0, maxLength);
  profileRoutineInput.focus();
  profileRoutineInput.dispatchEvent(new Event("input", { bubbles: true }));
  showReward("예시 넣기");
  petMood.textContent = "양식에 맞춰 원하는 루틴을 고쳐 쓰면 돼요";
}

function uniqueLines(lines) {
  const seen = new Set();
  return lines.filter((line) => {
    const key = line.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function splitRoutineIdeaText(text) {
  return String(text || "")
    .replace(/https?:\/\/[^\s)\]]+/g, " ")
    .replace(/\r/g, "\n")
    .replace(/[.!?。]\s+/g, "\n")
    .split(/\n|[;；]|[•·]/g)
    .map((line) => line.replace(/^\s*(?:[-*▶▸]|\d+[.)])\s*/, "").trim())
    .map((line) => line.replace(/^\[[^\]]+\]\s*/, "").trim())
    .map((line) => line.replace(/^예[:：]\s*/, "").trim())
    .filter(Boolean);
}

function extractRoutineLinks(text) {
  const urls = String(text || "").match(/https?:\/\/[^\s)\]]+/g) || [];
  return uniqueLines(urls)
    .slice(0, 4)
    .map((url) => {
      const lower = url.toLowerCase();
      const label = lower.includes("github")
        ? "GitHub"
        : lower.includes("notion")
          ? "Notion"
          : lower.includes("boj") || lower.includes("acmicpc")
            ? "학습 링크"
            : lower.includes("youtube")
              ? "영상 링크"
              : "바로가기";
      return `${label}: ${url}`;
    });
}

function normalizeRoutineIdea(line) {
  return String(line || "")
    .replace(/https?:\/\/[^\s)\]]+/g, "")
    .replace(/^\s*(최종\s*목표|기간|기상|평일\s*루틴|주말\s*루틴|일일\s*미션|주간\s*미션|월간\s*미션|검증\s*기준|자기관리\s*기준|바로가기)\s*[:：]?\s*/i, "")
    .replace(/[,:：-]\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isRoutineSelfRule(line) {
  return /(유흥|술|파티|회식|음주|게임|롤|피파|오버워치|배그|party|drink|alcohol|game)/i.test(line);
}

function buildMissionReadyRoutinePrompt() {
  updatePeriodFromDate();
  const goal = String(profileGoalInput?.value || profile.finalGoal || "꾸준한 루틴 만들기").trim();
  const period = String(profilePeriodInput?.value || profile.targetPeriod || "3개월").trim();
  const wake = String(profileWakeInput?.value || profile.wakeTime || "6시 20분").trim();
  const raw = profileRoutineInput?.value || "";
  const rawIdeas = splitRoutineIdeaText(raw)
    .map(normalizeRoutineIdea)
    .filter(Boolean);
  const positiveIdeas = uniqueLines(rawIdeas.filter((line) => !isRoutineSelfRule(line))).slice(0, 7);
  const links = extractRoutineLinks(raw);
  const limits = inferSelfRuleLimitsFromText(`${goal}\n${raw}`);
  const dailyIdeas = positiveIdeas.length
    ? positiveIdeas.slice(0, 5)
    : [`${goal}와 관련된 작은 행동 1개 완료`];
  const weeklyIdeas = positiveIdeas.length
    ? [
      `${positiveIdeas[0]} 누적 기록 확인`,
      "그룹원의 인증 요청 2개 이상 확인",
      "이번 주 루틴 성공률 70% 이상",
    ]
    : ["이번 주 루틴 성공률 70% 이상", "그룹원의 인증 요청 2개 이상 확인"];
  const monthlyIdeas = [
    `${goal} 진행 상황 회고`,
    "가장 잘 지킨 루틴 1개와 막힌 지점 1개 정리",
  ];

  return [
    `[최종 목표] ${goal}`,
    `[기간] ${period}`,
    `[기상] ${wake}`,
    "[하고 싶은 것]",
    ...dailyIdeas.map((idea) => `- ${idea}`),
    "[일일 미션으로 받고 싶은 것]",
    "- 기상 체크인은 기본으로 두고, 나머지는 아래 루틴에 맞춰 유동적으로 생성",
    ...dailyIdeas.map((idea) => `- ${idea}를 사진/텍스트/링크 중 하나로 그룹 인증`),
    "[주간 미션]",
    ...uniqueLines(weeklyIdeas).slice(0, 4).map((idea) => `- ${idea}`),
    "[월간 미션]",
    ...monthlyIdeas.map((idea) => `- ${idea}`),
    "[검증 기준]",
    "- 인증 방식은 그룹원이 직접 확인",
    "- 사진, 텍스트, 링크 중 하나로 수행 근거 제출",
    "[자기관리 기준]",
    `- 유흥 주 ${limits.party}회까지`,
    `- 게임 주 ${limits.game}회까지`,
    links.length ? "[바로가기]" : "",
    ...links.map((link) => `- ${link}`),
  ].filter(Boolean).join("\n");
}

function polishRoutinePrompt() {
  if (!profileRoutineInput) {
    return;
  }
  applyPromptSelfRuleSuggestion({ force: true });
  if (routinePolishStatus) {
    routinePolishStatus.textContent = "저장하면 자동으로 일일·주간·월간 미션을 만들어요.";
  }
  showReward("미션 준비 완료");
  petMood.textContent = "저장하면 입력한 내용을 바탕으로 미션을 만들어요";
}

function routineDraftFromProfile(savedProfile = {}) {
  const draft = String(savedProfile.routineDraft || "").trim();
  if (draft && !/^\[[^\]]+\]/m.test(draft)) {
    return draft.slice(0, 1000);
  }

  const prompt = draft || String(savedProfile.routinePrompt || "").trim();
  if (!prompt) {
    return "";
  }

  const lines = prompt.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const wantedLines = [];
  let headerCount = -1;
  let collecting = false;

  for (const line of lines) {
    const header = line.match(/^\[([^\]]+)\]\s*(.*)$/);
    if (header) {
      headerCount += 1;
      const label = header[1].replace(/\s+/g, "");
      collecting = /하고|싶|원하/.test(label) || headerCount === 3;
      if (collecting && header[2]) {
        wantedLines.push(header[2]);
      }
      continue;
    }
    if (collecting) {
      wantedLines.push(line);
    }
  }

  const cleaned = wantedLines
    .map((line) => line.replace(/^\s*[-*•]\s*/, "").trim())
    .filter(Boolean);

  return (cleaned.length ? cleaned.join("\n") : prompt).slice(0, 1000);
}

function normalizeProfileText(value = "") {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function wakeCompareKey(value = "") {
  const wake = parseWakeTime(value || "6시");
  return `${wake.hour}:${wake.minute}`;
}

function periodCompareKey(value = "") {
  return targetPeriodToEndDate(value || "3개월");
}

function profileSnapshotFromPayload(payload = {}) {
  return {
    nickname: normalizeProfileText(payload.nickname),
    petName: normalizeProfileText(payload.petName),
    finalGoal: normalizeProfileText(payload.finalGoal),
    routineDraft: normalizeProfileText(payload.routineDraft || payload.routinePrompt),
    targetPeriod: periodCompareKey(payload.targetPeriod),
    wakeTime: wakeCompareKey(payload.wakeTime),
    theme: normalizeTheme(payload.theme),
    partyLimit: clampRuleLimit(payload.party ?? payload.partyLimit, 1),
    gameLimit: clampRuleLimit(payload.game ?? payload.gameLimit, 3),
  };
}

function savedProfileSnapshot() {
  const limits = profile.temptationLimits || {};
  return {
    nickname: normalizeProfileText(profile.nickname || getSavedNickname()),
    petName: normalizeProfileText(currentPetName()),
    finalGoal: normalizeProfileText(profile.finalGoal),
    routineDraft: normalizeProfileText(routineDraftFromProfile(profile)),
    targetPeriod: periodCompareKey(profile.targetPeriod),
    wakeTime: wakeCompareKey(profile.wakeTime),
    theme: normalizeTheme(profile.theme),
    partyLimit: clampRuleLimit(limits.party, 1),
    gameLimit: clampRuleLimit(limits.game, 3),
  };
}

function hasProfileChanges(payload = {}) {
  const next = profileSnapshotFromPayload(payload);
  const current = savedProfileSnapshot();
  return Object.keys(next).some((key) => next[key] !== current[key]);
}

function renderProfileForm() {
  if (!profileModal || !profileForm) {
    return;
  }
  const isSaved = Boolean(profile.completed);
  const isEditing = isSaved && profileEditorOpen;
  const verifyPanelActive = document.querySelector('[data-panel="verify"]')?.classList.contains("active") || false;
  const limits = profile.temptationLimits || {};
  const selectedStarter = profile.starterId || character.id || "tori";
  selfRuleTouched = false;
  profileForm.classList.toggle("saved-profile", isSaved);
  const needsInitialRoom = Boolean(userId) && !isSaved && !hasActiveRoom();
  const shouldShowUnsavedProfile = !isSaved && profileEditorOpen && !verifyPanelActive;
  profileModal.classList.toggle("hidden", !userId || needsInitialRoom || (isSaved ? !profileEditorOpen : !shouldShowUnsavedProfile));
  if (needsInitialRoom) {
    showRoomGateModal();
  } else {
    hideRoomGateModal();
  }
  profileClose?.classList.toggle("hidden", !isSaved && !hasActiveRoom());
  const title = profileForm.querySelector(".section-title h2");
  if (title) {
    title.textContent = isEditing ? "프로필 수정" : "처음 설정";
  }
  const hint = document.querySelector("#profileEditHint");
  if (hint) {
    hint.textContent = isEditing
      ? "원하는 루틴을 편하게 고치면 저장할 때 미션이 다시 짜여요."
      : "하고 싶은 일을 한 번 적으면 자동으로 기간별 미션을 만들어요.";
  }
  const profileNicknameInput = document.querySelector("#profileNickname");
  if (profileNicknameInput) {
    const fixedNickname = profile.nickname || getSavedNickname() || "";
    profileNicknameInput.value = fixedNickname;
    profileNicknameInput.readOnly = Boolean(fixedNickname);
    profileNicknameInput.classList.toggle("locked-input", Boolean(fixedNickname));
    profileNicknameInput.title = fixedNickname ? "닉네임은 계정명이라 중복과 변경을 막아요." : "";
  }
  if (profilePetNameInput) {
    profilePetNameInput.value = currentPetName();
  }
  profileGoalInput.value = profile.finalGoal || "";
  profileRoutineInput.value = routineDraftFromProfile(profile);
  if (routinePolishStatus) {
    routinePolishStatus.textContent = "저장하면 자동으로 일일·주간·월간 미션을 만들어요.";
  }
  if (profileEndDateInput) {
    profileEndDateInput.min = localDateValue();
    profileEndDateInput.value = targetPeriodToEndDate(profile.targetPeriod || "3개월");
  }
  updatePeriodFromDate();
  const wake = parseWakeTime(profile.wakeTime || "6시");
  setWakeTime(wake.hour, wake.minute, { scroll: true });
  profileFocusInput.value = "auto";
  document.querySelector("#profileDifficulty").value = "normal";
  document.querySelector("#profileProof").value = "friend";
  if (profileThemeInput) {
    profileThemeInput.value = normalizeTheme(profile.theme);
  }
  syncThemeSwatches(profileThemeInput?.value || profile.theme);
  profilePartyLimitInput.value = limits.party ?? 1;
  profileGameLimitInput.value = limits.game ?? 3;
  syncSelfRuleDisplays();
  if (profileAutoRulesInput) {
    profileAutoRulesInput.value = isSaved ? "false" : "true";
  }
  if (!isSaved) {
    applyPromptSelfRuleSuggestion({ force: true });
  }
  renderStarterPicker(selectedStarter);
  const starterBox = document.querySelector("#starterBox");
  const starterLockNote = document.querySelector("#starterLockNote");
  starterBox?.classList.toggle("hidden", isSaved);
  starterBox?.classList.toggle("locked", isSaved);
  starterLockNote?.classList.toggle("hidden", !isSaved);
  starterOptions?.querySelectorAll("[data-starter-id]").forEach((button) => {
    button.disabled = isSaved;
  });
  const submit = document.querySelector("#profileSubmit");
  if (submit) {
    submit.textContent = isEditing ? "수정 저장하기" : "내 미션 만들기";
  }
}

function syncGameState() {
  const completionRate = document.querySelector("#completionRate");
  const completionBar = document.querySelector("#completionBar");
  const healthBar = document.querySelector("#healthBar");
  const streakCount = document.querySelector("#streakCount");
  const weeklyLeft = document.querySelector("#weeklyLeft");
  const level = activePetLevel();
  const completion = Math.min(100, Math.max(0, Math.round(Number(gameState.completion || 0))));
  const health = Math.min(100, Math.max(0, Math.round(Number(gameState.health || 0))));
  const xp = Math.max(0, Math.floor(Number(character.xp ?? gameState.xp ?? 0)));
  const xpMax = Math.max(100, Math.floor(Number(character.xpMax ?? gameState.xpMax ?? 100)));

  petLevel.textContent = `Lv. ${level}`;
  completionRate.textContent = completion;
  completionBar.style.width = `${completion}%`;
  if (xpProgressText) {
    xpProgressText.textContent = `${xp}/${xpMax}`;
  }
  if (xpBar) {
    xpBar.style.width = `${Math.min(100, Math.max(0, Math.round((xp / xpMax) * 100)))}%`;
  }
  if (healthBar) {
    healthBar.style.width = `${health}%`;
  }
  const conditionCard = document.querySelector(".condition-card");
  if (conditionCard) {
    const decay = gameState.conditionDecay || {};
    const decayAmount = Math.max(0, Math.round(Number(decay.amount || 0)));
    const decayReasons = Array.isArray(decay.reasons) ? decay.reasons.filter(Boolean).join(", ") : "";
    conditionCard.dataset.decayed = decayAmount > 0 ? "true" : "false";
    conditionCard.title = decayAmount > 0
      ? `최근 하락 -${decayAmount}${decayReasons ? ` · ${decayReasons}` : ""}`
      : "미션, 출석, 밥주기로 컨디션을 관리해요";
  }
  const attendanceStreak = Math.max(0, Math.floor(Number(gameState.attendance?.streak ?? gameState.attendanceStreak ?? gameState.streak ?? 0)));
  streakCount.textContent = `${attendanceStreak}일`;
  weeklyLeft.textContent = `${Math.max(0, Math.floor(Number(gameState.weeklyLeft ?? 5)))}개`;
  petXp.textContent = `${xp}/${xpMax}`;
  petCoin.textContent = Math.max(0, Math.floor(Number(gameState.coin || 0)));
  renderCoinPile(Math.max(0, Math.floor(Number(gameState.coin || 0))));
  petBond.textContent = Math.max(0, Math.floor(Number(gameState.bond || 0)));
  if (petHealth) {
    petHealth.textContent = health;
  }
  syncPetCondition(health);
  petMood.textContent = cozyAppMessage(gameState.mood) || petMood.textContent;
  const itemGachaCost = gacha.cost || 20;
  gachaButton.textContent = gameState.coin < itemGachaCost ? `${itemGachaCost}코인 필요` : "아이템 뽑기";
  gachaButton.disabled = gameState.coin < itemGachaCost;
  renderGachaOdds();
  renderGachaResult();
  if (petDrawButton) {
    const petCost = petGacha.cost || 90;
    const left = drawablePetLockedCount();
    petDrawButton.textContent = left <= 0
      ? "모두 해금"
      : (gameState.coin < petCost ? `${petCost}코인 필요` : "새 펫 뽑기");
    petDrawButton.disabled = gameState.coin < petCost || left <= 0;
  }
  renderStats();
  renderFeedButton();
  renderPetActions();
  renderLevelRewards();
  renderFriendRewards();
  renderAttendanceButton();
  renderServerTime();
  renderPenalty();
  renderQuickShare();
}

function renderLevelRewards() {
  const panel = document.querySelector("#panel-growth");
  if (!panel) {
    return;
  }
  let card = document.querySelector("#levelRewardRoadmap");
  if (!card) {
    card = document.createElement("article");
    card.id = "levelRewardRoadmap";
    card.className = "level-reward-card";
    const anchor = panel.querySelector(".gacha-card");
    panel.insertBefore(card, anchor);
  }
  const level = Math.max(1, Math.floor(Number(gameState.level || character.level || 1)));
  const rewards = [
    ...petActionCatalog.map((action) => ({
      level: action.unlockLevel,
      title: action.label,
      note: `${action.rewardText} · 하루 ${action.dailyLimit}회`,
    })),
    { level: 10, title: "방 업그레이드", note: "펫 공간이 더 좋아져요" },
    { level: 15, title: "특별 포즈", note: "성공 공유 카드 강화" },
    { level: 20, title: "프로필 프레임", note: "그룹 카드 프레임" },
  ].sort((left, right) => left.level - right.level);
  const next = rewards.find((reward) => level < reward.level);
  card.innerHTML = `
    <div class="level-reward-head">
      <div>
        <span class="label">성장 보상</span>
        <strong>${next ? `다음 Lv.${next.level} · ${next.title}` : "모든 기본 보상 해금"}</strong>
      </div>
      <span>Lv.${level}</span>
    </div>
    <div class="level-reward-list">
      ${rewards.map((reward) => `
        <div class="${level >= reward.level ? "unlocked" : ""}">
          <em>Lv.${reward.level}</em>
          <strong>${escapeHtml(reward.title)}</strong>
          <small>${rewardTextHtml(reward.note)}</small>
        </div>
      `).join("")}
    </div>
  `;
}

function renderFriendRewards() {
  const panel = document.querySelector("#panel-growth");
  if (!panel) {
    return;
  }
  let card = document.querySelector("#friendRewardTrack");
  if (!card) {
    card = document.createElement("article");
    card.id = "friendRewardTrack";
    card.className = "friend-reward-card";
    const anchor = document.querySelector("#levelRewardRoadmap") || panel.querySelector(".gacha-card");
    panel.insertBefore(card, anchor);
  }
  const bond = Math.max(0, Math.floor(Number(gameState.bond || 0)));
  const claimed = new Set(Array.isArray(friendRewards?.claimed) ? friendRewards.claimed : []);
  const remainingRewards = friendRewardCatalog.filter((reward) => !claimed.has(reward.id));
  if (remainingRewards.length === 0) {
    card.hidden = true;
    card.innerHTML = "";
    return;
  }
  card.hidden = false;
  const next = remainingRewards[0] || null;
  card.innerHTML = `
    <div class="friend-reward-head">
      <div>
        <span class="label">우정 보상</span>
        <strong>${next.requiredBond} 우정 · ${next.title}</strong>
      </div>
      <span>${bond}</span>
    </div>
    <div class="friend-reward-list">
      ${remainingRewards.map((reward) => {
        const ready = bond >= reward.requiredBond;
        const left = Math.max(0, reward.requiredBond - bond);
        return `
          <div class="${ready ? "ready" : ""}">
            <div>
              <em>${reward.requiredBond}</em>
              <strong>${escapeHtml(reward.title)}</strong>
              <small>${rewardTextHtml(reward.note)}</small>
            </div>
            <button type="button" data-claim-friend-reward="${escapeHtml(reward.id)}" ${ready ? "" : "disabled"}>
              ${ready ? "받기" : `${left}`}
            </button>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderGachaOdds() {
  if (!gachaOdds) {
    return;
  }
  const odds = Array.isArray(gacha.odds) ? gacha.odds : [];
  if (odds.length === 0) {
    gachaOdds.innerHTML = "";
    return;
  }
  gachaOdds.innerHTML = odds
    .map((item) => `
      <span class="gacha-odd ${escapeHtml(item.id || "")}">
        <span>
          <strong>${escapeHtml(gachaOddLabel(item.label || ""))}</strong>
          <small>${escapeHtml(gachaOddDescription(item.id || ""))}</small>
        </span>
        <em>${escapeHtml(String(item.percent ?? 0))}%</em>
      </span>
    `)
    .join("");
}

function gachaOddLabel(label = "") {
  return String(label || "").replace(/악세서리/g, "액세서리");
}

function gachaOddDescription(id = "") {
  if (id === "palette") {
    return "펫 색상 바꾸기";
  }
  if (id === "rare") {
    return "기본 꾸미기";
  }
  if (id === "epic") {
    return "특별 꾸미기";
  }
  if (id === "legend") {
    return "최고 등급";
  }
  return "꾸미기 보상";
}

function renderGachaResult() {
  if (!gachaResult || !gachaResultPanel) {
    return;
  }
  const draw = gacha?.lastDraw;
  if (!draw) {
    gachaResult.textContent = "색상 변경권 또는 액세서리 중 하나가 나와요.";
    gachaResultPanel.className = "gacha-result-pill empty";
    gachaResultPanel.innerHTML = `
      <span class="gacha-item-mark" aria-hidden="true"></span>
      <span>
        <strong>아직 뽑은 기록 없음</strong>
        <small>뽑기 후 결과가 여기에 남아요.</small>
      </span>
    `;
    return;
  }
  const rarity = rarityText(draw.rarity);
  const name = draw.name || "아이템";
  const effect = draw.effectLabel || (draw.type === "palette-ticket" ? "색상 변경에서 사용" : "액세서리 보관함에 추가");
  const typeLabel = draw.type === "palette-ticket" ? "색상권" : draw.type === "bonus" ? "보너스" : "액세서리";
  gachaResult.textContent = "방금 뽑은 보상을 아래에 저장했어요.";
  gachaResultPanel.className = `gacha-result-pill ${String(draw.rarity || "RARE").toLowerCase()} ${draw.type === "palette-ticket" ? "palette" : "accessory"}`;
  gachaResultPanel.innerHTML = `
    <span class="gacha-item-mark" aria-hidden="true"></span>
    <span>
      <strong>${escapeHtml(name)}</strong>
      <small>${escapeHtml(rarity)} · ${escapeHtml(typeLabel)} · ${rewardTextHtml(effect)}</small>
    </span>
  `;
}

function feedSecondsLeft(feedLog = currentFeedLog()) {
  return 0;
}

function formatFeedLeft(seconds) {
  const totalMinutes = Math.max(1, Math.ceil(Number(seconds || 0) / 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0 && minutes > 0) {
    return `${hours}시간 ${minutes}분 후`;
  }
  if (hours > 0) {
    return `${hours}시간 후`;
  }
  return `${minutes}분 후`;
}

function currentFeedLog() {
  const raw = gameState.feedLog || character?.feedLog || {};
  const todayKey = serverTime?.daily?.key || raw.key || "";
  const unlimited = false;
  const limit = unlimited ? 0 : Math.max(1, Math.floor(Number(raw.limit || 3)));
  const sameDay = !raw.key || !todayKey || raw.key === todayKey;
  const count = sameDay ? Math.max(0, Math.floor(Number(raw.count || 0))) : 0;
  return {
    key: sameDay ? raw.key || todayKey : todayKey,
    count: unlimited ? count : Math.min(limit, count),
    limit,
    unlimited,
    lastFedAt: raw.lastFedAt || gameState.lastFedAt || "",
  };
}

function currentPetActionLog() {
  const raw = character?.petActions || gameState.petActions || {};
  const todayKey = serverTime?.daily?.key || raw.key || "";
  const sameDay = !raw.key || !todayKey || raw.key === todayKey;
  const rawCounts = sameDay && raw.counts && typeof raw.counts === "object" ? raw.counts : {};
  return {
    key: sameDay ? raw.key || todayKey : todayKey,
    counts: Object.fromEntries(
      petActionCatalog.map((action) => [
        action.id,
        Math.min(action.dailyLimit, Math.max(0, Math.floor(Number(rawCounts[action.id] || 0)))),
      ]),
    ),
  };
}

function levelFromStateSnapshot(state = {}) {
  const source = state.character || {};
  return Math.max(1, Math.floor(Number(source.level || state.game?.level || 1)));
}

function normalizeUnlockedPetActions(actions = []) {
  return (Array.isArray(actions) ? actions : [])
    .map((action) => petActionCatalog.find((item) => item.id === action?.id || item.id === action))
    .filter(Boolean);
}

function petActionsUnlockedBetween(previousLevel, nextLevel) {
  const before = Math.max(1, Math.floor(Number(previousLevel || 1)));
  const after = Math.max(1, Math.floor(Number(nextLevel || before)));
  if (after <= before) {
    return [];
  }
  return petActionCatalog.filter((action) => before < action.unlockLevel && after >= action.unlockLevel);
}

function petActionUnlockText(actions = [], level = activePetLevel()) {
  const labels = actions.map((action) => action.label).filter(Boolean).slice(0, 2);
  if (labels.length === 0) {
    return "";
  }
  return `Lv.${level} · ${labels.join(", ")} 열림`;
}

function rememberPetActionUnlocks(actions = []) {
  recentPetActionUnlockIds = new Set(actions.map((action) => action.id).filter(Boolean));
}

function clearRecentPetActionUnlock(actionId = "") {
  if (!recentPetActionUnlockIds.has(actionId)) {
    return;
  }
  recentPetActionUnlockIds.delete(actionId);
  renderPetActions();
}

function spotlightPetActionUnlock(actions = [], level = activePetLevel()) {
  if (actions.length === 0) {
    return;
  }
  const first = actions[0];
  petMood.textContent = `${first.label}이 열렸어요. 바로 눌러볼 수 있어요`;
  window.setTimeout(() => {
    const safeId = String(first.id || "").replace(/[^a-z0-9_-]/gi, "");
    const firstButton = safeId ? petActionList?.querySelector(`[data-pet-action="${safeId}"]`) : null;
    firstButton?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    firstButton?.classList.add("unlock-pulse");
    window.setTimeout(() => firstButton?.classList.remove("unlock-pulse"), 1400);
  }, 80);
  showReward(petActionUnlockText(actions, level));
}

function renderFeedButton() {
  if (!petFeedButton || !petFeedCooldown) {
    return;
  }
  const compact = petActionCatalog.some((action) => activePetLevel() >= action.unlockLevel);
  const feedLog = currentFeedLog();
  const cooldownSeconds = feedSecondsLeft(feedLog);
  const completed = !feedLog.unlimited && feedLog.count >= feedLog.limit;
  const canFeed = !completed && cooldownSeconds <= 0;
  petFeedButton.disabled = !canFeed;
  petFeedButton.classList.toggle("ready", canFeed);
  petFeedButton.classList.toggle("cooldown", !canFeed);
  if (completed) {
    petFeedCooldown.textContent = compact ? `${feedLog.limit}/${feedLog.limit}` : `오늘 ${feedLog.limit}/${feedLog.limit} 완료`;
  } else if (cooldownSeconds > 0) {
    petFeedCooldown.textContent = compact ? `${feedLog.count}회 대기` : `오늘 ${feedLog.count}회 · ${formatFeedLeft(cooldownSeconds)}`;
  } else {
    petFeedCooldown.textContent = compact ? `${feedLog.count}/${feedLog.limit}` : `오늘 ${feedLog.count}/${feedLog.limit}`;
  }
}

function renderPetActions() {
  if (!petActionList) {
    return;
  }
  const level = activePetLevel();
  const log = currentPetActionLog();
  const unlockedActions = petActionCatalog.filter((action) => level >= action.unlockLevel);
  if (petCareGrid) {
    petCareGrid.classList.toggle("has-actions", unlockedActions.length > 0);
    petCareGrid.classList.toggle("has-many-actions", unlockedActions.length >= 3);
    if (unlockedActions.length > 0) {
      petCareGrid.dataset.actionCount = String(Math.min(unlockedActions.length, 5));
    } else {
      delete petCareGrid.dataset.actionCount;
    }
  }
  petActionList.classList.toggle("hidden", unlockedActions.length === 0);
  petActionList.innerHTML = unlockedActions
    .map((action) => {
      const count = Math.max(0, Math.floor(Number(log.counts[action.id] || 0)));
      const done = count >= action.dailyLimit;
      const stateText = `${count}/${action.dailyLimit}`;
      const newlyUnlocked = recentPetActionUnlockIds.has(action.id);
      return `
        <button
          class="pet-action-button unlocked ${done ? "done" : ""} ${newlyUnlocked ? "newly-unlocked" : ""}"
          type="button"
          data-pet-action="${escapeHtml(action.id)}"
          ${done ? "disabled" : ""}
          aria-label="${escapeHtml(`${action.label} ${newlyUnlocked ? "새로 열림" : stateText}`)}"
        >
          <span class="pet-action-icon" aria-hidden="true">${escapeHtml(action.icon)}</span>
          <span>
            <strong>${escapeHtml(action.label)}</strong>
            <small>${rewardTextHtml(action.rewardText)}</small>
          </span>
          <em>${escapeHtml(newlyUnlocked ? "NEW" : done ? "완료" : stateText)}</em>
        </button>
      `;
    })
    .join("");
}

function renderAttendanceButton() {
  if (!attendanceButton) {
    return;
  }
  const labelNode = attendanceButton.querySelector("#attendanceLabel");
  const rewardNode = attendanceButton.querySelector("#attendanceReward");
  if (!labelNode || !rewardNode) {
    return;
  }
  const todayKey = serverTime?.daily?.key || "";
  const attendance = gameState.attendance || {};
  const claimedToday = Boolean(todayKey && attendance.lastKey === todayKey);
  const streak = Math.max(0, Math.floor(Number(attendance.streak || 0)));
  attendanceButton.disabled = claimedToday;
  attendanceButton.classList.toggle("claimed", claimedToday);
  attendanceButton.title = claimedToday ? "오늘 출석 보상을 이미 받았어요" : "오늘 출석 보상을 받아요";
  labelNode.textContent = claimedToday ? "완료" : "출석";
  rewardNode.textContent = claimedToday
    ? `${Math.max(1, streak)}일`
    : "+20";
}

function renderCoinPile(coinCount = 0) {
  if (!coinPile) {
    return;
  }
  const count = Math.max(0, Math.floor(Number(coinCount || 0)));
  const level = Math.min(5, Math.max(0, Math.ceil(count / 20)));
  coinPile.dataset.coinLevel = String(level);
  coinPile.classList.toggle("empty", level === 0);
  const coinDots = Array.from({ length: Math.max(0, level * 2 + 1) }, (_, index) => (
    `<span class="coin-dot coin-dot-${index + 1}"></span>`
  )).join("");
  coinPile.innerHTML = `<span class="coin-base"></span>${coinDots}<span class="coin-shine"></span>`;
}

function playCoinStackEffect(amount = 1) {
  if (!coinPile) {
    return;
  }
  const burstCount = Math.min(7, Math.max(3, Math.ceil(Number(amount || 1) / 4)));
  coinPile.classList.remove("coin-pop");
  window.requestAnimationFrame(() => {
    coinPile.classList.add("coin-pop");
  });
  for (let index = 0; index < burstCount; index += 1) {
    const coin = document.createElement("span");
    coin.className = "coin-drop";
    coin.style.setProperty("--coin-x", `${(index - (burstCount - 1) / 2) * 9}px`);
    coin.style.setProperty("--coin-delay", `${index * 72}ms`);
    coinPile.appendChild(coin);
    window.setTimeout(() => coin.remove(), 980 + index * 80);
  }
  window.setTimeout(() => coinPile.classList.remove("coin-pop"), 760);
}

function renderStats() {
  const stats = {
    power: 10,
    focus: 10,
    skill: 10,
    will: 10,
    ...(gameState.stats || {}),
  };
  [stats.power, stats.focus, stats.skill, stats.will].forEach((value, index) => {
    if (statTargets[index]) {
      statTargets[index].textContent = Math.round(Number(value || 0));
    }
  });
}

function renderPenalty() {
  const penalty = Number(gameState.penalty || 0);
  const log = gameState.temptations || {};
  const counts = log.counts || {};
  const limits = log.limits || profile.temptationLimits || {};
  document.querySelectorAll("[data-temptation]").forEach((button) => {
    const type = button.dataset.temptation;
    const label = temptationLabels[type] || type;
    const count = Number(counts[type] || 0);
    const limit = Number(limits[type] ?? 0);
    const isOver = count > limit;
    const isReached = count === limit && limit > 0;
    const isActivePenalty = penalty > 0 && (gameState.penaltyReason === type || gameState.penaltyReason === label);
    button.classList.toggle("active-penalty", isOver || isActivePenalty);
    button.classList.toggle("within-limit", count > 0 && !isOver);
    button.classList.toggle("limit-reached", isReached);
    button.innerHTML = `<span>${label}</span><small>${count}/${limit}회</small>`;
    button.title = isOver
      ? `이번 주 ${label} ${count}/${limit}회 · 기준 초과`
      : `이번 주 ${label} ${count}/${limit}회 · 초과 전까지 패널티 없음`;
  });
}

function getTemptationProgress(type) {
  const log = gameState.temptations || {};
  const counts = log.counts || {};
  const limits = log.limits || profile.temptationLimits || {};
  const count = Number(counts[type] || 0);
  const limit = Number(limits[type] ?? 0);
  return { count, limit, next: count + 1 };
}

function openTemptationConfirm(type) {
  if (!temptationConfirmModal || !temptationConfirmTitle || !temptationConfirmText) {
    return false;
  }
  pendingTemptationType = type;
  const label = temptationLabels[type] || type;
  const { count, limit, next } = getTemptationProgress(type);
  const willOver = next > limit;
  const baseHealthPenalty = temptationHealthPenalty[type] || 8;
  const healthPenalty = count > limit ? Math.max(3, Math.ceil(baseHealthPenalty / 2)) : baseHealthPenalty;
  temptationConfirmTitle.textContent = `${label} 기록`;
  temptationConfirmText.textContent = willOver
    ? `${count}/${limit}회 → 기준 초과. 컨디션 -${healthPenalty}, 보상 패널티.`
    : `${count}/${limit}회 → ${next}/${limit}회. 패널티 없음.`;
  if (temptationConfirmIcon) {
    temptationConfirmIcon.textContent = label;
    temptationConfirmIcon.className = `temptation-confirm-pet ${type}`;
  }
  if (temptationConfirmSubmit) {
    temptationConfirmSubmit.textContent = "기록";
  }
  temptationConfirmModal.classList.remove("hidden");
  return true;
}

function closeTemptationConfirm() {
  pendingTemptationType = "";
  temptationConfirmModal?.classList.add("hidden");
}

function renderQuickShare() {
  const lastMission = gameState.lastCompletedMission;
  if (!quickShareCard || !quickShareTitle) {
    return;
  }
  const hasMission = Boolean(lastMission?.id || lastMission?.title);
  quickShareCard.classList.toggle("hidden", !hasMission);
  if (hasMission) {
    quickShareTitle.textContent = "공유 카드 만들기";
    quickShareButton.dataset.shareQuestId = lastMission.id || "";
  }
}

function clearLastCompletedShareLocal() {
  if (gameState?.lastCompletedMission) {
    gameState = { ...gameState, lastCompletedMission: null };
  }
  renderQuickShare();
  renderNotifications();
}

async function dismissLastCompletedShare() {
  const lastMission = gameState?.lastCompletedMission;
  if (!lastMission?.id && !lastMission?.title) {
    renderQuickShare();
    return;
  }
  clearLastCompletedShareLocal();
  try {
    const result = await api("/api/pet/share-dismiss", {
      missionId: lastMission.id || "",
      completedAt: lastMission.completedAt || "",
    }, { dedupe: false });
    if (result?.state) {
      applyState(result.state, null, { animate: false });
    }
  } catch {
    // The local hide keeps the interface calm; the next state refresh can retry if needed.
  }
}

const externalMoodLabels = {
  daily: "오늘의 한마디",
  proud: "좋았어요",
  tired: "힘들어요",
  help: "응원받기",
  flex: "자랑하기",
};

const shareMoodHints = {
  daily: {
    hint: "80자 안으로 귀엽게 남겨봐요.",
    cta: "한마디 남기기",
  },
  proud: {
    hint: "오늘 잘 된 일을 그룹에 남겨요.",
    cta: "좋았어요 공유",
  },
  tired: {
    hint: "조금 지친 날은 상태만 살짝 알려도 돼요.",
    cta: "힘들어요 공유",
  },
  help: {
    hint: "미션을 밀어줄 친구 응원을 불러요.",
    cta: "응원 요청",
  },
  flex: {
    hint: "잘한 순간을 반짝 기록으로 보여줘요.",
    cta: "자랑 공유",
  },
};

function activeShareMood() {
  return document.querySelector("[data-share-mood].active")?.dataset.shareMood || "daily";
}

function dailyShareText() {
  return String(dailyShareNote?.value || "").trim().slice(0, 80);
}

function fallbackDailyShareText() {
  return `${currentPetName()}랑 ${cozyPokeObject(currentPetName())} 한 조각 나눴어요.`;
}

function syncShareMoodHint() {
  const mood = activeShareMood();
  const copy = shareMoodHints[mood] || shareMoodHints.proud;
  if (shareMoodHint) {
    shareMoodHint.textContent = copy.hint;
  }
  if (sharePetButton) {
    sharePetButton.textContent = copy.cta;
    sharePetButton.setAttribute("aria-label", copy.cta);
    sharePetButton.title = copy.cta;
  }
}

function buildExternalSharePayload(kind = "current") {
  const lastMission = kind === "last" ? gameState.lastCompletedMission : null;
  const missionTitle = lastMission ? missionOpenTitle(lastMission) : "";
  const moodTag = missionTitle ? "success" : activeShareMood();
  const moodLabel = missionTitle ? "미션 성공" : externalMoodLabels[moodTag] || "소식";
  const todayLine = dailyShareText();
  const health = Math.round(Number(gameState.health || 0));
  const completion = Math.round(Number(gameState.completion || 0));
  const accessoryIds = equippedAccessoryIds();
  return {
    author: profile.nickname || getSavedNickname() || "나",
    petName: currentPetName(),
    rarity: character.rarityLabel || character.rarity || "노말",
    characterId: character.id || "tori",
    accessoryId: accessoryIds[0] || "",
    accessoryIds,
    equippedAccessories,
    paletteId: activePetPalette(),
    moodTag,
    moodLabel,
    missionTitle,
    message: missionTitle
      ? `${missionTitle} 성공! ${currentPetName()}이 반짝 포즈 중이에요.`
      : (todayLine || fallbackDailyShareText()),
    completion,
    health,
    bond: Math.round(Number(gameState.bond || 0)),
    level: Math.max(1, Math.floor(Number(gameState.level || 1))),
  };
}

function shareTextForPayload(payload) {
  const lines = [
    `Godlife Quest · ${payload.petName}`,
    payload.missionTitle ? `${payload.missionTitle} 성공!` : "오늘의 한마디",
    payload.message,
    `컨디션 ${payload.health} · 오늘 달성 ${payload.completion}% · Lv.${payload.level}`,
  ];
  return lines.filter(Boolean).join("\n");
}

function roundRect(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.arcTo(x + width, y, x + width, y + height, safeRadius);
  ctx.arcTo(x + width, y + height, x, y + height, safeRadius);
  ctx.arcTo(x, y + height, x, y, safeRadius);
  ctx.arcTo(x, y, x + width, y, safeRadius);
  ctx.closePath();
}

function fillRoundRect(ctx, x, y, width, height, radius, color) {
  roundRect(ctx, x, y, width, height, radius);
  ctx.fillStyle = color;
  ctx.fill();
}

function strokeRoundRect(ctx, x, y, width, height, radius, color, lineWidth = 6) {
  roundRect(ctx, x, y, width, height, radius);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 2) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const nextLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(nextLine).width <= maxWidth || !line) {
      line = nextLine;
    } else {
      lines.push(line);
      line = word;
      if (lines.length >= maxLines - 1) {
        break;
      }
    }
  }
  if (line && lines.length < maxLines) {
    lines.push(line);
  }
  lines.forEach((lineText, index) => ctx.fillText(lineText, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
}

function loadSvgImage(svgText) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const normalizedSvg = String(svgText || "").includes("xmlns=")
      ? String(svgText || "")
      : String(svgText || "").replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    const blob = new Blob([normalizedSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("펫 이미지를 만들지 못했어요"));
    };
    image.src = url;
  });
}

async function drawSharePet(ctx, payload, x, y, size) {
  const sprite = spriteForCharacter(payload.characterId, payload.paletteId);
  const petImage = await loadSvgImage(createPetSvg(sprite));
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(petImage, x, y, size, size);
  for (const accessoryId of accessoryIdList(payload.accessoryIds || payload.accessoryId)) {
    const accessorySvg = createAccessorySvg(accessoryId);
    if (!accessorySvg) {
      continue;
    }
    const accessoryImage = await loadSvgImage(accessorySvg);
    ctx.drawImage(accessoryImage, x, y, size, size);
  }
}

function canvasToPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("공유 이미지를 만들지 못했어요"));
      }
    }, "image/png", 0.95);
  });
}

async function createExternalShareImage(payload) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("공유 이미지를 만들지 못했어요");
  }

  ctx.fillStyle = "#fff9e8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(47, 64, 87, 0.08)";
  ctx.lineWidth = 2;
  for (let x = 0; x <= canvas.width; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  fillRoundRect(ctx, 70, 70, 940, 1210, 34, "rgba(255, 255, 255, 0.86)");
  strokeRoundRect(ctx, 70, 70, 940, 1210, 34, "#2f4057", 8);

  ctx.fillStyle = "#2f4057";
  ctx.font = "900 34px sans-serif";
  ctx.fillText("GODLIFE QUEST", 118, 145);
  ctx.font = "900 76px sans-serif";
  wrapCanvasText(ctx, payload.missionTitle ? `${payload.petName}의 성공 순간` : `${payload.petName}의 오늘`, 118, 230, 820, 82, 2);

  fillRoundRect(ctx, 118, 300, 844, 600, 28, "#dff5ff");
  strokeRoundRect(ctx, 118, 300, 844, 600, 28, "#2f4057", 7);
  ctx.fillStyle = "#bfe9c8";
  ctx.fillRect(125, 620, 830, 273);
  ctx.fillStyle = "rgba(47, 64, 87, 0.16)";
  ctx.beginPath();
  ctx.ellipse(540, 760, 190, 48, 0, 0, Math.PI * 2);
  ctx.fill();
  fillRoundRect(ctx, 250, 405, 220, 24, 0, "#2f4057");
  fillRoundRect(ctx, 250, 445, 260, 42, 0, "#eab17f");
  strokeRoundRect(ctx, 250, 445, 260, 42, 0, "#2f4057", 5);
  fillRoundRect(ctx, 780, 420, 90, 90, 0, "#ffdc6e");
  strokeRoundRect(ctx, 780, 420, 90, 90, 0, "#2f4057", 5);
  fillRoundRect(ctx, 715, 610, 230, 120, 0, "#eab17f");
  strokeRoundRect(ctx, 715, 610, 230, 120, 0, "#2f4057", 7);
  await drawSharePet(ctx, payload, 330, 430, 420);

  fillRoundRect(ctx, 118, 930, 844, 112, 24, "#fff7d8");
  strokeRoundRect(ctx, 118, 930, 844, 112, 24, "#2f4057", 6);
  ctx.fillStyle = "#2f4057";
  ctx.font = "900 38px sans-serif";
  wrapCanvasText(ctx, payload.missionTitle || payload.moodLabel, 154, 998, 760, 44, 2);

  const stats = [
    ["달성", `${payload.completion}%`],
    ["컨디션", `${payload.health}`],
    ["우정", `${payload.bond}`],
  ];
  stats.forEach(([label, value], index) => {
    const x = 118 + index * 288;
    fillRoundRect(ctx, x, 1076, 260, 112, 20, "#ffffff");
    strokeRoundRect(ctx, x, 1076, 260, 112, 20, "#2f4057", 5);
    ctx.fillStyle = "#69758a";
    ctx.font = "800 28px sans-serif";
    ctx.fillText(label, x + 28, 1122);
    ctx.fillStyle = "#2f4057";
    ctx.font = "900 42px sans-serif";
    ctx.fillText(value, x + 28, 1172);
  });

  ctx.fillStyle = "#69758a";
  ctx.font = "800 30px sans-serif";
  wrapCanvasText(ctx, payload.message, 118, 1242, 844, 38, 2);
  return canvasToPngBlob(canvas);
}

function shareFileName(payload) {
  const safeName = String(payload.petName || "godlife-pet").replace(/[^\w가-힣-]+/g, "-").slice(0, 24);
  return `${safeName}-share.png`;
}

function downloadShareBlob(blob, payload) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = shareFileName(payload);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function copyExternalShareText(payload) {
  const text = shareTextForPayload(payload);
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
  }
  return text;
}

async function shareExternally(kind = "current") {
  const payload = buildExternalSharePayload(kind);
  const text = shareTextForPayload(payload);
  const blob = await createExternalShareImage(payload);
  const file = new File([blob], shareFileName(payload), { type: "image/png" });
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: payload.missionTitle ? `${payload.petName}의 성공 순간` : `${payload.petName}의 오늘`,
        text,
        files: [file],
      });
      showReward("공유 열기");
      if (kind === "last") {
        await dismissLastCompletedShare();
      }
      return;
    }
    if (navigator.share) {
      await navigator.share({
        title: payload.missionTitle ? `${payload.petName}의 성공 순간` : `${payload.petName}의 오늘`,
        text,
        url: window.location.href,
      });
      showReward("공유 열기");
      if (kind === "last") {
        await dismissLastCompletedShare();
      }
      return;
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      return;
    }
  }
  downloadShareBlob(blob, payload);
  try {
    await copyExternalShareText(payload);
  } catch {
    // Sharing fallbacks should still offer the saved image even when clipboard is unavailable.
  }
  petMood.textContent = "인스타에는 저장된 이미지를 올리고, 카톡에는 복사된 문구를 붙여넣으면 돼요";
  showReward("이미지 저장");
  if (kind === "last") {
    await dismissLastCompletedShare();
  }
}

async function saveExternalShareImage(kind = "current") {
  const payload = buildExternalSharePayload(kind);
  const blob = await createExternalShareImage(payload);
  downloadShareBlob(blob, payload);
  try {
    await copyExternalShareText(payload);
  } catch {
    // Clipboard is optional for image saving.
  }
  petMood.textContent = "공유 이미지와 문구를 준비했어요";
  showReward("이미지 저장");
}

const featurePanelTitles = {
  daily: "퀘스트",
  verify: "인증 요청",
  brag: "펫 소식",
  growth: "상점",
};

function isFeatureWindowOpen() {
  return Boolean(featureWindow && !featureWindow.classList.contains("hidden"));
}

function closeActiveLayer() {
  if (isOpenModal(temptationConfirmModal)) {
    closeTemptationConfirm();
    return true;
  }
  if (isOpenModal(missionEditModal)) {
    closeMissionEditModal();
    return true;
  }
  if (isOpenModal(proofModal)) {
    closeProofModal();
    return true;
  }
  if (isOpenModal(roomModal)) {
    closeRoomModal();
    return true;
  }
  if (isOpenModal(notificationModal)) {
    closeNotificationModal();
    return true;
  }
  if (isOpenModal(questModal)) {
    closeQuestModal();
    return true;
  }
  if (isOpenModal(profileModal)) {
    closeProfileModal();
    return true;
  }
  if (isFeatureWindowOpen()) {
    closeFeatureWindow();
    return true;
  }
  return false;
}

function appBack() {
  closeActiveLayer();
}

function goHome() {
  closeTemptationConfirm();
  closeMissionEditModal();
  closeProofModal();
  closeRoomModal();
  closeNotificationModal();
  closeQuestModal();
  if (profile.completed && isOpenModal(profileModal)) {
    closeProfileModal();
  }
  closeFeatureWindow();
  if (window.location.search) {
    window.history.replaceState({}, "", window.location.pathname);
  }
  document.querySelector(".phone-frame")?.scrollTo({ top: 0, behavior: "smooth" });
}

function activatePanel(panelName, options = {}) {
  const safePanelName = featurePanelTitles[panelName] ? panelName : "daily";
  document.querySelectorAll(".tab-button").forEach((item) => {
    const selected = item.dataset.panel === safePanelName;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-selected", selected ? "true" : "false");
  });
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `panel-${safePanelName}`);
  });
  if (featureWindowTitle) {
    featureWindowTitle.textContent = featurePanelTitles[safePanelName] || "창";
  }
  if (options.open !== false) {
    featureWindow?.classList.remove("hidden");
    featureWindow?.classList.add("open");
    document.body.classList.add("feature-window-open");
  }
  renderProfileForm();
  if (safePanelName === "verify") {
    refreshState({ force: true });
  }
}

function openPanelFromUrl() {
  const panel = new URLSearchParams(window.location.search).get("panel");
  if (panel && featurePanelTitles[panel]) {
    activatePanel(panel);
    window.history.replaceState({}, "", window.location.pathname);
  }
}

function closeFeatureWindow() {
  featureWindow?.classList.add("hidden");
  featureWindow?.classList.remove("open");
  document.body.classList.remove("feature-window-open");
  document.querySelectorAll(".tab-button").forEach((item) => {
    item.classList.remove("active");
    item.setAttribute("aria-selected", "false");
  });
  const homeTab = document.querySelector("[data-home-button]");
  homeTab?.classList.add("active");
  homeTab?.setAttribute("aria-selected", "true");
}

function logout() {
  window.localStorage.removeItem(savedUserIdKey);
  window.localStorage.removeItem(savedNicknameKey);
  window.location.reload();
}

async function shareQuestById(questId) {
  const quest = findQuestById(questId) || gameState.lastCompletedMission || {};
  const lastMission = gameState.lastCompletedMission || {};
  const isLastCompletedShare = Boolean(
    lastMission.id || lastMission.title,
  ) && (
    !questId
    || quest.id === lastMission.id
    || missionOpenTitle(quest) === missionOpenTitle(lastMission)
  );
  const result = await api("/api/pet/share", {
    moodTag: "flex",
    missionTitle: missionOpenTitle(quest) || "미션 성공",
    missionType: quest.type || "",
    dismissLastCompleted: isLastCompletedShare,
    completedMissionId: lastMission.id || "",
  });
  applyState(result.state, result.reward);
  if (isLastCompletedShare) {
    clearLastCompletedShareLocal();
  }
  celebratePet();
  closeQuestModal();
  activatePanel("brag");
}

function formatLeft(seconds) {
  const safeSeconds = Math.max(0, Number(seconds || 0));
  const days = Math.floor(safeSeconds / 86400);
  const hours = Math.floor((safeSeconds % 86400) / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  if (days > 0) {
    return `${days}일 ${hours}시간`;
  }
  return `${hours}시간 ${minutes}분`;
}

function renderServerTime() {
  const serverNow = document.querySelector("#serverNow");
  const dailyLeft = document.querySelector("#dailyLeft");
  const dailyPeriodLabel = document.querySelector("#dailyPeriodLabel");
  const weeklyPeriodLabel = document.querySelector("#weeklyPeriodLabel");
  const monthlyPeriodLabel = document.querySelector("#monthlyPeriodLabel");

  if (serverNow && serverTime) {
    serverNow.textContent = `서버 ${serverTime.nowLabel}`;
  }
  if (dailyLeft) {
    dailyLeft.textContent = `갱신까지 ${formatLeft(missions.daily?.secondsLeft)}`;
  }
  if (dailyPeriodLabel) {
    dailyPeriodLabel.textContent = `${missions.daily?.key || ""} 고정`;
  }
  if (weeklyPeriodLabel) {
    weeklyPeriodLabel.textContent = `${missions.weekly?.key || ""}부터 7일`;
  }
  if (monthlyPeriodLabel) {
    monthlyPeriodLabel.textContent = `${missions.monthly?.key || ""} 월 기준`;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// 보상 문구의 지표 단어(컨디션/코인/XP/우정)를 의미색 아이콘으로 치환한다.
// escapeHtml 이후에 치환하므로 innerHTML에 안전하다. 스크린리더용 라벨 유지.
function rewardTextHtml(value) {
  return escapeHtml(value)
    .replaceAll("컨디션", '<i class="rw rw-hp" role="img" aria-label="컨디션"></i>')
    .replaceAll("코인", '<i class="rw rw-coin" role="img" aria-label="코인"></i>')
    .replaceAll("XP", '<i class="rw rw-xp" role="img" aria-label="XP"></i>')
    .replaceAll("우정", '<i class="rw rw-bond" role="img" aria-label="우정"></i>');
}

function today() {
  const serverDailyKey = String(missions?.daily?.key || serverTime?.daily?.key || "").slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(serverDailyKey)) {
    return serverDailyKey;
  }
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function openProofModal(questId, options = {}) {
  closeQuestModal();
  pendingQuestId = questId;
  preparedProofPhoto = "";
  proofForm.reset();
  document.querySelector("#proofDate").value = today();
  const noteInput = document.querySelector("#proofNote");
  if (noteInput) {
    noteInput.placeholder = "그룹원이 확인하기 쉽게 한 줄로 적어줘";
  }
  proofPreview.classList.add("hidden");
  proofPreview.removeAttribute("src");
  proofModal.classList.remove("hidden");
  if (options.autoPhoto) {
    prepareProofPhotoInput("camera");
    try {
      proofPhoto?.click();
    } catch {
      // Mobile browsers may block file pickers outside direct user gestures.
    }
  }
}

function closeProofModal() {
  pendingQuestId = null;
  preparedProofPhoto = "";
  proofModal.classList.add("hidden");
}

function openMissionEditModal(questId) {
  const quest = findQuestById(questId);
  if (!quest || !missionEditModal || !missionEditForm) {
    return;
  }
  closeQuestModal();
  pendingMissionEditId = questId;
  missionEditForm.reset();
  if (missionEditType) {
    missionEditType.value = quest.type || "";
  }
  if (missionEditTitle) {
    missionEditTitle.value = quest.title || "";
  }
  if (missionEditNote) {
    missionEditNote.value = quest.note || "";
  }
  missionEditModal.classList.remove("hidden");
  window.setTimeout(() => missionEditTitle?.focus(), 0);
}

function closeMissionEditModal() {
  pendingMissionEditId = "";
  missionEditModal?.classList.add("hidden");
}

function openRoomModal() {
  if (!roomModal || !roomForm) {
    return;
  }
  roomForm.reset();
  document.querySelector("#roomName").value = room?.name || `${profile.nickname || "루틴"} 방`;
  document.querySelector("#roomGoal").value = room?.goal || profile.finalGoal || "";
  document.querySelector("#roomCapacity").value = room?.capacity || 4;
  document.querySelector("#roomProofMode").value = room?.proofMode || "photo";
  roomModal.classList.remove("hidden");
}

function closeRoomModal() {
  roomModal?.classList.add("hidden");
}

function closeProfileModal() {
  profileEditorOpen = false;
  profileModal?.classList.add("hidden");
  applyTheme(profile.theme);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("사진을 읽지 못했어요"));
    reader.readAsDataURL(file);
  });
}

function loadImageFile(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("사진을 불러오지 못했어요"));
    };
    image.src = url;
  });
}

async function fileToDataUrl(file) {
  if (!file || !String(file.type || "").startsWith("image/") || file.type === "image/gif") {
    return readFileAsDataUrl(file);
  }

  const targetLength = 280_000;
  const original = await readFileAsDataUrl(file);
  if (original.length <= targetLength) {
    return original;
  }

  try {
    const image = await loadImageFile(file);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      return original;
    }

    let maxSide = 960;
    let quality = 0.72;
    let best = original;
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const width = image.naturalWidth || image.width || 1;
      const height = image.naturalHeight || image.height || 1;
      const scale = Math.min(1, maxSide / Math.max(width, height));
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      best = canvas.toDataURL("image/jpeg", quality);
      if (best.length <= targetLength) {
        return best;
      }
      maxSide *= 0.78;
      quality = Math.max(0.45, quality - 0.06);
    }
    return best.length < original.length ? best : original;
  } catch {
    return original;
  }
}

function prepareProofPhotoInput(mode = "camera") {
  if (!proofPhoto) {
    return;
  }
  proofPhoto.value = "";
  preparedProofPhoto = "";
  proofPreview?.classList.add("hidden");
  proofPreview?.removeAttribute("src");
  proofPhoto.setAttribute("accept", "image/*");
  if (mode === "library") {
    proofPhoto.removeAttribute("capture");
  } else {
    proofPhoto.setAttribute("capture", "environment");
  }
}

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function bumpPet() {
  petSprite.classList.remove("bump");
  window.requestAnimationFrame(() => {
    petSprite.classList.add("bump");
  });
}

function celebratePet() {
  petSprite.classList.remove("success-pose");
  window.requestAnimationFrame(() => {
    petSprite.classList.add("success-pose");
    window.setTimeout(() => petSprite.classList.remove("success-pose"), 1400);
  });
}

const petPoseClasses = [
  "party-pose",
  "game-pose",
  "feed-pose",
  "walk-pose",
  "workout-pose",
  "youtube-pose",
  "bench-pose",
  "treadmill-pose",
  "bump",
  "success-pose",
];
const roomActionClasses = ["walk-action", "workout-action", "youtube-action", "bench-action", "treadmill-action"];

function clearPetPose() {
  petSprite.classList.remove(...petPoseClasses);
  petRoom?.classList.remove(...roomActionClasses);
}

function playTemptationPose(type) {
  const className = type === "game" ? "game-pose" : "party-pose";
  clearPetPose();
  window.requestAnimationFrame(() => {
    petSprite.classList.add(className);
    window.setTimeout(() => petSprite.classList.remove(className), 1500);
  });
}

function playFeedPose() {
  clearPetPose();
  window.requestAnimationFrame(() => {
    petSprite.classList.add("feed-pose");
    window.setTimeout(() => petSprite.classList.remove("feed-pose"), 1500);
  });
}

function playPetActionPose(actionId) {
  const poseMap = {
    walk: "walk-pose",
    workout: "workout-pose",
    youtube: "youtube-pose",
    bench: "bench-pose",
    treadmill: "treadmill-pose",
  };
  const roomMap = {
    walk: "walk-action",
    workout: "workout-action",
    youtube: "youtube-action",
    bench: "bench-action",
    treadmill: "treadmill-action",
  };
  const poseClass = poseMap[actionId] || "success-pose";
  const roomClass = roomMap[actionId] || "";
  clearPetPose();
  window.requestAnimationFrame(() => {
    petSprite.classList.add(poseClass);
    if (roomClass) {
      petRoom?.classList.add(roomClass);
    }
    window.setTimeout(() => {
      petSprite.classList.remove(poseClass);
      if (roomClass) {
        petRoom?.classList.remove(roomClass);
      }
    }, 1500);
  });
}

function showReward(text) {
  rewardPop.textContent = text;
  rewardPop.classList.remove("show");
  window.requestAnimationFrame(() => {
    rewardPop.classList.add("show");
  });
}

function requestKey(endpoint, payload) {
  return `${endpoint}:${JSON.stringify(payload || {})}`;
}

function syncBusyState() {
  document.body.classList.toggle("request-busy", activeRequestCount > 0);
}

async function api(endpoint, payload, options = {}) {
  const key = options.dedupe === false ? "" : requestKey(endpoint, payload);
  if (key && pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), options.timeoutMs || 12000);
  activeRequestCount += 1;
  syncBusyState();
  const promise = fetch(endpoint, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload || {}),
    signal: controller.signal,
  })
    .then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "요청 처리에 실패했어요");
      }
      return data;
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error("응답이 지연되고 있어요. 잠시 후 다시 눌러주세요");
      }
      throw error;
    })
    .finally(() => {
      window.clearTimeout(timer);
      activeRequestCount = Math.max(0, activeRequestCount - 1);
      syncBusyState();
      if (key) {
        pendingRequests.delete(key);
      }
    });
  if (key) {
    pendingRequests.set(key, promise);
  }
  return promise;
}

function setControlBusy(control, busy, label = "처리 중") {
  if (!control) {
    return () => {};
  }
  const previousHtml = control.innerHTML;
  const previousDisabled = control.disabled;
  control.disabled = busy || previousDisabled;
  control.classList.toggle("is-loading", busy);
  control.setAttribute("aria-busy", String(busy));
  if (busy && label) {
    control.textContent = label;
  }
  return () => {
    control.disabled = previousDisabled;
    control.classList.remove("is-loading");
    control.removeAttribute("aria-busy");
    control.innerHTML = previousHtml;
  };
}

async function withButtonBusy(button, label, task) {
  if (button?.dataset.busy === "true") {
    return null;
  }
  if (button) {
    button.dataset.busy = "true";
  }
  const restore = setControlBusy(button, true, label);
  try {
    return await task();
  } finally {
    restore();
    syncGameState();
    if (button) {
      delete button.dataset.busy;
    }
  }
}

async function withSubmitBusy(event, label, task) {
  const submitter = event.submitter instanceof HTMLButtonElement
    ? event.submitter
    : event.currentTarget?.querySelector("button[type='submit']");
  return withButtonBusy(submitter, label, task);
}

function applyState(nextState, reward, options = {}) {
  const shouldAnimate = options.animate !== false;
  const previousCoin = Math.max(0, Math.floor(Number(gameState.coin || 0)));
  const previousLevel = activePetLevel();
  const nextLevel = levelFromStateSnapshot(nextState);
  const explicitUnlocks = normalizeUnlockedPetActions(nextState.game?.lastUnlockedPetActions || []);
  const detectedUnlocks = petActionsUnlockedBetween(previousLevel, nextLevel);
  const unlockedPetActions = shouldAnimate
    ? (explicitUnlocks.length > 0 ? explicitUnlocks : detectedUnlocks)
    : [];
  if (unlockedPetActions.length > 0) {
    rememberPetActionUnlocks(unlockedPetActions);
  }
  const previousCompletedKey = `${gameState.lastCompletedMission?.id || ""}:${gameState.lastCompletedMission?.completedAt || ""}:${gameState.lastCompletedMission?.title || ""}`;
  rememberResetAt(nextState.resetAt);
  character = nextState.character || character;
  profile = nextState.profile || profile;
  applyTheme(profile.theme);
  missions = nextState.missions || missions;
  serverTime = nextState.serverTime || serverTime;
  quests = nextState.quests || quests;
  gameState = nextState.game || gameState;
  messages = nextState.messages || messages;
  inventory = nextState.inventory || inventory;
  accessories = nextState.accessories || accessories;
  equippedAccessories = normalizeEquippedAccessories(nextState.equippedAccessories || equippedAccessories, nextState.equippedAccessory ?? equippedAccessory);
  equippedAccessory = nextState.equippedAccessory ?? equippedAccessory;
  equippedAccessory = primaryEquippedAccessory();
  petPalette = nextState.character?.paletteId ?? nextState.petPalette ?? petPalette;
  characters = nextState.characters || characters;
  proofs = nextState.proofs || proofs;
  shares = nextState.shares || shares;
  room = nextState.room || null;
  rooms = nextState.rooms || rooms;
  achievements = nextState.achievements || achievements;
  friendRewards = nextState.friendRewards || friendRewards;
  gacha = nextState.gacha || gacha;
  petGacha = nextState.petGacha || petGacha;
  renderCharacter();
  renderQuests();
  renderChat();
  renderInventory();
  renderPetCollection();
  renderProofs();
  renderRoom();
  renderGroupMembers();
  renderSocial();
  renderProfileForm();
  if (openQuestId) {
    renderQuestModal(openQuestId);
  }
  syncGameState();
  renderNotifications();
  if (shouldAnimate) {
    bumpPet();
  }
  const nextCompletedKey = `${gameState.lastCompletedMission?.id || ""}:${gameState.lastCompletedMission?.completedAt || ""}:${gameState.lastCompletedMission?.title || ""}`;
  if (shouldAnimate && nextCompletedKey !== "::" && nextCompletedKey !== previousCompletedKey) {
    celebratePet();
  }
  const nextCoin = Math.max(0, Math.floor(Number(gameState.coin || 0)));
  if (shouldAnimate && nextCoin > previousCoin) {
    playCoinStackEffect(nextCoin - previousCoin);
  }
  if (unlockedPetActions.length > 0) {
    spotlightPetActionUnlock(unlockedPetActions, nextLevel);
  } else if (reward) {
    showReward(reward);
  }
  renderGachaResult();
  if (petGacha.lastDraw && petDrawResult) {
    petDrawResult.textContent = `${petGacha.lastDraw.rarityLabel || petGacha.lastDraw.rarity} ${petGacha.lastDraw.name} 해금`;
  }
}

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.homeButton !== undefined) {
      goHome();
      return;
    }
    activatePanel(button.dataset.panel);
  });
});

featureWindowClose?.addEventListener("click", appBack);
notificationButton?.addEventListener("click", openNotificationModal);
notificationClose?.addEventListener("click", appBack);
profileClose?.addEventListener("click", appBack);
roomCancel?.addEventListener("click", appBack);
roomGateLogout?.addEventListener("click", logout);
temptationConfirmCancel?.addEventListener("click", appBack);
temptationConfirmClose?.addEventListener("click", appBack);
profileGoalInput?.addEventListener("input", () => {
  if (!selfRuleTouched) {
    applyPromptSelfRuleSuggestion();
  }
});
profileRoutineInput?.addEventListener("input", () => {
  if (!selfRuleTouched) {
    applyPromptSelfRuleSuggestion();
  }
});
profileEndDateInput?.addEventListener("change", updatePeriodFromDate);
wakeHourWheel?.addEventListener("scroll", syncWakeFromScroll, { passive: true });
wakeMinuteWheel?.addEventListener("scroll", syncWakeFromScroll, { passive: true });
[profilePartyLimitInput, profileGameLimitInput].forEach((input) => {
  input?.addEventListener("input", () => {
    selfRuleTouched = true;
    if (profileAutoRulesInput) {
      profileAutoRulesInput.value = "false";
    }
    syncSelfRuleDisplays();
  });
});

profileThemeInput?.addEventListener("change", () => {
  syncThemeSwatches(profileThemeInput.value);
  applyTheme(profileThemeInput.value);
});

profilePetNameInput?.addEventListener("input", () => {
  profilePetNameInput.dataset.touched = "true";
  updatePwaIdentity(selectedInstallPetId(), profilePetNameInput.value || currentPetName());
  syncInstallButton();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  syncInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  syncInstallButton();
  petMood.textContent = `${currentPetName()} 아이콘으로 설치했어요`;
  showReward("설치 완료");
});

installAppButton?.addEventListener("click", async () => {
  updatePwaIdentity(character.id, currentPetName());
  syncInstallButton();
  if (!profile.completed && !isSafariInstallBrowser()) {
    petMood.textContent = "프로필을 저장한 뒤 설치하면 선택한 펫 아이콘으로 들어가요";
    showReward("프로필 먼저");
    return;
  }
  if (isStandaloneApp()) {
    petMood.textContent = "이미 앱처럼 실행 중이에요";
    showReward("설치됨");
    syncInstallButton();
    return;
  }
  if (!deferredInstallPrompt) {
    const manualText = isAppleMobileInstallBrowser()
      ? "Safari 공유 버튼을 누르고 홈 화면에 추가를 선택해 주세요"
      : isSafariInstallBrowser()
        ? "Safari 공유 버튼이나 파일 메뉴에서 Dock에 추가를 선택해 주세요"
        : "주소창의 설치 아이콘이나 브라우저 메뉴에서 앱 설치를 눌러주세요";
    petMood.textContent = manualText;
    showReward(isAppleMobileInstallBrowser() ? "공유 → 홈 화면 추가" : isSafariInstallBrowser() ? "Safari에서 추가" : "설치 준비 중");
    return;
  }
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  if (choice?.outcome === "accepted") {
    petMood.textContent = `${currentPetName()} 아이콘으로 설치했어요`;
    showReward("설치 완료");
  } else {
    petMood.textContent = "설치를 취소했어요. 필요하면 브라우저 메뉴에서 다시 설치할 수 있어요";
  }
  syncInstallButton();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => navigator.serviceWorker.ready)
      .then(() => syncInstallButton())
      .catch(() => syncInstallButton());
  });
}

syncViewportMetrics();
preventMobileZoomGestures();
window.addEventListener("resize", syncViewportMetrics, { passive: true });
window.visualViewport?.addEventListener("resize", syncViewportMetrics, { passive: true });
window.visualViewport?.addEventListener("scroll", syncViewportMetrics, { passive: true });
syncInstallButton();

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nickname = String(new FormData(loginForm).get("nickname") || "").trim().slice(0, 12);
  if (!nickname) {
    return;
  }
  const previousUserId = userId;
  userId = nicknameToUserId(nickname);
  await withSubmitBusy(event, "입장 중", async () => {
    try {
      petMood.textContent = "입장 정보를 불러오는 중이에요";
      const result = await api("/api/login", { nickname, loginToken: getClientToken() });
      window.localStorage.setItem(savedUserIdKey, userId);
      window.localStorage.setItem(savedNicknameKey, nickname);
      hideLoginModal();
      profileEditorOpen = false;
      applyState(result.state, result.reward, { animate: false });
    } catch (error) {
      userId = previousUserId;
      petMood.textContent = error.message;
      showReward("잠깐!");
    }
  });
});

profileForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  updatePeriodFromDate();
  const formData = new FormData(profileForm);
  const payload = Object.fromEntries(formData.entries());
  const routineDraft = String(payload.routineDraft || payload.routinePrompt || "").trim();
  payload.routineDraft = routineDraft;
  payload.routinePrompt = buildMissionReadyRoutinePrompt();
  payload.editMode = profile.completed ? "true" : "false";
  payload.difficulty = "normal";
  if (profile.completed) {
    payload.starterId = profile.starterId || character.id || "tori";
    if (!hasProfileChanges(payload)) {
      profileEditorOpen = false;
      profileModal?.classList.add("hidden");
      applyTheme(profile.theme);
      petMood.textContent = "바뀐 내용이 없어서 저장 요청은 건너뛰었어요";
      showReward("변경 없음");
      return;
    }
  }
  await withSubmitBusy(event, "저장 중", async () => {
    try {
      petMood.textContent = "미션을 다시 정리하는 중이에요";
    const result = await api("/api/profile", payload, { timeoutMs: 18000 });
    profileEditorOpen = false;
    applyState(result.state, result.reward);
    } catch (error) {
      petMood.textContent = error.message;
      showReward("잠깐!");
    }
  });
});

temptationConfirmForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const type = pendingTemptationType;
  if (!type) {
    closeTemptationConfirm();
    return;
  }
  await withSubmitBusy(event, "기록 중", async () => {
    try {
      petMood.textContent = `${temptationLabels[type] || "기록"} 반영 중이에요`;
    const result = await api("/api/temptations", { type });
    closeTemptationConfirm();
    applyState(result.state, result.reward, { animate: false });
    playTemptationPose(type);
    } catch (error) {
      petMood.textContent = error.message;
      showReward("잠깐!");
    }
  });
});

roomForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(roomForm);
  const payload = Object.fromEntries(formData.entries());
  await withSubmitBusy(event, "만드는 중", async () => {
    try {
      petMood.textContent = "그룹 방을 여는 중이에요";
    const result = await api("/api/rooms", payload);
    closeRoomModal();
    applyState(result.state, result.reward);
    } catch (error) {
      petMood.textContent = error.message;
      showReward("실패!");
    }
  });
});

roomGateForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(roomGateForm);
  const payload = Object.fromEntries(formData.entries());
  // 방 이름 입력이 접힌 영역으로 이동해 required 검증 대신 직접 확인한다.
  if (!String(payload.name || "").trim()) {
    const createDetails = document.querySelector("#gateCreateDetails");
    if (createDetails) {
      createDetails.open = true;
    }
    setRoomGateMessage("방 이름을 입력해 주세요.", "error");
    roomGateForm.querySelector("input[name='name']")?.focus();
    return;
  }
  await withSubmitBusy(event, "만드는 중", async () => {
    try {
      setRoomGateMessage("새 그룹 방을 만드는 중이에요.");
    const result = await api("/api/rooms", payload);
    hideRoomGateModal();
    applyState(result.state, result.reward);
    } catch (error) {
      setRoomGateMessage(error.message || "방을 만들 수 없어요. 잠시 후 다시 시도해 주세요.", "error");
      petMood.textContent = error.message;
      showReward("실패!");
    }
  });
});

// 온보딩 지름길: 그룹 없이 나만의 방으로 바로 시작 (기존 /api/rooms 재사용)
const soloStartButton = document.querySelector("#soloStartButton");

soloStartButton?.addEventListener("click", async () => {
  const nickname = getSavedNickname().trim();
  await withButtonBusy(soloStartButton, "시작 중", async () => {
    try {
      setRoomGateMessage("나만의 방을 만드는 중이에요. 나중에 친구를 초대할 수 있어요.");
      const result = await api("/api/rooms", {
        name: nickname ? `${nickname.slice(0, 12)}의 루틴방` : "나의 루틴방",
        goal: "혼자서 꾸준히 루틴 인증하기",
        capacity: 4,
        proofMode: "photo",
      });
      hideRoomGateModal();
      applyState(result.state, result.reward);
    } catch (error) {
      setRoomGateMessage(error.message || "방을 만들 수 없어요. 잠시 후 다시 시도해 주세요.", "error");
      showReward("실패!");
    }
  });
});

// 초대코드 입력에서 Enter를 누르면 폼 제출(방 만들기) 대신 방 들어가기를 실행한다.
roomGateCode?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    roomGateForm?.querySelector("[data-gate-join-room]")?.click();
  }
});

proofPhoto?.addEventListener("change", async () => {
  const file = proofPhoto.files?.[0];
  if (!file) {
    preparedProofPhoto = "";
    return;
  }
  try {
    petMood.textContent = "사진을 준비하는 중이에요";
    preparedProofPhoto = await fileToDataUrl(file);
    proofPreview.src = preparedProofPhoto;
    proofPreview.classList.remove("hidden");
    petMood.textContent = "사진 준비 완료";
  } catch (error) {
    preparedProofPhoto = "";
    petMood.textContent = error.message || "사진을 읽지 못했어요";
    showReward("사진 오류");
  }
});

proofCancel?.addEventListener("click", appBack);
missionEditCancel?.addEventListener("click", appBack);
questModalClose?.addEventListener("click", appBack);

questModal?.addEventListener("click", (event) => {
  if (event.target === questModal) {
    appBack();
  }
});

let questSwipe = null;

function resetQuestSwipe() {
  const shell = questModalContent?.querySelector("[data-quest-swipe-shell]");
  shell?.classList.remove("dragging");
  if (shell) {
    shell.style.transform = "";
  }
  questSwipe = null;
}

questModalContent?.addEventListener("pointerdown", (event) => {
  if (
    !openQuestId
    || event.target.closest("button, a, input, textarea, select, label")
  ) {
    return;
  }
  questSwipe = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
  };
  const shell = questModalContent.querySelector("[data-quest-swipe-shell]");
  shell?.classList.add("dragging");
  try {
    questModalContent.setPointerCapture(event.pointerId);
  } catch {
    // Some embedded browsers do not allow pointer capture on every event target.
  }
});

questModalContent?.addEventListener("pointermove", (event) => {
  if (!questSwipe || event.pointerId !== questSwipe.pointerId) {
    return;
  }
  const deltaX = event.clientX - questSwipe.startX;
  const deltaY = event.clientY - questSwipe.startY;
  if (Math.abs(deltaX) < Math.abs(deltaY)) {
    return;
  }
  const shell = questModalContent.querySelector("[data-quest-swipe-shell]");
  if (shell) {
    shell.style.transform = `translateX(${Math.max(-44, Math.min(44, deltaX * 0.32))}px)`;
  }
});

questModalContent?.addEventListener("pointerup", (event) => {
  if (!questSwipe || event.pointerId !== questSwipe.pointerId) {
    return;
  }
  const deltaX = event.clientX - questSwipe.startX;
  const deltaY = event.clientY - questSwipe.startY;
  const shouldMove = Math.abs(deltaX) >= 56 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
  resetQuestSwipe();
  if (shouldMove) {
    moveQuest(deltaX < 0 ? 1 : -1);
  }
});

questModalContent?.addEventListener("pointercancel", resetQuestSwipe);

const homeMissionButton = document.querySelector("#homeMissionCard");
let homeMissionSwipe = null;
let suppressHomeMissionClick = false;

function resetHomeMissionSwipe() {
  if (homeMissionButton) {
    homeMissionButton.classList.remove("dragging");
    homeMissionButton.style.transform = "";
  }
  homeMissionSwipe = null;
}

homeMissionButton?.addEventListener("click", (event) => {
  if (!suppressHomeMissionClick) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  suppressHomeMissionClick = false;
}, true);

homeMissionButton?.addEventListener("pointerdown", (event) => {
  if (homeMissionButton.dataset.swipeable !== "true" || (missions.daily?.items || []).length <= 1) {
    return;
  }
  homeMissionSwipe = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
  };
  homeMissionButton.classList.add("dragging");
  try {
    homeMissionButton.setPointerCapture(event.pointerId);
  } catch {
    // Pointer capture can be unavailable in some embedded webviews.
  }
});

homeMissionButton?.addEventListener("pointermove", (event) => {
  if (!homeMissionSwipe || event.pointerId !== homeMissionSwipe.pointerId) {
    return;
  }
  const deltaX = event.clientX - homeMissionSwipe.startX;
  const deltaY = event.clientY - homeMissionSwipe.startY;
  if (Math.abs(deltaX) < Math.abs(deltaY)) {
    return;
  }
  event.preventDefault();
  homeMissionButton.style.transform = `translateX(${Math.max(-36, Math.min(36, deltaX * 0.28))}px)`;
});

homeMissionButton?.addEventListener("pointerup", (event) => {
  if (!homeMissionSwipe || event.pointerId !== homeMissionSwipe.pointerId) {
    return;
  }
  const deltaX = event.clientX - homeMissionSwipe.startX;
  const deltaY = event.clientY - homeMissionSwipe.startY;
  const shouldMove = Math.abs(deltaX) >= 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
  resetHomeMissionSwipe();
  if (shouldMove) {
    suppressHomeMissionClick = true;
    moveHomeMission(deltaX < 0 ? 1 : -1);
    window.setTimeout(() => {
      suppressHomeMissionClick = false;
    }, 260);
  }
});

homeMissionButton?.addEventListener("pointercancel", resetHomeMissionSwipe);

let missionGridDrag = null;
let suppressMissionGridClick = false;

document.addEventListener("click", (event) => {
  if (!suppressMissionGridClick) {
    return;
  }
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest(".mission-open-grid")) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);

document.addEventListener("pointerdown", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const grid = target?.closest(".mission-open-grid");
  if (!(grid instanceof HTMLElement)) {
    return;
  }
  missionGridDrag = {
    grid,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    startScrollLeft: grid.scrollLeft,
    moved: false,
  };
  try {
    grid.setPointerCapture(event.pointerId);
  } catch {
    // Pointer capture may be unavailable in some webviews.
  }
});

document.addEventListener("pointermove", (event) => {
  if (!missionGridDrag || event.pointerId !== missionGridDrag.pointerId) {
    return;
  }
  const deltaX = event.clientX - missionGridDrag.startX;
  const deltaY = event.clientY - missionGridDrag.startY;
  if (Math.abs(deltaX) < 6 || Math.abs(deltaX) < Math.abs(deltaY)) {
    return;
  }
  event.preventDefault();
  missionGridDrag.moved = true;
  missionGridDrag.grid.classList.add("dragging");
  missionGridDrag.grid.scrollLeft = missionGridDrag.startScrollLeft - deltaX;
});

function resetMissionGridDrag() {
  missionGridDrag?.grid.classList.remove("dragging");
  missionGridDrag = null;
}

document.addEventListener("pointerup", (event) => {
  if (!missionGridDrag || event.pointerId !== missionGridDrag.pointerId) {
    return;
  }
  const moved = missionGridDrag.moved;
  resetMissionGridDrag();
  if (moved) {
    suppressMissionGridClick = true;
    window.setTimeout(() => {
      suppressMissionGridClick = false;
    }, 220);
  }
});

document.addEventListener("pointercancel", resetMissionGridDrag);

proofModal?.addEventListener("click", (event) => {
  if (event.target === proofModal) {
    appBack();
  }
});

missionEditModal?.addEventListener("click", (event) => {
  if (event.target === missionEditModal) {
    appBack();
  }
});

temptationConfirmModal?.addEventListener("click", (event) => {
  if (event.target === temptationConfirmModal) {
    appBack();
  }
});

roomModal?.addEventListener("click", (event) => {
  if (event.target === roomModal) {
    appBack();
  }
});

profileModal?.addEventListener("click", (event) => {
  if (event.target === profileModal) {
    appBack();
  }
});

notificationModal?.addEventListener("click", (event) => {
  if (event.target === notificationModal) {
    appBack();
  }
});

document.addEventListener("keydown", (event) => {
  if (!questModal?.classList.contains("hidden") && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    event.preventDefault();
    moveQuest(event.key === "ArrowRight" ? 1 : -1);
    return;
  }
  if (event.key !== "Escape") {
    return;
  }
  appBack();
});

proofForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!pendingQuestId) {
    return;
  }
  const file = proofPhoto.files?.[0];
  if (!file) {
    petMood.textContent = "사진을 먼저 찍거나 올려줘";
    showReward("사진 필요");
    try {
      proofPhoto?.click();
    } catch {
      // File pickers can be blocked in some webviews unless the tap is direct.
    }
    return;
  }
  await withSubmitBusy(event, "보내는 중", async () => {
  try {
    petMood.textContent = "그룹원에게 인증 요청을 보내는 중이에요";
    const photo = preparedProofPhoto || await fileToDataUrl(file);
    const result = await api(`/api/quests/${encodeURIComponent(pendingQuestId)}/request`, {
      photo,
      note: document.querySelector("#proofNote").value,
      performedAt: document.querySelector("#proofDate").value,
    });
    closeProofModal();
    applyState(result.state, result.reward);
    } catch (error) {
      petMood.textContent = error.message;
      showReward("잠깐!");
    }
  });
});

missionEditForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!pendingMissionEditId) {
    closeMissionEditModal();
    return;
  }
  const formData = new FormData(missionEditForm);
  const payload = Object.fromEntries(formData.entries());
  await withSubmitBusy(event, "요청 중", async () => {
    try {
      petMood.textContent = "그룹원에게 대체 미션 승인을 보내는 중이에요";
    const result = await api(`/api/quests/${encodeURIComponent(pendingMissionEditId)}/edit-request`, payload);
    closeMissionEditModal();
    applyState(result.state, result.reward);
    } catch (error) {
      petMood.textContent = error.message;
      showReward("잠깐!");
    }
  });
});

function openQuickProof(kind = "photo") {
  const nextQuest = allMissionItems().find((quest) => quest.state === "todo");
  if (!hasActiveRoom()) {
    petMood.textContent = "그룹 방을 먼저 만들거나 들어가야 인증을 보낼 수 있어요";
    showReward("방 필요");
    return;
  }
  if (!nextQuest) {
    petMood.textContent = "지금 요청할 미션이 없어요. 완료한 순간을 공유해봐요.";
    showReward("미션 완료");
    activatePanel("brag");
    return;
  }
  openProofModal(nextQuest.id, { autoPhoto: kind === "photo" });
  const noteInput = document.querySelector("#proofNote");
  if (noteInput && kind === "link") {
    noteInput.placeholder = "인증 링크나 기록 URL을 함께 적어주세요.";
  } else if (noteInput && kind === "text") {
    noteInput.placeholder = "완료한 내용을 짧게 적어주세요.";
  }
}

document.addEventListener("click", async (event) => {
  const target = event.target instanceof Element ? event.target.closest("button") : null;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  try {
    if (target.dataset.logout) {
      logout();
      return;
    }

    if (target.dataset.copyRoutineTemplate !== undefined) {
      await copyRoutineTemplate();
      return;
    }

    if (target.dataset.insertRoutineTemplate !== undefined) {
      insertRoutineTemplate();
      return;
    }

    if (target.dataset.polishRoutine !== undefined) {
      polishRoutinePrompt();
      return;
    }

    if (target.dataset.wakeHour !== undefined) {
      const current = parseWakeTime(profileWakeInput?.value || "");
      setWakeTime(Number(target.dataset.wakeHour), current.minute, { smooth: true });
      return;
    }

    if (target.dataset.wakeMinute !== undefined) {
      const current = parseWakeTime(profileWakeInput?.value || "");
      setWakeTime(current.hour, Number(target.dataset.wakeMinute), { smooth: true });
      return;
    }

    if (target.dataset.themeChoice) {
      const nextTheme = normalizeTheme(target.dataset.themeChoice);
      if (profileThemeInput) {
        profileThemeInput.value = nextTheme;
      }
      syncThemeSwatches(nextTheme);
      applyTheme(nextTheme);
      return;
    }

    if (target.dataset.ruleStep) {
      const input = target.dataset.ruleStep === "game" ? profileGameLimitInput : profilePartyLimitInput;
      const fallback = target.dataset.ruleStep === "game" ? 3 : 1;
      const delta = Number(target.dataset.ruleDelta || 0);
      setSelfRuleLimit(target.dataset.ruleStep, clampRuleLimit((Number(input?.value) || fallback) + delta, fallback));
      return;
    }

    if (target.dataset.starterId) {
      selectStarter(target.dataset.starterId);
      return;
    }

    if (target.dataset.shareMood) {
      document.querySelectorAll("[data-share-mood]").forEach((button) => button.classList.remove("active"));
      target.classList.add("active");
      syncShareMoodHint();
      return;
    }

    if (target.dataset.quickProof) {
      openQuickProof(target.dataset.quickProof);
      return;
    }

    if (target.dataset.pushToggle !== undefined) {
      const subscription = await currentPushSubscription();
      await withButtonBusy(target, subscription && Notification.permission === "granted" ? "끄는 중" : "켜는 중", togglePushNotifications);
      return;
    }

    if (target.dataset.proofCapture) {
      prepareProofPhotoInput(target.dataset.proofCapture);
      proofPhoto?.click();
      return;
    }

    if (target.dataset.homeApproveProofId) {
      const proofId = target.dataset.homeApproveProofId;
      if (approvingProofIds.has(proofId)) {
        return;
      }
      approvingProofIds.add(proofId);
      await withButtonBusy(target, "승인 중", async () => {
        try {
          petMood.textContent = "친구 인증을 확인하는 중이에요";
          const result = await api(`/api/proofs/${encodeURIComponent(proofId)}/approve`);
          locallyResolvedProofIds.add(proofId);
          applyState(result.state, result.reward);
          celebratePet();
        } finally {
          approvingProofIds.delete(proofId);
        }
      });
      return;
    }

    if (target.dataset.homeProofId) {
      openProofModal(target.dataset.homeProofId, { autoPhoto: true });
      return;
    }

    if (target.dataset.homeAttendance !== undefined) {
      await withButtonBusy(target, "받는 중", async () => {
        const result = await api("/api/attendance/claim");
        applyState(result.state, result.reward);
      });
      return;
    }

    if (target.dataset.panelJump) {
      activatePanel(target.dataset.panelJump);
      return;
    }

    if (target.dataset.toggleMissionCategory) {
      const key = target.dataset.toggleMissionCategory;
      missionCategoryOpen = {
        daily: false,
        weekly: false,
        monthly: false,
        [key]: !missionCategoryOpen[key],
      };
      if (!missionCategoryOpen.daily && !missionCategoryOpen.weekly && !missionCategoryOpen.monthly) {
        missionCategoryOpen[key] = true;
      }
      syncMissionCategoryPanels();
      return;
    }

    if (target.dataset.memberMissions) {
      openMemberMissionModal(target.dataset.memberMissions);
      return;
    }

    if (target.dataset.pokeMember) {
      await withButtonBusy(target, "찌르는 중", async () => {
        const result = await api(`/api/members/${encodeURIComponent(target.dataset.pokeMember)}/poke`);
        applyState(result.state, result.reward, { animate: false });
      });
      return;
    }

    if (target.dataset.claimGroupReward !== undefined) {
      await withButtonBusy(target, "여는 중", async () => {
        const result = await api("/api/group/reward", { type: target.dataset.claimGroupReward || "daily_box" }, { dedupe: false });
        applyState(result.state, result.reward);
      });
      return;
    }

    if (target.dataset.claimFriendReward !== undefined) {
      await withButtonBusy(target, "받는 중", async () => {
        const result = await api("/api/friend-rewards/claim", { rewardId: target.dataset.claimFriendReward }, { dedupe: false });
        applyState(result.state, result.reward);
        celebratePet();
      });
      return;
    }

    if (target.dataset.openQuestId) {
      selectedQuestByList[target.dataset.missionTab || "dailyQuestList"] = target.dataset.openQuestId;
      openQuestModal(target.dataset.openQuestId);
      return;
    }

    if (target.dataset.editQuestId) {
      openMissionEditModal(target.dataset.editQuestId);
      return;
    }

    if (target.dataset.questMove) {
      moveQuest(Number(target.dataset.questMove));
      return;
    }

    if (target.dataset.shareQuestId !== undefined) {
      await withButtonBusy(target, "공유 중", async () => {
        await shareQuestById(target.dataset.shareQuestId);
      });
      return;
    }

    if (target.dataset.externalShare !== undefined) {
      await shareExternally(target.dataset.externalShare || "current");
      return;
    }

    if (target.dataset.saveShareImage !== undefined) {
      await saveExternalShareImage(target.dataset.saveShareImage || "current");
      return;
    }

    if (target.dataset.feedPet !== undefined) {
      await withButtonBusy(target, "냠냠", async () => {
        petMood.textContent = "밥 주는 중이에요";
        const result = await api("/api/pet/feed");
        applyState(result.state, result.reward, { animate: false });
        playFeedPose();
      });
      return;
    }

    if (target.dataset.petAction) {
      const actionId = target.dataset.petAction;
      const action = petActionCatalog.find((item) => item.id === actionId);
      clearRecentPetActionUnlock(actionId);
      await withButtonBusy(target, "진행 중", async () => {
        petMood.textContent = `${action?.label || "행동"} 하는 중이에요`;
        const result = await api("/api/pet/action", { actionId });
        applyState(result.state, result.reward, { animate: false });
        playPetActionPose(actionId);
      });
      return;
    }

    if (target.id === "attendanceButton") {
      await withButtonBusy(target, "확인 중", async () => {
        petMood.textContent = "오늘 출석 보상을 확인하는 중이에요";
        const result = await api("/api/attendance/claim");
        applyState(result.state, result.reward);
        if (!result.already) {
          celebratePet();
        }
      });
      return;
    }

    if (target.id === "sharePetButton") {
      await withButtonBusy(target, "공유 중", async () => {
        const message = dailyShareText();
        if (!message) {
          if (dailyShareNote) {
            dailyShareNote.focus();
          }
          petMood.textContent = "오늘의 한마디를 먼저 적어줘요";
          return;
        }
        petMood.textContent = "그룹에 오늘의 한마디를 보내는 중이에요";
        const result = await api("/api/pet/share", { moodTag: "daily", message });
        applyState(result.state, result.reward);
        if (dailyShareNote) {
          dailyShareNote.value = "";
        }
        celebratePet();
      });
      return;
    }

    if (target.dataset.reactShare) {
      await withButtonBusy(target, "전송 중", async () => {
        const result = await api("/api/pet/react", {
          shareId: target.dataset.reactShare,
          type: target.dataset.reaction,
        });
        applyState(result.state, result.reward);
      });
      return;
    }

    if (target.dataset.openProfile) {
      profileEditorOpen = true;
      renderProfileForm();
      return;
    }

    if (target.dataset.openRoom) {
      openRoomModal();
      return;
    }

    if (target.dataset.joinRoom !== undefined) {
      const codeInput = document.querySelector("#roomJoinCode");
      const code = codeInput?.value || "";
      await withButtonBusy(target, "참가 중", async () => {
        petMood.textContent = "그룹 방에 들어가는 중이에요";
        const result = await api("/api/rooms/join", {
          code,
          nickname: profile.nickname || "",
        });
        applyState(result.state, result.reward);
      });
      return;
    }

    if (target.dataset.gateJoinRoom !== undefined) {
      const code = roomGateCode?.value || "";
      if (!code.trim()) {
        setRoomGateMessage("초대코드를 입력하면 바로 방에 들어갈 수 있어요.", "error");
        return;
      }
      await withButtonBusy(target, "입장 중", async () => {
        setRoomGateMessage("초대코드로 방을 찾는 중이에요.");
        const result = await api("/api/rooms/join", {
          code,
          nickname: profile.nickname || getSavedNickname() || "",
        });
        hideRoomGateModal();
        applyState(result.state, result.reward);
      });
      return;
    }

    if (target.dataset.copyRoomCode !== undefined) {
      const code = target.dataset.copyRoomCode || room?.code || "";
      if (code && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(code);
        } catch {
          // Clipboard permissions vary by browser; still surface the code in the UI.
        }
      }
      petMood.textContent = code ? `초대코드 ${code} 복사 완료` : "복사할 코드가 없어요";
      showReward("코드 복사");
      return;
    }

    if (target.dataset.closeRoom) {
      await withButtonBusy(target, "닫는 중", async () => {
        const result = await api("/api/rooms/close");
        applyState(result.state, result.reward);
      });
      return;
    }

    if (target.dataset.leaveRoom) {
      const ok = window.confirm("방에서 나갈까요? 대기 중인 내 인증 요청은 취소돼요.");
      if (!ok) {
        return;
      }
      await withButtonBusy(target, "나가는 중", async () => {
        const result = await api("/api/rooms/leave");
        applyState(result.state, result.reward);
      });
      return;
    }

    if (target.dataset.temptation) {
      openTemptationConfirm(target.dataset.temptation);
      return;
    }

    if (target.dataset.message) {
      await withButtonBusy(target, "보내는 중", async () => {
        petMood.textContent = "그룹에 반응을 보내는 중이에요";
        const result = await api("/api/messages", { type: target.dataset.message });
        applyState(result.state, result.reward, { animate: false });
      });
      return;
    }

    if (target.dataset.approveProofId) {
      const proofId = target.dataset.approveProofId;
      const memberMissionOwner = target.dataset.memberMissionOwner || "";
      if (approvingProofIds.has(proofId)) {
        return;
      }
      approvingProofIds.add(proofId);
      await withButtonBusy(target, "승인 중", async () => {
        try {
          petMood.textContent = "인증을 확인하는 중이에요";
          const result = await api(`/api/proofs/${encodeURIComponent(proofId)}/approve`);
          locallyResolvedProofIds.add(proofId);
          applyState(result.state, result.reward);
          if (memberMissionOwner) {
            openMemberMissionModal(memberMissionOwner);
          }
          celebratePet();
        } finally {
          approvingProofIds.delete(proofId);
        }
      });
      return;
    }

    if (target.id === "gachaButton") {
      await withButtonBusy(target, "뽑는 중", async () => {
        const result = await api("/api/gacha/draw");
        applyState(result.state, result.reward);
      });
      return;
    }

    if (target.id === "petDrawButton") {
      await withButtonBusy(target, "뽑는 중", async () => {
        const result = await api("/api/pets/draw");
        applyState(result.state, result.reward);
        celebratePet();
      });
      return;
    }

    if (target.dataset.accessoryFilter) {
      accessoryFilter = target.dataset.accessoryFilter;
      renderAccessories();
      return;
    }

    if (target.dataset.equipCharacter) {
      await withButtonBusy(target, "변경 중", async () => {
        const result = await api("/api/pets/equip", { characterId: target.dataset.equipCharacter });
        applyState(result.state, result.reward);
        celebratePet();
      });
      return;
    }

    if (target.dataset.craftAccessory) {
      await withButtonBusy(target, "제작 중", async () => {
        const result = await api("/api/accessories/craft", { accessoryId: target.dataset.craftAccessory });
        applyState(result.state, result.reward);
        celebratePet();
      });
      return;
    }

    if (target.dataset.clearAccessories !== undefined) {
      await withButtonBusy(target, "해제 중", async () => {
        const result = await api("/api/accessories/equip", { accessoryId: "", clear: true }, { dedupe: false });
        applyState(result.state, result.reward);
      });
      return;
    }

    if (target.dataset.equipAccessory !== undefined) {
      await withButtonBusy(target, "변경 중", async () => {
        const result = await api("/api/accessories/equip", { accessoryId: target.dataset.equipAccessory });
        applyState(result.state, result.reward);
        celebratePet();
      });
      return;
    }

    if (target.dataset.paletteId) {
      await withButtonBusy(target, "변경 중", async () => {
        const result = await api("/api/pets/palette", { paletteId: target.dataset.paletteId });
        applyState(result.state, result.reward);
        celebratePet();
      });
      return;
    }

    if (target.dataset.useItem) {
      await withButtonBusy(target, "사용 중", async () => {
        const result = await api("/api/inventory/use", { itemId: target.dataset.useItem });
        applyState(result.state, result.reward);
      });
      return;
    }

    if (target.classList.contains("link-add")) {
      const questId = target.dataset.questId;
      const label = window.prompt("링크 이름을 입력해 주세요. 예: 풀이, GitHub, TIL");
      if (!label) {
        return;
      }
      const url = window.prompt("이동할 주소를 입력해 주세요.");
      const normalizedUrl = normalizeUrl(url ?? "");
      if (!normalizedUrl) {
        return;
      }
      const result = await api(`/api/quests/${encodeURIComponent(questId)}/link`, {
        label: label.trim().slice(0, 10),
        url: normalizedUrl,
      });
      applyState(result.state, result.reward);
      return;
    }

    if (!target.classList.contains("quest-action")) {
      return;
    }

    const questId = target.dataset.questId;
    if (target.classList.contains("todo")) {
      openProofModal(questId);
    } else if (target.classList.contains("pending")) {
      petMood.textContent = "그룹 인증을 기다리는 중이에요. 그룹 탭에서 확인할 수 있어요.";
      closeQuestModal();
      activatePanel("verify");
    }
  } catch (error) {
    if (target.dataset.gateJoinRoom !== undefined || isOpenModal(roomGateModal)) {
      setRoomGateMessage(error.message || "방에 들어갈 수 없어요. 초대코드를 다시 확인해 주세요.", "error");
    }
    petMood.textContent = error.message;
    showReward("잠깐!");
  }
});

let refreshInFlight = false;

function isOpenModal(element) {
  return Boolean(element && !element.classList.contains("hidden"));
}

async function loadState(options = {}) {
  if (!userId) {
    return false;
  }
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), options.timeoutMs || 10000);
  try {
    const response = await fetch("/api/state", {
      cache: "no-store",
      headers: { "X-User-Id": userId, "X-Login-Token": getClientToken() },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error("state load failed");
    }
    const nextState = await response.json();
    if (shouldClearSavedLoginForReset(nextState)) {
      applyState(nextState, null, { animate: false });
      clearSavedLoginForReset(nextState.resetAt);
      hideRoomGateModal();
      hideLoginModal();
      showLoginModal();
      petMood.textContent = "초기화가 적용됐어요. 닉네임으로 다시 들어와 주세요.";
      return false;
    }
    applyState(nextState, null, { animate: options.animate !== true ? false : true });
    return true;
  } finally {
    window.clearTimeout(timer);
  }
}

async function refreshState(options = {}) {
  if (
    !userId
    || refreshInFlight
    || (!options.force && (
      activeRequestCount > 0
      || isOpenModal(loginModal)
      || isOpenModal(profileModal)
      || isOpenModal(proofModal)
      || isOpenModal(missionEditModal)
      || isOpenModal(roomModal)
      || isOpenModal(roomGateModal)
      || isOpenModal(temptationConfirmModal)
    ))
  ) {
    return;
  }
  refreshInFlight = true;
  try {
    await loadState({ animate: false, timeoutMs: options.force ? 15000 : 10000 });
  } finally {
    refreshInFlight = false;
  }
}

function finishAppBoot() {
  document.body.classList.remove("app-boot");
  document.body.classList.add("app-ready");
}

async function init() {
  try {
    renderCharacter();
    if (!userId) {
      renderQuests();
      renderSocial();
      renderRoom();
      renderGroupMembers();
      renderPetCollection();
      renderNotifications();
      syncGameState();
      renderProfileForm();
      showLoginModal();
      return;
    }
    try {
      await loadState();
      openPanelFromUrl();
    } catch {
      renderQuests();
      renderSocial();
      renderRoom();
      renderGroupMembers();
      renderPetCollection();
      renderNotifications();
      syncGameState();
      renderProfileForm();
      showLoginModal();
    }
  } finally {
    finishAppBoot();
  }
}

init();
updateRoomSky();
window.setInterval(updateRoomSky, 60_000);
window.setInterval(refreshState, 45000);
window.addEventListener("focus", updateRoomSky);
window.addEventListener("focus", refreshState);
