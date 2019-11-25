import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/sizers.css';

import RocketComponent from './components/rocket/Rocket';
import { Rocket } from './interfaces/Rocket';

import FilterComponent from './components/filter/Filter';
import { Filter } from './models/Filter';

import HeaderComponent from './components/header/Header';
import ErrorComponent from './components/error/Error';

import axios from 'axios';

const HOST =
  process.env.NODE_ENV === 'development' ? `http://localhost:3001` : 'https://robots-n-pencils.herokuapp.com';

const App: React.FC = () => {
  // list of rockets, for RocketComponents
  const [rockets, setRockets] = useState<Rocket[]>([]);
  // if no data comes back from API
  const [error, setError] = useState<boolean>(false);
  // checkboxes in FilterComponent
  const [filters, setFilters] = useState<Filter>(new Filter());

  // get the data once the component mounts and draws (once)
  useEffect(() => {
    getData();
  }, []);

  // build params from enabled filters for call to API
  const getParams = () => {
    const enabled = Object.keys(filters).filter((key: keyof Filter) => filters[key] === true);
    const params = {};
    enabled.forEach(x => {
      params[x] = x;
    });
    return params;
  };

  // call to API for list of rockets
  const getData = () => {
    reset();
    axios
      .get(`${HOST}/api/rap`, { params: getParams() })
      .then(d => {
        d.data.sort((a: Rocket, b: Rocket) => a.id - b.id);
        setRockets(d.data);
      })
      .catch(err => setError(true));
  };

  // clear the list
  const reset = () => {
    setRockets([]);
    setError(false);
  };

  return (
    <div className='App'>
      <h1>SpaceX Launches</h1>
      <div className='container'>
        <FilterComponent
          fetching={!rockets.length && !error}
          refresh={getData}
          setFilters={setFilters}
          filters={filters}
        />
        {rockets.length && <HeaderComponent />}
        {error && <ErrorComponent />}
        {!error && rockets.map((data: Rocket, i: number) => <RocketComponent key={i} {...data}></RocketComponent>)}
      </div>
    </div>
  );
};

export default App;
