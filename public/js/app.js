const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value

    fetch('/weather?address=' + encodeURI(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = 'It`s ' + data.forecast.observation_time + ' o`clock. The humidity is ' + data.forecast.humidity + '%. ' + data.forecast.weather_description + '. It is currently ' + data.forecast.temperature + ' degress out. There is a ' + data.forecast.precip + '% to rain.'
            }
        })
    })
})