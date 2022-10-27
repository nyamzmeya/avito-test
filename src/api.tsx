import { NewsType } from "./redux/types";

export const getNews = async (): Promise<Array<NewsType>> => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy="$priority"&limitToFirst=100`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  try {
    const newsIds: Array<number> = await response.json();
    const newsFullPromises = newsIds.map((id) => getNewsFull(id));
    const newsFull = await Promise.all(newsFullPromises);
    return newsFull;
  } catch (error) {
    throw new Error(response.statusText);
  }
};

export const updateNews = async (
  currentNews: Array<NewsType>
): Promise<Array<NewsType>> => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy="$priority"&limitToFirst=100`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  try {
    const idsMap = new Map(currentNews.map((news) => [news.id, news]));
    const newsIds: Array<number> = await response.json();
    const newsFullPromises = newsIds.map((id) => {
      if (idsMap.has(id)) {
        return Promise.resolve(idsMap.get(id));
      }
      return getNewsFull(id);
    });
    const newsFull = await Promise.all(newsFullPromises);
    // @ts-ignore
    return newsFull;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getNewsFull = async (id: number): Promise<NewsType> => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(response.statusText);
  }
};

export const getNewsComments = async (
  commentsIds: Array<number>
): Promise<Array<NewsType>> => {
  try {
    const commentsPromises = commentsIds.map((id) => getNewsFull(id));
    const comments = await Promise.all(commentsPromises);
    return comments;
  } catch (error) {
    throw new Error();
  }
};
