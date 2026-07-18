const urlParams = new URLSearchParams(window.location.search);
const origin = urlParams.get("origin");
const destination= urlParams.get("destination");
const month=urlParams.get("month");
const pageLoader = document.getElementById("preloader");

document.body.style.overflow = "hidden";

window.addEventListener("load", () => { 
  pageLoader.classList.add("hidden");
  document.body.style.overflow = "auto";
});



/**
 * add event on multiple elements
 */

const addEventOnElements = function(elements, eventType, callback) {
  const len = elements.length
  for (let i=0; i < len; i++) {
    elements[i].addEventListener(eventType, callback)
  }
}



// scroll

const sections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.15
});

sections.forEach(section=>{

    observer.observe(section);

});

/**
 * Navbar toggler for mobile
 */

const navbar = document.querySelector("[data-nav]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = function () { 
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);


/**
 * Header
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
  }
  else {
    header.classList.remove("active");
  }

}
);


// Hero Section 



const bg1 = document.querySelector(".hero-bg-1");
const bg2 = document.querySelector(".hero-bg-2");

// const heroSubtitle = document.querySelector(".hero-subtitle");


let count = 0;
let activeBg = bg1;
let inactiveBg= bg2;

// hero background API

let destinationName = "";
const heroImagesApi= "https://velora-1-cbh9.onrender.com/api/search/hero/";

async function fetchHeroImages() {
  try {
     const params = new URLSearchParams({
      destination
    });


    const response = await fetch(
      `${heroImagesApi}?${params.toString()}`
    );


    if(!response.ok) {
      throw new Error("failed");
    }


    const data = await response.json();
    destinationName = data.destination;

    updateResultTitle(destinationName);
    startHeroSlider(data.heroImages);
  }
  catch(err) {
    console.log(err);
  }
}

//start hero slider 

function startHeroSlider(images) {
   changeHero(images);
  setInterval(() => {
    changeHero(images);
  }, 8000);
}


// month modal
const monthInput = document.getElementById("month-input");
const monthModal = document.getElementById("month-modal");
const monthButtons = document.querySelectorAll(".month-button");

monthInput.addEventListener("click", () => {
  monthModal.classList.add("active");
});

monthButtons.forEach( (button) => {
  button.addEventListener("click", () => {
    monthInput.value = button.dataset.month;
    monthInput.dataset.label = button.textContent;
    monthModal.classList.remove("active");
  });
  
  
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".hero-field")) {
    monthModal.classList.remove("active");
  }
});



// change hero
function changeHero(images) {

  const currentBg = images[count];
  count = (count +1) % images.length;
  

  [activeBg, inactiveBg] = [inactiveBg, activeBg]

  inactiveBg.style.backgroundImage =`url(${currentBg})`;

  inactiveBg.classList.add("active");
  inactiveBg.classList.remove("inactive");

  activeBg.classList.add("inactive");
  activeBg.classList.remove("active");

  // heroTitle.classList.add("hide");
  // heroSubtitle.classList.add("hide");

  setTimeout(() => {
    

  // heroSubtitle.textContent = currentBg.subTitle;

  // heroTitle.classList.remove("hide");
  // heroSubtitle.classList.remove("hide");

  }, 600);

  
}

fetchHeroImages();



//result title

function updateResultTitle(destination) {
  const resultTitle = document.getElementById("result-tours-title-h2");

  if (resultTitle) {
    resultTitle.textContent = `تورهای ${destinationName}`;
  }
 
}







// function generateDate(date) {

//   return moment(date).format("jYYYY/jMM/jDD");
// }




const filters =document.querySelector("[data-filters]");
const filterToggle=document.querySelector("[data-filter-toggle]");
const toggleIcon= document.querySelector(".chevron")

filterToggle.addEventListener("click", ()=> {
  filters.classList.toggle("active");

  let state= filters.classList.contains("active");
  toggleIcon.setAttribute(
    "name",
    state ? "chevron-up-outline" : "chevron-down-outline"
  );
});



const sortRadios = document.querySelectorAll('input[name="sort"]');

sortRadios.forEach(radio => {
  radio.addEventListener("change", function() {
    fetchSearchTours(this.value);
  });
});



function dateGenerator(startDate) {
  const date = new Date(startDate);

  const options = {
    day: "numeric",
    month: "long"
  };

  return date.toLocaleDateString('fa-IR', options);

}

function titleGenerator(country, city) {

  return `${country}، ${city}`

}

function durationGenerator(duration) {
  const day=Number(duration)
  const newDay = new Intl.NumberFormat('fa-IR').format(day);
  const night = day- 1;
  const newNight = new Intl.NumberFormat('fa-IR').format(night);
  return `${newDay} روز و  ${newNight} شب`;

}
// function generateStars(stars) {
//   let starsHTML = ``;

//   for (let i=1; i<=5; i++) {
//     if (i<=stars) {
//       starsHTML += `<span class="star filled">
//       <ion-icon name="star"></ion-icon>
//       </span>`;
//     }
//     else {
//       starsHTML += `<span class="star empty">
//       <ion-icon name="star-outline"></ion-icon>
//       </span>`;
//     }
//   }

//   return starsHTML;
// }


//animation

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.1
});

const toursGrid = document.querySelector(".tours-grid");
const apiLoader= document.querySelector(".api-loader");


// API Results


const results_Api= "https://velora-1-cbh9.onrender.com/api/search/result/";



// const urlParams = new URLSearchParams(window.location.search);
// const origin = urlParams.get("origin");
// const destination= urlParams.get("destination");
// const month=urlParams.get("month");

async function fetchSearchTours(sort=""){

  toursGrid.classList.add("loading");
  apiLoader.classList.add("active");
  const params = new URLSearchParams({
    origin, destination, month
  });

  if(sort){
    params.append("sort", sort);
  }

  let apiUrl =
  `${results_Api}?${params.toString()}`;


  try {
    const response= await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("faileld");
    }

    const data= await response.json();
    

    if(data.count === 0){

      toursGrid.innerHTML = `
        <p class="no-results">
          متاسفانه توری با این مشخصات پیدا نشد.
        </p>
      `;

      return;
    

  }

    renderTours(data.result);
  }
  catch (err) {
    console.error(err);
    
  }
  finally {
   apiLoader.classList.remove("active");
   toursGrid.classList.remove("loading");
}

}


function renderTours(tours) {
  toursGrid.innerHTML = ``;
  const fragment = document.createDocumentFragment();
  tours.forEach((tour, index) => {

    const card = document.createElement("div");
    card.classList.add("tour-card");

    card.innerHTML= `
    <a href="#"> 
      <div class="tour-card-inner">
        <div class="tour-card-image">
          <img src="${tour.cover}" alt="${tour.country}">
          <span class="tour-card-badge"> ${tour.badge}</span>
          <span class="tour-card-location">
            <ion-icon name="location-sharp"></ion-icon>
            ${tour.country}، ${tour.city}
          </span>
        </div>
        <div class="tour-card-content">
          <div class="tour-card-header">
            <div class="tour-card-header-title-wrap">
              <h3 class="tour-card-header-title">${titleGenerator(tour.country, tour.city)}</h3>
            </div>

            <div class="tour-card-header-start">
              <ion-icon class="icon" name="calendar-outline"></ion-icon>
              <span class="label">تاریخ شروع:</span>
              <span class="day">${dateGenerator(tour.startDate)}</span>
              
            </div>
          </div>

          <div class="tour-card-meta">
            <div class="tour-pill">
              <ion-icon name="earth-outline"></ion-icon>
              ${durationGenerator(tour.duration)}
            </div>
            <div class="tour-pill">
              <ion-icon name="car-outline"></ion-icon>
              حمل و نقل
            </div>
            <div class="tour-pill">
              <ion-icon name="business-outline"></ion-icon>
              اقامت
            </div>
          </div>

          <div class="tour-card-footer">
            <div class="tour-card-footer-top">
              <ul class="tour-card-checklist">
                <li class="tour-card-checklist-item"><ion-icon name="checkmark-circle"></ion-icon>شامل حمل و نقل</li>
                <li class="tour-card-checklist-item"><ion-icon name="checkmark-circle"></ion-icon>اقامت در هتل‌های منتخب</li>
                <li class="tour-card-checklist-item"><ion-icon name="checkmark-circle"></ion-icon>بیمه مسافرتی</li>
                <li class="tour-card-checklist-item"><ion-icon name="checkmark-circle"></ion-icon>راهنمای فارسی زبان</li>
              </ul>
            </div>

            <div class="tour-card-footer-top">
              <div class="tour-card-price-wrapper">
                  <span class="tour-card-price-label">قیمت هر نفر</span>
                  <div class="tour-card-price">
                    <span>${new Intl.NumberFormat('fa-IR').format(tour.price)}</span>
                    <span>تومان</span>
                  </div>
              </div>
              <button class="tour-btn">
                مشاهده جزئیات
              </button>
            </div>
            
            
          </div>
          
        </div>
      </div>

        









        
    </a>

    `;
  fragment.appendChild(card);
  });
  toursGrid.appendChild(fragment);
  requestAnimationFrame(() => {
    document.querySelectorAll(".tour-card").forEach(card => {
      observer.observe(card);
    });
  });

  

}


fetchSearchTours();
