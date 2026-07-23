// fake datas

const heroData=
{
    "heroImages": [
        "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1783718543/venice_4_irrbbf.jpg",
        "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1783716242/claudio-schwarz-TScGhJM716g-unsplash_sydz7c.jpg",
        "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1783716235/simon-vollformat-VFXYkDjAfKk-unsplash_vgsjvc.jpg",
        "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1783716294/levin-i8IPxSMJWtA-unsplash_bkxh58.jpg",
        "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1783718563/venice_1_devdej.jpg"
    ]
}

const tourDetails = {

    id: 1,

    title: "تور رویایی ایتالیا؛ سفر به قلب تاریخ و هنر",

    description:
        "در این سفر جذاب از شهرهای تاریخی ایتالیا مانند رم، فلورانس و ونیز بازدید می‌کنید و تجربه‌ای فراموش‌نشدنی از فرهنگ، غذا و معماری این کشور خواهید داشت.",

    badge: "پرفروش",

    country: "ایتالیا",

    city: "ونیز",

    duration: 7,

    meals: "صبحانه",

    suitable: "خانواده‌ها، زوج‌ها و علاقه‌مندان به تاریخ",

    price: 85000000,

    remaining: 6,

    departureDates: {

        start: {
            day: "1405/05/08",
            time: "12:00"
        },

        end: {
            day: "1405/05/15",
            time: "18:30"
        }

    },

    flight: {

        departure: {

            date: "1405/05/08",

            origin: "تهران",

            destination: "رم",

            airline: "Qatar Airways",

            number: "QR499",

            time: "12:00"

        },

        return: {

            date: "1405/05/15",

            origin: "رم",

            destination: "تهران",

            airline: "Qatar Airways",

            number: "QR498",

            time: "18:30"

        }

    },

    hotel: {

        images: [

            "../assets/images/hotels/rome-hotel-1.jpg",

            "../assets/images/hotels/rome-hotel-2.jpg",

            "../assets/images/hotels/rome-hotel-3.jpg",

            "../assets/images/hotels/rome-hotel-4.jpg"

        ],

        title: "Grand Rome Hotel",

        description:
            "هتل Grand Rome یکی از هتل‌های ۴ ستاره محبوب شهر رم است که در موقعیتی مناسب نزدیک به جاذبه‌های اصلی شهر قرار دارد. این هتل با اتاق‌های مدرن، خدمات حرفه‌ای و امکانات کامل، اقامتی راحت و آرام را برای مسافران فراهم می‌کند.",

        location: {

            country: "ایتالیا",

            city: "رم",

            address: "Via Nazionale 45, Rome, Italy"

        },

        stars: 4,

        facilities: [

            {
                icon: "wifi-outline",
                title: "WiFi رایگان"
            },

            {
                icon: "restaurant-outline",
                title: "رستوران"
            },

            {
                icon: "car-outline",
                title: "پارکینگ"
            },

            {
                icon: "fitness-outline",
                title: "باشگاه ورزشی"
            },

            {
                icon: "cafe-outline",
                title: "صبحانه رایگان"
            },

            {
                icon: "bed-outline",
                title: "خدمات اتاق"
            }

        ],

        features: [

            "۵ دقیقه فاصله تا مرکز شهر",

            "دسترسی آسان به مترو",

            "اتاق‌های مجهز و مدرن",

            "مناسب برای خانواده‌ها",

            "پرسنل چندزبانه",

            "نزدیک به جاذبه‌های گردشگری"

        ]

    },

    itinerary: [

        {

            day: 1,

            title: "ورود به رم",

            description:
                "ورود به فرودگاه رم، استقبال توسط لیدر تور، انتقال به هتل و استراحت."

        },

        {

            day: 2,

            title: "بازدید از جاذبه‌های رم",

            description:
                "بازدید از کولوسئوم، واتیکان، میدان اسپانیا و خیابان‌های تاریخی رم."

        },

        {

            day: 3,

            title: "سفر به فلورانس",

            description:
                "حرکت به فلورانس و بازدید از معماری رنسانس، کلیساها و موزه‌های معروف."

        },

        {

            day: 4,

            title: "تجربه شهر ونیز",

            description:
                "قایق‌سواری در کانال‌های ونیز، بازدید از میدان سن مارکو و پل ریالتو."

        },

        {

            day: 5,

            title: "خرید و زمان آزاد",

            description:
                "زمان آزاد برای خرید، گردش شخصی و تجربه غذاهای محلی ایتالیا."

        },

        {

            day: 6,

            title: "بازگشت به رم",

            description:
                "بازگشت به رم، استراحت و آماده شدن برای پرواز برگشت."

        },

        {

            day: 7,

            title: "پایان سفر",

            description:
                "انتقال به فرودگاه و پایان تور."

        }

    ]

};

function formatPrice(price){

    return new Intl.NumberFormat("fa-IR")
    .format(price) + " تومان";

}




function renderTourDetails(){

    document.getElementById("tour-details-title-h2")
    .textContent = tourDetails.title;



    document.getElementById("tour-details-description")
    .textContent = tourDetails.description;



    const badgeEl = document.getElementById("tour-badge");
    if (badgeEl) {
      badgeEl.textContent = tourDetails.badge || "";
    }


    document.getElementById("tour-destination").textContent =
    `${tourDetails.country} - ${tourDetails.city}`;


    document.getElementById("tour-duration").textContent =
    `${tourDetails.duration} روز و ${tourDetails.duration - 1} شب`;


    document.getElementById("tour-start-date").textContent =
    tourDetails.departureDates.start.day;


    document.getElementById("tour-meals").textContent =
    tourDetails.meals;


    // document.getElementById("tour-suitable").textContent =
    // tourDetails.suitable;





    // reserve

    document.getElementById("reserve-price")
    .textContent =
    formatPrice(tourDetails.price);



    document.getElementById("reserve-count")
    .textContent =
    `${tourDetails.remaining} نفر`;




    renderFlight()

    renderHotel();

    renderFacilities();

    renderFeatures();

    renderItinerary();


}



function renderFlight() {

    const departure = tourDetails.flight.departure;
    const back = tourDetails.flight.return;

    // رفت

    document.getElementById("departure-date").textContent =
        departure.date;

    document.getElementById("departure-origin").textContent =
        departure.origin;

    document.getElementById("departure-destination").textContent =
        departure.destination;

    document.getElementById("departure-airline").textContent =
        departure.airline;

    document.getElementById("departure-number").textContent =
        departure.number;

    document.getElementById("departure-time").textContent =
        departure.time;


    // برگشت

    document.getElementById("return-date").textContent =
        back.date;

    document.getElementById("return-origin").textContent =
        back.origin;

    document.getElementById("return-destination").textContent =
        back.destination;

    document.getElementById("return-airline").textContent =
        back.airline;

    document.getElementById("return-number").textContent =
        back.number;

    document.getElementById("return-time").textContent =
        back.time;

}



function renderHotel(){


  document.getElementById("hotel-title")
  .textContent =
  tourDetails.hotel.title;



  document.getElementById("hotel-description")
  .textContent =
  tourDetails.hotel.description;



  document.getElementById("hotel-address")
  .textContent =
  tourDetails.hotel.location.address;



  document.getElementById("hotel-stars")
  .textContent =
  "★".repeat(tourDetails.hotel.stars);




  const gallery =
  document.getElementById("hotel-gallery");


  gallery.innerHTML =
  tourDetails.hotel.images.map(img=>`

  <img src="${img}" alt="hotel">

  `).join("");



}









function renderFacilities(){


const container =
document.getElementById("facilities-grid");


container.innerHTML =
tourDetails.hotel.facilities.map(item=>`

<div class="facility-item">

<ion-icon name="${item.icon}"></ion-icon>

<span>${item.title}</span>

</div>


`).join("");

}








function renderFeatures(){


const container =
document.getElementById("hotel-features");



container.innerHTML =
tourDetails.hotel.features
.map(item=>`<li>${item}</li>`)
.join("");



}








function renderItinerary(){


const container =
document.getElementById("itinerary-list");



container.innerHTML =
tourDetails.itinerary.map(item=>`

<div class="itinerary-item">


<div class="day-number">

${item.day}

</div>



<div class="day-content">

<h3>
${item.title}
</h3>


<p>
${item.description}
</p>


</div>


</div>


`).join("");



}




renderTourDetails();







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

submenuItems.forEach((item) => {
  const linkText = item.querySelector(".navbar-link").textContent.replace("تور", "").trim();
  const category = navbarCategories.find((cat) => cat.title.includes(linkText));

  if (!category) return;

  const submenu = item.querySelector("[data-submenu]");

  category.options.forEach((option) => {
    const li = document.createElement("li");
    li.classList.add("submenu-item");

   li.innerHTML = `
      <a href="../result/result.html?destination=${encodeURIComponent(option)}"
        class="submenu-link">
        ${option}
      </a>`;

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



const fallbackBg = document.querySelector(".hero-bg-fallback");
const apiBgs = document.querySelectorAll(".hero-bg-api");
let activeApiLayer = null;
let nextLayerIndex = 0;



let count = 0;
let firstHeroLoad = true;


startHeroSlider(heroData.heroImages);

function startHeroSlider(images) {
  changeHero(images);
  setInterval(() => {
    changeHero(images);
  }, 8000);
}


// change hero
function changeHero(images) {

  const currentImage = images[count];
  count = (count + 1) % images.length;

  const incomingLayer = apiBgs[nextLayerIndex];
  nextLayerIndex = (nextLayerIndex + 1) % apiBgs.length;

  incomingLayer.style.backgroundImage = `url(${currentImage})`;

  requestAnimationFrame(() => {
    incomingLayer.classList.add("active");

    if (activeApiLayer) {
      activeApiLayer.classList.remove("active");
    }
    fallbackBg.classList.remove("active");

    activeApiLayer = incomingLayer;
  });

}



//result title

function updateResultTitle(destination) {
  const resultTitle = document.getElementById("result-tours-title-h2");

  if (resultTitle) {
    resultTitle.textContent = `تورهای ${destinationName}`;
  }

}


//animation — scroll reveal for content sections

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

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
