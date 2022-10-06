import useSWR from 'swr';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Modal from '../components/Modal/Modal';
import { AiOutlineCaretDown } from 'react-icons/ai';

const fetcher = (url) => fetch(url).then((res) => res.json());

function App({}) {
  const { data, error } = useSWR('/api/data', fetcher);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scroll, setScroll] = useState(0);
  const scrollEl = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY);
    });

    console.log('scrolled status: ', scrolled);
    console.log('scroll: ', scroll);
    setScrolled(scroll > 30);
  }, [scroll]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ position: 'relative' }}>
      <section className='hero'>
        <div className='hero-content'>
          <h1>Wanna learn crypto?</h1>
          <h3>
            <span>Crypto</span> will let u lose your money and become homeless.
            <br />
            Subscribe to become a part of our community!
          </h3>
          <button
            className='button-86'
            onClick={() => setIsOpen(true)}
            role='button'
          >
            Sign up
          </button>
        </div>
      </section>
      <section className='stats'>
        <h2 className='stats-chart'>{data.chartName}</h2>
        <h5 className='stats-time'>{data.time.updated}</h5>
        <span>*Updates every 60 sec*</span>
        <div className='stats-currencies'>
          {Object.entries(data.bpi).map((c) => {
            const { code, description, rate_float, symbol } = c[1];
            const formatCurrency = new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: `${code}`,
            });
            let money = formatCurrency.format(rate_float);
            return (
              <Link href={`/currencies/${code}`} key={code}>
                <div className='stats-currencies-c'>
                  <h3>{code}</h3>
                  <p>{description}</p>
                  <h4>{money}</h4>
                </div>
              </Link>
            );
          })}
        </div>
        <p className='stats-description'>{data.disclaimer}</p>
      </section>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      {!scrolled && (
        <div className='scroll' ref={scrollEl}>
          <AiOutlineCaretDown />
        </div>
      )}
    </div>
  );
}

// export const loadData = async () => {
//   const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
//   if (!res.ok) {
//     throw new Error(`Failed to fetch posts, received status ${res.status}`);
//   }
//   const data = await res.json();

//   return data;
// };

// export const getStaticProps = async () => {
//   const data = await loadData();
//   console.log(data);

//   return {
//     props: {
//       data,
//     },
//     revalidate: 60,
//   };
// };

export default App;
