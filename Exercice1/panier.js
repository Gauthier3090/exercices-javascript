let articles = []
let list = document.createElement('ul')
list.classList.add('list')

const addItem = (articles, index) => {
    const element = articles[index]
    let li = document.createElement('li')
    li.classList.add('item')
    li.setAttribute('id', 'item-' + index)
    li.innerHTML = element
    list.appendChild(li)
};

const countCharWords = () => {
    let count = document.getElementById('count')
    count.innerHTML = articles.reduce(
        function(countChar, item) {
            return countChar + item.length
        }, 0
    );
};

document.getElementById('add-button').addEventListener('click', function(){
    let input_add = document.getElementById('add')
    let item = input_add.value.replace(/\s+/g,'')
    if (item.length !== 0) {
        if (articles.includes(item))
        {
            let index = articles.indexOf(item)
            articles.splice(index, 1);
            list.removeChild(list.children[index])
        }
        else
        {
            articles.push(item)
            addItem(articles, articles.length - 1)
        }
        countCharWords()
        input_add.value = ""
    }
})

document.getElementById('container').appendChild(list)
