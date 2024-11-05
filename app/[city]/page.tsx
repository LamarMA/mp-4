// app/[city]/page.tsx
"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";

import WeatherCard from "../components/weatherCard";
import styled from "styled-components";
import { Weather } from "@/app/interfaces/weather";
import Link from "next/link";

const WeatherContentWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: pink;
  height: 100vh;
`;

const CityName = styled.h1`
  align-self: center;
  color: darkblue;
  margin: 2rem auto;
`;

const WeatherCardsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  border: black 4px solid;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const StyledLink = styled(Link)`
  border: darkblue 4px solid;
  padding: 0.5rem 1rem;
  margin: 1rem;
`


export default function CityPage() {
  const params = useParams();

  // Fetch weather data with SWR
  const { data, error } = useSWR(`/api/getWeatherData?city=${params.city}`, async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    console.log("API Response:", json);
    return json;
  });

  // Handle error and loading states
  if (error) return <div>Failed to load</div>;
  if (!data) return <div> Loading...</div>;

  // If there is data, get the days otherwise an empty array.
  const days = data?.days || [];
  return (
    <WeatherContentWrapper>
      <title>Weather App | MP-4</title>
      <CityName>{params.city}</CityName>
      <WeatherCardsContainer>
        {
          days.map((weather: Weather, i: number) =>
          (
            <WeatherCard
              key={i}
              datetime={weather.datetime}
              conditions={weather.conditions}
              description={weather.description}
              tempmin={weather.tempmin}
              tempmax={weather.tempmax}
            />
          )
          )
        }
      </WeatherCardsContainer>
      <StyledLink href={`/`}>Go Back</StyledLink>
    </WeatherContentWrapper>
  );
}