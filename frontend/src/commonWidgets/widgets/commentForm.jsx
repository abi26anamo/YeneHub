import { IconButton, InputBase, Box, Typography, Divider } from "@mui/material";
import { Send } from "@mui/icons-material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import { setPost } from "state/state";

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [charCount, setCharCount] = useState(0);
  const loggedInUserId = useSelector((state) => state.user._id);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const picturePath = useSelector((state) => state.user.picturePath);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const URL = useSelector((state) => state.URL);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (comment.length > 90) {
      alert("You cannot post more than 90 characters");
      return;
    }

    const response = await fetch(`${URL}/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        text: comment,
        firstName,
        lastName,
        picturePath,
      }),
    });

    const updatedPost = await response.json();
    dispatch(setPost(updatedPost));
    setComment("");
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    setCharCount(event.target.value.length);
  };

  const handleCommentKeyDown = (event) => {
    if (event.keyCode === 8 && comment.length > 0) {
      setCharCount((prevCharCount) => prevCharCount - 1);
    }
  };

  return (
    <>
      <Divider sx={{ p: "0.2rem" }} />
      <form onSubmit={handleCommentSubmit}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid main",
            borderRadius: "4px",
            padding: "8px",
          }}
        >
          <InputBase
            placeholder="write your comment here ..."
            value={comment}
            onChange={handleCommentChange}
            onKeyDown={handleCommentKeyDown}
            sx={{
              flexGrow: 1,
              marginRight: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          />
          <IconButton type="submit" sx={{ color: "main" }}>
            <Send color={main} />
          </IconButton>
          <Box sx={{ marginLeft: "16px", color: "main" }}>
            <Typography variant="caption">{charCount}/90</Typography>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default CommentForm;
