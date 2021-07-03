import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Snoowrap from "snoowrap";

import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";

import CustomContainer from "../components/CustomContainer";
import Comment from "../components/Comment";
import Post from "../components/Post";
import { SnowWrapContext } from "../context/SnowWrapContext";

interface Submission {
  content: Snoowrap.Submission | undefined;
  comments: Snoowrap.Listing<Snoowrap.Comment> | undefined;
}

function View() {
  const r = useContext(SnowWrapContext);
  const { id } = useParams<any>();

  const [state, setState] = useState<Submission>();

  const { isLoading, data } = useQuery("submission", () =>
    r.getSubmission(id).fetch()
  );

  //confidence, top, new, controversial, old, random, qa, live
  useEffect(() => {
    setState({
      content: data,
      comments: data?.comments,
    });
  }, [data]);

  // useEffect(() => {
  //   console.log(data2);
  // }, [data2]);

  const renderComment = (comment: Snoowrap.Comment, idx: any) => {
    //some comments maybe deleted upon viewing
    if (comment.body !== "[deleted]")
      return (
        <div>
          <Comment key={idx} comment={comment} />
          {comment?.replies?.length > 0 ? (
            <List style={{ marginLeft: 20 }}>
              {comment?.replies?.map(renderComment)}
            </List>
          ) : null}
        </div>
      );
  };

  const content = state?.content;

  return (
    <CustomContainer>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <Post content={state?.content} />

          {/* Showing comments if there's any */}
          <h4>Comments</h4>
          <List>
            {state?.comments && state?.comments?.length > Number(0) ? (
              state?.comments?.map(renderComment)
            ) : (
              <span>No comments yet</span>
            )}
          </List>
        </div>
      )}
    </CustomContainer>
  );
}

export default View;
