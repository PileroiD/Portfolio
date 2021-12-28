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
});
