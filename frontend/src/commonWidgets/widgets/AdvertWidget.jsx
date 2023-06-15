import { Typography, useTheme } from "@mui/material";
import FlexBetween from "commonWidgets/FlexBetween";
import WidgetWrapper from "commonWidgets/Widget_wrapper";
import { useSelector } from "react-redux";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const URL = useSelector((state)=>state.URL);

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${URL}/assets/info3.jpeg`} 
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Aster Cosmetics</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Amazing cosmotics that will make you look like a start.
        we have the best products that will make you look like a star.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
