import { WeathercastDataRow } from "./weathercast-data-row.model";

export interface WeathercastData {
    rows: WeathercastDataRow[],
    totalCount: number
}