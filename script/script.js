const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    basket: [],
    searchLine: '',  
    isActive: true,
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addInBasket(goods) {
      if(this.basket.length > 0) {
        this.basket.forEach(i => {
          if(i.id_product === goods.id_product) {
            i.quantity += 1;
          } else {
            if(this.basket.length !== this.filteredGoods.length) {
              this.basket.push(goods);
            }
          }
        });
      } else {
        this.basket.push(goods);
      }
    },
    basketQ() {
      if(this.isActive === true) {
        this.isActive = false;
      } else if(this.isActive === 0) {
        
      } else {
        this.isActive = true;
      }
    },
    removal(q) {
      let y = this.basket;
      for(let i = 0; i < y.length; i++) {
        if(y[i].id_product === q.id_product && y[i].quantity > 1) {
          y[i].quantity -= 1;
        } else if (y[i].quantity === 1 && this.basket.indexOf(q) === i){
          this.basket.splice(this.basket.indexOf(q), 1);
        }
      }
    },
    FilterGoods() {
      const regexp = new RegExp (this.searchLine, 'i'); 
      this.filteredGoods = this.goods.filter(product => regexp.test(product.product_name));   //метод возвращает массив фильтра для страницы
    }
  },
  mounted() {
    this.getJson(`${API_URL}/getBasket.json`)
        .then(data => {
          for(let el of data.contents){
            this.goods.push(el);
            this.filteredGoods.push(el);
          }
        });
  }
});

// const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

//   // Переведено на промисы
// // let getRequest = (url) => {
// //     return new Promise((resolve, reject) => {
// //         let xhr = new XMLHttpRequest();
// //         xhr.open("GET", url, true);
// //         xhr.onreadystatechange = () => {
// //             if(xhr.readyState === 4){
// //                 if(xhr.status !== 200){
// //                     reject('Error');
// //                 } else {
// //                     resolve(xhr.responseText);
// //                 }
// //             }
// //         };
// //         xhr.send();
// //     })
// // };
// class GoodsList {
//   // список товаров
//   constructor(basket) {
//     this.basket = basket;
//     this.goods = [];
//     this.goodsObjs = [];
//     this.getGoods().then((data) => {
//       this.goods = data;
//       this.render();
//     });
//     this.makeEvents();
//   }
//   getGoods() {
//     // заполнение списка товара.
//     return fetch(`${API_URL}/catalogData.json`)
//       .then((response) => response.json())
//       .catch((err) => console.log(err));
//   }
//   render() {
//     const block = document.querySelector(".goods-list");
//     for (let product of this.goods) {
//       console.log(this.constructor.name);
//       let obj = new GoodsItem(product);
//       console.log(obj);
//       this.goodsObjs.push(obj);
//       block.insertAdjacentHTML("beforeend", obj.render());
//     }
//   }
//   sumPriceGoods() {
//     // сумарная стоимось всех товаров
//     let sum = 0;
//     this.goods.forEach((goods) => {
//       sum += goods.price;
//     });
//     return sum;
//   }
//   makeEvents() {
//     document.querySelector(".goods-list").addEventListener("click", (e) => {
//       if (e.target.classList.contains("buy")) {
//         this.basket.addProduct(e.target);
//       }
//     });
//   }
// }

// class GoodsItem {
//   // товар
//   constructor(e) {
//     this.id = e.id_product;
//     this.product_name = e.product_name;
//     this.price = e.price;
//   }
//   render() {
//     // разметка HTML
//     return `<div class="goods-item">
//         <img src = "img/img.png" width = 100px>
//         <h3>${this.product_name}</h3>
//         <p>${this.price}</p>
//         <button class="buy" 
//         data-id="${this.id}"
//         data-name="${this.product_name}"
//         data-price="${this.price}">Купить</button>
//         </div>`;
//   }
// }

// class BasketGoods {
//   // корзина товаров
//   constructor() {
//     this.goods = [];
//     this.goodsObjs = [];
//     this.getBasket().then((data) => {
//       this.goods = data.contents;
//       this.render();
//     });
//     this.makeEvents();
//   }
//   getBasket() {
//     // заполнение списка корзины.
//     return fetch(`${API_URL}/getBasket.json`)
//       .then((response) => response.json())
//       .catch((err) => console.log(err));
//   }
//   addProduct(e) {
//     let productId = +e.dataset["id"];
//     let find = this.goodsObjs.find((product) => product.id === productId);
//     if (find) {
//       find.quantity++;
//       let block = document.querySelector(`.basket-item[data-id="${find.id}"]`);
//       block.querySelector(
//         ".product-quantity"
//       ).textContent = `Количество: ${find.quantity}`;
//       block.querySelector(".product-price").textContent = `${
//         find.quantity * find.price
//       } ₽`;
//     } else {
//       let product = {
//         id_product: productId,
//         price: +e.dataset["price"],
//         product_name: e.dataset["name"],
//         quantity: 1
//       };
//       this.goods = [product];
//       this.render();
//     }
//   }
//   removeProduct(e) {
//     let productId = +e.dataset["id"];
//     let find = this.goodsObjs.find((product) => product.id === productId);
//     if (find.quantity > 1) {
//       find.quantity--;
//       let block = document.querySelector(`.basket-item[data-id="${find.id}"]`);
//       block.querySelector(
//         ".product-quantity"
//       ).textContent = `Количество: ${find.quantity}`;
//       block.querySelector(".product-price").textContent = `${
//         find.quantity * find.price
//       } ₽`;
//     } else {
//       this.goodsObjs.splice(this.goodsObjs.indexOf(find), 1);
//       document.querySelector(`.basket-item[data-id="${productId}"]`).remove();
//     }
//   }
//   makeEvents() {
//     document.querySelector(".basket-button").addEventListener("click", () => {
//       document.querySelector(".basket").classList.toggle("invisible");
//     });
//     document.querySelector(".basket").addEventListener("click", (e) => {
//       if (e.target.classList.contains("del-basket-item")) {
//         this.removeProduct(e.target);
//       }
//     });
//   }
//   render() {
//     const block = document.querySelector(".basket");
//     for (let product of this.goods) {
//         console.log(this.constructor.name);

//         let obj = new BasketElement(product);

//         console.log(obj);
//         this.goodsObjs.push(obj);
//         block.insertAdjacentHTML("beforeend", obj.render());
//     }
//     }
// }

// class BasketElement {
//   // элемент корзины
//     constructor(e) {
//     this.id = e.id_product;
//     this.product_name = e.product_name;
//     this.price = e.price;
//     this.quantity = e.quantity;
//     }
//     render() {
//     return `<div class="basket-item" data-id="${this.id}">
//     <div>
//         <img src="img/img.png">
//         <div class="">
//             <p class="">${this.product_name}</p>
//             <p class="product-quantity">Количество: ${this.quantity}</p>
//             <p class="">${this.price} за ед.</p>
//         </div>
//         </div>
//         <div class="">
//         <p class="product-price">${this.quantity * this.price} ₽</p>
//         <button class="del-basket-item" data-id="${this.id}">&times;</button>
//     </div>
//     </div>`;
//     }
// }

// new GoodsList(new BasketGoods());
