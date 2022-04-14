const spanTemp = document.getElementById("temperature")
const imgIcon = document.getElementById("icon")

const url = "https://api.openweathermap.org/data/2.5/weather"
const srcIcon = "https://openweathermap.org/img/wn/{icon}@2x.png"
const params = {"lat": 50.8, "lon": 4.3, "appid": "d52e50e34214ff0b92247f788638eeb9", "units": "metric"}

axios.get(url, { params }).then(({data}) => {
    spanTemp.innerText = data["main"]["temp"]
    imgIcon.setAttribute("src", srcIcon.replace("{icon}", data["weather"][0]["icon"]))
})