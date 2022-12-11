import '../../styles/Home.module.css';

export default function NFTCard({ nft }) {
    return (

        <div className='main'>
            <div className='nftslist'>
                <div className='nftimage'>
                    <img src={nft.media[0].gateway}></img>
                </div>
                <div className='nft'>
                    <p>{nft.title}</p>

                    <p>id# {nft.tokenId}</p>
                    <p>{`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>

                    <p>{nft.description?.substr(0, 150)}</p>
                    <button><a href={`https://etherscan.io/token/${nft.contract.address}`}>View on Etherscan</a></button>
                </div>
            </div>
        </div>


    )
}