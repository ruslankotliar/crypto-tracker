import React from 'react';
import { useRouter } from 'next/router';
// import { loadData } from '../..';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Bpi = ({}) => {
  const router = useRouter();
  const bpiCode = router.query.bpi;
  const { data, error } = useSWR(`/api/bpi/${bpiCode}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  const bpi =
    Object.entries(data.bpi).length > 1
      ? Object.entries(data.bpi)[1][1]
      : Object.entries(data.bpi)[0][1];
  const updated = data.time.updated;

  const formatCurrency = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: `${bpi.code}`,
  });
  
  let money = formatCurrency.format(bpi.rate_float);

  return (
    <section
      className='stats'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        marginTop: '0',
      }}
    >
      <h2 className='stats-chart'>Bitcoin</h2>
      <h5 className='stats-time'>{updated}</h5>
      <span>*Updates every 60 sec*</span>
      <div className='stats-currencies'>
        <div className='stats-currencies-c no-hover'>
          <h3>{bpi.code}</h3>
          <p>{bpi.description}</p>
          <h4>
            {money}
            <span style={{ color: 'darker' }}></span>
          </h4>
        </div>
      </div>
      <p className='stats-description'>
        This data was produced from the CoinDesk Bitcoin Price Index (USD).
        Non-USD currency data converted using hourly conversion rate from
        openexchangerates.org
      </p>
    </section>
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: '100vh',
    //     flexDirection: 'column',
    //   }}
    // >
    //   <h1>{bpi.rate}</h1>
    //   <h2>{updated}</h2>
    //   <button>{router.query.bpi}</button>
    // </div>
  );
};

// export const getStaticProps = async ({ params }) => {
//   const res = await fetch(
//     `https://api.coindesk.com/v1/bpi/currentprice/${params.bpi}.json`
//   );
//   if (!res.ok) {
//     throw new Error(`Failed to fetch posts, received status ${res.status}`);
//   }
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//     revalidate: 60,
//   };
// };

// export const getStaticPaths = async () => {
//   const data = await loadData()
//   const paths = Object.entries(data.bpi).map((bpi) => {
//     const { code } = bpi[1];
//     return { params: { bpi: code } };
//   });

//   return { paths, fallback: false };
// };

export default Bpi;
