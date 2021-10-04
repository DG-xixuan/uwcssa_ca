import "./Main.css";

import { AmplifyS3Image } from "@aws-amplify/ui-react";
import { Avatar } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    marginBlock: "2rem",
  },
  content: {
    marginBlock: "2rem",
  },
});

function Main({ article }) {
  const classes = useStyles();
  const {
    title,
    content,
    imagePath,
    owner,
    topic,
    type,
    // updatedAt,
    createdAt,
    like,
    unlike,
  } = article;
  return (
    <div>
      {Object.keys(article).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <Box className={classes.main}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                component={Link}
                to={`/account/profile/${owner}`}
              ></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={owner}
            subheader={`发布日期： ${createdAt.slice(0, 10)} ${createdAt.slice(
              11,
              19
            )}`}
          />
          <CardActions>
            <Button size="small" color="primary">
              Type: {type.name}
            </Button>
            <Button size="small" color="primary">
              Topic: {topic.name}
            </Button>
          </CardActions>
          <Typography variant="h3" align="center" className={classes.title}>
            {title}
          </Typography>

          {/* <CardMedia className={classes.media} image={image} /> */}
          <AmplifyS3Image path={imagePath} />
          <Typography
            variant="body1"
            className={classes.content}
            component="pre"
          >
            {content}
          </Typography>
          <Button size="small" color="primary" startIcon={<ThumbUpIcon />}>
            {like.length}
          </Button>
          <Button size="small" color="primary" startIcon={<ThumbDownIcon />}>
            {unlike.length}
          </Button>
          <Button size="small" color="primary">
            回复
          </Button>
        </Box>
      )}
    </div>
  );
}

export default Main;
