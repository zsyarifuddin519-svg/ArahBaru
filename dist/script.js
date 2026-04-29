// Daftarkan plugin CustomEase agar bisa digunakan di GSAP 3
gsap.registerPlugin(CustomEase);

let currentlyVisible = ".form-log-in";
let currentlyHidden = ".form-sign-up";

$(".info-item .btn").click(function(){
  $(".form-container").toggleClass("active");
  $(currentlyVisible).fadeToggle('750', function() {
    $(currentlyHidden).fadeToggle();
    let s = currentlyVisible;
    currentlyVisible = currentlyHidden;
    currentlyHidden = s;
  });
  $(".leaves").addClass("animated tada").one('animationend', function() {
    $(this).removeClass("animated tada");
  });
});

// Fire Animation Logic
var select = function(s) { return document.querySelector(s); },
    flameContainer = select('.flameContainer'),
    sparksContainer = select('.sparksContainer'),
    flameSVG = select('.flameSVG'),
    flamePosXArr = [10, -10],
    flameOffset = 0.34,
    sparkOffset = 0.72,
    numFlames = 50;

// Update sintaks CustomEase
CustomEase.create("return", "M0,0 C0,0 0.162,1 0.4,1 0.918,1 1,0 1,0");
CustomEase.create("sparkFlicker", "M0,0 C0.126,0.382 0.216,0.572 0.414,0.482 0.821,0.296 0.984,0.94 1,1");
CustomEase.create("flameJump", "M0,0 C0.126,0.382 0.256,0.248 0.406,0.23 0.85,0.176 0.984,0.94 1,1");

gsap.set('svg', { visibility: 'visible' });
gsap.set('.whole', { scale: 1.52, transformOrigin: '50% -500%' });

var mainTl = gsap.timeline();
var flameTl = gsap.timeline({repeat: 0});

function createFlames(){
  for(var i = 0; i < numFlames; i++){
    var f = select('.flame').cloneNode(true);
    flameContainer.appendChild(f);
    
    gsap.set(f, {
      x: (i%2) ? flamePosXArr[0] : flamePosXArr[1],
      transformOrigin: '50% 50%',
      rotation: -45
    });

    var fTl = gsap.timeline({repeat: -1, repeatDelay: ((numFlames-1) * flameOffset)-2});
    fTl.to(f, { duration: 2, x: (i%2)? '-=22' : '+=22', scale: 10, ease: 'return' })
       .to(f, { duration: 2, y: -145, ease: 'flameJump' }, '<')
       .to(f, { duration: 2, fill: '#F73B01', ease: 'sine.out' }, '<')
       .to(f, { duration: 2, opacity: 0, ease: 'expo.in' }, '<');

    flameTl.add(fTl, i * flameOffset);
    
    var s = select('.spark').cloneNode(true);
    sparksContainer.appendChild(s);
    gsap.set(s, {
      x: (i%3) ? flamePosXArr[1] : flamePosXArr[0],
      transformOrigin: '50% 50%'
    });
  }
}
createFlames();

// Spark Animation menggunakan gsap.to() dengan stagger
var sparkTl = gsap.timeline({repeat: -1});

// Untuk animasi kompleks seperti ini, disarankan menggunakan loop atau fitur keyframes di GSAP 3
// Bagian ini disederhanakan agar kompatibel dengan GSAP 3
gsap.to('.spark', {
  duration: 2,
  x: "random([-25, 15, 23, 71, -54])",
  scale: "random(0, 23)",
  ease: "return",
  stagger: sparkOffset,
  repeat: -1
});

gsap.to('.spark', {
  duration: 3,
  y: "random(-200, -400)",
  opacity: 0,
  stagger: sparkOffset,
  repeat: -1,
  delay: 0.5
});

mainTl.add(flameTl, 0);
mainTl.timeScale(1.2).seek(97);

flameSVG.onclick = function() {
    gsap.fromTo(".spark", {opacity: 1, y: 0}, {duration: 1, opacity: 0, y: -100, stagger: 0.05});
};
