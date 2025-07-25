const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = (data.wind.speed * 3.6).toFixed(1); // m/s to km/h
    document.getElementById("description").textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("weatherBox").style.display = "block";

  } catch (error) {
    alert("Something went wrong. Try again!");
    console.error(error);
  }
}
