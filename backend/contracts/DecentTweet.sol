// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedTwitter {
    // Enum to represent the type of a tweet
    enum TweetType {
        Tweet,
        Reply,
        Retweet,
        Quote
    }

    // Struct to represent a tweet
    struct Tweet {
        TweetType tweetType; // Indicates the type of the tweet
        uint256 tweetIndex; // Unique index of the tweet
        uint256 timestamp; // Timestamp of the tweet
        address authorAddress; // Address of the tweet author
        string authorName; // Name of the tweet author
        string tweetMsg; // Content of the tweet
        uint256 quotedTweetIndex; // Index of the quoted tweet (if this is a quote)
        address[] likedBy; // Addresses of users who liked this tweet
        uint256[] replies; // Indices of replies to this tweet
        uint256[] retweets; // Indices of retweets of this tweet
        uint256[] quotes; // Indices of quotes of this tweet
        address[] bookmarks; // Addresses of users who bookmarked this tweet
        uint256 repliedTweetIndex; // Index of the tweet this tweet is a reply to
    }

    // Struct to represent a user
    struct User {
        address userAddress; // Address of the user
        string userName; // Name of the user
        string userBio; // Bio of the user
        uint256[] bookmarks; // Indices of bookmarked tweets
        uint256[] posts; // Indices of tweets posted by the user
        uint256[] likes; // Indices of tweets liked by the user
        uint256[] replies; // Indices of reply tweets posted by the user
        address[] followers; // Addresses of the user's followers
        address[] following; // Addresses of users the user is following
    }

    // Arrays to store tweets and users
    Tweet[] public tweets;
    User[] public users;

    // Function to create a new tweet
    function createTweet(string memory _tweetMsg) public {
        uint256 tweetIndex = tweets.length;
        uint256 timestamp = block.timestamp;
        address author = msg.sender;

        Tweet storage newTweet = tweets.push();
        newTweet.tweetIndex = tweetIndex;
        newTweet.timestamp = timestamp;
        newTweet.authorAddress = author;
        newTweet.tweetMsg = _tweetMsg;
        newTweet.tweetType = TweetType.Tweet;

        // Update the user's post history
        updateUserPostHistory(author, tweetIndex);
    }

    // Function to quote an existing tweet
    function quoteTweet(uint256 _tweetIndex, string memory _tweetMsg) public {
        Tweet storage originalTweet = tweets[_tweetIndex];
        uint256 newTweetIndex = tweets.length;
        uint256 timestamp = block.timestamp;
        address author = msg.sender;

        Tweet storage newTweet = tweets.push();
        newTweet.tweetIndex = newTweetIndex;
        newTweet.timestamp = timestamp;
        newTweet.authorAddress = author;
        newTweet.tweetMsg = _tweetMsg;
        newTweet.tweetType = TweetType.Quote;
        newTweet.quotedTweetIndex = _tweetIndex;
        originalTweet.quotes.push(newTweetIndex);

        // Update the user's post history
        updateUserPostHistory(author, newTweetIndex);
    }

    // Function to retweet an existing tweet
    function retweet(uint256 _tweetIndex) public {
        Tweet storage originalTweet = tweets[_tweetIndex];
        uint256 newTweetIndex = tweets.length;
        uint256 timestamp = block.timestamp;
        address author = msg.sender;

        Tweet storage newTweet = tweets.push();
        newTweet.tweetIndex = newTweetIndex;
        newTweet.timestamp = timestamp;
        newTweet.authorAddress = author;
        newTweet.tweetMsg = originalTweet.tweetMsg;
        newTweet.tweetType = TweetType.Retweet;
        newTweet.quotedTweetIndex = _tweetIndex;
        originalTweet.retweets.push(newTweetIndex);

        // Update the user's post history
        updateUserPostHistory(author, newTweetIndex);
    }

    // Function to like a tweet
    function likeTweet(uint256 _tweetIndex) public {
        Tweet storage tweet = tweets[_tweetIndex];
        tweet.likedBy.push(msg.sender);

        // Update the user's like history
        updateUserLikeHistory(msg.sender, _tweetIndex);
    }

    // Function to dislike a tweet
    function dislikeTweet(uint256 _tweetIndex) public {
        Tweet storage tweet = tweets[_tweetIndex];
        removeFromArray(tweet.likedBy, msg.sender);

        // Update the user's like history
        updateUserDislikeHistory(msg.sender, _tweetIndex);
    }

    // Function to reply to a tweet
    function replyToTweet(uint256 _tweetIndex, string memory _replyMsg) public {
        Tweet storage originalTweet = tweets[_tweetIndex];
        uint256 newTweetIndex = tweets.length;
        uint256 timestamp = block.timestamp;
        address author = msg.sender;

        Tweet storage newTweet = tweets.push();
        newTweet.tweetIndex = newTweetIndex;
        newTweet.timestamp = timestamp;
        newTweet.authorAddress = author;
        newTweet.tweetMsg = _replyMsg;
        newTweet.tweetType = TweetType.Reply;
        newTweet.quotedTweetIndex = _tweetIndex;
        newTweet.repliedTweetIndex = _tweetIndex;
        originalTweet.replies.push(newTweetIndex);

        // Update the user's reply history
        updateUserReplyHistory(author, newTweetIndex);
    }

    // Function to bookmark a tweet
    function bookmarkTweet(uint256 _tweetIndex) public {
        // Find the user with the given address
        User storage user = getUserByAddress(msg.sender);
        user.bookmarks.push(_tweetIndex);

        // Add the user's address to the tweet's bookmarks
        tweets[_tweetIndex].bookmarks.push(msg.sender);
    }

    // Function to unbookmark a tweet
    function unbookmarkTweet(uint256 _tweetIndex) public {
        // Find the user with the given address
        User storage user = getUserByAddress(msg.sender);

        // Remove the tweet index from the user's bookmarks array
        removeFromUint256Array(user.bookmarks, _tweetIndex);

        // Remove the user's address from the tweet's bookmarks array
        removeFromArray(tweets[_tweetIndex].bookmarks, msg.sender);
    }

    // Function to follow a user
    function followUser(address _userAddress) public {
        // Find the user with the given address
        User storage follower = getUserByAddress(msg.sender);
        User storage followee = getUserByAddress(_userAddress);

        // Add the follower to the followee's followers array
        followee.followers.push(follower.userAddress);

        // Add the followee to the follower's following array
        follower.following.push(_userAddress);
    }

    // Function to unfollow a user
    function unfollowUser(address _userAddress) public {
        // Find the user with the given address
        User storage follower = getUserByAddress(msg.sender);
        User storage followee = getUserByAddress(_userAddress);

        // Remove the follower from the followee's followers array
        removeFromArray(followee.followers, follower.userAddress);

        // Remove the followee from the follower's following array
        removeFromArray(follower.following, _userAddress);
    }

    // Function to get the top users by number of followers
    function getTopUsers(uint256 _count) public view returns (User[] memory) {
        // Sort the users array by the number of followers in descending order
        User[] memory sortedUsers = users;
        for (uint256 i = 0; i < sortedUsers.length - 1; i++) {
            for (uint256 j = 0; j < sortedUsers.length - i - 1; j++) {
                if (sortedUsers[j].followers.length < sortedUsers[j + 1].followers.length) {
                    // Swap the users
                    User memory temp = sortedUsers[j];
                    sortedUsers[j] = sortedUsers[j + 1];
                    sortedUsers[j + 1] = temp;
                }
            }
        }

        // Return the top _count users
        User[] memory topUsers = new User[](_count);
        for (uint256 i = 0; i < _count; i++) {
            topUsers[i] = sortedUsers[i];
        }
        return topUsers;
    }

    // Function to get the followers of a user
    function getFollowers(address _userAddress) public  returns (address[] memory) {
        // Find the user with the given address
        User storage user = getUserByAddress(_userAddress);
        return user.followers;
    }

    // Function to get the users a user is following
    function getFollowing(address _userAddress) public  returns (address[] memory) {
        // Find the user with the given address
        User storage user = getUserByAddress(_userAddress);
        return user.following;
    }

    // Function to update a user's profile
    function updateUserProfile(string memory _userName, string memory _userBio) public {
        // Find the user with the given address
        User storage user = getUserByAddress(msg.sender);
        user.userName = _userName;
        user.userBio = _userBio;
    }

    // Function to get all tweets
    function getAllTweets() public view returns (Tweet[] memory) {
        return tweets;
    }

    function getTweetsFromFollowing(address _user) public  returns (Tweet[] memory) {
    // Get the current user
    User storage currentUser = getUserByAddress(_user);

    // Create a dynamic array to store the tweets
    Tweet[] memory tweetsList = new Tweet[](0);

    // Iterate through the users the current user is following
    for (uint256 i = 0; i < currentUser.following.length; i++) {
        address followedUserAddress = currentUser.following[i];
        User storage followedUser = getUserByAddress(followedUserAddress);

        // Iterate through the tweets posted by the followed user
        for (uint256 j = 0; j < followedUser.posts.length; j++) {
            uint256 tweetIndex = followedUser.posts[j];
            tweetsList[tweetsList.length] = tweets[tweetIndex];
        }
    }

    return tweetsList;
}

    // Function to get a tweet by its index
    function getTweetByIndex(uint256 _tweetIndex) public view returns (Tweet memory) {
        require(_tweetIndex < tweets.length, "Invalid tweet index");
        return tweets[_tweetIndex];
    }

    // Function to get tweets by indices
    function getTweetsByIndices(uint256[] memory _tweetIndices) public view returns (Tweet[] memory) {
    Tweet[] memory selectedTweets = new Tweet[](_tweetIndices.length);
    for (uint256 i = 0; i < _tweetIndices.length; i++) {
        selectedTweets[i] = tweets[_tweetIndices[i]];
    }
    return selectedTweets;
    }

    // Function to get the user details
    function getUserDetails(address _userAddress) public  returns (User memory) {
        // Find the user with the given address
        User storage user = getUserByAddress(_userAddress);
        return user;
    }

    // Public function to get user details
    function getPublicUserDetails(address _userAddress) public  returns (User memory) {
        User memory user = getUserDetails(_userAddress);
        return user;
    }

    // Helper function to update the user's post history
    function updateUserPostHistory(address _userAddress, uint256 _tweetIndex) private {
        User storage user = getUserByAddress(_userAddress);
        user.posts.push(_tweetIndex);
    }

    // Helper function to update the user's like history
    function updateUserLikeHistory(address _userAddress, uint256 _tweetIndex) private {
        User storage user = getUserByAddress(_userAddress);
        user.likes.push(_tweetIndex);
    }

    // Helper function to update the user's reply history
    function updateUserReplyHistory(address _userAddress, uint256 _tweetIndex) private {
        User storage user = getUserByAddress(_userAddress);
        user.replies.push(_tweetIndex);
    }

    // Helper function to update the user's dislike history
    function updateUserDislikeHistory(address _userAddress, uint256 _tweetIndex) private {
        User storage user = getUserByAddress(_userAddress);
        removeFromUint256Array(user.likes, _tweetIndex);
    }

    // Helper function to get a user by their address
    function getUserByAddress(address _userAddress) private  returns (User storage) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].userAddress == _userAddress) {
                return users[i];
            }
        }
        // If the user is not found, create a new user
        User storage newUser = users.push();
        newUser.userAddress = _userAddress;
        return newUser;
    }

    // Helper function to remove an element from an array
    function removeFromArray(address[] storage _array, address _element) private {
        for (uint256 i = 0; i < _array.length; i++) {
            if (_array[i] == _element) {
                _array[i] = _array[_array.length - 1];
                _array.pop();
                return;
            }
        }
    }

    // Helper function to remove an element from a uint256 array
    function removeFromUint256Array(uint256[] storage _array, uint256 _element) private {
        for (uint256 i = 0; i < _array.length; i++) {
            if (_array[i] == _element) {
                _array[i] = _array[_array.length - 1];
                _array.pop();
                return;
            }
        }
    }
}