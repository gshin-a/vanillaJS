const gameView = document.querySelector("#game-view");

const viewList = Array(20)
  .fill(0)
  .map(() => Array(12).fill(0));

let activeBlock = [0, 6];

function renderGameView(viewList) {
  gameView.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 12; j++) {
      viewList[i][j] = 0;
    }
  }
  viewList[activeBlock[0]][activeBlock[1]] = 1;
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

function keyDownHandler(e) {
  if (e.key === 37 || e.key === "ArrowRight") {
    console.log("오른쪽");
    activeBlock[1]++;
  } else if (e.key === 39 || e.key === "ArrowLeft") {
    console.log("왼쪽");
    activeBlock[1]--;
  } else if (e.key === 38 || e.key === "ArrowUp") {
    console.log("위쪽");
    activeBlock[0]--;
  } else if (e.key === 40 || e.key === "ArrowDown") {
    console.log("아래쪽");
    activeBlock[0]++;
  }
  viewList[activeBlock[0]][activeBlock[1]] = 1;
  renderGameView(viewList);
}

document.addEventListener("keydown", keyDownHandler);

function startGame() {
  renderGameView(viewList);
}

function init() {
  startGame();
  const interval = setInterval(() => {
    activeBlock[0]++;
    renderGameView(viewList);
    if (activeBlock[0] > 18) clearInterval(interval);
  }, 1000);
}

init();
