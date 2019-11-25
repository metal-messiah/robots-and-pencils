import React from 'react';
import ReactDOM from 'react-dom';
import RocketComponent from './Rocket';
import { Rocket } from '../../interfaces/Rocket';

const dummyRocket: Rocket = {
  id: 1,
  badge: new URL('https://fakepath.com'),
  name: 'rocket',
  type: 'type',
  launchDate: new Date(),
  details: 'details',
  article: new URL('https://fakepath.com')
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RocketComponent {...dummyRocket} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
