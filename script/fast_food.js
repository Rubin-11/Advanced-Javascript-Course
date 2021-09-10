class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = [stuffing];
    }
        addTopping(topping) { // Добавить добавку
            if(topping === "cheese") {
                this.stuffing.push(topping);
                this.price += 10;
                this.calories += 40;
            }
            if(topping === "salad") {
                this.stuffing.push(topping);
                this.price += 20;
                this.calories += 5;
            }
            if(topping === "potato") {
                this.stuffing.push(topping);
                this.price += 15;
                this.calories += 10;
            }
            if(topping === "spice") {
                this.stuffing.push(topping);
                this.price += 15;
                this.calories += 0;
            }
            if(topping === "mayonnaise") {
                this.stuffing.push(topping);
                this.price += 20;
                this.calories += 5;
            }
        } 
        removeTopping(topping) { // Убрать добавку 
            if(topping === "cheese") {
                let i = 0;
                this.stuffing.forEach(element => {
                    if(element === topping) {
                        delete this.stuffing[i];
                    }
                    i++;
                }); 
                this.price -= 10;
                this.calories -= 40;
            }
            if(topping === "salad") {
                let i = 0;
                this.stuffing.forEach(element => {
                    if(element === topping) {
                        delete this.stuffing[i];
                    }
                    i++;
                }); 
                this.price -= 20;
                this.calories -= 5;
            }
            if(topping === "potato") {
                let i = 0;
                this.stuffing.forEach(element => {
                    if(element === topping) {
                        delete this.stuffing[i];
                    }
                    i++;
                }); 
                this.price -= 15;
                this.calories -= 10;
            }
            if(topping === "spice") {
                let i = 0;
                this.stuffing.forEach(element => {
                    if(element === topping) {
                        delete this.stuffing[i];
                    }
                    i++;
                }); 
                this.price -= 15;
                this.calories -= 0;
            }
            if(topping === "mayonnaise") {
                let i = 0;
                this.stuffing.forEach(element => {
                    if(element === topping) {
                        delete this.stuffing[i];
                    }
                    i++;
                }); 
                this.price -= 20;
                this.calories -= 5;
            }
        }  
        
        getSize() { // Узнать размер гамбургера
            let size = this.size;
            if(size === "big") {
                this.price = 100;
                this.calories = 40;
            };
            if(size === "small") {
                this.price = 50;
                this.calories = 20;
            }
        }
        getStuffing() { // Узнать начинку гамбургера 
            let stuffing = this.stuffing;
            if(stuffing[0] === "cheese") {
                this.price += 10;
                this.calories += 40;
            }
            if(stuffing[0] === "salad") {
                this.price += 20;
                this.calories += 5;
            }
            if(stuffing[0] === "potato") {
                this.price += 15;
                this.calories += 10;
            }
            if(stuffing[0] === "spice") {
                this.price += 15;
                this.calories += 0;
            }
            if(stuffing[0] === "mayonnaise") {
                this.price += 20;
                this.calories += 5;
            }
        }
        getInfo() { // Получить список добавок
            alert(`Список добавок: ${this.stuffing}\nЦена: ${this.price}\nКалорий: ${this.calories}`);
        }              
}
let size = "big";;
let stuffing = "salad";
let topping = "potato";
let topping2 = "cheese";
let topping3 = "mayonnaise";

const hamburger = new Hamburger(size, stuffing);
hamburger.getSize();
hamburger.getStuffing();
hamburger.addTopping(topping);
hamburger.addTopping(topping2);
hamburger.addTopping(topping3);
hamburger.removeTopping(topping2);
hamburger.getInfo();