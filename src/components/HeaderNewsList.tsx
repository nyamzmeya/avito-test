import { Button, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectNews, setNews } from "../redux/newsSlice";
import { RedoOutlined } from "@ant-design/icons";
import { useState } from "react";
import { updateNews } from "../api";

const HeaderNewsList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  let news = useSelector(selectNews);

  const refreshNews = () => {

    if (news && news.length !== 0) {
      setLoading(true);
      updateNews(news).then((news) => {
        dispatch(setNews(news));
        setLoading(false);
      });
    }
  };

  return (
    <PageHeader
      title="Hacker News"
      className="list-header"
      extra={[
        <Button
          key="1"
          type="primary"
          icon={<RedoOutlined />}
          loading={loading}
          onClick={refreshNews}
        >
          Refresh news
        </Button>,
      ]}
    />
  );
};

export default HeaderNewsList;
