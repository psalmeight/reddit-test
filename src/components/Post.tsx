import { useState, useEffect } from "react";
import { Fragment } from "react";
import Snoowrap from "snoowrap";
import moment from "moment";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import Card from "@material-ui/core/Card";

interface SubmissionProps {
  content?: Snoowrap.Submission;
  onClick?: () => void;
}

const Post: React.FC<SubmissionProps> = ({ content, onClick }) => {
  const [author, setAuthor] = useState<Snoowrap.RedditUser>();
  const [state, setState] = useState<{ isVideo: boolean; videoContent: any }>({
    isVideo: false,
    videoContent: "",
  });

  useEffect(() => {
    content?.author?.fetch().then((result) => {
      setAuthor(result);
    });

    //This is to check if the content has video/links
    if (content?.media) {
      let vidContent = "";
      if ("reddit_video" in content?.media) {
        vidContent = `<iframe src=${content?.media.reddit_video?.fallback_url} />`;
      } else if ("oembed" in content?.media) {
        vidContent =
          content?.media?.oembed?.html ||
          `<iframe src="https://example.com" />`;
      }

      setState({
        ...state,
        isVideo: content?.media !== null || false,
        videoContent: vidContent,
      });
    }
  }, [content]);

  return (
    <Card className="post-container">
      <ListItem alignItems="flex-start" onClick={onClick}>
        <ListItemAvatar>
          <Avatar alt="Avatar" src={author?.icon_img} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <div>
              <span className="subreddit-name">
                {content?.subreddit_name_prefixed}
              </span>
              <span className="author-name">
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
              {/* If content has a permalink */}
              <p>
                {content?.url ? (
                  <a href={content?.url} target="_blank">
                    {content?.url}
                  </a>
                ) : null}
              </p>

              {/* If content has an image preview */}
              {content?.media === null &&
              content?.preview &&
              content?.preview?.images.length > 0 ? (
                <img
                  src={content?.preview?.images[0]?.resolutions[2]?.url}
                  alt={"Preview"}
                />
              ) : null}

              {/* If content has an embedded media */}
              {state.isVideo && content?.secure_media !== null ? (
                <div
                  className={"videoFrame"}
                  dangerouslySetInnerHTML={{
                    __html: state?.videoContent,
                  }}
                />
              ) : null}

              {/* If content has html content */}
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
