const loadData = async () => {
  const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }
  const data = await res.json();

  return data;
};

export default async function handler(req, res) {
  try {
    const data = await loadData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
