const fileInput = document.getElementById('file-input');
const allProducts = document.getElementById('products');

fileInput.onchange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    let data = reader.result;
    data = JSON.parse(data);
    let products = data.products;

    products = products.map(
      (product) =>
        `<div class="card">
        <p><strong>Name:</strong> ${product.name}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Price:</strong> ${product.price}₪</p>
        <p><strong>seller:</strong> ${product.seller}</p>
        </div>`,
    );
    products = products.join('');
    allProducts.innerHTML = products;
  };

  reader.readAsText(file);
};
