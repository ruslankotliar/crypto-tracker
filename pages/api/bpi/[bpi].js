const loadData = async (bpi) => {
  const res = await fetch(
    `https://api.coindesk.com/v1/bpi/currentprice/${bpi}.json`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${bpi}`);
  }
  const data = await res.json();

  return data;
};

export default async function handler(req, res) {
  try {
    console.log(req.query)
    const { bpi } = req.query;
    const data = await loadData(bpi);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
