document.querySelector('#addBtn').addEventListener('click', addBurger);

async function addBurger() {
  const input = document.querySelector('#burgerInput').value;
  console.log('Reading input: ', input);
  // reject empty string
  if (input === '') return;
  // send data to server
  const res = await fetch(`/burger`, { 
    method:'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: input
  }).then( r => r.json());
  // empty input & reload list
  document.querySelector('#burgerInput').value = '';
  loadList();
}

const arr = [
  {id:1, isEaten:false, str:'Burger 1'}, 
  {id:2, isEaten:false, str:'Burger 2'},
  {id:3, isEaten:true, str:'Burger 3'}
];

async function loadList() {
  const list = arr;
  // const list2 = await fetch(`/burger`).then( r => r.json());
  document.querySelector('#entries').innerHTML = '';

  for (let i=0; i<list.length; i++) {
    if (list[i].isEaten) document.querySelector('#entries').innerHTML += 
      `<div class="row-3"><div></div>
      <div><button id="bgrBtn-${list[i].id}">Eat the burger</button></div>
      <div>${list[i].str}</div></div>`;
    else document.querySelector('#entries').innerHTML += 
      `<div class="row-3"><div>${list[i].str}</div>
      <div><button id="bgrBtn-${list[i].id}">Eat the burger</button></div>
      <div></div></div>`;
  }

  for (let i=0; i<list.length; i++) {
    document.querySelector(`#bgrBtn-${list[i].id}`).addEventListener('click', moveBurger);
  }
}

async function moveBurger(e) {

  const id = e.target.id.replace('bgrBtn-', '');
  const res = await fetch(`/burger/${id}`).then( r => r.json());
  console.log(res);
  loadList();
}

loadList();