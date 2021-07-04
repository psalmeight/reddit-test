import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Snoowrap from "snoowrap";

import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import CustomContainer from "../components/CustomContainer";
import Comment from "../components/Comment";
import Post from "../components/Post";
import { SnowWrapContext } from "../context/SnowWrapContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

interface Submission {
  content: Snoowrap.Submission | undefined;
  comments: Snoowrap.Listing<Snoowrap.Comment> | undefined;
}

function View() {
  const r = useContext(SnowWrapContext);
  const classes = useStyles();
  const { id } = useParams<any>();

  const [state, setState] = useState<Submission>();

  const { data, isFetching } = useQuery("submission", () =>
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

          {/* recursive implementation for replies */}
          {comment?.replies?.length > 0 ? (
            <List className="replies-margin">
              {comment?.replies?.map(renderComment)}
            </List>
          ) : null}
        </div>
      );
  };

  return (
    <CustomContainer>
      {isFetching ? (
        <Backdrop open={isFetching} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
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
