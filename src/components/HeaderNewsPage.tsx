import { Button, PageHeader } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentNews } from "../redux/newsSlice";
import { RedoOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getNewsComments, getNewsFull } from "../api";

type HeaderNewsPagePropsType = {
  newsId: string;
};

const HeaderNewsPage = ({ newsId }: HeaderNewsPagePropsType) => {
  const dispatch = useDispatch();

  let history = useHistory();
  let goToAllNews = () => {
    history.push(`/`);
    dispatch(setCurrentNews(null));
  };

  const [loading, setLoading] = useState(false);

  const refreshComments = (newsId: string) => {
    setLoading(true);
    getNewsFull(parseInt(newsId)).then((newsFull) => {
      if (newsFull.kids) {
        getNewsComments(newsFull.kids).then((comments) => {
          newsFull.children = comments;
          dispatch(setCurrentNews(newsFull));
        });
      } else {
        dispatch(setCurrentNews(newsFull));
      }
      setLoading(false);
    });
  };

  return (
    <PageHeader
      onBack={goToAllNews}
      title="Hacker News"
      className="page-header"
      extra={[
        <Button
          key="1"
          type="primary"
          icon={<RedoOutlined />}
          loading={loading}
          onClick={() => refreshComments(newsId)}
        >
          Refresh Comments
        </Button>,
      ]}
    />
  );
};

export default HeaderNewsPage;
