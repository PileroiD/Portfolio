'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector('.hamburger');
    const closeBtn = document.querySelector('.menu__close');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.menu__overlay');

    hamburger.addEventListener('click', (e) => {
        menu.classList.add('active');
    });

    closeBtn.addEventListener('click', close);

    function close() {
        menu.classList.remove('active');
    }
    close();

    overlay.addEventListener('click', close);

    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape' && menu.classList.contains('active')) {
            close();
        }
    });


    // skills

    const counters = document.querySelectorAll('.tools__percents-amount');
    const lines = document.querySelectorAll('.tools__percents-child');

    counters.forEach((item, i) => {
        lines[i].style.width = item.innerHTML;
    });



    //form

    let arrInput = document.querySelectorAll('.form__input');
    let msg = document.querySelector('.msg');
    let gsapMsg = gsap.to(".msg", 0.25, { autoAlpha: 1, y: -40, ease: Expo.inOut, paused: true });
    const form = document.querySelector('#form');

    form.addEventListener('submit', send);

    function send(event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;

        for (let i = 0, count = arrInput.length; i < count; i++) {
            arrInput[i].classList.remove("inputerror");
        }

        event.target.querySelector("button").disabled = true;  // Отключение кнопки для отправки

        showMsg("Подождите. Идёт отправка сообщения", "#b1b1b1");

        let req = new XMLHttpRequest();
        req.open('POST', 'send.php', true);

        req.onload = function () {
            event.target.querySelector("button").disabled = false;  // Обратное включение кнопки для отправки
            // console.log(req.status);

            if (req.status >= 200 && req.status < 400) {
                const json = JSON.parse(this.response); // Переводим ответ в json и выводим в консоль
                // console.log(json);

                // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
                if (json.result == "success") {
                    // если сообщение отправлено
                    showMsg("Сообщение успешно отправлено", "#36AE46");
                    console.log("Сообщение отправлено");
                    event.target.reset();  // Чистим форму
                } else if (json.result == "email") {
                    // Если указан неверный email
                    showMsg("Ошибка. Неверно указан Email", "#DC352F");
                    console.log("Ошибка. Неверно указан Email");
                    document.querySelector("#email").classList.add("inputerror");
                } else {
                    // Если произошла ошибка
                    showMsg("Ошибка. Сообщение не отправлено", "#DC352F");
                    console.log("Ошибка. Сообщение не отправлено");
                }
            } else {
                // Если не удалось связаться с php файлом
                showMsg("Ошибка сервера. Номер: " + req.status, "#DC352F");
            }
        }

        // Если не удалось отправить запрос. Стоит блок на хостинге
        req.onerror = function () {
            showMsg("Ошибка отправки запроса", "#DC352F");
        };

        req.send(new FormData(event.target));

    }

    function showMsg(message, color) {
        msg.innerText = message;
        msg.style.background = color;
        gsapMsg.restart();
        setTimeout(() => {
            msg.style.display = "none";
        }, 3000);
    }

});
