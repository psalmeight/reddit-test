import { useState, useEffect } from "react";
import { Fragment } from "react";
import Snoowrap from "snoowrap";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

interface CommentProps {
  comment?: Snoowrap.Comment;
}

const Comment: React.FC<CommentProps> = (comment: CommentProps) => {
  const [author, setAuthor] = useState<Snoowrap.RedditUser>();

  useEffect(() => {
    comment.comment?.author?.fetch().then((result) => {
      setAuthor(result);
    });
  }, [comment]);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={author?.icon_img} />
      </ListItemAvatar>
      <ListItemText
        primary={author?.name}
        secondary={<Fragment>{comment.comment?.body}</Fragment>}
      />
    </ListItem>
  );
};

export default Comment;
