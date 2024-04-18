const api_key = process.env.API_KEY;
const requestOptions = {
  method: 'GET'
};

export const fetchNFTs = async(wallet, collection='') => {
  let nfts;
  console.log("fetching nfts");
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;

  if (!collection.length) {

    const fetchURL = `${baseURL}?owner=${wallet}`;

    nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
  } else {
    console.log("fetching nfts for collection owned by address")
    /**
     * The "5B%5D" string right after the "contractAddresses" parameters specifies
     * that the "contractAddresses" parameter is an array and not a simple string.
     * This is because you could actually filter by multiple "contractAddresses", not just one.
     */
    const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
    nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
  }

  if (nfts) {
    console.log("nfts:", nfts)
    return nfts.ownedNfts
  }
}

export const fetchNFTsForCollection = async (collection) => {
  if (collection.length) {
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
    const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    if (nfts) {
      console.log("NFTs in collection:", nfts)
      return nfts.nfts
    }
  }
}

export const initialFetch = async () => {
  // Collection Bored Ape
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
  const fetchURL = `${baseURL}?contractAddress=0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D&withMetadata=${"true"}`;
  const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    if (nfts) {
      console.log("NFTs in collection:", nfts)
      return nfts.nfts
    }
}