let products =  [
    {id: 1, product: "Coca-Cola", price: 1.5, promo: 5},
    {id: 2, product: "Fanta", price: 1.3, promo: 0},
    {id: 3, product: "Sprite", price: 1.6, promo: 20},
    {id: 4, product: "Pepsi", price: 1.1, promo: 0},
    {id: 5, product: "Ice-tea", price: 1.9, promo: 10},
]

let tableProducts = document.createElement('table')
let keys = Object.keys(products[0]);

const checkPrice = (price, promo, header) => {
    let cell = addItem(price, header)
    if (promo !== 0)
    {
        createElement('span', cell, (price - ((price * promo) / 100)).toFixed(2))
        cell.children[0].classList.add("price");
    }
    header.appendChild(cell)
};

const addItem = (item, header) => {
    let cell = createElement('td', header, '')
    createElement('span', cell, item)
    return cell
};

const createElement = (tag, parentNode, text) => {
    let element = document.createElement(tag)
    parentNode.appendChild(element)
    element.innerHTML = text
    return element
};

const manage = () => {
    let buttons = document.getElementsByClassName('manage-button')
    for (const button of buttons) {
        button.addEventListener('click', function () {
            let index = button.parentNode.parentNode["id"]
            console.log(button)
            document.getElementById('name-product').innerHTML = products[index].product
            popup(index)
        })
    }
};

const popup = (index) => {
    let cross_modal = document.getElementsByClassName('cross')
    let modal = document.getElementsByClassName('modal-content')
    let button = document.getElementById('confirm')
    modal.item(0).style.visibility = "visible"
    cross_modal[0].addEventListener('click', function (){
        modal.item(0).style.visibility = "hidden"
    })
    button.addEventListener('click', function() {
        if (document.getElementById(index))
            document.getElementById(index).remove()
        modal.item(0).style.visibility = "hidden"
    })
};

const addElementTable = () => {
    for (let index = 0; index < products.length; index++)
        addElement(index)
};

const addElement = (index) => {
    let header = createElement('tr', tableProducts, '')
    header.setAttribute('id', index)
    for (let j = 0; j < keys.length - 2; j++)
        addItem(products[index][keys[j]], header);
    checkPrice(products[index].price, products[index].promo, header)
    let button = createElement('td', header, '')
    button = createElement('button', button, 'delete')
    button.classList.add('manage-button')
};

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    let item = {
        id: products.length + 1, product: inputs.product,
        price: parseInt(inputs.price),
        promo: parseInt(inputs.promotion)
    }
    products.push(item)
    addElement(products.length - 1)
    manage()
}

const main = () => {
    document.body.appendChild(tableProducts)
    let header = createElement('tr', tableProducts, '')
    for (let index = 0; index < keys.length - 1; index++)
        createElement('th', header, keys[index])
    createElement('th', header, 'Actions')
    addElementTable(tableProducts, keys)
    manage(tableProducts)
    document.getElementById('add-form').addEventListener('submit', handleSubmit)
};

main()