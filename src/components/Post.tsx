import { useState, useEffect } from "react";
import { Fragment } from "react";
import Snoowrap from "snoowrap";
import moment from "moment";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface SubmissionProps {
  content?: Snoowrap.Submission;
  onClick?: () => void;
}

const Post: React.FC<SubmissionProps> = ({ content, onClick }) => {
  const [author, setAuthor] = useState<Snoowrap.RedditUser>();

  useEffect(() => {
    content?.author?.fetch().then((result) => {
      setAuthor(result);
    });
  }, [content]);

  return (
    <Card style={{ marginBottom: 10 }}>
      <ListItem alignItems="flex-start" onClick={onClick}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={author?.icon_img} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <div>
              <span style={{ fontSize: 15, fontWeight: "bold" }}>
                {content?.subreddit_name_prefixed}
              </span>
              <span style={{ fontSize: 15 }}>
                {" "}
                | {author?.name}{" "}
                {content?.created
                  ? "posted " + moment.unix(content?.created_utc).fromNow()
                  : null}
              </span>
              <div>
                <b>{content?.title}</b>
              </div>
            </div>
          }
          secondary={
            <Fragment>
              {content?.url ? <a href={content?.url}>{content?.url}</a> : null}
              {content?.preview && content?.preview?.images.length > 0 ? (
                <img src={content?.preview?.images[0]?.resolutions[2]?.url} />
              ) : null}

              {content?.selftext_html ? (
                <div
                  dangerouslySetInnerHTML={{ __html: content?.selftext_html }}
                />
              ) : null}
            </Fragment>
          }
        />
      </ListItem>
    </Card>
  );
};

export default Post;
