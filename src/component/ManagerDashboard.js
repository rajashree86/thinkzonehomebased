import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import VolunterTable from "./VolunterTable";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import config from "../config";
import weekData from "./week.json";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  "@media only screen and (max-width: 480px)": {
    paper: {
      width: "144px",
    },
    selectWidth: {
      marginTop: "100px",
      marginLeft: "-146px",
      marginRight: "-28px",
      height: "78px",
    },
    selectDivStyle: {
      marginLeft: "15px",
      width: "92%",
    },
    selectLabel: {
      marginLeft: "11px",
      marginTop: "-1px",
    },
    // paperWidth: {
    //   width: '300px',
    // }
  },
  "@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and  (-webkit-min-device-pixel-ratio: 1)": {
    selectWidth: {
      marginTop: "",
      marginLeft: "",
      marginRight: "",
      height: "",
    },
    selectDivStyle: {
      marginLeft: "12px",
      width: "556px",
    },
  },
  root: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  // fixedHeight: {
  //    height: 240,
  // },
  gridStyle: {},
}));

export default function ManagerDashboard(props) {
  const [managerName, setManagerName] = useState();
  // const[managerphone,setManagerPhone] = useState();
  const [volunterData, setVolunteerData] = useState();
  const [volunteer, setVolunteer] = useState();
  const [week, setWeek] = React.useState(weekData[0].week_id);
  const [loaderopen, setLoaderOpen] = React.useState(false);
  const [managerId, setManagerId] = useState();
  const handleLoaderClose = () => {
    setLoaderOpen(false);
  };
  const handleWeekChange = (event) => {
    setWeek(event.target.value);
    loadVolunteerData(managerId, volunteer, event.target.value);
    // geActivityData(selectedStudent.managerid, selectedStudent.volunteerid,selectedStudent.schoolid, selectedStudent.studentid,event.target.value);
  };
  useEffect(() => {
    setLoaderOpen(true);
    fetch(
      config.apiEndpoint +
        "/authenticateuser/" +
        localStorage.getItem("username") +
        "/" +
        localStorage.getItem("usercode"),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (
          responseJson.hasOwnProperty("managerdata") &&
          responseJson.hasOwnProperty("volunteerdata")
        ) {
          setManagerName(responseJson.managerdata[0].managername);
          setManagerId(responseJson.managerdata[0].managerid);
          // setManagerPhone(responseJson.managerdata[0].phone)
          setVolunteerData(responseJson.volunteerdata);
          setVolunteer(responseJson.volunteerdata[0].volunteerid);
          setLoaderOpen(false);
          loadVolunteerData(
            responseJson.managerdata[0].managerid,
            responseJson.volunteerdata[0].volunteerid,
            weekData[0].week_id
          );
          // loadAllSchool(responseJson)
        } else {
          setLoaderOpen(false);
        }
      })
      .catch((error) => {});
  }, []);
  // const[schoolList,setSchoolList] = useState();
  // const[school,setSchool] = useState();
  // const loadAllSchool = (data) => {
  //   setLoaderOpen(true)
  //   fetch(config.apiEndpoint+'gethblschoolbyvolunteerid/'+data.volunteerdata[0].volunteerid,{
  //     method:'GET',
  //     headers:{
  //       Accept:'application/json',
  //       'content-type':'application/json'
  //     },
  //   }).then((response)=>response.json())
  //   .then((responseJson)=>{
  //     if(responseJson.length>0){
  //       setLoaderOpen(false)
  //       setSchoolList(responseJson)
  //       loadVolunteerData(data.managerdata[0].managerid,data.volunteerdata[0].volunteerid,responseJson[0].schoolid,week)
  //     }
  //   })
  // }
  window.onpopstate = function (event) {
    props.history.go(1);
  };
  const [allStudentList, setAllStudentList] = useState("");
  const loadVolunteerData = (managerid, volunteerid, week) => {
    setLoaderOpen(true);
    fetch(
      config.apiEndpoint +
        "getallhblactivitybyvolunteerid/" +
        managerid +
        "/" +
        volunteerid +
        "/" +
        week,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          setLoaderOpen(false);
          responseJson.studentdetails.forEach(function (value, key) {
            if (value.baselinedetails.length > 0) {
              value.baselinedetails.forEach(function (itemvalue, index) {
                value["odia_level_baseline"] =
                  itemvalue.odia_level_baseline !== ""
                    ? itemvalue.odia_level_baseline
                    : "Not set";
                value["math_level_baseline"] =
                  itemvalue.math_level_baseline !== ""
                    ? itemvalue.math_level_baseline
                    : "Not set";
              });
            } else {
              value["odia_level_baseline"] = "Not set";
              value["math_level_baseline"] = "Not set";
            }
            if (value.activitydetails.length > 0) {
              value.activitydetails.forEach((item, index) => {
                value["activity_details"] =
                  item.activitystatus !== "" ? item.activitystatus : "Not set";
              });
            } else {
              value["activity_details"] = "Not set";
            }
          });
          setAllStudentList(responseJson);
        } else {
          setLoaderOpen(false);
        }
      })
      .catch((error) => {});
  };

  // const handleSchoolChange = (event) => {
  //   setSchool(event.target.value)
  // }
  const handleVolunterChange = (event) => {
    setVolunteer(event.target.value);
    loadVolunteerData(managerId, event.target.value, week);
    setWeek(weekData[0].week_id);
  };
  const classes = useStyles();
  const [open] = React.useState(true);
  const userLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("usercode");
    props.history.push("");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {managerName}
            {/* {managerphone} */}
          </Typography>
          <Button variant="contained" onClick={userLogout} size="small">
            LOGOUT
          </Button>
          <IconButton color="inherit"></IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ width: "100%" }}>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                  <React.Fragment>
                    <Grid
                      item
                      xs={6}
                      className={classes.paperWidth}
                      style={{ maxWidth: "50%" }}
                    >
                      <Paper className={classes.paper}>
                        <InputLabel id="demo-simple-select-filled-label">
                          Select Volunter
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          native
                          value={volunteer}
                          required
                          fullWidth
                          onChange={handleVolunterChange}
                          label="User Type"
                          inputProps={{
                            name: "user",
                            id: "demo-simple-select-filled-label",
                          }}
                        >
                          {volunterData &&
                            volunterData.map((data, index) => (
                              <option key={index} value={data.volunteerid}>
                                {data.volunteername}
                              </option>
                            ))}
                        </Select>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <InputLabel id="demo-simple-select-filled-label">
                          Select Week
                        </InputLabel>
                        <Select
                          native
                          value={week}
                          required
                          fullWidth
                          onChange={handleWeekChange}
                          label="User Type"
                          inputProps={{
                            name: "user",
                            id: "demo-simple-select-label",
                          }}
                        >
                          {weekData &&
                            weekData.map((data, index) => (
                              <option key={index} value={data.week_id}>
                                {data.week_name}
                              </option>
                            ))}
                        </Select>
                      </Paper>
                    </Grid>
                    {/* <Grid item xs={4}>
                        <Paper className={classes.paper}>
                          <InputLabel id="demo-simple-select-filled-label">Select School</InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            native
                            value={school}
                            required
                            fullWidth
                            onChange={handleSchoolChange}
                            label="User Type"
                            inputProps={{
                              name: 'user',
                              id: 'demo-simple-select-filled-label',
                              }}
                            >
                             {schoolList &&  schoolList.map((data, index) => (
                                <option key={index} value={data.schoolid}>{data.schoolname}</option>
                            ))}
                          </Select>
                        </Paper>
                      </Grid> */}
                  </React.Fragment>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {allStudentList &&
                allStudentList.studentdetails &&
                allStudentList.studentdetails.length > 0 ? (
                  <VolunterTable data={allStudentList.studentdetails} />
                ) : (
                  <b style={{ marginLeft: "500px", marginTop: "100px" }}>
                    No Students registered
                  </b>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </main>
      <Backdrop
        className={classes.backdrop}
        open={loaderopen}
        onClick={handleLoaderClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
