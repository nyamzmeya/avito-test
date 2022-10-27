import NewsList from "./components/NewsList";
import { Layout} from "antd";
import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import NewsPage from "./components/NewsPage";


const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{minHeight:"100vh"}}>
        <Layout>
          <Content>
            <Route exact path="/">
              <NewsList />
            </Route>
            <Route path="/:newsId">
              <NewsPage />
            </Route>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
