Vue.component('cart-product', {
    props: ['cartItem'],
    data(){
        return {
            cartItems: [],
            sumPrise: 0
        }
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
                
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.push(prod);
                        
                    }
                });
            }
        },
        remove(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find.quantity > 1){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: -1});
                find.quantity--;
                this.sumPrise -= find.price
            } else {
                this.$parent.deleteJson(`/api/cart/${find.id_product}`)
                .then(data => { 
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        this.sumPrise -= find.price
                    }
                })
            }
        }
    },
    mounted(){
        this.$parent.getJson('/api/cart')
        .then(data => {
            for(let el of data.contents){
                this.cartItems.push(el);
            }
        });
        this.$parent.getJson('/api/cart')
        .then(data => {
            return this.sumPrise = data.amount;
        });
    },
    template: `
        <div class="cart__products">
            <div class="cart__products__orders">
                <div class="cart__products__orders__price__container">
                    <carrt-item
                    v-for="item of cartItems" 
                    :key="item.id_product"
                    :cart-item="item" 
                    @remove="remove">
                    </carrt-item>
                </div>
                <div class="cart__products__sorting">
                    <button class="cart__products__sorting__button">CLEAR SHOPPING CART</button>
                    <button class="cart__products__sorting__button">CONTINUE SHOPPING</button>
                </div>
            </div>
            <div class="cart__placing-an-order">
                <form class="cart__placing-an-order__form" action="#">
                    <div class="cart__placing-an-order__form__box1">
                        <h3 class="cart__placing-an-order__form__box1__h3">SHIPPING ADRESS</h3>
                        <input class="cart__placing-an-order__form__box1__text cart__placing-an-order__form__box1__text-opacity" type="text" placeholder="Bangladesh">
                        <input class="cart__placing-an-order__form__box1__text" type="text" placeholder="State">
                        <input class="cart__placing-an-order__form__box1__text" type="text" placeholder="Postcode / Zip">
                        <input class="cart__placing-an-order__form__box1__text-quote" type="text" placeholder="GET A QUOTE">
                    </div>
                    <div class="cart__placing-an-order__box2">
                        <p class="cart__placing-an-order__box2__p-small">SUB TOTAL <samp class="cart__placing-an-order__box2__p-small-spam">{{sumPrise}}$</samp></p>
                        <p class="cart__placing-an-order__box2__p-big">GRAND TOTAL <samp class="cart__placing-an-order__box2__p-big-spam">{{sumPrise}}$</samp></p>
                        <div class="cart__placing-an-order__box2__line"></div>
                        <button class="cart__placing-an-order__box2__button">PROCEED TO CHECKOUT</button>
                    </div>
                </form>
            </div>
        </div>
        `
});

Vue.component('carrt-item', {
    props: ['cartItem'],
    template: `
        <div class="cart__products__orders__price">
            <img class="cart__products__orders__price__img" :src="cartItem.img" alt="product-1">
            <div class="cart__products__orders__price__box">
                <h3 class="cart__products__orders__price__box__h3">
                    <a class="cart__products__orders__price__box__a" href="product.html">{{cartItem.product_name}}</a>
                </h3>
                <p class="cart__products__orders__price__box__p">Price: <span class="cart__products__orders__price__box__color">{{cartItem.price}}$</span></p>
                <p class="cart__products__orders__price__box__p">Color: Red</p>
                <p class="cart__products__orders__price__box__p">Size: Xl </p>
                <p class="cart__products__orders__price__box__p">Quantity:</p>
                <button class="cart__products__orders__price__box__button"@click="$emit('remove', cartItem)">
                    <svg class="cart__products__orders__price__box__button__svg" width="18" height="18"
                        viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
                            fill="#575757"></path>
                    </svg>
                </button>
                <div class="cart__products__orders__price__box__p__quantity">
                    <div class="cart__products__orders__price__box__p__quantity__input">{{cartItem.quantity}}</div>
                </div>
            </div>
        </div>
        `
});
