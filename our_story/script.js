/* ---------- Intro → Timeline ---------- */

const enterBtn = document.getElementById("enterBtn");
const intro = document.getElementById("intro");
const timeline = document.getElementById("timeline");

if (enterBtn && intro && timeline) {
  enterBtn.addEventListener("click", () => {
    intro.classList.add("hidden");
    timeline.classList.remove("hidden");
  });
}

/* ---------- Scroll Reveal ---------- */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

/* ---------- Reasons Page Logic ---------- */

const revealBtn = document.getElementById("revealBtn");

if (revealBtn) {
  const reasons = [
    "You make my days meaningful.",
    "You believe in me even when I doubt myself.",
    "You make me want to be better.",
    "You’ve always beieved in me and supported me",
    "Being with you feels like home.",
    "Your laugh make everythhing better.",
    "The way you care for me make me feel special."
  ];

  const images = [
    "images/reasons/r1.png",
    "images/reasons/r2.png",
    "images/reasons/r3.png",
    "images/reasons/r4.png",
    "images/reasons/r5.png",
    "images/reasons/r6.png",
    "images/reasons/r7.png",
    "images/reasons/r8.png",
    "images/reasons/r9.png",
    "images/reasons/r10.png",
    "images/reasons/r11.png",
    "images/reasons/r12.png",
    "images/reasons/r13.png",
    "images/reasons/r14.png"
  ];

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  let reasonIndex = 0;
  let imageIndex = 0;
  let shuffledImages = shuffle(images);
  let revealsCount = 0;

  const reasonText = document.getElementById("reasonText");
  const photoLeft = document.getElementById("photoLeft");
  const photoRight = document.getElementById("photoRight");

  revealBtn.addEventListener("click", () => {
  reasonText.classList.remove("hidden");
  reasonText.textContent = reasons[reasonIndex];

  photoLeft.style.opacity = 0;
  photoRight.style.opacity = 0;

  setTimeout(() => {
    if (imageIndex >= shuffledImages.length) {
      shuffledImages = shuffle(images);
      imageIndex = 0;
    }

    photoLeft.src = shuffledImages[imageIndex];
    photoRight.src = shuffledImages[imageIndex + 1];
    imageIndex += 2;

    photoLeft.style.opacity = 1;
    photoRight.style.opacity = 1;
  }, 200);

  // 🔑 MOVE THIS HERE
  revealsCount++;

  const finalBtn = document.getElementById("finalBtn");

  if (revealsCount === reasons.length && finalBtn) {
    finalBtn.classList.add("visible");
  }

  reasonIndex = (reasonIndex + 1) % reasons.length;
  });

}

/* ---------- Letter Page Logic ---------- */

const openLetterBtn = document.getElementById("openLetterBtn");
const letterContent = document.querySelector(".letter-content");

if (openLetterBtn && letterContent) {
  const letterImg = openLetterBtn.querySelector("img");

  openLetterBtn.addEventListener("click", () => {
    // swap closed → open envelope
    letterImg.src = "images/letter_open.png";

    // reveal letter
    letterContent.style.opacity = "1";
    letterContent.style.transform = "scaleY(1)";
  });
}

/* ---------- Letter Page Framed Photos ---------- */
const topRow = document.getElementById("photoTop");
const bottomRow = document.getElementById("photoBottom");

const allLastImages = [
  "images/last/last (1).png", 
  "images/last/last (2).png", 
  "images/last/last (3).png", 
  "images/last/last (4).png", 
  "images/last/last (5).png", 
  "images/last/last (6).png",
  "images/last/last (7).png", 
  "images/last/last (8).png", 
  "images/last/last (9).png", 
  "images/last/last (10).png", 
  "images/last/last (11).png", 
  "images/last/last (12).png",
  "images/last/last (13).png", 
  "images/last/last (14).png", 
  "images/last/last (15).png", 
  "images/last/last (16).png", 
  "images/last/last (17).png", 
  "images/last/last (18).png"
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function createImg(src) {
  const img = document.createElement("img");
  img.src = src;
  return img;
}

function renderPhotos(images) {
  topRow.innerHTML = "";
  bottomRow.innerHTML = "";

  const allImgs = [];

  images.slice(0, 3).forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    topRow.appendChild(img);
    allImgs.push(img);
  });

  images.slice(3, 6).forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    bottomRow.appendChild(img);
    allImgs.push(img);
  });

  // 🔑 Force fade-in AFTER browser paints opacity: 0
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      allImgs.forEach(img => img.classList.add("show"));
    });
  });
}

function cyclePhotos() {
  document
    .querySelectorAll(".photo-row img")
    .forEach(img => img.classList.remove("show"));

  setTimeout(() => {
    const nextSet = shuffle(allLastImages).slice(0, 6);
    renderPhotos(nextSet);
  }, 1400);
}

if (topRow && bottomRow) {
  renderPhotos(shuffle(allLastImages).slice(0, 6));
  setInterval(cyclePhotos, 10000);
}

