export enum TweetType {
  TWEET = 0,
  REPLY = 1,
  REPOST = 2,
  QUOTE = 3,
}

export type TweetData = {
  authorAddress: string;
  authorName: string;
  likedBy: number[];
  quotedTweetIndex: number;
  quotes: number[];
  replies: number[];
  retweets: number[];
  timestamp: number;
  tweetIndex: number;
  tweetMsg: string;
  tweetType: TweetType;
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
