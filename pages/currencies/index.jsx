import React from 'react';
import Currencies from '../../components/Currencies/Currencies';

const Features = ({ data }) => {
  return (
    <div style={{ height: '100%' }}>
      <Currencies data={data} />
    </div>
  );
};

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path';
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'currencies.json');
  const jsonData = await fsPromises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: { data },
  };
}

export default Features;
