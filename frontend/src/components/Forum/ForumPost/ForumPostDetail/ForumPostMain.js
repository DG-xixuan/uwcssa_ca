import { Box, Breadcrumbs, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";

import ForumPostCommentPost from "./ForumPostCommentPost";
import ForumPostContentComponent from "./ForumPostContentComponent";
import ForumPostUserComponent from "./ForumPostUserComponent";
// import CustomAvatar from "../../../CustomMUI/CustomAvatar";
import LikeButtonGroup from "../../../LikeButtonGroup";
import { Link } from "react-router-dom";
// import S3Image from "../../../S3/S3Image";
import { useTitle } from "../../../../Hooks/useTitle";

export default function ForumPostMain({ forumPost }) {
  useTitle(forumPost.title);
  const [isReplying, setIsReplying] = useState(false);
  const replySwitch = () => setIsReplying((isReplying) => !isReplying);
  const { id, content, imgS3Keys, createdAt, userID, tags, user } = forumPost;
  console.log("forumPost", forumPost);
  return (
    <div>
      <Box>
        <Box sx={{ padding: "2rem", maxWidth: "100%" }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {forumPost.title}
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <span style={{}}>
              <Button color="inherit" component={Link} to={`/`}>
                UWCSSA
              </Button>
            </span>
            <span style={{}}>
              <Button color="inherit" component={Link} to={`/forum`}>
                论坛
              </Button>
            </span>
            <span style={{ cursor: "not-allowed" }}>
              <Button
                color="inherit"
                component={Link}
                to={`/forum/forumTopic/${forumPost.forumSubTopic.forumTopic.id}`}
              >
                {forumPost.forumSubTopic.forumTopic.name}
              </Button>
            </span>
            <span style={{ cursor: "not-allowed" }}>
              <Button
                color="inherit"
                component={Link}
                to={`/forum/forumSubTopic/${forumPost.forumSubTopic.id}`}
              >
                {forumPost.forumSubTopic.name}
              </Button>
            </span>
          </Breadcrumbs>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            // height: 220,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            bgcolor: "background.paper",
            color: "text.secondary",
          }}
        >
          <ForumPostUserComponent user={user} userID={userID} id={id} />
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              width: { xs: 300, sm: 600 },
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
            }}
          >
            <ForumPostContentComponent
              tags={tags}
              content={content}
              imgS3Keys={imgS3Keys}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
              }}
            >
              <LikeButtonGroup item={forumPost} />
              {!isReplying ? (
                <Box>
                  <Typography
                    variant="caption"
                    component="span"
                    style={{ color: "grey" }}
                  >
                    {createdAt.slice(0, 10)} {createdAt.slice(11, 16)}
                  </Typography>
                  <Button size="small" color="primary" onClick={replySwitch}>
                    回复 （共{forumPost.forumPostComments.items.length}回复贴）
                  </Button>
                </Box>
              ) : (
                <Button size="small" color="primary" onClick={replySwitch}>
                  收起回复 （编辑中）
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <ForumPostCommentPost forumPost={forumPost} isReplying={isReplying} />
      </Box>
    </div>
  );
}
