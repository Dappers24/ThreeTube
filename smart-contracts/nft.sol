// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts@5.0.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract MyToken is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    constructor(address initialOwner)  ERC721("VideoNFT", "VNFT") Ownable(initialOwner){}

    struct Video{
        address owner;
        uint256 price;
        string tokenURI;
        string metadata;
    }

    uint256 private tokenId = 0;
    mapping (uint256 => Video) private videos;
    mapping (string => bool) private mintedVideos;

    event VideoMinted(uint256 indexed tokenId, address indexed owner , string indexed metadata , uint256 price);
    event VideoBought(uint256 indexed tokenId , address indexed buyer , address seller , string indexed metadata);

    function videoMint( string memory tokenUri , uint256 price , string memory metadata) public {
        require(!mintedVideos[tokenUri] , "Video is already Minted");
        require(price>0 , "NFT must have some positive ETH pricing");
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenUri);
        videos[tokenId] = Video({
            owner:msg.sender,
            tokenURI:tokenUri,
            price:price,
            metadata:metadata
        });
        mintedVideos[tokenUri] = true;
        emit VideoMinted(tokenId , msg.sender , metadata , price);
        tokenId++;
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 _tokenId)public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(_tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    //get the nft's by tokens
    //get all the nft's -  to be done by the subgraph
    //buy a nft - payable , transfer function , public , 

    function videoBuy (uint256 _tokenId ) public payable {
        require(tokenId>_tokenId , "NFT does not exist");
        require(msg.value>=videos[_tokenId].price , "Insufficient funds to purchase the NFT");
        address owner = ownerOf(_tokenId);
        require(owner!=msg.sender , "Cannot purchase your own minted NFT");
        _transfer(owner , msg.sender , tokenId);
        payable(owner).transfer(videos[_tokenId].price);
        address seller = videos[_tokenId].owner;
        videos[_tokenId].owner=msg.sender;
        if(videos[_tokenId].price<msg.value){
            payable(msg.sender).transfer(msg.value-videos[_tokenId].price);
        }
        emit VideoBought(_tokenId, msg.sender , seller ,videos[_tokenId].metadata);
    }
}
