/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import { FaHandHoldingWater } from 'react-icons/fa';
import Link from 'next/link';
import { Link as L } from 'react-router-dom';
import { useRouter } from 'next/router';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scroll, setScroll] = useState(0);
  const router = useRouter();
  const logo = useRef();
  const header = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY);
    });

    setScrolled(scroll > 10);
  }, [scroll]);

  useEffect(() => {
    if (header && logo) {
      if (scroll > 10) {
        header.current.style.backgroundColor = '#516b69';
        logo.current.style.color = 'white';
      } else {
        header.current.style.backgroundColor = 'transparent';
        logo.current.style.color = '#253130';
      }
    }
  }, [scroll]);

  return (
    <div ref={header} className='header'>
      <Link href='/'>
        <span
          style={{ textDecoration: 'none' }}
          className='header-logo'
          ref={logo}
        >
          <FaHandHoldingWater />
          Crypto
        </span>
      </Link>
      <div className='header-nav'>
        <ul className='header-nav-items'>
          <Link style={{ textDecoration: 'none' }} href='/'>
            <li
              style={{ cursor: 'pointer' }}
              className={
                scrolled
                  ? router.pathname === '/'
                    ? 'active-dark header-nav-items-item'
                    : 'inactive-dark header-nav-items-item'
                  : router.pathname === '/'
                  ? 'active-light header-nav-items-item'
                  : 'inactive-light header-nav-items-item'
              }
            >
              Home
            </li>
          </Link>
          <Link href='/currencies' style={{ textDecoration: 'none' }}>
            <li
              style={{ cursor: 'pointer' }}
              className={
                scrolled
                  ? router.pathname === '/currencies'
                    ? 'active-dark header-nav-items-item'
                    : 'inactive-dark header-nav-items-item'
                  : router.pathname === '/currencies'
                  ? 'active-light header-nav-items-item'
                  : 'inactive-light header-nav-items-item'
              }
            >
              Currencies
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
