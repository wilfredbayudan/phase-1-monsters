const PAGELIMIT = 50;
document.addEventListener('DOMContentLoaded', () => {
  const dbUrl = 'http://localhost:3000/monsters';

  const monsterContainer = document.getElementById('monster-container');
  const form = document.querySelector('div#create-monster form');
  const backBtn = document.getElementById('back');
  const fwdBtn = document.getElementById('forward');

  backBtn.addEventListener('click', prevPage);
  fwdBtn.addEventListener('click', nextPage);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputMonster = document.getElementById('monster-name').value;
    const inputAge = document.getElementById('monster-age').value;
    const inputDesc = document.getElementById('monster-desc').value;
    postMonster(inputMonster, inputAge, inputDesc);
    form.reset();
  })

  let currentPage = 1;
  renderMonsters();


  function renderMonsters(page='1') {
  
  const dbUrlFetch = `${dbUrl}/?_limit=${PAGELIMIT}&_page=${page}`;
  console.log(`Page ${page}`);

  fetch(dbUrlFetch)
    .then(res => res.json())
    .then(monsterData => {
      monsterContainer.textContent = '';
      // After it loads, clear the current page
      monsterData.forEach(monster => appendMonster(monster.name, monster.age, monster.description));
    })
    .catch(err => console.log(err));
  }

  function appendMonster(name, age, description) {
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    h4.textContent = name;
    div.appendChild(h4);
    const span = document.createElement('span');
    span.textContent = age;
    div.appendChild(span);
    const p = document.createElement('p');
    p.textContent = description;
    div.appendChild(p);
    monsterContainer.appendChild(div);
  }

  function nextPage() {
    currentPage++;
    renderMonsters(currentPage);
  }
  function prevPage() {
    if (currentPage !== 1) {
      currentPage--;
      renderMonsters(currentPage);
    }
  }

  function postMonster(name, age, description) {
    const postConfig = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name, age, description
      })
    }
    fetch(dbUrl, postConfig)
      .then(res => res.json())
      .then(data => appendMonster(data.name, data.age, data.description))
      .catch(err => console.log(err));
  }
})