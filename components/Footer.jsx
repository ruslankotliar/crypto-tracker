import React from 'react';
import { BsTelegram } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className='footer'>
      <a href='https://telegram.me/ruslan_kotliarr' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <BsTelegram />
        <span>ruslan_kotliar</span>
      </a>
    </div>
  );
};

export default Footer;
