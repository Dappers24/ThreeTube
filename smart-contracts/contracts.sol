// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VideoStorage {
    struct Video {
        address owner;
        string cid;
        string metadata;
        uint256 views;
        uint256 likes;
    }

    mapping(uint256 => Video) public videos;
    mapping(uint256 => mapping(address => bool)) public hasViewed;
    mapping(uint256 => mapping(address => bool)) public hasLiked;
    uint256 public videoCount=0;

    event VideoAdded(uint256 indexed videoId, string cid, string metadata , address indexed owner);
    event VideoViewed(uint256 indexed videoId, uint256 views);
    event VideoLiked(uint256 indexed videoId, uint256 likes);
    event VideoUnLiked(uint256 indexed videoId, uint256 likes);

    
    function addVideo(string memory _cid, string memory _metadata) public {
        videoCount++;
        address _owner=msg.sender;
        videos[videoCount]=Video(_owner ,_cid, _metadata, 0, 0 );
        emit VideoAdded(videoCount, _cid, _metadata , _owner);
    }

    
    function getVideo(uint256 _videoId) public returns (string memory cid, string memory metadata, uint256 views, uint256 likes) {
        Video memory video=videos[_videoId];
        updateView(_videoId);
        return (video.cid, video.metadata, video.views, video.likes);
    }

    
    function updateView(uint256 _videoId) internal {
        if(!hasViewed[_videoId][msg.sender]) return;
        videos[_videoId].views++;
        hasViewed[_videoId][msg.sender]=true;
        emit VideoViewed(_videoId, videos[_videoId].views);
    }
    
    function addLike(uint256 _videoId) public {
        require(!hasLiked[_videoId][msg.sender], "You have already liked this video.");
        videos[_videoId].likes++;
        hasLiked[_videoId][msg.sender]=true;
        emit VideoLiked(_videoId, videos[_videoId].likes);
    }

    function delLike(uint256 _videoId) public{
        require(hasLiked[_videoId][msg.sender], "You have not yet Liked the video");
        videos[_videoId].likes--;
        hasLiked[_videoId][msg.sender] = false;
        emit VideoUnLiked(_videoId,videos[_videoId].likes);
    }
}
