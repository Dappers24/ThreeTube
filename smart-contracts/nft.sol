// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VideoNFT is ERC721, Ownable {

    struct Video {
        address owner;
        string metadata;
        string cid;
        uint256 price;
        uint256 views;
        uint256 likes; 
    }

    uint256 private _tokenIdCounter = 0;
    mapping(uint256 => Video) private videos;

    event VideoMinted(uint256 indexed tokenId, string title, address indexed owner);
    event VideoSold(uint256 indexed tokenId, address indexed buyer, uint256 price);

    constructor() ERC721("VideoNFT", "VNFT") {
        
    }
    
    function mintVideo( string memory metadata, string memory cid, uint256 price) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _mint(msg.sender, tokenId);
        videos[tokenId] = Video({
            metadata: metadata,
            cid: cid,
            price: price
        });
        emit VideoMinted(tokenId, metadata, msg.sender);
        _tokenIdCounter++;
    }

    function buyVideo(uint256 tokenId) public payable {
        require(tokenId<=_tokenIdCounter, "Video does not exist");
        require(msg.value >= videos[tokenId].price, "Insufficient balance");
        address owner = ownerOf(tokenId);
        require(owner != msg.sender, "Cannot buy your own NFT");
        _transfer(owner, msg.sender, tokenId);
        payable(owner).transfer(msg.value);
        ownerOf(tokenId) = msg.sender
        emit VideoSold(tokenId, msg.sender, msg.value);
    }

    function getVideo(uint256 tokenId) public view returns (Video memory) {
        require(_exists(tokenId), "Video does not exist");
        return videos[tokenId];
    }
}