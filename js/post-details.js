let container = document.createElement('div');
    document.body.append(container);
let titleKey = 'title';
let titles = JSON.parse(localStorage.getItem(titleKey));
let userId;

titles.forEach((title) => {
    userId = title.userId;
    let divTitle = document.createElement('div');
        divTitle.style = `
                        margin: 5px;
                        border: 1px solid red;
                        padding: 5px;
                        border-radius: 5px;
                        background-color: bisque;
        `;
    container.append(divTitle);
    for (let titleKey in title) {
        let mainTitle = document.createElement('div');
        divTitle.append(mainTitle);
        mainTitle.innerHTML = `<strong><u>${titleKey[0].toUpperCase() + titleKey.slice(1)}</u></strong> - ${title[titleKey]}`;
    };
});

let divOl = document.createElement('div');
    divOl.style = `
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(271px, 1fr));
    `;
container.append(divOl);

fetch(`https://jsonplaceholder.typicode.com/posts/${userId}/comments`)
    .then(response => response.json())
    .then(response => {
        response.forEach((response) => {
            let olTitle = document.createElement('div');
            olTitle.style = `
                               margin: 5px;
                               border: 1px solid orange;
                               padding: 5px;
                               border-radius: 5px;
                               background-color: yellow;
            `;
            divOl.append(olTitle);
            function getData(response) {
                userData(response);
                function userData(o){
                    for (let key in o) {
                        let divAllTitle = document.createElement('div');
                        olTitle.append(divAllTitle);
                        if (typeof o[key] === 'object') {
                            divAllTitle.innerHTML = `<strong>${key.toUpperCase()}</strong>`;
                            userData(o[key]);
                        } else {
                            divAllTitle.innerHTML = `<strong><u>${key[0].toUpperCase() + key.slice(1)}</u></strong> : ${o[key]}`;
                            console.log(`${key}: ${o[key]}`);
                        };
                    };
                };
            };
            getData(response);
        });
    });