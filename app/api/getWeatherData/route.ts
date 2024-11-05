// app/api/getWeatherData/route.ts

import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function GET(request: Request): Promise<NextResponse> {

  //extract search params from URL
  const { searchParams } = new URL(request.url);

  //get value of city
  const city = searchParams.get("city");

  //if no city, return 400 Bad Request

  if (!city) {
    return NextResponse.json({ error: "No [city] provided" }, { status: 400 });
  }

  //make API request to fetch weather data for specified city
  const res = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&include=days%2Ccurrent%2Cevents&key=${WEATHER_API_KEY}&contentType=json`
  );

  // if API request fails, return 500 Internal Server Error
  if (res.status !== 200) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  // parse json data from API response
  const data = await res.json();

  // return parsed data as JSON
  return NextResponse.json(data);
}