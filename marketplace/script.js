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
    alert(error);
  }
};

const getValue = (key, value) => {
  const displayValue = key == `price` ? `${value} ₪` : value;
  return displayValue;
};

const renderProducts = (products) => {
  products.forEach((product) => {
    const card = Object.assign(document.createElement('div'), {
      className: 'card',
    });
    Object.entries(product).forEach(([key, value]) => {
      const line = document.createElement('p');
      const title = Object.assign(document.createElement('span'), {
        className: 'card-title',
      });
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
