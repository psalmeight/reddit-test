import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import SnowWrap from "snoowrap";

import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";

import CustomContainer from "../components/CustomContainer";
import Comment from "../components/Comment";
import { SnowWrapContext } from "../context/SnowWrapContext";
import Snoowrap from "snoowrap";

interface Submission {
  content: SnowWrap.Submission | undefined;
  comments: SnowWrap.Listing<SnowWrap.Comment> | undefined;
}

function View() {
  const r = useContext(SnowWrapContext);
  const { id } = useParams<any>();

  const [state, setState] = useState<Submission>();

  const { isLoading, data } = useQuery("submission", () =>
    r.getSubmission(id).fetch()
  );

  useEffect(() => {
    setState({
      content: data,
      comments: data?.comments,
    });
  }, [data]);

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
    <CustomContainer title={content?.title}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {/* Showing links if there's any */}
          {content?.url ? <a href={`${content?.url}`}>{content?.url}</a> : null}

          {/* Showing html content if there's any */}
          {content?.selftext_html ? (
            <div dangerouslySetInnerHTML={{ __html: content?.selftext_html }} />
          ) : null}

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
