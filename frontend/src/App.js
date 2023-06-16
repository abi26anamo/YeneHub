import { BrowserRouter,Navigate,Routes,Route } from "react-router-dom";
import HomePage from "components/homePage/home";
import LoginPage from "components/loginPage/login_Page";
import ProfilePage from "components/profilePage/profile";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "colors.js";
import { ThemeProvider } from "@emotion/react";

const App = ()=>{
    const mode = useSelector((state)=>state.mode);
    const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
    const isAuth = useSelector((state) => state.token);

    return <div className="app">
        <BrowserRouter basename="/">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Routes>
                    <Route path="/" element = {<LoginPage/>}></Route>
                    <Route path="/home" element = {isAuth ? <HomePage/>:<LoginPage/>}></Route>
                    <Route path="/profile/:userId" element = {isAuth ? <ProfilePage/>:<Navigate to="/"/>}></Route>
                </Routes>
            </ThemeProvider>
         
        </BrowserRouter>
    </div>
}
export default App;
