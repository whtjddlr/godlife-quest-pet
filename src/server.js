const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
let webPush = null;
try {
  webPush = require("web-push");
} catch {
  webPush = null;
}

const rootDir = __dirname;
loadEnvFile(path.join(rootDir, ".env"));

const dataDir = path.join(rootDir, "data");
const stateFile = path.join(dataDir, "state.json");
const port = Number(process.env.PORT || 5173);
const localFilePersistence = !process.env.VERCEL;
const gachaCost = 20;
const petGachaCost = 90;
const starterCoin = 400;
const starterCoinVersion = 2;
const attendanceBaseReward = { coin: 20, bond: 1, health: 4 };
const kstOffsetMs = 9 * 60 * 60 * 1000;
const supabaseUrl = String(process.env.SUPABASE_URL || "").replace(/\/$/, "");
const supabaseStateTable = process.env.SUPABASE_STATE_TABLE || "user_states";
const supabaseRoomTable = process.env.SUPABASE_ROOM_TABLE || "room_states";
const supabaseServerKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseEnabled = Boolean(supabaseUrl && supabaseServerKey);
const roomRegistryUserPrefix = "__room__";
const temptationDefaults = { party: 1, game: 3 };
const validThemes = new Set(["default", "pink", "sky", "sunny"]);
const temptationRules = {
  party: { value: 20, health: 12, label: "유흥" },
  game: { value: 15, health: 8, label: "게임" },
};
const feedDailyLimit = 3;
const feedCooldownMs = 0;
const healthyCoinBonusRate = 0.2;
const weeklyAutoDailyTargets = [5, 10, 15];
const monthlyAutoDailyTargets = [40, 70, 100];
const supabaseFetchTimeoutMs = Number(process.env.SUPABASE_TIMEOUT_MS || 3000);
const aiFetchTimeoutMs = Number(process.env.AI_TIMEOUT_MS || 4500);
const remoteUserCacheMs = Number(process.env.REMOTE_USER_CACHE_MS || 45000);
const remoteRoomCacheMs = Number(process.env.REMOTE_ROOM_CACHE_MS || 25000);
const roomSnapshotRefreshMs = 2 * 60 * 1000;
const maxRequestBodyBytes = 2_000_000;
const maxProofPhotoBytes = Number(process.env.MAX_PROOF_PHOTO_BYTES || 340_000);
const maxRoomProofs = Number(process.env.MAX_ROOM_PROOFS || 24);
const maxRoomProofPhotos = Number(process.env.MAX_ROOM_PROOF_PHOTOS || 5);
const maxUserProofs = Number(process.env.MAX_USER_PROOFS || 20);
const maxUserProofPhotos = Number(process.env.MAX_USER_PROOF_PHOTOS || 3);
const mirrorRoomRegistry = process.env.SUPABASE_ROOM_REGISTRY_MIRROR === "true";
const legacyRoomRegistryEnabled = process.env.SUPABASE_LEGACY_ROOM_REGISTRY === "true" || mirrorRoomRegistry;
const globalResetUserId = "__global_reset__";
const globalResetEnabled = process.env.ENABLE_GLOBAL_RESET === "true";
const remoteResetCacheMs = Number(process.env.REMOTE_RESET_CACHE_MS || 5000);
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || "BMoijaEhYGiXp82VLXf9JT8dcvrqpu4myl0JOKlNTK6U_rw8XmdjW9KxzEMUEhtXxgj60YFdexVTSJlCYqJB2bc";
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || "KyJtseVZ8rA2Nh3AK9Y6Ou35o-ZPjtUMY8ZrlyP3atk";
const vapidSubject = process.env.VAPID_SUBJECT || "mailto:godlife@example.com";

if (webPush && vapidPublicKey && vapidPrivateKey) {
  webPush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const separator = trimmed.indexOf("=");
    if (separator === -1) {
      continue;
    }
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const characterPool = [
  { id: "tori", name: "아기 토리", species: "말랑 토끼", rarity: "NORMAL", rarityLabel: "노말", weight: 0, accent: "#ffb6ca", adminOnlyAdult: "숲지기 토리" },
  { id: "momo", name: "아기 코코", species: "솜귀 코끼리", rarity: "NORMAL", rarityLabel: "노말", weight: 0, accent: "#9ed7ff", adminOnlyAdult: "구름지기 코코" },
  { id: "bami", name: "아기 바미", species: "몽실 곰돌이", rarity: "NORMAL", rarityLabel: "노말", weight: 0, accent: "#a97445", adminOnlyAdult: "꿈수호자 바미" },
  { id: "maru", name: "아기 마루", species: "볼빵 햄찌", rarity: "NORMAL", rarityLabel: "노말", weight: 0, accent: "#ffc979", adminOnlyAdult: "해바라기 마루" },
  { id: "ruru", name: "아기 루루", species: "꼬리 여우", rarity: "RARE", rarityLabel: "레어", weight: 30, accent: "#ff9f7a", adminOnlyAdult: "새벽여우 루루" },
  { id: "poyo", name: "아기 포요", species: "구름 병아리", rarity: "NORMAL", rarityLabel: "노말", weight: 0, accent: "#ffd86b", adminOnlyAdult: "햇살 포요" },
  { id: "kobi", name: "아기 코비", species: "낮잠 코알라", rarity: "NORMAL", rarityLabel: "노말", weight: 0, accent: "#9bd7aa", adminOnlyAdult: "유칼립투스 코비" },
  { id: "moki", name: "아기 모키", species: "재주 원숭이", rarity: "RARE", rarityLabel: "레어", weight: 22, accent: "#ffd974", adminOnlyAdult: "반짝곡예 모키" },
  { id: "nabi", name: "아기 다람", species: "볼주머니 다람쥐", rarity: "EPIC", rarityLabel: "에픽", weight: 16, accent: "#fff0cf", adminOnlyAdult: "도토리수호 다람" },
  { id: "dami", name: "아기 다미", species: "초록 도마뱀", rarity: "EPIC", rarityLabel: "에픽", weight: 14, accent: "#91e7a9", adminOnlyAdult: "이끼정원 다미" },
  { id: "somi", name: "아기 판다", species: "대나무 팬더", rarity: "EPIC", rarityLabel: "에픽", weight: 14, accent: "#a9e7bd", adminOnlyAdult: "대나무숲 판다" },
  { id: "leo", name: "아기 레오", species: "미니 사자", rarity: "EPIC", rarityLabel: "에픽", weight: 11, accent: "#f29b4a", adminOnlyAdult: "햇빛갈기 레오" },
  { id: "hoya", name: "아기 호야", species: "줄무늬 호랑이", rarity: "EPIC", rarityLabel: "에픽", weight: 11, accent: "#fff0cf", adminOnlyAdult: "새벽발톱 호야" },
  { id: "ari", name: "아기 아리", species: "꼬마 독수리", rarity: "EPIC", rarityLabel: "에픽", weight: 10, accent: "#ffd25f", adminOnlyAdult: "하늘감시자 아리" },
  { id: "boots", name: "아기 부츠", species: "장화신은 고양이", rarity: "EPIC", rarityLabel: "에픽", weight: 8, accent: "#c85c4a", adminOnlyAdult: "장화기사 부츠" },
  { id: "chacha", name: "아기 티티", species: "티벳여우", rarity: "RARE", rarityLabel: "레어", weight: 20, accent: "#d8b28b", adminOnlyAdult: "무표정 티벳여우" },
  { id: "soli", name: "아기 쿼카", species: "쿼카", rarity: "RARE", rarityLabel: "레어", weight: 20, accent: "#c89062", adminOnlyAdult: "웃상 쿼카" },
  { id: "pepe", name: "아기 카피", species: "카피바라", rarity: "RARE", rarityLabel: "레어", weight: 18, accent: "#b9825b", adminOnlyAdult: "온천 카피바라" },
  { id: "nunu", name: "아기 아호", species: "아홀로틀", rarity: "EPIC", rarityLabel: "에픽", weight: 10, accent: "#ffd2df", adminOnlyAdult: "물빛 아홀로틀" },
  { id: "toto", name: "아기 마눌", species: "마눌고양이", rarity: "EPIC", rarityLabel: "에픽", weight: 8, accent: "#c9bba8", adminOnlyAdult: "눈매 마눌고양이" },
  { id: "lumi", name: "아기 포포", species: "동글 뱁새", rarity: "LEGEND", rarityLabel: "레전드", weight: 0, accent: "#8fd7bf", adminOnlyAdult: "숲빛 뱁새 포포" },
  { id: "loki", name: "아기 로키", species: "장난 레서판다", rarity: "LEGEND", rarityLabel: "레전드", weight: 0, accent: "#d96f45", adminOnlyAdult: "숲불꼬리 로키" },
  { id: "miru", name: "아기 미루", species: "원피스 토끼", rarity: "LEGEND", rarityLabel: "레전드", weight: 3, accent: "#fffdf7", adminOnlyAdult: "주황 원피스 미루" },
  { id: "melly", name: "아기 마멜로", species: "리본 후드토끼", rarity: "LEGEND", rarityLabel: "레전드", weight: 3, accent: "#ffc1d6", adminOnlyAdult: "리본 후드토끼 마멜로" },
  { id: "pomi", name: "아기 호두", species: "화이트 포메", rarity: "LEGEND", rarityLabel: "레전드", weight: 3, accent: "#fffaf0", adminOnlyAdult: "눈송이 포메 호두" },
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
for (const character of characterPool) {
  character.description = characterDescriptions[character.id] || "루틴을 함께 키워가는 작은 친구예요.";
}
const petActionCatalog = [
  { id: "walk", label: "산책", unlockLevel: 2, dailyLimit: 2, reward: { health: 6, coin: 2 }, mood: "짧게 산책하고 기분이 산뜻해졌어요" },
  { id: "workout", label: "운동매트", unlockLevel: 3, dailyLimit: 2, reward: { health: 9, coin: 3, stats: { power: 1 } }, mood: "운동매트에서 몸을 풀고 컨디션이 올랐어요" },
  { id: "youtube", label: "영상휴식", unlockLevel: 4, dailyLimit: 1, reward: { health: 4, coin: 2 }, mood: "좋아하는 영상을 보고 잠깐 쉬었어요" },
  { id: "bench", label: "벤치프레스", unlockLevel: 5, dailyLimit: 1, reward: { health: 12, coin: 8, stats: { power: 2 } }, mood: "벤치프레스로 힘을 키웠어요" },
  { id: "treadmill", label: "런닝머신", unlockLevel: 7, dailyLimit: 1, reward: { health: 14, coin: 10, stats: { power: 2, will: 1 } }, mood: "런닝머신을 뛰고 활력이 올랐어요" },
];
const starterCharacterIds = new Set(["tori", "momo", "bami", "maru", "poyo", "kobi"]);
const drawableCharacterIds = new Set(
  characterPool
    .filter((character) => !starterCharacterIds.has(character.id) && Number(character.weight || 0) > 0)
    .map((character) => character.id),
);

const gachaPool = [
  { id: "color-ticket", name: "색상 변경권", rarity: "RARE", weight: 72, materialId: "color-ticket", type: "palette-ticket", effectLabel: "펫 색상 1회 변경" },
  { id: "star-pin", name: "반짝 별핀", rarity: "RARE", weight: 8, type: "accessory", accessoryId: "star-pin", effectLabel: "바로 획득 · 장착 가능" },
  { id: "heart-scarf", name: "하트 목도리", rarity: "RARE", weight: 8, type: "accessory", accessoryId: "heart-scarf", effectLabel: "바로 획득 · 장착 가능" },
  { id: "moon-badge", name: "달빛 배지", rarity: "RARE", weight: 7, type: "accessory", accessoryId: "moon-badge", effectLabel: "바로 획득 · 장착 가능" },
  { id: "clover-hat", name: "네잎 모자", rarity: "RARE", weight: 7, type: "accessory", accessoryId: "clover-hat", effectLabel: "바로 획득 · 장착 가능" },
  { id: "tiny-bell", name: "딸랑 방울", rarity: "RARE", weight: 7, type: "accessory", accessoryId: "tiny-bell", effectLabel: "바로 획득 · 장착 가능" },
  { id: "focus-glasses", name: "동글 안경", rarity: "EPIC", weight: 4, type: "accessory", accessoryId: "focus-glasses", effectLabel: "바로 획득 · 장착 가능" },
  { id: "leaf-cape", name: "잎망토", rarity: "EPIC", weight: 4, type: "accessory", accessoryId: "leaf-cape", effectLabel: "바로 획득 · 장착 가능" },
  { id: "ribbon-tail", name: "리본 꼬리", rarity: "EPIC", weight: 3, type: "accessory", accessoryId: "ribbon-tail", effectLabel: "바로 획득 · 장착 가능" },
  { id: "cloud-pouch", name: "구름 주머니", rarity: "EPIC", weight: 3, type: "accessory", accessoryId: "cloud-pouch", effectLabel: "바로 획득 · 장착 가능" },
  { id: "blossom-pin", name: "꽃잎 핀", rarity: "RARE", weight: 7, type: "accessory", accessoryId: "blossom-pin", effectLabel: "바로 획득 · 장착 가능" },
  { id: "sprout-cap", name: "새싹 모자", rarity: "RARE", weight: 7, type: "accessory", accessoryId: "sprout-cap", effectLabel: "바로 획득 · 장착 가능" },
  { id: "cocoa-mug", name: "코코아 머그", rarity: "RARE", weight: 6, type: "accessory", accessoryId: "cocoa-mug", effectLabel: "바로 획득 · 장착 가능" },
  { id: "sleep-mask", name: "포근 수면안대", rarity: "EPIC", weight: 4, type: "accessory", accessoryId: "sleep-mask", effectLabel: "바로 획득 · 장착 가능" },
  { id: "picnic-blanket", name: "소풍 담요", rarity: "EPIC", weight: 4, type: "accessory", accessoryId: "picnic-blanket", effectLabel: "바로 획득 · 장착 가능" },
  { id: "acorn-pouch", name: "도토리 주머니", rarity: "EPIC", weight: 3, type: "accessory", accessoryId: "acorn-pouch", effectLabel: "바로 획득 · 장착 가능" },
  { id: "star-crown", name: "별꼬리 왕관", rarity: "LEGEND", weight: 1, type: "accessory", accessoryId: "star-crown", effectLabel: "바로 획득 · 장착 가능" },
];
const validPetPalettes = new Set(["", "default", "berry", "mint", "cocoa", "sky"]);
function normalizePetPaletteId(value = "") {
  const requested = value === "default" ? "" : String(value || "");
  return validPetPalettes.has(requested) && requested !== "default" ? requested : "";
}
const legacyGachaEffects = {
  "routine-spark": { materialId: "routine-spark", craftTarget: "star-pin", effectLabel: "예전 조각" },
  "cheer-thread": { materialId: "cheer-thread", craftTarget: "heart-scarf", effectLabel: "예전 조각" },
  "focus-lens": { materialId: "focus-lens", craftTarget: "focus-glasses", effectLabel: "예전 조각" },
  "green-leaf": { materialId: "green-leaf", craftTarget: "leaf-cape", effectLabel: "예전 조각" },
  "star-tail": { materialId: "star-tail", craftTarget: "star-crown", effectLabel: "예전 조각" },
  "coin-10": { materialId: "routine-spark", craftTarget: "star-pin", effectLabel: "3개 모으면 반짝 별핀" },
  "xp-30": { materialId: "routine-spark", craftTarget: "star-pin", effectLabel: "3개 모으면 반짝 별핀" },
  "friend-star": { materialId: "cheer-thread", craftTarget: "heart-scarf", effectLabel: "3개 모으면 하트 목도리" },
  "focus-crown": { materialId: "focus-lens", craftTarget: "focus-glasses", effectLabel: "3개 모으면 동글 안경" },
  "legend-ticket": { materialId: "star-tail", craftTarget: "star-crown", effectLabel: "2개 모으면 별꼬리 왕관" },
};
const accessoryCatalog = [
  { id: "star-pin", slot: "pin", slotLabel: "핀", name: "반짝 별핀", rarity: "RARE", materialId: "routine-spark", need: 3, effectLabel: "XP +20 · 우정 +1", reward: { xp: 20, bond: 1 }, description: "미션 성공 때 머리 위가 반짝여요" },
  { id: "heart-scarf", slot: "neck", slotLabel: "목", name: "하트 목도리", rarity: "RARE", materialId: "cheer-thread", need: 3, effectLabel: "우정 +4", reward: { bond: 4, health: 2 }, description: "그룹 응원 피드에 잘 어울려요" },
  { id: "moon-badge", slot: "badge", slotLabel: "배지", name: "달빛 배지", rarity: "RARE", materialId: "moon-chip", need: 3, effectLabel: "컨디션 +4", reward: { health: 4 }, description: "밤 루틴을 지킬 때 은은하게 빛나요" },
  { id: "clover-hat", slot: "head", slotLabel: "머리", name: "네잎 모자", rarity: "RARE", materialId: "clover-chip", need: 3, effectLabel: "우정 +2 · 컨디션 +3", reward: { bond: 2, health: 3 }, description: "운 좋은 하루처럼 작은 모자가 올라가요" },
  { id: "tiny-bell", slot: "charm", slotLabel: "방울", name: "딸랑 방울", rarity: "RARE", materialId: "bell-chip", need: 3, effectLabel: "XP +15 · 컨디션 +2", reward: { xp: 15, health: 2 }, description: "걸을 때마다 작은 방울 포인트가 보여요" },
  { id: "focus-glasses", slot: "face", slotLabel: "얼굴", name: "동글 안경", rarity: "EPIC", materialId: "focus-lens", need: 3, effectLabel: "집중 +6", reward: { xp: 25, stats: { focus: 6 } }, description: "공부 미션 펫 느낌이 확 살아나요" },
  { id: "leaf-cape", slot: "back", slotLabel: "등", name: "잎망토", rarity: "EPIC", materialId: "green-leaf", need: 3, effectLabel: "컨디션 +10", reward: { health: 10, stats: { power: 4 } }, description: "운동/건강 루틴 공유에 딱이에요" },
  { id: "ribbon-tail", slot: "tail", slotLabel: "꼬리", name: "리본 꼬리", rarity: "EPIC", materialId: "ribbon-chip", need: 3, effectLabel: "XP +35 · 우정 +2", reward: { xp: 35, bond: 2 }, description: "펫 뒤쪽에 귀여운 리본 포인트가 생겨요" },
  { id: "cloud-pouch", slot: "pouch", slotLabel: "주머니", name: "구름 주머니", rarity: "EPIC", materialId: "cloud-chip", need: 3, effectLabel: "코인 +12 · 컨디션 +4", reward: { coin: 12, health: 4 }, description: "작은 구름 주머니가 보상 느낌을 더해요" },
  { id: "blossom-pin", slot: "pin", slotLabel: "핀", name: "꽃잎 핀", rarity: "RARE", materialId: "blossom-chip", need: 3, effectLabel: "우정 +2 · XP +12", reward: { bond: 2, xp: 12 }, description: "머리 옆에 작은 꽃잎이 살짝 피어요" },
  { id: "sprout-cap", slot: "head", slotLabel: "머리", name: "새싹 모자", rarity: "RARE", materialId: "sprout-chip", need: 3, effectLabel: "컨디션 +5", reward: { health: 5 }, description: "오늘 할 일을 새싹처럼 틔워주는 모자예요" },
  { id: "cocoa-mug", slot: "charm", slotLabel: "참", name: "코코아 머그", rarity: "RARE", materialId: "cocoa-chip", need: 3, effectLabel: "컨디션 +3 · 우정 +1", reward: { health: 3, bond: 1 }, description: "옆에 따뜻한 머그가 놓여 쉬는 느낌을 줘요" },
  { id: "sleep-mask", slot: "face", slotLabel: "얼굴", name: "포근 수면안대", rarity: "EPIC", materialId: "sleep-chip", need: 3, effectLabel: "컨디션 +8", reward: { health: 8, xp: 15 }, description: "회복 루틴에 잘 어울리는 포근한 안대예요" },
  { id: "picnic-blanket", slot: "back", slotLabel: "등", name: "소풍 담요", rarity: "EPIC", materialId: "picnic-chip", need: 3, effectLabel: "우정 +3 · 컨디션 +5", reward: { bond: 3, health: 5 }, description: "펫 뒤에 작은 소풍 담요가 펼쳐져요" },
  { id: "acorn-pouch", slot: "pouch", slotLabel: "주머니", name: "도토리 주머니", rarity: "EPIC", materialId: "acorn-chip", need: 3, effectLabel: "코인 +10 · XP +20", reward: { coin: 10, xp: 20 }, description: "작은 보상을 차곡차곡 모으는 주머니예요" },
  { id: "star-crown", slot: "head", slotLabel: "머리", name: "별꼬리 왕관", rarity: "LEGEND", materialId: "star-tail", need: 2, effectLabel: "XP +120 · 우정 +6", reward: { xp: 120, bond: 6, health: 10 }, description: "레전드 보상으로만 얻고 싶은 왕관이에요" },
];
const accessorySlotOrder = ["back", "tail", "neck", "face", "badge", "pouch", "charm", "pin", "head", "misc"];
const friendRewardCatalog = [
  { id: "friend-3", requiredBond: 3, title: "첫 응원 선물", note: "친구와 상호작용 3번", reward: { coin: 20, health: 3 } },
  { id: "friend-7", requiredBond: 7, title: "색상 변경권", note: "펫 색상 1회 변경", item: "color-ticket", reward: { coin: 10 } },
  { id: "friend-12", requiredBond: 12, title: "하트 목도리", note: "우정 전용 액세서리", accessoryId: "heart-scarf", reward: { coin: 20 } },
  { id: "friend-20", requiredBond: 20, title: "단짝 캡슐", note: "같이 키운 보너스", reward: { coin: 60, xp: 50, health: 6 } },
  { id: "friend-35", requiredBond: 35, title: "그룹 오라", note: "펫 상태 공유 강화", reward: { coin: 90, xp: 80, health: 10 } },
  { id: "friend-50", requiredBond: 50, title: "베스트 루틴 상자", note: "오래 함께한 보상", reward: { coin: 140, xp: 140, health: 12 } },
];
const pokeTreatWords = ["당근", "딸기", "솜사탕", "복숭아", "푸딩", "별사탕", "마시멜로", "메론빵"];

function pokeTreatWord(seed = "") {
  const text = String(seed || "godlife");
  let hash = 0;
  for (const char of text) {
    hash = (hash + char.codePointAt(0)) % 997;
  }
  return pokeTreatWords[hash % pokeTreatWords.length];
}

function hasFinalConsonant(text = "") {
  const word = String(text || "").trim();
  if (!word) {
    return false;
  }
  const code = word.codePointAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

function withObjectParticle(word = "") {
  const value = String(word || "").trim() || "딸기";
  return `${value}${hasFinalConsonant(value) ? "을" : "를"}`;
}

function withSubjectParticle(word = "") {
  const value = String(word || "").trim() || "딸기";
  return `${value}${hasFinalConsonant(value) ? "이" : "가"}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeNickname(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeLoginToken(value) {
  return String(value || "")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 80);
}

function loginTokenFromRequest(request, body = {}) {
  const header = request.headers["x-login-token"];
  const rawHeader = Array.isArray(header) ? header[0] : header;
  return normalizeLoginToken(body.loginToken || body.clientToken || rawHeader);
}

function sanitizePetName(value, fallback = "아기 토리") {
  return String(value || fallback).trim().slice(0, 12) || fallback;
}

const legacyCharacterDefaultNames = {
  chacha: new Set(["아기 차차", "차차"]),
  soli: new Set(["아기 솔이", "솔이"]),
  pepe: new Set(["아기 페페", "페페"]),
  nunu: new Set(["아기 누누", "누누"]),
  toto: new Set(["아기 토토", "토토"]),
  melly: new Set(["아기 멜리", "멜리"]),
};

function normalizeCharacterName(id, value, fallback) {
  const name = sanitizePetName(value, fallback);
  if (legacyCharacterDefaultNames[id]?.has(name)) {
    return fallback;
  }
  return name;
}

function nicknameToUserId(nickname) {
  const normalized = normalizeNickname(nickname);
  let hash = 5381;
  for (const char of normalized) {
    hash = ((hash << 5) + hash + char.codePointAt(0)) >>> 0;
  }
  return `nick_${hash.toString(36)}`;
}

function weightedPick(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) {
      return item;
    }
  }
  return items[items.length - 1];
}

function publicCharacter(character) {
  const clean = clone(character);
  delete clean.weight;
  delete clean.adminOnlyAdult;
  return clean;
}

function characterById(id, fallbackId = "tori") {
  return characterPool.find((character) => character.id === id)
    || characterPool.find((character) => character.id === fallbackId)
    || characterPool[0];
}

function accessoryById(id) {
  return accessoryCatalog.find((accessory) => accessory.id === id);
}

function accessorySlotFor(id) {
  return accessoryById(id)?.slot || "misc";
}

function normalizeEquippedAccessories(userState) {
  userState.accessories ||= [];
  const ownedIds = new Set(userState.accessories.map((accessory) => accessory.id));
  const hasEquippedMap = userState.equippedAccessories && typeof userState.equippedAccessories === "object";
  const raw = hasEquippedMap ? userState.equippedAccessories : {};
  const next = {};
  Object.values(raw).forEach((id) => {
    const accessoryId = String(id || "");
    if (ownedIds.has(accessoryId)) {
      next[accessorySlotFor(accessoryId)] = accessoryId;
    }
  });
  if (!hasEquippedMap && userState.equippedAccessory && ownedIds.has(userState.equippedAccessory)) {
    next[accessorySlotFor(userState.equippedAccessory)] ||= userState.equippedAccessory;
  }
  userState.equippedAccessories = next;
  userState.equippedAccessory = accessorySlotOrder.map((slot) => next[slot]).find(Boolean) || "";
  return next;
}

function equippedAccessoryIds(userState) {
  const equipped = normalizeEquippedAccessories(userState);
  return accessorySlotOrder
    .map((slot) => equipped[slot])
    .filter(Boolean);
}

function equippedAccessoryNames(userState) {
  return equippedAccessoryIds(userState)
    .map((id) => accessoryById(id)?.name)
    .filter(Boolean);
}

function chooseStarter(starterId, fallbackId = "tori") {
  const requestedId = starterCharacterIds.has(starterId) ? starterId : fallbackId;
  const safeId = starterCharacterIds.has(requestedId) ? requestedId : "tori";
  return characterById(safeId, "tori");
}

function petHomeTier(level = 1) {
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

function petGrowthStage(level = 1) {
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

function normalizeCharacterProgress(id, saved = {}, seed = {}) {
  const template = publicCharacter(characterById(id, "tori"));
  let level = Math.max(1, Math.floor(Number(saved.level ?? seed.level ?? 1)));
  let xp = Math.max(0, Math.floor(Number(saved.xp ?? seed.xp ?? 0)));
  let xpMax = xpMaxForLevel(level);
  while (xp >= xpMax) {
    xp -= xpMax;
    level += 1;
    xpMax = xpMaxForLevel(level);
  }
  return {
    ...template,
    acquiredAt: saved.acquiredAt || seed.acquiredAt || "",
    name: normalizeCharacterName(id, saved.name || seed.name || template.name, template.name),
    level,
    xp,
    xpMax,
    paletteId: normalizePetPaletteId(saved.paletteId ?? seed.paletteId ?? ""),
    feedLog: normalizeFeedLog({
      feedLog: saved.feedLog ?? seed.feedLog,
      lastFedAt: saved.lastFedAt ?? seed.lastFedAt,
    }),
    petActions: normalizePetActions({
      petActions: saved.petActions ?? seed.petActions,
    }),
    growthStage: petGrowthStage(level),
    homeTier: petHomeTier(level),
  };
}

function normalizeCharacterCollection(userState) {
  const activeId = userState.character?.id;
  const savedById = new Map();
  for (const character of Array.isArray(userState.characters) ? userState.characters : []) {
    if (character?.id && !savedById.has(character.id)) {
      savedById.set(character.id, character);
    }
  }
  if (userState.character?.id && !savedById.has(userState.character.id)) {
    savedById.set(userState.character.id, userState.character);
  }
  const ownedIds = new Set(
    (Array.isArray(userState.characters) ? userState.characters : [])
      .map((character) => character?.id)
      .filter(Boolean),
  );
  if (userState.character?.id) {
    ownedIds.add(userState.character.id);
  }
  if (starterCharacterIds.has(userState.profile?.starterId)) {
    ownedIds.add(userState.profile.starterId);
  }
  if (ownedIds.size === 0) {
    ownedIds.add("tori");
  }

  userState.characters = Array.from(ownedIds)
    .map((id) => {
      const saved = savedById.get(id) || {};
      const hasSavedProgress = Number.isFinite(Number(saved.level)) || Number.isFinite(Number(saved.xp));
      const hasSavedPalette = Object.prototype.hasOwnProperty.call(saved, "paletteId");
      const hasSavedFeedLog = Object.prototype.hasOwnProperty.call(saved, "feedLog");
      const seed = id === activeId && !hasSavedProgress
        ? {
            level: userState.game?.level,
            xp: userState.game?.xp,
            name: userState.character?.name,
            acquiredAt: userState.character?.acquiredAt,
          }
        : {};
      if (id === activeId && !hasSavedPalette && userState.petPalette) {
        seed.paletteId = userState.petPalette;
      }
      if (id === activeId && !hasSavedFeedLog) {
        seed.feedLog = userState.game?.feedLog;
        seed.lastFedAt = userState.game?.lastFedAt;
      }
      if (id === activeId && !Object.prototype.hasOwnProperty.call(saved, "petActions")) {
        seed.petActions = userState.game?.petActions;
      }
      return normalizeCharacterProgress(id, saved, seed);
    });

  if (!activeId || !userState.characters.some((character) => character.id === activeId)) {
    userState.character = userState.characters[0] || publicCharacter(characterById("tori"));
  } else {
    userState.character = userState.characters.find((character) => character.id === activeId);
  }
  if (userState.character) {
    userState.character.name = sanitizePetName(userState.profile?.petName || userState.character.name, userState.character.name);
    const activeIndex = userState.characters.findIndex((character) => character.id === userState.character.id);
    if (activeIndex >= 0) {
      userState.characters[activeIndex] = { ...userState.characters[activeIndex], name: userState.character.name };
    }
  }
  return userState.characters;
}

function syncGameProgressFromCharacter(userState, active = null) {
  if (!userState?.game) {
    return;
  }
  const current = active || userState.characters?.find((character) => character.id === userState.character?.id);
  if (!current) {
    return;
  }
  userState.game.level = Math.max(1, Math.floor(Number(current.level || 1)));
  userState.game.xp = Math.max(0, Math.floor(Number(current.xp || 0)));
  userState.game.xpMax = xpMaxForLevel(userState.game.level);
  userState.petPalette = normalizePetPaletteId(current.paletteId);
  const feedLog = applyAccountFeedLog(userState, accountFeedLogFromUserState(userState));
  const petActions = normalizePetActions({
    petActions: current.petActions,
  });
  userState.game.petActions = petActions;
  const activeIndex = userState.characters?.findIndex((character) => character.id === current.id) ?? -1;
  if (activeIndex >= 0) {
    userState.characters[activeIndex] = { ...userState.characters[activeIndex], feedLog, petActions };
  }
  userState.character = { ...current, feedLog, petActions, xpMax: userState.game.xpMax, homeTier: petHomeTier(current.level), growthStage: petGrowthStage(current.level) };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function kstDateParts(timestamp = Date.now()) {
  const date = new Date(timestamp + kstOffsetMs);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    weekday: date.getUTCDay(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    date,
  };
}

function dateKeyFromUtcDate(date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

function dateKeyAddDays(key = "", days = 0) {
  const match = String(key || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return "";
  }
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + Number(days || 0)));
  return dateKeyFromUtcDate(date);
}

function toRealIsoFromKstUtcMs(kstUtcMs) {
  return new Date(kstUtcMs - kstOffsetMs).toISOString();
}

function periodSnapshot(timestamp = Date.now()) {
  const parts = kstDateParts(timestamp);
  const dayStartKst = Date.UTC(parts.year, parts.month - 1, parts.day);
  const dayEndKst = dayStartKst + 24 * 60 * 60 * 1000;
  const mondayOffset = (parts.weekday + 6) % 7;
  const weekStartKst = dayStartKst - mondayOffset * 24 * 60 * 60 * 1000;
  const weekEndKst = weekStartKst + 7 * 24 * 60 * 60 * 1000;
  const monthStartKst = Date.UTC(parts.year, parts.month - 1, 1);
  const monthEndKst = Date.UTC(parts.year, parts.month, 1);
  const realNow = timestamp;

  return {
    timezone: "Asia/Seoul",
    now: new Date(timestamp).toISOString(),
    nowLabel: `${parts.year}-${pad(parts.month)}-${pad(parts.day)} ${pad(parts.hour)}:${pad(parts.minute)}:${pad(parts.second)}`,
    daily: {
      key: dateKeyFromUtcDate(new Date(dayStartKst)),
      startsAt: toRealIsoFromKstUtcMs(dayStartKst),
      endsAt: toRealIsoFromKstUtcMs(dayEndKst),
      secondsLeft: Math.max(0, Math.floor((dayEndKst - kstOffsetMs - realNow) / 1000)),
    },
    weekly: {
      key: dateKeyFromUtcDate(new Date(weekStartKst)),
      startsAt: toRealIsoFromKstUtcMs(weekStartKst),
      endsAt: toRealIsoFromKstUtcMs(weekEndKst),
      secondsLeft: Math.max(0, Math.floor((weekEndKst - kstOffsetMs - realNow) / 1000)),
    },
    monthly: {
      key: `${parts.year}-${pad(parts.month)}`,
      startsAt: toRealIsoFromKstUtcMs(monthStartKst),
      endsAt: toRealIsoFromKstUtcMs(monthEndKst),
      secondsLeft: Math.max(0, Math.floor((monthEndKst - kstOffsetMs - realNow) / 1000)),
    },
  };
}

function parseWakeTimeParts(value = "") {
  const text = String(value || "").trim();
  const match = text.match(/(\d{1,2})(?:\s*(?::|시)\s*(\d{1,2})?)?/);
  if (!match) {
    return { hour: 6, minute: 20 };
  }
  let hour = clampInt(match?.[1], 6, 0, 23);
  const minute = match[2] === undefined ? 0 : clampInt(match[2], 0, 0, 59);
  if (/오후|pm/i.test(text) && hour < 12) {
    hour += 12;
  }
  if (/오전|am/i.test(text) && hour === 12) {
    hour = 0;
  }
  return { hour, minute };
}

function nextWakeEventWindow(wakeTime, timestamp = Date.now()) {
  const { hour, minute } = parseWakeTimeParts(wakeTime);
  const parts = kstDateParts(timestamp);
  let startKstUtcMs = Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute);
  let startUtcMs = startKstUtcMs - kstOffsetMs;
  if (startUtcMs <= timestamp + 60 * 1000) {
    startKstUtcMs += 24 * 60 * 60 * 1000;
    startUtcMs = startKstUtcMs - kstOffsetMs;
  }
  return {
    startUtcMs,
    endUtcMs: startUtcMs + 10 * 60 * 1000,
    hour,
    minute,
  };
}

function formatIcsUtc(timestamp) {
  const date = new Date(timestamp);
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    "T",
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
    "Z",
  ].join("");
}

function escapeIcsText(value = "") {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function foldIcsLine(line) {
  const chunks = [];
  let chunk = "";
  for (const char of Array.from(String(line))) {
    const candidate = `${chunk}${char}`;
    if (chunk && Buffer.byteLength(candidate, "utf8") > 72) {
      chunks.push(chunk);
      chunk = ` ${char}`;
    } else {
      chunk = candidate;
    }
  }
  chunks.push(chunk);
  return chunks.join("\r\n");
}

function buildWakeCalendarIcs(userState = {}) {
  const profile = userState.profile || {};
  const wakeTime = profileValue(profile, "wakeTime", "6시 20분");
  const nickname = profileValue(profile, "nickname", "루틴러");
  const petName = sanitizePetName(profile.petName || userState.character?.name, "루틴 펫");
  const event = nextWakeEventWindow(wakeTime);
  const start = formatIcsUtc(event.startUtcMs);
  const safeUserId = String(userState.userId || "guest").replace(/[^a-zA-Z0-9_-]/g, "") || "guest";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Godlife//Wake Check-in//KO",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:godlife-wake-${safeUserId}-${start}@godlife`,
    `DTSTAMP:${formatIcsUtc(Date.now())}`,
    `DTSTART:${start}`,
    `DTEND:${formatIcsUtc(event.endUtcMs)}`,
    `SUMMARY:${escapeIcsText(`갓생 기상 체크인 - ${nickname}`)}`,
    `DESCRIPTION:${escapeIcsText(`${wakeTime}에 ${petName}와 오늘 루틴을 시작하고 기상 인증을 남겨요.`)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT10M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText("갓생 기상 체크인 준비")}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `${lines.map(foldIcsLine).join("\r\n")}\r\n`;
}

function normalizePushSubscription(subscription = null) {
  if (!subscription || typeof subscription !== "object") {
    return null;
  }
  const endpoint = String(subscription.endpoint || "").trim();
  const keys = subscription.keys && typeof subscription.keys === "object" ? subscription.keys : {};
  const p256dh = String(keys.p256dh || "").trim();
  const auth = String(keys.auth || "").trim();
  if (!endpoint.startsWith("https://") || !p256dh || !auth) {
    return null;
  }
  return {
    endpoint: endpoint.slice(0, 2048),
    expirationTime: subscription.expirationTime || null,
    keys: {
      p256dh: p256dh.slice(0, 512),
      auth: auth.slice(0, 256),
    },
  };
}

function normalizeNotificationSettings(source = {}) {
  const push = source.push && typeof source.push === "object" ? source.push : {};
  const subscription = normalizePushSubscription(push.subscription);
  return {
    push: {
      enabled: Boolean(push.enabled && subscription),
      subscription,
      updatedAt: Number.isFinite(Date.parse(push.updatedAt || "")) ? push.updatedAt : "",
      platform: String(push.platform || "").slice(0, 40),
    },
  };
}

function pushPayload(type, title, body, options = {}) {
  return {
    type,
    title: String(title || "갓생 알림").trim().slice(0, 80) || "갓생 알림",
    body: String(body || "").trim().slice(0, 180),
    url: String(options.url || "/").slice(0, 240),
    badge: Math.max(0, Math.min(99, Math.floor(Number(options.badge || 1)))),
    tag: String(options.tag || type || "godlife").slice(0, 80),
    timestamp: Date.now(),
  };
}

async function sendPushToState(userState, payload) {
  if (!webPush) {
    return { ok: false, skipped: true, reason: "web-push unavailable" };
  }
  const settings = normalizeNotificationSettings(userState.notifications || {});
  const subscription = settings.push.subscription;
  if (!settings.push.enabled || !subscription) {
    return { ok: false, skipped: true, reason: "no subscription" };
  }
  try {
    await webPush.sendNotification(subscription, JSON.stringify(payload));
    return { ok: true };
  } catch (error) {
    if ([404, 410].includes(Number(error.statusCode))) {
      userState.notifications = normalizeNotificationSettings({
        push: { ...settings.push, enabled: false, subscription: null, updatedAt: new Date().toISOString() },
      });
      await persistUserState(userState);
    }
    return { ok: false, error: error.message || "push failed" };
  }
}

async function sendPushToUserId(userId, payload) {
  const safeId = String(userId || "").trim();
  if (!safeId) {
    return { ok: false, skipped: true, reason: "missing user" };
  }
  const targetState = await getUserStateById(safeId);
  return sendPushToState(targetState, payload);
}

async function notifyRoomMembers(room, senderUserId, payload) {
  const ids = [...new Set((room?.members || [])
    .map((member) => member.userId)
    .filter((memberId) => memberId && memberId !== senderUserId))];
  await Promise.allSettled(ids.map((memberId) => sendPushToUserId(memberId, payload)));
}

function defaultProfile() {
  return {
    completed: false,
    nickname: "",
    loginToken: "",
    petName: "아기 토리",
    finalGoal: "",
    routineDraft: "",
    routinePrompt: "",
    targetPeriod: "",
    wakeTime: "",
    focusArea: "algorithm",
    difficulty: "normal",
    proofStyle: "friend",
    theme: "default",
    starterId: "tori",
    temptationLimits: { ...temptationDefaults },
  };
}

function clampInt(value, fallback, min = 0, max = 14) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

function normalizeTemptationLimits(source = {}) {
  return {
    party: clampInt(source.party ?? source.partyLimit ?? source.drink ?? source.drinkLimit, temptationDefaults.party),
    game: clampInt(source.game ?? source.gameLimit, temptationDefaults.game),
  };
}

const focusAreaIds = new Set(["algorithm", "dev", "fitness", "career"]);

function inferFocusArea(profile = {}) {
  const text = `${profile.finalGoal || ""}\n${profile.routinePrompt || ""}`.toLowerCase();
  const scores = {
    algorithm: 1,
    dev: 0,
    fitness: 0,
    career: 0,
  };
  const rules = [
    ["algorithm", /알고리즘|코딩테스트|코테|문제|풀이|자료구조|백준|프로그래머스|leetcode|cs/i, 3],
    ["dev", /개발|프로젝트|커밋|github|깃허브|스프링|react|리액트|vue|서버|프론트|백엔드|배포|구현/i, 3],
    ["fitness", /운동|헬스|러닝|산책|요가|스트레칭|건강|식단|수면/i, 3],
    ["career", /취업|면접|이력서|자소서|포트폴리오|지원|채용|공채/i, 3],
  ];
  for (const [area, pattern, weight] of rules) {
    const matches = text.match(pattern);
    if (matches) {
      scores[area] += weight * matches.length;
    }
  }
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function resolveFocusArea(requestedFocusArea, profile = {}) {
  return focusAreaIds.has(requestedFocusArea) ? requestedFocusArea : inferFocusArea(profile);
}

function inferTemptationLimit(text, keywords, fallback) {
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
      return clampInt(explicit[1], fallback);
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

function inferTemptationLimitsFromProfile(profile = {}) {
  const text = `${profile.finalGoal || ""}\n${profile.routinePrompt || ""}`;
  return {
    party: inferTemptationLimit(text, ["유흥", "술", "파티", "회식", "음주", "drink", "alcohol", "party"], temptationDefaults.party),
    game: inferTemptationLimit(text, ["게임", "롤", "피파", "오버워치", "배그", "game"], temptationDefaults.game),
  };
}

function defaultTemptationLog(weekKey = "") {
  return {
    key: weekKey,
    counts: { party: 0, game: 0 },
    limits: { ...temptationDefaults },
  };
}

function roomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function initials(name = "") {
  const text = String(name || "").trim();
  return (text[0] || "친").toUpperCase();
}

function normalizeSnapshotMission(item = {}, fallbackPeriod = "daily") {
  const state = ["todo", "pending", "edit_pending", "done"].includes(item.state) ? item.state : "todo";
  const period = ["daily", "weekly", "monthly"].includes(item.period) ? item.period : fallbackPeriod;
  return {
    id: String(item.id || `${period}-mission`).slice(0, 80),
    period,
    snapshotKey: String(item.snapshotKey || item.periodKey || "").trim().slice(0, 16),
    type: String(item.type || "미션").trim().slice(0, 12) || "미션",
    title: String(item.title || "루틴 미션").trim().slice(0, 60) || "루틴 미션",
    note: String(item.note || "사진 인증 후 그룹 확인").trim().slice(0, 120),
    state,
    action: String(item.action || (state === "todo" ? "요청" : "보기")).trim().slice(0, 12),
    proofId: String(item.proofId || "").trim().slice(0, 80),
    editRequestId: String(item.editRequestId || "").trim().slice(0, 80),
    requestedAt: String(item.requestedAt || "").trim().slice(0, 40),
    completedAt: String(item.completedAt || "").trim().slice(0, 40),
    approvedBy: String(item.approvedBy || "").trim().slice(0, 64),
    approverName: String(item.approverName || "").trim().slice(0, 20),
  };
}

function summarizeMemberMissions(missions = {}) {
  const periods = [
    ["daily", 5],
    ["weekly", 3],
    ["monthly", 3],
  ];
  return periods.flatMap(([period, limit]) => (
    (missions?.[period]?.items || [])
      .slice(0, limit)
      .map((item) => normalizeSnapshotMission({ ...item, snapshotKey: missions?.[period]?.key || "" }, period))
  )).slice(0, 11);
}

function attendanceProfileEffect(streak = 0) {
  const count = Math.max(0, Math.floor(Number(streak || 0)));
  if (count >= 100) {
    return { id: "frame", label: "100일 프레임", shortLabel: "프레임", streak: count };
  }
  if (count >= 30) {
    return { id: "crown", label: "30일 왕관", shortLabel: "왕관", streak: count };
  }
  if (count >= 14) {
    return { id: "star", label: "14일 별빛", shortLabel: "별빛", streak: count };
  }
  if (count >= 7) {
    return { id: "aura", label: "7일 오라", shortLabel: "오라", streak: count };
  }
  if (count >= 3) {
    return { id: "spark", label: "3일 반짝", shortLabel: "반짝", streak: count };
  }
  return { id: "none", label: "", shortLabel: "", streak: count };
}

function normalizeProfileEffect(effect = {}, streak = 0) {
  const fallback = attendanceProfileEffect(streak);
  const id = ["none", "spark", "aura", "star", "crown", "frame"].includes(effect.id) ? effect.id : fallback.id;
  if (id === "none") {
    return { ...fallback, id: "none", label: "", shortLabel: "" };
  }
  const base = attendanceProfileEffect(Math.max(streak, Number(effect.streak || 0)));
  return {
    ...base,
    id,
    label: String(effect.label || base.label).trim().slice(0, 16),
    shortLabel: String(effect.shortLabel || base.shortLabel).trim().slice(0, 8),
  };
}

function normalizeRoomDailyRewardClaims(claims = {}) {
  const entries = Object.entries(claims && typeof claims === "object" ? claims : {})
    .filter(([key]) => /^\d{4}-\d{2}-\d{2}$/.test(key))
    .sort(([left], [right]) => left.localeCompare(right))
    .slice(-45);
  return Object.fromEntries(entries.map(([key, ids]) => [
    key,
    [...new Set((Array.isArray(ids) ? ids : [])
      .map((id) => String(id || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64))
      .filter(Boolean))]
      .slice(0, 12),
  ]));
}

function normalizeRewardClaimMap(claims = {}, { allowUnlock = false } = {}) {
  const entries = Object.entries(claims && typeof claims === "object" ? claims : {})
    .filter(([key]) => /^\d{4}-\d{2}-\d{2}$/.test(key) || (allowUnlock && key === "unlock"))
    .sort(([left], [right]) => left.localeCompare(right))
    .slice(-45);
  return Object.fromEntries(entries.map(([key, ids]) => [
    key,
    [...new Set((Array.isArray(ids) ? ids : [])
      .map((id) => String(id || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64))
      .filter(Boolean))]
      .slice(0, 12),
  ]));
}

function normalizeRoomGroupRewardClaims(claims = {}) {
  const raw = claims && typeof claims === "object" ? claims : {};
  return {
    attendance: normalizeRewardClaimMap(raw.attendance || {}),
    room_streak: normalizeRewardClaimMap(raw.room_streak || {}, { allowUnlock: true }),
  };
}

function normalizeRoomEffects(effects = {}) {
  const raw = effects && typeof effects === "object" ? effects : {};
  return {
    roomStreak: Boolean(raw.roomStreak),
    roomStreakUnlockedAt: Number.isFinite(Date.parse(raw.roomStreakUnlockedAt || "")) ? raw.roomStreakUnlockedAt : "",
  };
}

function normalizeMemberSnapshot(snapshot = {}) {
  const rawAccessoryIds = Array.isArray(snapshot.accessoryIds)
    ? snapshot.accessoryIds
    : Object.values(snapshot.equippedAccessories || {});
  const accessoryIds = [...new Set([
    ...rawAccessoryIds,
    snapshot.accessoryId,
  ].filter(Boolean).map((id) => String(id).replace(/[^a-z0-9_-]/gi, "").slice(0, 32)))];
  const attendanceStreak = Math.max(0, Math.floor(Number(
    snapshot.attendanceStreak
    || snapshot.attendance?.streak
    || snapshot.profileEffect?.streak
    || 0,
  )));
  return {
    characterId: String(snapshot.characterId || "tori").replace(/[^a-z0-9_-]/gi, "").slice(0, 24) || "tori",
    accessoryId: accessoryIds[0] || "",
    accessoryIds,
    paletteId: normalizePetPaletteId(snapshot.paletteId),
    petName: String(snapshot.petName || "아기 토리").trim().slice(0, 20),
    rarityLabel: String(snapshot.rarityLabel || "노말").trim().slice(0, 12),
    level: Math.max(1, Math.floor(Number(snapshot.level || 1))),
    health: Math.min(100, Math.max(0, Math.round(Number(snapshot.health ?? 50)))),
    completion: Math.min(100, Math.max(0, Math.round(Number(snapshot.completion || 0)))),
    streak: Math.max(0, Math.floor(Number(snapshot.streak || 0))),
    attendanceStreak,
    attendanceLastKey: String(snapshot.attendanceLastKey || snapshot.attendance?.lastKey || "").slice(0, 16),
    profileEffect: normalizeProfileEffect(snapshot.profileEffect, attendanceStreak),
    mood: String(snapshot.mood || "루틴 준비 중").trim().slice(0, 60),
    profileCompleted: Boolean(snapshot.profileCompleted),
    missions: Array.isArray(snapshot.missions)
      ? snapshot.missions.slice(0, 11).map((item) => normalizeSnapshotMission(item))
      : [],
    updatedAt: snapshot.updatedAt || "",
  };
}

function roomMemberSnapshot(userState = {}) {
  const game = normalizeGrowth({ ...(userState.game || {}) });
  const attendance = normalizeAttendance(game);
  const activePalette = normalizePetPaletteId(userState.character?.paletteId || userState.petPalette);
  const accessoryIds = equippedAccessoryIds(userState);
  return normalizeMemberSnapshot({
    characterId: userState.character?.id || "tori",
    accessoryId: accessoryIds[0] || "",
    accessoryIds,
    equippedAccessories: userState.equippedAccessories || {},
    paletteId: activePalette,
    petName: sanitizePetName(userState.profile?.petName || userState.character?.name, "아기 토리"),
    rarityLabel: userState.character?.rarityLabel || userState.character?.rarity || "노말",
    level: game.level,
    health: game.health,
    completion: game.completion,
    streak: game.streak,
    attendanceStreak: attendance.streak,
    attendanceLastKey: attendance.lastKey,
    profileEffect: attendanceProfileEffect(attendance.streak),
    mood: game.mood || "루틴 준비 중",
    profileCompleted: Boolean(userState.profile?.completed),
    missions: summarizeMemberMissions(userState.missions),
    updatedAt: new Date().toISOString(),
  });
}

function comparableMemberSnapshot(snapshot = {}) {
  const normalized = normalizeMemberSnapshot(snapshot);
  return {
    characterId: normalized.characterId,
    accessoryId: normalized.accessoryId,
    accessoryIds: normalized.accessoryIds,
    paletteId: normalized.paletteId,
    petName: normalized.petName,
    rarityLabel: normalized.rarityLabel,
    level: normalized.level,
    health: normalized.health,
    completion: normalized.completion,
    streak: normalized.streak,
    attendanceStreak: normalized.attendanceStreak,
    attendanceLastKey: normalized.attendanceLastKey,
    profileEffect: normalized.profileEffect,
    mood: normalized.mood,
    profileCompleted: normalized.profileCompleted,
    missions: normalized.missions,
  };
}

function memberSnapshotChanged(previous = {}, next = {}) {
  return JSON.stringify(comparableMemberSnapshot(previous)) !== JSON.stringify(comparableMemberSnapshot(next));
}

function snapshotMissionReward(item = {}) {
  const period = item.period || "daily";
  if (period === "monthly") {
    return { xp: 320, coin: 90, bond: 10, completion: 30 };
  }
  if (period === "weekly") {
    return { xp: 140, coin: 36, bond: 4, completion: 20 };
  }
  if (/-wake$/.test(item.id || "") || item.type === "기상") {
    return { xp: 25, coin: 6, completion: 10, stats: { will: 4, power: 1 }, health: 2 };
  }
  return dailyRewardForType(item.type);
}

function snapshotMissionsByPeriod(snapshot = {}) {
  const periods = periodSnapshot();
  const base = createMissions(defaultProfile(), periods);
  for (const [periodName, limit] of [["daily", 5], ["weekly", 3], ["monthly", 3]]) {
    const items = (snapshot.missions || [])
      .filter((item) => (item.period || periodName) === periodName)
      .slice(0, limit)
      .map((item, index) => {
        const normalized = normalizeSnapshotMission(item, periodName);
        return {
          ...normalized,
          id: normalized.id || `${periodName}-recovered-${index}`,
          links: [],
          reward: snapshotMissionReward(normalized),
          customized: !/-wake$/.test(normalized.id || ""),
        };
      });
    if (items.length > 0) {
      base[periodName].items = items;
      base[periodName].key = items[0].snapshotKey || base[periodName].key;
    }
  }
  return base;
}

function inferGoalFromSnapshot(snapshot = {}) {
  const boss = (snapshot.missions || []).find((item) => (
    item?.period === "monthly" && /보스 미션\s*$/.test(String(item.title || ""))
  ));
  if (boss?.title) {
    return String(boss.title).replace(/\s*보스 미션\s*$/, "").trim().slice(0, 40);
  }
  const main = (snapshot.missions || []).find((item) => item?.period === "monthly" && item?.title);
  return String(main?.title || "").trim().slice(0, 40);
}

function inferWakeTimeFromSnapshot(snapshot = {}) {
  const wakeMission = (snapshot.missions || []).find((item) => /-wake$/.test(item?.id || "") || item?.type === "기상");
  const title = String(wakeMission?.title || "");
  const match = title.match(/(\d{1,2})\s*시(?:\s*(\d{1,2})\s*분)?/);
  if (!match) {
    return "";
  }
  const hour = Math.min(23, Math.max(0, Number(match[1] || 0)));
  const minute = Math.min(59, Math.max(0, Number(match[2] || 0)));
  return minute ? `${hour}시 ${minute}분` : `${hour}시`;
}

function routineDraftFromSnapshot(snapshot = {}) {
  return (snapshot.missions || [])
    .filter((item) => item?.period === "daily" && !/-wake$/.test(item.id || ""))
    .map((item) => `- ${String(item.title || "").trim()}`)
    .filter((line) => line.length > 2)
    .slice(0, 5)
    .join("\n");
}

function hydrateUserStateFromMemberSnapshot(userState, member = {}, room = null) {
  const snapshot = normalizeMemberSnapshot(member.snapshot || {});
  if (!snapshot.profileCompleted || userState.profile?.completed) {
    return false;
  }

  const nickname = String(member.name || userState.profile?.nickname || "").trim().slice(0, 12);
  userState.profile ||= defaultProfile();
  userState.profile.completed = true;
  userState.profile.nickname = nickname || userState.profile.nickname;
  userState.profile.petName = snapshot.petName || userState.profile.petName;
  userState.profile.finalGoal ||= inferGoalFromSnapshot(snapshot);
  userState.profile.routineDraft ||= routineDraftFromSnapshot(snapshot);
  userState.profile.routinePrompt ||= userState.profile.routineDraft;
  userState.profile.wakeTime ||= inferWakeTimeFromSnapshot(snapshot);

  const activeCharacter = normalizeCharacterProgress(snapshot.characterId || userState.character?.id || "tori", {
    acquiredAt: new Date().toISOString(),
    level: snapshot.level,
    name: snapshot.petName,
    paletteId: snapshot.paletteId,
  });
  userState.character = activeCharacter;
  const characterMap = new Map((Array.isArray(userState.characters) ? userState.characters : [])
    .filter((character) => character?.id)
    .map((character) => [character.id, character]));
  characterMap.set(activeCharacter.id, { ...(characterMap.get(activeCharacter.id) || {}), ...activeCharacter });
  userState.characters = Array.from(characterMap.values());

  userState.game ||= initialGameState();
  userState.game.level = snapshot.level;
  userState.game.health = snapshot.health;
  userState.game.completion = snapshot.completion;
  userState.game.streak = snapshot.streak;
  userState.game.attendance = {
    ...normalizeAttendance(userState.game),
    streak: snapshot.attendanceStreak,
  };
  userState.game.mood = snapshot.mood || userState.game.mood;
  userState.petPalette = snapshot.paletteId;

  userState.accessories ||= [];
  const ownedAccessories = new Set(userState.accessories.map((accessory) => accessory.id));
  for (const accessoryId of snapshot.accessoryIds || []) {
    const recipe = accessoryById(accessoryId);
    if (recipe && !ownedAccessories.has(recipe.id)) {
      userState.accessories.unshift({ ...recipe, acquiredAt: new Date().toISOString(), source: "room-recovery" });
      ownedAccessories.add(recipe.id);
    }
  }
  userState.equippedAccessories ||= {};
  for (const accessoryId of snapshot.accessoryIds || []) {
    if (ownedAccessories.has(accessoryId)) {
      userState.equippedAccessories[accessorySlotFor(accessoryId)] = accessoryId;
    }
  }

  userState.missions = snapshotMissionsByPeriod(snapshot);
  userState.quests = userState.missions.daily.items;
  if (room?.id) {
    userState.activeRoomId = room.id;
  }
  return true;
}

function updateRoomMemberSnapshot(room, userState) {
  if (!room?.members || !userState?.userId) {
    return false;
  }
  const nickname = String(userState.profile?.nickname || "나").trim().slice(0, 12) || "나";
  let member = room.members.find((item) => item.userId === userState.userId);
  let changed = false;
  if (!member) {
    member = {
      userId: userState.userId,
      name: nickname,
      role: room.members.some((item) => item.userId) ? "member" : "host",
      status: "online",
      initial: initials(nickname),
    };
    room.members.push(member);
    changed = true;
  }
  const nextInitial = initials(nickname);
  if (member.name !== nickname) {
    member.name = nickname;
    changed = true;
  }
  if (member.status !== "online") {
    member.status = "online";
    changed = true;
  }
  if (member.initial !== nextInitial) {
    member.initial = nextInitial;
    changed = true;
  }
  const nextSnapshot = roomMemberSnapshot(userState);
  const previousUpdatedAt = Date.parse(member.snapshot?.updatedAt || "");
  const shouldRefreshPresence = !Number.isFinite(previousUpdatedAt) || Date.now() - previousUpdatedAt > roomSnapshotRefreshMs;
  if (memberSnapshotChanged(member.snapshot, nextSnapshot) || shouldRefreshPresence || changed) {
    member.snapshot = nextSnapshot;
    return true;
  }
  return false;
}

function proofPhotoSize(photo = "") {
  return Buffer.byteLength(String(photo || ""), "utf8");
}

function proofPhotoError(message, status = 400) {
  return { ok: false, status, error: message };
}

function sanitizeIncomingProofPhoto(photo = "") {
  const value = String(photo || "");
  if (!value.startsWith("data:image/")) {
    return proofPhotoError("\uc0ac\uc9c4 \uc778\uc99d\uc774 \ud544\uc694\ud574\uc694");
  }
  if (proofPhotoSize(value) > maxProofPhotoBytes) {
    return proofPhotoError("\uc0ac\uc9c4\uc774 \ub108\ubb34 \ucee4\uc694. \ub2e4\uc2dc \ucc0d\uc5b4\uc11c \uc62c\ub824\uc8fc\uc138\uc694.", 413);
  }
  return { ok: true, photo: value };
}

function compactProofList(proofs = [], options = {}) {
  const maxItems = clampInt(options.maxItems, maxRoomProofs, 1, 80);
  const maxPhotos = clampInt(options.maxPhotos, maxRoomProofPhotos, 0, maxItems);
  let keptPhotos = 0;
  return (Array.isArray(proofs) ? proofs : [])
    .slice(0, maxItems)
    .map((proof) => {
      const item = { ...proof };
      if (!item.photo) {
        return item;
      }
      const photo = String(item.photo || "");
      const canKeepPhoto = photo.startsWith("data:image/")
        && proofPhotoSize(photo) <= maxProofPhotoBytes
        && keptPhotos < maxPhotos;
      if (canKeepPhoto) {
        keptPhotos += 1;
        item.photo = photo;
        item.photoExpired = false;
      } else {
        delete item.photo;
        item.photoExpired = true;
      }
      return item;
    });
}

function normalizeRoom(room = {}, fallbackHost = "나") {
  const members = Array.isArray(room.members) && room.members.length > 0
    ? room.members
    : [{ name: fallbackHost, role: "host", status: "online", initial: initials(fallbackHost) }];
  return {
    id: String(room.id || `room-${Date.now()}`),
    resetAt: store.resetAt || room.resetAt || "",
    code: String(room.code || roomCode()).replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 8) || roomCode(),
    hostUserId: String(room.hostUserId || ""),
    name: String(room.name || "루틴 인증방").trim().slice(0, 20),
    goal: String(room.goal || "그룹원끼리 서로 루틴 인증하기").trim().slice(0, 120),
    capacity: clampInt(room.capacity, 4, 2, 8),
    proofMode: ["photo", "check", "hybrid"].includes(room.proofMode) ? room.proofMode : "photo",
    status: room.status === "closed" ? "closed" : "open",
    createdAt: room.createdAt || new Date().toISOString(),
    closedAt: room.closedAt || "",
    messages: Array.isArray(room.messages) ? room.messages.slice(-40) : [],
    proofs: compactProofList(room.proofs, { maxItems: maxRoomProofs, maxPhotos: maxRoomProofPhotos }),
    shares: Array.isArray(room.shares) ? room.shares.slice(0, 30) : [],
    dailyRewardClaims: normalizeRoomDailyRewardClaims(room.dailyRewardClaims),
    groupRewardClaims: normalizeRoomGroupRewardClaims(room.groupRewardClaims),
    effects: normalizeRoomEffects(room.effects),
    members: members.slice(0, 8).map((member, index) => {
      const name = String(member.name || (index === 0 ? fallbackHost : "그룹원")).trim().slice(0, 12);
      return {
        userId: String(member.userId || ""),
        name,
        role: member.role || (index === 0 ? "host" : "member"),
        status: member.status || "invited",
        initial: initials(member.initial || name),
        snapshot: normalizeMemberSnapshot(member.snapshot || member),
      };
    }),
  };
}

function defaultStats() {
  return {
    power: 10,
    focus: 10,
    skill: 10,
    will: 10,
  };
}

function xpMaxForLevel(level = 1) {
  return 100 + (Math.max(1, Number(level || 1)) - 1) * 50;
}

function initialGameState() {
  return {
    level: 1,
    xp: 0,
    xpMax: xpMaxForLevel(1),
    coin: starterCoin,
    bond: 0,
    completion: 0,
    streak: 0,
    weeklyLeft: 5,
    penalty: 0,
    penaltyReason: "",
    temptations: defaultTemptationLog(),
    stats: defaultStats(),
    health: 50,
    mood: "Lv.1 루틴을 시작했어요",
    growthVersion: 1,
    starterCoinGranted: true,
    starterCoinVersion,
    lastLevelUp: 0,
    lastCoinBonus: 0,
    lastStreakDailyKey: "",
    lastFedAt: "",
    feedLog: {
      key: "",
      count: 0,
      limit: feedDailyLimit,
      lastFedAt: "",
    },
    petActions: {
      key: "",
      counts: {},
    },
    lastUnlockedPetActions: [],
    lastCompletedMission: null,
    conditionDecay: {
      key: periodSnapshot().daily.key,
      previousKey: "",
      amount: 0,
      reasons: [],
      appliedAt: "",
      healthBefore: 50,
      healthAfter: 50,
    },
    attendance: {
      lastKey: "",
      streak: 0,
      claimedAt: "",
      reward: null,
    },
  };
}

function resetGrowthToLevelOne(game = {}) {
  const previousTemptations = game.temptations || {};
  const limits = normalizeTemptationLimits(previousTemptations.limits || {});
  Object.assign(game, initialGameState(), {
    temptations: {
      ...defaultTemptationLog(previousTemptations.key || ""),
      limits,
    },
  });
  return game;
}

function ensureStarterCoin(userState) {
  userState.game = normalizeGrowth(userState.game || {});
  if (userState.game.starterCoinGranted && userState.game.starterCoinVersion >= starterCoinVersion) {
    return false;
  }
  if (Number(userState.game.coin || 0) < starterCoin) {
    userState.game.coin = starterCoin;
  }
  userState.game.starterCoinGranted = true;
  userState.game.starterCoinVersion = starterCoinVersion;
  return true;
}

function normalizeAttendance(game = {}) {
  const raw = game.attendance && typeof game.attendance === "object" ? game.attendance : {};
  const lastKey = String(raw.lastKey || game.lastAttendanceKey || "");
  game.attendance = {
    lastKey,
    streak: Math.max(0, Math.floor(Number(raw.streak || game.attendanceStreak || 0))),
    claimedAt: Number.isFinite(Date.parse(raw.claimedAt || "")) ? raw.claimedAt : "",
    reward: raw.reward && typeof raw.reward === "object" ? raw.reward : null,
  };
  return game.attendance;
}

function normalizeConditionDecay(game = {}) {
  const raw = game.conditionDecay && typeof game.conditionDecay === "object" ? game.conditionDecay : {};
  const reasons = Array.isArray(raw.reasons)
    ? raw.reasons.map((reason) => String(reason || "").trim()).filter(Boolean).slice(0, 4)
    : [];
  const healthBefore = Number.isFinite(Number(raw.healthBefore)) ? Number(raw.healthBefore) : Number(game.health ?? 50);
  const healthAfter = Number.isFinite(Number(raw.healthAfter)) ? Number(raw.healthAfter) : Number(game.health ?? 50);
  game.conditionDecay = {
    key: String(raw.key || raw.lastKey || "").slice(0, 16),
    previousKey: String(raw.previousKey || "").slice(0, 16),
    amount: Math.max(0, Math.min(100, Math.round(Number(raw.amount ?? raw.lastAmount ?? 0)))),
    reasons,
    appliedAt: Number.isFinite(Date.parse(raw.appliedAt || "")) ? raw.appliedAt : "",
    healthBefore: Math.min(100, Math.max(0, Math.round(healthBefore))),
    healthAfter: Math.min(100, Math.max(0, Math.round(healthAfter))),
  };
  return game.conditionDecay;
}

function normalizeFeedLog(game = {}) {
  const dailyKey = periodSnapshot().daily.key;
  const raw = game.feedLog && typeof game.feedLog === "object" ? game.feedLog : {};
  const rawLastFedAt = raw.lastFedAt || game.lastFedAt || "";
  const lastFedAt = Number.isFinite(Date.parse(rawLastFedAt || "")) ? rawLastFedAt : "";
  let key = String(raw.key || raw.dailyKey || "");
  let count = Math.max(0, Math.floor(Number(raw.count || game.feedCountToday || 0)));

  if (!key && lastFedAt) {
    key = periodSnapshot(Date.parse(lastFedAt)).daily.key;
    count = key === dailyKey ? Math.max(1, count) : 0;
  }
  if (key !== dailyKey) {
    key = dailyKey;
    count = 0;
  }

  game.lastFedAt = lastFedAt;
  game.feedLog = {
    key,
    count: Math.min(feedDailyLimit, Math.max(0, count)),
    limit: feedDailyLimit,
    unlimited: false,
    lastFedAt,
  };
  return game.feedLog;
}

function accountFeedLogFromUserState(userState = {}) {
  const dailyKey = periodSnapshot().daily.key;
  const candidates = [
    userState.game,
    userState.character,
    ...(Array.isArray(userState.characters) ? userState.characters : []),
  ];
  let count = 0;
  let lastFedAt = "";
  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }
    const log = normalizeFeedLog({
      feedLog: candidate.feedLog,
      lastFedAt: candidate.lastFedAt,
    });
    if (log.key !== dailyKey) {
      continue;
    }
    count = Math.max(count, Math.floor(Number(log.count || 0)));
    if (log.lastFedAt && (!lastFedAt || Date.parse(log.lastFedAt) > Date.parse(lastFedAt))) {
      lastFedAt = log.lastFedAt;
    }
  }
  return {
    key: dailyKey,
    count: Math.min(feedDailyLimit, Math.max(0, count)),
    limit: feedDailyLimit,
    unlimited: false,
    lastFedAt,
  };
}

function applyAccountFeedLog(userState = {}, feedLog = null) {
  const normalized = normalizeFeedLog({
    feedLog: feedLog || accountFeedLogFromUserState(userState),
    lastFedAt: feedLog?.lastFedAt,
  });
  userState.game ||= {};
  userState.game.feedLog = normalized;
  userState.game.lastFedAt = normalized.lastFedAt;
  if (Array.isArray(userState.characters)) {
    userState.characters = userState.characters.map((character) => ({
      ...character,
      feedLog: normalized,
      lastFedAt: normalized.lastFedAt,
    }));
  }
  if (userState.character) {
    userState.character = {
      ...userState.character,
      feedLog: normalized,
      lastFedAt: normalized.lastFedAt,
    };
  }
  return normalized;
}

function normalizePetActions(game = {}) {
  const dailyKey = periodSnapshot().daily.key;
  const raw = game.petActions && typeof game.petActions === "object" ? game.petActions : {};
  const sameDay = raw.key === dailyKey;
  const previousCounts = sameDay && raw.counts && typeof raw.counts === "object" ? raw.counts : {};
  game.petActions = {
    key: dailyKey,
    counts: Object.fromEntries(
      petActionCatalog.map((action) => [action.id, clampInt(previousCounts[action.id], 0, 0, action.dailyLimit)]),
    ),
  };
  return game.petActions;
}

function formatFeedCooldown(ms = 0) {
  const totalMinutes = Math.max(1, Math.ceil(Number(ms || 0) / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0 && minutes > 0) {
    return `${hours}시간 ${minutes}분`;
  }
  if (hours > 0) {
    return `${hours}시간`;
  }
  return `${minutes}분`;
}

function normalizeGrowth(game = {}) {
  game.level = Math.max(1, Math.floor(Number(game.level || 1)));
  game.xp = Math.max(0, Math.floor(Number(game.xp || 0)));
  game.xpMax = xpMaxForLevel(game.level);
  game.coin = Math.max(0, Math.floor(Number(game.coin || 0)));
  game.bond = Math.max(0, Math.floor(Number(game.bond || 0)));
  game.completion = Math.min(100, Math.max(0, Math.round(Number(game.completion || 0))));
  game.streak = Math.max(0, Math.floor(Number(game.streak || 0)));
  game.weeklyLeft = Math.max(0, Math.floor(Number(game.weeklyLeft ?? 5)));
  game.health = Math.min(100, Math.max(0, Math.round(Number(game.health ?? 50))));
  game.stats = { ...defaultStats(), ...(game.stats || {}) };
  game.growthVersion = 1;
  game.starterCoinGranted = Boolean(game.starterCoinGranted);
  game.starterCoinVersion = Math.max(0, Math.floor(Number(game.starterCoinVersion || 0)));
  game.lastLevelUp = Math.max(0, Math.floor(Number(game.lastLevelUp || 0)));
  game.lastCoinBonus = Math.max(0, Math.floor(Number(game.lastCoinBonus || 0)));
  game.lastUnlockedPetActions = (Array.isArray(game.lastUnlockedPetActions) ? game.lastUnlockedPetActions : [])
    .map((action) => ({
      id: String(action?.id || "").trim().slice(0, 32),
      label: String(action?.label || "").trim().slice(0, 24),
      unlockLevel: Math.max(1, Math.floor(Number(action?.unlockLevel || 1))),
    }))
    .filter((action) => action.id && action.label)
    .slice(0, 8);
  game.lastStreakDailyKey ||= "";
  game.lastFedAt = Number.isFinite(Date.parse(game.lastFedAt || "")) ? game.lastFedAt : "";
  normalizeFeedLog(game);
  normalizePetActions(game);
  normalizeAttendance(game);
  normalizeConditionDecay(game);
  return game;
}

const achievementCatalog = [
  { id: "first_brag", title: "첫 펫 소식", note: "펫 상태를 그룹 피드에 처음 공유", hidden: false, reward: { coin: 5, bond: 1 } },
  { id: "friend_reaction", title: "반응 받는 그룹원", note: "그룹원이 내 펫 소식에 반응", hidden: false, reward: { coin: 6, bond: 2 } },
  { id: "proof_partner", title: "검증 파트너", note: "그룹 검증으로 미션 완료", hidden: false, reward: { coin: 8, bond: 3 } },
  { id: "streak_spark", title: "루틴 불씨", note: "연속 5일 루틴 유지", hidden: false, reward: { coin: 10, bond: 1 } },
  { id: "first_accessory", title: "첫 꾸미기", note: "뽑기로 액세서리 획득", hidden: false, reward: { coin: 8, bond: 2 } },
  { id: "first_pet_draw", title: "새 펫 등장", note: "펫 알에서 레어 이상 펫 해금", hidden: false, reward: { coin: 10, bond: 2 } },
  { id: "healthy_glow", title: "히든: 반짝 컨디션", note: "컨디션 70 이상 상태로 펫 소식 공유", hidden: true, reward: { coin: 12, bond: 2 } },
  { id: "tiny_collector", title: "히든: 작은 수집가", note: "액세서리 3개 보유", hidden: true, reward: { coin: 18, bond: 4 } },
  { id: "rare_keeper", title: "히든: 레어 펫", note: "레어 펫 2마리 보유", hidden: true, reward: { coin: 16, bond: 3 } },
  { id: "epic_keeper", title: "히든: 에픽 펫", note: "에픽 펫 보유", hidden: true, reward: { coin: 22, bond: 5 } },
  { id: "loki_star", title: "히든: 별꼬리 펫", note: "레전드 레서판다 로키를 파트너로 맞이", hidden: true, reward: { coin: 15, bond: 3 } },
  { id: "mutual_circle", title: "히든: 서로의 루틴", note: "펫 소식과 그룹 반응을 모두 달성", hidden: true, reward: { coin: 14, bond: 4 } },
];

const reactionTypes = {
  cheer: { label: "응원", message: "펫 상태 봤어. 오늘도 같이 가자!" },
  cute: { label: "귀여워", message: "너희 펫 너무 귀엽다. 자주 보여줘." },
  proud: { label: "인정", message: "이 정도면 진짜 루틴러 인정." },
};

function defaultAchievements() {
  return achievementCatalog.map((achievement) => ({
    ...achievement,
    unlocked: false,
    unlockedAt: null,
  }));
}

function normalizeAchievements(source = []) {
  return achievementCatalog.map((achievement) => {
    const saved = source.find((item) => item.id === achievement.id) || {};
    return {
      ...achievement,
      unlocked: Boolean(saved.unlocked),
      unlockedAt: saved.unlockedAt || null,
    };
  });
}

function normalizeFriendRewards(source = {}) {
  const raw = source && typeof source === "object" ? source : {};
  const validIds = new Set(friendRewardCatalog.map((reward) => reward.id));
  const claimed = [...new Set((Array.isArray(raw.claimed) ? raw.claimed : [])
    .map((id) => String(id || "").trim())
    .filter((id) => validIds.has(id)))];
  return {
    claimed,
    lastClaim: raw.lastClaim && typeof raw.lastClaim === "object" ? {
      id: validIds.has(raw.lastClaim.id) ? raw.lastClaim.id : "",
      title: String(raw.lastClaim.title || "").trim().slice(0, 24),
      claimedAt: Number.isFinite(Date.parse(raw.lastClaim.claimedAt || "")) ? raw.lastClaim.claimedAt : "",
    } : null,
  };
}

function friendRewardById(rewardId) {
  return friendRewardCatalog.find((reward) => reward.id === rewardId);
}

function createFriendRewardItem(reward) {
  if (reward.item !== "color-ticket") {
    return null;
  }
  return normalizeInventoryItem({
    id: `color-ticket-${Date.now()}`,
    name: "색상 변경권",
    rarity: "RARE",
    materialId: "color-ticket",
    type: "palette-ticket",
    effectLabel: "펫 색상 1회 변경",
    acquiredAt: new Date().toISOString(),
  });
}

function grantFriendReward(userState, reward) {
  const claimedAt = new Date().toISOString();
  const gain = clone(reward.reward || {});
  const granted = [];

  if (reward.item) {
    const item = createFriendRewardItem(reward);
    if (item) {
      userState.inventory ||= [];
      userState.inventory.unshift(item);
      userState.inventory = userState.inventory.slice(0, 60);
      granted.push(item.name);
    }
  }

  if (reward.accessoryId) {
    const recipe = accessoryById(reward.accessoryId);
    if (recipe) {
      userState.accessories ||= [];
      if (userState.accessories.some((accessory) => accessory.id === recipe.id)) {
        gain.coin = Math.max(Number(gain.coin || 0), 30);
        granted.push("보유 보너스");
      } else {
        const accessory = {
          id: recipe.id,
          name: recipe.name,
          rarity: recipe.rarity,
          description: recipe.description,
          acquiredAt: claimedAt,
          source: "friend-reward",
        };
        userState.accessories.unshift(accessory);
        normalizeEquippedAccessories(userState);
        userState.equippedAccessories[recipe.slot || "misc"] = accessory.id;
        normalizeEquippedAccessories(userState);
        Object.assign(gain, {
          ...gain,
          xp: Number(gain.xp || 0) + Number(recipe.reward?.xp || 0),
          coin: Number(gain.coin || 0) + Number(recipe.reward?.coin || 0),
          bond: Number(gain.bond || 0) + Number(recipe.reward?.bond || 0),
          health: Number(gain.health || 0) + Number(recipe.reward?.health || 0),
          stats: { ...(gain.stats || {}), ...(recipe.reward?.stats || {}) },
        });
        granted.push(recipe.name);
      }
    }
  }

  addReward(userState, gain, { applyPenalty: false });
  userState.friendRewards = normalizeFriendRewards(userState.friendRewards);
  userState.friendRewards.claimed.push(reward.id);
  userState.friendRewards.claimed = [...new Set(userState.friendRewards.claimed)];
  userState.friendRewards.lastClaim = {
    id: reward.id,
    title: reward.title,
    claimedAt,
  };
  userState.game.mood = `${reward.title} 우정 보상을 받았어요`;
  const summary = rewardSummary(gain, userState);
  return {
    rewardText: granted.length > 0 ? `${reward.title} · ${granted[0]}` : `${reward.title} · ${summary}`,
  };
}

function totalReactions(shares = []) {
  return shares.reduce((sum, share) => (
    sum + Object.values(share.reactions || {}).reduce((innerSum, value) => innerSum + Number(value || 0), 0)
  ), 0);
}

function unlockAchievement(userState, id, unlocked = []) {
  const achievement = userState.achievements?.find((item) => item.id === id);
  if (!achievement || achievement.unlocked) {
    return unlocked;
  }
  achievement.unlocked = true;
  achievement.unlockedAt = new Date().toISOString();
  if (achievement.reward?.coin) {
    userState.game.coin += achievement.reward.coin;
  }
  if (achievement.reward?.bond) {
    userState.game.bond += achievement.reward.bond;
  }
  unlocked.push(achievement);
  return unlocked;
}

function evaluateAchievements(userState) {
  userState.achievements = normalizeAchievements(userState.achievements || []);
  userState.shares ||= [];
  const unlocked = [];
  if (userState.shares.length > 0) {
    unlockAchievement(userState, "first_brag", unlocked);
  }
  if (totalReactions(userState.shares) > 0) {
    unlockAchievement(userState, "friend_reaction", unlocked);
  }
  if ((userState.proofs || []).some((proof) => proof.status === "approved")) {
    unlockAchievement(userState, "proof_partner", unlocked);
  }
  if (Number(userState.game?.streak || 0) >= 5) {
    unlockAchievement(userState, "streak_spark", unlocked);
  }
  if ((userState.accessories || []).length > 0) {
    unlockAchievement(userState, "first_accessory", unlocked);
  }
  if ((userState.accessories || []).length >= 3) {
    unlockAchievement(userState, "tiny_collector", unlocked);
  }
  if ((userState.characters || []).some((character) => ["RARE", "EPIC"].includes(character.rarity))) {
    unlockAchievement(userState, "first_pet_draw", unlocked);
  }
  if ((userState.characters || []).filter((character) => character.rarity === "RARE").length >= 2) {
    unlockAchievement(userState, "rare_keeper", unlocked);
  }
  if ((userState.characters || []).some((character) => character.rarity === "EPIC")) {
    unlockAchievement(userState, "epic_keeper", unlocked);
  }
  if ((userState.shares || []).some((share) => Number(share.health || 0) >= 70)) {
    unlockAchievement(userState, "healthy_glow", unlocked);
  }
  if (userState.character?.id === "loki") {
    unlockAchievement(userState, "loki_star", unlocked);
  }
  const hasShared = userState.achievements.find((item) => item.id === "first_brag")?.unlocked;
  const hasReaction = userState.achievements.find((item) => item.id === "friend_reaction")?.unlocked;
  if (hasShared && hasReaction) {
    unlockAchievement(userState, "mutual_circle", unlocked);
  }
  if (unlocked.length > 0) {
    userState.game.mood = `${unlocked[0].title} 업적 달성!`;
  }
  return unlocked;
}

function profileValue(profile, key, fallback) {
  return String(profile?.[key] || fallback).trim() || fallback;
}

function normalizeRoutinePrompt(value) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, 1000);
}

function focusData(profile) {
  const difficulty = profile?.difficulty || "normal";
  const map = {
    algorithm: {
      type: "공부",
      daily: difficulty === "hard" ? "알고리즘 2문제" : "알고리즘 1문제",
      weekly: difficulty === "hard" ? "알고리즘 10문제 누적" : "알고리즘 5문제 누적",
      monthly: "코딩테스트 루틴 성공률 80%",
      note: "문제 풀이 기록 링크 첨부 가능, 기술 +6",
      links: [
        { label: "기록", url: "https://www.notion.so" },
        { label: "GitHub", url: "https://github.com" },
      ],
    },
    dev: {
      type: "개발",
      daily: "프로젝트 커밋 1개",
      weekly: "기능 개선 3개 누적",
      monthly: "포트폴리오 배포 또는 데모 정리",
      note: "GitHub 커밋으로 인증",
      links: [{ label: "GitHub", url: "https://github.com" }],
    },
    fitness: {
      type: "운동",
      daily: difficulty === "easy" ? "가벼운 운동 20분" : "운동 45분",
      weekly: "운동 4회 누적",
      monthly: "운동 루틴 성공률 80%",
      note: "운동 사진 또는 기록으로 인증",
      links: [{ label: "기록", url: "https://fit.google.com" }],
    },
    career: {
      type: "취업",
      daily: "포트폴리오 한 줄 개선",
      weekly: "지원 준비 3회 누적",
      monthly: "이력서/포트폴리오 한 버전 완성",
      note: "Notion 또는 GitHub 링크로 인증",
      links: [
        { label: "Notion", url: "https://www.notion.so" },
        { label: "GitHub", url: "https://github.com" },
      ],
    },
  };
  const area = resolveFocusArea(profile?.focusArea, profile);
  return map[area] || map.algorithm;
}

function mission(id, period, type, title, note, links = [], reward = {}) {
  return {
    id: `${period}-${id}`,
    period,
    type,
    title,
    note,
    action: "요청",
    state: "todo",
    links,
    reward,
  };
}

function dailyRewardForType(type = "공부") {
  if (type === "운동") {
    return { xp: 34, coin: 10, completion: 11, stats: { power: 5, will: 2 }, health: 6 };
  }
  if (type === "건강") {
    return { xp: 28, coin: 8, completion: 9, stats: { power: 3, will: 3 }, health: 7 };
  }
  if (type === "회고") {
    return { xp: 30, coin: 8, completion: 10, stats: { focus: 2, will: 4 } };
  }
  return { xp: 38, coin: 12, completion: 12, stats: { focus: 4, skill: 3 } };
}

function createRoutineDailyMissions(profile, period, count = 4) {
  const focus = focusData(profile);
  const finalGoal = profileValue(profile, "finalGoal", "갓생 루틴 만들기");
  const seeds = [];
  const seen = new Set();
  const candidates = [
    ...routineChunksFromPrompt(profile?.routinePrompt, count + 3),
    focus.daily,
    `${finalGoal.slice(0, 18)} 결과물 정리`,
    `${finalGoal.slice(0, 18)} 오늘 할 일 1개 실행`,
    "오늘 루틴 회고 3줄",
  ];
  for (const candidate of candidates) {
    const clean = String(candidate || "").replace(/\s+/g, " ").trim();
    const key = clean.toLowerCase();
    if (!clean || seen.has(key) || /기상|체크인|알람/i.test(clean)) {
      continue;
    }
    seen.add(key);
    seeds.push(clean);
    if (seeds.length >= count) {
      break;
    }
  }
  while (seeds.length < count) {
    seeds.push(`${finalGoal.slice(0, 12) || "루틴"} 실행 ${seeds.length + 1}`);
  }
  return seeds.slice(0, count).map((seed, index) => {
    const type = inferRoutineType(seed, profile);
    return mission(
      `${period.key}-routine-${index}`,
      "daily",
      type,
      fallbackRoutineTitle(seed, index, finalGoal),
      routineProofNote(seed, profile),
      routineLinks(seed),
      dailyRewardForType(type),
    );
  });
}

function createDailyMissions(profile, period) {
  const wakeTime = profileValue(profile, "wakeTime", "6시 20분");
  return [
    mission(`${period.key}-wake`, "daily", "기상", `${wakeTime} 체크인`, "기상 사진 또는 화면 인증으로 의지 +4, 체력 +1", [{ label: "알람", url: "/api/calendar/wake.ics" }], { xp: 25, coin: 6, completion: 10, stats: { will: 4, power: 1 }, health: 2 }),
    ...createRoutineDailyMissions(profile, period, 4),
  ];
}

function createWeeklyMissions(profile, period) {
  const focus = focusData(profile);
  const isFitness = profile?.focusArea === "fitness";
  return [
    mission(`${period.key}-focus`, "weekly", "주간", focus.weekly, "이번 주 동안 누적 달성 후 사진/링크로 인증", focus.links, isFitness ? { xp: 140, coin: 36, bond: 4, completion: 20, stats: { power: 12, will: 5 }, health: 12 } : { xp: 140, coin: 36, bond: 4, completion: 20 }),
    mission(`${period.key}-health`, "weekly", "건강", "건강 루틴 5일 지키기", "운동, 수면, 식사 기록을 모아 그룹에 인증", [{ label: "기록", url: "https://fit.google.com" }], { xp: 120, coin: 30, bond: 3, completion: 16, stats: { power: 10, will: 6 }, health: 14 }),
    mission(`${period.key}-friend`, "weekly", "우정", "그룹원 인증 2번 확인해주기", "함께한다는 느낌을 살리는 우정 미션", [], { xp: 90, coin: 24, bond: 6, completion: 14 }),
  ];
}

function createMonthlyMissions(profile, period) {
  const focus = focusData(profile);
  const finalGoal = profileValue(profile, "finalGoal", "갓생 루틴 만들기");
  const isFitness = profile?.focusArea === "fitness";
  return [
    mission(`${period.key}-main`, "monthly", "월간", focus.monthly, "월 기준으로 고정되는 큰 보상 미션", focus.links, isFitness ? { xp: 320, coin: 90, bond: 10, completion: 30, stats: { power: 24, will: 10 }, health: 24 } : { xp: 320, coin: 90, bond: 10, completion: 30 }),
    mission(`${period.key}-health`, "monthly", "건강", "건강한 생활 20일 달성", "운동/수면/식사 루틴을 월 기준으로 검증", [{ label: "기록", url: "https://fit.google.com" }], { xp: 280, coin: 80, bond: 8, completion: 24, stats: { power: 22, will: 12 }, health: 26 }),
    mission(`${period.key}-boss`, "monthly", "목표", `${finalGoal.slice(0, 16)} 보스 미션`, "월말에 그룹 검증을 받아 큰 보상 획득", [{ label: "Notion", url: "https://www.notion.so" }], { xp: 420, coin: 120, bond: 14, completion: 40 }),
  ];
}

function makeBucket(periodName, periodInfo, items) {
  return {
    key: periodInfo.key,
    startsAt: periodInfo.startsAt,
    endsAt: periodInfo.endsAt,
    secondsLeft: periodInfo.secondsLeft,
    generatedAt: new Date().toISOString(),
    items,
  };
}

function upsertMission(bucket, template, insertAfterId = "") {
  if (!bucket?.items) {
    return;
  }
  const existing = bucket.items.find((item) => item.id === template.id);
  if (existing) {
    if (existing.customized) {
      return;
    }
    existing.type = template.type;
    existing.title = template.title;
    existing.note = template.note;
    existing.links = template.links;
    existing.reward = template.reward;
    return;
  }

  if (insertAfterId) {
    const index = bucket.items.findIndex((item) => item.id === insertAfterId);
    if (index >= 0) {
      bucket.items.splice(index + 1, 0, template);
      return;
    }
  }
  bucket.items.push(template);
}

function syncHealthyMissionTemplates(userState, periods) {
  const dailyTemplates = createDailyMissions(userState.profile, periods.daily);
  const weeklyTemplates = createWeeklyMissions(userState.profile, periods.weekly);
  const monthlyTemplates = createMonthlyMissions(userState.profile, periods.monthly);

  for (const suffix of ["wake"]) {
    const template = dailyTemplates.find((item) => item.id.endsWith(`-${suffix}`));
    if (template) {
      upsertMission(userState.missions.daily, template);
    }
  }
  const weeklyHealth = weeklyTemplates.find((item) => item.id.endsWith("-health"));
  if (weeklyHealth) {
    upsertMission(userState.missions.weekly, weeklyHealth);
  }
  const monthlyHealth = monthlyTemplates.find((item) => item.id.endsWith("-health"));
  if (monthlyHealth) {
    upsertMission(userState.missions.monthly, monthlyHealth);
  }
}

function isWakeMission(item = {}) {
  return /-wake$/.test(item.id || "") || item.type === "기상";
}

function isProtectedMission(item = {}) {
  return item.customized || ["pending", "edit_pending", "done"].includes(item.state);
}

function mergeMissionRuntime(template, existing = {}) {
  const merged = { ...clone(template) };
  for (const key of ["state", "action", "proofId", "editRequestId", "completedAt", "requestedAt", "approvedBy", "approverName", "autoCompleted", "autoProgress"]) {
    if (existing[key]) {
      merged[key] = existing[key];
    }
  }
  return merged;
}

function syncFlexibleDailyMissionTemplates(userState, periods) {
  const bucket = userState.missions?.daily;
  if (!bucket?.items) {
    return;
  }
  const templates = createDailyMissions(userState.profile, periods.daily);
  const wakeTemplate = templates.find(isWakeMission);
  if (!wakeTemplate) {
    return;
  }
  const existingWake = bucket.items.find(isWakeMission);
  const nextItems = [mergeMissionRuntime(wakeTemplate, existingWake)];
  const seen = new Set(nextItems.map((item) => item.id));
  const addMission = (item) => {
    if (!item || nextItems.length >= 5) {
      return;
    }
    const key = `${item.id || ""}:${item.type || ""}:${item.title || ""}`.toLowerCase();
    if (seen.has(item.id) || seen.has(key)) {
      return;
    }
    seen.add(item.id);
    seen.add(key);
    nextItems.push(item);
  };

  bucket.items
    .filter((item) => !isWakeMission(item) && isProtectedMission(item))
    .forEach(addMission);
  bucket.items
    .filter((item) => !isWakeMission(item) && !isProtectedMission(item) && item.source)
    .forEach(addMission);
  templates
    .filter((item) => !isWakeMission(item))
    .forEach((template) => {
      const existing = bucket.items.find((item) => item.id === template.id);
      addMission(mergeMissionRuntime(template, existing));
    });

  bucket.items = nextItems.slice(0, 5);
  userState.quests = bucket.items;
}

function createMissions(profile, periods = periodSnapshot()) {
  return {
    daily: makeBucket("daily", periods.daily, createDailyMissions(profile, periods.daily)),
    weekly: makeBucket("weekly", periods.weekly, createWeeklyMissions(profile, periods.weekly)),
    monthly: makeBucket("monthly", periods.monthly, createMonthlyMissions(profile, periods.monthly)),
  };
}

function syncTemptationLog(userState, weekKey) {
  const previous = userState.game?.temptations;
  const sameWeek = previous?.key === weekKey;
  const previousCounts = sameWeek ? previous.counts || {} : {};
  const limits = normalizeTemptationLimits(userState.profile?.temptationLimits || userState.profile);
  userState.game.temptations = {
    key: weekKey,
    counts: {
      party: clampInt(Number(previousCounts.party || 0) + Number(previousCounts.drink || 0), 0, 0, 99),
      game: clampInt(previousCounts.game, 0, 0, 99),
    },
    limits,
  };
  userState.profile.temptationLimits = limits;
  return userState.game.temptations;
}

function markMissionDirty(userState = {}) {
  Object.defineProperty(userState, "__missionDirty", {
    value: true,
    writable: true,
    configurable: true,
    enumerable: false,
  });
}

function consumeMissionDirty(userState = {}) {
  const dirty = Boolean(userState.__missionDirty);
  delete userState.__missionDirty;
  return dirty;
}

function ensureMissionStats(userState = {}) {
  const raw = userState.missionStats && typeof userState.missionStats === "object" ? userState.missionStats : {};
  const daily = raw.daily && typeof raw.daily === "object" ? raw.daily : {};
  const entries = Object.entries(daily)
    .filter(([key]) => /^\d{4}-\d{2}-\d{2}$/.test(key))
    .sort(([left], [right]) => left.localeCompare(right))
    .slice(-100);
  userState.missionStats = {
    daily: Object.fromEntries(entries.map(([key, value]) => {
      const completedIds = Array.isArray(value.completedIds)
        ? value.completedIds.map((id) => String(id || "").slice(0, 100)).filter(Boolean).slice(0, 12)
        : [];
      const total = Math.max(0, Math.floor(Number(value.total || 0)));
      const done = Math.max(0, Math.min(total || 99, Math.floor(Number(value.done || completedIds.length || 0))));
      return [key, {
        key,
        total,
        done,
        completedIds,
        perfect: Boolean(value.perfect || (total > 0 && done >= total)),
        updatedAt: Number.isFinite(Date.parse(value.updatedAt || "")) ? value.updatedAt : "",
      }];
    })),
  };
  return userState.missionStats;
}

function recordDailyMissionStats(userState = {}, dailyBucket = null) {
  const bucket = dailyBucket || userState.missions?.daily;
  if (!bucket?.key || !Array.isArray(bucket.items)) {
    ensureMissionStats(userState);
    return null;
  }
  const stats = ensureMissionStats(userState);
  const items = bucket.items;
  const completedIds = items
    .filter((item) => item.state === "done")
    .map((item) => String(item.id || "").slice(0, 100))
    .filter(Boolean);
  const total = items.length;
  const done = completedIds.length;
  const record = {
    key: bucket.key,
    total,
    done,
    completedIds,
    perfect: total > 0 && done >= total,
    updatedAt: new Date().toISOString(),
  };
  stats.daily[bucket.key] = record;
  ensureMissionStats(userState);
  return record;
}

function dailyMissionStatsForPeriod(userState = {}, periodName = "weekly", periodInfo = {}) {
  const stats = ensureMissionStats(userState);
  const records = Object.values(stats.daily || {}).filter((record) => {
    if (periodName === "monthly") {
      return String(record.key || "").startsWith(`${periodInfo.key || ""}-`);
    }
    const startKey = String(periodInfo.key || "");
    const endKey = dateKeyAddDays(startKey, 6);
    return Boolean(startKey && endKey && record.key >= startKey && record.key <= endKey);
  });
  return records.reduce((summary, record) => {
    summary.done += Math.max(0, Math.floor(Number(record.done || 0)));
    summary.total += Math.max(0, Math.floor(Number(record.total || 0)));
    summary.days += record.done > 0 ? 1 : 0;
    summary.perfectDays += record.perfect ? 1 : 0;
    return summary;
  }, { done: 0, total: 0, days: 0, perfectDays: 0 });
}

function autoCompletePeriodMissions(userState = {}, periodName = "weekly", bucket = null, periodInfo = {}) {
  if (!bucket?.items?.length) {
    return [];
  }
  const targets = periodName === "monthly" ? monthlyAutoDailyTargets : weeklyAutoDailyTargets;
  const stats = dailyMissionStatsForPeriod(userState, periodName, periodInfo);
  const completed = [];
  for (let index = 0; index < bucket.items.length; index += 1) {
    const item = bucket.items[index];
    const target = targets[index] || targets[targets.length - 1] || 1;
    item.autoProgress = {
      source: "daily",
      done: Math.min(stats.done, target),
      target,
      days: stats.days,
      perfectDays: stats.perfectDays,
    };
    if (item.state === "done" || stats.done < target) {
      continue;
    }
    const completedAt = new Date().toISOString();
    item.state = "done";
    item.action = "완료";
    item.proofId = "";
    item.requestedAt = "";
    item.completedAt = completedAt;
    item.approvedBy = "daily-auto";
    item.approverName = "일일 누적";
    item.autoCompleted = true;
    const reward = rewardForMission(item, periodName);
    addReward(userState, reward);
    completed.push({ item, reward });
    userState.game.lastCompletedMission = {
      id: item.id,
      title: item.title,
      type: item.type,
      period: periodName,
      completedAt,
    };
  }
  if (completed.length > 0) {
    const label = periodName === "monthly" ? "월간" : "주간";
    userState.game.mood = `${label} 미션이 일일 인증 누적으로 완료됐어요.`;
  }
  return completed;
}

function dailyConditionDecayForRecord(userState = {}, previousKey = "") {
  const stats = ensureMissionStats(userState);
  const record = stats.daily?.[previousKey] || null;
  if (!record || Math.max(0, Math.floor(Number(record.total || 0))) === 0) {
    return { amount: 0, reasons: [], record };
  }

  const total = Math.max(0, Math.floor(Number(record.total || 0)));
  const done = Math.max(0, Math.min(total, Math.floor(Number(record.done || 0))));
  const reasons = [];
  let amount = 0;

  if (done <= 0) {
    amount += 8;
    reasons.push("일일 미션 미완료");
  } else if (done < total) {
    amount += 3;
    reasons.push("일일 미션 일부 미완료");
  }

  const attendance = normalizeAttendance(userState.game || {});
  if (attendance.lastKey !== previousKey) {
    amount += 5;
    reasons.push("출석 보상 미수령");
  }

  return { amount: Math.min(15, amount), reasons, record };
}

function applyDailyConditionDecay(userState = {}, periods = periodSnapshot()) {
  userState.game = normalizeGrowth(userState.game || {});
  const decay = normalizeConditionDecay(userState.game);
  const todayKey = String(periods.daily?.key || "");
  if (!todayKey || decay.key === todayKey) {
    return false;
  }

  const previousKey = previousDailyKey(todayKey);
  const before = Math.min(100, Math.max(0, Math.round(Number(userState.game.health ?? 50))));
  if (!previousKey || !userState.profile?.completed) {
    userState.game.conditionDecay = {
      key: todayKey,
      previousKey,
      amount: 0,
      reasons: [],
      appliedAt: new Date().toISOString(),
      healthBefore: before,
      healthAfter: before,
    };
    return true;
  }

  const { amount, reasons } = dailyConditionDecayForRecord(userState, previousKey);
  const healthAfter = Math.max(0, before - amount);
  userState.game.conditionDecay = {
    key: todayKey,
    previousKey,
    amount,
    reasons,
    appliedAt: new Date().toISOString(),
    healthBefore: before,
    healthAfter,
  };

  if (amount > 0) {
    userState.game.health = healthAfter;
    userState.game.mood = `어제 ${reasons.join(" · ")}. 컨디션 -${amount}`;
  }
  return true;
}

function syncMissions(userState) {
  const periods = periodSnapshot();
  let changed = false;
  userState.profile ||= defaultProfile();
  userState.missions ||= {};

  if (!userState.missions.daily || userState.missions.daily.key !== periods.daily.key) {
    recordDailyMissionStats(userState, userState.missions.daily);
    userState.missions.daily = makeBucket("daily", periods.daily, createDailyMissions(userState.profile, periods.daily));
    changed = true;
  } else {
    userState.missions.daily.secondsLeft = periods.daily.secondsLeft;
    userState.missions.daily.endsAt = periods.daily.endsAt;
  }

  if (!userState.missions.weekly || userState.missions.weekly.key !== periods.weekly.key) {
    userState.missions.weekly = makeBucket("weekly", periods.weekly, createWeeklyMissions(userState.profile, periods.weekly));
    changed = true;
  } else {
    userState.missions.weekly.secondsLeft = periods.weekly.secondsLeft;
    userState.missions.weekly.endsAt = periods.weekly.endsAt;
  }

  if (!userState.missions.monthly || userState.missions.monthly.key !== periods.monthly.key) {
    userState.missions.monthly = makeBucket("monthly", periods.monthly, createMonthlyMissions(userState.profile, periods.monthly));
    changed = true;
  } else {
    userState.missions.monthly.secondsLeft = periods.monthly.secondsLeft;
    userState.missions.monthly.endsAt = periods.monthly.endsAt;
  }

  userState.quests = userState.missions.daily.items;
  userState.serverTime = periods;
  syncHealthyMissionTemplates(userState, periods);
  syncFlexibleDailyMissionTemplates(userState, periods);
  syncTemptationLog(userState, periods.weekly.key);
  refreshDailyProgress(userState);
  recordDailyMissionStats(userState, userState.missions.daily);
  const autoWeekly = autoCompletePeriodMissions(userState, "weekly", userState.missions.weekly, periods.weekly);
  const autoMonthly = autoCompletePeriodMissions(userState, "monthly", userState.missions.monthly, periods.monthly);
  const conditionChanged = applyDailyConditionDecay(userState, periods);
  if (changed || autoWeekly.length > 0 || autoMonthly.length > 0 || conditionChanged) {
    markMissionDirty(userState);
  }
  return changed;
}

function refreshDailyProgress(userState) {
  const dailyItems = userState.missions?.daily?.items || [];
  if (dailyItems.length === 0) {
    return;
  }
  const doneCount = dailyItems.filter((item) => item.state === "done").length;
  userState.game = normalizeGrowth(userState.game || {});
  userState.game.weeklyLeft = Math.max(0, dailyItems.length - doneCount);
}

function updateDailyStreak(userState) {
  const daily = userState.missions?.daily;
  if (!daily?.key || !Array.isArray(daily.items) || daily.items.length === 0) {
    return false;
  }
  if (daily.items.some((item) => item.state !== "done")) {
    return false;
  }
  if (userState.game.lastStreakDailyKey === daily.key) {
    return false;
  }
  const previousKey = userState.game.lastStreakDailyKey;
  const yesterday = new Date(Date.parse(`${daily.key}T00:00:00.000Z`) - 24 * 60 * 60 * 1000);
  const expectedPreviousKey = dateKeyFromUtcDate(yesterday);
  userState.game.streak = previousKey === expectedPreviousKey ? userState.game.streak + 1 : 1;
  userState.game.lastStreakDailyKey = daily.key;
  if (userState.game.streak > 1) {
    userState.game.coin += Math.min(30, userState.game.streak * 2);
    userState.game.mood = `${userState.game.streak}일 연속 성공 보너스!`;
  }
  return true;
}

function createUserState(userId) {
  const character = normalizeCharacterProgress("tori");

  const userState = {
    userId,
    resetAt: typeof store === "object" ? store.resetAt || "" : "",
    profile: defaultProfile(),
    character,
    characters: [character],
    game: initialGameState(),
    messages: [],
    proofs: [],
    shares: [],
    rooms: [],
    activeRoomId: "",
    room: null,
    achievements: defaultAchievements(),
    friendRewards: normalizeFriendRewards(),
    inventory: [],
    accessories: [],
    equippedAccessories: {},
    equippedAccessory: "",
    petPalette: "",
    gacha: { cost: gachaCost, lastDraw: null },
    petGacha: { cost: petGachaCost, lastDraw: null },
  };
  syncMissions(userState);
  return userState;
}

function sanitizeMessages(messages = [], userState = {}) {
  if (!Array.isArray(messages)) {
    return [];
  }
  const myName = String(userState.profile?.nickname || "").trim();
  return messages
    .filter((message) => message && typeof message === "object")
    .map((message) => {
      const currentName = String(message.name || "").trim();
      if (currentName === "민지") {
        return {
          ...message,
          name: message.mine ? (myName || "나") : "검증 파트너",
        };
      }
      return {
        ...message,
        name: currentName || (message.mine ? "나" : "그룹원"),
      };
    })
    .slice(-30);
}

function createStore() {
  return {
    version: 4,
    resetAt: "",
    users: {},
    rooms: {},
    admin: {
      hiddenEvolutions: Object.fromEntries(
        characterPool.map((character) => [
          character.id,
          {
            adultName: character.adminOnlyAdult,
            rarity: character.rarity,
            note: "사용자 화면에는 진화 스포일러를 노출하지 않습니다.",
          },
        ]),
      ),
    },
  };
}

function ensureDataDir() {
  if (!localFilePersistence) {
    return;
  }
  fs.mkdirSync(dataDir, { recursive: true });
}

function saveStore() {
  if (!localFilePersistence) {
    return;
  }
  ensureDataDir();
  fs.writeFileSync(stateFile, JSON.stringify(store, null, 2), "utf8");
}

function loadStore() {
  if (!localFilePersistence) {
    return createStore();
  }
  ensureDataDir();
  if (!fs.existsSync(stateFile)) {
    return createStore();
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(stateFile, "utf8"));
    if (!parsed?.users) {
      return createStore();
    }
    parsed.version = 4;
    parsed.resetAt ||= "";
    parsed.rooms ||= {};
    parsed.admin ||= createStore().admin;
    return parsed;
  } catch {
    return createStore();
  }
}

let store = loadStore();
const remoteUserLoadedAt = new Map();
const remoteRoomLoadedAt = new Map();
const approvalLocks = new Set();
let supabaseRoomTableAvailable = true;
let remoteResetLoadedAt = 0;

function isCurrentResetState(state) {
  const stateResetAt = String(state?.resetAt || "");
  return !store.resetAt || !stateResetAt || stateResetAt === store.resetAt;
}

function supabaseHeaders(extra = {}) {
  return {
    apikey: supabaseServerKey,
    Authorization: `Bearer ${supabaseServerKey}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function supabaseRestUrl(pathname, query = "") {
  const safePath = pathname.split("/").map(encodeURIComponent).join("/");
  return `${supabaseUrl}/rest/v1/${safePath}${query}`;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

function isMissingSupabaseTable(response, detail = "", tableName = "") {
  return response.status === 404 && (
    detail.includes(tableName)
    || detail.includes("schema cache")
    || detail.includes("Could not find the table")
  );
}

function roomRegistryUserId(roomId) {
  const safeRoomId = String(roomId || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48);
  return `${roomRegistryUserPrefix}${safeRoomId}`;
}

function isFreshRemoteUser(userId) {
  return Date.now() - Number(remoteUserLoadedAt.get(userId) || 0) < remoteUserCacheMs;
}

function markRemoteUserFresh(userId) {
  if (userId) {
    remoteUserLoadedAt.set(userId, Date.now());
  }
}

function isFreshRemoteRoom(roomId) {
  return Date.now() - Number(remoteRoomLoadedAt.get(roomId) || 0) < remoteRoomCacheMs;
}

function markRemoteRoomFresh(roomId) {
  if (roomId) {
    remoteRoomLoadedAt.set(roomId, Date.now());
  }
}

async function loadGlobalResetFromSupabase() {
  if (!supabaseEnabled || !globalResetEnabled) {
    return "";
  }
  const query = `?user_id=eq.${encodeURIComponent(globalResetUserId)}&select=state&limit=1`;
  try {
    const response = await fetchWithTimeout(supabaseRestUrl(supabaseStateTable, query), {
      headers: supabaseHeaders(),
    }, supabaseFetchTimeoutMs);
    if (!response.ok) {
      return "";
    }
    const rows = await response.json();
    return String(rows?.[0]?.state?.resetAt || "");
  } catch {
    return "";
  }
}

async function syncGlobalResetFromSupabase(options = {}) {
  if (!supabaseEnabled || !globalResetEnabled) {
    return;
  }
  const now = Date.now();
  if (!options.force && now - remoteResetLoadedAt < remoteResetCacheMs) {
    return;
  }
  remoteResetLoadedAt = now;
  const resetAt = await loadGlobalResetFromSupabase();
  if (!resetAt || resetAt === store.resetAt) {
    return;
  }
  store.resetAt = resetAt;
  store.users = {};
  store.rooms = {};
  remoteUserLoadedAt.clear();
  remoteRoomLoadedAt.clear();
  saveStore();
}

function roomRegistryState(room) {
  const normalized = normalizeRoom(room);
  return {
    kind: "room_registry",
    roomId: normalized.id,
    roomCode: normalized.code,
    room: normalized,
    updatedAt: new Date().toISOString(),
  };
}

async function loadUserStateFromSupabase(userId) {
  if (!supabaseEnabled) {
    return null;
  }
  const query = `?user_id=eq.${encodeURIComponent(userId)}&select=state`;
  let response;
  try {
    response = await fetchWithTimeout(supabaseRestUrl(supabaseStateTable, query), {
      headers: supabaseHeaders(),
    }, supabaseFetchTimeoutMs);
  } catch (error) {
    console.warn(`Supabase load skipped: ${error.message}`);
    return null;
  }
  if (!response.ok) {
    const detail = await response.text();
    console.warn(`Supabase load failed: ${response.status} ${detail}`);
    return null;
  }
  const rows = await response.json();
  return rows?.[0]?.state || null;
}

async function loadUserStateByNicknameFromSupabase(nickname, excludedUserId = "") {
  const safeNickname = String(nickname || "").trim();
  if (!supabaseEnabled || !safeNickname) {
    return null;
  }

  const params = new URLSearchParams();
  params.set("select", "user_id,state,updated_at");
  params.set("state->profile->>nickname", `eq.${safeNickname}`);
  params.set("order", "updated_at.desc");
  params.set("limit", "10");

  try {
    const response = await fetchWithTimeout(supabaseRestUrl(supabaseStateTable, `?${params.toString()}`), {
      headers: supabaseHeaders(),
    }, supabaseFetchTimeoutMs);
    if (!response.ok) {
      const detail = await response.text();
      console.warn(`Supabase nickname lookup failed: ${response.status} ${detail}`);
      return null;
    }

    const needle = normalizeNickname(safeNickname);
    const rows = await response.json();
    const match = rows.find((row) => (
      row.user_id !== excludedUserId
      && isCurrentResetState(row.state)
      && normalizeNickname(row.state?.profile?.nickname) === needle
    ));
    return match?.state || null;
  } catch (error) {
    console.warn(`Supabase nickname lookup failed: ${error.message}`);
    return null;
  }
}

async function loadRecentRoomRegistriesFromSupabase(limit = 50) {
  if (!supabaseEnabled) {
    return [];
  }

  const params = new URLSearchParams();
  params.set("select", "state,updated_at");
  params.set("state->>kind", "eq.room_registry");
  params.set("order", "updated_at.desc");
  params.set("limit", String(Math.max(1, Math.min(100, limit))));

  try {
    const response = await fetchWithTimeout(supabaseRestUrl(supabaseStateTable, `?${params.toString()}`), {
      headers: supabaseHeaders(),
    }, supabaseFetchTimeoutMs);
    if (!response.ok) {
      const detail = await response.text();
      console.warn(`Supabase room registry scan failed: ${response.status} ${detail}`);
      return [];
    }
    const rows = await response.json();
    return rows
      .map((row) => row.state?.room)
      .filter((room) => room && isCurrentResetState(room))
      .map((room) => normalizeRoom(room));
  } catch (error) {
    console.warn(`Supabase room registry scan skipped: ${error.message}`);
    return [];
  }
}

function roomReference(room = {}) {
  if (!room?.id) {
    return null;
  }
  return {
    id: String(room.id || ""),
    resetAt: String(room.resetAt || ""),
    code: String(room.code || ""),
    hostUserId: String(room.hostUserId || ""),
    name: String(room.name || "").trim().slice(0, 20),
    goal: String(room.goal || "").trim().slice(0, 120),
    capacity: clampInt(room.capacity, 4, 2, 8),
    proofMode: ["photo", "check", "hybrid"].includes(room.proofMode) ? room.proofMode : "photo",
    status: room.status === "closed" ? "closed" : "open",
    createdAt: room.createdAt || "",
    closedAt: room.closedAt || "",
    memberCount: Array.isArray(room.members) ? room.members.length : Math.max(0, Number(room.memberCount || 0)),
    updatedAt: room.updatedAt || room.createdAt || "",
  };
}

function compactRoomHistory(activeRoom, rooms = []) {
  const seen = new Set();
  return [activeRoom, ...(Array.isArray(rooms) ? rooms : [])]
    .map(roomReference)
    .filter((room) => {
      if (!room?.id || seen.has(room.id)) {
        return false;
      }
      seen.add(room.id);
      return true;
    })
    .slice(0, 8);
}

function compactUserStateForStorage(userState = {}) {
  const compact = clone(userState);
  compact.room = roomReference(compact.room);
  compact.rooms = compactRoomHistory(compact.room, compact.rooms);
  compact.proofs = compactProofList(compact.proofs, { maxItems: maxUserProofs, maxPhotos: maxUserProofPhotos });
  return compact;
}

async function findUserStateFromRoomMemberByNickname(nickname) {
  const needle = normalizeNickname(nickname);
  if (!needle) {
    return null;
  }

  const localRooms = Object.values(store.rooms || {})
    .filter((room) => room && isCurrentResetState(room))
    .map((room) => normalizeRoom(room));
  const remoteRooms = await loadRecentRoomRegistriesFromSupabase();
  const seenRoomIds = new Set();
  const rooms = [...remoteRooms, ...localRooms].filter((room) => {
    if (!room?.id || seenRoomIds.has(room.id)) {
      return false;
    }
    seenRoomIds.add(room.id);
    return room.status !== "closed";
  });

  for (const room of rooms) {
    const member = (room.members || []).find((item) => normalizeNickname(item.name) === needle);
    if (!member) {
      continue;
    }
    const recoveredUserId = member.userId || nicknameToUserId(member.name || nickname);
    const memberState = recoveredUserId ? await getUserStateById(recoveredUserId) : createUserState(nicknameToUserId(nickname));
    const recoveredState = clone(memberState || createUserState(recoveredUserId));
    recoveredState.userId = recoveredUserId || recoveredState.userId;
    recoveredState.profile ||= defaultProfile();
    recoveredState.profile.nickname = String(member.name || nickname).trim().slice(0, 12);
    recoveredState.activeRoomId = room.id;
    hydrateUserStateFromMemberSnapshot(recoveredState, member, room);
    normalizeUserState(recoveredState, recoveredState.userId);
    attachRoomToUserState(recoveredState, room);
    return recoveredState;
  }

  return null;
}

async function findUserStateByNickname(nickname, excludedUserId = "") {
  const needle = normalizeNickname(nickname);
  if (!needle) {
    return null;
  }

  const localMatch = Object.values(store.users || {}).find((candidate) => (
    candidate?.userId !== excludedUserId
    && isCurrentResetState(candidate)
    && normalizeNickname(candidate.profile.nickname) === needle
  ));
  if (localMatch?.profile?.completed) {
    return clone(localMatch);
  }

  const remoteMatch = await loadUserStateByNicknameFromSupabase(nickname, excludedUserId);
  if (remoteMatch?.profile?.completed) {
    return clone(remoteMatch);
  }

  const roomRecoveredMatch = await findUserStateFromRoomMemberByNickname(nickname);
  if (roomRecoveredMatch?.profile?.completed) {
    return clone(roomRecoveredMatch);
  }
  return clone(localMatch || remoteMatch || roomRecoveredMatch || null);
}

async function saveUserStateToSupabase(userState) {
  if (!supabaseEnabled || !userState?.userId) {
    return;
  }
  const storedState = compactUserStateForStorage(userState);
  let response;
  try {
    response = await fetchWithTimeout(supabaseRestUrl(supabaseStateTable), {
      method: "POST",
      headers: supabaseHeaders({ Prefer: "resolution=merge-duplicates" }),
      body: JSON.stringify({
        user_id: storedState.userId,
        state: storedState,
        updated_at: new Date().toISOString(),
      }),
    }, supabaseFetchTimeoutMs);
  } catch (error) {
    console.warn(`Supabase save skipped: ${error.message}`);
    return;
  }
  if (!response.ok) {
    const detail = await response.text();
    console.warn(`Supabase save failed: ${response.status} ${detail}`);
  }
}

async function loadRoomRegistryFromSupabase(field, value) {
  if (!supabaseEnabled || !value) {
    return null;
  }

  const params = new URLSearchParams();
  params.set("select", "state,updated_at");
  params.set(field === "code" ? "state->>roomCode" : "state->>roomId", `eq.${String(value)}`);
  params.set("order", "updated_at.desc");
  params.set("limit", "1");

  let response;
  try {
    response = await fetchWithTimeout(supabaseRestUrl(supabaseStateTable, `?${params.toString()}`), {
      headers: supabaseHeaders(),
    }, supabaseFetchTimeoutMs);
  } catch (error) {
    console.warn(`Supabase room registry load skipped: ${error.message}`);
    return null;
  }
  if (!response.ok) {
    const detail = await response.text();
    console.warn(`Supabase room registry load failed: ${response.status} ${detail}`);
    return null;
  }

  const rows = await response.json();
  const room = rows?.[0]?.state?.room || null;
  if (!room || !isCurrentResetState(room)) {
    return null;
  }
  return normalizeRoom(room);
}

async function saveRoomRegistryToSupabase(room) {
  if (!supabaseEnabled || !room?.id) {
    return;
  }
  const registryState = roomRegistryState(room);
  let response;
  try {
    response = await fetchWithTimeout(supabaseRestUrl(supabaseStateTable), {
      method: "POST",
      headers: supabaseHeaders({ Prefer: "resolution=merge-duplicates" }),
      body: JSON.stringify({
        user_id: roomRegistryUserId(registryState.roomId),
        state: registryState,
        updated_at: registryState.updatedAt,
      }),
    }, supabaseFetchTimeoutMs);
  } catch (error) {
    console.warn(`Supabase room registry save skipped: ${error.message}`);
    return;
  }
  if (!response.ok) {
    const detail = await response.text();
    console.warn(`Supabase room registry save failed: ${response.status} ${detail}`);
  }
}

async function loadRoomFromSupabase(field, value) {
  if (!supabaseEnabled || !value) {
    return null;
  }
  if (!supabaseRoomTableAvailable) {
    return loadRoomRegistryFromSupabase(field, value);
  }
  const safeField = field === "code" ? "code" : "room_id";
  const query = `?${safeField}=eq.${encodeURIComponent(value)}&select=room&limit=1`;
  let response;
  try {
    response = await fetchWithTimeout(supabaseRestUrl(supabaseRoomTable, query), {
      headers: supabaseHeaders(),
    }, supabaseFetchTimeoutMs);
  } catch (error) {
    console.warn(`Supabase room load skipped: ${error.message}`);
    return legacyRoomRegistryEnabled ? loadRoomRegistryFromSupabase(field, value) : null;
  }
  if (!response.ok) {
    const detail = await response.text();
    if (isMissingSupabaseTable(response, detail, supabaseRoomTable)) {
      supabaseRoomTableAvailable = false;
      console.warn(`Supabase room table "${supabaseRoomTable}" is not ready yet. Falling back to room registry.`);
      return loadRoomRegistryFromSupabase(field, value);
    }
    throw new Error(`Supabase room load failed: ${response.status} ${detail}`);
  }
  const rows = await response.json();
  if (rows?.[0]?.room) {
    return isCurrentResetState(rows[0].room) ? rows[0].room : null;
  }
  return legacyRoomRegistryEnabled ? loadRoomRegistryFromSupabase(field, value) : null;
}

async function saveRoomToSupabase(room) {
  if (!supabaseEnabled || !room?.id) {
    return;
  }
  if (!supabaseRoomTableAvailable) {
    await saveRoomRegistryToSupabase(room);
    return;
  }
  let response;
  try {
    response = await fetchWithTimeout(supabaseRestUrl(supabaseRoomTable), {
      method: "POST",
      headers: supabaseHeaders({ Prefer: "resolution=merge-duplicates" }),
      body: JSON.stringify({
        room_id: room.id,
        code: room.code,
        room,
        updated_at: new Date().toISOString(),
      }),
    }, supabaseFetchTimeoutMs);
  } catch (error) {
    console.warn(`Supabase room save skipped: ${error.message}`);
    await saveRoomRegistryToSupabase(room);
    return;
  }
  if (!response.ok) {
    const detail = await response.text();
    if (isMissingSupabaseTable(response, detail, supabaseRoomTable)) {
      supabaseRoomTableAvailable = false;
      console.warn(`Supabase room table "${supabaseRoomTable}" is not ready yet. Saving room through user_states registry.`);
      await saveRoomRegistryToSupabase(room);
      return;
    }
    throw new Error(`Supabase room save failed: ${response.status} ${detail}`);
  }
  if (mirrorRoomRegistry) {
    await saveRoomRegistryToSupabase(room);
  }
}

async function persistRoom(room) {
  if (!room?.id) {
    return null;
  }
  const normalized = normalizeRoom(room);
  if (!isCurrentResetState(normalized)) {
    return null;
  }
  store.rooms ||= {};
  store.rooms[normalized.id] = normalized;
  saveStore();
  await saveRoomToSupabase(normalized);
  markRemoteRoomFresh(normalized.id);
  return normalized;
}

async function findGlobalRoomById(roomId, options = {}) {
  if (!roomId) {
    return null;
  }
  const forceRemote = Boolean(options.forceRemote);
  store.rooms ||= {};
  if (store.rooms[roomId] && !isCurrentResetState(store.rooms[roomId])) {
    delete store.rooms[roomId];
  }
  if (!forceRemote && store.rooms[roomId] && isFreshRemoteRoom(roomId)) {
    return normalizeRoom(store.rooms[roomId]);
  }
  const remoteRoom = await loadRoomFromSupabase("room_id", roomId);
  if (remoteRoom) {
    store.rooms[remoteRoom.id] = normalizeRoom(remoteRoom);
    saveStore();
    markRemoteRoomFresh(remoteRoom.id);
    return store.rooms[remoteRoom.id];
  }
  if (store.rooms[roomId] && isCurrentResetState(store.rooms[roomId])) {
    return normalizeRoom(store.rooms[roomId]);
  }
  return null;
}

async function findGlobalRoomByCode(code) {
  const safeCode = String(code || "").replace(/[^A-Z0-9]/gi, "").toUpperCase();
  if (!safeCode) {
    return null;
  }
  store.rooms ||= {};
  const localRoom = Object.values(store.rooms).find((room) => (
    isCurrentResetState(room)
    &&
    String(room.code || "").toUpperCase() === safeCode && room.status !== "closed"
  ));
  if (localRoom && isFreshRemoteRoom(localRoom.id)) {
    return normalizeRoom(localRoom);
  }
  const remoteRoom = await loadRoomFromSupabase("code", safeCode);
  if (remoteRoom) {
    store.rooms[remoteRoom.id] = normalizeRoom(remoteRoom);
    saveStore();
    markRemoteRoomFresh(remoteRoom.id);
    return store.rooms[remoteRoom.id];
  }
  if (localRoom) {
    return normalizeRoom(localRoom);
  }
  return null;
}

async function persistUserState(userState, options = {}) {
  let roomPersistPromise = null;
  if (userState?.userId) {
    userState.resetAt = store.resetAt || userState.resetAt || "";
    evaluateAchievements(userState);
    if (userState.activeRoomId && options.syncRoom !== false) {
      const activeRoom = await findGlobalRoomById(userState.activeRoomId);
      if (activeRoom && activeRoom.status !== "closed" && updateRoomMemberSnapshot(activeRoom, userState)) {
        attachRoomToUserState(userState, activeRoom);
        roomPersistPromise = persistRoom(activeRoom);
      }
    }
    store.users[userState.userId] = userState;
  }
  saveStore();
  await Promise.all([
    saveUserStateToSupabase(userState),
    roomPersistPromise,
  ].filter(Boolean));
  markRemoteUserFresh(userState?.userId);
}

function getUserId(request) {
  const header = request.headers["x-user-id"];
  const raw = Array.isArray(header) ? header[0] : header;
  const userId = String(raw || "guest").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
  return userId || "guest";
}

function normalizeUserState(userState, userId) {
  userState.userId ||= userId;
  userState.resetAt = store.resetAt || userState.resetAt || "";
  userState.profile ||= defaultProfile();
  userState.profile.routineDraft = normalizeRoutinePrompt(userState.profile.routineDraft);
  userState.profile.routinePrompt = normalizeRoutinePrompt(userState.profile.routinePrompt);
  userState.profile.loginToken = normalizeLoginToken(userState.profile.loginToken);
  userState.profile.focusArea = resolveFocusArea(userState.profile.focusArea, userState.profile);
  userState.profile.theme = validThemes.has(userState.profile.theme) ? userState.profile.theme : "default";
  userState.profile.temptationLimits = normalizeTemptationLimits(userState.profile.temptationLimits || userState.profile);
  userState.character ||= (() => {
    return publicCharacter(characterById("tori"));
  })();
  const currentCharacter = characterPool.find((item) => item.id === userState.character.id);
  if (currentCharacter) {
    userState.profile.petName = normalizeCharacterName(currentCharacter.id, userState.profile.petName || userState.character.name, currentCharacter.name);
    userState.character.name = userState.profile.petName;
    userState.character.species = currentCharacter.species;
    userState.character.rarity = currentCharacter.rarity;
    userState.character.rarityLabel = currentCharacter.rarityLabel;
    userState.character.accent = currentCharacter.accent;
    userState.character.description = currentCharacter.description;
    userState.profile.starterId ||= currentCharacter.id;
  }
  userState.game ||= createUserState(userId).game;
  if (userState.game.growthVersion !== 1) {
    resetGrowthToLevelOne(userState.game);
  }
  userState.game.penalty ??= 0;
  userState.game.penaltyReason ??= "";
  userState.game.temptations ||= defaultTemptationLog();
  normalizeGrowth(userState.game);
  ensureStarterCoin(userState);
  userState.petPalette = normalizePetPaletteId(userState.petPalette);
  normalizeCharacterCollection(userState);
  syncGameProgressFromCharacter(userState);
  userState.messages ||= [];
  userState.messages = sanitizeMessages(userState.messages, userState);
  userState.proofs = compactProofList(userState.proofs || [], { maxItems: maxUserProofs, maxPhotos: maxUserProofPhotos });
  userState.shares ||= [];
  userState.notifications = normalizeNotificationSettings(userState.notifications || {});
  const hostName = userState.profile?.nickname || "나";
  userState.rooms = Array.isArray(userState.rooms) ? userState.rooms.map((room) => normalizeRoom(room, hostName)) : [];
  if (userState.room && !userState.rooms.some((room) => room.id === userState.room.id)) {
    userState.rooms.unshift(normalizeRoom(userState.room, hostName));
  }
  userState.activeRoomId ||= userState.rooms.find((room) => room.status !== "closed")?.id || "";
  const activeRoom = userState.rooms.find((room) => room.id === userState.activeRoomId && room.status !== "closed") || null;
  userState.room = activeRoom;
  userState.achievements = normalizeAchievements(userState.achievements || []);
  userState.friendRewards = normalizeFriendRewards(userState.friendRewards || userState.game?.friendRewards || {});
  userState.inventory ||= [];
  userState.inventory = userState.inventory.map(normalizeInventoryItem);
  userState.accessories ||= [];
  userState.accessories = userState.accessories
    .filter((accessory) => accessoryById(accessory.id))
    .map((accessory) => ({ ...accessoryById(accessory.id), ...accessory }));
  normalizeEquippedAccessories(userState);
  syncGachaOdds(userState);
  userState.petGacha ||= { cost: petGachaCost, lastDraw: null };
  userState.petGacha.cost = petGachaCost;
  evaluateAchievements(userState);
  syncMissions(userState);
  return userState;
}

function attachRoomToUserState(userState, room) {
  if (!room || room.status === "closed" || !isCurrentResetState(room)) {
    userState.room = null;
    userState.activeRoomId = "";
    return;
  }
  userState.room = normalizeRoom(room, userState.profile?.nickname || "나");
  userState.activeRoomId = userState.room.id;
  userState.rooms ||= [];
  const roomIndex = userState.rooms.findIndex((item) => item.id === userState.room.id);
  const summary = roomReference(userState.room);
  if (roomIndex >= 0) {
    userState.rooms[roomIndex] = summary;
  } else {
    userState.rooms.unshift(summary);
  }
  userState.rooms = compactRoomHistory(summary, userState.rooms);
}

function proofMatchesPendingMission(userState = {}, proof = {}, roomId = "") {
  const proofId = String(proof.id || "");
  if (!proofId || proof.status === "approved") {
    return false;
  }
  const ownerId = String(userState.userId || "");
  if (proof.userId && ownerId && proof.userId !== ownerId) {
    return false;
  }
  const proofRoomId = String(proof.roomId || "");
  if (roomId && proofRoomId && proofRoomId !== roomId) {
    return false;
  }
  const found = findMission(userState, proof.missionId || proof.questId);
  if (!found?.missionItem) {
    return false;
  }
  const missionItem = found.missionItem;
  if (proof.kind === "mission_edit") {
    return missionItem.state === "edit_pending" && missionItem.editRequestId === proofId;
  }
  return missionItem.state === "pending" && missionItem.proofId === proofId;
}

function pendingProofsForRoom(userState = {}, room = {}) {
  const roomId = String(room.id || userState.activeRoomId || "");
  const ownerName = userState.profile?.nickname || "그룹원";
  return (Array.isArray(userState.proofs) ? userState.proofs : [])
    .filter((proof) => proofMatchesPendingMission(userState, proof, roomId))
    .map((proof) => ({
      ...proof,
      status: "pending",
      userId: String(userState.userId || proof.userId || ""),
      author: proof.author || ownerName,
      roomId,
    }));
}

function mergePendingProofsIntoRoom(room, ownerStates = []) {
  if (!room?.id) {
    return false;
  }
  const existingProofs = Array.isArray(room.proofs) ? room.proofs : [];
  const proofMap = new Map(existingProofs
    .filter((proof) => proof?.id)
    .map((proof) => [proof.id, proof]));
  const restored = [];
  let changed = false;
  for (const ownerState of ownerStates) {
    for (const proof of pendingProofsForRoom(ownerState, room)) {
      const current = proofMap.get(proof.id);
      if (!current) {
        restored.push(proof);
        proofMap.set(proof.id, proof);
        changed = true;
      } else if (
        current.status !== "pending"
        || current.userId !== proof.userId
        || current.missionId !== proof.missionId
        || current.questId !== proof.questId
      ) {
        Object.assign(current, proof);
        changed = true;
      }
    }
  }
  if (!changed) {
    return false;
  }
  room.proofs = compactProofList(
    [...restored, ...existingProofs],
    { maxItems: maxRoomProofs, maxPhotos: maxRoomProofPhotos },
  );
  return true;
}

async function roomMemberStatesForProofSync(room, currentUserState = {}) {
  const currentId = String(currentUserState.userId || "");
  const states = currentId ? [currentUserState] : [];
  const memberIds = [...new Set((room?.members || [])
    .map((member) => String(member.userId || ""))
    .filter((memberId) => memberId && memberId !== currentId))];
  const loadedStates = await Promise.all(memberIds.map(async (memberId) => {
    let candidate = null;
    if (store.users?.[memberId] && isFreshRemoteUser(memberId)) {
      candidate = store.users[memberId];
    } else {
      candidate = await loadUserStateFromSupabase(memberId) || store.users?.[memberId] || null;
      if (candidate) {
        store.users ||= {};
        store.users[memberId] = candidate;
        markRemoteUserFresh(memberId);
      }
    }
    if (!candidate || !isCurrentResetState(candidate)) {
      return null;
    }
    const copy = clone(candidate);
    copy.userId = memberId;
    return copy;
  }));
  states.push(...loadedStates.filter(Boolean));
  return states;
}

async function syncUserRoomFromGlobal(userState, options = {}) {
  if (!userState?.activeRoomId) {
    return userState;
  }
  let globalRoom = await findGlobalRoomById(userState.activeRoomId, options);
  if (!globalRoom || globalRoom.status === "closed") {
    userState.room = null;
    userState.activeRoomId = "";
    return userState;
  }
  let roomMember = (globalRoom.members || []).find((member) => (
    member.userId === userState.userId
    || normalizeNickname(member.name) === normalizeNickname(userState.profile?.nickname)
  ));
  if (!userState.profile?.completed && !roomMember?.snapshot?.profileCompleted) {
    const remoteRoom = await findGlobalRoomById(userState.activeRoomId, { ...options, forceRemote: true });
    const remoteMember = (remoteRoom?.members || []).find((member) => (
      member.userId === userState.userId
      || normalizeNickname(member.name) === normalizeNickname(userState.profile?.nickname)
    ));
    if (remoteMember?.snapshot?.profileCompleted) {
      globalRoom = remoteRoom;
      roomMember = remoteMember;
    } else {
      const registryRoom = await loadRoomRegistryFromSupabase("id", userState.activeRoomId);
      const registryMember = (registryRoom?.members || []).find((member) => (
        member.userId === userState.userId
        || normalizeNickname(member.name) === normalizeNickname(userState.profile?.nickname)
      ));
      if (registryMember?.snapshot?.profileCompleted) {
        globalRoom = registryRoom;
        roomMember = registryMember;
      }
    }
  }
  if (roomMember && hydrateUserStateFromMemberSnapshot(userState, roomMember, globalRoom)) {
    normalizeUserState(userState, userState.userId);
  }
  const proofStates = await roomMemberStatesForProofSync(globalRoom, userState);
  const proofsChanged = mergePendingProofsIntoRoom(globalRoom, proofStates);
  let snapshotChanged = false;
  for (const memberState of proofStates) {
    snapshotChanged = updateRoomMemberSnapshot(globalRoom, memberState) || snapshotChanged;
  }
  if (proofsChanged || snapshotChanged) {
    await persistRoom(globalRoom);
  }
  attachRoomToUserState(userState, globalRoom);
  return userState;
}

async function getUserState(request, options = {}) {
  const userId = getUserId(request);
  if (store.users[userId] && !isCurrentResetState(store.users[userId])) {
    delete store.users[userId];
  }
  const remoteState = store.users[userId] && isFreshRemoteUser(userId)
    ? null
    : await loadUserStateFromSupabase(userId);
  if (remoteState && isCurrentResetState(remoteState)) {
    store.users[userId] = remoteState;
    store.users[userId].userId = userId;
    markRemoteUserFresh(userId);
  } else if (!store.users[userId]) {
    store.users[userId] = remoteState || createUserState(userId);
    store.users[userId].userId = userId;
  }
  normalizeUserState(store.users[userId], userId);
  await syncUserRoomFromGlobal(store.users[userId], options);
  return store.users[userId];
}

async function getUserStateById(userId) {
  const safeId = String(userId || "guest").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) || "guest";
  if (store.users[safeId] && !isCurrentResetState(store.users[safeId])) {
    delete store.users[safeId];
  }
  const remoteState = store.users[safeId] && isFreshRemoteUser(safeId)
    ? null
    : await loadUserStateFromSupabase(safeId);
  if (remoteState && isCurrentResetState(remoteState)) {
    store.users[safeId] = remoteState;
    store.users[safeId].userId = safeId;
    markRemoteUserFresh(safeId);
  } else if (!store.users[safeId]) {
    store.users[safeId] = remoteState || createUserState(safeId);
    store.users[safeId].userId = safeId;
  }
  normalizeUserState(store.users[safeId], safeId);
  await syncUserRoomFromGlobal(store.users[safeId]);
  return store.users[safeId];
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, contentType, body, cacheControl = "no-store") {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": cacheControl,
  });
  response.end(body);
}

function sendCalendar(response, filename, body) {
  response.writeHead(200, {
    "Content-Type": "text/calendar; charset=utf-8",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "no-store",
  });
  response.end(body);
}

function sendBuffer(response, statusCode, contentType, buffer, cacheControl = "public, max-age=86400") {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Content-Length": buffer.length,
    "Cache-Control": cacheControl,
  });
  response.end(buffer);
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function colorToRgba(color, alpha = 255) {
  const hex = String(color || "#000000").replace("#", "");
  const safe = hex.length === 3
    ? hex.split("").map((char) => `${char}${char}`).join("")
    : hex.padEnd(6, "0").slice(0, 6);
  return [
    Number.parseInt(safe.slice(0, 2), 16),
    Number.parseInt(safe.slice(2, 4), 16),
    Number.parseInt(safe.slice(4, 6), 16),
    alpha,
  ];
}

function fillRectRgba(pixels, canvasSize, gridSize, x, y, width, height, color) {
  const rgba = colorToRgba(color);
  const scale = canvasSize / gridSize;
  const left = Math.floor(x * scale);
  const top = Math.floor(y * scale);
  const right = Math.ceil((x + width) * scale);
  const bottom = Math.ceil((y + height) * scale);
  for (let py = Math.max(0, top); py < Math.min(canvasSize, bottom); py += 1) {
    for (let px = Math.max(0, left); px < Math.min(canvasSize, right); px += 1) {
      const offset = (py * canvasSize + px) * 4;
      pixels[offset] = rgba[0];
      pixels[offset + 1] = rgba[1];
      pixels[offset + 2] = rgba[2];
      pixels[offset + 3] = rgba[3];
    }
  }
}

function createPng(size, draw) {
  const safeSize = [180, 192, 512].includes(Number(size)) ? Number(size) : 192;
  const pixels = Buffer.alloc(safeSize * safeSize * 4, 0);
  draw((x, y, width, height, color) => fillRectRgba(pixels, safeSize, 32, x, y, width, height, color));

  const stride = safeSize * 4 + 1;
  const scanlines = Buffer.alloc(stride * safeSize);
  for (let y = 0; y < safeSize; y += 1) {
    const rowStart = y * stride;
    scanlines[rowStart] = 0;
    pixels.copy(scanlines, rowStart + 1, y * safeSize * 4, (y + 1) * safeSize * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(safeSize, 0);
  ihdr.writeUInt32BE(safeSize, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", zlib.deflateSync(scanlines)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function drawHead(draw, body, options = {}) {
  const line = "#2f4057";
  const face = options.face || body;
  draw(10, 8, 12, 2, line);
  draw(8, 10, 16, 2, line);
  draw(7, 12, 18, 8, line);
  draw(8, 20, 16, 3, line);
  draw(10, 23, 12, 2, line);
  draw(10, 10, 12, 2, face);
  draw(9, 12, 14, 8, face);
  draw(10, 20, 12, 3, face);
  draw(13, 16, 2, 2, "#1f2d3f");
  draw(18, 16, 2, 2, "#1f2d3f");
  draw(12, 19, 3, 1, options.blush || "#ffb6ca");
  draw(18, 19, 3, 1, options.blush || "#ffb6ca");
}

function drawPetIcon(draw, character) {
  const line = "#2f4057";
  const body = character.accent || "#ffb6ca";
  draw(0, 0, 32, 32, "#fff8e8");
  draw(2, 2, 28, 28, "#dff7ff");
  draw(2, 18, 28, 12, "#c7ebd2");
  draw(5, 25, 22, 2, "#8fa79b");

  switch (character.id) {
    case "momo":
      draw(4, 12, 6, 8, line); draw(22, 12, 6, 8, line);
      draw(5, 13, 4, 6, "#9ed7ff"); draw(23, 13, 4, 6, "#9ed7ff");
      drawHead(draw, "#bfe8ff", { blush: "#ffb6ca" });
      draw(15, 18, 3, 5, line); draw(16, 18, 1, 4, "#bfe8ff");
      break;
    case "bami":
      draw(8, 7, 5, 5, line); draw(19, 7, 5, 5, line);
      draw(9, 8, 3, 3, "#d49a67"); draw(20, 8, 3, 3, "#d49a67");
      drawHead(draw, "#b57949", { face: "#d49a67", blush: "#ffc6b6" });
      draw(15, 18, 2, 1, "#2f4057");
      break;
    case "maru":
      draw(9, 8, 4, 4, line); draw(19, 8, 4, 4, line);
      drawHead(draw, "#ffc979", { face: "#ffdca5", blush: "#ff9f9f" });
      draw(11, 17, 2, 2, "#fff2d6"); draw(20, 17, 2, 2, "#fff2d6");
      break;
    case "poyo":
      draw(15, 6, 2, 3, "#ffd86b"); draw(13, 8, 6, 2, "#ffd86b");
      drawHead(draw, "#ffd86b", { face: "#ffe9a3", blush: "#ff9f9f" });
      draw(15, 18, 3, 2, "#f29b4a");
      break;
    case "kobi":
      draw(5, 10, 7, 8, line); draw(20, 10, 7, 8, line);
      draw(6, 11, 5, 6, "#b4d8c5"); draw(21, 11, 5, 6, "#b4d8c5");
      drawHead(draw, "#9bd7aa", { face: "#d9f4df", blush: "#ffb6ca" });
      draw(15, 18, 2, 2, "#566678");
      break;
    case "ruru":
      draw(8, 6, 5, 6, line); draw(19, 6, 5, 6, line);
      draw(9, 7, 3, 5, "#ff9f7a"); draw(20, 7, 3, 5, "#ff9f7a");
      drawHead(draw, "#ff9f7a", { face: "#fff0cf", blush: "#ffb6ca" });
      draw(14, 19, 5, 2, "#fff0cf");
      break;
    case "loki":
      draw(8, 6, 5, 6, line); draw(19, 6, 5, 6, line);
      drawHead(draw, "#d96f45", { face: "#fff0cf", blush: "#ffb6ca" });
      draw(10, 14, 5, 3, "#7a4a36"); draw(18, 14, 5, 3, "#7a4a36");
      draw(15, 18, 3, 2, "#7a4a36");
      break;
    case "miru":
      draw(9, 3, 5, 11, line); draw(10, 4, 3, 9, "#fffdf7");
      draw(18, 3, 5, 11, line); draw(19, 4, 3, 9, "#fffdf7");
      draw(15, 9, 2, 5, line);
      draw(6, 11, 20, 10, line);
      draw(7, 10, 18, 2, line);
      draw(8, 12, 16, 8, "#fffdf7");
      draw(9, 11, 14, 1, "#fffdf7");
      draw(11, 15, 2, 2, line); draw(20, 15, 2, 2, line);
      draw(15, 18, 1, 1, line); draw(17, 18, 1, 1, line);
      draw(16, 19, 1, 1, line);
      draw(8, 21, 16, 5, line);
      draw(9, 22, 14, 3, "#ff8f2f");
      draw(7, 22, 5, 4, line); draw(8, 23, 3, 2, "#fffdf7");
      draw(20, 22, 5, 4, line); draw(21, 23, 3, 2, "#fffdf7");
      draw(10, 27, 5, 2, line); draw(17, 27, 5, 2, line);
      break;
    case "melly":
      draw(2, 11, 6, 9, line); draw(3, 12, 4, 7, "#ffd9e7");
      draw(24, 11, 6, 9, line); draw(25, 12, 4, 7, "#ffd9e7");
      draw(9, 22, 14, 4, line); draw(10, 23, 12, 2, "#ffc1d6");
      draw(5, 8, 22, 13, line); draw(4, 10, 24, 9, line);
      draw(6, 9, 20, 11, "#ffc1d6"); draw(5, 11, 22, 7, "#ffc1d6");
      draw(8, 13, 16, 5, "#fff7df"); draw(9, 12, 14, 7, "#fff7df"); draw(11, 11, 10, 8, "#fff7df");
      draw(11, 15, 2, 3, "#6d2f24"); draw(20, 15, 2, 3, "#6d2f24");
      draw(16, 17, 2, 2, "#ffd84f"); draw(15, 19, 1, 1, "#6d2f24"); draw(18, 19, 1, 1, "#6d2f24"); draw(16, 20, 2, 1, "#6d2f24");
      draw(10, 3, 6, 4, line); draw(11, 4, 4, 2, "#ff6fa8");
      draw(16, 4, 2, 3, line); draw(16, 5, 2, 1, "#ffb6d0");
      draw(18, 3, 6, 4, line); draw(19, 4, 4, 2, "#ff6fa8");
      break;
    case "pomi":
      draw(6, 8, 6, 5, line); draw(20, 8, 6, 5, line);
      draw(7, 9, 4, 3, "#ffe8d6"); draw(21, 9, 4, 3, "#ffe8d6");
      draw(6, 10, 20, 13, line);
      drawHead(draw, "#fffaf0", { face: "#fff4e4", blush: "#ffb6ca" });
      draw(15, 18, 3, 2, line); draw(14, 20, 1, 1, line); draw(18, 20, 1, 1, line);
      draw(23, 15, 5, 5, line); draw(24, 16, 3, 3, "#fffaf0");
      break;
    case "somi":
      draw(7, 8, 5, 5, line); draw(20, 8, 5, 5, line);
      drawHead(draw, "#f7f7ef", { face: "#f7f7ef", blush: "#ffb6ca" });
      draw(10, 14, 5, 5, "#2f4057"); draw(18, 14, 5, 5, "#2f4057");
      draw(13, 16, 2, 2, "#fff"); draw(18, 16, 2, 2, "#fff");
      break;
    case "nabi":
      draw(22, 11, 5, 11, line); draw(23, 12, 3, 9, "#b8734a");
      draw(8, 8, 4, 4, line); draw(20, 8, 4, 4, line);
      drawHead(draw, "#c88252", { face: "#ffe0b6", blush: "#ffb6ca" });
      draw(14, 7, 4, 1, "#fff0cf");
      break;
    case "dami":
      draw(13, 5, 2, 3, "#91e7a9"); draw(16, 5, 2, 3, "#91e7a9");
      drawHead(draw, "#91e7a9", { face: "#d9ffe4", blush: "#ffd86b" });
      draw(22, 19, 5, 3, line); draw(23, 20, 4, 1, "#91e7a9");
      break;
    case "leo":
      draw(6, 8, 20, 17, "#b66b38");
      drawHead(draw, "#f29b4a", { face: "#ffe0a8", blush: "#ffb6ca" });
      draw(14, 19, 5, 1, "#b66b38");
      break;
    case "hoya":
      draw(8, 7, 5, 5, line); draw(19, 7, 5, 5, line);
      drawHead(draw, "#f29b4a", { face: "#fff0cf", blush: "#ffb6ca" });
      draw(11, 12, 3, 1, line); draw(18, 12, 3, 1, line); draw(15, 10, 2, 3, line);
      break;
    case "ari":
      draw(12, 6, 8, 4, "#f7f7ef");
      drawHead(draw, "#f7f7ef", { face: "#f7f7ef", blush: "#ffd86b" });
      draw(15, 18, 4, 2, "#ffd25f"); draw(15, 20, 2, 1, "#f29b4a");
      break;
    case "moki":
      draw(5, 12, 6, 6, line); draw(21, 12, 6, 6, line);
      draw(6, 13, 4, 4, "#c58255"); draw(22, 13, 4, 4, "#c58255");
      drawHead(draw, "#c58255", { face: "#ffe0b6", blush: "#ffb6ca" });
      break;
    case "boots":
      draw(8, 6, 5, 6, line); draw(19, 6, 5, 6, line);
      draw(11, 5, 10, 3, "#7a4a36"); draw(13, 2, 6, 4, "#7a4a36");
      drawHead(draw, "#c85c4a", { face: "#fff0cf", blush: "#ffb6ca" });
      break;
    case "lumi":
      draw(11, 7, 10, 3, "#8fd7bf");
      drawHead(draw, "#f8f6e8", { face: "#f8f6e8", blush: "#ffb6ca" });
      draw(15, 18, 3, 2, "#ffd86b");
      break;
    default:
      draw(10, 4, 4, 8, line); draw(18, 4, 4, 8, line);
      draw(11, 5, 2, 6, body); draw(19, 5, 2, 6, body);
      drawHead(draw, body, { face: "#fff0cf", blush: "#ffb6ca" });
      break;
  }
}

function createPetIconPng(petId, size) {
  const character = characterById(petId, "tori");
  return createPng(size, (draw) => drawPetIcon(draw, character));
}

function manifestForPet(request) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestedPet = url.searchParams.get("pet") || cookieValue(request, "godlife_pet");
  const character = characterById(requestedPet, "tori");
  const requestedName = url.searchParams.get("name") || cookieValue(request, "godlife_pet_name");
  const petName = sanitizePetName(requestedName, character.name);
  const requestedAppName = url.searchParams.get("app") || cookieValue(request, "godlife_app_name");
  const appName = String(requestedAppName || "Godlife Quest").trim().slice(0, 20) || "Godlife Quest";
  const pet = encodeURIComponent(character.id);
  const name = encodeURIComponent(petName);
  const app = encodeURIComponent(appName);
  const version = encodeURIComponent(`${character.id}-${petName}-${appName}`.toLowerCase());
  return {
    id: "/",
    name: appName,
    short_name: appName,
    description: "친구와 같이 루틴 미션을 인증하고 픽셀 펫을 키우는 갓생 퀘스트 앱",
    start_url: `/?source=pwa&app=${app}`,
    scope: "/",
    display: "standalone",
    background_color: "#fff8e8",
    theme_color: character.accent || "#8fd7bf",
    orientation: "portrait",
    icons: [
      {
        src: `/api/icon/180.png?pet=${pet}&name=${name}&v=${version}`,
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `/api/icon/192.png?pet=${pet}&name=${name}&v=${version}`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: `/api/icon/512.png?pet=${pet}&name=${name}&v=${version}`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}

function cookieValue(request, name) {
  const cookie = String(request.headers.cookie || "");
  const match = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

function injectPwaIdentity(html, request) {
  const character = characterById(cookieValue(request, "godlife_pet"), "tori");
  const petName = sanitizePetName(cookieValue(request, "godlife_pet_name"), character.name);
  const appName = String(cookieValue(request, "godlife_app_name") || "Godlife Quest").trim().slice(0, 20) || "Godlife Quest";
  const pet = encodeURIComponent(character.id);
  const name = encodeURIComponent(petName);
  const app = encodeURIComponent(appName);
  const version = encodeURIComponent(`${character.id}-${petName}-${appName}`.toLowerCase());
  return html
    .replace(/(<meta[^>]+name="apple-mobile-web-app-title"[^>]+content=")[^"]*"/, `$1${appName.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`)
    .replace(/href="\/api\/manifest\.webmanifest(?:\?[^"]*)?"/, `href="/api/manifest.webmanifest?pet=${pet}&name=${name}&app=${app}&v=${version}"`)
    .replace(/(<link[^>]+id="shortcutIconLink"[^>]+href=")\/api\/icon\/192\.png(?:\?[^"]*)?"/, `$1/api/icon/192.png?pet=${pet}&name=${name}&v=${version}"`)
    .replace(/(<link[^>]+id="appleTouchIconLink"[^>]+href=")\/api\/icon\/180\.png(?:\?[^"]*)?"/, `$1/api/icon/180.png?pet=${pet}&name=${name}&v=${version}"`);
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    let tooLarge = false;
    request.on("data", (chunk) => {
      if (tooLarge) {
        return;
      }
      body += chunk;
      if (body.length > maxRequestBodyBytes) {
        tooLarge = true;
        body = "";
      }
    });
    request.on("end", () => {
      if (tooLarge) {
        const error = new Error("사진 용량이 커요. 다시 찍거나 작은 사진으로 올려주세요.");
        error.statusCode = 413;
        reject(error);
        return;
      }
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        const error = new Error("요청 형식이 올바르지 않아요.");
        error.statusCode = 400;
        reject(error);
      }
    });
  });
}

function normalizeUrl(value) {
  const text = String(value || "").trim();
  if (!text) {
    return "";
  }
  return /^https?:\/\//i.test(text) ? text : `https://${text}`;
}

function shortDuration(milliseconds) {
  const totalMinutes = Math.max(0, Math.ceil(Number(milliseconds || 0) / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0 && minutes > 0) {
    return `${hours}시간 ${minutes}분`;
  }
  if (hours > 0) {
    return `${hours}시간`;
  }
  return `${minutes}분`;
}

function addReward(userState, { xp = 0, coin = 0, bond = 0, completion = 0, stats = {}, health = 0 }, options = {}) {
  userState.game = normalizeGrowth(userState.game || {});
  normalizeCharacterCollection(userState);
  const activeCharacter = userState.characters.find((character) => character.id === userState.character?.id);
  const previousLevel = Math.max(1, Math.floor(Number(activeCharacter?.level || userState.game.level || 1)));
  userState.game.lastLevelUp = 0;
  userState.game.lastUnlockedPetActions = [];
  const penalty = options.applyPenalty === false ? 0 : Math.min(Number(userState.game.penalty || 0), 60);
  const multiplier = Math.max(0.4, 1 - penalty / 100);
  const nextXp = Math.round(xp * multiplier);
  const nextCoin = Math.round(coin * multiplier);
  const healthyCoinBonus = options.applyHealthyCoinBonus === false || nextCoin <= 0 || Number(userState.game.health || 0) < 100
    ? 0
    : Math.max(1, Math.ceil(nextCoin * healthyCoinBonusRate));
  userState.game.lastCoinBonus = healthyCoinBonus;
  if (activeCharacter) {
    activeCharacter.xp = Math.max(0, Math.floor(Number(activeCharacter.xp || 0))) + nextXp;
    activeCharacter.level = Math.max(1, Math.floor(Number(activeCharacter.level || 1)));
    activeCharacter.xpMax = xpMaxForLevel(activeCharacter.level);
    while (activeCharacter.xp >= activeCharacter.xpMax) {
      activeCharacter.xp -= activeCharacter.xpMax;
      activeCharacter.level += 1;
      activeCharacter.xpMax = xpMaxForLevel(activeCharacter.level);
      userState.game.lastLevelUp += 1;
    }
    activeCharacter.homeTier = petHomeTier(activeCharacter.level);
    activeCharacter.growthStage = petGrowthStage(activeCharacter.level);
    syncGameProgressFromCharacter(userState, activeCharacter);
  } else {
    userState.game.xp += nextXp;
    while (userState.game.xp >= userState.game.xpMax) {
      userState.game.xp -= userState.game.xpMax;
      userState.game.level += 1;
      userState.game.xpMax = xpMaxForLevel(userState.game.level);
      userState.game.lastLevelUp += 1;
    }
  }
  userState.game.coin += nextCoin + healthyCoinBonus;
  userState.game.bond += bond;
  userState.game.completion = Math.min(userState.game.completion + completion, 100);
  userState.game.health = Math.min(100, Number(userState.game.health || 0) + health);
  userState.game.stats = { ...defaultStats(), ...(userState.game.stats || {}) };
  for (const key of ["power", "focus", "skill", "will"]) {
    const value = Number(stats[key] || 0);
    if (value) {
      userState.game.stats[key] = Math.min(99, Math.max(1, Number(userState.game.stats[key] || 0) + value));
    }
  }
  if (penalty > 0 && options.applyPenalty !== false) {
    userState.game.penalty = 0;
    userState.game.penaltyReason = "";
  }
  const nextLevel = Math.max(1, Math.floor(Number(activeCharacter?.level || userState.game.level || 1)));
  userState.game.lastUnlockedPetActions = petActionCatalog
    .filter((action) => previousLevel < action.unlockLevel && nextLevel >= action.unlockLevel)
    .map((action) => ({
      id: action.id,
      label: action.label,
      unlockLevel: action.unlockLevel,
    }));
}

function previousDailyKey(dailyKey) {
  const match = String(dailyKey || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return "";
  }
  const [, year, month, day] = match.map(Number);
  return dateKeyFromUtcDate(new Date(Date.UTC(year, month - 1, day) - 24 * 60 * 60 * 1000));
}

function claimAttendanceReward(userState) {
  userState.game = normalizeGrowth(userState.game || {});
  const dailyKey = periodSnapshot().daily.key;
  const attendance = normalizeAttendance(userState.game);
  if (attendance.lastKey === dailyKey) {
    return {
      already: true,
      attendance,
      reward: attendance.reward || attendanceBaseReward,
      rewardText: "오늘 출석 완료",
    };
  }

  const nextStreak = attendance.lastKey === previousDailyKey(dailyKey) ? attendance.streak + 1 : 1;
  const reward = {
    ...attendanceBaseReward,
  };
  addReward(userState, reward, { applyPenalty: false });
  userState.game.attendance = {
    lastKey: dailyKey,
    streak: nextStreak,
    claimedAt: new Date().toISOString(),
    reward,
  };
  userState.game.mood = `출석 ${nextStreak}일차 보상을 받았어요`;
  userState.messages ||= [];
  userState.messages.unshift({
    name: userState.character?.name || "펫",
    message: `출석 보상으로 ${reward.coin}코인을 받았어요.`,
    mine: false,
    createdAt: new Date().toISOString(),
  });
  userState.messages = userState.messages.slice(0, 30);
  return {
    already: false,
    attendance: userState.game.attendance,
    reward,
    rewardText: nextStreak > 1 ? `출석 ${nextStreak}일 +${reward.coin}코인` : `출석 +${reward.coin}코인`,
  };
}

function findMission(userState, id) {
  const periods = ["daily", "weekly", "monthly"];
  for (const period of periods) {
    const missionItem = userState.missions?.[period]?.items?.find((item) => item.id === id);
    if (missionItem) {
      return { missionItem, period };
    }
  }
  return null;
}

async function generateQuests(body) {
  const providerMap = {
    solar: { name: "Solar", apiKey: process.env.UPSTAGE_API_KEY, generator: generateQuestsWithSolar },
    gemini: { name: "Gemini", apiKey: process.env.GEMINI_API_KEY, generator: generateQuestsWithGemini },
  };
  const primaryProvider = String(process.env.AI_PRIMARY_PROVIDER || "solar").toLowerCase();
  const providers = primaryProvider === "gemini"
    ? [providerMap.gemini, providerMap.solar]
    : [providerMap.solar, providerMap.gemini];
  const trySecondaryProvider = process.env.AI_TRY_SECONDARY === "true" || primaryProvider === "gemini";

  for (let index = 0; index < providers.length; index += 1) {
    if (index > 0 && !trySecondaryProvider) {
      break;
    }
    const provider = providers[index];
    const { name, apiKey, generator } = provider;
    if (!apiKey) {
      continue;
    }
    const hasFallback = trySecondaryProvider && providers.slice(index + 1).some((item) => item.apiKey);
    try {
      const generated = await generator(body);
      if (generated.length > 0) {
        return generated;
      }
      console.info(`${name} returned no usable quests; ${hasFallback ? "switching provider" : "using local fallback"}.`);
    } catch (error) {
      console.info(`${name} quest generation skipped; ${hasFallback ? "switching provider" : "using local fallback"}.`);
      if (process.env.AI_DEBUG === "true") {
        console.info(`${name} detail: ${error.message}`);
      }
    }
  }
  return generateFallbackQuests(body);
}

function generatedQuestSystemPrompt(count = 2) {
  return [
    "너는 그룹 검증 중심 루틴 펫 앱의 미션 플래너야.",
    `사용자의 목표, 기간, 기상 시간, 관심 분야, routinePrompt를 보고 실천 가능한 일일 퀘스트 ${count}개를 만들어.`,
    "routinePrompt가 [최종 목표], [평일 루틴], [일일 미션], [주간 미션] 같은 양식으로 작성되면 해당 항목을 구조화된 요구사항으로 해석해.",
    "routinePrompt가 있으면 최우선으로 반영해서 시간, 학습 주제, 행동, 인증물이 보이는 구체적인 학습 미션으로 바꿔.",
    "공부하기처럼 추상적인 제목은 금지야. 예: 9시 SSAFY 개발 복습 30분, 알고리즘 1문제 풀이 기록, CS 키워드 3개 정리.",
    "기상/운동/건강은 기본 미션이 따로 있으니 routinePrompt 안의 공부/개발/취업/회고 행동을 우선 선택해.",
    "각 퀘스트는 사진 업로드와 그룹 검증에 어울려야 하고, 인증할 결과물을 note에 꼭 적어.",
    "사용자가 직접 적지 않은 특정 서비스명은 억지로 넣지 마.",
    "반드시 JSON 배열만 반환해. 마크다운 설명은 쓰지 마.",
    "스키마: [{\"type\":\"공부|운동|건강|회고|AI\",\"title\":\"짧은 제목\",\"note\":\"검증 방법 포함\",\"links\":[{\"label\":\"짧은 이름\",\"url\":\"https://...\"}]}]",
  ].join("\n");
}

function parseGeneratedQuestList(text) {
  const cleaned = String(text || "")
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = cleaned.indexOf("[");
  if (start === -1) {
    return [];
  }

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < cleaned.length; index += 1) {
    const char = cleaned[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === "\\") {
      escaped = true;
      continue;
    }
    if (char === "\"") {
      inString = !inString;
      continue;
    }
    if (inString) {
      continue;
    }
    if (char === "[") {
      depth += 1;
    } else if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        const parsed = JSON.parse(cleaned.slice(start, index + 1));
        return Array.isArray(parsed) ? parsed : [];
      }
    }
  }
  const end = cleaned.lastIndexOf("]");
  if (end === -1 || end <= start) {
    return [];
  }
  const parsed = JSON.parse(cleaned.slice(start, end + 1));
  return Array.isArray(parsed) ? parsed : [];
}

function isProviderLabel(value = "") {
  return /^(solar|gemini|upstage|ai)$/i.test(String(value || "").trim());
}

function safeGeneratedText(value, fallback) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text || isProviderLabel(text)) {
    return fallback;
  }
  return text;
}

function normalizeGeneratedQuests(parsed, body, source = "AI") {
  const count = clampInt(body.count, 2, 1, 5);
  const period = body.period || "daily";
  return parsed.slice(0, count).map((quest, index) => {
    const rawNote = safeGeneratedText(quest.note || quest.proof || quest.description, "사진 인증 후 그룹에 검증받기");
    const rawTitle = safeGeneratedText(
      quest.title || quest.mission || quest.quest || quest.task || quest.name,
      fallbackRoutineTitle(routineChunksFromPrompt(body.routinePrompt || body.profile?.routinePrompt, count)[index], index, body.goal || body.profile?.finalGoal),
    );
    const inferredType = inferRoutineType(`${rawTitle} ${rawNote}`, body.profile || {});
    const rawType = safeGeneratedText(quest.type || quest.category, inferredType);
    const type = isProviderLabel(rawType) ? inferredType : rawType;
    return {
      id: quest.id || `${period}-ai-${Date.now()}-${index}`,
      period,
      type: String(type || inferredType || "미션").slice(0, 12),
      title: String(rawTitle || "새 루틴 미션").slice(0, 40),
      note: String(rawNote).slice(0, 120),
      action: "요청",
      state: "todo",
      links: Array.isArray(quest.links)
        ? quest.links
            .filter((link) => link?.url)
            .slice(0, 3)
            .map((link) => ({
              label: String(link.label || "링크").slice(0, 10),
              url: String(link.url || "").slice(0, 200),
            }))
        : [],
      reward: dailyRewardForType(type),
      source,
    };
  });
}

async function generateQuestsWithGemini(body) {
  const baseUrl = String(process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta").replace(/\/$/, "");
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const modelPath = model.startsWith("models/") ? model : `models/${model}`;
  const count = clampInt(body.count, 2, 1, 5);
  const response = await fetchWithTimeout(`${baseUrl}/${modelPath}:generateContent`, {
    method: "POST",
    headers: {
      "x-goog-api-key": process.env.GEMINI_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: generatedQuestSystemPrompt(count) }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: JSON.stringify({ ...body, count }) }],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    }),
  }, aiFetchTimeoutMs);

  if (!response.ok) {
    throw new Error(`Gemini API ${response.status}`);
  }

  const data = await response.json();
  const text = (data?.candidates?.[0]?.content?.parts || [])
    .map((part) => part.text || "")
    .join("");
  return normalizeGeneratedQuests(parseGeneratedQuestList(text), body, "Gemini");
}

async function generateQuestsWithSolar(body) {
  const baseUrl = process.env.UPSTAGE_BASE_URL || "https://api.upstage.ai/v1";
  const model = process.env.UPSTAGE_SOLAR_MODEL || "solar-pro3";
  const count = clampInt(body.count, 2, 1, 5);
  const response = await fetchWithTimeout(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTAGE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: generatedQuestSystemPrompt(count),
        },
        { role: "user", content: JSON.stringify({ ...body, count }) },
      ],
      temperature: 0.4,
    }),
  }, aiFetchTimeoutMs);

  if (!response.ok) {
    throw new Error(`Solar API ${response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content || "[]";
  return normalizeGeneratedQuests(parseGeneratedQuestList(text), body, "Solar");
}

function routineChunkScore(chunk) {
  let score = 0;
  if (/알고리즘|공부|학습|개발|코딩|싸피|ssafy|cs|프로젝트|커밋|복습|강의|면접|취업|문제|풀이|정리|포트폴리오/i.test(chunk)) {
    score += 10;
  }
  if (/\d|시|분|시간/.test(chunk)) {
    score += 2;
  }
  if (/기상|운동|헬스|러닝|수면|식사|물|휴식|스트레칭/i.test(chunk)) {
    score -= 3;
  }
  return score;
}

function routineChunksFromPrompt(prompt, count = 2) {
  const normalized = normalizeRoutinePrompt(prompt);
  if (!normalized) {
    return [];
  }
  const chunks = [];
  const seen = new Set();
  for (const rawChunk of normalized.split(/\n|,|;|\/|·|•|→|->/g)) {
    const sectionLabel = String(rawChunk).match(/^\s*\[([^\]]+)\]/)?.[1] || "";
    if (/최종|기간|기상|자기관리|바로가기/i.test(sectionLabel)) {
      continue;
    }
    const chunk = rawChunk
      .replace(/^\s*\[[^\]]+\]\s*/, "")
      .replace(/^\s*\d+[.)]\s*/, "")
      .replace(/^\s*[-*]\s*/, "")
      .replace(/\s+/g, " ")
      .trim();
    if (
      /^\[[^\]]+\]$/.test(chunk)
      || /^https?:\/\//i.test(chunk)
      || /^(github|git|notion|url|링크)\s*:/i.test(chunk)
    ) {
      continue;
    }
    const compact = chunk.replace(/[\s\-~]/g, "");
    if (
      chunk.length < 2
      || !/[가-힣a-zA-Z]/.test(chunk)
      || /^(월금|월화수목금|평일|주말|매일|오전|오후)$/.test(compact)
    ) {
      continue;
    }
    const key = chunk.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      chunks.push(chunk);
    }
  }
  const sorted = chunks.sort((a, b) => routineChunkScore(b) - routineChunkScore(a));
  const studyChunks = sorted.filter((chunk) => routineChunkScore(chunk) > 0);
  const fallbackChunks = sorted.filter((chunk) => routineChunkScore(chunk) <= 0);
  return [...studyChunks, ...fallbackChunks].slice(0, count);
}

function inferRoutineType(text, profile = {}) {
  if (/운동|헬스|러닝|산책|스트레칭|요가/i.test(text)) {
    return "운동";
  }
  if (/건강|수면|식사|물|영양|컨디션|휴식/i.test(text)) {
    return "건강";
  }
  if (/회고|일기|하루정리|하루 정리/i.test(text)) {
    return "회고";
  }
  if (/프로젝트|개발|커밋|github|깃허브|배포|코딩/i.test(text)) {
    return "개발";
  }
  if (profile.focusArea === "career" || /면접|취업|이력서|포트폴리오/i.test(text)) {
    return "취업";
  }
  return "공부";
}

function routineLinks(text) {
  const links = [];
  if (/github|깃허브|깃|커밋|프로젝트|개발|코딩|배포/i.test(text)) {
    links.push({ label: "GitHub", url: "https://github.com" });
  }
  if (/notion|노션|정리|회고|공부|알고리즘|cs|싸피|ssafy|복습|강의|문제|학습|면접|취업|포트폴리오/i.test(text)) {
    links.push({ label: "Notion", url: "https://www.notion.so" });
  }
  if (/운동|헬스|러닝|산책|스트레칭|요가|건강|수면/i.test(text)) {
    links.push({ label: "기록", url: "https://fit.google.com" });
  }
  if (/기상|알람/i.test(text)) {
    links.push({ label: "알람", url: "/api/calendar/wake.ics" });
  } else if (/일정|시간|캘린더/i.test(text)) {
    links.push({ label: "일정", url: "https://calendar.google.com" });
  }
  return links.length > 0 ? links.slice(0, 3) : [{ label: "Notion", url: "https://www.notion.so" }];
}

function routineProofNote(text, profile = {}) {
  const suffix = "사진 업로드 후 그룹 검증";
  if (/github|깃허브|깃|커밋|프로젝트|개발|코딩|배포/i.test(text)) {
    return `커밋 화면, PR, 작업 노트 중 하나를 첨부하고 ${suffix}`;
  }
  if (/알고리즘|문제|풀이/i.test(text)) {
    return `풀이 과정, 정리 노트, 실행 화면 중 하나를 첨부하고 ${suffix}`;
  }
  if (/cs|싸피|ssafy|강의|복습|공부|학습|정리/i.test(text)) {
    return `요약 3줄이나 필기 사진을 첨부하고 ${suffix}`;
  }
  if (/운동|헬스|러닝|산책|스트레칭|요가/i.test(text)) {
    return `운동 기록이나 완료 사진을 첨부하고 ${suffix}`;
  }
  return `결과물 사진 또는 링크를 올리고 ${suffix}`;
}

function fallbackRoutineTitle(seed, index, goal) {
  const title = String(seed || "").replace(/\s+/g, " ").trim();
  if (title) {
    return title.slice(0, 34);
  }
  return `${String(goal || "오늘 루틴").slice(0, 12)} 실행 ${index + 1}`;
}

function generateFallbackQuests(body) {
  const count = clampInt(body.count, 2, 1, 5);
  const profile = body.profile || {};
  const goal = String(body.goal || profile.finalGoal || "오늘 루틴").trim();
  const routinePrompt = normalizeRoutinePrompt(body.routinePrompt || profile.routinePrompt);
  const seeds = routineChunksFromPrompt(routinePrompt, count);
  const focus = focusData(profile);
  for (const candidate of [focus.daily, `${goal.slice(0, 18)} 정리`]) {
    if (seeds.length >= count) {
      break;
    }
    if (!seeds.some((seed) => seed === candidate)) {
      seeds.push(candidate);
    }
  }
  return seeds.slice(0, count).map((seed, index) => {
    const type = inferRoutineType(seed, profile);
    const isWorkout = type === "운동";
    return mission(
      `ai-${Date.now()}-${index}`,
      "daily",
      type,
      fallbackRoutineTitle(seed, index, goal),
      routineProofNote(seed, profile),
      routineLinks(seed),
      isWorkout
        ? { xp: 34, coin: 10, completion: 11, stats: { power: 5, will: 2 }, health: 6 }
        : { xp: 38, coin: 12, completion: 12, stats: { focus: 4, skill: 3 } },
    );
  });
}

function applyGeneratedDailyMissions(bucket, generated = []) {
  if (!bucket?.items || generated.length === 0) {
    return false;
  }
  const fixed = bucket.items.filter((item) => /-wake$/.test(item.id || ""));
  const backup = bucket.items.filter((item) => !/-wake$/.test(item.id || "") && !item.source);
  const aiItems = generated.slice(0, 4).map((item, index) => ({
    ...item,
    id: `${bucket.key}-ai-${Date.now()}-${index}`,
    period: "daily",
    action: "요청",
    state: "todo",
  }));
  bucket.items = [...fixed, ...aiItems, ...backup].slice(0, 5);
  return aiItems.length > 0;
}

function availableGachaPool(userState) {
  const ownedAccessories = new Set((userState.accessories || []).map((accessory) => accessory.id));
  const pool = gachaPool.filter((prize) => (
    prize.type !== "accessory"
    || !ownedAccessories.has(prize.accessoryId || prize.id)
  ));
  return pool.length > 0 ? pool : gachaPool.filter((prize) => prize.type === "palette-ticket");
}

function gachaOddsSummary(userState) {
  const pool = availableGachaPool(userState);
  const total = pool.reduce((sum, prize) => sum + Number(prize.weight || 0), 0) || 1;
  const buckets = [
    { id: "palette", label: "색상 변경권", match: (prize) => prize.type === "palette-ticket" },
    { id: "rare", label: "레어 액세서리", match: (prize) => prize.type === "accessory" && prize.rarity === "RARE" },
    { id: "epic", label: "에픽 액세서리", match: (prize) => prize.type === "accessory" && prize.rarity === "EPIC" },
    { id: "legend", label: "레전드 액세서리", match: (prize) => prize.type === "accessory" && prize.rarity === "LEGEND" },
  ];
  return buckets.map((bucket) => {
    const weight = pool
      .filter(bucket.match)
      .reduce((sum, prize) => sum + Number(prize.weight || 0), 0);
    return {
      id: bucket.id,
      label: bucket.label,
      weight,
      percent: Number(((weight / total) * 100).toFixed(1)),
    };
  }).filter((item) => item.weight > 0);
}

function syncGachaOdds(userState) {
  userState.gacha ||= { cost: gachaCost, lastDraw: null };
  userState.gacha.cost = gachaCost;
  userState.gacha.odds = gachaOddsSummary(userState);
  return userState.gacha;
}

function grantAccessoryPrize(userState, prize) {
  const recipe = accessoryById(prize.accessoryId || prize.id);
  if (!recipe) {
    return { error: "액세서리를 찾을 수 없어요" };
  }

  userState.accessories ||= [];
  if (userState.accessories.some((accessory) => accessory.id === recipe.id)) {
    const reward = { coin: Math.max(6, Math.floor(gachaCost / 2)), bond: 1 };
    addReward(userState, reward, { applyPenalty: false });
    const duplicatePrize = {
      id: `${recipe.id}-bonus-${Date.now()}`,
      type: "bonus",
      name: `${recipe.name} 보너스`,
      rarity: recipe.rarity,
      accessoryId: recipe.id,
      effectLabel: "이미 보유 · 코인 보너스",
      acquiredAt: new Date().toISOString(),
    };
    userState.gacha.lastDraw = duplicatePrize;
    userState.game.mood = `${recipe.name}은 이미 있어서 보너스를 받았어요`;
    return { prize: duplicatePrize, reward };
  }

  const accessory = {
    id: recipe.id,
    name: recipe.name,
    rarity: recipe.rarity,
    description: recipe.description,
    acquiredAt: new Date().toISOString(),
    source: "gacha",
  };
  userState.accessories.unshift(accessory);
  normalizeEquippedAccessories(userState);
  userState.equippedAccessories[recipe.slot || "misc"] = accessory.id;
  normalizeEquippedAccessories(userState);
  addReward(userState, recipe.reward || {}, { applyPenalty: false });
  const prizeItem = {
    ...accessory,
    type: "accessory",
    accessoryId: accessory.id,
    effectLabel: `${recipe.slotLabel || "장식"} 착용 완료`,
  };
  userState.gacha.lastDraw = prizeItem;
  userState.game.mood = `${accessory.name} 획득! ${recipe.slotLabel || "장식"}에 착용했어요`;
  return { prize: prizeItem, accessory, reward: recipe.reward || {} };
}

function drawGacha(userState) {
  if (userState.game.coin < gachaCost) {
    return { error: "코인이 부족해요" };
  }

  userState.game.coin -= gachaCost;
  userState.inventory ||= [];
  userState.accessories ||= [];
  userState.gacha ||= { cost: gachaCost, lastDraw: null };
  const prize = clone(weightedPick(availableGachaPool(userState)));
  delete prize.weight;
  if (prize.type === "accessory") {
    return grantAccessoryPrize(userState, prize);
  }

  const item = {
    id: `${prize.id}-${Date.now()}`,
    name: prize.name,
    rarity: prize.rarity,
    materialId: prize.materialId,
    craftTarget: prize.craftTarget,
    type: prize.type || "material",
    effectLabel: prize.effectLabel,
    acquiredAt: new Date().toISOString(),
  };
  userState.inventory.unshift(item);
  userState.inventory = userState.inventory.slice(0, 60);
  userState.gacha.lastDraw = item;
  userState.game.mood = `${prize.name} 획득!`;
  return { prize: item };
}

function drawCharacter(userState) {
  userState.game = normalizeGrowth(userState.game || {});
  normalizeCharacterCollection(userState);
  if (userState.game.coin < petGachaCost) {
    return { error: "펫 알을 열 코인이 부족해요" };
  }

  const ownedIds = new Set((userState.characters || []).map((character) => character.id));
  const availablePool = characterPool.filter((character) => (
    drawableCharacterIds.has(character.id) && !ownedIds.has(character.id)
  ));
  if (availablePool.length === 0) {
    return { error: "아직 데려올 수 있는 펫을 모두 해금했어요" };
  }

  userState.game.coin -= petGachaCost;
  const character = normalizeCharacterProgress(weightedPick(availablePool).id);
  userState.characters.unshift(character);
  userState.character = character;
  userState.petGacha = {
    cost: petGachaCost,
    lastDraw: {
      ...character,
      acquiredAt: new Date().toISOString(),
    },
  };
  userState.game.mood = `${character.rarityLabel} ${character.name} 등장!`;
  const bonus = character.rarity === "LEGEND"
    ? { bond: 5, xp: 90, health: 8 }
    : (character.rarity === "EPIC" ? { bond: 3, xp: 45 } : { bond: 2, xp: 25 });
  addReward(userState, bonus, { applyPenalty: false });
  return { character };
}

function equipCharacter(userState, characterId) {
  normalizeCharacterCollection(userState);
  const character = (userState.characters || []).find((item) => item.id === characterId);
  if (!character) {
    return { error: "아직 해금한 펫이 아니에요" };
  }
  userState.character = { ...character };
  const equippedTemplate = characterById(userState.character.id, userState.character.id);
  userState.character.name = normalizeCharacterName(
    userState.character.id,
    userState.profile?.petName || userState.character.name,
    equippedTemplate?.name || userState.character.name,
  );
  const activeIndex = userState.characters.findIndex((item) => item.id === userState.character.id);
  if (activeIndex >= 0) {
    userState.characters[activeIndex] = { ...userState.characters[activeIndex], name: userState.character.name };
  }
  syncGameProgressFromCharacter(userState, userState.characters[activeIndex] || userState.character);
  userState.game.mood = `${userState.character.name}와 함께하는 중`;
  return { character: userState.character };
}

function isColorTicket(item = {}) {
  return item.type === "palette-ticket"
    || item.materialId === "color-ticket"
    || String(item.id || "").startsWith("color-ticket");
}

function changePetPalette(userState, paletteId) {
  const requested = paletteId === "default" ? "" : String(paletteId || "");
  if (!validPetPalettes.has(requested)) {
    return { error: "선택할 수 없는 색상이에요" };
  }
  normalizeCharacterCollection(userState);
  const activeIndex = (userState.characters || []).findIndex((item) => item.id === userState.character?.id);
  if (activeIndex < 0) {
    return { error: "색상을 바꿀 펫을 찾지 못했어요" };
  }
  const currentPalette = normalizePetPaletteId(userState.characters[activeIndex].paletteId);
  if (currentPalette === requested) {
    return { paletteId: requested, unchanged: true };
  }
  userState.inventory = (userState.inventory || []).map(normalizeInventoryItem);
  const ticketIndex = userState.inventory.findIndex(isColorTicket);
  if (ticketIndex === -1) {
    return { error: "색상 변경권이 필요해요" };
  }
  const [ticket] = userState.inventory.splice(ticketIndex, 1);
  userState.characters[activeIndex] = {
    ...userState.characters[activeIndex],
    paletteId: normalizePetPaletteId(requested),
  };
  userState.character = { ...userState.characters[activeIndex] };
  syncGameProgressFromCharacter(userState, userState.characters[activeIndex]);
  const label = requested ? "새 색상으로 변신!" : "기본 색상으로 돌아왔어요";
  userState.game.mood = label;
  userState.gacha.lastUsed = {
    id: ticket.id,
    name: ticket.name || "색상 변경권",
    rarity: ticket.rarity || "RARE",
    effectLabel: label,
    usedAt: new Date().toISOString(),
  };
  return { paletteId: requested, character: userState.character, item: ticket };
}

function itemTemplateFor(item) {
  const baseId = String(item.id || "").replace(/-\d+$/, "");
  return gachaPool.find((prize) => prize.id === baseId)
    || legacyGachaEffects[baseId]
    || null;
}

function normalizeInventoryItem(item = {}) {
  const template = itemTemplateFor(item) || {};
  return {
    ...item,
    materialId: item.materialId || template.materialId || String(item.id || "unknown").replace(/-\d+$/, ""),
    craftTarget: item.craftTarget || template.craftTarget || "",
    type: item.type || template.type || "material",
    effectLabel: item.effectLabel || template.effectLabel || "제작 재료",
    acquiredAt: item.acquiredAt || new Date().toISOString(),
  };
}

function useInventoryItem(userState, itemId) {
  const index = (userState.inventory || []).findIndex((item) => item.id === itemId);
  if (index === -1) {
    return { error: "아이템을 찾을 수 없어요" };
  }
  if (isColorTicket(userState.inventory[index])) {
    return { error: "색상 변경 메뉴에서 원하는 색을 골라주세요" };
  }
  const [item] = userState.inventory.splice(index, 1);
  const template = itemTemplateFor(item) || {};
  const reward = clone(item.reward || template.reward || { xp: 10 });
  addReward(userState, reward, { applyPenalty: false });
  const effectLabel = item.effectLabel || template.effectLabel || rewardSummary(reward, userState);
  userState.game.mood = item.mood || template.mood || `${item.name}을 사용했어요`;
  userState.gacha.lastUsed = {
    id: item.id,
    name: item.name,
    rarity: item.rarity,
    effectLabel,
    usedAt: new Date().toISOString(),
  };
  return { item, reward, effectLabel };
}

function craftAccessory(userState, accessoryId) {
  const recipe = accessoryById(accessoryId);
  if (!recipe) {
    return { error: "제작할 액세서리를 찾을 수 없어요" };
  }
  userState.inventory = (userState.inventory || []).map(normalizeInventoryItem);
  userState.accessories ||= [];
  if (userState.accessories.some((accessory) => accessory.id === recipe.id)) {
    return { error: "이미 보유한 액세서리예요" };
  }

  const materialIndexes = [];
  userState.inventory.forEach((item, index) => {
    if (item.materialId === recipe.materialId) {
      materialIndexes.push(index);
    }
  });
  if (materialIndexes.length < recipe.need) {
    return { error: `${recipe.name} 제작에는 조각 ${recipe.need}개가 필요해요` };
  }

  materialIndexes.slice(0, recipe.need).reverse().forEach((index) => {
    userState.inventory.splice(index, 1);
  });
  const accessory = {
    id: recipe.id,
    name: recipe.name,
    rarity: recipe.rarity,
    description: recipe.description,
    acquiredAt: new Date().toISOString(),
  };
  userState.accessories.unshift(accessory);
  normalizeEquippedAccessories(userState);
  userState.equippedAccessories[recipe.slot || "misc"] = accessory.id;
  normalizeEquippedAccessories(userState);
  addReward(userState, recipe.reward || {}, { applyPenalty: false });
  userState.game.mood = `${accessory.name} 제작 완료! ${recipe.slotLabel || "장식"}에 장착했어요`;
  return { accessory, reward: recipe.reward || {}, effectLabel: recipe.effectLabel };
}

function equipAccessory(userState, accessoryId) {
  normalizeEquippedAccessories(userState);
  if (!accessoryId) {
    userState.equippedAccessories = {};
    userState.equippedAccessory = "";
    userState.game.mood = "액세서리를 모두 잠시 빼뒀어요";
    return { accessory: null, reward: "전체 해제" };
  }
  const accessory = (userState.accessories || []).find((item) => item.id === accessoryId);
  if (!accessory) {
    return { error: "보유한 액세서리가 아니에요" };
  }
  const recipe = accessoryById(accessory.id) || accessory;
  const slot = recipe.slot || "misc";
  if (userState.equippedAccessories[slot] === accessory.id) {
    delete userState.equippedAccessories[slot];
    normalizeEquippedAccessories(userState);
    userState.game.mood = `${accessory.name}을 잠시 빼뒀어요`;
    return { accessory, reward: "해제" };
  }
  const previousId = userState.equippedAccessories[slot];
  userState.equippedAccessories[slot] = accessory.id;
  normalizeEquippedAccessories(userState);
  userState.game.mood = previousId
    ? `${recipe.slotLabel || "장식"} 아이템을 ${accessory.name}으로 바꿨어요`
    : `${accessory.name} 장착 완료`;
  return { accessory, reward: previousId ? "교체" : "장착" };
}

function rewardForMission(missionItem, period) {
  const fallback = period === "monthly"
    ? { xp: 320, coin: 90, bond: 10, completion: 30 }
    : period === "weekly"
      ? { xp: 140, coin: 36, bond: 4, completion: 20 }
      : { xp: 35, coin: 12, bond: 2, completion: 14 };
  return { ...fallback, ...(missionItem.reward || {}) };
}

function missionSnapshotFromProof(proof = {}) {
  const period = ["daily", "weekly", "monthly"].includes(proof.missionPeriod) ? proof.missionPeriod : "daily";
  return {
    id: proof.missionId || proof.questId || proof.id || `proof-${Date.now()}`,
    period,
    type: String(proof.missionType || proof.type || "미션").trim().slice(0, 12) || "미션",
    title: String(proof.questTitle || proof.title || "이전 미션").trim().slice(0, 60) || "이전 미션",
    note: String(proof.note || "사진 인증").trim().slice(0, 160),
    reward: proof.missionReward || proof.reward || {},
  };
}

function groupDailyProgress(room = {}, periods = periodSnapshot()) {
  const dailyKey = periods.daily.key;
  const members = (Array.isArray(room.members) ? room.members : [])
    .filter((member) => member?.userId)
    .map((member) => normalizeMemberSnapshot(member.snapshot || member));
  let done = 0;
  let total = 0;
  for (const snapshot of members) {
    const dailyMissions = (snapshot.missions || []).filter((mission) => {
      if ((mission.period || "daily") !== "daily") {
        return false;
      }
      return !mission.snapshotKey || mission.snapshotKey === dailyKey;
    });
    total += dailyMissions.length;
    done += dailyMissions.filter((mission) => mission.state === "done").length;
  }
  const target = total > 0 ? Math.max(1, Math.ceil(total * 0.8)) : 0;
  const rate = total > 0 ? Math.round((done / total) * 100) : 0;
  return {
    key: dailyKey,
    done,
    total,
    target,
    rate,
    memberCount: members.length,
    eligible: total > 0 && done >= target,
  };
}

function groupAttendanceProgress(room = {}, currentUserState = null, periods = periodSnapshot()) {
  const dailyKey = periods.daily.key;
  const members = Array.isArray(room.members) ? room.members.filter((member) => member?.userId) : [];
  const attendedIds = new Set();
  for (const member of members) {
    const snapshot = normalizeMemberSnapshot(member.snapshot || member);
    if (snapshot.attendanceLastKey === dailyKey) {
      attendedIds.add(member.userId);
    }
  }
  if (currentUserState?.userId) {
    const attendance = normalizeAttendance(currentUserState.game || {});
    if (attendance.lastKey === dailyKey) {
      attendedIds.add(currentUserState.userId);
    }
  }
  const target = 3;
  return {
    key: dailyKey,
    done: attendedIds.size,
    total: members.length,
    target,
    rate: Math.min(100, Math.round((attendedIds.size / target) * 100)),
    eligible: attendedIds.size >= target,
  };
}

function roomStreakProgress(room = {}, now = new Date()) {
  const created = new Date(room.createdAt || "");
  const ageDays = Number.isNaN(created.getTime())
    ? 0
    : Math.max(1, Math.floor((now.getTime() - created.getTime()) / (24 * 60 * 60 * 1000)) + 1);
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

function clearLastCompletedMission(userState, body = {}) {
  const lastMission = userState?.game?.lastCompletedMission;
  if (!lastMission) {
    return false;
  }
  const requestedId = String(body.missionId || body.completedMissionId || "").trim();
  const requestedAt = String(body.completedAt || "").trim();
  const idMatches = !requestedId || requestedId === String(lastMission.id || "");
  const timeMatches = !requestedAt || requestedAt === String(lastMission.completedAt || "");
  if (!idMatches || !timeMatches) {
    return false;
  }
  userState.game.lastCompletedMission = null;
  return true;
}

function rewardSummary(reward, userState) {
  if (Number(userState?.game?.lastLevelUp || 0) > 0) {
    const unlockedActions = Array.isArray(userState.game.lastUnlockedPetActions)
      ? userState.game.lastUnlockedPetActions
      : [];
    if (unlockedActions.length > 0) {
      const names = unlockedActions.map((action) => action.label).filter(Boolean).slice(0, 2).join(", ");
      return `Lv.${userState.game.level} · ${names} 열림`;
    }
    return `Lv.${userState.game.level} 달성`;
  }
  const parts = [];
  if (Number(userState?.game?.lastCoinBonus || 0) > 0) {
    parts.push(`컨디션 보너스 +${userState.game.lastCoinBonus}코인`);
  }
  const stats = reward.stats || {};
  if (stats.power) {
    parts.push(`체력 +${stats.power}`);
  }
  if (stats.will) {
    parts.push(`의지 +${stats.will}`);
  }
  if (stats.focus) {
    parts.push(`집중 +${stats.focus}`);
  }
  if (stats.skill) {
    parts.push(`기술 +${stats.skill}`);
  }
  if (reward.health) {
    parts.push(`컨디션 +${reward.health}`);
  }
  if (parts.length === 0 && reward.xp) {
    parts.push(`XP +${reward.xp}`);
  }
  if (parts.length === 0 && reward.coin) {
    parts.push(`코인 +${reward.coin}`);
  }
  if (parts.length === 0 && reward.bond) {
    parts.push(`우정 +${reward.bond}`);
  }
  if (parts.length > 0) {
    return parts.slice(0, 2).join(" ");
  }
  return "+XP";
}

function petActionById(actionId) {
  return petActionCatalog.find((action) => action.id === actionId);
}

function petActionPublicState(userState, action) {
  normalizeCharacterCollection(userState);
  const active = userState.characters?.find((character) => character.id === userState.character?.id) || userState.character || {};
  const level = Math.max(1, Math.floor(Number(active.level || userState.game?.level || 1)));
  const log = normalizePetActions({ petActions: active.petActions });
  const count = Math.max(0, Math.floor(Number(log.counts?.[action.id] || 0)));
  return {
    id: action.id,
    label: action.label,
    unlockLevel: action.unlockLevel,
    dailyLimit: action.dailyLimit,
    count,
    left: Math.max(0, action.dailyLimit - count),
    unlocked: level >= action.unlockLevel,
    reward: action.reward,
  };
}

function performPetAction(userState, actionId) {
  userState.game = normalizeGrowth(userState.game || {});
  normalizeCharacterCollection(userState);
  const action = petActionById(actionId);
  if (!action) {
    return { error: "아직 없는 행동이에요" };
  }
  const activeIndex = userState.characters.findIndex((character) => character.id === userState.character?.id);
  const activePet = activeIndex >= 0 ? userState.characters[activeIndex] : userState.character;
  const level = Math.max(1, Math.floor(Number(activePet?.level || userState.game?.level || 1)));
  if (level < action.unlockLevel) {
    return { error: `Lv.${action.unlockLevel}부터 할 수 있어요`, action: petActionPublicState(userState, action) };
  }
  const log = normalizePetActions({ petActions: activePet?.petActions });
  const currentCount = Math.max(0, Math.floor(Number(log.counts[action.id] || 0)));
  if (currentCount >= action.dailyLimit) {
    return { error: `오늘 ${action.label}은 충분히 했어요`, action: petActionPublicState(userState, action) };
  }
  log.counts[action.id] = currentCount + 1;
  if (activePet) {
    activePet.petActions = log;
    if (activeIndex >= 0) {
      userState.characters[activeIndex] = activePet;
    }
    userState.character = { ...activePet };
  }
  userState.game.petActions = log;
  addReward(userState, action.reward, { applyPenalty: false });
  userState.game.petActions = log;
  userState.game.mood = action.mood;
  userState.messages ||= [];
  userState.messages.push({
    name: userState.character?.name || "펫",
    message: `${action.label} 완료! 오늘 ${log.counts[action.id]}/${action.dailyLimit}번 했어요.`,
    mine: false,
    createdAt: new Date().toISOString(),
  });
  userState.messages = userState.messages.slice(-30);
  return {
    action: petActionPublicState(userState, action),
    reward: action.reward,
    rewardText: rewardSummary(action.reward, userState),
  };
}

function isHealthyMission(missionItem) {
  const text = `${missionItem.type || ""} ${missionItem.title || ""} ${missionItem.note || ""}`;
  return /운동|건강|기상|수면|식사|물/.test(text);
}

function createPetShare(userState, moodTag = "proud", context = {}) {
  const moodMap = {
    daily: { label: "오늘의 한마디", text: "오늘도 한 칸 움직였어요." },
    proud: { label: "좋았어요", text: "오늘 잘 된 일을 그룹에 남겼어요." },
    tired: { label: "힘들어요", text: "조금 지친 날이라 상태만 살짝 알려요." },
    help: { label: "응원받기", text: "미션을 밀어줄 친구 응원을 불렀어요." },
    flex: { label: "자랑하기", text: "잘한 순간을 반짝 기록으로 보여줘요." },
  };
  const mood = moodMap[moodTag] || moodMap.proud;
  const missionTitle = String(context.missionTitle || "").trim().slice(0, 80);
  const missionType = String(context.missionType || "").trim().slice(0, 20);
  const customMessage = String(context.message || context.note || context.todayLine || "").trim().slice(0, 80);
  const shareMessage = missionTitle
    ? `${missionTitle} 성공! 펫이 성공 포즈로 반짝이는 중이에요.`
    : customMessage || mood.text;
  const stats = { ...defaultStats(), ...(userState.game.stats || {}) };
  const accessoryIds = equippedAccessoryIds(userState);
  const accessoryNames = equippedAccessoryNames(userState);
  return {
    id: `share-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    author: userState.profile?.nickname || "나",
    petName: sanitizePetName(userState.profile?.petName || userState.character?.name, "아기 펫"),
    rarity: userState.character?.rarityLabel || userState.character?.rarity || "레어",
    characterId: userState.character?.id || "tori",
    accessoryId: accessoryIds[0] || "",
    accessoryIds,
    equippedAccessories: userState.equippedAccessories || {},
    paletteId: normalizePetPaletteId(userState.character?.paletteId || userState.petPalette),
    accessoryName: accessoryNames.join(", "),
    moodTag,
    moodLabel: mood.label,
    message: shareMessage,
    missionTitle,
    missionType,
    pose: missionTitle ? "success" : moodTag,
    petMood: userState.game.mood || "그룹을 기다리는 중",
    completion: Number(userState.game.completion || 0),
    health: Number(userState.game.health || 0),
    stats,
    reactions: { cheer: 0, cute: 0, proud: 0 },
    createdAt: new Date().toISOString(),
  };
}

function socialRewardText(unlocked = [], fallback = "+우정") {
  if (unlocked.length > 0) {
    return `${unlocked[0].title} 달성`;
  }
  return fallback;
}

async function handleApi(request, response, pathname) {
  if (request.method === "GET" && pathname === "/api/manifest.webmanifest") {
    sendText(
      response,
      200,
      "application/manifest+json; charset=utf-8",
      JSON.stringify(manifestForPet(request)),
      "no-store",
    );
    return;
  }

  const iconMatch = pathname.match(/^\/api\/icon\/(180|192|512)\.png$/);
  if (request.method === "GET" && iconMatch) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const petId = url.searchParams.get("pet") || "tori";
    sendBuffer(
      response,
      200,
      "image/png",
      createPetIconPng(petId, Number(iconMatch[1])),
    );
    return;
  }

  await syncGlobalResetFromSupabase({ force: request.method === "GET" && pathname === "/api/state" });

  if (request.method === "GET" && pathname === "/api/calendar/wake.ics") {
    const userState = await getUserState(request, { forceRemote: true });
    sendCalendar(response, "godlife-wake-checkin.ics", buildWakeCalendarIcs(userState));
    return;
  }

  if (request.method === "GET" && pathname === "/api/push/public-key") {
    sendJson(response, 200, {
      publicKey: vapidPublicKey,
      supported: Boolean(webPush && vapidPublicKey && vapidPrivateKey),
    });
    return;
  }

  if (request.method === "GET" && pathname === "/api/state") {
    const userState = await getUserState(request, { forceRemote: true });
    if (consumeMissionDirty(userState)) {
      await persistUserState(userState, { syncRoom: false });
    }
    sendJson(response, 200, userState);
    return;
  }

  if (request.method === "GET" && pathname === "/api/admin/evolutions") {
    if (!process.env.ADMIN_KEY || request.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
      sendJson(response, 403, { error: "admin only" });
      return;
    }
    sendJson(response, 200, store.admin.hiddenEvolutions);
    return;
  }

  if (request.method === "POST" && pathname === "/api/reset") {
    if (!process.env.ADMIN_KEY || request.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
      sendJson(response, 403, { error: "admin only" });
      return;
    }
    const userId = getUserId(request);
    store.users[userId] = createUserState(userId);
    await persistUserState(store.users[userId]);
    sendJson(response, 200, store.users[userId]);
    return;
  }

  const userState = await getUserState(request);
  const body = await parseBody(request);

  if (request.method === "POST" && pathname === "/api/push/subscribe") {
    const subscription = normalizePushSubscription(body.subscription);
    if (!subscription) {
      sendJson(response, 400, { error: "알림 구독 정보를 저장하지 못했어요", state: userState });
      return;
    }
    userState.notifications = normalizeNotificationSettings({
      push: {
        enabled: true,
        subscription,
        updatedAt: new Date().toISOString(),
        platform: body.platform || "",
      },
    });
    userState.messages ||= [];
    userState.messages.push({
      name: "갓생",
      message: "알림이 켜졌어요. 필요한 소식만 살짝 알려드릴게요.",
      mine: false,
      createdAt: new Date().toISOString(),
    });
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: "앱 알림 켜짐" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/push/unsubscribe") {
    userState.notifications = normalizeNotificationSettings({
      push: {
        enabled: false,
        subscription: null,
        updatedAt: new Date().toISOString(),
      },
    });
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: "앱 알림 꺼짐" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/push/test") {
    const result = await sendPushToState(userState, pushPayload(
      "test",
      "작은 알림이 도착했어요",
      `${userState.profile?.nickname || "루틴러"}님, 미션 소식 받을 준비가 됐어요.`,
      { url: "/", tag: "godlife-test" },
    ));
    if (!result.ok) {
      sendJson(response, 400, { error: "알림을 보낼 수 없어요. 홈 화면 앱에서 다시 켜 주세요.", state: userState, result });
      return;
    }
    sendJson(response, 200, { state: userState, reward: "테스트 알림 전송" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/login") {
    const nickname = String(body.nickname || "").trim().slice(0, 12);
    const loginToken = loginTokenFromRequest(request, body);
    if (!nickname) {
      sendJson(response, 400, { error: "닉네임을 입력해 주세요" });
      return;
    }
    userState.profile ||= defaultProfile();
    const sameNickname = normalizeNickname(userState.profile.nickname) === normalizeNickname(nickname);
    if (!sameNickname || !userState.profile.completed) {
      const previousState = await findUserStateByNickname(nickname);
      if (previousState && (!sameNickname || previousState.profile?.completed)) {
        previousState.userId = userState.userId;
        normalizeUserState(previousState, userState.userId);
        for (const key of Object.keys(userState)) {
          delete userState[key];
        }
        Object.assign(userState, previousState);
      }
    }
    if (loginToken) {
      userState.profile ||= defaultProfile();
      userState.profile.loginToken = loginToken;
    }
    ensureStarterCoin(userState);
    const firstLogin = !userState.profile.nickname || userState.profile.nickname === "루틴러";
    userState.profile.nickname = nickname;
    userState.messages ||= [];
    if (firstLogin) {
      userState.messages.unshift({
        name: "토리",
        message: `${nickname} 닉네임으로 입장했어요. 목표 설정은 프로필에서 천천히 해도 돼요.`,
        mine: false,
        createdAt: new Date().toISOString(),
      });
      userState.messages = userState.messages.slice(0, 30);
    }
    userState.game.mood = `${nickname}님, 오늘도 루틴 펫이 기다리고 있어요.`;
    syncGachaOdds(userState);
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: "입장 완료" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/profile") {
    const hadCompletedProfile = Boolean(userState.profile?.completed);
    const starterId = hadCompletedProfile ? userState.profile?.starterId || "tori" : body.starterId;
    const starter = chooseStarter(starterId, userState.profile?.starterId || "tori");
    const currentNickname = String(userState.profile?.nickname || "").trim().slice(0, 12);
    const requestedNickname = String(body.nickname || currentNickname || "루틴러").trim().slice(0, 12);
    if (currentNickname && normalizeNickname(requestedNickname) !== normalizeNickname(currentNickname)) {
      sendJson(response, 409, { error: "닉네임은 계정명이라 바꿀 수 없어요. 펫 이름은 자유롭게 바꿀 수 있어요." });
      return;
    }
    const finalGoal = String(body.finalGoal || "갓생 루틴 만들기").trim().slice(0, 80);
    const routineDraft = normalizeRoutinePrompt(body.routineDraft || body.routinePrompt);
    const routinePrompt = normalizeRoutinePrompt(body.routinePrompt || routineDraft);
    const inferredProfile = { finalGoal, routinePrompt };
    const inferredLimits = inferTemptationLimitsFromProfile(inferredProfile);
    const petName = sanitizePetName(body.petName || userState.profile?.petName, starter.name);
    const profile = {
      completed: true,
      nickname: currentNickname || requestedNickname,
      loginToken: normalizeLoginToken(userState.profile?.loginToken) || loginTokenFromRequest(request, body),
      petName,
      finalGoal,
      routineDraft,
      routinePrompt,
      targetPeriod: String(body.targetPeriod || "3개월").trim().slice(0, 20),
      wakeTime: String(body.wakeTime || "6시 20분").trim().slice(0, 20),
      focusArea: resolveFocusArea(body.focusArea, inferredProfile),
      difficulty: ["easy", "normal", "hard"].includes(body.difficulty) ? body.difficulty : "normal",
      proofStyle: "friend",
      theme: validThemes.has(body.theme) ? body.theme : userState.profile?.theme || "default",
      starterId: starter.id,
      temptationLimits: normalizeTemptationLimits({
        party: body.temptationLimits?.party ?? body.party ?? body.partyLimit ?? body.drink ?? body.drinkLimit ?? inferredLimits.party,
        game: body.temptationLimits?.game ?? body.game ?? body.gameLimit ?? inferredLimits.game,
      }),
    };
    userState.profile = profile;
    if (!hadCompletedProfile) {
      userState.character = normalizeCharacterProgress(starter.id);
      userState.characters = [userState.character];
    }
    userState.character.name = profile.petName;
    normalizeCharacterCollection(userState);
    const periods = periodSnapshot();
    userState.missions = createMissions(profile, periods);
    const generatedDaily = await generateQuests({
      profile,
      goal: profile.finalGoal,
      routinePrompt: profile.routinePrompt,
      period: "daily",
      count: 4,
      baseMissions: userState.missions.daily.items,
    });
    const usedAiMissions = applyGeneratedDailyMissions(userState.missions.daily, generatedDaily);
    userState.quests = userState.missions.daily.items;
    userState.proofs = [];
    userState.shares ||= [];
    userState.achievements = normalizeAchievements(userState.achievements || []);
    if (!hadCompletedProfile) {
      ensureStarterCoin(userState);
      userState.game.temptations = defaultTemptationLog();
      userState.messages = [{ name: "토리", message: `${profile.nickname}에게 맞춘 기간별 미션을 준비했어.`, mine: false }];
      userState.game.mood = usedAiMissions ? "AI 맞춤 미션이 도착했어요" : "개인화 미션이 도착했어요";
    } else {
      userState.messages ||= [];
      userState.messages.push({
        name: userState.character?.name || "펫",
        message: "프로필 수정에 맞춰 새 미션을 다시 준비했어.",
        mine: false,
        createdAt: new Date().toISOString(),
      });
      userState.game.mood = usedAiMissions ? "AI가 수정한 루틴에 맞춰 미션을 바꿨어요" : "수정한 루틴에 맞춰 미션이 바뀌었어요";
    }
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: hadCompletedProfile ? "미션 갱신" : "프로필 저장" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/temptations") {
    const requestedType = body.type === "drink" ? "party" : body.type;
    const type = temptationRules[requestedType] ? requestedType : "game";
    const rule = temptationRules[type];
    const log = syncTemptationLog(userState, periodSnapshot().weekly.key);
    const previousCount = clampInt(log.counts[type], 0, 0, 99);
    log.counts[type] = clampInt(log.counts[type], 0, 0, 99) + 1;
    const count = log.counts[type];
    const limit = log.limits[type];
    const crossedLimit = previousCount <= limit && count > limit;
    let reward = "자기관리 기록";

    if (count > limit) {
      const healthPenalty = crossedLimit ? rule.health : Math.max(3, Math.ceil(rule.health / 2));
      userState.game.penalty = Math.min(60, Number(userState.game.penalty || 0) + rule.value);
      userState.game.penaltyReason = type;
      userState.game.health = Math.max(0, Math.round(Number(userState.game.health ?? 50)) - healthPenalty);
      userState.game.mood = `${rule.label} 기준 ${limit}회 초과. 컨디션 -${healthPenalty}, 다음 미션 보상이 줄어들어요`;
      reward = `컨디션 -${healthPenalty} · 보상 -${rule.value}%`;
    } else {
      const left = Math.max(0, limit - count);
      userState.game.mood = `${rule.label} ${count}/${limit}회 기록. 기준을 넘기 전까지 패널티 없어요`;
      reward = left > 0 ? `${left}회 남음` : "기준 도달 · 패널티 없음";
    }
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward });
    return;
  }

  if (request.method === "POST" && pathname === "/api/pet/feed") {
    userState.game = normalizeGrowth(userState.game || {});
    normalizeCharacterCollection(userState);
    const activeIndex = (userState.characters || []).findIndex((item) => item.id === userState.character?.id);
    if (activeIndex < 0) {
      sendJson(response, 400, { error: "밥을 줄 펫을 찾지 못했어요", state: userState });
      return;
    }
    const feedLog = accountFeedLogFromUserState(userState);
    const now = Date.now();
    if (feedLog.count >= feedDailyLimit) {
      applyAccountFeedLog(userState, feedLog);
      syncGameProgressFromCharacter(userState, userState.characters[activeIndex] || userState.character);
      syncMissions(userState);
      sendJson(response, 429, {
        error: "오늘 밥은 3번 다 먹었어요. 내일 다시 챙겨줘요",
        state: userState,
      });
      return;
    }
    const previousHealth = Number(userState.game.health || 0);
    const fedAt = new Date(now).toISOString();
    const currentFeedLog = applyAccountFeedLog(userState, {
      ...feedLog,
      count: feedLog.count + 1,
      limit: feedDailyLimit,
      unlimited: false,
      lastFedAt: fedAt,
    });
    const activePet = userState.characters[activeIndex];
    userState.character = { ...activePet };
    syncGameProgressFromCharacter(userState, activePet);
    addReward(userState, { health: 8 }, { applyPenalty: false, applyHealthyCoinBonus: false });
    const healthGain = Math.max(0, Number(userState.game.health || 0) - previousHealth);
    userState.game.mood = healthGain > 0
      ? `냠냠! ${userState.profile?.petName || "펫"} 컨디션이 ${healthGain} 올랐어요`
      : `냠냠! ${userState.profile?.petName || "펫"} 컨디션이 가득해요`;
    userState.messages ||= [];
    userState.messages.push({
      name: userState.character?.name || "펫",
      message: `밥 맛있게 먹었어. 오늘 ${currentFeedLog.count}/${feedDailyLimit}번 챙겼어!`,
      mine: false,
      createdAt: currentFeedLog.lastFedAt,
    });
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, {
      state: userState,
      reward: healthGain > 0 ? `컨디션 +${healthGain}` : "컨디션 가득",
    });
    return;
  }

  if (request.method === "POST" && pathname === "/api/pet/action") {
    const result = performPetAction(userState, String(body.actionId || body.type || ""));
    if (result.error) {
      syncMissions(userState);
      sendJson(response, 400, { error: result.error, state: userState, action: result.action });
      return;
    }
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, {
      state: userState,
      reward: result.rewardText,
      action: result.action,
    });
    return;
  }

  if (request.method === "POST" && pathname === "/api/pet/share") {
    const share = createPetShare(userState, body.moodTag, {
      missionTitle: body.missionTitle || body.questTitle,
      missionType: body.missionType || body.questType,
      message: body.message || body.note || body.todayLine,
    });
    share.userId = userState.userId;
    userState.shares.unshift(share);
    userState.shares = userState.shares.slice(0, 20);
    const activeRoom = await findGlobalRoomById(userState.activeRoomId);
    if (activeRoom && activeRoom.status !== "closed") {
      const roomShare = { ...share, roomId: activeRoom.id };
      activeRoom.shares ||= [];
      activeRoom.shares.unshift(roomShare);
      activeRoom.shares = activeRoom.shares.slice(0, 30);
      activeRoom.messages ||= [];
      activeRoom.messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        userId: userState.userId,
        name: share.author,
        message: share.missionTitle
          ? `${share.missionTitle} 성공 포즈를 공유했어요.`
          : `${share.petName} 오늘의 한마디를 남겼어요.`,
        shareId: share.id,
        createdAt: share.createdAt,
      });
      await persistRoom(activeRoom);
      attachRoomToUserState(userState, activeRoom);
    }
    userState.messages.push({
      name: "나",
      message: share.missionTitle
        ? `${share.petName} 성공 순간을 공유했어.`
        : `${share.petName} 오늘의 한마디를 남겼어.`,
      mine: true,
      shareId: share.id,
      createdAt: share.createdAt,
    });
    addReward(userState, { bond: 2, coin: 2 });
    userState.game.mood = share.missionTitle ? "미션 성공 포즈를 그룹에 공유했어요" : "오늘의 한마디를 그룹에 남겼어요";
    if (body.dismissLastCompleted) {
      clearLastCompletedMission(userState, body);
    }
    const unlocked = evaluateAchievements(userState);
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: socialRewardText(unlocked, "+2 우정"), share });
    return;
  }

  if (request.method === "POST" && pathname === "/api/pet/share-dismiss") {
    const changed = clearLastCompletedMission(userState, body);
    if (changed) {
      await persistUserState(userState);
    }
    sendJson(response, 200, { state: userState, reward: "" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/pet/react") {
    const activeRoom = await findGlobalRoomById(userState.activeRoomId);
    const share = userState.shares.find((item) => item.id === body.shareId);
    const roomShare = activeRoom?.shares?.find((item) => item.id === body.shareId) || null;
    if (!share && !roomShare) {
      sendJson(response, 404, { error: "share not found" });
      return;
    }
    const targetShare = roomShare || share;
    const targetOwnerId = String(targetShare.userId || "");
    const targetAuthor = String(targetShare.author || "").trim();
    const myName = String(userState.profile?.nickname || "").trim();
    if ((targetOwnerId && targetOwnerId === userState.userId) || (!targetOwnerId && targetAuthor && targetAuthor === myName)) {
      sendJson(response, 400, { error: "내 소식에는 직접 응원할 수 없어요", state: userState });
      return;
    }
    const reaction = reactionTypes[body.type] || reactionTypes.cheer;
    const reactionKey = reactionTypes[body.type] ? body.type : "cheer";
    const reactedAt = new Date().toISOString();
    const reactionTargets = [share, roomShare].filter(Boolean);
    const uniqueTargets = [...new Set(reactionTargets)];
    uniqueTargets.forEach((targetShare) => {
      targetShare.reactions ||= { cheer: 0, cute: 0, proud: 0 };
      targetShare.reactions[reactionKey] = Number(targetShare.reactions[reactionKey] || 0) + 1;
      targetShare.lastReactionAt = reactedAt;
    });
    if (activeRoom && roomShare) {
      activeRoom.messages ||= [];
      activeRoom.messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        userId: userState.userId,
        name: userState.profile?.nickname || "그룹원",
        message: reaction.message,
        shareId: roomShare.id,
        createdAt: reactedAt,
      });
      await persistRoom(activeRoom);
      attachRoomToUserState(userState, activeRoom);
    }
    const reactionSenderName = userState.profile?.nickname || "나";
    userState.messages.push({
      name: reactionSenderName,
      message: `${reaction.label} 반응을 보냈어요.`,
      mine: true,
      shareId: body.shareId,
      createdAt: reactedAt,
    });
    addReward(userState, { bond: 1, coin: 1 });
    userState.game.mood = `${reactionSenderName}님이 ${reaction.label} 반응을 보냈어요`;
    const unlocked = evaluateAchievements(userState);
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: socialRewardText(unlocked, "+1 우정") });
    return;
  }

  if (request.method === "POST" && pathname === "/api/group/reward") {
    const activeRoom = await findGlobalRoomById(userState.activeRoomId, { forceRemote: true });
    if (!activeRoom || activeRoom.status === "closed") {
      sendJson(response, 400, { error: "그룹 방에 들어가야 받을 수 있어요", state: userState });
      return;
    }
    const member = (activeRoom.members || []).find((item) => item.userId === userState.userId);
    if (!member) {
      sendJson(response, 403, { error: "같은 방의 그룹원만 받을 수 있어요", state: userState });
      return;
    }
    const rewardType = ["daily_box", "attendance", "room_streak"].includes(body.type) ? body.type : "daily_box";
    const progress = rewardType === "attendance"
      ? groupAttendanceProgress(activeRoom, userState)
      : rewardType === "room_streak"
        ? roomStreakProgress(activeRoom)
        : groupDailyProgress(activeRoom);
    if (!progress.eligible) {
      const label = rewardType === "attendance"
        ? "출석"
        : rewardType === "room_streak"
          ? "방 유지"
          : "그룹 진행률";
      sendJson(response, 400, {
        error: `오늘 ${label} ${progress.done}/${progress.target}예요`,
        state: userState,
        progress,
      });
      return;
    }
    activeRoom.dailyRewardClaims = normalizeRoomDailyRewardClaims(activeRoom.dailyRewardClaims);
    activeRoom.groupRewardClaims = normalizeRoomGroupRewardClaims(activeRoom.groupRewardClaims);
    activeRoom.effects = normalizeRoomEffects(activeRoom.effects);
    const claimBucket = rewardType === "daily_box"
      ? activeRoom.dailyRewardClaims
      : activeRoom.groupRewardClaims[rewardType === "room_streak" ? "room_streak" : "attendance"];
    const claimed = claimBucket[progress.key] || [];
    const alreadyText = rewardType === "attendance"
      ? "오늘 단체 출석 보상은 이미 받았어요"
      : rewardType === "room_streak"
        ? "방 유지 효과는 이미 받았어요"
        : "오늘 그룹 상자는 이미 받았어요";
    if (claimed.includes(userState.userId)) {
      attachRoomToUserState(userState, activeRoom);
      sendJson(response, 200, {
        state: userState,
        reward: alreadyText,
        already: true,
        progress,
      });
      return;
    }
    claimed.push(userState.userId);
    claimBucket[progress.key] = [...new Set(claimed)].slice(0, 12);
    if (rewardType === "room_streak") {
      activeRoom.effects.roomStreak = true;
      activeRoom.effects.roomStreakUnlockedAt ||= new Date().toISOString();
    }
    const reward = rewardType === "attendance"
      ? { coin: 15, bond: 1, health: 2 }
      : rewardType === "room_streak"
        ? { coin: 20, bond: 4, health: 3 }
        : { coin: 10, bond: 2, health: 2 };
    addReward(userState, reward, { applyPenalty: false });
    const rewardMessage = rewardType === "attendance"
      ? "그룹원 3명 출석 보상을 받았어요."
      : rewardType === "room_streak"
        ? "7일 방 유지 배경 효과를 열었어요."
        : "오늘 그룹 상자를 열었어요.";
    userState.game.mood = rewardType === "room_streak"
      ? "방 배경에 함께한 시간이 남았어요. 오래 가는 그룹은 힘이 세요."
      : `${rewardMessage} 같이 하니까 더 잘 굴러가요.`;
    const createdAt = new Date().toISOString();
    activeRoom.messages ||= [];
    activeRoom.messages.push({
      id: `group-reward-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      userId: userState.userId,
      name: userState.profile?.nickname || "그룹원",
      message: rewardMessage,
      createdAt,
    });
    updateRoomMemberSnapshot(activeRoom, userState);
    await persistRoom(activeRoom);
    attachRoomToUserState(userState, activeRoom);
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, {
      state: userState,
      reward: rewardType === "attendance"
        ? "단체 출석 +15코인"
        : rewardType === "room_streak"
          ? "방 배경 효과 해금"
          : "그룹 상자 +10코인",
      progress,
    });
    return;
  }

  if (request.method === "POST" && pathname === "/api/friend-rewards/claim") {
    userState.friendRewards = normalizeFriendRewards(userState.friendRewards);
    const rewardId = String(body.rewardId || body.id || "").trim();
    const friendReward = friendRewardById(rewardId);
    if (!friendReward) {
      sendJson(response, 404, { error: "우정 보상을 찾지 못했어요", state: userState });
      return;
    }
    if (userState.friendRewards.claimed.includes(friendReward.id)) {
      sendJson(response, 400, { error: "이미 받은 우정 보상이에요", state: userState });
      return;
    }
    const currentBond = Math.max(0, Math.floor(Number(userState.game?.bond || 0)));
    if (currentBond < friendReward.requiredBond) {
      sendJson(response, 400, {
        error: `우정 ${friendReward.requiredBond - currentBond} 더 필요해요`,
        state: userState,
      });
      return;
    }
    const result = grantFriendReward(userState, friendReward);
    syncMissions(userState);
    await persistUserState(userState, { syncRoom: false });
    sendJson(response, 200, { state: userState, reward: result.rewardText, friendReward });
    return;
  }

  if (request.method === "POST" && pathname === "/api/messages") {
    const presets = {
      응원: "오늘도 같이 가자. 인증 올리면 바로 봐줄게.",
      cheer: "오늘도 같이 가자. 인증 올리면 바로 봐줄게.",
      같이해: "나도 지금 시작할게. 30분만 같이 하자.",
      together: "나도 지금 시작할게. 30분만 같이 하자.",
      인정: "이건 인정. 꾸준히 한 게 보여.",
      approve: "이건 인정. 꾸준히 한 게 보여.",
    };
    const messageText = presets[body.type] || String(body.message || body.type || "").trim();
    if (!messageText) {
      sendJson(response, 400, { error: "message is required" });
      return;
    }
    const createdAt = new Date().toISOString();
    userState.messages.push({ name: "나", message: messageText, mine: true, createdAt });
    const activeRoom = await findGlobalRoomById(userState.activeRoomId);
    if (activeRoom && activeRoom.status !== "closed") {
      activeRoom.messages ||= [];
      activeRoom.messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        userId: userState.userId,
        name: userState.profile?.nickname || "나",
        message: messageText,
        createdAt,
      });
      await persistRoom(activeRoom);
      attachRoomToUserState(userState, activeRoom);
    }
    addReward(userState, { bond: 1 });
    userState.game.mood = "그룹에 마음을 보냈어요";
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: "+1 우정" });
    return;
  }

  const pokeMemberMatch = pathname.match(/^\/api\/members\/([^/]+)\/poke$/);
  if (request.method === "POST" && pokeMemberMatch) {
    const targetUserId = decodeURIComponent(pokeMemberMatch[1] || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
    if (!targetUserId || targetUserId === userState.userId) {
      sendJson(response, 400, { error: "찌를 그룹원을 찾지 못했어요", state: userState });
      return;
    }
    const activeRoom = await findGlobalRoomById(userState.activeRoomId, { forceRemote: true });
    if (!activeRoom || activeRoom.status === "closed") {
      sendJson(response, 400, { error: "그룹 방에 들어가야 찌르기를 보낼 수 있어요", state: userState });
      return;
    }
    const targetMember = (activeRoom.members || []).find((member) => member.userId === targetUserId);
    if (!targetMember) {
      sendJson(response, 404, { error: "같은 방의 그룹원만 찌를 수 있어요", state: userState });
      return;
    }
    const senderName = userState.profile?.nickname || "그룹원";
    const targetName = targetMember.name || "그룹원";
    const createdAt = new Date().toISOString();
    const treat = pokeTreatWord(`${senderName}:${targetName}:${createdAt}`);
    const treatObject = withObjectParticle(treat);
    const treatSubject = withSubjectParticle(treat);
    const message = `${senderName}님이 ${targetName}님에게 ${treatObject} 보냈어요.`;
    activeRoom.messages ||= [];
    activeRoom.messages.push({
      id: `poke-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      userId: userState.userId,
      name: senderName,
      message,
      createdAt,
    });
    const targetState = await getUserStateById(targetUserId);
    targetState.messages ||= [];
    targetState.messages.push({
      name: senderName,
      message: `${senderName}님이 ${treatObject} 보냈어요. 미션 하나만 살짝 해볼까요?`,
      mine: false,
      roomId: activeRoom.id,
      createdAt,
    });
    userState.messages ||= [];
    userState.messages.push({
      name: "나",
      message: `${targetName}님에게 ${treatObject} 보냈어요.`,
      mine: true,
      roomId: activeRoom.id,
      createdAt,
    });
    await sendPushToState(targetState, pushPayload(
      "poke",
      `${treatSubject} 도착했어요`,
      `${senderName}님이 ${treatObject} 보냈어요.`,
      { url: "/?panel=verify", tag: `poke-${activeRoom.id}-${userState.userId}`, badge: 1 },
    ));
    await persistRoom(activeRoom);
    attachRoomToUserState(targetState, activeRoom);
    await persistUserState(targetState);
    attachRoomToUserState(userState, activeRoom);
    addReward(userState, { bond: 1 }, { applyPenalty: false });
    userState.game.mood = `${targetName}님에게 ${treatObject} 보냈어요. 살금살금 같이 가요.`;
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: "찌르기 전송" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/rooms") {
    const hostName = userState.profile?.nickname || "나";
    const members = [
      { userId: userState.userId, name: hostName, role: "host", status: "online", initial: initials(hostName) },
    ];
    const createdAt = new Date().toISOString();
    const room = normalizeRoom({
      id: `room-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      code: roomCode(),
      hostUserId: userState.userId,
      name: body.name,
    goal: body.goal || userState.profile?.finalGoal || "그룹원끼리 서로 루틴 인증하기",
      capacity: body.capacity,
      proofMode: body.proofMode,
      status: "open",
      createdAt,
      members: members.map((member) => (
        member.userId === userState.userId
          ? { ...member, snapshot: roomMemberSnapshot(userState) }
          : member
      )),
      messages: [{
        id: `msg-${Date.now()}`,
        userId: userState.userId,
        name: hostName,
        message: `${body.name || "루틴 인증방"} 방을 만들었어. 초대코드로 들어와줘.`,
        createdAt,
      }],
      proofs: [],
      shares: [],
    }, hostName);
    await persistRoom(room);
    attachRoomToUserState(userState, room);
    userState.messages.push({
      name: hostName,
      message: `${room.name} 방을 만들었어. 초대코드 ${room.code}로 그룹원을 부를 수 있어.`,
      mine: true,
      roomId: room.id,
      createdAt: room.createdAt,
    });
    addReward(userState, { bond: 2, coin: 2 });
    userState.game.mood = "그룹 인증방이 열렸어요";
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: "+2 우정" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/rooms/join") {
    const joinCode = String(body.code || "").replace(/[^A-Z0-9]/gi, "").toUpperCase();
    const room = await findGlobalRoomByCode(joinCode);
    if (!room || room.status === "closed") {
      sendJson(response, 404, { error: "방 코드를 찾을 수 없어요" });
      return;
    }
    const nickname = String(body.nickname || userState.profile?.nickname || "그룹원").trim().slice(0, 12);
    const existing = room.members.find((member) => member.userId === userState.userId);
    if (existing) {
      existing.name = nickname;
      existing.status = "online";
      existing.initial = initials(nickname);
      existing.snapshot = roomMemberSnapshot(userState);
    } else {
      const joinedCount = room.members.filter((member) => member.userId).length;
      const invitedSlot = room.members.find((member) => !member.userId);
      if (invitedSlot) {
        invitedSlot.userId = userState.userId;
        invitedSlot.name = nickname;
        invitedSlot.role = invitedSlot.role || "member";
        invitedSlot.status = "online";
        invitedSlot.initial = initials(nickname);
        invitedSlot.snapshot = roomMemberSnapshot(userState);
      } else if (joinedCount < room.capacity) {
        room.members.push({
          userId: userState.userId,
          name: nickname,
          role: "member",
          status: "online",
          initial: initials(nickname),
          snapshot: roomMemberSnapshot(userState),
        });
      } else {
        sendJson(response, 400, { error: "방 정원이 가득 찼어요" });
        return;
      }
    }
    room.messages ||= [];
    room.messages.push({
      id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      userId: userState.userId,
      name: nickname,
      message: `${nickname}님이 방에 들어왔어요.`,
      createdAt: new Date().toISOString(),
    });
    await persistRoom(room);
    attachRoomToUserState(userState, room);
    userState.messages ||= [];
    userState.messages.push({
      name: nickname,
      message: `${room.name} 방에 참가했어요.`,
      mine: true,
      roomId: room.id,
      createdAt: new Date().toISOString(),
    });
    userState.game.mood = "그룹 방에 연결됐어요";
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: "방 참가 완료" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/rooms/leave") {
    userState.rooms ||= [];
    const room = await findGlobalRoomById(userState.activeRoomId);
    if (!room || room.status === "closed") {
      userState.activeRoomId = "";
      userState.room = null;
      userState.rooms = userState.rooms.filter((item) => item.status !== "closed");
      syncMissions(userState);
      await persistUserState(userState);
      sendJson(response, 200, { state: userState, reward: "방 나가기 완료" });
      return;
    }

    const leftAt = new Date().toISOString();
    const leaverName = userState.profile?.nickname || "나";
    const removedProofIds = new Set(
      (room.proofs || [])
        .filter((proof) => proof.userId === userState.userId && proof.status !== "approved")
        .map((proof) => proof.id),
    );
    room.proofs = (room.proofs || []).filter((proof) => !removedProofIds.has(proof.id));
    userState.proofs = (userState.proofs || []).filter((proof) => !removedProofIds.has(proof.id));
    for (const proofId of removedProofIds) {
      for (const period of ["daily", "weekly", "monthly"]) {
        const missionItem = userState.missions?.[period]?.items?.find((item) => item.proofId === proofId || item.editRequestId === proofId);
        if (missionItem && (missionItem.state === "pending" || missionItem.state === "edit_pending")) {
          missionItem.state = "todo";
          missionItem.action = "요청";
          missionItem.proofId = "";
          missionItem.editRequestId = "";
        }
      }
    }

    room.members = (room.members || []).filter((member) => member.userId !== userState.userId);
    if (room.hostUserId === userState.userId) {
      const nextHost = room.members.find((member) => member.userId) || room.members[0] || null;
      room.hostUserId = nextHost?.userId || "";
      if (nextHost) {
        nextHost.role = "host";
      }
    }
    if (room.members.length === 0) {
      room.status = "closed";
      room.closedAt = leftAt;
    }
    room.messages ||= [];
    room.messages.push({
      id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      userId: userState.userId,
      name: leaverName,
      message: `${leaverName}님이 방에서 나갔어요.`,
      createdAt: leftAt,
    });
    await persistRoom(room);

    userState.activeRoomId = "";
    userState.room = null;
    userState.rooms = userState.rooms.filter((item) => item.id !== room.id);
    userState.messages ||= [];
    userState.messages.push({
      name: leaverName,
      message: `${room.name} 방에서 나갔어요.`,
      mine: true,
      roomId: room.id,
      createdAt: leftAt,
    });
    userState.game.mood = "그룹 방에서 나왔어요. 필요하면 새 방을 만들 수 있어요.";
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: "방 나가기 완료" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/rooms/close") {
    userState.rooms ||= [];
    const room = await findGlobalRoomById(userState.activeRoomId);
    if (!room) {
      sendJson(response, 400, { error: "닫을 방이 없어요", state: userState });
      return;
    }
    room.status = "closed";
    room.closedAt = new Date().toISOString();
    await persistRoom(room);
    userState.activeRoomId = "";
    userState.room = null;
    userState.messages.push({
      name: userState.profile?.nickname || "나",
      message: `${room.name} 방을 닫았어. 필요하면 새 방을 만들 수 있어.`,
      mine: true,
      roomId: room.id,
      createdAt: room.closedAt,
    });
    userState.game.mood = "방을 정리했어요";
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, reward: "방 닫기 완료" });
    return;
  }

  if (request.method === "POST" && pathname === "/api/attendance/claim") {
    const result = claimAttendanceReward(userState);
    syncMissions(userState);
    if (!result.already) {
      await persistUserState(userState);
    }
    sendJson(response, 200, {
      state: userState,
      attendance: result.attendance,
      reward: result.rewardText,
      already: result.already,
    });
    return;
  }

  if (request.method === "POST" && pathname === "/api/gacha/draw") {
    const result = drawGacha(userState);
    if (result.error) {
      sendJson(response, 400, { error: result.error, state: userState });
      return;
    }
    syncGachaOdds(userState);
    syncMissions(userState);
    await persistUserState(userState, { syncRoom: false });
    sendJson(response, 200, { state: userState, reward: `${result.prize.name} 획득`, prize: result.prize });
    return;
  }

  if (request.method === "POST" && pathname === "/api/pets/draw") {
    const result = drawCharacter(userState);
    if (result.error) {
      sendJson(response, 400, { error: result.error, state: userState });
      return;
    }
    syncMissions(userState);
    await persistUserState(userState, { syncRoom: false });
    sendJson(response, 200, { state: userState, reward: `${result.character.name} 등장`, character: result.character });
    return;
  }

  if (request.method === "POST" && pathname === "/api/pets/equip") {
    const result = equipCharacter(userState, String(body.characterId || ""));
    if (result.error) {
      sendJson(response, 400, { error: result.error, state: userState });
      return;
    }
    syncMissions(userState);
    await persistUserState(userState, { syncRoom: false });
    sendJson(response, 200, { state: userState, reward: "대표 펫 변경", character: result.character });
    return;
  }

  if (request.method === "POST" && pathname === "/api/pets/palette") {
    const result = changePetPalette(userState, String(body.paletteId || ""));
    if (result.error) {
      sendJson(response, 400, { error: result.error, state: userState });
      return;
    }
    syncMissions(userState);
    await persistUserState(userState, { syncRoom: false });
    sendJson(response, 200, {
      state: userState,
      reward: result.unchanged ? "이미 선택한 색상" : "색상 변경 완료",
      paletteId: result.paletteId,
    });
    return;
  }

  if (request.method === "POST" && pathname === "/api/inventory/use") {
    const result = useInventoryItem(userState, String(body.itemId || ""));
    if (result.error) {
      sendJson(response, 404, { error: result.error, state: userState });
      return;
    }
    syncMissions(userState);
    await persistUserState(userState, { syncRoom: false });
    const rewardText = Number(userState.game.lastLevelUp || 0) > 0
      ? rewardSummary(result.reward, userState)
      : result.effectLabel;
    sendJson(response, 200, { state: userState, reward: rewardText, item: result.item });
    return;
  }

  if (request.method === "POST" && pathname === "/api/accessories/craft") {
    const result = craftAccessory(userState, String(body.accessoryId || body.recipeId || ""));
    if (result.error) {
      sendJson(response, 400, { error: result.error, state: userState });
      return;
    }
    syncMissions(userState);
    await persistUserState(userState, { syncRoom: false });
    const rewardText = Number(userState.game.lastLevelUp || 0) > 0
      ? rewardSummary(result.reward, userState)
      : `${result.accessory.name} 제작`;
    sendJson(response, 200, { state: userState, reward: rewardText, accessory: result.accessory });
    return;
  }

  if (request.method === "POST" && pathname === "/api/accessories/equip") {
    const accessoryId = body.clear ? "" : String(body.accessoryId || "");
    const result = equipAccessory(userState, accessoryId);
    if (result.error) {
      sendJson(response, 400, { error: result.error, state: userState });
      return;
    }
    syncMissions(userState);
    await persistUserState(userState, { syncRoom: false });
    sendJson(response, 200, { state: userState, reward: result.reward, accessory: result.accessory });
    return;
  }

  if (request.method === "POST" && pathname === "/api/quests/generate") {
    const generated = await generateQuests({ ...body, profile: userState.profile });
    userState.missions.daily.items.push(...generated);
    userState.quests = userState.missions.daily.items;
    userState.game.mood = "새 미션이 도착했어요";
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, { state: userState, generated });
    return;
  }

  const proofApproveMatch = pathname.match(/^\/api\/proofs\/([^/]+)\/approve$/);
  if (request.method === "POST" && proofApproveMatch) {
    const proofId = decodeURIComponent(proofApproveMatch[1]);
    const activeRoom = await findGlobalRoomById(userState.activeRoomId, { forceRemote: true });
    if (!activeRoom || activeRoom.status === "closed") {
      sendJson(response, 400, { error: "참여 중인 그룹 방이 없어요", state: userState });
      return;
    }
    let proof = activeRoom.proofs?.find((item) => item.id === proofId);
    if (!proof) {
      const proofStates = await roomMemberStatesForProofSync(activeRoom, userState);
      if (mergePendingProofsIntoRoom(activeRoom, proofStates)) {
        await persistRoom(activeRoom);
        proof = activeRoom.proofs?.find((item) => item.id === proofId);
      }
    }
    if (!proof) {
      sendJson(response, 404, { error: "인증 요청을 찾을 수 없어요", state: userState });
      return;
    }
    if (!proof.userId) {
      sendJson(response, 400, { error: "요청자 정보가 없는 인증이에요", state: userState });
      return;
    }
    if (proof.userId === userState.userId) {
      sendJson(response, 400, { error: "그룹원이 확인해야 완료돼요", state: userState });
      return;
    }

    const approvalLockKey = `${activeRoom.id}:${proof.id}`;
    if (approvalLocks.has(approvalLockKey)) {
      sendJson(response, 409, { error: "이미 승인 처리 중이에요", state: userState });
      return;
    }
    approvalLocks.add(approvalLockKey);
    try {
    if (proof.status === "approved") {
      activeRoom.proofs = (activeRoom.proofs || []).filter((item) => item.id !== proof.id);
      await persistRoom(activeRoom);
      attachRoomToUserState(userState, activeRoom);
      sendJson(response, 200, { state: userState, reward: "이미 처리된 인증" });
      return;
    }

    const approvedAt = new Date().toISOString();
    const approverName = userState.profile?.nickname || "그룹원";
    const ownerState = await getUserStateById(proof.userId);
    const ownerName = ownerState.profile?.nickname || proof.author || "그룹원";
    const found = findMission(ownerState, proof.missionId || proof.questId);
    const proofMissionSnapshot = missionSnapshotFromProof(proof);
    const foundPeriod = found?.period || proofMissionSnapshot.period;
    const performedKey = String(proof.performedAt || "").slice(0, 10);
    const currentPeriodKey = foundPeriod === "daily" ? periodSnapshot().daily.key : "";
    const isLateDailyProof = proof.kind !== "mission_edit"
      && foundPeriod === "daily"
      && Boolean(performedKey && currentPeriodKey && performedKey !== currentPeriodKey);
    const isExpiredProof = !found || isLateDailyProof;
    const { missionItem, period } = isExpiredProof
      ? { missionItem: proofMissionSnapshot, period: proofMissionSnapshot.period }
      : found;
    const ownerProof = ownerState.proofs.find((item) => item.id === proof.id);

    if (isExpiredProof && proof.kind === "mission_edit") {
      activeRoom.proofs = (activeRoom.proofs || []).filter((item) => item.id !== proof.id);
      ownerState.proofs = (ownerState.proofs || []).filter((item) => item.id !== proof.id);
      activeRoom.messages ||= [];
      activeRoom.messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        userId: userState.userId,
        name: approverName,
        message: `${ownerName}의 지난 대체 미션 요청을 정리했어요.`,
        proofId: proof.id,
        createdAt: approvedAt,
      });
      syncMissions(ownerState);
      updateRoomMemberSnapshot(activeRoom, ownerState);
      await persistRoom(activeRoom);
      attachRoomToUserState(ownerState, activeRoom);
      await persistUserState(ownerState);
      attachRoomToUserState(userState, activeRoom);
      await persistUserState(userState);
      sendJson(response, 200, { state: userState, reward: "지난 요청 정리" });
      return;
    }

    const staleEditApproval = !isExpiredProof && proof.kind === "mission_edit"
      && (missionItem.state !== "edit_pending" || missionItem.editRequestId !== proof.id);
    const staleProofApproval = !isExpiredProof && proof.kind !== "mission_edit"
      && (missionItem.state === "done" || missionItem.proofId !== proof.id || ownerProof?.status === "approved");
    if (staleEditApproval || staleProofApproval) {
      activeRoom.proofs = (activeRoom.proofs || []).filter((item) => item.id !== proof.id);
      ownerState.proofs = (ownerState.proofs || []).filter((item) => item.id !== proof.id);
      syncMissions(ownerState);
      updateRoomMemberSnapshot(activeRoom, ownerState);
      await persistRoom(activeRoom);
      attachRoomToUserState(ownerState, activeRoom);
      await persistUserState(ownerState);
      attachRoomToUserState(userState, activeRoom);
      sendJson(response, 200, { state: userState, reward: "이미 처리된 인증" });
      return;
    }
    proof.status = "approved";
    proof.approvedAt = approvedAt;
    proof.approvedBy = userState.userId;
    proof.approverName = approverName;
    if (ownerProof) {
      ownerProof.status = "approved";
      ownerProof.approvedAt = approvedAt;
      ownerProof.approvedBy = userState.userId;
      ownerProof.approverName = approverName;
    }

    if (proof.kind === "mission_edit") {
      const proposed = proof.proposed || {};
      missionItem.type = String(proposed.type || missionItem.type || "미션").trim().slice(0, 12) || "미션";
      missionItem.title = String(proposed.title || missionItem.title || "대체 미션").trim().slice(0, 60) || "대체 미션";
      missionItem.note = String(proposed.note || missionItem.note || "그룹 승인된 대체 미션").trim().slice(0, 160);
      missionItem.state = "todo";
      missionItem.action = "요청";
      missionItem.editRequestId = "";
      missionItem.customized = true;
      missionItem.replacedAt = approvedAt;
      missionItem.replacedBy = userState.userId;
      activeRoom.proofs = (activeRoom.proofs || []).filter((item) => item.id !== proof.id);
      ownerState.proofs = (ownerState.proofs || []).filter((item) => item.id !== proof.id);
      activeRoom.messages ||= [];
      activeRoom.messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        userId: userState.userId,
        name: approverName,
        message: `${ownerName}의 대체 미션 "${missionItem.title}"을 승인했어요.`,
        proofId: proof.id,
        createdAt: approvedAt,
      });
      ownerState.messages.push({
        name: approverName,
        message: `대체 미션 "${missionItem.title}"이 승인됐어요.`,
        mine: false,
        proofId: proof.id,
        roomId: activeRoom.id,
        createdAt: approvedAt,
      });
      ownerState.game.mood = "대체 미션이 승인됐어요. 이제 이 미션으로 진행해요.";
      syncMissions(ownerState);
      updateRoomMemberSnapshot(activeRoom, ownerState);
      await persistRoom(activeRoom);
      await persistUserState(ownerState);
      addReward(userState, { bond: 1, coin: 1 }, { applyPenalty: false });
      userState.game.mood = "그룹원의 대체 미션을 승인했어요.";
      syncMissions(userState);
      await persistUserState(userState);
      sendJson(response, 200, { state: userState, reward: "대체 미션 승인" });
      return;
    }

    let reward = null;
    if (isExpiredProof || missionItem.state !== "done") {
      reward = rewardForMission(missionItem, period);
      if (!isExpiredProof) {
        missionItem.state = "done";
        missionItem.action = "완료";
        missionItem.proofId = "";
        missionItem.completedAt = approvedAt;
        missionItem.approvedBy = userState.userId;
        missionItem.approverName = approverName;
      } else if (isLateDailyProof && found?.missionItem?.proofId === proof.id) {
        found.missionItem.state = "todo";
        found.missionItem.action = "요청";
        found.missionItem.proofId = "";
        found.missionItem.requestedAt = "";
      }
      addReward(ownerState, reward);
      ownerState.game.lastCompletedMission = {
        id: missionItem.id,
        title: missionItem.title,
        type: missionItem.type,
        period,
        completedAt: approvedAt,
      };
      ownerState.game.mood = isExpiredProof
        ? "지난 인증이 확인됐어요. 늦게 도착한 칭찬도 잘 챙겼어요."
        : isHealthyMission(missionItem)
        ? "그룹 인증 완료. 건강 루틴이 펫을 더 튼튼하게 만들었어요."
        : "그룹 인증 완료. 미션 보상을 받았어요.";
      if (!isExpiredProof) {
        updateDailyStreak(ownerState);
      }
    }
    ownerState.messages.push({
      name: approverName,
      message: `${missionItem.title} 인증을 확인했어요.`,
      mine: false,
      proofId: proof.id,
      roomId: activeRoom.id,
      createdAt: approvedAt,
    });

    activeRoom.proofs = (activeRoom.proofs || []).filter((item) => item.id !== proof.id);
    ownerState.proofs = (ownerState.proofs || []).filter((item) => item.id !== proof.id);
    activeRoom.messages ||= [];
    activeRoom.messages.push({
      id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      userId: userState.userId,
      name: approverName,
      message: `${ownerName}의 ${missionItem.title} 인증을 승인했어요.`,
      proofId: proof.id,
      createdAt: approvedAt,
    });
    syncMissions(ownerState);
    updateRoomMemberSnapshot(activeRoom, ownerState);
    await sendPushToState(ownerState, pushPayload(
      "proof-approved",
      "그룹 인증 완료",
      `${missionItem.title} 인증이 확인됐어요.`,
      { url: "/?panel=verify", tag: `approved-${proof.id}`, badge: 1 },
    ));
    await persistRoom(activeRoom);
    attachRoomToUserState(ownerState, activeRoom);
    await persistUserState(ownerState);

    attachRoomToUserState(userState, activeRoom);
    userState.messages.push({
      name: approverName,
      message: `${ownerName} 인증을 확인했어요.`,
      mine: true,
      proofId: proof.id,
      roomId: activeRoom.id,
      createdAt: approvedAt,
    });
    addReward(userState, { bond: 1, coin: 1 }, { applyPenalty: false });
    userState.game.mood = "그룹 인증을 도와줬어요. 같이 키우는 느낌이 살아났어요.";
    syncMissions(userState);
    await persistUserState(userState);
    sendJson(response, 200, {
      state: userState,
      reward: isExpiredProof ? "지난 인증 확인" : reward ? "그룹 인증 완료" : "이미 완료된 인증",
    });
    return;
    } finally {
      approvalLocks.delete(approvalLockKey);
    }
  }

  const questMatch = pathname.match(/^\/api\/quests\/([^/]+)\/(request|approve|link|edit-request)$/);
  if (request.method === "POST" && questMatch) {
    const [, id, action] = questMatch;
    const found = findMission(userState, id);
    if (!found) {
      sendJson(response, 404, { error: "mission not found" });
      return;
    }
    const { missionItem, period } = found;

    if (action === "edit-request") {
      if (missionItem.state === "done") {
        sendJson(response, 400, { error: "이미 완료한 미션은 바꿀 수 없어요", state: userState });
        return;
      }
      const activeRoom = await findGlobalRoomById(userState.activeRoomId);
      if (!activeRoom || activeRoom.status === "closed") {
        sendJson(response, 400, { error: "그룹 방을 먼저 만들거나 참가해야 대체 미션을 제안할 수 있어요", state: userState });
        return;
      }
      const proposed = {
        type: String(body.type || missionItem.type || "미션").trim().slice(0, 12) || "미션",
        title: String(body.title || "").trim().slice(0, 60),
        note: String(body.note || "").trim().slice(0, 160),
      };
      if (!proposed.title) {
        sendJson(response, 400, { error: "새 미션 제목을 입력해 주세요", state: userState });
        return;
      }
      if (!proposed.note) {
        proposed.note = "그룹원이 승인한 대체 미션으로 인증";
      }
      const requestedAt = new Date().toISOString();
      const proof = {
        id: `edit-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        kind: "mission_edit",
        userId: userState.userId,
        author: userState.profile?.nickname || "나",
        roomId: activeRoom.id,
        missionId: missionItem.id,
        missionPeriod: period,
        missionType: missionItem.type,
        missionReward: missionItem.reward || {},
        questId: missionItem.id,
        questTitle: missionItem.title,
        proposed,
        note: String(body.reason || "").trim().slice(0, 160),
        requestedAt,
        status: "pending",
      };
      userState.proofs.unshift(proof);
      userState.proofs = compactProofList(userState.proofs, { maxItems: maxUserProofs, maxPhotos: maxUserProofPhotos });
      activeRoom.proofs ||= [];
      activeRoom.proofs.unshift({ ...proof });
      activeRoom.proofs = compactProofList(activeRoom.proofs, { maxItems: maxRoomProofs, maxPhotos: maxRoomProofPhotos });
      activeRoom.messages ||= [];
      activeRoom.messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        userId: userState.userId,
        name: proof.author,
        message: `${missionItem.title} 대신 "${proposed.title}" 대체 미션 승인을 요청했어요.`,
        proofId: proof.id,
        createdAt: requestedAt,
      });
      await persistRoom(activeRoom);
      attachRoomToUserState(userState, activeRoom);
      missionItem.state = "edit_pending";
      missionItem.action = "승인대기";
      missionItem.editRequestId = proof.id;
      userState.messages.push({
        name: "나",
        message: `"${proposed.title}" 대체 미션 승인을 요청했어.`,
        mine: true,
        proofId: proof.id,
        createdAt: requestedAt,
      });
      userState.game.mood = "그룹에 대체 미션 승인을 요청했어요";
      await persistUserState(userState);
      sendJson(response, 200, { state: userState, reward: "대체 미션 요청" });
      return;
    }

    if (action === "request") {
      const proofPhoto = sanitizeIncomingProofPhoto(body.photo);
      const photo = proofPhoto.photo;
      if (!proofPhoto.ok) {
        sendJson(response, proofPhoto.status, { error: proofPhoto.error });
        return;
      }
      const activeRoom = await findGlobalRoomById(userState.activeRoomId);
      if (!activeRoom || activeRoom.status === "closed") {
        sendJson(response, 400, { error: "그룹 방을 먼저 만들거나 참가해야 인증 요청을 보낼 수 있어요", state: userState });
        return;
      }
      const proof = {
        id: `proof-${Date.now()}`,
        userId: userState.userId,
        author: userState.profile?.nickname || "나",
        roomId: userState.activeRoomId || "",
        missionId: missionItem.id,
        missionPeriod: period,
        missionType: missionItem.type,
        missionReward: missionItem.reward || {},
        questId: missionItem.id,
        questTitle: missionItem.title,
        note: String(body.note || "").trim().slice(0, 160),
        photo,
        location: null,
        performedAt: body.performedAt || periodSnapshot().daily.key,
        requestedAt: new Date().toISOString(),
        status: "pending",
      };
      userState.proofs.unshift(proof);
      userState.proofs = compactProofList(userState.proofs, { maxItems: maxUserProofs, maxPhotos: maxUserProofPhotos });
      const roomProof = { ...proof, roomId: activeRoom.id };
      activeRoom.proofs ||= [];
      const existingIndex = activeRoom.proofs.findIndex((item) => item.id === proof.id);
      if (existingIndex >= 0) {
        activeRoom.proofs[existingIndex] = roomProof;
      } else {
        activeRoom.proofs.unshift(roomProof);
      }
      activeRoom.proofs = compactProofList(activeRoom.proofs, { maxItems: maxRoomProofs, maxPhotos: maxRoomProofPhotos });
      activeRoom.messages ||= [];
      activeRoom.messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        userId: userState.userId,
        name: proof.author,
        message: `${missionItem.title} 인증을 올렸어요. 그룹 확인을 기다려요.`,
        proofId: proof.id,
        createdAt: proof.requestedAt,
      });
      await notifyRoomMembers(activeRoom, userState.userId, pushPayload(
        "proof-request",
        "그룹 인증 요청",
        `${proof.author} · ${missionItem.title}`,
        { url: "/?panel=verify", tag: `proof-${proof.id}`, badge: 1 },
      ));
      await persistRoom(activeRoom);
      attachRoomToUserState(userState, activeRoom);
      missionItem.state = "pending";
      missionItem.action = "검증중";
      missionItem.proofId = proof.id;
      userState.messages.push({
        name: "나",
        message: `${missionItem.title} 사진을 올렸어요. 확인해 주세요.`,
        mine: true,
        proofId: proof.id,
        createdAt: proof.requestedAt,
      });
      userState.game.mood = "그룹에 완료 요청을 보냈어요";
      syncMissions(userState);
      await persistUserState(userState);
      sendJson(response, 200, { state: userState, reward: "요청 완료" });
      return;
    }

    if (action === "approve") {
      sendJson(response, 400, {
        error: "그룹 인증 버튼으로만 완료할 수 있어요",
        state: userState,
      });
      return;
    }

    if (action === "link") {
      const label = String(body.label || "").trim().slice(0, 10);
      const url = normalizeUrl(body.url);
      if (!label || !url) {
        sendJson(response, 400, { error: "label and url are required" });
        return;
      }
      missionItem.links.push({ label, url });
      userState.game.mood = "미션 바로가기를 붙였어요";
      syncMissions(userState);
      await persistUserState(userState);
      sendJson(response, 200, { state: userState, reward: "링크 추가" });
      return;
    }
  }

  sendJson(response, 404, { error: "not found" });
}

function serveStatic(request, response, pathname) {
  const safePath = pathname === "/" ? "/index.html" : decodeURIComponent(pathname);
  const filePath = path.normalize(path.join(rootDir, safePath));

  if (!filePath.startsWith(rootDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    const body = ext === ".html" ? injectPwaIdentity(content.toString("utf8"), request) : content;
    response.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(body);
  });
}

async function requestListener(request, response) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(request, response, url.pathname);
      return;
    }
    serveStatic(request, response, url.pathname);
  } catch (error) {
    const statusCode = Number(error.statusCode || error.status || 500);
    sendJson(response, statusCode >= 400 && statusCode < 600 ? statusCode : 500, { error: error.message || "server error" });
  }
}

if (require.main === module) {
  const server = http.createServer(requestListener);
  server.listen(port, () => {
    console.log(`Godlife server running at http://localhost:${port}`);
  });
}

module.exports = requestListener;
