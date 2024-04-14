export enum TweetType {
  TWEET = 0,
  REPLY = 1,
  REPOST = 2,
  QUOTE = 3,
}

export type TweetData = {
  authorAddress: string;
  authorName: string;
  likedBy: `0x${string}`[];
  bookmarks: `0x${string}`[];
  quotedTweetIndex: number;
  quotes: number[];
  replies: number[];
  retweets: number[];
  timestamp: number;
  tweetIndex: number;
  tweetMsg: string;
  tweetType: TweetType;
  repliedTweetIndex: number;
};

export const TweetDataDefaultValue: TweetData = {
  authorAddress: "",
  authorName: "",
  likedBy: [],
  bookmarks: [],
  quotedTweetIndex: 0,
  quotes: [],
  replies: [],
  retweets: [],
  timestamp: 0,
  tweetIndex: 0,
  tweetMsg: "",
  tweetType: TweetType.TWEET,
  repliedTweetIndex: 0,
};

export type QuotedTweetData = {
  authorAddress: string;
  authorName: string;
  tweetIndex: number;
  tweetMsg: string;
  timestamp: number;
};

export const QuotedTweetDataDefaultValue: QuotedTweetData = {
  authorAddress: "",
  authorName: "",
  tweetIndex: 0,
  tweetMsg: "",
  timestamp: 0,
};

export type UserEngagementType = {
  isLiked?: boolean;
  isReplied?: boolean;
  isBookMarked?: boolean;
  isRetweeted?: boolean;
};

export const UserEngagementDefaultValue: UserEngagementType = {
  isLiked: false,
  isReplied: false,
  isBookMarked: false,
  isRetweeted: false,
};

export type UserDetailsType = {
  userAddress: `0x${string}`;
  userName: string;
  userBio: string;
  bookmarks: number[];
  posts: number[];
  likes: number[];
  replies: number[];
  followers: `0x${string}`[];
  following: `0x${string}`[];
};

export const UserDetailsDefaultValues: UserDetailsType = {
  userAddress: `0x`,
  userName: "",
  userBio: "",
  bookmarks: [],
  posts: [],
  likes: [],
  replies: [],
  followers: [],
  following: [],
};

export type RetweetType = {
  originalTweet: number; // index of th original tweet. quoted tweet index me hi hai variable.
  retweetedBy: string;
};

export type QuoteType = {
  originalTweet: number;
  quotedTweet: number; // it is the current tweet
};

export type ReplyType = {
  originalTweet: number;
  replyTweet: number; // it is the current tweet
};
