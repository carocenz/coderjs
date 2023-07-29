//ARRAY
const products = [
  { id: 30, name: "microwave", price: 2000 },
  { id: 108, name: "trashcan", price: 1000 },
  { id: 5041, name: "fridge", price: 3000 },
  { id: 2, name: "microwave", price: 1500 },
];

let sentId = 5041;
const theCart = [];

//FIND
let productFind = products.find(element => element.id == sentId);
console.log(productFind)

//FILTER
const productFilter = products.filter(element => element.price > 2500);
console.log(productFilter);

//DECLARO FUNCION CONTAR ELEMENTOS EN CARRITO
function checkCart() {
  console.log(theCart.length);
}

//DECLARO FUNCION DESCUENTOS
function getTotalPriceWithDiscount() {
  let totalPrice = 0;
  for (let i = 0; i < theCart.length; i++) {
    totalPrice += theCart[i].price;
  }
  if (theCart.length >= 3) {
    totalPrice = totalPrice * 0.9;
  }
  return totalPrice;
}

//DECLARO FUNCION AGREGAR ELEMENTOS AL CARRITO (CON PUSH)
function addPush() {
  theCart.push(products[0]);
  console.log("¡Se agregó " + products[0].name + " al carrito!");
  theCart.push(products[1]);
  console.log("¡Se agregó " + products[1].name + " al carrito!");
  theCart.push(products[2]);
  console.log("¡Se agregó " + products[2].name + " al carrito!");
  theCart.push(products[3]);
  console.log("¡Se agregó " + products[3].name + " al carrito!");
}




//LLAMADO FUNCION PUSH
addPush();
const total = getTotalPriceWithDiscount();
console.log(total);
