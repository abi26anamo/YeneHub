import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar/navbar";
import UserWidget from "commonWidgets/widgets/UserWidget";
import MyPostWidget from "commonWidgets/widgets/MyPostWidget";
import PostsWidget from "commonWidgets/widgets/PostsWidget";
import FriendListWidget from "commonWidgets/widgets/FriendListWidget";
import AdvertWidget from "commonWidgets/widgets/AdvertWidget";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  const _id = user?._id;
  const picturePath = user?.picturePath;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
             <AdvertWidget/>
            <Box m="2rem 0" />
            <FriendListWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
