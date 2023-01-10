const CATEGORIES = [
  { name: 'tehnologie', color: '#3b82f6', page: 'tehnologie.html' },
    { name: 'd-ale stiintei', color: '#16a34a', page: 'd-ale_stiintei.html' },
  { name: 'bitcoin', color: '#ef4444', page: 'bitcoin.html' },
  { name: 'de moravuri', color: '#eab308', page: 'de moravuri.html' },
  { name: 'timp liber', color: '#db2777', page: 'timp liber.html' },
  { name: 'bunastare', color: '#14b8a6', page: 'bunastare.html' },
  { name: 'antichitati', color: '#f97316', page: 'antichitati.html' },
  { name: 'curente', color: '#8b5cf6', page: 'curente.html' },
];

// Selecting DOM elements
const btn = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');
const factsList = document.querySelector('.facts-list');

// Create DOM elements: Render facts in list
factsList.innerHTML = '';

// Load data from Supabase

async function loadFacts() {
  const res = await fetch(
    'https://bynxydazjspvhtgsydgy.supabase.co/rest/v1/facts',
    {
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bnh5ZGF6anNwdmh0Z3N5ZGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwMDYyOTYsImV4cCI6MTk4ODU4MjI5Nn0.ypuyQFaZyHyoCVjA0b9XMxd3x_VZ4W24b8mAfe3xzJM',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bnh5ZGF6anNwdmh0Z3N5ZGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwMDYyOTYsImV4cCI6MTk4ODU4MjI5Nn0.ypuyQFaZyHyoCVjA0b9XMxd3x_VZ4W24b8mAfe3xzJM',
      },
    }
  );
  const data = await res.json();
  console.log(data);

  createFactsList(data);
}

loadFacts();

// createFactsList(initialFacts);

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    fact => `<li class="fact">
  <p>
  ${fact.text}
                  <a
                    class="source"
                    href="${fact.source}"
                    target="_blank"
                    >(Source)</a
                  >
                </p>
                <span class="tag" style="background-color: ${
                  CATEGORIES.find(category => category.name === fact.category)
                    .color
                }"
                  >${fact.category}</span
                >
  </li>`
  );
  const html = htmlArr.join('');
  factsList.insertAdjacentHTML('afterbegin', html);
}

// Toggle form visibility
btn.addEventListener('click', function () {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
    btn.textContent = 'Inchide';
  } else {
    form.classList.add('hidden');
    btn.textContent = 'Distribuie o mostra de intelepciune';
  }
});

// Render categories list
const categoriesList = document.querySelector('.categories-list');

const renderCategoriesList = function () {
  window.addEventListener('load', function () {
    const html = CATEGORIES.map(category => {
      return `<li class="category">
      <a href="/page/${category.page}" class="btn btn-category" style="background-color: ${category.color}">${category.name}</a>
    </li>`;
    }).join('');

    categoriesList.insertAdjacentHTML('beforeend', html);
  });
};

renderCategoriesList();
