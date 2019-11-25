import React from 'react';
import ReactDOM from 'react-dom';
import FilterComponent from './Filter';
import { Filter } from '../../models/Filter';
import { shallow, mount } from 'enzyme';

const dummyFunc = jest.fn();
const dummyFilters = new Filter();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FilterComponent fetching={true} refresh={dummyFunc} setFilters={dummyFunc} filters={dummyFilters} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('sets filters when checkbox is clicked', () => {
  const wrapper = mount(
    <FilterComponent fetching={true} refresh={dummyFunc} setFilters={dummyFunc} filters={dummyFilters} />
  );
  wrapper
    .find('input')
    .first()
    .simulate('click');
  expect(dummyFunc).toBeCalledWith({ landSuccess: true, reused: false, withReddit: false });
});
