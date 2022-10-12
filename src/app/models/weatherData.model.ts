export interface WeatherData {
  lat: number;
  lon: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    clouds: number;
    uvi: number;
    visibility: number;
    rain?: number;
    snow?: number;
    weather: { main: string; description: string; icon: string }[];
  };
  hourly: [];
  daily:
    | {
        rain?: number;
        snow?: number;
        humidity: number;
        temp: { day: number; night: number };
        weather: { icon: string; description: string };
      }[];
}
