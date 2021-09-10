class GoodsList { // список товаров
    constructor() {
        this.goods = [];
    }
    fetchGoods() { // заполнение списка товара.
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() { // вывод списка товаров
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        }
    sumPriceGoods() { // сумарная стоимось всех товаров
        let sum = 0;
        this.goods.forEach(goods => {
            sum += goods.price;
        });
        alert(`сумарная стоимось всех товаров ${sum}`);
    }
}

class GoodsItem { // товар
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() { // разметка HTML
        return `<div class="goods-item">
        <img src = "img/img.png" width = 100px>
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button>Купить</button>
        </div>`;
    }
}

class BasketGoods { // корзина товаров
    // метод очистки корзины
    // метод купить все
}

class BasketElement { // элемент корзины
    // метод подсчета количество товара одного вида
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.sumPriceGoods();