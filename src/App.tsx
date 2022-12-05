import NewsList from "./components/NewsList";
import { Layout } from "antd";
import { Route, Routes, HashRouter } from "react-router-dom";
import NewsPage from "./components/NewsPage";

const { Content } = Layout;

function App() {
  return (
    <HashRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <Content>
            <Routes>
              <Route path="/" element={<NewsList />} />
              <Route path="/:newsId" element={<NewsPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </HashRouter>
  );
}

export default App;
