// В index.html
// 1 получить массив объектов user с endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вывести id,name всех user в index.html. Отдельный блок для каждого user.
// 3 Добавить каждому блоку кнопку/ссылку , при клике на которую происходит переход на страницу user-details.html,
//      которая имеет детальную информацию про объект на который кликнули
let container = document.createElement('div');
document.body.append(container);
    container.style = `
                    display: flex;
                    flex-direction: column;
                    align-items: center;
    `;
let userKey = 'user';
localStorage.setItem(userKey, JSON.stringify([]));

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(response => {
        response.forEach((user) => {
            let divWrap = document.createElement('div');
                divWrap.style = `
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                padding: 5px;
                                border: 1px solid yellow;
                                border-radius: 5px;
                                margin: 5px;
                                width: 20%;
                                background-color: darkorange;
                `;
            let divUser = document.createElement('div');
            divUser.innerHTML = `ID: ${user.id} User: ${user.name}`;
            let btnUserDetails = document.createElement('button');
            btnUserDetails.innerHTML = `<a href = 'user-details.html' class="btnUserDetails">Details</a>`;
            container.append(divWrap);
            divWrap.append(divUser, btnUserDetails);
            btnUserDetails.onclick = (e) => {
                // e.preventDefault();
                let users = JSON.parse(localStorage.getItem(userKey));
                users.push(user);
                localStorage.setItem(userKey, JSON.stringify(users));
            };
        })
    });

// На странице user-details.html:
// 4 Вывести всю, без исключения, информацию про объект user на кнопку/ссылку которого был совершен клик ранее.
// 5 Добавить кнопку "post of current user", при клике на которую, появляются title всех постов текущего юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту добавить кнопку/ссылку, при клике на которую происходит переход на страницу post-details.html,
//      которая имеет детальную информацию про текущий пост.
//
// На странице post-details.html:
// 7 Вывести всю, без исключения, информацию про объект post на кнопку/ссылку которого был совершен клик ранее.
// 8 Ниже информации про пост, вывести все комментарии текущего поста (эндпоинт для получения
//      информации - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизация проекта -
// index.html - все блоки с user - по 2 в ряд. кнопки/ссылки находяться под информацией про user.
// user-details.html - блок с информацией про user вверху страницы. Кнопка ниже, на 90% ширины страницы, по центру.
// блоки с краткой информацией про post - в ряд по 5 объектов.
// post-details.html - блок с информацией про пост вверху. Комментарии - по 4 в ряд.
// Все без исключения элементы, который характеризируют user,post,comment  визуализировать, так, что бы было
//  видно их блоки (дать задний фон + margin. Иными словами - крайне четкая сетка)
