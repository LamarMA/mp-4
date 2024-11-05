// app/page.tsx

"use client";

import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: darkblue;
color: white;
height: 100vh;
padding: 5px;
h1 {
  margin-bottom: 1.5rem;
}

p {
  margin-bottom: 1rem;
}

input {
  margin-bottom: 1rem;
}
`;

const StyledLink = styled(Link)`
  border: white 4px solid;
  padding: 0.5rem 1rem;
`

export default function Home() {
  const [city, setCity] = useState("");

  return (
    <StyledDiv>
      <h1> Find the Weather in any city! </h1>
      <p> Enter a city name below to get the current weather </p>
      <input type="text" value={city} placeholder="city name" onChange={(e) => setCity(e.target.value)} />
      <StyledLink href={`/${city}`}>Get Weather</StyledLink>
    </StyledDiv>
  );
}
