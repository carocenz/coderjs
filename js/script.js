const firstProduct = {name : "microwave", price : 2000};
const secondProduct = {name :"trashcan", price : 1000};
const thirdProduct = {name : "fridge", price : 3000};
const fourthProduct = {name : "toaster", price : 1500};

let theCart = [];

function checkCart(){
    /*CONTAR PRODUCTOS EN CARRITO*/
    console.log(theCart.length);
}

function getTotalPriceWithDiscount(){
    let totalPrice = 0;
    for(let i = 0; i < theCart.length; i++){
        totalPrice += theCart[i].price
    }
    if(theCart.length >= 3){
        totalPrice = totalPrice * 0.90;
    }
    return totalPrice
}

function addPush(){
    theCart.push(firstProduct);
    console.log("¡Se agregó " + firstProduct.name + " al carrito!");
    theCart.push(secondProduct);
    console.log("¡Se agregó " + secondProduct.name + " al carrito!");
    theCart.push(thirdProduct);
    console.log("¡Se agregó " + thirdProduct.name + " al carrito!");
    theCart.push(fourthProduct);
    console.log("¡Se agregó " + fourthProduct.name + " al carrito!");
}


addPush();
const total = getTotalPriceWithDiscount();
console.log(total)