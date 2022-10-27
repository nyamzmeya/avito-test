import { renderWithProviders } from "../util";
import "../setupTests";
import NewsList from "../components/NewsList";
import { NewsType } from "../redux/types";
import { act} from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const initialNews: Array<NewsType> = [
  {
    by: "dhouston",
    id: 8863,
    score: 111,
    time: 1175714200,
    title: "My YC app: Dropbox - Throw away your USB drive",
    url: "http://www.getdropbox.com/u/2/screencast.html",
  },
  {
    by: "theoneill",
    id: 87457,
    score: 16,
    time: 1197201093,
    title: "Water becomes the new oil as world runs dry",
    url: "http://www.guardian.co.uk/business/2007/dec/09/water.climatechange",
  },
];

describe("News list", function () {
  it("renders news", () => {
    const { getByText } = renderWithProviders(<NewsList />, {
      preloadedState: {
        newsStore: {
          news: initialNews,
          currentNews: null,
        },
      },
    });
    expect(getByText(initialNews[0].title)).toBeInTheDocument();
    expect(getByText(initialNews[1].title)).toBeInTheDocument();
  });

  it("click on item redirect to news page and sets current news in store", async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve(initialNews[0]),
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetch);

    const { container, store } = renderWithProviders(<App />, {
      preloadedState: {
        newsStore: {
          news: initialNews,
          currentNews: null,
        },
      },
    });

    const item = container.getElementsByClassName("news-item")[0];
    await act(async () => await userEvent.click(item));
    expect(store.getState().newsStore.currentNews).toEqual(initialNews[0]);
    expect(container.querySelector("a")).toHaveAttribute(
      "href",
      initialNews[0].url
    );
  });
});
