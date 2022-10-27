import App from "../App";
import { renderWithProviders } from "../util";
import "../setupTests";

describe("App", function () {
  it("not empty", () => {
    const { container } = renderWithProviders(<App />);
    expect(container).not.toBeEmptyDOMElement();
  });
});
