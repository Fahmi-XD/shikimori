const typingElement = document.getElementById('flip');
let text = typingElement.innerHTML;

function createSpans() {
  typingElement.innerHTML = '';
  text = text.replace(/\<\/?br\>/gi, "\u200B");
  for (const char of text) {
    if ("\u200B" == char) {
      const div = document.createElement('br');
      typingElement.appendChild(div);
    } else {
      const span = document.createElement('span');
      span.innerHTML = char === ' ' ? '\u00A0' : char;
      span.classList.add('char');
      span.style.opacity = "0"
      span.style.filter = "blur(8px)"
      typingElement.appendChild(span);
    }
  }
}

function animateTyping() {
  const chars = document.querySelectorAll('.char');
  let index = 0;

  function animateChar() {
    if (index < chars.length) {
      const char = chars[index];
      let opacity = 0;
      let blur = 13;

      function fadeIn() {
        opacity += 0.70;
        blur -= 3.5

        char.style.opacity = Math.min(opacity, 1);
        char.style.filter = `blur(${Math.max(blur, 0)}px)`;

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

createSpans();
animateTyping();

setTimeout(() => {
  alert("Anjay")
}, 3510)