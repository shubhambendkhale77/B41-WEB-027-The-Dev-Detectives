let url = "https://web-project-f641c-default-rtdb.firebaseio.com/users.json";
let currentPage = 1;
const itemsPerPage = 9;
let allData = [];

(async function fetchData() {
  try {
    let res = await axios.get(url);
    let data = res.data;
    console.log(data);
    allData = Array.isArray(data) ? data : Object.values(data);
    updateDisplay();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();

function updateDisplay() {
  const filteredData = applySearchFilterSort(allData);
  displayData(paginate(filteredData, currentPage, itemsPerPage));
  updatePageInfo(filteredData.length);
}

function displayData(data) {
  const container = document.getElementById('data-container');
  container.innerHTML = '';

  data.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user';

    userDiv.innerHTML = `
      <div>
        <img src="${user.img}" alt="User Image" />
        <h2>${user.course}</h2>
        <p>${user.details}</p>
        <p>${user.date}</p>
      </div>
    `;

    container.appendChild(userDiv);
  });
}

function paginate(data, page, itemsPerPage) {
  const start = (page - 1) * itemsPerPage;
  return data.slice(start, start + itemsPerPage);
}

function applySearchFilterSort(data) {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const sortSelect = document.getElementById('sort-select').value;
  const filterSelect = document.getElementById('filter-select').value;

  let filteredData = filterData(data, searchInput, filterSelect);

  if (sortSelect === 'Bachelor') {
    filteredData = filterByBranch(filteredData, 'B');
  } else if (sortSelect === 'Master') {
    filteredData = filterByBranch(filteredData, 'M');
  }

  return filteredData;
}

function filterData(data, searchInput, filterSelect) {
  return data.filter(user => {
    return user.course.toLowerCase().includes(searchInput) &&
      (filterSelect === 'all' || (filterSelect === 'ac' && user.active === true) || (filterSelect === 'up' && user.active === false));
  });
}

function filterByBranch(data, branch) {
  return data.filter(user => user.branch === branch);
}

function updatePageInfo(totalItems) {
  const pageInfo = document.getElementById('page-info');
  pageInfo.textContent = `${currentPage} `;
}

document.getElementById('search-input').addEventListener('input', updateDisplay);
document.getElementById('sort-select').addEventListener('change', updateDisplay);
document.getElementById('filter-select').addEventListener('change', updateDisplay);
document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updateDisplay();
  }
});
document.getElementById('next-page').addEventListener('click', () => {
  const filteredData = applySearchFilterSort(allData);
  if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
    currentPage++;
    updateDisplay();
  }
});
