import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state/state.jsx";
import { useNavigate } from "react-router-dom";
import FlexBetween from "commonWidgets/FlexBetween";
import { setUsers } from "state/state.jsx";
import UserImage from "commonWidgets/UserImage";
import NotificationButton from "commonWidgets/widgets/Notification_Button";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const URL =  useSelector((state)=>state.URL);
 

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [searchDisabled, setSearchDisabled] = useState(true);

  if (!user) {
    return null;
  }


  const fullName = `${user.firstName} ${user.lastName}`;

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    const [newFirstName, newLastName] = value.split(" ");
    setFirstName(newFirstName);
    setLastName(newLastName);
    setSearchDisabled(value.trim() === "");
    if (value === "") {
      dispatch(setUsers({ users: [] }));
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let searchUrl = `${URL}/users/search?firstName=${firstName}&lastName=${lastName}`;
    let response = await fetch(searchUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }); 
    let data = await response.json();
    if (!Array.isArray(data)){
      data =[];
    }
    dispatch(setUsers({users:data}))
  

    // If the data is empty and the last name is provided, perform another request with only the last name
    if (data.length === 0 && lastName !== "") {
      searchUrl = `${URL}/users/search?firstName=${lastName}&lastName=`;
      response = await fetch(searchUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      data = await response.json();
      if (!Array.isArray(data)) {
        data = [];
      }
    }
    dispatch(setUsers({users:data}));
  };
  if (users.length === 0){console.log('yup')}

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          YeneHub
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <form onSubmit={handleSearch}>
              <InputBase
                placeholder="search"
                onChange={handleSearchInputChange}
                name="search"
              />
              <IconButton type="submit" onClick={handleSearch} disabled={searchDisabled}>
                <Search />
              </IconButton>
            </form>
          </FlexBetween>
        )}
        
         {Array.isArray(users) && users.map((user) => (
  <FlexBetween
    backgroundColor={neutralLight}
    borderRadius="9px"
    width="250px"
    height="40px"
    padding="0.1rem 1.5rem"
    key={user.id}
    sx={{
      "&:hover": {
        color: dark,
        cursor: "pointer",
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
      onClick={(e) => navigate(`/profile/${user._id}`)}
    >
      <UserImage image={user.picturePath} />
      <Typography variant="h6">
        {user.firstName} {user.lastName}
      </Typography>
      <Typography color={dark}>{user.location}</Typography>
    </Box>
  </FlexBetween>
))}

      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <NotificationButton sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/* USER INFO */}
          <Box display="flex" justifyContent="center" p="2rem">
            <Box display="flex" flexDirection="column" alignItems="center">
              <UserImage image={user.picturePath} size="5rem" />
              <Typography variant="h6">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography color={dark}>{user.location}</Typography>
            </Box>
          </Box>

          {/* NAV LINKS */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ fontSize: "25px" }} />
            </IconButton>
            <NotificationButton sx={{ fontSize: "25px" }} />
            <IconButton>
              <Help sx={{ fontSize: "25px" }} />
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
