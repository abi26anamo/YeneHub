import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state/state.jsx";
import {
  ChatBubbleOutlineOutlined,
  DeleteOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "commonWidgets/FlexBetween";
import Friend from "commonWidgets/Friend";
import WidgetWrapper from "commonWidgets/Widget_wrapper";
import CommentForm from "./commentForm";
import UserCommentImage from "./userCommentImage";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
  userId,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user?._id);
  const isLiked = loggedInUserId && likes && Boolean(likes[loggedInUserId]);
  const likeCount = likes ? Object.keys(likes).length : 0;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const URL = useSelector((state)=>state.URL);

  const patchLike = async () => {
    try {
      const response = await fetch(`${URL}/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      if (!response.ok) {
        throw new Error("Failed to like the post");
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.log("Error liking the post:", error.message);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`${URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Post deleted successfully');
        // Perform any additional actions after successful deletion, such as updating the UI or refreshing the post list
      } else {
        console.log('Failed to delete the post');
      }
    } catch (error) {
      console.log('Error deleting the post', error.message);
    }
  };
  

  const isUserPost = loggedInUserId === postUserId;
  
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        userId={userId}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${URL}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments?.length || 0}</Typography>
          </FlexBetween>

          {isUserPost && (
            <FlexBetween gap="0.3rem">
              <IconButton onClick={deletePost}>
                <DeleteOutlined />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>


      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <FlexBetween sx={{ p: "0" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: "0rem 0rem 0rem 0rem",
                  }}
                >
                  <UserCommentImage
                    image={comment.picturePath}
                    alt={comment.firstName}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: "0rem 0rem 0rem 0.5rem",
                    }}
                  >
                    <Typography sx={{ p: "0.5rem 0 0 0" }}>
                      {comment.firstName}
                    </Typography>
                    <Typography
                      color={main}
                      sx={{ p: "0.5rem 0rem 0rem 0rem" }}
                    >
                      {comment.text}
                    </Typography>
                  </Box>
                </Box>
               
              </FlexBetween>
            </Box>
          ))}
          <CommentForm postId={postId} />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
