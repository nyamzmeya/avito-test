import { List, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../api";
import { selectNews, setNews } from "../redux/newsSlice";
import { StarFilled, ClockCircleFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import HeaderNewsList from "./HeaderNewsList";

const NewsList: React.FC = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const news = useSelector(selectNews);
  let [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (news?.length === 0) {
      setIsLoading(true);
      getNews().then((news) => {
        dispatch(setNews(news));
        setIsLoading(false);
      });
    }
  }, [news]);

  let goToNewsFull = (id: number) => {
    history.push(`/${id}`);
  };

  return (
    <>
      <HeaderNewsList />
      <List
        itemLayout="horizontal"
        bordered
        loading={loading}
        dataSource={news}
        renderItem={(item) => (
          <List.Item
            className="news-item"
            key={item.id}
            style={{ cursor: "pointer" }}
            onClick={() => goToNewsFull(item.id)}
            actions={[
              <Space>
                <StarFilled style={{ fontSize: "26px", color: "#08c" }} />
                {item.score}
              </Space>,
              <Space>
                <ClockCircleFilled
                  style={{ fontSize: "26px", color: "#08c" }}
                />
                {item.time_serialised}
              </Space>,
            ]}
          >
            <List.Item.Meta title={item.title} description={item.by} />
          </List.Item>
        )}
      />
    </>
  );
};

export default NewsList;
