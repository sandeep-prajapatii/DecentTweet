export const DecentTweetAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tweetIndex",
				"type": "uint256"
			}
		],
		"name": "bookmarkTweet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tweetIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_comment",
				"type": "string"
			}
		],
		"name": "commentOnTweet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tweetMsg",
				"type": "string"
			}
		],
		"name": "createTweet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userToFollow",
				"type": "address"
			}
		],
		"name": "follow",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tweetIndex",
				"type": "uint256"
			}
		],
		"name": "likeTweet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tweetIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_quote",
				"type": "string"
			}
		],
		"name": "quoteTweet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tweetIndex",
				"type": "uint256"
			}
		],
		"name": "retweet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userToUnfollow",
				"type": "address"
			}
		],
		"name": "unfollow",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allTweets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tweetIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tweetMsg",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isQuote",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isRetweet",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "quotedTweetIndex",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllTweets",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tweetIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "author",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "tweetMsg",
						"type": "string"
					},
					{
						"internalType": "address[]",
						"name": "likes",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "replyIndices",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "quoteIndices",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "isQuote",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isRetweet",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "quotedTweetIndex",
						"type": "uint256"
					}
				],
				"internalType": "struct Twitter.Tweet[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getFollowerList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getFollowingList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getLikedPosts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tweetIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "author",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "tweetMsg",
						"type": "string"
					},
					{
						"internalType": "address[]",
						"name": "likes",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "replyIndices",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "quoteIndices",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "isQuote",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isRetweet",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "quotedTweetIndex",
						"type": "uint256"
					}
				],
				"internalType": "struct Twitter.Tweet[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTopUsersByFollowers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getTweets",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tweetIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "author",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "tweetMsg",
						"type": "string"
					},
					{
						"internalType": "address[]",
						"name": "likes",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "replyIndices",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "quoteIndices",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "isQuote",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isRetweet",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "quotedTweetIndex",
						"type": "uint256"
					}
				],
				"internalType": "struct Twitter.Tweet[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "profiles",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bio",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "postCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "likedPostCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "replyCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bookmarkCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]