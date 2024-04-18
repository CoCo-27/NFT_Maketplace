require("dotenv").config();

let nfts;

// Creator of Bored Ape Yacht Club
const wallet = "0xA858DDc0445d8131daC4d1DE01f834ffcbA52Ef1";

const collection = "0x22c36BfdCef207F9c0CC941936eff94D4246d14A".toLowerCase();

const api_key = process.env.API_KEY;

let requestOptions = {
  method: "GET",
};

describe("Test fetchNFTs", () => {
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;

  it("Should get all nfts of the owner", async function () {
    const fetchURL = `${baseURL}?owner=${wallet}`;

    nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());

    expect(nfts.ownedNfts.length).toBeGreaterThan(0);
  });

  it("Should get only the nfts collection of the owner", async function () {
    const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;

    nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());

    nfts.ownedNfts.map((item) => {
      expect(collection).toEqual(item.contract.address);
    });
  });
});

describe("Test fetchNFTs", () => {
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;

  it("Should get all nfts of the collection", async function () {
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;

    nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());

    expect(nfts.nfts.length).toBeGreaterThan(0);
    nfts.nfts.map((item) => {
      expect(collection).toEqual(item.contract.address);
    });
  });
});
