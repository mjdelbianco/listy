const APIKEY = '&formatted=y&key=y35oh298hu2qo6qz08senhjdf97fao';
const URL_PATH = 'https://api.barcodelookup.com/v2/products?barcode='
//https://api.barcodelookup.com/v2/products?barcode=9780140157376&key=y35oh298hu2qo6qz08senhjdf97fao

export default processBarcode = async (barcode) => {
  console.log(barcode, "BARCOOOODE")
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