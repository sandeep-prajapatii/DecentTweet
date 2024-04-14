export const DecentTweetContractAddress = "0x1dECc8b583Cd7da782b2D70CD341aCE7c003DEe3";

export const DecentTweetAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetIndex",
        type: "uint256",
      },
    ],
    name: "bookmarkTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_tweetMsg",
        type: "string",
      },
    ],
    name: "createTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetIndex",
        type: "uint256",
      },
    ],
    name: "dislikeTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "followUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "getFollowers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "getFollowing",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "getPublicUserDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "userName",
            type: "string",
          },
          {
            internalType: "string",
            name: "userBio",
            type: "string",
          },
          {
            internalType: "uint256[]",
            name: "bookmarks",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "posts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "likes",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "replies",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "followers",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "following",
            type: "address[]",
          },
        ],
        internalType: "struct DecentralizedTwitter.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "getUserDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "userName",
            type: "string",
          },
          {
            internalType: "string",
            name: "userBio",
            type: "string",
          },
          {
            internalType: "uint256[]",
            name: "bookmarks",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "posts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "likes",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "replies",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "followers",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "following",
            type: "address[]",
          },
        ],
        internalType: "struct DecentralizedTwitter.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetIndex",
        type: "uint256",
      },
    ],
    name: "likeTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetIndex",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_tweetMsg",
        type: "string",
      },
    ],
    name: "quoteTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetIndex",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_replyMsg",
        type: "string",
      },
    ],
    name: "replyToTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetIndex",
        type: "uint256",
      },
    ],
    name: "retweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetIndex",
        type: "uint256",
      },
    ],
    name: "unbookmarkTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "unfollowUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userBio",
        type: "string",
      },
    ],
    name: "updateUserProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllTweets",
    outputs: [
      {
        components: [
          {
            internalType: "enum DecentralizedTwitter.TweetType",
            name: "tweetType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "tweetIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "authorAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "authorName",
            type: "string",
          },
          {
            internalType: "string",
            name: "tweetMsg",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "quotedTweetIndex",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "likedBy",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "replies",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "retweets",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "quotes",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "bookmarks",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "repliedTweetIndex",
            type: "uint256",
          },
        ],
        internalType: "struct DecentralizedTwitter.Tweet[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_count",
        type: "uint256",
      },
    ],
    name: "getTopUsers",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "userName",
            type: "string",
          },
          {
            internalType: "string",
            name: "userBio",
            type: "string",
          },
          {
            internalType: "uint256[]",
            name: "bookmarks",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "posts",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "likes",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "replies",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "followers",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "following",
            type: "address[]",
          },
        ],
        internalType: "struct DecentralizedTwitter.User[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tweetIndex",
        type: "uint256",
      },
    ],
    name: "getTweetByIndex",
    outputs: [
      {
        components: [
          {
            internalType: "enum DecentralizedTwitter.TweetType",
            name: "tweetType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "tweetIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "authorAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "authorName",
            type: "string",
          },
          {
            internalType: "string",
            name: "tweetMsg",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "quotedTweetIndex",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "likedBy",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "replies",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "retweets",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "quotes",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "bookmarks",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "repliedTweetIndex",
            type: "uint256",
          },
        ],
        internalType: "struct DecentralizedTwitter.Tweet",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tweetIndices",
        type: "uint256[]",
      },
    ],
    name: "getTweetsByIndices",
    outputs: [
      {
        components: [
          {
            internalType: "enum DecentralizedTwitter.TweetType",
            name: "tweetType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "tweetIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "authorAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "authorName",
            type: "string",
          },
          {
            internalType: "string",
            name: "tweetMsg",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "quotedTweetIndex",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "likedBy",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "replies",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "retweets",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "quotes",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "bookmarks",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "repliedTweetIndex",
            type: "uint256",
          },
        ],
        internalType: "struct DecentralizedTwitter.Tweet[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tweets",
    outputs: [
      {
        internalType: "enum DecentralizedTwitter.TweetType",
        name: "tweetType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "tweetIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "authorAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "authorName",
        type: "string",
      },
      {
        internalType: "string",
        name: "tweetMsg",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "quotedTweetIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "repliedTweetIndex",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "userName",
        type: "string",
      },
      {
        internalType: "string",
        name: "userBio",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];