const loader = document.getElementById("preloader");

document.body.style.overflow = "hidden";

window.addEventListener("load", () => { 
  loader.classList.add("hidden");
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

const navbarCategories = [
  {
    title: "تورهای خارجی",
    options: ["ترکیه","امارات","گرجستان","ارمنستان","تایلند","فرانسه","ایتالیا","سوئد","سوئیس","آلمان","اسپانیا","اندونزی","مالزی"]
  },
  {
    title: "تورهای داخلی",
    options: ["کیش","قشم","مشهد","شیراز","اصفهان","چابهار"]
  },
  {
    title: "تورهای یک روزه",
    options: ["ماسال","قلعه بابک","کندوان","آبشار لاتون","کویر مرنجاب"]
  },
  {
    title: "تورهای ناشناس",
    options: ["روستاهای بکر","جزایر ناشناخته","جنگل‌های شمال","کوهستان","دریاچه‌های مخفی"]
  }
];

const submenuItems = document.querySelectorAll("[data-has-submenu]");

// پر کردن هر زیرمنو با گزینه‌های مربوطه
submenuItems.forEach((item) => {
  const linkText = item.querySelector(".navbar-link").textContent.replace("تور", "").trim();
  const category = navbarCategories.find((cat) => cat.title.includes(linkText));

  if (!category) return;

  const submenu = item.querySelector("[data-submenu]");

  category.options.forEach((option) => {
    const li = document.createElement("li");
    li.classList.add("submenu-item");
    li.innerHTML = `<a href="#" class="submenu-link">${option}</a>`;
    submenu.appendChild(li);
  });
});

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

const heroBgs = [ 
  { 
    image:"../assets/images/paris1.jpg",
    title: "هر سفر، یک داستان تازه",
    subTitle: "تورهای داخلی و خارجی رو جستجو کن و بهترین تجربه سفر رو بساز"
  },

  {
     image:"../assets/images/paris2.jpg",
     title: "دنیا بزرگ‌تر از چیزی‌ست که فکر می‌کنی",
     subTitle: "وقتشه ببینی اون بیرون چه چیزهایی منتظر توئه."
  },

  { 
    image:"../assets/images/paris3.jpg",
    title: "مقصدتو پیدا کن",
    subTitle: "جستجو کن، انتخاب کن، سفر کن." 
  },

  {
   image:"../assets/images/paris4.jpg" ,
   title: "سفرهای خاص برای آدم‌های خاص",
   subTitle: "تجربه‌هایی فراتر از یک سفر معمولی."
  }
  
  ];



const bg1 = document.querySelector(".hero-bg-1");
const bg2 = document.querySelector(".hero-bg-2");
const heroTitle = document.querySelector(".hero-title");
const heroSubtitle = document.querySelector(".hero-subtitle");


let count = 0;
let activeBg = bg1;
let inactiveBg= bg2;


function changeHero() {

  const currentBg = heroBgs[count];
  count = (count +1) % heroBgs.length;
  

  [activeBg, inactiveBg] = [inactiveBg, activeBg]

  inactiveBg.style.backgroundImage =`url(${currentBg.image})`;

  inactiveBg.classList.add("active");
  inactiveBg.classList.remove("inactive");

  activeBg.classList.add("inactive");
  activeBg.classList.remove("active");

  heroTitle.classList.add("hide");
  heroSubtitle.classList.add("hide");

  setTimeout(() => {
    
  heroTitle.textContent = currentBg.title;
  heroSubtitle.textContent = currentBg.subTitle;

  heroTitle.classList.remove("hide");
  heroSubtitle.classList.remove("hide");

  }, 600);

  
}


setInterval(changeHero , 5000);
changeHero();

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
    card.classList.add("tour-card");

    card.innerHTML= `
    <a href="#"> 
        <div class="tour-card-image">
        <img src="${tour.cover}" alt="${tour.country}">
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

  const origin =document.getElementById("origin-input").value;
  const destination =document.getElementById("destination-input").value;
  const month = document.getElementById("month-input").dataset.month;


  const params= new URLSearchParams({
    origin: origin,
    destination: destination,
    month: month
  });

  window.location.href=`../result/result.html?${params.toString()}`;





});





renderTours();



// populR DESTINATION 

const destinations = [

{
    name:"کیش",
    tours:"۲۵ تور",
    image:"../assets/images/category/category1.jpg"
},
{
    name:"کیش",
    tours:"۲۵ تور",
    image:"../assets/images/category/category2.jpg"
},

{
    name:"استانبول",
    tours:"۱۸ تور",
    image:"../assets/images/category/category3.jpg"
},

{
    name:"دبی",
    tours:"۱۲ تور",
    image:"../assets/images/category/category4.jpg"
},

{
    name:"شیراز",
    tours:"۲۰ تور",
    image:"../assets/images/category/category4.jpg"
}

];


const destinationsGrid = document.querySelector(".destinations-grid");


function renderDestinations(){


  destinationsGrid.innerHTML="";


  destinations.forEach(destination=>{


  const card=document.createElement("div");

  card.classList.add("destination-card");


  card.innerHTML=`

  <a href="#" class="destination-link">
  <img src="${destination.image}"
  alt="${destination.name}">


  <div class="destination-overlay">
    <div class="destination-info">
      <h3>
      ${destination.name}
      </h3>


      <span>
      ${destination.tours}
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


}


renderDestinations();


// category

const categories = [

{
    id:1,
    title:"تورهای خارجی",
    image:"../assets/images/category/category1.jpg",
    options:[
        "ترکیه",
        "امارات",
        "گرجستان",
        "ارمنستان",
        "تایلند",
        "فرانسه",
        "ایتالیا",
        "سوئد",
        "سوئیس",
        "آلمان",
        "اسپانیا",
        "اندونزی",
        "مالزی"
    ]
},

{
    id:2,
    title:"تورهای داخلی",
    image:"../assets/images/category/category2.jpg",
    options:[
        "کیش",
        "قشم",
        "مشهد",
        "شیراز",
        "اصفهان",
        "چابهار"
    ]
},

{
    id:3,
    title:"تورهای یک روزه",
    image:"../assets/images/category/category3.jpg",
    options:[
        "ماسال",
        "قلعه بابک",
        "کندوان",
        "آبشار لاتون",
        "کویر مرنجاب"
    ]
},

{
    id:4,
    title:"تورهای ناشناس",
    image:"../assets/images/category/category4.jpg",
    options:[
        "روستاهای بکر",
        "جزایر ناشناخته",
        "جنگل‌های شمال",
        "کوهستان",
        "دریاچه‌های مخفی"
    ]
}

];

const categoriesGrid = document.querySelector(".categories-grid");

function renderCategories(){

    categoriesGrid.innerHTML="";

    categories.forEach(category=>{

        const card=document.createElement("article");

        card.className="category-card";

        card.innerHTML=`

            <div class="category-image">

                <img
                    src="${category.image}"
                    alt="${category.title}"
                >

                <div class="category-overlay">

                    <div class="category-title">
                        <h3>${category.title}</h3>

                    </div>

                </div>

            </div>

            <div class="category-options">

                ${category.options.map(item=>`
                    <a href="#">${item}</a>
                `).join("")}

            </div>

        `;

        categoriesGrid.appendChild(card);

    });

}

renderCategories();


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

        card.className = "review-card";

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

renderReviews();