document.querySelector('#addBtn').addEventListener('click', addBurger);

async function addBurger() {
  const input = document.querySelector('#burgerInput').value;
  console.log('Reading input: ', input);
  // reject empty string
  if (input === '') return;
  // send data to server
  const res = await fetch(`/burger`, { 
    method:'POST',
    headers: { 'Content-Type': 'application/JSON' },
    body: `{ \"input\": \"${input}\" }`
  }).then( r => r.json());
  console.log(res.message);
  // empty input & reload list
  document.querySelector('#burgerInput').value = '';
  loadList();
}

async function loadList() {
  const list = await fetch(`/burger`).then( r => r.json());
  document.querySelector('#entries').innerHTML = '';

  for (let i=0; i<list.length; i++) {
    if (list[i].is_eaten) document.querySelector('#entries').innerHTML += 
      `<div class="row-3"><div></div>
      <div><button class="bgrBtn" data-fn="del" data-bid="${list[i].id}">Delete this burger</button></div>
      <div>${list[i].burger_name}</div></div>`;
    else document.querySelector('#entries').innerHTML += 
      `<div class="row-3"><div>${list[i].burger_name}</div>
      <div><button class="bgrBtn" data-fn="eat" data-bid="${list[i].id}" data-burger="${list[i].burger_name}">Eat the burger</button></div>
      <div></div></div>`;
  }

  let btns = document.querySelectorAll(`.bgrBtn`);
  btns.forEach(btn => btn.addEventListener('click', burgerBtn));
}

async function burgerBtn(e) {

  const fn = e.target.dataset.fn;
  const id = e.target.dataset.bid;
  let burger_name = null;
  if (fn === "eat") {
    // change burger to ate
    burger_name = e.target.dataset.burger;
    const res = await fetch(`/burger`, { 
      method:'PUT',
      headers: { 'Content-Type': 'application/JSON' },
      body: `{ \"id\": \"${id}\", \"burger_name\": \"${burger_name}\" }`
    }).then( r => r.json());
    console.log(res.message);
  }
  else {
    // delete burger
    const res = await fetch(`/burger/${id}`, { method:'DELETE' }).then( r => r.json());
    console.log(res.message);
  }
  
  loadList();
}

loadList();