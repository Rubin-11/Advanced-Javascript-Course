
const arryFormEl = [
    document.querySelector('#name'),
    document.querySelector('#tel'),
    document.querySelector('#email'),
];
const button = document.querySelector('#form').addEventListener('submit', i => {
    arryFormEl.forEach(element => {
        switch (element.name) {
            case "name":
                let regexp = /^[a-zа-яё]+$/i;
                if(regexp.test(element.value) ) {
                    element.classList.remove("input");
                    break;
                }
                i.preventDefault();
                if(document.querySelector('.name')) {
                    break;
                }
                element.insertAdjacentHTML('afterend', '<p class="error name">Имя содержит только буквы</p>');
                element.classList.add("input");
                break;
            case "tel":
                let regexp2 = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
                if(regexp2.test(element.value)) {
                    element.classList.remove("input");
                    break;
                }
                i.preventDefault();
                if(document.querySelector('.tel')) {
                    break;
                }
                element.insertAdjacentHTML('afterend', '<p class="error tel">Телефон подчиняется шаблону +7(000)000-0000</p>');
                element.classList.add("input");
                break;
            case "email":
                let regexp3 = /^[\w._-]+@\w+\.[a-z]{2,4}$/i;
                if(regexp3.test(element.value)) {
                    element.classList.remove("input");
                    break;
                }
                i.preventDefault();
                if(document.querySelector('.email')) {
                    break;
                }
                element.insertAdjacentHTML('afterend', '<p class="error email">E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru</p>');
                element.classList.add("input");
                break;
        }
    })
});