class Typing {
  #element;
  #text;
  #unix;

  constructor(element) {
    this.#element = element;
    this.#text = this.#element.innerHTML;
    this.#unix = Date.now();
  }

  createSpans() {
    this.#element.innerHTML = '';
    this.#text = this.#text.replace(/\<\/?br\>/gi, "\u200B");
    for (const char of this.#text) {
      if ("\u200B" == char) {
        const div = document.createElement('br');
        this.#element.appendChild(div);
      } else {
        const span = document.createElement('span');
        span.innerHTML = char === ' ' ? '\u00A0' : char;
        span.classList.add(`char-${this.#unix}`);
        span.style.opacity = "0"
        span.style.filter = "blur(8px)"
        this.#element.appendChild(span);
      }
    }
  }

  animateTyping() {
    const chars = document.querySelectorAll(`.char-${this.#unix}`);
    let index = 0;

    function animateChar() {
      if (index < chars.length) {
        const char = chars[index];
        let opacity = 0;
        let blur = 13;

        function fadeIn() {
          opacity += 0.7;
          blur -= 3.5

          char.style.opacity = Math.min(opacity, 1);
          char.style.filter = `blur(${Math.max(blur, 0)}px)`;
          char.style.transform = `translateY(${Math.max(blur, 0)}px)`;

          if (opacity < 1 || blur >= 0) {
            requestAnimationFrame(fadeIn);
          } else {
            index++;
            animateChar();
          }
        }
        fadeIn();
      }
    }
    animateChar();
  }

  run(timeout = 0) {
    this.createSpans();
    setTimeout(() => {
      this.animateTyping();
    }, timeout);
  }
}

var elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

let bounce = 0;
document.getElementById("interface").addEventListener("click", () => {
  // openFullscreen()
  document.getElementById("nth-2").classList.add("dis");
  (new Typing(document.getElementById("flip"))).run();
  (new Typing(document.getElementById("flip2"))).run(1000);
  document.querySelector(".wrapper").classList.add("dis")
  setTimeout(() => {
    bounceBall();
  }, 2900)
})

const PERCEPATAN = 0.2;
let cV = 0;
let velo = 0;
function bounceBall() {

  velo += PERCEPATAN;
  cV += velo;

  document.getElementById("logo").style.transform = `translateY(${cV}px) scaleX(1)`;

  if (cV > 80) {
    velo = -velo;
    bounce++;
    document.getElementById("logo").style.transform = `translateY(${cV}px) scaleX(1.2)`;
  }

  if (bounce < 3) {
    requestAnimationFrame(bounceBall)
  } else {
    inside()
  }
}

let sC = 1;
let sk = 0;
function inside() {
  velo += 0.09;
  cV += velo;
  sC < 5 ? sk += 0.0070 : sk += 0.1;
  sC += sk;

  document.getElementById("logo").style.transform = `translateY(${cV}px) scale(${sC})`;

  if (sC < 25) {
    requestAnimationFrame(inside)
  } else {
    setTimeout(() => {
      document.querySelector("#splash").classList.add("pede");
    }, 1000)
  }
}