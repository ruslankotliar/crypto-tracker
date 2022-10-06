import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './currencies.module.css';

const Currencies = ({ data }) => {
  const [term, setTerm] = useState('');
  const [dataFiltered, setDataFiltered] = useState(data);

  useEffect(() => {
    const dataX = data.filter(
      (c) =>
        c.code.toLowerCase().includes(term) ||
        c.name.toLowerCase().includes(term)
    );

    term === '' ? setDataFiltered(data) : setDataFiltered(dataX);
  }, [term]);

  return (
    <div className={styles.currencies}>
      <form
        onChange={(e) => setTerm(e.target.value)}
        className={styles.currenciesForm}
      >
        <input
          type='text'
          className={styles.currencyInput}
          placeholder='Currency name/code...'
        />
      </form>
      <section className={styles.cards}>
        {dataFiltered.map((c) => (
          <Link href={`/currencies/${c.code}`} key={c.code}>
            <div className={styles.card}>
              <h3>{c.code}</h3>
              <h5>{c.name}</h5>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Currencies;
