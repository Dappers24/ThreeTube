import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query GetVideos($first: Int, $skip: Int) {
    videoAddeds(first: $first,skip:$skip, orderBy:id, orderDirection:desc) {
      id
      videoId
      cid
      metadata
    }
    }
`;

// export const GET_NFT = gql`
// query GetNfts(){
//   nftAddeds(orderBy:views, orderDirection:desc) {
//     id
//     cid
//     tokenId
//     metadata
//     views
//     likes
//   } 
// }
// `