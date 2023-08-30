//ARRAY de objetos
const products = [
  { id: 30, name: "microwave", price: 2000 },
  { id: 108, name: "trashcan", price: 1000 },
  { id: 5041, name: "fridge", price: 3000 },
  { id: 2, name: "toaster", price: 1500 },
];

const productsFetch = [];

//variables
let nameProduct = "";
let priceProduct = 0;

const shopperBtn = document.getElementById("shopper_btn");
const sellerBtn = document.getElementById("seller_btn");

const shopperPage = document.getElementById("shopper_page");
const sellerPage = document.getElementById("seller_page");

const productsList = document.getElementById("products_list");
const sellerList = document.getElementById("seller_list");

const productNameElement = document.querySelector(".add_product");
const productPriceElement = document.querySelector(".add_price");
const addButton = document.getElementById("button");

//event listener del input de name
productNameElement.addEventListener("input", (e) => {
  nameProduct = e.target.value;
});

//event listener del input de price
productPriceElement.addEventListener("input", (e) => {
  priceProduct = e.target.value;
});

//event listener del boton add para que pueda generar un id nuevo (ver funcion generateUniqueId) y único cada vez que se agrega un producto (ver push)
addButton.addEventListener("click", (e) => {
  const newProduct = {
    id: generateUniqueId(),
    name: nameProduct,
    price: priceProduct,
  };
  //push para agregar el nuevo producto ingresado en el input luego del event listener del boton
  products.push(newProduct);
  //json para convertir el objeto y que el storage pueda agregarlo de la forma que yo quería
  const productsString = JSON.stringify(newProduct);
  localStorage.setItem(nameProduct, productsString);

  updateSellerList();
});

//funcion que genera el id unico por producto ingresado
function generateUniqueId() {
  return Date.now();
}

let sentId = 2;
const theCart = [];

function getProductByName(name) {
  const result = products.filter((element) => element.name === name);
  if (result.length > 0) {
    console.log(result[0].id);
  } else {
    console.log("Producto no encontrado.");
  }
}

//declaro funcion para contar cuantos elementos hay en el carrito
function checkCart() {
  console.log(theCart.length);
}

//declaro funcion para hacer el descuento
function getTotalPriceWithDiscount(cart) {
  let totalPrice = cart.reduce((total, item) => total + item.price, 0);
  if (cart.length >= 3) {
    totalPrice *= 0.9;
  }
  return totalPrice;
}

//declaro funcion agregar elementos al carrito (con push)
function addToCart(product) {
  theCart.push(product);
  console.log("¡Se agregó " + product.name + " al carrito!");
}

//llamo a la funcion agregar elementos al carrito
addToCart(products[0]);
addToCart(products[1]);
addToCart(products[2]);
addToCart(products[3]);

//find
let productFind = products.find((element) => element.id == sentId);
console.log(productFind);

//filter
const productFilter = products.filter((element) => element.price > 2500);
console.log(productFilter);

//llamado funcion push
const total = getTotalPriceWithDiscount(theCart);
console.log(total);

getProductByName("microwave");
updateSellerList();

//API y fetch - forEach
const fetchProductsFromAPI = () => {
  if (productsFetch.length > 0) return;
  fetch("https://fakestoreapi.com/products?limit=10")
    .then((res) => res.json())
    .then((json) => {
      json.forEach((product) => {
        productsFetch.push(...json);
        createProductElement(product);
      });
    });
};

//eventlistener de boton de shopper
shopperBtn.addEventListener("click", () => {
  fetchProductsFromAPI();
  sellerBtn.style.backgroundColor = "inherit";
  shopperBtn.style.backgroundColor = "pink";
  sellerPage.style.display = "none";
  shopperPage.style.display = "block";
});

//eventListener de boton de seller
sellerBtn.addEventListener("click", () => {
  shopperBtn.style.backgroundColor = "inherit";
  sellerBtn.style.backgroundColor = "pink";
  shopperPage.style.display = "none";
  sellerPage.style.display = "block";
});

//create de productos de api
const createProductElement = (product) => {
  const productBox = document.createElement("div");
  const title = document.createElement("h3");
  const price = document.createElement("p");
  const image = document.createElement("img");

  title.textContent = product.title;
  price.textContent = product.price;
  image.src = product.image;

  //append
  productBox.append(title, price, image);

  //eventListener de productBox y toastify
  productBox.addEventListener("click", () => {
    Toastify({
      text: product.title + " added successfully",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  });

  //appendChild para hacer la lista
  productsList.appendChild(productBox);
};

//funcion para resetear la lista cada vez que se aprieta add
function updateSellerList() {
  sellerList.innerHTML = "";
  for (const prod of products) {
    const productBox = document.createElement("div");
    const title = document.createElement("h3");
    const price = document.createElement("p");

    title.textContent = prod.name;
    price.textContent = prod.price;

    productBox.setAttribute("class", "sellerProductBox");
    productBox.append(title, price);

    sellerList.appendChild(productBox);
    productNameElement.value = "";
    productPriceElement.value = "";
  }
}
