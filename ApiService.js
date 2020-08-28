const APIKEY = process.env.REACT_APP_API_KEY;
const URL_PATH = 'https://api.barcodelookup.com/v2/products?barcode=';
const EXTRA = '&formatted=y&key=';

export default processBarcode = async barcode => {
  return await fetchData(barcode);
};

function fetchData(barcode) {
  const url = URL_PATH + barcode + EXTRA + APIKEY;
  console.log(url);
  return fetch(url)
    .catch(err => console.log('error', err))
    .then(res => {
      if (res.status !== 200) {
        console.log(res);
        return {
          resStatus: res.status,
        };
      } else if (res.status === 200) {
        return res.json();
      }
    });
}
