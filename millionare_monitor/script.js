const add = document.getElementById('adduser');
const double = document.getElementById('double');
const showmil = document.getElementById('show');
const sortUser = document.getElementById('sort');
const Total = document.getElementById('calculate');
const main = document.getElementById('main');

let userData = [];

async function addUser(providedData = userData) {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const user = data.results[0];
    console.log(user);
    const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
    userData.push(newUser);
    updateDOM();
}

function updateDOM(providedData = userData){
    main.innerHTML = ' <h2><strong>Person</strong>Wealth</h2>';
    userData.forEach((items, index) => {
    let newData = document.createElement('div');
    newData.classList.add('person')
    newData.innerHTML = `<strong>${items.name}</strong>${formatMoney(items.money)}`;
    main.append(newData);
})
}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney(){
    data = userData.map((items) => {
        console.log(items);
        return {name: items.name, money: items.money*2};
    });
    userData = data;
    updateDOM();
}

function show(providedData = userData) {
    let userData = providedData.filter((items) => items.money > 1000000);
    // userData = data;
    updateDOM();
}

function sort(providedData = userData) {
    userData.sort((a, b) => a.money - b.money);
    updateDOM();
}

function calculate() {
    let total = userData.reduce((acc,items) => acc+items.money, 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3><strong>${"Total Wealth"}</strong>${formatMoney(total)}</h3>`
    main.append(wealthElement);
}

add.addEventListener('click', addUser);
double.addEventListener('click', doubleMoney);
showmil.addEventListener('click', show);
sortUser.addEventListener('click', sort);
Total.addEventListener('click', calculate);