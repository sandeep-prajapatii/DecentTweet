// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentTweet {
    struct Tweet {
        address author;
        string text;
        uint256 timestamp;
    }

    struct User {
        address userAddress;
        string name;
        string profilePictureIPFS;
        Tweet[] tweets;
        address[] followers;
        address[] following;
        uint256 numFollowers;
        uint256 numFollowing;
        mapping(address => bool) isFollowing;
        uint256[] bookmarks;
        mapping(address => bool) approvedLogInAddresses;
    }

    mapping(address => User) public users;
    Tweet[] public allTweets;

    function createTweet(string memory _text) public {
        Tweet memory newTweet = Tweet(msg.sender, _text, block.timestamp);
        users[msg.sender].tweets.push(newTweet);
        allTweets.push(newTweet);
    }

    function getAllTweets() public view returns (Tweet[] memory) {
        return allTweets;
    }

    function getUserTweets() public view returns (Tweet[] memory) {
        return users[msg.sender].tweets;
    }

    function follow(address _user) public {
        require(_user != msg.sender, "You can't follow yourself");
        require(!users[msg.sender].isFollowing[_user], "You are already following this user");
        users[msg.sender].following.push(_user);
        users[msg.sender].numFollowing++;
        users[_user].followers.push(msg.sender);
        users[_user].numFollowers++;
        users[msg.sender].isFollowing[_user] = true;
    }

    function unfollow(address _user) public {
        require(users[msg.sender].isFollowing[_user], "You are not following this user");
        for (uint256 i = 0; i < users[msg.sender].following.length; i++) {
            if (users[msg.sender].following[i] == _user) {
                users[msg.sender].following[i] = users[msg.sender].following[users[msg.sender].following.length - 1];
                users[msg.sender].following.pop();
                users[msg.sender].numFollowing--;
                break;
            }
        }
        for (uint256 i = 0; i < users[_user].followers.length; i++) {
            if (users[_user].followers[i] == msg.sender) {
                users[_user].followers[i] = users[_user].followers[users[_user].followers.length - 1];
                users[_user].followers.pop();
                users[_user].numFollowers--;
                break;
            }
        }
        users[msg.sender].isFollowing[_user] = false;
    }

    function getFollowers(address _user) public view returns (address[] memory) {
        return users[_user].followers;
    }

    function getFollowing(address _user) public view returns (address[] memory) {
        return users[_user].following;
    }

    function setProfilePicture(string memory _ipfsLink) public {
        users[msg.sender].profilePictureIPFS = _ipfsLink;
    }

    function setUserName(string memory _name) public {
        users[msg.sender].name = _name;
    }

    function addBookmark(uint256 _tweetIndex) public {
        users[msg.sender].bookmarks.push(_tweetIndex);
    }

    function removeBookmark(uint256 _bookmarkIndex) public {
        require(_bookmarkIndex < users[msg.sender].bookmarks.length, "Invalid bookmark index");
        users[msg.sender].bookmarks[_bookmarkIndex] = users[msg.sender].bookmarks[users[msg.sender].bookmarks.length - 1];
        users[msg.sender].bookmarks.pop();
    }

    function getTopTenUsers() public view returns (address[] memory) {
        address[] memory topUsers = new address[](10);
        uint256[] memory followerCounts = new uint256[](10);

        for (uint256 i = 0; i < 10; i++) {
            topUsers[i] = address(0);
            followerCounts[i] = 0;
        }

        for (uint256 i = 0; i < allTweets.length; i++) {
            address author = allTweets[i].author;
            uint256 numFollowers = users[author].numFollowers;

            for (uint256 j = 0; j < 10; j++) {
                if (numFollowers > followerCounts[j]) {
                    for (uint256 k = 9; k > j; k--) {
                        topUsers[k] = topUsers[k - 1];
                        followerCounts[k] = followerCounts[k - 1];
                    }
                    topUsers[j] = author;
                    followerCounts[j] = numFollowers;
                    break;
                }
            }
        }

        return topUsers;
    }

    function approveLogInAddress(address _address) public {
        users[msg.sender].approvedLogInAddresses[_address] = true;
    }

    function disapproveLogInAddress(address _address) public {
        users[msg.sender].approvedLogInAddresses[_address] = false;
    }

    function canLogIn(address _address) public view returns (bool) {
        return users[msg.sender].approvedLogInAddresses[_address];
    }
}