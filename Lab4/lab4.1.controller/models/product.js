const path = require('path');
const fs = require('fs');

const products = []

const getProductsFromFile = function(callbackFn){
    const p = path.join(path.dirname(require.main.filename), 'data', 'product.json');
    fs.readFile(p, (err, fileContent) => {
        if(!err){
            callbackFn(JSON.parse(fileContent));
        }else{
            callbackFn([])
        }
    })
}

const saveProductToFile = function(products) {
    const p = path.join(path.dirname(require.main.filename), 'data', 'product.json');
    fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
    })
}

module.exports = class Product {
    constructor(titleVal){
        this.title = titleVal;
    }

    save() {
        const p = path.join(path.dirname(require.main.filename), 'data', 'product.json');
        getProductsFromFile((products => {
            if(products.length > 0){
                products.push(this)
                saveProductToFile(products);
            }else{
                saveProductToFile([this]);
            }
        }))
    }

    static async fetchAllAsync() {
        let products = [];
        const p = path.join(path.dirname(require.main.filename), 'data', 'product.json');
        let res = await fs.readFileSync(p)
        products = JSON.parse(res)
        return products;

    }

    static fetchAll(callback){
        getProductsFromFile(callback);
    }
}