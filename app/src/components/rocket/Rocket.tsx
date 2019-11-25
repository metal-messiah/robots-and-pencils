import React from 'react';
import { Rocket } from '../../interfaces/Rocket';
import './Rocket.css';
import linkIcon from '../../assets/link.svg';
import '../../styles/sizers.css';

/* equates to Row items of list */
const RocketComponent: React.FC<any> = (props: Rocket) => {
  return (
    <div className='rocket'>
      <div className='small'>
        <img alt='Badge' src={String(props.badge)} className='badge' />
      </div>
      <div className='medium'>{props.name}</div>
      <div className='medium'>{props.type}</div>

      <div className='medium'>{new Date(props.launchDate).toLocaleDateString()}</div>
      <div className='large'>{props.details}</div>
      <div className='small'>{props.id}</div>
      <div className='small'>
        <a href={String(props.article)} target='_blank'>
          <svg width='15' height='15'>
            <image xlinkHref={linkIcon} height='15' width='15' />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default RocketComponent;
