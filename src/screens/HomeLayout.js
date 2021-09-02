
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    makeStyles,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book"
import QuizScreen from "./QuizScreen";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import {useState} from "react";
import clsx from "clsx";
import UniversityTipScreen from "./UniversityTipScreen";
import ProfileScreen from "../subScreens/ProfileScreen";
import RespositoryScreen from "./RepositoryScreen";
import CollegePredictorScreen from "../subScreens/CollegePredictorScreen";
import NewResourceScreen from "../subScreens/NewResource";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {BrowserRouter as Router,
    Switch,
    Route,
    Link} from 'react-router-dom';
import { NewReleasesSharp } from "@material-ui/icons";
import {useHistory} from "react-router";

const sidebarWidth=240;

const styles=makeStyles((theme)=>({
    sidebar:{
        width: sidebarWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    sidebarOpen:{
        width:sidebarWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    sidebarClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    }
}));


export default function HomeLayout(){

    const history=useHistory();
    const useStyles=styles();
    const [sidebarOpen, setSidebarOpen]  = useState(false);


    const getPlaceholderBoxWidth=()=>{
        if(sidebarOpen){
            return sidebarWidth;
        }
        return sidebarWidth/4.5;
    }

    return (
        
        <div>
            <AppBar id={'homeLayoutAppBar'} position={'static'}>
                <Toolbar>
                    <Box width={getPlaceholderBoxWidth()}/>
                    <Box display="flex" flexGrow={1}>
                        <IconButton edge="start" color="inherit" onClick={()=>setSidebarOpen(!sidebarOpen)}>
                            <MenuIcon/>
                            <Box width={8}/>
                            <Typography variant={"h5"} id={"homeLayoutAppBarText"}>Menu</Typography>
                        </IconButton>
                    </Box>
                    <IconButton onClick={()=>{history.replace('/login')}}>
                        <ExitToAppIcon id={'appBarIcon'}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Router>
            <Drawer variant='permanent'
                    className={clsx(useStyles.sidebar,{
                        [useStyles.sidebarOpen]: sidebarOpen,
                        [useStyles.sidebarClose]:!sidebarOpen
                    })}
                    classes={{
                        paper:clsx({
                            [useStyles.sidebarOpen]: sidebarOpen,
                            [useStyles.sidebarClose]:!sidebarOpen
                        })
                    }}
            >   
                <List>
                    <ListItem button key="Home" id="dashboardHomeBtn" onClick={()=>{}}>
                        <ListItemIcon><Link to='/home/'>{<HomeIcon/>}</Link></ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItem>
                    <ListItem button key="Profile" id="dashboardProfileBtn" onClick={()=>{}}>
                        <ListItemIcon><Link to='/home/profile'>{<AccountCircleIcon/>}</Link></ListItemIcon>
                        <ListItemText primary="Profile"/>
                    </ListItem>
                    <ListItem button key="Repository" id="dashboardRepositoryBtn" onClick={()=>{}}>
                        <ListItemIcon><Link to='/home/repository'>{<BookIcon/>}</Link></ListItemIcon>
                        <ListItemText primary="Repository"/>
                    </ListItem>

                    <ListItem button onClick={()=>setSidebarOpen(false)}>
                        <ListItemIcon>{<CloseIcon/>}</ListItemIcon>
                        <ListItemText primary={"Close"} />
                    </ListItem>
                </List>
            </Drawer>
            <div className="dashboardContentSpace">
                {/*{TODO: This is where main content goes}*/}
                <UniversityTipScreen/>
                {/* <ProfileScreen/>*/}
                {/*<RespositoryScreen/>*/}
                {/*<NewResourceScreen/>*/}
                {/* <CollegePredictorScreen/>*/}
                {/* <ProfileScreen/>*/}
                {/*<QuizScreen/>*/}
            </div>
            </Router>
        </div>
    );
}