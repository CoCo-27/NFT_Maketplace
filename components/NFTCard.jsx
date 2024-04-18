import { useState } from 'react'
import { BiCopy } from 'react-icons/bi'
import { BsCheck } from 'react-icons/bs'
import styles from "../styles/NFTCard.module.css";

const NFTCard = ({ nft }) => {

  const [copied, setCopied] = useState(false);

  const image = nft.media[0].gateway;

  const placeholderImage = './no-image-icon.png';

  const onImageError = (e) => {
      e.target.src = placeholderImage
  }

const copyToClipboard = () => {
  navigator.clipboard.writeText(nft.contract.address).then(
    () => {
      setCopied(true);
      // changing back to default state after 2 seconds.
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    },
    (err) => {
      console.log("failed to copy", err.message);
    }
  );
};

  return (
    <div className={`${styles.flexCol} ${styles.nft_container}`}>
      <div>
        <img src={image ? image : placeholderImage} alt="cover image"
        onError={onImageError}></img>
      </div>
      <div className={`${styles.flexCol} ${styles.nft_textContainer}`}>
        <div>
          <h2>{ nft.title ? nft.title : `#${nft.id.tokenId.substr(nft.id.tokenId.length - 4)}`}</h2>
          <p>Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
          <div>
            <p>{`Collection: ${nft.contract.address.substr(0,4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
            <button className={`${styles.nft_button} ${ copied ? styles.nft_button_copied : styles.nft_button_not_copied}`} onClick={() => copyToClipboard()}>
              {
                copied ? <BsCheck size={'1.5rem'} className={styles.text_green}/> : <BiCopy size={'1.5rem'} className={styles.text_gray}/>
              }        
            </button>
            { copied ? <span>Copied</span> : ''} 
          </div>
        </div>

        <div className={styles.nft_textDescription}>
            <p>{nft.description}</p>
        </div>
      </div>
      <div className={styles.nft_link}>
        <a target='_blank' href={`https://etherscan.io/token/${nft.contract.address}`}>View on etherscan</a>
      </div>
    </div>
  )
}

export default NFTCard