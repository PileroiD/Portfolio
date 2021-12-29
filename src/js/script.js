'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector('.hamburger');
    const closeBtn = document.querySelector('.menu__close');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', (e) => {
        menu.classList.add('active');
    });

    closeBtn.addEventListener('click', (e) => {
        menu.classList.remove('active');
    });


    // skills

    const counters = document.querySelectorAll('.tools__percents-amount');
    const lines = document.querySelectorAll('.tools__percents-child');

    counters.forEach((item, i) => {
        lines[i].style.width = item.innerHTML;
    });

});
