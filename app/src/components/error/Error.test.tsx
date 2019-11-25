import React from 'react';
import ReactDOM from 'react-dom';
import ErrorComponent from './Error';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ErrorComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
