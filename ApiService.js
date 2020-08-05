const APIKEY = '&formatted=y&key=yn2q2y7kl63te9ncms2eionqd2kwy3';
const URL_PATH = 'https://api.barcodelookup.com/v2/products?barcode='

export default processBarcode = async (barcode) => {
  return await fetchData(barcode);
  };

function fetchData(barcode) {
  const url = URL_PATH + barcode + APIKEY;
  console.log(url)
  return fetch(url)
  .catch(err => console.log('error', err))
  .then(res => {
    if(res.status !== 200){
      console.log(res);
      return {
        resStatus: res.status
      }
    } else if(res.status === 200) {
      return res.json()
    }
  })

};