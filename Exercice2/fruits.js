let container_fruits = document.getElementById('choice-container').getElementsByTagName('img')
let mychoice = document.getElementById('mychoice')

for (let index = 0; index < container_fruits.length; index++) {
    const element = container_fruits[index]
    element.addEventListener('click', function(){
        let link = element.getAttribute('src')
        mychoice.setAttribute('src', link)
    })
}