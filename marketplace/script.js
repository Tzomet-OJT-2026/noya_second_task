const fileInput = document.getElementById('file-input');
const allProducts = document.getElementById('products');

fileInput.onchange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = loadFile;
  reader.readAsText(file);
};

const loadFile = (event) => {
  try {
    let data = event.target.result;
    data = JSON.parse(data);
    const products = data.products;
    renderProducts(products);
  } catch (error) {
    alert('Invalid JSON file. Please check the file');
  }
};

const getValue = (key, value) => {
  const displayValue = key === `price` ? `${value} ₪` : value;
  return displayValue;
};

const renderProducts = (products) => {
  products.forEach((product) => {
    document.body.appendChild(document.createElement('div')).className = 'card';
    const card = document.body.lastElementChild;
    Object.entries(product).forEach(([key, value]) => {
      const line = document.createElement('p');
      const title = document.createElement('span');
      title.classList.add('card-title');
      const text = document.createElement('span');
      title.textContent = `${key}: `;
      value = getValue(key, value);
      text.textContent = value;
      line.appendChild(title);
      line.appendChild(text);
      card.appendChild(line);
    });
    allProducts.appendChild(card);
  });
};
