const processReaction = require("../reactionService");
const axios = require("axios");

class Weather {
  static async TriggerWhenTempReached(area) {
    const city = area.action.args.city;
    const choice = area.action.args.choice;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    try {
      const res = await axios.get(url);

      const temp = ((res.data.main.temp - 32) * (5 / 9)).toFixed(0);

      if (temp === area.action.args.temp) {
        return await processReaction(area);
      }

      if (choice === "Au dessus") {
        if (temp > area.action.args.temp) {
          await processReaction(area);
        }
      }

      if (choice === "En dessous") {
        if (temp < area.action.args.temp) {
          await processReaction(area);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  static firstTempDrop = null;
  static async TriggerWhenTempDropped(area) {
    const city = area.action.args.city;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    try {
      const res = await axios.get(url);
      const temp = ((res.data.main.temp - 32) * (5 / 9)).toFixed(0);
      if (Weather.firstTempDrop === null) {
        Weather.firstTempDrop = temp;
      }
      console.log("temp = ", temp);
      console.log("Weather.firstTempDrop = ", Weather.firstTempDrop);

      if (temp < Weather.firstTempDrop) {
        return await processReaction(area);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static firstTempRise = null;
  static async TriggerWhenTempRise(area) {
    const city = area.action.args.city;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    try {
      const res = await axios.get(url);
      const temp = ((res.data.main.temp - 32) * (5 / 9)).toFixed(0);
      if (Weather.firstTempRise === null) {
        Weather.firstTempRise = temp;
      }

      if (temp > Weather.firstTempRise) {
        return await processReaction(area);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async TriggerWhenWeatherReached(area) {
    const city = area.action.args.city;
    const trad = {
      Orage: "Thunderstorm",
      Bruine: "Drizzle",
      Pluie: "Rain",
      Neige: "Snow",
      Atmosphère: "Atmosphere",
      Clair: "Clear",
      Nuageux: "Clouds",
    };
    const weatherSearched = trad[area.action.args.weatherSearched];

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    try {
      const res = await axios.get(url);
      const weather = res.data.weather[0].main;

      if (weather === weatherSearched) {
        return await processReaction(area);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Weather;
