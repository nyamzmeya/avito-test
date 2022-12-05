import { Card, Space } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNewsComments, getNewsFull } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNews, selectCurrentNews } from "../redux/newsSlice";
import { MessageFilled, ClockCircleFilled } from "@ant-design/icons";
import Comments from "./Comments";
import HeaderNewsPage from "./HeaderNewsPage";

const NewsPage: React.FC = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const dispatch = useDispatch();
  const currentNews = useSelector(selectCurrentNews);
  const refreshNewsPage = () => {
    getNewsFull(parseInt(newsId!)).then((newsFull) => {
      if (newsFull.kids) {
        getNewsComments(newsFull.kids).then((comments) => {
          newsFull.children = comments;
          dispatch(setCurrentNews(newsFull));
        });
      } else {
        dispatch(setCurrentNews(newsFull));
      }
    });
  };
  useEffect(() => {
    refreshNewsPage();
  }, [newsId]);

  return (
    <>
      <HeaderNewsPage newsId={newsId!}/>
      <Card
        title={currentNews?.title}
        extra={
          <a target="_blank" rel="noopener noreferrer" href={currentNews?.url}>
            Link
          </a>
        }
        loading={currentNews ? false : true}
        actions={[
          <Space>
            <MessageFilled style={{ fontSize: "26px", color: "#08c" }} />
            {currentNews?.kids?.length || 0}
          </Space>,
          <Space>
            <ClockCircleFilled style={{ fontSize: "26px", color: "#08c" }} />
            {currentNews?.time_serialised}
          </Space>,
        ]}
      >
        <p>{currentNews?.by}</p>
      </Card>
      <Comments />
    </>
  );
};

export default NewsPage;
