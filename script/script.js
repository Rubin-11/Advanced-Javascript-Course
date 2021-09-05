const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];

const renderGoodsItem = (title = 'Название товара', price = "Цена товара") => `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;

const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    let array = goodsList.join('');
    document.querySelector('.goods-list').innerHTML = array;
    // Свойство интерфейса innerHTML устанавливает или получает HTML разметку дочерних элементов.
    // Когда мы передовали массив goodsList, innerHTML выводил и запятые.
    // После преобразования массива в строку с помошью метода join('') и убрав запятые,
    // передаем чистый текст.
}
renderGoodsList(goods);