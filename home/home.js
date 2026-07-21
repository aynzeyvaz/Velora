const loader = document.getElementById("preloader");
document.body.style.overflow = "hidden";

function hideLoader(){
  loader.classList.add("hidden");
  document.body.style.overflow = "auto";

}


/**
 * add event on multiple elements
 */

const addEventOnElements = function(elements, eventType, callback) {
  const len = elements.length
  for (let i=0; i < len; i++) {
    elements[i].addEventListener(eventType, callback)
  }
}

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


// Navbar Submenu (categories)
// navbar api


const submenuItems= document.querySelectorAll("[data-has-submenu]");
const navbarCategoriesApi = "https://velora-1-cbh9.onrender.com/api/destinations/";

async function fetchNavbarCategories(){

  try {
    const response = await fetch(navbarCategoriesApi);

    if(!response.ok){
      throw new Error("Navbar Categories Error");
    }

    const categories = await response.json();
    renderNavbarCategories(categories);


  }

  catch(error){
    console.log(error);

  }

}

function renderNavbarCategories(categories){
  submenuItems.forEach((item)=>{

    const navbarTitle =
    item.querySelector(".navbar-link")
    .textContent
    .trim();

    const submenu =
    item.querySelector("[data-submenu]");

    const category =
    categories.find(
      cat => 
      navbarTitle.includes(cat.title)
    );



    if(!category) return;

    submenu.innerHTML= "";

    category.options.forEach(option=>{

      const li=document.createElement("li");

      li.classList.add("submenu-item");

      li.innerHTML=`

        <ion-icon name="earth-outline"></ion-icon>

        <a 
        href="../result/result.html?destination=${encodeURIComponent(option)}"
        class="submenu-link">

          ${option}

        </a>

      `;


      submenu.appendChild(li);


    });


  });


}




// آکاردئون برای موبایل
const submenuToggles = document.querySelectorAll(".submenu-toggle");

submenuToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;
    if (isDesktop) return;

    const parentItem = btn.closest("[data-has-submenu]");
    const isActive = parentItem.classList.contains("active");

    submenuItems.forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".submenu-toggle").setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      parentItem.classList.add("active");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});


// Hero Section 
// hero section api
const heroApi = "https://velora-1-cbh9.onrender.com/api/home/hero/";
let heroData = [];
let index = 0;


async function fetchHeroData(){

  try {
    const response = await fetch(heroApi);

    if(!response.ok){
      throw new Error("Hero API Error");
    }

    heroData = await response.json();
  

    startHeroSlider();
  }
  catch(error){
    console.log(error);

  }

}


const bg1 = document.querySelector(".hero-bg-1");
const bg2 = document.querySelector(".hero-bg-2");
const heroTitle = document.querySelector(".hero-title");
const heroSubtitle = document.querySelector(".hero-subtitle");


let count = 0;
let activeBg = bg1;
let inactiveBg= bg2;


function changeHero(){
  const currentHero = heroData[count];

  count = (count + 1) % heroData.length;

  [activeBg, inactiveBg] = [inactiveBg, activeBg];

  inactiveBg.style.backgroundImage =
  `url(${currentHero.images})`;

  inactiveBg.classList.add("active");
  inactiveBg.classList.remove("inactive");
  
  activeBg.classList.add("inactive");
  activeBg.classList.remove("active");

  heroTitle.classList.add("hide");
  heroSubtitle.classList.add("hide");

  setTimeout(()=>{
    heroTitle.textContent = currentHero.title;

    heroSubtitle.textContent =
    currentHero.subtitle;

    heroTitle.classList.remove("hide");
    heroSubtitle.classList.remove("hide");


  },600);

}


function startHeroSlider(){
  changeHero();

  setInterval(()=>{
    changeHero();

  },5000);


}



// month modal
const monthInput = document.getElementById("month-input");
const monthModal = document.getElementById("month-modal");
const monthButtons = document.querySelectorAll(".month-button");

monthInput.addEventListener("click", () => {
  monthModal.classList.add("active");
});

monthButtons.forEach((button) => {
  button.addEventListener("click", () => {

    monthInput.value = button.textContent.trim();

    monthInput.dataset.month = button.dataset.month;

    monthModal.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".hero-field")) {
    monthModal.classList.remove("active");
  }
});


// Special tours api

async function fetchSpecialTours() {

  try {
      const response= await fetch("https://velora-1-cbh9.onrender.com/api/tours/special/");
      

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
  }
  catch (err) {
      console.error("API Error:", err);
      return [];

  }
  
  
}

// function generateDate(date) {

//   return moment(date).format("jYYYY/jMM/jDD");
// }


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

const toursGrid = document.querySelector(".tours-grid");

async function renderTours() {
  toursGrid.innerHTML = ``;
  const specialTours= await fetchSpecialTours();

  specialTours.forEach((tour) => {
    
    const card = document.createElement("div");
    card.classList.add("tour-card", "reveal-item");

    card.innerHTML= `
    <a href="#"> 
        <div class="tour-card-image">
        <img loading="lazy" src="${tour.cover}" alt="${tour.country}">
        <span class="tour-card-badge"> ${tour.badge}</span>
    </div>

    <div class="tour-card-content">
      <div class="tour-card-header">
      <h3 class="tour-card-header-title">${titleGenerator(tour.country, tour.city)}</h3>
      <div class="tour-card-header-start">
      ${dateGenerator(tour.startDate)}
      </div>
      
    </div>

      <div class="tour-card-meta">
        <div class="tour-duration"> ${durationGenerator(tour.duration)} </div>
      </div>
      
  
      <div class="tour-card-price"> 
        <span>${new Intl.NumberFormat('fa-IR').format(tour.price)}</span> تومان
      </div>
    
      <div class="tour-card-attention"><ion-icon name="alert-circle-outline"></ion-icon> شامل حمل و نقل، اقامت و خدمات تور</div>
    </div>
    </a>

    `;

    toursGrid.appendChild(card);



  });

  if (toursGrid._refreshSlider) {
    toursGrid._refreshSlider();
  }
  observeRevealItems();
}

// slider

const isRTL = document.documentElement.dir === "rtl";

function initSlider(track) {
  const section = track.closest("section");
  const arrowsBox = section?.querySelector("[data-slider-arrows]");
  if (!arrowsBox) return;

  const prevBtn = arrowsBox.querySelector(".slider-arrow--prev");
  const nextBtn = arrowsBox.querySelector(".slider-arrow--next");

  function getScrollAmount() {
    const firstCard = track.firstElementChild;
    if (!firstCard) return 300;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 18;
    return cardWidth + gap;
  }

  function updateArrowState() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const scrollLeft = Math.abs(track.scrollLeft);

    if (maxScroll <= 1) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    prevBtn.disabled = scrollLeft <= 0;
    nextBtn.disabled = scrollLeft >= maxScroll - 1;
  }

 
  function scrollByCards(direction) {
    const amount = getScrollAmount();
    const rtlSign = isRTL ? -1 : 1;
    track.scrollBy({ left: direction * amount * rtlSign, behavior: "smooth" });
  }

  nextBtn.addEventListener("click", () => scrollByCards(1));
  prevBtn.addEventListener("click", () => scrollByCards(-1));
  track.addEventListener("scroll", updateArrowState);

  updateArrowState();
  track._refreshSlider = updateArrowState;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tours-grid, .destinations-grid").forEach(initSlider);
});





























// search api
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const origin =document.getElementById("origin-input").value.trim();
  const destination =document.getElementById("destination-input").value.trim();
  const month = document.getElementById("month-input").dataset.month || "";


  const params = new URLSearchParams();

  if (origin) params.append("origin", origin);
  if (destination) params.append("destination", destination);
  if (month) params.append("month", month);

  window.location.href=`../result/result.html?${params.toString()}`;





});







// populR DESTINATION 
// destinations api

const popularDestinationsApi= "https://velora-1-cbh9.onrender.com/api/tours/popular/";

const destinationsGrid= document.querySelector(".destinations-grid");

async function fetchPopularDestinations(){

  try {
    const response = await fetch(popularDestinationsApi);

    if(!response.ok){
      throw new Error("Popular destinations API Error");
    }

    const data = await response.json();

    renderPopularDestinations(data);


  }

  catch(error){

    console.log(error);

  }

}



function renderPopularDestinations(destinations){


  destinationsGrid.innerHTML="";

  destinations.forEach(destination=>{

  const card=document.createElement("article");

  card.classList.add("destination-card","reveal-item");


  card.innerHTML=`

  <a href="../result/result.html?destination=${encodeURIComponent(destination.city)}" class="destination-link">

  <img src="${destination.images}"
  alt="${destination.name}">


  <div class="destination-overlay">
    <div class="destination-info">
      <h3>
      ${destination.city}
      </h3>


      <span>
      ${new Intl.NumberFormat('fa-IR').format(destination.tour_count)}
              تور
      </span>
    
    
    
    </div>
      


  </div>
</a>
  `;


  destinationsGrid.appendChild(card);


  });

  if (destinationsGrid._refreshSlider) {
    destinationsGrid._refreshSlider();
  }
  observeRevealItems();


}





// category

//  category api

const categoriesApi = "https://velora-1-cbh9.onrender.com/api/destinations/";

async function fetchCategories(){

  try {
    const response = await fetch(categoriesApi);

    if(!response.ok){
      throw new Error("Categories API Error");
    }
    const data = await response.json();
    renderCategories(data);


  }

  catch(error){

    console.log(error);

  }

}

const categoriesGrid = document.querySelector(".categories-grid");

function renderCategories(categories){

    categoriesGrid.innerHTML="";

    categories.forEach(category=>{

        const card=document.createElement("article");

        card.classList.add("category-card", "reveal-item");

        card.innerHTML=`

            <div class="category-image">

                <img
                    src="${category.image}"
                    alt="${category.title}"
                >

                <div class="category-overlay">

                    <div class="category-title">
                        <h3> تور‌های ${category.title}</h3>

                    </div>

                </div>

            </div>

            <div class="category-options">
              ${category.options.map(option=>`
                <a href="../result/result.html?destination=${encodeURIComponent(option)}">
                        ${option}
                    </a>
                    `).join("")
                }


            </div>

        `;

        categoriesGrid.appendChild(card);

    });
    observeRevealItems();

}



// reviews

const reviews = [
  {
    id: 1,
    name: "سارا احمدی",
    tour: "تور استانبول",
    rate: 5,
    text: "رزرو خیلی راحت بود و همه چیز دقیقاً مطابق برنامه انجام شد. تجربه فوق‌العاده‌ای داشتم."
  },

  {
    id: 2,
    name: "علی رضایی",
    tour: "تور کیش",
    rate: 5,
    text: "پشتیبانی ولورا واقعاً عالی بود و در تمام مراحل کنارم بودند."
  },

  {
    id: 3,
    name: "نگار محمدی",
    tour: "تور دبی",
    rate: 4,
    text: "هتل و پرواز کیفیت خیلی خوبی داشت. قطعاً دوباره با ولورا سفر می‌کنم."
  },

  {
    id: 4,
    name: "محمد کریمی",
    tour: "تور شیراز",
    rate: 5,
    text: "هم قیمت مناسب بود هم برنامه سفر دقیق و بدون دردسر پیش رفت."
  }
];

function generateStars(rate){

    let stars = "";

    for(let i = 1; i <= 5; i++){

        stars += `
            <ion-icon
                name="${i <= rate ? "star" : "star-outline"}">
            </ion-icon>
        `;

    }

    return stars;

}

const reviewsGrid = document.querySelector(".reviews-grid");

function renderReviews(){

    reviewsGrid.innerHTML = "";

    reviews.forEach(review => {

        const card = document.createElement("article");

        card.classList.add("review-card", "reveal-item");

        card.innerHTML = `

            <div class="review-rating">

                ${generateStars(review.rate)}

            </div>

            <p class="review-text">
                ${review.text}
            </p>

            <div class="review-user">

                <div class="review-user-info">

                    <h3>${review.name}</h3>

                    <span>${review.tour}</span>

                </div>

            </div>

        `;

        reviewsGrid.appendChild(card);

    });
    
}

const revealObserver = new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{


if(entry.isIntersecting){


const item = entry.target;

const siblings = [...item.parentElement.children];

const index = siblings.indexOf(item);


setTimeout(()=>{

item.classList.add("show");

}, index * 150);



revealObserver.unobserve(item);


}


});


},
{
threshold:0.15
}
);


function observeRevealItems(){

  const items = document.querySelectorAll(
    ".reveal-item:not(.observed)"
  );


  items.forEach((item,index)=>{

    item.classList.add("observed");


    revealObserver.observe(item);


  });

}







async function initPage(){
  try {
    
    await Promise.all([
      
      fetchNavbarCategories(),
      fetchHeroData(),
      renderTours(),
      fetchPopularDestinations(),
      fetchCategories()

    ]);
    renderReviews();

    observeRevealItems(); 

    hideLoader();


  }

  catch(error){

    console.log("Page Loading Error:", error);
    observeRevealItems();
    hideLoader();

  }


}

initPage();