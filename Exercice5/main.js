const displayInfos = (data) => {
    let i = 0;
    document.getElementById("info")?.remove()
    const div = document.createElement("div")
    div.classList.add("infos")
    div.setAttribute("id", "info")
    for (let key of Object.keys(data)) {
        i++;
        if (i < Object.keys(data).length) {
            const paragraph = document.createElement("p")
            div.appendChild(paragraph)
            paragraph.innerHTML = key.charAt(0).toUpperCase() + key.slice(1) + " : " + data[key]
        }
    }
    document.body.appendChild(div)
}

const createSelectListCountries = (name, code) => {
    const countriesList = document.getElementById("countries")
    let item = document.createElement("option")
    item.innerHTML = name
    item.setAttribute("value", code)
    countriesList.appendChild(item)
}

const allCountries = () => {
    return axios.get("https://restcountries.com/v3.1/all", "").then(({data}) => {
        let tabCountries = []
        for (let country of data)
            tabCountries.push({"name": country["name"]["common"], "code": country["cca2"]})
        tabCountries.sort((a, b) => a.name.localeCompare(b.name))
        for (let country of tabCountries)
            createSelectListCountries(country["name"], country["code"])
    }).then()
}

const requestPredict = async (e) => {
    e.preventDefault()
    const url = "https://api.agify.io"
    const name = document.getElementById("name-person").value
    const idCountry = document.getElementById("countries").value
    const params = {"name": name, "country_id": idCountry}
    if (name) await axios.get(url, {params}).then(({data}) => {
        displayInfos(data)
    })
}

const predictName = () => {
    document.getElementById("form-predict-id").addEventListener("submit", requestPredict)
    document.getElementById("predict").addEventListener("click", requestPredict)
}

allCountries()
predictName()