let wrapper = document.createElement('div');
document.body.append(wrapper);

let container = document.createElement('div');
    container.className = 'active';
    container.style = `
                    display: flex;
                    flex-direction: column-reverse;
                    align-items: center;
                    margin-top: 115px;
    `;
let container2 = document.createElement('div');
    container2.style = `
                        display: flex;
                        flex-direction: column-reverse;
                        align-items: center;                       
                        margin-top: -485px;
    `;
wrapper.append(container, container2);

let btnPostCurrentUser = document.createElement('button');
    btnPostCurrentUser.innerText = 'Post of current User';
    container.append(btnPostCurrentUser);
    btnPostCurrentUser.style = `
                                width: 90%;
                                height: 30px;
                                border-radius: 5px;
                                border: 1px solid blue;
                                margin-top: 95px;                                
    `;

let userKey = 'user';
let users = JSON.parse(localStorage.getItem(userKey));
let userId;

// users.forEach((user) => {
//     let divUser = document.createElement('div');
//     container.append(divUser);
//
//     for (let userKey in user) {
//         if (user[userKey] != '[object Object]') {
//             let idUser = document.createElement('div');
//             idUser.innerHTML = `${userKey} - ${user[userKey]}`;
//             divUser.append(idUser);
//             userId = user.id;
//         };
//     };
//     for (let addressKey in  user.address) {
//         if (user.address[addressKey] != '[object Object]') {
//             let addressUser = document.createElement('div');
//             addressUser.innerHTML = `${addressKey} - ${user.address[addressKey]}`;
//             divUser.append(addressUser);
//         };
//     };
//     for (let companyKey in user.company) {
//         let company = document.createElement('div');
//         company.innerHTML = `${companyKey} - ${user.company[companyKey]}`
//         divUser.append(company);
//     };
//     for (let geoKey in user.address.geo) {
//         let geo = document.createElement('div');
//         geo.innerHTML = `GEO Location: ${geoKey} - ${user.address.geo[geoKey]}`;
//         divUser.append(geo);
//     };
// });

// Через рекурсию V

users.forEach((user) => {
    userId = user.id;
    let olUser = document.createElement('ol');
    container.append(olUser);
    function getDataUser(user){
        getData(user);
        function getData(o) {
            for (let key in o) {
                let divUser = document.createElement('div');
                olUser.append(divUser);
                if (typeof o[key] === 'object') {
                    olUser.firstChild.style = `
                                                font-weight: bolder;
                                                font-size: larger;
                    `;
                    divUser.innerHTML = `<strong>${key.toUpperCase()}</strong>`;
                    getData(o[key]);
                } else {
                    divUser.innerText = `${key[0].toUpperCase() + key.slice(1)} : ${o[key]}`;
                };
            };
        };
    };
    getDataUser(user);
});

let titleKey = 'title';
localStorage.setItem(titleKey, JSON.stringify([]));

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(response => response.json())
    .then(response => {
        btnPostCurrentUser.onclick = () => {
            response.forEach((value) => {
                    let title = document.createElement('div');
                    let btnMoreAboutPost = document.createElement('button');
                        btnMoreAboutPost.style = `
                                                width: fit-content;
                        `;
                    let div = document.createElement('div');
                        btnMoreAboutPost.innerHTML = `<a href="post-details.html">More About Post</a>`;
                        title.innerHTML = `Title: <a href="post-details.html">${value.title}</a>`;
                        div.style = `
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    border: 1px solid orange;
                                    width: 33%;
                                    border-radius: 5px;
                                    padding: 5px;
                                    margin: 5px 0;                                    
                                    background: linear-gradient(45deg, #2196f3, #e91e63);
                                    position: relative;
                                    top: -100px;
                                    text-align: center;
                        `;

                    container2.append(div);

                    div.append(title, btnMoreAboutPost);
                    btnMoreAboutPost.onclick = () => {
                        let titles = JSON.parse(localStorage.getItem(titleKey));
                        titles.push(value);
                        localStorage.setItem(titleKey, JSON.stringify(titles));
                    };
            });
            let hide = document.getElementsByClassName('active');
                hide[0].classList.toggle('hide');
            window.scrollBy(0, 0);
        };
    });