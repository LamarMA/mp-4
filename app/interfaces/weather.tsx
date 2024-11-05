// app/interfaces/weather.tsx

// this wasn't in the instructions but this essentially is saving Weather as a data type
export interface Weather {
  datetime: string;
  conditions: string;
  description: string;
  tempmin: number;
  tempmax: number;
}
