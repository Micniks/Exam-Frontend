import React, { useState } from "react";
import settingUrl from "./settings";

export function External() {
  const [norris, setNorris] = useState(<br/>);
  const [dad, setDad] = useState(<br/>);
  const [country, setCountry] = useState(<br/>);
  const [time, setTime] = useState(<br/>);
  
  const URL = settingUrl.externalApi();
  
  function fetchExternalApi() {
    let options = {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    fetch(URL, options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setDad(data.dadJoke);
        setNorris(data.chuckJoke);
        setCountry(data.countryName);
        setTime(data.copenhagenTime);
      });
  }
  return (<div>
    <h1>External API</h1>
    <button onClick={fetchExternalApi}>Press to fetch from API's!</button>
    <h2>Chuck Norris joke: </h2>
    <p>{norris}</p>
    <h2>Dad joke:</h2>
    <p>{dad}</p>
    <h2>Country: </h2>
    <p>{country}</p>
    <h2>Copenhagen Timezone:</h2>
    <p>{time}</p>
  </div>);
}
