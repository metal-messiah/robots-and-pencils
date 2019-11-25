import React from 'react';
import './Filter.css';
import refreshIcon from '../../assets/refresh.svg';

const FilterComponent: React.FC<any> = props => {
  const { refresh, filters, setFilters, fetching } = props;

  // On checkbox event, update parent filters obj
  const changeFilter = (id: string) => {
    const f = Object.assign({}, filters);
    f[id] = !f[id];
    setFilters(f);
  };

  return (
    <div className='filter'>
      <img src={refreshIcon} className={fetching ? 'fetching' : ''} onClick={() => refresh()} alt='Refresh' />
      <div className='filler'></div>
      <label>
        Land Success
        <input type='checkbox' onClick={() => changeFilter('landSuccess')} />
        <span className='checkmark'></span>
      </label>
      <label>
        Reused
        <input type='checkbox' onClick={() => changeFilter('reused')} />
        <span className='checkmark'></span>
      </label>
      <label>
        With Reddit
        <input type='checkbox' onClick={() => changeFilter('withReddit')} />
        <span className='checkmark'></span>
      </label>
    </div>
  );
};

export default FilterComponent;
