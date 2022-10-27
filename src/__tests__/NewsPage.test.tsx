import { renderWithProviders } from "../util";
import "../setupTests";
import { NewsType } from "../redux/types";
import NewsPage from "../components/NewsPage";
import { MemoryRouter } from "react-router-dom";

const currentNews: NewsType = {
  by: "dhouston",
  id: 8863,
  score: 111,
  time: 1175714200,
  title: "My YC app: Dropbox - Throw away your USB drive",
  url: "http://www.getdropbox.com/u/2/screencast.html",
};

describe("News page", function () {
  it("renders news", () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={["/123"]}>
        <NewsPage />
      </MemoryRouter>,
      {
        preloadedState: {
          newsStore: {
            news: [],
            currentNews: currentNews,
          },
        },
      }
    );
    expect(getByText(currentNews.title)).toBeInTheDocument();
  });
});
