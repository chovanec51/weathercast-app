export class WeathercastDataRow {
    constructor(
        public dateTime: Date,
        public weatherCode: number,
        public temperature: number,
        public surfacePressure: number,
        public relativeHumidity: number,
        public precipitationProbability: number
    ){}

    static getProperties(): string[] {
        return [
            'dateTime',
            'weatherCode',
            'temperature',
            'surfacePressure',
            'relativeHumidity',
            'precipitationProbability'
        ];
    }

    compare(other: WeathercastDataRow, property: string): number {
        switch (property) {
            case 'dateTime':
                return this.dateTime < other.dateTime ? -1 : (this.dateTime > other.dateTime ? 1 : 0);
            case 'weatherCode':
                return this.weatherCode < other.weatherCode ? -1 : (this.weatherCode > other.weatherCode ? 1 : 0);
            case 'temperature':
                return this.temperature < other.temperature ? -1 : (this.temperature > other.temperature ? 1 : 0);
            case 'surfacePressure':
                return this.surfacePressure < other.surfacePressure ? -1 : (this.surfacePressure > other.surfacePressure ? 1 : 0);
            case 'relativeHumidity':
                return this.relativeHumidity < other.relativeHumidity ? -1 : (this.relativeHumidity > other.relativeHumidity ? 1 : 0);
            case 'precipitationProbability':
                return this.precipitationProbability < other.precipitationProbability ? -1 : (this.precipitationProbability > other.precipitationProbability ? 1 : 0);
            default:
                return 0;            
        }
    }
}