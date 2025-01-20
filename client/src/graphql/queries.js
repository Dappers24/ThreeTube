import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query GetVideos($first: Int, $skip: Int) {
    videoAddeds(first: $first,skip:$skip, orderBy:id, orderDirection:desc) {
      id
      videoId
      cid
      metadata
      owner
    }
    }
`;

export const GET_NFT = gql`
query GetNFTs($first: Int, $skip: Int){
  videoMinteds(first: $first,skip:$skip,orderBy:tokenId, orderDirection:desc) {
    id
    tokenId
    metadata
    price
    owner
  } 
}
`