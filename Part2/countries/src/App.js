import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather"


const Weather = ({capital,coordinates}) =>{
  const [weather, setWeather] = useState(null)
  useEffect(()=>{
    weatherService
      .getWeather(coordinates[0],coordinates[1])
      .then(weather => setWeather(weather))
      .catch(error => null)
  },[capital])

  if(weather===null)
  {
    return null
  }
  return (<div>
    <h2>Weather in {capital}</h2>
    <div>temperature {(Math.round((weather.main.temp-273.15) * 100) / 100).toFixed(2)} celsius</div>
    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} />
    <div>wind {weather.wind.speed} m/s</div>
  </div>)
}

const Country = ({country}) =>{
  return(
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <p><strong>languages:</strong></p>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather capital={country.capital} coordinates={country.capitalInfo.latlng}/>
    </div>
  )
}

const ShowCountries = ({countries,onClick}) =>{

  return countries.map(country => {
    return <div key={country.name.common}>
      {country.name.common}
      <button onClick={() => onClick(country.name.common)}>show</button>
    </div>})
}

const Display = ({countries,fil,onClick}) => {
  if(countries.length > 10 && fil!==''){
    return <div>Too many matches,specify another filter</div>
  }
  else if(countries.length==1){
    return <Country country={countries[0]}/>
  }
  else{
    return <ShowCountries countries={countries} onClick={onClick}/>
  }

}

const Filter = ({fil, onChange}) => (
    <div>
      find countries <input value={fil} onChange={onChange} />
    </div>
  )

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [fil, setFilter] = useState('')

  const updateFilter = (event) =>{
    setFilter(event.target.value)
  }

  useEffect(()=>{
    countryService
      .getAll()
      .then(countries => setCountries(countries))
  },[])

  const displayCountries = countries.filter(country => country.name.common.toLowerCase().includes(fil.toLowerCase()))
  return (
    <div>
      <Filter fil={fil} onChange={updateFilter}/>
      <Display countries={displayCountries} fil={fil} onClick={setFilter}/>
    </div>
  );
}

export default App;
