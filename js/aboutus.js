
// counters


jQuery(document).ready(function ($) {
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
});

// scrolling
window.addEventListener('scroll', reveal);
function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 100;
        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}




let http = new XMLHttpRequest();
http.open('get', 'data.json', true);

http.send();

http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        let products = JSON.parse(this.responseText);
        console.log(products);

        let output = "";

        for (let item of products) {
            output += `
                <img src="${item.image}" alt="" class="image">
                <p>${item.description}</p>
                <i class="fa-solid fa-quote-right quote-icon"></i>
                <div class="details">
                    <span class="name">${item.name}</span>
                    <span class="job">${item.job}</span>
                    <span class="icons"> 
                        <a href="https://www.linkedin.com/in/shahd-abdalgny-8197b8292/">
                            <i class="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/Shahd-Abdalghny">
                            <i class="fa-brands fa-github"></i>
                        </a>
                    </span>
                </div>
            `;
        }
        document.querySelector(".slide").innerHTML = output;
    }
}






















/*=============== SWIPER JS ===============*/
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    // spaceBetween: 30,
    grabCursor : true,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});