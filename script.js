const apiKey = '7d5e74e7b112e34001dc87b79a2fc7c3';

// Theme toggle
const toggleBtn = document.getElementById("toggleTheme");
const body = document.body;

window.onload = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) {
    body.classList.add("day"); // 
  }
};


toggleBtn.addEventListener("click", () => {
  body.classList.toggle("day");
});


async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    document.getElementById("weather").innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>${data.weather[0].main} - ${data.weather[0].description}</p>
      <p>🌡 Temp: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    document.getElementById("weather").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
