import React, {useState, useEffect} from 'react'
import styles from "../styles/Fetch.module.css";
import { fetchNFTs, fetchNFTsForCollection } from '../utils/FetchNFT'
import Modal from './Modal';
import { useAccount, useDisconnect } from 'wagmi'

function Fetch({setNFTs}) {
  // Application Hooks
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const [isOpen, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);

  // Wagmi Hooks
  const { address } = useAccount();
  const { disconnect } = useDisconnect()

  const handleClick = async () => {
    let nfts;
    if (fetchForCollection) {
      nfts = await fetchNFTsForCollection(collection)
    } else {
      nfts = await fetchNFTs(wallet, collection)
    }
    setNFTs(nfts);
  }

  const disconnectWallet = () => {
    disconnect()
    setWalletAddress('')
  }

  useEffect(() => {
    if(address) {
      setConnected(true);
      setWalletAddress(address);
    } else {
      setConnected(false);
    }
  }, [address])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.flex}>
          <div>
            <p>Wallet address</p>
            <input 
              disabled={fetchForCollection} 
              onChange={(e)=>{setWalletAddress(e.target.value)}} 
              value={wallet} 
              type={"text"} 
              placeholder="Add your wallet address"></input>
          </div>
          <div>
            <p>Collection address</p>
            <input
              onChange={(e)=>{setCollectionAddress(e.target.value)}} 
              value={collection} 
              type={"text"} 
              placeholder="Add the collection address"></input>
          </div>
        </div>
      
        <label>
          <input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"}/>Fetch for collection
        </label>
        <div className={styles.flex}>
          {
            connected ? 
              <button className={styles.button} onClick={() => disconnectWallet()}><p>Disconnect</p></button> : 
              <button className={styles.button} onClick={() => setOpen(!isOpen)}><p>Connect Wallet</p></button>
          }
          
          <button className={styles.button} onClick={handleClick}>Fetch NFTs</button>
        </div>
        {isOpen && <Modal close={() => {setOpen(false)}} setWalletAddress={setWalletAddress}/>}
      </div>
    </>
  )
}

export default Fetch