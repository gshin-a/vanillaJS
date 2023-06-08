const gameView = document.querySelector("#game-view");

const viewList = Array(20)
  .fill(0)
  .map(() => Array(12).fill(0));

const blockList = {
  0: [
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
  ],
  1: [
    [1, 5],
    [1, 6],
    [1, 7],
    [0, 6],
  ],
  2: [
    [1, 5],
    [1, 6],
    [0, 6],
    [0, 7],
  ],
  3: [
    [1, 5],
    [1, 6],
    [0, 5],
    [0, 6],
  ],
  4: [
    [1, 5],
    [1, 6],
    [1, 7],
    [0, 7],
  ],
  5: [
    [1, 5],
    [1, 6],
    [1, 7],
    [0, 5],
  ],
  6: [
    [1, 6],
    [1, 7],
    [0, 5],
    [0, 6],
  ],
};

let activeBlock = blockList[Math.floor(Math.random() * 7)];
let filledBlock = [];
let validation = Array(20 * 12).fill(0);

// activeBlock과 filledBlock은 1(색칠), 나머지는 0으로 view를 보여줌
function renderGameView(viewList) {
  gameView.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 12; j++) {
      viewList[i][j] = 0;
    }
  }
  activeBlock.forEach((e) => (viewList[e[0]][e[1]] = 1));
  filledBlock.forEach((e) => e.forEach((e) => (viewList[e[0]][e[1]] = 1)));
  viewList.forEach((e) =>
    e.forEach((e) => {
      const item = document.createElement("div");
      item.id = "item";
      if (e === 1) {
        item.classList.add("active");
      }
      gameView.appendChild(item);
    })
  );
}

// 방향키에 따라 acitveBlock 위치 조정하고 renderGameView 함수 실행
function keyDownHandler(e) {
  if (validateBlock(activeBlock)) {
    // clearInterval(interval);
    switchActiveBlock();
    return;
  }
  if (e.key === 37 || e.key === "ArrowRight") {
    for (let i = 0; i < activeBlock.length; i++) {
      activeBlock[i][1]++;
    }
  } else if (e.key === 39 || e.key === "ArrowLeft") {
    for (let i = 0; i < activeBlock.length; i++) {
      activeBlock[i][1]--;
    }
  } else if (e.key === 38 || e.key === "ArrowUp") {
    for (let i = 0; i < activeBlock.length; i++) {
      activeBlock[i][0]--;
    }
  } else if (e.key === 40 || e.key === "ArrowDown") {
    for (let i = 0; i < activeBlock.length; i++) {
      activeBlock[i][0]++;
    }
  }
  renderGameView(viewList);
}

// 맨 처음에 view를 보여줌
function startGame() {
  renderGameView(viewList);
}

// 기존의 acitiveBlock이 바닥에 닿아 이동 종료되고, 새로운 acitiveBlock이 생성됨
function switchActiveBlock() {
  activeBlock.forEach((e) => (validation[e[0] * 12 + e[1]] = 1));
  filledBlock.push(activeBlock);

  activeBlock = JSON.parse(
    JSON.stringify(blockList[Math.floor(Math.random() * 7)])
  );
}

// 입력된 block의 위치가 valition이 1이거나
// block의 y축 위치가 18을 넘으면 false 반환
// validation과 비교하는 방법: block 위치에서 first*12 + second === validation의 index
function validateBlock() {
  let isValid = 0;
  if (activeBlock[0][0] > 18) return (isValid = 1);
  activeBlock.forEach((e) => {
    if (validation[(e[0] + 1) * 12 + e[1]]) {
      return (isValid = 1);
    }
  });
  return isValid;
}

function init() {
  startGame();
  let interval = setInterval(() => {
    if (validateBlock(activeBlock)) {
      switchActiveBlock();
    } else {
      for (let i = 0; i < activeBlock.length; i++) {
        activeBlock[i][0]++;
      }
      renderGameView(viewList, interval);
    }
  }, 1000);
}

document.addEventListener("keydown", keyDownHandler);

init();
