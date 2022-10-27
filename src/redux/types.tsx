export type NewsType = {
  id: number;
  title: string;
  text?: string;
  time: number;
  score: number;
  by: string;
  time_serialised?: string;
  url: string;
  kids?: Array<number>;
  children?: Array<NewsType>;
  dead?: boolean;
};

export type StateType = {
  news: Array<NewsType>;
  currentNews: NewsType | null;
};
