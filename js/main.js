const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        isActive: true
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(() => {
                    this.isActive = false;
                })
        },
    },
    
    mounted() {
        console.log(this);
    },
});



