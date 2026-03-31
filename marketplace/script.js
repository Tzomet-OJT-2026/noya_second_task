const START_BALANCE = 100;
const fileInput = document.getElementById('file-input');
const allProducts = document.getElementById('products');

window.onload = () => {
  let balance = localStorage.getItem('balance');
  if (!balance) {
    setBalance(START_BALANCE);
    return;
  }
  setBalance(balance);
};

const setBalance = (balance) => {
  localStorage.setItem('balance', balance);
  const balanceView = document.getElementById('balance-value');
  balanceView.textContent = `${balance}₪`;
};

fileInput.onchange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = loadFile;
  reader.readAsText(file);
};

const loadFile = (event) => {
  let products;
  try {
    let data = event.target.result;
    const jsonData = JSON.parse(data);
    products = jsonData.products;
  } catch (error) {
    alert('Invalid JSON file. Please check the file');
    return;
  }
  allProducts.innerHTML = '';
  renderProducts(products);
};

const getValue = (key, value) => {
  const displayValue = key === `price` ? `${value} ₪` : value;
  return displayValue;
};

const renderProducts = (products) => {
  if (!Array.isArray(products)) {
    alert('Error: Products data is not a valid list.');
    return;
  }
  products.forEach((product) => {
    try {
      const card = document.createElement('div');
      card.className = 'card';
      Object.entries(product).forEach(([key, value]) => {
        const text = document.createElement('span');
        const displayValue = getValue(key, value);
        text.textContent = displayValue;
        text.id = key;
        card.appendChild(text);
      });
      card.onclick = () => buyItem(product);
      allProducts.appendChild(card);
    } catch (error) {
      alert('Error: A product have invalid data and will not be displayed.');
    }
  });
};

const buyItem = (product) => {
  const balance = localStorage.getItem('balance');
  const itemPrice = Number(product.price);
  if (!itemPrice) {
    alert('Failed to complete purchase: Invalid product information');
    return;
  }
  const newBalance = balance - itemPrice;
  if (newBalance < 0) {
    alert('There is not enough balance to purchase the product');
    return;
  }
  setBalance(newBalance);
  alert('Purchased successfully');
};
