const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeather').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = 'Please enter a city name.';
    return;
  }

  try {
    const response = await fetch(
      \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&units=metric&appid=\${apiKey}\`
    );

    if (!response.ok) throw new Error('City not found.');

    const data = await response.json();

    const { name } = data;
    const { temp } = data.main;
    const { description, icon } = data.weather[0];

    resultDiv.innerHTML = \`
      <h2>\${name}</h2>
      <p>\${description}</p>
      <p>🌡️ \${temp}°C</p>
      <img src="https://openweathermap.org/img/wn/\${icon}@2x.png" alt="weather icon" />
    \`;
  } catch (error) {
    resultDiv.innerHTML = error.message;
  }
});