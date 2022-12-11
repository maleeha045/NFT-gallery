import React, { useState } from 'react';
import { Network, Alchemy } from "alchemy-sdk";
import NFTCard from "./components/NFTCard";


export default function Home() {

  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [fetchCollection, setFetchCollection] = useState(false)
  const [NFTs, setNFTs] = useState([]);

  const fetchNfts = async () => {
    let nfts;
    let alchemy;
    console.log("fetching nfts..");
    const settings = {
      apiKey: 'YHIDOqH7d0a1rlgCZfmpeRrIF9uopSTk', // Replace with your Alchemy API Key.
      network: Network.ETH_MAINNET, // Replace with your network.

    };
    if (!collectionAddress.length) {
      alchemy = new Alchemy(settings);

      // Print all NFTs returned in the response:
      nfts = await alchemy.nft.getNftsForOwner(walletAddress);
      console.log(nfts);
      setNFTs(nfts.ownedNfts);
    }
  }
  const fetchNftsForCollection = async () => {
    let nfts;
    let alchemy;
    console.log("fetching nfts..");
    const settings = {
      apiKey: 'YHIDOqH7d0a1rlgCZfmpeRrIF9uopSTk', // Replace with your Alchemy API Key.
      network: Network.ETH_MAINNET, // Replace with your network.

    }
    if (collectionAddress.length) {
      alchemy = new Alchemy(settings);
      nfts = await alchemy.nft.getNftsForContract(collectionAddress);
      console.log(nfts);
      setNFTs(nfts.nfts);
    }

  }

  return (
    <div>
      <input disabled={fetchCollection} onChange={(e) => { setWalletAddress(e.target.value) }} value={walletAddress} type='text' placeholder="enter wallet address"></input>
      <input onChange={(e) => { setCollectionAddress(e.target.value) }} value={collectionAddress} type='text' placeholder="enter collection address"></input>
      <div className='checkbtn'>
        <input onChange={(e) => setFetchCollection(e.target.checked)} type='checkbox'></input>
        <label>fetch for collection</label>
      </div>
      <button onClick={() => {
        if (fetchCollection) {
          fetchNftsForCollection()
        }
        else {
          fetchNfts()
        }

      }}>let's go</button>
      {
        NFTs.length && NFTs.map(nft => {
          return (
            <div className='main1'>
              <NFTCard nft={nft} />
            </div>
          )
        })
      }

    </div>
  )
}
