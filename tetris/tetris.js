const gameView = document.querySelector("#game-view");

let blockList = Array(240).fill(0);
const blockType = {
  0: [5, 6, 7, 8],
  1: [6, 17, 18, 19],
  2: [6, 7, 17, 18],
  3: [5, 6, 17, 18],
  4: [7, 17, 18, 19],
  5: [5, 17, 18, 19],
  6: [5, 6, 18, 19],
};
let activeBlock = blockType[Math.floor(Math.random() * 7)];
let filledBlock = [];
let validation = Array(240).fill(0);

// 초기 게임 화면 세팅
function startGame() {
  blockList.forEach((e, i) => {
    const item = document.createElement("div");
    item.id = `item${i}`;
    item.classList.add("item");
    gameView.appendChild(item);
  });
}

// acitiveBlock 보여줌
function renderActiveBlock() {
  blockList.forEach((e, i) => {
    const item = document.querySelector(`#item${i}`);
    if (e === 0 && item.classList.contains("active"))
      item.classList.remove("active");
  });

  activeBlock.forEach((e) => {
    const item = document.querySelector(`#item${e}`);
    if (!item.classList.contains("active")) item.classList.add("active");
  });
}

// 예정 방향으로 이동할 수 있는지 확인 (게임 화면을 벗어나거나 해당 위치에 블럭이 존재하면 이동 불가능)
// type: left, right, down
function validate(type) {
  let isFloor = 0;
  switch (type) {
    case "left":
      activeBlock.forEach(
        (e) => (isFloor += e % 12 === 0 || blockList[e - 1] === 1)
      );
      break;
    case "right":
      activeBlock.forEach(
        (e) => (isFloor += e % 12 === 11 || blockList[e + 1] === 1)
      );
      break;
    case "down":
      activeBlock.forEach(
        (e) => (isFloor += Math.floor(e / 12) === 19 || blockList[e + 12] === 1)
      );
  }

  return isFloor;
}

function renderGameView() {
  blockList.forEach((e, i) => {
    const item = document.querySelector(`#item${i}`);
    if (e === 1) item.classList.add("active");
  });
}

// activeBlock이 아래로 이동할 수 없으면 activeBlock을 blockList에 저장하고 다음 activeBlock 생성
// 게임 화면 재렌더링
function switchActiveBlock() {
  activeBlock.forEach((e) => (blockList[e] = 1));
  activeBlock = JSON.parse(
    JSON.stringify(blockType[Math.floor(Math.random() * 7)])
  );
  renderGameView();
}

function clearRow() {
  const sumRows = Array(20).fill(0);
  blockList.forEach((e, i) => {
    sumRows[Math.floor(i / 12)] += e;
  });

  let clearRows = [];
  sumRows.forEach((e, i) => {
    if (e === 12) {
      clearRows.push(i);
    }
  });
  clearRows.sort((a, b) => b - a);
  clearRows.forEach((e) => {
    blockList.splice(e * 12, 12);
  });
  const newRow = Array(12).fill(0);
  for (let i = 0; i < clearRows.length; i++) {
    blockList.unshift(...newRow);
  }
}

function rotateBlock() {
  const rotatedActiveBlock = [];
  let disable = 0;
  const base = activeBlock[2];
  activeBlock.forEach((e, i) => {
    let dist = base - e;
    // 좌우간 거리
    let horDist = dist;
    // 상하간 거리
    let perDist = 0;
    while (horDist > 3 || horDist < -3) {
      if (horDist > 0) {
        perDist++;
        horDist -= 12;
      } else {
        perDist--;
        horDist += 12;
      }
    }

    let rotation = activeBlock[i] + (-11 * horDist + 13 * perDist);
    if (rotation < 0 || rotation > 239) {
      disable = 1;
    }
    rotatedActiveBlock.push(rotation);
  });
  if (!disable) {
    activeBlock = JSON.parse(JSON.stringify(rotatedActiveBlock));
  }
}

// 방향키 event
function keyDownHandler(e) {
  if (e.key === 37 || e.key === "ArrowRight") {
    if (validate("right")) {
    } else {
      for (let i = 0; i < activeBlock.length; i++) {
        activeBlock[i]++;
      }
    }
  } else if (e.key === 39 || e.key === "ArrowLeft") {
    if (validate("left")) {
    } else {
      for (let i = 0; i < activeBlock.length; i++) {
        activeBlock[i]--;
      }
    }
  } else if (e.key === 38 || e.key === "ArrowUp") {
    rotateBlock();
  } else if (e.key === 40 || e.key === "ArrowDown") {
    if (validate("down")) {
      switchActiveBlock();
    } else {
      for (let i = 0; i < activeBlock.length; i++) {
        activeBlock[i] += 12;
      }
    }
  }
  clearRow();
  renderActiveBlock();
}

function init() {
  startGame();
  renderActiveBlock();
  let interval = setInterval(() => {
    if (validate("down")) {
      switchActiveBlock();
      clearRow();
      renderActiveBlock();
    } else {
      for (let i = 0; i < activeBlock.length; i++) {
        activeBlock[i] += 12;
      }
      clearRow();
      renderActiveBlock();
    }
  }, 1000);
}

document.addEventListener("keydown", keyDownHandler);

init();
