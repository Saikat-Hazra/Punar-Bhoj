window.onload = function() {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  const Img1 = document.getElementById("dynamic-img1");
  const Img2 = document.getElementById("dynamic-img2");
  const Img3 = document.getElementById("dynamic-img3");

  // Image paths
  const imgLight1 = "Assets/Light/Review (1).png";
  const imgDark1  = "Assets/Dark/Review (1).png";
  const imgLight2 = "Assets/Light/Review (2).png";
  const imgDark2  = "Assets/Dark/Review (2).png";
  const imgLight3 = "Assets/Light/Review (3).png";
  const imgDark3  = "Assets/Dark/Review (3).png";

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  }

  // Always update images on load
  updateImgByTheme1();
  updateImgByTheme2();
  updateImgByTheme3();

  toggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
    updateImgByTheme1();
    updateImgByTheme2();
    updateImgByTheme3();
  });

  function updateImgByTheme1() {
    if (Img1)
      Img1.src = (localStorage.getItem("theme") === "dark") ? imgDark1 : imgLight1;
  }
  function updateImgByTheme2() {
    if (Img2)
      Img2.src = (localStorage.getItem("theme") === "dark") ? imgDark2 : imgLight2;
  }
  function updateImgByTheme3() {
    if (Img3)
      Img3.src = (localStorage.getItem("theme") === "dark") ? imgDark3 : imgLight3;
  }
};



// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}
// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
var slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  // var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


// Today's Special Modal
const tospcl = document.getElementById("tsp-btn");
// Open the Modal for Today's Special image
function oModal() {
  let n=daySelectTSP();
  const cardIds = [
                'tsp-Sunday',
                'tsp-Monday',
                'tsp-Tuesday',
                'tsp-Wednesday',
                'tsp-Thursday',
                'tsp-Friday',
                'tsp-Saturday'
            ];
    const todaysCardId = cardIds[n];
    const cardToShow = document.getElementById(todaysCardId);
            if (cardToShow) {
                cardToShow.style.display = 'block';
            }
  }
// Close the Modal for Today's Special Image
function cModal() {
  let n=daySelectTSP();
  const cardIds = [
                'tsp-Sunday',
                'tsp-Monday',
                'tsp-Tuesday',
                'tsp-Wednesday',
                'tsp-Thursday',
                'tsp-Friday',
                'tsp-Saturday'
            ];
    const todaysCardId = cardIds[n];
    const cardToShow = document.getElementById(todaysCardId);
            if (cardToShow) {
                cardToShow.style.display = 'none';
            }
}
function daySelectTSP()
{
  const today=new Date();
  const dayIndex = today.getDay(); // Gets the day of the week (0-6)
  return dayIndex;
}


// Navbar active link highlighting
// get all nav links
        // const navLinks = document.querySelectorAll('.nav-links0 .nav-item .nav-link');

        // function onScroll() {
        //     const scrollPos = window.scrollY || document.documentElement.scrollTop;

        //     navLinks.forEach(link => {
        //         const section = document.querySelector(link.getAttribute('href'));
        //         if (!section) return;

        //         const offsetTop = section.offsetTop - 100; // adjust offset for your fixed nav height
        //         const offsetBottom = offsetTop + section.offsetHeight;

        //         if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
        //             link.classList.add('active');
        //         } else {
        //             link.classList.remove('active');
        //         }
        //     });
        // }

        // window.addEventListener('scroll', onScroll);



//   const header = document.querySelector('header, .navbar0, .nav-links0'); // adjust selector
// function getHeaderOffset() {
//   return header ? header.offsetHeight : 0;
// }
// function onScroll() {
//   const scrollPos = window.scrollY || document.documentElement.scrollTop;
//   const offset = getHeaderOffset();
//   navLinks.forEach(link => {
//     const href = link.getAttribute('href');
//     if (!href || !href.startsWith('#') || href === '#') return;
//     const section = document.querySelector(href);
//     if (!section) return;

//     const top = section.offsetTop - offset - 1; // -1 to avoid edge flicker
//     const bottom = top + section.offsetHeight;

//     if (scrollPos >= top && scrollPos < bottom) {
//       link.classList.add('active');
//     } else {
//       link.classList.remove('active');
//     }
//   });
// }
// window.addEventListener('scroll', onScroll, { passive: true });
// window.addEventListener('resize', onScroll);
// document.addEventListener('DOMContentLoaded', onScroll);


// 1) Collect nav links and build id -> link map
const navLinks = document.querySelectorAll('.nav-links0 .nav-item .nav-link');
const navMap = new Map(); // sectionId -> link

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (!href || !href.startsWith('#') || href === '#') return; // skip non-anchors/placeholders
  const id = href.slice(1);
  navMap.set(id, link);
});

// 2) Create the observer
// Adjust headerHeight to your sticky/fixed navbar height in pixels.
const headerHeight = document.querySelector('.nav-links0')?.offsetHeight || 0;
// rootMargin shrinks the top viewport by headerHeight so the “active” section is one that’s visible below the header.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = navMap.get(id);
    if (!link) return;

    if (entry.isIntersecting) {
      // Clear all actives, then set this one
      navMap.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, {
  root: null,
  // Top negative margin compensates sticky header, bottom negative margin reduces late switch; tune to taste.
  rootMargin: `-${headerHeight}px 0px -50% 0px`,
  threshold: 0.25 // section becomes active when 25% visible within adjusted viewport
});

// 3) Observe each section corresponding to a nav link
navMap.forEach((home, id) => {
  const sec = document.getElementById(id);
  if (sec) observer.observe(sec);
});
navMap.forEach((About, id) => {
  const sec = document.getElementById(id);
  if (sec) observer.observe(sec);
});
navMap.forEach((Menu, id) => {
  const sec = document.getElementById(id);
  if (sec) observer.observe(sec);
});
navMap.forEach((tosp0, id) => {
  const sec = document.getElementById(id);
  if (sec) observer.observe(sec);
});

// 4) Optional: initialize state on load/resize so the right link is active immediately
const reobserve = () => {
  // Force a check by unobserving/observing or by scrolling by 1px
  window.requestAnimationFrame(() => window.dispatchEvent(new Event('scroll')));
};
window.addEventListener('load', reobserve);
window.addEventListener('resize', reobserve);
