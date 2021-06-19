import React, { useState } from "react";
import clsx from "clsx";
import { saveAs } from "@progress/kendo-file-saver";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import weekData from "./week1.json";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import ReactAudioPlayer from "react-audio-player";
import SaveIcon from "@material-ui/icons/Save";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import fs from "fs";
import fileExists from "file-exists";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  "@media only screen and (max-width: 480px)": {
    styleformobile: {
      maxWidth: "97%",
      flexBasis: "108%",
    },
    
  },
  "@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and  (-webkit-min-device-pixel-ratio: 1)": {
    
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
  gridStyle: {},

  downloadArea: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem",
  },
}));

export default function Activities(props) {
  const [week, setWeek] = React.useState(weekData[0].week_id);
  const [loaderopen, setLoaderOpen] = React.useState(false);
  const handleLoaderClose = () => {
    setLoaderOpen(false);
  };
  const handleWeekChange = (event) => {
    setWeek(event.target.value);
  };


  window.onpopstate = function (event) {
    props.history.go(1);
  };

  
  const classes = useStyles();
  const userLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("usercode");
    props.history.push("");
  };
  const backtodashboard = () => {
    props.history.push("/dashboard");
  };
  const [allsubject, setAllSubject] = useState("");
  const handleSubjectChange = (event) => {
    setAllSubject(event.target.value);
  };
  const [level, setlevel] = useState("");
  const handlelevelchange = (event) => {
    setlevel(event.target.value);
  };
  const [part, setpart] = useState("");
  const handlepartChange = (event) => {
    setpart(event.target.value);
  };

  const [subjectText, setSubjectTextHelper] = React.useState("");
  const [subjecterror, setSubjectError] = React.useState(false);
  const [levelText, setLevelTextHelper] = React.useState("");
  const [levelerror, setLevelError] = React.useState(false);
  const [partText, setPartTextHelper] = React.useState("");
  const [parterror, setPartError] = React.useState(false);
  const [audioLink, setAudioLink] = React.useState("");
  const getAudioFile = () => {
    if (allsubject === "") {
      setSubjectError(true);
      setSubjectTextHelper("Select subject");
    } else {
      setSubjectError(false);
      setSubjectTextHelper("");
    }
    if (level === "") {
      setLevelError(true);
      setLevelTextHelper("select level");
    } else {
      setLevelError(false);
      setLevelTextHelper("");
    }
    if (part === "") {
      setPartError(true);
      setPartTextHelper("select part");
    } else {
      setPartError(false);
      setPartTextHelper("");
    }
    if (allsubject !== "" && level !== "" && week !== "") {
      setAudioLink(
        `../audio/${week}${"_"}${level}${"_"}${allsubject}${"_"}${part}${"."}${"mp3"}`
      );
    } else {
      setAudioLink("");
    }
  };
  //Download Button functionality Added
  function checkFileExists(urltoFile) {
    let xhr = new XMLHttpRequest();
    xhr.open("HEAD", urltoFile, false);
    xhr.send();
    if (xhr.status == "404") {
      return false;
    } else {
      return true;
    }
  }

  const onClick = () => {
    const file = checkFileExists("../activityPdf/activity.pdf");
    if (file == true) {
      //alert("file exists");
      let date = new Date();
      saveAs(
        "../activityPdf/activity.pdf",
        `ThinkZoneActivity-${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`
      );
    } else {
      alert("file does not exists");
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            // edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={backtodashboard}
          >
            <KeyboardBackspaceIcon />{" "}
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          ></Typography>
          <Button
            variant="contained"
            onClick={userLogout}
            className={classes.buttonLogout}
            size="small"
            edge="end"
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.downloadArea}>
            <Button
              variant="contained"
              color="default"
              size="small"
              className={classes.buttonDownload}
              startIcon={<SaveIcon />}
              id="downloadbtn"
              onClick={(e) => onClick(e)}
            >
              Download Activity
            </Button>
          </div>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ width: "100%" }}>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                  <React.Fragment>
                    <Grid item xs={2} className={classes.styleformobile}>
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
                    <Grid item xs={3} className={classes.styleformobile}>
                      <Paper className={classes.paper}>
                        <FormControl
                          className={classes.formControl}
                          error={levelerror}
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            Select Level
                          </InputLabel>
                          <Select
                            native
                            value={level}
                            required
                            fullWidth
                            onChange={handlelevelchange}
                            label="User Type"
                            inputProps={{
                              name: "user",
                              id: "demo-simple-select-label",
                            }}
                          >
                            <option value="">Select Level</option>
                            <option key={1} value="l1">
                              1
                            </option>
                            <option key={2} value="l2">
                              2
                            </option>
                            <option key={3} value="l3">
                              3
                            </option>
                            <option key={4} value="l4">
                              4
                            </option>
                            <option key={5} value="l5">
                              5
                            </option>
                          </Select>
                          <FormHelperText className={classes.helper}>
                            {levelText}
                          </FormHelperText>
                        </FormControl>
                      </Paper>
                    </Grid>
                    <Grid item xs={3} className={classes.styleformobile}>
                      <Paper className={classes.paper}>
                        <FormControl
                          className={classes.formControl}
                          error={subjecterror}
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            Select Subject
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            native
                            value={allsubject}
                            required
                            fullWidth
                            onChange={handleSubjectChange}
                            label="User Type"
                            inputProps={{
                              name: "user",
                              id: "demo-simple-select-filled-label",
                            }}
                          >
                            <option value="">Select Subject</option>
                            <option key={1} value="m1">
                              Math
                            </option>
                            <option key={2} value="o1">
                              Odia
                            </option>
                          </Select>
                          <FormHelperText className={classes.helper}>
                            {subjectText}
                          </FormHelperText>
                        </FormControl>
                      </Paper>
                    </Grid>
                    <Grid item xs={2} className={classes.styleformobile}>
                      <Paper className={classes.paper}>
                        <FormControl
                          className={classes.formControl}
                          error={parterror}
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            Select Part
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            native
                            value={part}
                            required
                            fullWidth
                            onChange={handlepartChange}
                            label="User Type"
                            inputProps={{
                              name: "user",
                              id: "demo-simple-select-filled-label",
                            }}
                          >
                            <option value="">Select Part</option>
                            <option key={1} value="p1">
                              Part1
                            </option>
                            <option key={2} value="p2">
                              Part2
                            </option>
                          </Select>
                          <FormHelperText className={classes.helper}>
                            {partText}
                          </FormHelperText>
                        </FormControl>
                      </Paper>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      className={classes.paperWidth}
                      style={{ maxWidth: "50%" }}
                    >
                      <Paper className={classes.paper}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={getAudioFile}
                        >
                          Search
                        </Button>
                      </Paper>
                    </Grid>
                  </React.Fragment>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  className={classes.paper}
                  style={{ alignItems: "center" }}
                >
                  <div>
                    <ReactAudioPlayer src={audioLink} autoPlay controls />
                  </div>
                </Paper>
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