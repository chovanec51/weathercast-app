export interface WeathercastParams {
    latitude: number,
    longitude: number,
    hourly: string[],
    timezone: string,
    past_days?: number
}
