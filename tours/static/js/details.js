const params = new URLSearchParams(window.location.search);


const tourId = params.get("id");
const city = params.get("city");
const country = params.get("country");




function dateGenerator(startDate) {
  const [year, month, day] =
    startDate.split("-");


    const date = new Date(
        year,
        month - 1,
        day
    );


    return date.toLocaleDateString(
        "fa-IR",
        {
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

}
// اطلاعات اصلی تور

let tourDetails = null;

async function fetchTourDetails(){
    try{

        const response = await fetch(
            `https://velora-1-cbh9.onrender.com/api/tour/${tourId}`
        );

        if(!response.ok){

            throw new Error(
                "Tour Details API Error"
            );
        }
        tourDetails = await response.json();
             

    }
    catch(error){

        console.error(error);

    }
}



function formatPrice(price){

    return new Intl.NumberFormat("fa-IR")
    .format(price) + " تومان";

}

// hero bakcground

let heroData = {
    heroImages: []
};
async function fetchHero(){
    try{
        const response = await fetch(
            `https://velora-1-cbh9.onrender.com/api/tour/hero/${tourId}`
        );

        if(!response.ok){
            throw new Error(
                "Hero API Error"
            );
        }

        const data = await response.json();

        heroData.heroImages =
        data.images.map(item => item.image);
        console.log("Hero:", heroData);
    }
    catch(error){
        console.error(error);
    }

}

// اطلاعات اصلی

function toPersianNumber(number){

    return String(number).replace(
        /\d/g,
        digit => "۰۱۲۳۴۵۶۷۸۹"[digit]
    );

}
function renderTourDetails(){

    document.getElementById("modal-tour-title")
    .textContent =
    tourDetails.subtitle;



    document.getElementById("modal-destination")
    .textContent =
    tourDetails.city;



    document.getElementById("modal-price")
    .textContent =
    formatPrice(tourDetails.price);

    document.getElementById("tour-details-title-h2")
    .textContent = tourDetails.subtitle;



    document.getElementById("tour-details-description")
    .textContent = tourDetails.description;



    const badgeEl = document.getElementById("tour-badge");
    if (badgeEl) {
      badgeEl.textContent = tourDetails.badge || "";
    }


    document.getElementById("tour-destination").textContent =
    `${tourDetails.country} - ${tourDetails.city}`;


    document.getElementById("tour-duration").textContent =
    `${toPersianNumber(tourDetails.duration)} روز و ${toPersianNumber(tourDetails.duration - 1)} شب`;


    document.getElementById("tour-start-date").textContent =
    dateGenerator(tourDetails.start_date);


    document.getElementById("tour-meals").textContent =
    tourDetails.meals;




}

function renderReserveCard(){

    const capacityProgress =
    document.getElementById("capacity-progress");


    if(capacityProgress){

        const totalCapacity = 30;
        const remaining =
        tourDetails.remaining_capacity;
        const usedPercent =
        ((totalCapacity - remaining) / totalCapacity) * 100;
        capacityProgress.style.width =
        `${usedPercent}%`;


}


    const price =
    document.getElementById("reserve-price");


    const destination =
    document.getElementById("reserve-destination");


    const date =
    document.getElementById("reserve-date");


    const count =
    document.getElementById("reserve-count");



    if(price){
        price.textContent =
        formatPrice(tourDetails.price);

    }

    if(destination){
        destination.textContent =
        `${tourDetails.country} - ${tourDetails.city}`;

    }
    if(date){
        date.textContent =
        dateGenerator(tourDetails.start_date);
    }


    if(count){
        count.textContent =
        `${toPersianNumber(tourDetails.remaining_capacity)} نفر`;

    }

}



// پرواز
function formatTime(time){

    if(!time) return "";

    const [hour, minute] = time.split(":");


    return `${hour}:${minute}`.replace(
        /\d/g,
        digit => "۰۱۲۳۴۵۶۷۸۹"[digit]
    );

}

function formatFlightDate(date){

 const [year,month,day]=date.split("-");

 return new Date(
    year,
    month-1,
    day
 ).toLocaleDateString(
    "fa-IR",
    {
       day:"numeric",
       month:"long",
       year:"numeric"
    }
 );

}

let flightData = null;

async function fetchFlight(){

    try{
        const response = await fetch(
            `https://velora-1-cbh9.onrender.com/api/flight/${tourId}`
        );
        if(!response.ok){

            throw new Error(
                "Flight API Error"
            );
        }

        flightData = await response.json();
        console.log("Flight:", flightData);
    }

    catch(error){
        console.error(error);
    }

}
function renderFlight(){

    if(!flightData){
        console.warn("No flight data");
        return;
    }
    const departure =
    flightData.departure_flight;
    const arrival =
    flightData.arrival_flight;

    //  رفت

    document.getElementById("departure-date").textContent =
    formatFlightDate(departure.departure_date);

    document.getElementById("departure-origin").textContent =
    departure.origin;

    document.getElementById("departure-destination").textContent =
    departure.destination;

    document.getElementById("departure-airline").textContent =
    departure.airline;

    document.getElementById("departure-number").textContent =
    toPersianNumber(departure.number);

    document.getElementById("departure-time").textContent =
    formatTime(departure.departure_time);


    //  برگشت

    document.getElementById("return-date").textContent =
    formatFlightDate(arrival.arrival_date);

    document.getElementById("return-origin").textContent =
    arrival.origin;

    document.getElementById("return-destination").textContent =
    arrival.destination;

    document.getElementById("return-airline").textContent =
    arrival.airline;

    document.getElementById("return-number").textContent =
    toPersianNumber(arrival.number);

    document.getElementById("return-time").textContent =
    formatTime(arrival.arrival_time);


}


// هتل
let hotelData = null;
async function fetchHotel(){

    try{
  
        const response = await fetch(
            `https://velora-1-cbh9.onrender.com/api/hotel/${tourId}`
        );

        if(!response.ok){

            throw new Error(
                "Hotel API Error"
            );
        }
        const data = await response.json();

        hotelData = {
            ...data,
            images:
            data.images.map(item=>item.image)

        };


    }

    catch(error){

        console.error(error);

    }


}




function renderHotel(){

  document.getElementById("hotel-title")
  .textContent =
  hotelData.title;



  document.getElementById("hotel-description")
  .textContent =
  hotelData.description;



  document.getElementById("hotel-address")
  .textContent =
  hotelData.location.address;



  document.getElementById("hotel-stars")
  .textContent =
  "★".repeat(hotelData.stars)
  +
  "☆".repeat(5-hotelData.stars);




  const gallery =
  document.getElementById("hotel-gallery");


  gallery.innerHTML = hotelData.images.map((img,index)=>`

<div class="hotel-image ${index === 0 ? "hotel-main-image" : ""}">

    <img 
        src="${img}" 
        alt="${hotelData.title}"
    >

    ${
      index === 0 
      ? `
      <button class="gallery-overlay">
          <ion-icon name="images-outline"></ion-icon>
          <span>
          ${toPersianNumber(hotelData.images.length)} عکس
          </span>
      </button>
      `
      :
      ""
    }

</div>

`).join("");
const galleryBtn =
document.querySelector(".gallery-overlay");


if(galleryBtn){

galleryBtn.addEventListener(
"click",
()=>openLightbox(0)
);

}



}



/* ================================
   HOTEL LIGHTBOX
================================ */


const lightbox = document.getElementById("hotel-lightbox");

const lightboxImage =
document.getElementById("lightbox-image");


const counter =
document.getElementById("lightbox-counter");


const closeBtn =
document.querySelector(".lightbox-close");


const prevBtn =
document.querySelector(".lightbox-prev");


const nextBtn =
document.querySelector(".lightbox-next");



let currentImageIndex = 0;



function openLightbox(index){


    currentImageIndex = index;


    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow="hidden";

}



function closeLightbox(){


    lightbox.classList.remove("active");


    document.body.style.overflow="auto";

}



function updateLightbox(){


    const images =
    hotelData.images;


    lightboxImage.src =
    images[currentImageIndex];


    counter.textContent =
    `${toPersianNumber(images.length)} / ${toPersianNumber(currentImageIndex + 1)}`;


}



function nextImage(){


    currentImageIndex++;


    if(currentImageIndex >= hotelData.images.length){

        currentImageIndex=0;

    }


    updateLightbox();

}




function prevImage(){


    currentImageIndex--;


    if(currentImageIndex < 0){

        currentImageIndex =
        hotelData.images.length-1;

    }


    updateLightbox();

}





nextBtn.addEventListener(
"click",
nextImage
);



prevBtn.addEventListener(
"click",
prevImage
);



closeBtn.addEventListener(
"click",
closeLightbox
);




lightbox.addEventListener(
"click",
(e)=>{

    if(e.target === lightbox){

        closeLightbox();

    }

});



document.addEventListener(
"keydown",
(e)=>{


    if(e.key==="Escape"){

        closeLightbox();

    }



    if(e.key==="ArrowRight"){

        nextImage();

    }



    if(e.key==="ArrowLeft"){

        prevImage();

    }


});







// امکانات

function renderFacilities(){


const container =
document.getElementById("facilities-grid");



container.innerHTML =
hotelData.facilities.map(item=>`

<div class="facility-item">

<ion-icon name="${item.icon || "checkmark-circle-outline"}"></ion-icon>

<span>${item.title}</span>

</div>


`).join("");

}







// ویژگی ها
function renderFeatures(){


const container =
document.getElementById("hotel-features");



container.innerHTML =
hotelData.features
.map(item=>`<li>${item}</li>`)
.join("");



}







// برنامه 
let itineraryData = [];

async function fetchItinerary(){

    try{

        const response = await fetch(
            `https://velora-1-cbh9.onrender.com/api/tour/itinerary/${tourId}`
        );
               
        if(!response.ok){
            throw new Error(
                "Itinerary API Error"
            );
        }
        itineraryData = await response.json();
    }
    catch(error){

        console.error(error);

    }
}

// تبدیل به لیست 
function formatItineraryDescription(description) {


    const lines = description
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line !== "");

    if(lines.length === 1){

        return `
        <p>
            ${lines[0]}
        </p>
        `;

    }

    const intro = lines[0];


    const listItems = lines
    .slice(1)
    .map(item => `

        <li>
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <span>${item}</span>
        </li>

    `)
    .join("");



    return `

        <p>
            ${intro}
        </p>


        <ul class="itinerary-points">

            ${listItems}

        </ul>

    `;

}

function renderItinerary(){


    const container =
    document.getElementById("itinerary-list");


    container.innerHTML =
    itineraryData.map(item=>`

    <div class="itinerary-item">


    <div class="day-number">

    ${toPersianNumber(item.day)}

    </div>


    <div class="day-content">

    <h3>
    ${item.title}
    </h3>


    <p>
    ${formatItineraryDescription(item.description)}
    </p>


    </div>


    </div>


    `).join("");


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
const navbarOverlay = document.querySelector("[data-overlay]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  navbarOverlay.classList.toggle("active");
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



const apiBgs = document.querySelectorAll(".hero-bg-api");
let activeApiLayer = null;
let nextLayerIndex = 0;



let count = 0;
let firstHeroLoad = true;




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


const reserveBtn =
document.querySelector(".reserve-btn");


const modal =
document.getElementById("reservation-modal");


reserveBtn.addEventListener("click",()=>{


modal.classList.add("active");

document.body.style.overflow="hidden";


});

const closeModal =
document.querySelector(".reservation-close");


const reservationOverlay  =
document.querySelector(".reservation-overlay");


function closeReservation(){

modal.classList.remove("active");

document.body.style.overflow="auto";

}


closeModal.addEventListener(
"click",
closeReservation
);


reservationOverlay .addEventListener(
"click",
closeReservation
);


// loading untill api ready

const pageLoader = document.getElementById("preloader");

// init

async function initTourPage(){

    try{
        document.body.style.overflow = "hidden";
        
        await Promise.all([
            fetchHero(),
            fetchTourDetails(),
            fetchFlight(),
            fetchHotel(),
            fetchItinerary()
        ]);

        if(heroData.heroImages.length){

            startHeroSlider(heroData.heroImages);

}


        renderTourDetails();
        renderFlight();
        renderHotel();
        renderFacilities();
        renderFeatures();
        renderItinerary();
        renderReserveCard();



    }


    catch(error){


        console.error(
            "Tour Page Error:",
            error
        );


    }


    finally{

        if(pageLoader){
            pageLoader.classList.add("hidden");

        }
        document.body.style.overflow = "auto";


    }


    }






initTourPage();



// reserve form
const reservationForm =
document.getElementById("reservation-form");


reservationForm.addEventListener("submit", async (e)=>{

    e.preventDefault();


    const formData = new FormData(reservationForm);


    const bookingData = {

        name: formData.get("name"),

        national_code: formData.get("national_code"),

        phone: formData.get("phone"),

        email: formData.get("email"),

        passengers: Number(
            formData.get("passengers")
        )

    };


    console.log(bookingData);


    await sendBooking(bookingData);


});

async function sendBooking(data){

    try{

        const response = await fetch(
            `https://velora-1-cbh9.onrender.com/bookings/${tourId}/`,
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(data)
            }
        );


        const result = await response.json();


        if(!response.ok){

            throw new Error(
                result.message || "Booking Error"
            );

        }


        console.log(
    "Booking Success:",
    result
);


showBookingResult(result.message);
reservationForm.reset();


    }

    catch(error){

        console.error(
            "Booking Error:",
            error
        );

        alert(
            "خطا در ثبت رزرو"
        );

    }

}

function showBookingResult(message){

    const modal =
    document.getElementById("booking-success");


    const messageEl =
    document.getElementById("booking-success-message");


    if(messageEl){
        messageEl.textContent = message;
    }


    modal.classList.add("active");

}

const successClose =
document.getElementById("success-close");


const successModal = document.getElementById("booking-success");


successClose.addEventListener("click",()=>{

    // بستن پیام موفقیت
    successModal.classList.remove("active");


    // بستن کامل فرم رزرو
    modal.classList.remove("active");


    // ریست فرم
    reservationForm.reset();


    // آزاد کردن اسکرول
    document.body.style.overflow = "auto";

});