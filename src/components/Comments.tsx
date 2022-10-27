import { Card, Divider, Space, Tree } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNewsComments } from "../api";
import { selectComments } from "../redux/newsSlice";
import { NewsType } from "../redux/types";
import { SmileTwoTone } from "@ant-design/icons";

const { TreeNode } = Tree;

const Comments = () => {
  const data = useSelector(selectComments);
  const [comments, setUpdateTreeData] = useState(data);
  useEffect(() => {
    console.log(data);
    setUpdateTreeData(data);
  }, [JSON.stringify(data)]);

  const updateTreeData = (
    comments: Array<NewsType>,
    key: number | string
  ): Promise<Array<NewsType>> => {
    return Promise.all(
      comments.map(async (comment) => {
        if (comment.id === parseInt(key + "") && comment.kids) {
          let new_comments = await getNewsComments(comment.kids);

          return { ...comment, children: new_comments };
        } else {
          if (comment.children) {
            return {
              ...comment,
              children: await updateTreeData(comment.children, key),
            };
          }
        }
        return comment;
      })
    );
  };

  const onLoadData = ({ key, children }: any) => {
    return new Promise<void>((resolve) => {
      if (children) {
        resolve();
        return;
      }
      if (comments && comments?.length !== 0) {
        updateTreeData(comments, key).then((updatedTreeData) => {
          setUpdateTreeData(updatedTreeData);
          resolve();
        });
      }
    });
  };

  const titleRender = (item: NewsType) => {
    return (
      <div>
        <Space>
          <SmileTwoTone />
          {item.by}
        </Space>
        <Divider />
        <div dangerouslySetInnerHTML={{ __html: item.text || item.title }} />
      </div>
    );
  };

  const renderTreeNodes = (data: Array<NewsType>) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            title={() => titleRender(item)}
            key={item.id}
            isLeaf={item.kids ? false : true}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={() => titleRender(item)}
          key={item.id}
          isLeaf={item.kids ? false : true}
        />
      );
    });
  };

  if (comments) {
    return (
      <Card title="Comments">
        <Tree loadedKeys={[]} loadData={onLoadData}>
          {renderTreeNodes(comments)}
        </Tree>
      </Card>
    );
  } else {
    return <></>;
  }
};

export default Comments;
