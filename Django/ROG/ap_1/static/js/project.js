document.addEventListener("DOMContentLoaded", () => {

    // =====================
    // CLOCK
    // =====================
    const clock = document.getElementById("clock");

    function real_clock() {
        const now = new Date();
        let hours = now.getHours();
        const meridiem = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        // FIXED: was hours.toString().padStart(2, 0) — result wasn't being stored
        const hoursStr = hours.toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        clock.innerText = `${hoursStr}:${minutes}:${seconds} ${meridiem}`;
    }

    real_clock(); // show immediately on load
    setInterval(real_clock, 1000);


    // =====================
    // NAVIGATION BAR - hover colors
    // =====================
    const navGroups = [
        { title: ".navbar_titles1", elements: ".navbar_titles1_e" },
        { title: ".navbar_titles2", elements: ".navbar_titles2_e" },
        { title: ".navbar_titles3", elements: ".navbar_titles3_e" },
        { title: ".navbar_titles4", elements: ".navbar_titles4_e" },
        { title: ".navbar_titles5", elements: ".navbar_titles5_e" },
    ];

    function styleTitleGroup(titleSelector, elementSelector) {
        const titles = document.querySelectorAll(titleSelector);
        const elements = document.querySelectorAll(elementSelector);

        titles.forEach((t) => {
            t.addEventListener("mouseover", () => { t.style.color = "red"; });
            t.addEventListener("mouseout",  () => { t.style.color = "white"; });
        });

        elements.forEach((e) => {
            e.addEventListener("mouseover", () => {
                titles.forEach(t => t.style.color = "red");
            });
            e.addEventListener("mouseout", () => {
                titles.forEach(t => t.style.color = "white");
            });
        });
    }

    navGroups.forEach(g => styleTitleGroup(g.title, g.elements));


    // =====================
    // NAVIGATION BAR - dropdown open/close
    // =====================
    const subMenus = document.querySelectorAll(".subMenu");
    const menuItems = document.querySelectorAll(".menu");

    subMenus.forEach(e => e.style.display = "none");

    menuItems.forEach((item) => {
        item.addEventListener("mouseover", () => {
            const sub = item.querySelector(".subMenu");
            if (sub) sub.style.display = "block";
        });
        item.addEventListener("mouseout", () => {
            const sub = item.querySelector(".subMenu");
            if (sub) sub.style.display = "none";
        });
    });


    // =====================
    // NAVIGATION BAR - element hover color
    // =====================
    document.querySelectorAll(".navbar_elements").forEach((e) => {
        e.addEventListener("mouseover", () => { e.style.color = "red"; });
        e.addEventListener("mouseout",  () => { e.style.color = "#ddd"; });
    });


    // =====================
    // IMAGE SLIDER
    // =====================
    const images = document.querySelectorAll(".list_image");
    const totalImages = images.length;
    let currentIndex = 0;
    let autoTimer = null; // FIXED: proper reference for clearing interval

    images.forEach(img => img.style.display = "none");
    images[currentIndex].style.display = "block";

    const leftBtn  = document.getElementById("list2_btn_left");
    const rightBtn = document.getElementById("list2_btn_right");

    function showImage(index) {
        images[currentIndex].style.display = "none";
        currentIndex = (index + totalImages) % totalImages;
        images[currentIndex].style.display = "block";
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoTimer = setInterval(() => showImage(currentIndex + 1), 3000);
    }

    function stopAutoSlide() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    // FIXED: pause on click, then resume after 6 seconds
    rightBtn.addEventListener("click", () => {
        showImage(currentIndex + 1);
        stopAutoSlide();
        setTimeout(startAutoSlide, 6000);
    });

    leftBtn.addEventListener("click", () => {
        showImage(currentIndex - 1);
        stopAutoSlide();
        setTimeout(startAutoSlide, 6000);
    });

    startAutoSlide();


    // =====================
    // JOIN THE REPUBLIC
    // =====================
    const rogUniverse = document.getElementById("join_text1");
    if (rogUniverse) {
        rogUniverse.addEventListener("mouseover", () => { rogUniverse.style.color = "red"; });
        rogUniverse.addEventListener("mouseout",  () => { rogUniverse.style.color = "white"; });
    }


    // =====================
    // FOOTER hover
    // =====================
    document.querySelectorAll(".footer_list_elements").forEach((e) => {
        e.addEventListener("mouseover", () => { e.style.color = "hsl(333, 100%, 50%)"; });
        e.addEventListener("mouseout",  () => { e.style.color = "white"; });
    });

});
