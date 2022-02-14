// const getImagenPromesa = () => new Promise( resolve => resolve('https://ajskdhaskjdhajs.com') )
// getImagenPromesa().then( console.log );
const axios = require("axios").default;

const getImagen = async () => {
  try {
    const apiKey = "TW4E4Pk0HOYgDGCRyq7ijMMto29HpxFd";
    const resp = await axios(
      `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
    );
    const { data } = resp.data;

    const { url } = data.images.original;

    return url;
  } catch (error) {
    // manejo del error
    console.error(error);
    return error;
  }
};

const main = async () => {
  const result = await getImagen();
  console.log(result);
};

main();
