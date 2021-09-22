Vue.component('products', {
    props:['q'],
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            
            filtered: [],
            imgCatalog: 'https://place-hold.it/200x150',
        }
    },
    methods: {
        filter(q){
            let regexp = new RegExp(q, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],

    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
<!-- 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
                </div>
            </div>
    `
});

Vue.component('form-search', {
    data() {
        return {
            userSearch:''
        }
    },
    template: `
    <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
});

Vue.component('errors-add', {
    template: `
            <div>
                <h1 class="errorsOn">Внимание!!!<br> Данные потеряны</h1>
            </div>
            `
});
