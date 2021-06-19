import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import config from '../config'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import weekData from './week.json'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AllWeeks from './weekToFilter.json';
// import SearchBar from "material-ui-search-bar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
 '@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and  (-webkit-min-device-pixel-ratio: 1)' : { 
    modalClass:{
      top: '-2%',
      left:'41%',
    },
    table: {
       marginLeft:"-75px"
    },
    paper: {
      marginTop: '1px',
      marginLeft: '16px',
      width: '100%',
      height: '386px',
      // padding: theme.spacing(2),
      // display: 'flex',
      // overflow: 'auto',
      // flexDirection: 'column',
      // '@media(minWidth: 400px)' : {
      //   width: '389px'
      // },
    },
    modalpaper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      left:'471px',
    },
  },
  '@media only screen and (max-width: 480px)' : {
    modalpaper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    paper : {
      width: '215%',
      height: '386px',
      marginTop: '1px',
      marginLeft: '16px',
    },
    gridStyle:{
      maxWidth: '100%',
      // width: '329px',
      // marginLeft: '12px',
   },
   table: {
    marginLeft:"0px"
    // minWidth: 650,
   },
   gridStyle1:{
    // margin-left: 1px;
    // maxWidth: '100%',
    marginLeft: '1px',
    // width: '329px',
   },
   paperWidth:{
    // width: '340px'
    // width: '329px',
    //  marginLeft: '12px',
    //  minWidth: '324px'
    //  width: '160%'
   },
   paperWidth1:{
      width: '322px',
      marginLeft: '14px',
   },
   modalClass:{
    top: '-2%',
    left:'1%',
   }
  },
  '@media only screen and (max-width: 414px)' :{

  },
  TablePaper:{
    width: '651px',
    marginLeft: '-122px'
  },
  table: {
    // marginLeft:"-75px"
    // minWidth: 650,
  },
  
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  margin: {
    margin: theme.spacing(1),
  },
  buttonmargin: {
    margin: 0,
  },
  root1: {
    width: '100%',
    height: '278px',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  root2: {
    height: 278,
    backgroundColor: theme.palette.background.paper,
  },
  searchbar: {
    width: '100%',
    maxWidth: 490,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    // margin: theme.spacing(1),
    // // minWidth: 200,
    // minWidth: '76%',
    margin: '9px',
    minWidth: '75%',
  },
  root: {
    flexGrow: 1,
    // display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  helper:{
    color: 'red',
  }
 
}));

function getModalStyle() {
  const top = '42%'
  const left = '45%'
  // top: 42%;
  // left: 45%;
  return {
    '@media only screen and (maxWidth: 480px)' : {
      top: '-2%',
      left:'1%',
      // top: `${42}%`,
      // left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    },
    '@media screen and (mindeviceWidth: 1200px) and (maxdeviceWidth: 1600px) and  (WebkitMinDevicePixelRatio: 1)' : { 
      top: '-2%',
      left:'41%',
      // top: `${42}%`,
      // left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    }
   
  };
}
// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

export default function Dashboard(props) {
  const [volunter, setVolunter] = React.useState('');
  const [allodialevel, setallOdiaLevel] = React.useState([]);
  const [allmathLevel, setallMathLevel] = React.useState([]);
  const [loaderopen, setLoaderOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState();
  const [student, setStudent] = React.useState();
  const [school, SetSchool] = React.useState();
  const [monbileno, SetStudentMobile] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleLoaderClose = () => {
    setLoaderOpen(false)
  }
  window.onpopstate = function(event) {
    props.history.go(1);
  };
  // const handleSchoolChange = (event) => {
  //   setSchoolName(event.target.value);
  //   // retriveStudent(event.target.value,volunteerid);
  // }
  //get all activites
  const[mathActivities,setallmathActivity] = useState('')
  const[odiaActivities,setallodiaActivity] = useState('')
  useEffect(() => {
    setLoaderOpen(true)
    fetch(config.apiEndpoint + '/getallhblresponses',{
      method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    }).then(response=>(response.json()))
    .then((responseJson)=> {
      if(responseJson){
        let allmathquestion = [];
        let allodiaquestion = [];
        responseJson.forEach(function(value,index){
          if(value.subject === 'math'){
            allmathquestion.push(value)
          }else{
            allodiaquestion.push(value)
          }
          value.selectedvalue = '';
        })
        setallmathActivity(allmathquestion)
        setallodiaActivity(allodiaquestion)
      }
    })
  },[])
  //to get all levels
  useEffect(() => {
    setLoaderOpen(true)
    var allMath = [];
    var allOdia = [];
    fetch(config.apiEndpoint + '/getallhbllevels',{
      method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    }).then(response=>(response.json()))
    .then((responseJson)=> {
      if(responseJson.length>0){
        setLoaderOpen(false)
        responseJson.forEach(function(item,key){
          if(item.subject === 'math'){
            allMath.push(item)
          }else{
            allOdia.push(item)
          }
        })
      }else{

      }
    })
    setallOdiaLevel(allOdia)
    setallMathLevel(allMath)
  },[])
  const[studentId,setStudentId] = useState('');

  useEffect(() => {
    getAllData()
  },[]);

  const getAllData = () =>{
    fetch(config.apiEndpoint +'/authenticateuser/'+localStorage.getItem('username')+'/'+localStorage.getItem('usercode'),{
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson){
          setStudentId(responseJson.studentdata[0]._id)
          setVolunter(responseJson.volunteerdata[0].volunteername)
          getBaseLineData(responseJson.volunteerdata[0].managerid,responseJson.volunteerdata[0].volunteerid,responseJson.studentdata[0].studentid);
          geActivityData(responseJson.volunteerdata[0].managerid, responseJson.volunteerdata[0].volunteerid,responseJson.studentdata[0].studentid,week);
          getEndlineData(responseJson.volunteerdata[0].managerid,responseJson.volunteerdata[0].volunteerid,responseJson.studentdata[0].studentid);
          setSelectedIndex(responseJson.studentdata[0].studentid)
          setSelectedStudent(responseJson.studentdata[0]);
          setStudent(responseJson.studentdata[0].studentname)
          SetSchool(responseJson.studentdata[0].schoolname)
          SetStudentMobile(responseJson.studentdata[0].phone)
          setStudentList(responseJson.studentdata)
        }else{
        }
      })
     .catch((error) => {
    });
  }
 
  const getEndlineData = (managerid,volunteerid,studentid) =>{
      setLoaderOpen(true)
      fetch(config.apiEndpoint + '/getcompletedhblactivitylistbystudentid'+'/'+managerid+'/'+volunteerid+'/'+studentid,{
        method:'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
      }).then(response=>(response.json()))
      .then((responseJson)=> {
        if(responseJson.length>0){
          AllWeeks.forEach(function(value1,key){
              if(responseJson.includes(parseInt(value1.week_id))){
                setEndlineButtonDisable(false)
              }else{
                setEndlineButtonDisable(true)
              }
            })
         }else{
          setEndlineButtonDisable(true)
        }
      })
  }
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setdisablemathlevel(false)
    setMathLevel('')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [odiaModal, setOpenOdiaModal] = React.useState(false);
  const handleOpenOdia = () =>{
    setdisablemathlevel(false)
    setOdiaLevel('')
    setOpenOdiaModal(true);
  }
  const handleCloseOdia = () => {
    setOpenOdiaModal(false);
  };
  
  const [studentList, setStudentList] = React.useState();
  
 
  //for searching student
  const [studentname, setStudentName] = React.useState('');
  const [showmathlevel, setShowMathLevel] = React.useState();
  const [showodialevel, setShowOdiaLevel] = React.useState();
  const handleChangeStudent = (event) => {
    setStudentName(event.target.value)
    setodiaActivityButton(false)
    setmathActivityButton(false)
  }
  const[studentMathActivity,setStudentMathActivity] = useState('');
  const[studentOdiaActivity,setStudentOdiaActivity] = useState('');
  const[studentFeedback,setStudentFeedback] = useState('');
  //function to get student baseline data
  const handleClick = (data) => {
    setdisablemathlevel(false)
    setdisableodialevel(false)
    setFeedbackButtonDisable(false)
    setStudentId(data._id)
    setapimethodBaseline('')
    setMathLevel('')
    setOdiaLevel('')
    mathActivities.forEach(function(value,index){
      value.selectedvalue = ''
    })
    odiaActivities.forEach(function(value,index){
      value.selectedvalue = ''
    })
    setWeek(weekData[0].week_id)
    setEndlineButtonDisable(true)
    setSelectedValueQ1('');
    setSelectedValueQ5('');
    setStudentMathActivity('')
    setStudentOdiaActivity('')
    setSelectedIndex(data.studentid)
    setStudent(data.studentname)
    SetStudentMobile(data.phone)
    SetSchool(data.schoolname)
    setSelectedStudent(data);
    getBaseLineData(data.managerid,data.volunteerid,data.studentid);
    geActivityData(data.managerid, data.volunteerid,data.studentid,weekData[0].week_id);
    setResponseHelperMathText('')
    getEndlineData(data.managerid,data.volunteerid,data.studentid);
    
  };
  // const retriveStudent = (schoolid,volunterid) =>{
  //   setLoaderOpen(true)
  //   fetch(config.apiEndpoint +'/getallhblstudentbyschoolid/'+volunterid+'/'+schoolid,{
  //     method: 'GET',
  //     headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //     }
  //     }).then((response) => response.json())
  //     .then((responseJson) => {
  //       if(responseJson){
  //         setLoaderOpen(false)
  //         setStudent(responseJson[0].studentname)
  //         SetStudentMobile(responseJson[0].phone)
  //         SetSchool(responseJson[0].schoolname)
  //         setSelectedIndex(responseJson[0].studentid)
  //         setSelectedStudent(responseJson[0]);
  //         setStudentList(responseJson)
  //         getBaseLineData(responseJson[0].managerid,responseJson[0].volunteerid,responseJson[0].schoolid,responseJson[0].studentid);
  //         geActivityData(responseJson[0].managerid,responseJson[0].volunteerid,responseJson[0].schoolid,responseJson[0].studentid,weekData[0].week_id);
  //       }else{
  //       }
  //     })
  //    .catch((error) => {
  //   });
  // }
  const[studentmathlevel,setStudentMathLevel] = useState('')
  const[studentodialevel,setStudentOdiaLevel] = useState('')
  const[baseLineMethod,setapimethodBaseline] = useState('')
  const[mathbuttondisabled,setMathButtonDisable] = useState(true)
  const[odiabuttondisabled,setOdiaButtonDisable] = useState(true)
  const[endlinebuttondisabled,setEndlineButtonDisable] = useState(true)
  const[endlinesubmittedtext,setEndlineSubmittedText] = useState('')
  //get baseline status on loading and click on student list
  const getBaseLineData = (managerid,volunteerid,studentid) =>{
    setLoaderOpen(true)
    fetch(config.apiEndpoint+'/getallhblbaselinebystudentid'+'/'+managerid+'/'+volunteerid+'/'+studentid,{
      method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    }
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.length>0){
        setLoaderOpen(false)
        setapimethodBaseline(responseJson);
        if(responseJson[0].math_level_baseline===''){
          setShowMathLevel(true)
        }else{
          setStudentMathLevel(responseJson[0].math_level_baseline)
          setShowMathLevel(false)
        }
        if(responseJson[0].odia_level_baseline===''){
          setShowOdiaLevel(true)
        }else{
          setStudentOdiaLevel(responseJson[0].odia_level_baseline)
          setShowOdiaLevel(false)
        }
        if(responseJson[0].odia_level_baseline!=='' && responseJson[0].math_level_baseline!==''){
          setMathButtonDisable(false)
          // setOdiaButtonDisable(true)
        }

      }else{
        setEndlineButtonDisable(true)
        setMathButtonDisable(true)
        setOdiaButtonDisable(true)
        setLoaderOpen(false)
        setShowMathLevel(true)
        setShowOdiaLevel(true)
      }
      if(responseJson[0].math_level_endline !=='' && responseJson[0].odia_level_endline !==''){
        setEndlineSubmittedText("Endline already submitted")
      }else{
        // setEndlineSubmittedText('')
      }
    })
   .catch((error) => {
    })
  }
  const[endlinemodal,setendlinemodal] = useState(false)
  const handleopenendline=() => {
    setendlinemodal(true)

  }
  const handleCloseEndline=() =>{
    setendlinemodal(false)
  }
  const[activityId,setActivityId] = useState('');
  const[mathactivitystatus,setMathActivityStatus] = useState(false);
  const geActivityData =  (managerid,volunteerid,studentid,week) => {
     setLoaderOpen(true)
     fetch(config.apiEndpoint+'/getallhblactivitybystudentid/'+managerid+'/'+volunteerid+'/'+studentid+'/'+week,{
       method:'GET',
       headers:{
         Accept:'application/json',
         'content-type':'application/json'
       }
     }).then((response)=>response.json())
     .then((responseJson)=>{
       if(responseJson.length>0){
         setActivityId(responseJson[0]._id)
        setLoaderOpen(false)
        if(responseJson[0].math_activity.length>0){
          setStudentMathActivity('complete')
          setMathActivityStatus(true)
          setOdiaButtonDisable(false)
        }else{
          setOdiaButtonDisable(true)
          setMathActivityStatus(false)
        }
        if(responseJson[0].odia_activity.length>0){
          setStudentOdiaActivity('complete')
          setFeedbackButtonDisable(true)
          // setOdiaActivityStatus(true)
          setOdiaButtonDisable(false)
        }
        else if(responseJson,responseJson[0].math_activity.length>0 && !responseJson[0].odia_activity.length>0){
          setStudentOdiaActivity('')
          setOdiaButtonDisable(false)
        }
        // setShowActivity(false)
       }else{
        // setFeedbackButtonDisable(false)
        // setOdiaActivityStatus(false)
        setLoaderOpen(false)
        setOdiaButtonDisable(true)
        setMathActivityStatus(false)
        // setShowActivity(true)
       }
     })
  }
  
  const listItemData = studentList && studentList.filter((data,index)=>{
    if(studentname == null)
    return data
    else if(data.studentname.toLowerCase().includes(studentname.toLowerCase()) || data.studentname.toLowerCase().includes(studentname.toLowerCase())){
     return data
    }
  }).map(data=>{
    return(
    <div key={data.studentid}>
      <ListItem button  selected={selectedIndex === data.studentid} key={data} onClick={(event) => handleClick(data)} >
        <ListItemText primary={data.studentname}/>
      </ListItem>
    </div>
    )
  })
  const [helperText, setHelperText] = React.useState('');
  const [error, setUserError] = React.useState(false);
  const[mathlevel,setMathLevel] = React.useState('')
  
  const handleMathLevel = (event) => {
    setUserError(false);
    setHelperText('')
    setMathLevel(event.target.value)
  }
  const[disablemathlevel,setdisablemathlevel] = useState(false)
  const[disableodialevel,setdisableodialevel] = useState(false)
  
  const saveMathLevel = () => {
    if (navigator.onLine){
      if(mathlevel === ''){
        setUserError(true);
        setHelperText('Please select one level')
      }else{
        setdisablemathlevel(true)
        if(baseLineMethod){
          if(baseLineMethod !== '' && baseLineMethod[0].math_level_baseline !== '' || baseLineMethod[0].odia_level_baseline !== '' || baseLineMethod[0].usercomment !==''){
              fetch(config.apiEndpoint+'/updatehblbaseline/'+baseLineMethod[0]._id,{
                method:'PUT',
                headers:{
                  Accept:'application/json',
                  'content-type':'application/json'
                },
                body:JSON.stringify({
                   "math_level_baseline" : mathlevel
                }),
                }).then((response)=>response.json())
                .then((responseJson) => {
                  if(responseJson.status === "success"){
                    setodiaActivityButton(false);
                    setmathActivityButton(false)
                    getBaseLineData(selectedStudent.managerid,selectedStudent.volunteerid,selectedStudent.studentid);
                    setOpen(false);
                  }
                  else{
        
                  }
                })
              .catch((error) => {
              });
          }else{
            fetch(config.apiEndpoint+'/createnewhblbaseline',{
              method:'POST',
              headers:{
                Accept:'application/json',
                'content-type':'application/json'
              },
              body:JSON.stringify({
                  "managerid" : selectedStudent.managerid,
                  "managername" : selectedStudent.managername,
                  "volunteerid" : selectedStudent.volunteerid,
                  "volunteername" : selectedStudent.volunteername,
                  "schoolid" : selectedStudent.schoolid,
                  "schoolname" : selectedStudent.schoolname,
                  "studentid" : selectedStudent.studentid,
                  "studentname" : selectedStudent.studentname,
                  "studentphone" : selectedStudent.phone,
                  "gender" : selectedStudent.gender,
                  "class" : selectedStudent.class,
                  "math_level_baseline" : mathlevel,
                  "odia_level_baseline":odialevel
              }),
              }).then((response)=>response.json())
               .then((responseJson) => {
                if(responseJson){
                  if(responseJson.status === "success"){
                    setodiaActivityButton(false);
                    setmathActivityButton(false)
                    getBaseLineData(selectedStudent.managerid,selectedStudent.volunteerid,selectedStudent.studentid);
                    setOpen(false);
                  }
                }
                else{
      
                }
              })
            .catch((error) => {
             });
          }
        }
        else{
          fetch(config.apiEndpoint+'/createnewhblbaseline',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'content-type':'application/json'
          },
          body:JSON.stringify({
              "managerid" : selectedStudent.managerid,
              "managername" : selectedStudent.managername,
              "volunteerid" : selectedStudent.volunteerid,
              "volunteername" : selectedStudent.volunteername,
              "schoolid" : selectedStudent.schoolid,
              "schoolname" : selectedStudent.schoolname,
              "studentid" : selectedStudent.studentid,
              "studentname" : selectedStudent.studentname,
              "studentphone" : selectedStudent.phone,
              "gender" : selectedStudent.gender,
              "class" : selectedStudent.class,
              "math_level_baseline" : mathlevel,
              "odia_level_baseline":odialevel
          }),
          }).then((response)=>response.json())
           .then((responseJson) => {
            if(responseJson){
              if(responseJson.status === "success"){
                setodiaActivityButton(false);
                setmathActivityButton(false)
                getBaseLineData(selectedStudent.managerid,selectedStudent.volunteerid,selectedStudent.studentid);
                setOpen(false);
              }
            }
            else{
  
            }
          })
        .catch((error) => {
         });
        }
      }
    }else{
       alert("please ensure that you have enabled data connection")
    }
  }
  const [odiaLevelText, setOdiaLevelHelper] = React.useState('');
  const [odiaLevelerror, setOdiaLevelError] = React.useState(false);
  const[odialevel,setOdiaLevel] = React.useState('')
  const handleOdiaLevel = (event) => {
    setOdiaLevelError(false);
    setOdiaLevelHelper('')
    setOdiaLevel(event.target.value)
  }
  const[odiaendlinelevel,setOdiaEndlineLevel] = useState('')
  const handleEndlineOdiaLevel = (event) => {
    setOdiaEndlineLevel(event.target.value)
  }
  const[mathendlinelevel,setaMathEndlineLevel] = useState('')
  const[endlineerrorText,setendlineerrorText] = useState('')
  const[endlineerodiaText,setendlineerodiaText] = useState('')
  const[odialeveldisabled,setOdialeveldisabled] = useState(true)
  const handleEndlineMathLevel = (event) => {
    setaMathEndlineLevel(event.target.value)
    setOdialeveldisabled(false)
  }
  const saveEndline = () =>{
    if(mathendlinelevel === ''){
      setendlineerrorText('set math level')
      setOdialeveldisabled(false)
    }
    else if(odiaendlinelevel === ''){
      setendlineerodiaText('set odia level')}
      else{
      fetch(config.apiEndpoint+'/updatehblbaseline/'+baseLineMethod[0]._id,{
        method:'PUT',
        headers:{
          Accept:'application/json',
          'content-type':'application/json'
        },
        body:JSON.stringify({
            "math_level_endline" : mathendlinelevel,
            "odia_level_endline": odiaendlinelevel
        }),
        }).then((response)=>response.json())
        .then((responseJson) => {
          if(responseJson.status === 'success'){
            setendlinemodal(false)
            alert("end line submitted")
          }
        })
      .catch((error) => {
      });
    }
  }
  const[odiaLevelButton,setodiaLevelButton] = useState('')
  
  const saveOdiaLevel = () => {
    if (navigator.onLine) {
      if(odialevel === ''){
        setOdiaLevelError(true);
        setOdiaLevelHelper('Please select one level')
      }else{
        setdisableodialevel(true)
        if(baseLineMethod){
          if(baseLineMethod !== '' && baseLineMethod[0].odia_level_baseline !== '' ||baseLineMethod[0].math_level_baseline !== '' || baseLineMethod[0].usercomment !==''){
              fetch(config.apiEndpoint+'/updatehblbaseline/'+baseLineMethod[0]._id,{
                method:'PUT',
                headers:{
                  Accept:'application/json',
                  'content-type':'application/json'
                },
                body:JSON.stringify({
                    "odia_level_baseline" : odialevel
                }),
                }).then((response)=>response.json())
                .then((responseJson) => {
                  if(responseJson.status === "success"){
                    setodiaActivityButton(false);
                    setmathActivityButton(false)
                    getBaseLineData(selectedStudent.managerid,selectedStudent.volunteerid,selectedStudent.studentid);
                    setOpenOdiaModal(false);
                  }
                  else{
        
                  }
                })
              .catch((error) => {
              });
          }else{
            fetch(config.apiEndpoint+'/createnewhblbaseline',{
              method:'POST',
              headers:{
                Accept:'application/json',
                'content-type':'application/json'
              },
              body:JSON.stringify({
                  "managerid" : selectedStudent.managerid,
                  "managername" : selectedStudent.managername,
                  "volunteerid" : selectedStudent.volunteerid,
                  "volunteername" : selectedStudent.volunteername,
                  "schoolid" : selectedStudent.schoolid,
                  "schoolname" : selectedStudent.schoolname,
                  "studentid" : selectedStudent.studentid,
                  "studentname" : selectedStudent.studentname,
                  "studentphone" : selectedStudent.phone,
                  "gender" : selectedStudent.gender,
                  "class" : selectedStudent.class,
                  "odia_level_baseline" : odialevel,
                  "math_level_baseline":mathlevel
              }),
              }).then((response)=>response.json())
              .then((responseJson) => {
                if(responseJson.status === "success"){
                  setodiaActivityButton(false)
                  setmathActivityButton(false)
                  getBaseLineData(selectedStudent.managerid,selectedStudent.volunteerid,selectedStudent.studentid);
                  setOpenOdiaModal(false);
                }
                else{
                  
                }
              })
            .catch((error) => {
            });
           }
        }
        else{
          fetch(config.apiEndpoint+'/createnewhblbaseline',{
            method:'POST',
            headers:{
              Accept:'application/json',
              'content-type':'application/json'
            },
            body:JSON.stringify({
                "managerid" : selectedStudent.managerid,
                "managername" : selectedStudent.managername,
                "volunteerid" : selectedStudent.volunteerid,
                "volunteername" : selectedStudent.volunteername,
                "schoolid" : selectedStudent.schoolid,
                "schoolname" : selectedStudent.schoolname,
                "studentid" : selectedStudent.studentid,
                "studentname" : selectedStudent.studentname,
                "studentphone" : selectedStudent.phone,
                "gender" : selectedStudent.gender,
                "class" : selectedStudent.class,
                "odia_level_baseline" : odialevel,
                "math_level_baseline":mathlevel
            }),
            }).then((response)=>response.json())
            .then((responseJson) => {
              if(responseJson.status === "success"){
                setodiaActivityButton(false)
                setmathActivityButton(false)
                getBaseLineData(selectedStudent.managerid,selectedStudent.volunteerid,selectedStudent.studentid);
                setOpenOdiaModal(false);
              }
              else{
                
              }
            })
          .catch((error) => {
          });
         }
      }
    }else{
       alert("please ensure that you have enabled data connection") 
    }
  }
 
  const [selectedValue, setSelectedValue] = React.useState('');
  const [selectedValueQ1, setSelectedValueQ1] = React.useState('');
  const [selectedValueQ5, setSelectedValueQ5] = React.useState('');
  const [week, setWeek] = React.useState(weekData[0].week_id);
  const handleRadioChangeQ1 = (event,data) => {
    mathActivities.forEach(function(value,key){
      if(value.responseid === data.responseid){
        value.selectedvalue = event.target.value
      }
    })
    setSelectedValueQ1(data.responseid);
    setSelectedValue(event.target.value);
  };
  const[odiaActivityValue,setSelectedValueOdia] = useState('')
  const handleRadioChangeQ5 = (event,data) => {
    odiaActivities.forEach(function(value,key){
      if(value.responseid === data.responseid){
        value.selectedvalue = event.target.value
      }
    })
    setSelectedValueOdia(event.target.value);
    setSelectedValueQ5(data.responseid);
  };
 
  const handleWeekChange = (event) => {
    mathActivities.forEach(function(value,index){
      value.selectedvalue = ''
    })
    odiaActivities.forEach(function(value,index){
      value.selectedvalue = ''
    })
    setFeedbackButtonDisable(false)
    geActivityData(selectedStudent.managerid, selectedStudent.volunteerid,selectedStudent.studentid,event.target.value);
    setWeek(event.target.value)
    setMathLevel('')
    setOdiaLevel('')
    setSelectedValueQ1('');
    setSelectedValueQ5('');
    setStudentMathActivity('')
    setStudentOdiaActivity('')
    setResponseHelperMathText('')
    setodiaActivityButton(false)
    setmathActivityButton(false)
    // setStudentMathLevel('');
    
  }
  const [responsehelperText, setResponseHelperText] = React.useState('');
  const [responsehelperMathText,setResponseHelperMathText] = React.useState('');
  const [activity, sethandleActivity] = React.useState(false);
  const handleActivity = () =>{
    setSelectedValueQ1('');
    sethandleActivity(true);
  }
  const handleCloseActivity = () => {
    sethandleActivity(false);
  };
  const [mathactivity, sethandleMathActivity] = React.useState(false);
  const handleMathActivity = () =>{
    sethandleMathActivity(true);
  }
  const handleMathCloseActivity = () => {
    sethandleMathActivity(false);
  };
  const isEmpty = (obj) => {
    return Object.values(obj).some(element => element.selectedvalue == '');
  }
  const [mathActivityButton,setmathActivityButton] = React.useState(false);
  const [odiaActivityButton,setodiaActivityButton] = React.useState(false);

  const [responseaftersubmit,setResponseafterSubmit] = React.useState('');

  const saveMathActivity = ()=>{
    if (navigator.onLine) { 
      if(isEmpty(mathActivities)){
      setResponseHelperMathText('select all option to submit')
    }else{
      setmathActivityButton(true)
      setResponseHelperMathText('')
        fetch(config.apiEndpoint+'/createnewhblactivity',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'content-type':'application/json'
          },
          body:JSON.stringify({
            "managerid" : selectedStudent.managerid,
            "managername" : selectedStudent.managername,
            "volunteerid" : selectedStudent.volunteerid,
            "volunteername" : selectedStudent.volunteername,
            "schoolid" : selectedStudent.schoolid,
            "schoolname" : selectedStudent.schoolname,
            "studentid" : selectedStudent.studentid,
            "studentname" : selectedStudent.studentname,
            "studentphone" : selectedStudent.phone,
            "gender" : selectedStudent.gender,
            "class" : selectedStudent.class,
            "week" : week,
            "activitystatus" : "incomplete",
             "math_activity" :  mathActivities,
             "odia_activity":[]
          }),
        }).then((response)=>response.json())
        .then((responseJson)=>{

          if(responseJson.status=== "success"){
            // setResponseafterSubmit('"Math Activity is saved"')
            // alert("Math Activity is saved")
            sethandleMathActivity(false);
            geActivityData(selectedStudent.managerid, selectedStudent.volunteerid,selectedStudent.studentid,week);
          }
        })
     }
    } else { 
       alert("please ensure that you have enabled data connection") 
    }
  }
  const saveActivity = () => {
     if (navigator.onLine) { 
      if(isEmpty(odiaActivities)){
        setResponseHelperText('select all option to submit')
      }else{
        setodiaActivityButton(true)
        setResponseHelperText('')
        fetch(config.apiEndpoint+'/updatehblactivity/'+activityId,{
          method:'PUT',
          headers:{
            Accept:'application/json',
            'content-type':'application/json'
          },
          body:JSON.stringify({
            "odia_activity": odiaActivities,
            "activitystatus" : "complete"
          }),
        }).then((response)=>response.json())
          .then((responseJson)=>{
          
            if(responseJson.status=== "success"){
              getEndlineData(selectedStudent.managerid,selectedStudent.volunteerid,selectedStudent.studentid);
              setFeedbackButtonDisable(true)
              sethandleActivity(false);
              geActivityData(selectedStudent.managerid, selectedStudent.volunteerid,selectedStudent.studentid,week);
            }
        })
        }
     }
     else { 
       alert("please ensure that you have enabled data connection") 
     }
     
  }
 
  const userLogout = () => {
    
    localStorage.removeItem('username')
    localStorage.removeItem('usercode')
    props.history.push('')
  }
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const GoTOActivity = () =>{
     props.history.push('/activities')
  }
  const[feedbackbuttondisabled,setFeedbackButtonDisable] = useState(false)
  const[studentfeedbackvalue,setStudentFeedbackValue] = useState('');
  const handleStudentFeedback = (event) =>{
    setStudentFeedbackValue(event.target.value)
  }
  const[feedback,setFeedback] = useState(false)
  const handleFeedback = () =>{
     setFeedback(true)
     let bindvalue = baseLineMethod &&  baseLineMethod[0].usercomment.comment;
    //  let bindvalue =  baseLineMethod &&   baseLineMethod[0].usercomment.map((data, index) => {
    //     return (data.comment)
    //   })
    setStudentFeedbackValue(bindvalue)
  }
  const handleCloseFeedback = () => {
    setFeedback(false);
  };
  const [feedbackText,setFeedbackText] = useState('')
  const saveFeedback = () =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    if(studentfeedbackvalue == ''){
      setFeedbackText("enter feedback value")
    }else {
          setFeedbackText(" ")
          if(baseLineMethod!= ''){
              // baseLineMethod[0].usercomment.push({"comment":studentfeedbackvalue,"date":today})
              let inputcommentupdate = {"comment":studentfeedbackvalue,"date":today}
              fetch(config.apiEndpoint+'/updatehblbaseline/'+baseLineMethod[0]._id,{
                method:'PUT',
                headers:{
                  Accept:'application/json',
                  'content-type':'application/json'
                },
                body:JSON.stringify({
                  "usercomment":inputcommentupdate
                }),
                }).then((response)=>response.json())
                .then((responseJson) => {
                  if(responseJson.status === "success"){
                       setFeedback(false);
                       getAllData();
                  }
                  else{
        
                  }
                })
              .catch((error) => {
              });
          }
          else{
            var inputcomment = {"comment":studentfeedbackvalue,"date":today}
            fetch(config.apiEndpoint+'/createnewhblbaseline',{
              method:'POST',
              headers:{
                Accept:'application/json',
                'content-type':'application/json'
              },
              body:JSON.stringify({
                  "managerid" : selectedStudent.managerid,
                  "managername" : selectedStudent.managername,
                  "volunteerid" : selectedStudent.volunteerid,
                  "volunteername" : selectedStudent.volunteername,
                  "schoolid" : selectedStudent.schoolid,
                  "schoolname" : selectedStudent.schoolname,
                  "studentid" : selectedStudent.studentid,
                  "studentname" : selectedStudent.studentname,
                  "studentphone" : selectedStudent.phone,
                  "gender" : selectedStudent.gender,
                  "class" : selectedStudent.class,
                  "usercomment":inputcomment
              }),
              }).then((response)=>response.json())
              .then((responseJson) => {
                if(responseJson){
                  if(responseJson.status === "success"){
                    setFeedback(false);
                    getAllData();
                  }
                }
                else{
      
                }
              })
            .catch((error) => {
            });
          }
      }
   }
  
  
  const[editstudentname,seteditstudentname] = useState(false);
  const[updatestudentname,setupdatestudentname] = useState(student)
  const handleEditNameModal = () =>{
    seteditstudentname(true)
    setupdatestudentname(student)
  }
  const handleEditStudentName = () =>{
    seteditstudentname(false)
  }
  const handleUpdateStudent = (event) =>{
    setupdatestudentname(event.target.value)
  }
 
  const[studentnameUpdateButton,setstudentnameUpdateButton] = useState(false)
  const[studentupdateerror,setstudentupdateerror] = useState('')

  const saveStudentNameUpdate = () =>{
    if(updatestudentname == ''){
      setstudentupdateerror('please enter a valid student name')
    }else{
      let res = /^[a-zA-Z]+$/.test(updatestudentname);
      if(res == true){
        seteditstudentname(false)
        setstudentupdateerror('')
        //call api
        fetch(config.apiEndpoint+'/updatehblstudent/'+studentId,{
          method:'PUT',
          headers:{
            Accept:'application/json',
            'content-type':'application/json'
          },
          body:JSON.stringify({
              "studentname" : updatestudentname
          }),
          }).then((response)=>response.json())
          .then((responseJson) => {
              if(responseJson.status === "success"){
                 getAllData();
              }
             else{
  
            }
          })
        .catch((error) => {
        });
      }else{
        setstudentupdateerror('please enter a valid student name')
      }
    }
  }
  const[studentupdatenoerror,setstudentupdatenoerror] = useState('')
  const[editstudentmobile,seteditstudentmobile] = useState(false)
  const[updatestudentmobno,setupdatestudentmobno] = useState(monbileno)
  const handleUpdateStudentNo = (event) =>{
    setupdatestudentmobno(event.target.value)
  }
  const handleEditMobnoModal = () =>{
    seteditstudentmobile(true)
    setupdatestudentmobno(monbileno)
  }
  const handleEditStudentMobile = () =>{
    seteditstudentmobile(false)
  }
  const saveStudentmobnoUpdate = () =>{
    if(updatestudentmobno == ''){
      setstudentupdatenoerror('please enter a valid student mobileno')
    }else{
      let res = /^\d*$/.test(updatestudentmobno);
      if(res == true && updatestudentmobno.length == 10){
        setstudentupdatenoerror('')
        seteditstudentmobile(false)
        //call api
        fetch(config.apiEndpoint+'/updatehblstudent/'+studentId,{
          method:'PUT',
          headers:{
            Accept:'application/json',
            'content-type':'application/json'
          },
          body:JSON.stringify({
              "phone" : updatestudentmobno
          }),
          }).then((response)=>response.json())
          .then((responseJson) => {
              if(responseJson.status === "success"){
                 getAllData();
              }
             else{
  
            }
          })
        .catch((error) => {
        });
      }else{
        setstudentupdatenoerror('please enter a valid student mobileno')
      }
    }
  }
  
  return (
    <div className={classes.root}>
       {/* <Online>Only shown when you're online</Online> */}
       {/* <Offline>Only shown offline (surprise!)</Offline> */}
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {volunter}
          </Typography>
           <Button variant="contained" onClick={GoTOActivity}  style={{marginRight: '7px'}}>
              Activities
           </Button>
          <Button variant="contained" onClick={userLogout}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item xs={12}>
            <Paper>
                <Grid container spacing={3}>
                 <div className={classes.root}>
                  <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                      <React.Fragment>
                      <Grid item xs={4} className={classes.gridStyle}>
                        <Paper className={classes.paper} >
                        <FormControl className={classes.formControl}>
                        {/* <InputLabel htmlFor="demo-simple-select-label">School</InputLabel> */}
                          {/* <Select
                            native
                            value={schoolname}
                            required
                            fullWidth
                            onChange={handleSchoolChange}
                            label="User Type"
                            inputProps={{
                              name: 'user',
                              id: 'demo-simple-select-label',
                            }}
                            >
                            {schooldata &&  schooldata.map((data, index) => (
                                <option key={index} value={data.schoolid}>{data.schoolname}</option>
                            ))}
                          </Select> */}
                          <TextField
                              className={classes.searchbar}
                              // error={usererror}
                              variant="outlined"
                              margin="normal"
                              required
                              // fullWidth
                              name="studentname"
                              label="Search Student"
                              type="text"
                              id="studentname"
                              value={studentname}
                              onChange={handleChangeStudent}
                              autoComplete="current-password"
                            />
                           
                            <div className={classes.root1}>
                              <List component="nav" className={classes.root1} aria-label="contacts" >
                               {listItemData}
                              </List>
                            </div>
                          </FormControl>
                        </Paper>
                      </Grid>
                      <Grid item xs={8} className={classes.gridStyle1}>
                      <Paper className={classes.paper,classes.paperWidth1}>
                      <FormControl className={classes.formControl}  >
                        <InputLabel  htmlFor="demo-simple-select-label">Week</InputLabel>
                        <Select
                            native
                            value={week}
                            required
                            fullWidth
                            onChange={handleWeekChange}
                            label="User Type"
                            inputProps={{
                              name: 'user',
                              id: 'demo-simple-select-label',
                            }}
                          >
                          {weekData &&  weekData.map((data, index) => (
                              <option key={index} value={data.week_id}>{data.week_name}</option>
                          ))}
                        </Select>
                        </FormControl>
                          <Button variant="contained" color="primary" style={{marginLeft: '25px',marginTop: '13px'}} disabled={endlinebuttondisabled} onClick={handleopenendline}>
                            set Endline
                          </Button>
                          <Modal
                            open={endlinemodal}
                            onClose={handleCloseEndline}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                          >
                          <div style={modalStyle} className={classes.modalpaper}>
                          {(endlinesubmittedtext!=='')?<div>{endlinesubmittedtext}</div>:<div> <h2 id="simple-modal-title">Set Endline</h2>
                            <FormControl>
                            <InputLabel htmlFor="demo-simple-select-label">Math level</InputLabel>
                                <Select
                                  native
                                  value={mathendlinelevel}
                                  required
                                  fullWidth
                                  onChange={handleEndlineMathLevel}
                                  label="User Type"
                                  inputProps={{
                                    name: 'user',
                                    id: 'demo-simple-select-label',
                                  }}
                                  style={{minWidth: '250px'}}
                                  >
                                    <option value={''}>{''}</option>
                                    {allmathLevel &&  allmathLevel.map((data, index) => (
                                        <option key={index} value={data.leveldesc}>{data.leveldesc}</option>
                                    ))}
                              </Select>
                              <FormHelperText className={classes.helper}>{endlineerrorText}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.formControl} error={odiaLevelerror} style={{marginLeft: '-1px'}}>
                              <InputLabel htmlFor="demo-simple-select-label">Odia level</InputLabel>
                              <Select
                                native
                                value={odiaendlinelevel}
                                required
                                fullWidth
                                onChange={handleEndlineOdiaLevel}
                                label="User Type"
                                inputProps={{
                                  name: 'user',
                                  id: 'demo-simple-select-label',
                                }}
                                style={{minWidth: '250px'}}
                                disabled = {odialeveldisabled}
                                >
                                <option value={''}>{''}</option>
                                  {allodialevel &&  allodialevel.map((data, index) => (
                                      <option key={index} value={data.leveldesc}>{data.leveldesc}</option>
                                  ))}
                              </Select>
                              <FormHelperText className={classes.helper}>{endlineerodiaText}</FormHelperText>
                              </FormControl>
                                <Button variant="contained" size="small" color="primary"  style={{marginBottom: '-59px',marginLeft:"9px"}} onClick={saveEndline}>
                                  Save
                                </Button></div>}
                              </div>
                            </Modal>
                             <Container maxWidth="sm" style={{marginBottom:'35px'}}>
                                <div>
                                  <TableContainer component={classes.TablePaper} >
                                  <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Student Name</TableCell>
                                        <TableCell>{student && student}</TableCell>
                                        <Grid item xs={8}>
                                          <EditIcon style={{marginTop: '16px',color: '#007bff',marginLeft: '-19px',cursor: 'pointer'}} onClick={handleEditNameModal}/>
                                          <Modal
                                            style={{overflow: 'scroll'}}
                                            open={editstudentname}
                                            onClose={handleEditStudentName}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                          >
                                            <p style={modalStyle} className={classes.modalpaper}>
                                            <h2 id="simple-modal-title">Update StudentName</h2>
                                            <FormControl className={classes.formControl}>
                                               <TextField
                                                  className={classes.searchbar}
                                                  variant="outlined"
                                                  margin="normal"
                                                  required
                                                  name="updatestudentname"
                                                  label="Student Name"
                                                  type="text"
                                                  id="updatestudentname"
                                                  value={updatestudentname}
                                                  onChange={handleUpdateStudent}
                                                  autoComplete="current-password"
                                                />
                                                <FormHelperText className={classes.helper}>{studentupdateerror}</FormHelperText>
                                                <Button variant="contained" size="small" color="primary"  disabled ={studentnameUpdateButton} onClick={saveStudentNameUpdate} style={{width: '20%'}}>
                                                  Update
                                                </Button>
                                              </FormControl>
                                            </p>
                                          </Modal>
                                        </Grid>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                          <TableCell component="th" scope="row">
                                             School Name
                                          </TableCell>
                                          <TableCell>{school && school}</TableCell>
                                        </TableRow>
                                        <TableRow >
                                          <TableCell component="th" scope="row">
                                            Student Mobile
                                          </TableCell>
                                            <TableCell>{monbileno && monbileno}</TableCell>
                                            <Grid item xs={8}>
                                              <EditIcon style={{marginTop: '16px',color: '#007bff',marginLeft: '-19px',cursor: 'pointer'}} onClick={handleEditMobnoModal}/>
                                              <Modal
                                                style={{overflow: 'scroll'}}
                                                open={editstudentmobile}
                                                onClose={handleEditStudentMobile}
                                                aria-labelledby="simple-modal-title"
                                                aria-describedby="simple-modal-description"
                                              >
                                                <p style={modalStyle} className={classes.modalpaper}>
                                                <h2 id="simple-modal-title">Update StudentMobile</h2>
                                                <FormControl className={classes.formControl}>
                                                  <TextField
                                                      className={classes.searchbar}
                                                      variant="outlined"
                                                      margin="normal"
                                                      required
                                                      name="updatestudentmobile"
                                                      label="Student Mobileno"
                                                      type="text"
                                                      id="updatestudentmobno"
                                                      value={updatestudentmobno}
                                                      onChange={handleUpdateStudentNo}
                                                      autoComplete="current-password"
                                                    />
                                                    <FormHelperText className={classes.helper}>{studentupdatenoerror}</FormHelperText>
                                                    <Button variant="contained" size="small" color="primary"   onClick={saveStudentmobnoUpdate} style={{width: '20%'}}>
                                                      Update
                                                    </Button>
                                                  </FormControl>
                                                </p>
                                              </Modal>
                                            </Grid>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                             Math Level
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                            {showmathlevel?<Button variant="contained" size="small" color="primary"  onClick={handleOpen}>
                                               Set level
                                            </Button>:studentmathlevel}
                                            <Modal
                                              open={open}
                                              onClose={handleClose}
                                              aria-labelledby="simple-modal-title"
                                              aria-describedby="simple-modal-description"
                                             >
                                            <p className={classes.modalpaper}>
                                              <h2 id="simple-modal-title">Set Math level</h2>
                                              <FormControl className={classes.formControl} error={error}>
                                                <InputLabel htmlFor="demo-simple-select-label">Math level</InputLabel>
                                                <Select
                                                  native
                                                  value={mathlevel}
                                                  required
                                                  fullWidth
                                                  onChange={handleMathLevel}
                                                  label="User Type"
                                                  inputProps={{
                                                    name: 'user',
                                                    id: 'demo-simple-select-label',
                                                  }}
                                                  style={{minWidth: '250px'}}
                                                  >
                                                    <option value={''}>{''}</option>
                                                    {allmathLevel &&  allmathLevel.map((data, index) => (
                                                        <option key={index} value={data.leveldesc}>{data.leveldesc}</option>
                                                    ))}
                                                  
                                                </Select>
                                                <FormHelperText className={classes.helper}>{helperText}</FormHelperText>
                                                </FormControl>
                                                <Button variant="contained" size="small" color="primary"  style={{marginBottom: '-59px'}} onClick={saveMathLevel} disabled={disablemathlevel}>
                                                      Save
                                                </Button>
                                            </p>
                                            </Modal>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Odia Level</TableCell>
                                          <TableCell component="th" scope="row">
                                              {showodialevel?<Button variant="contained" size="small" color="primary"  onClick={handleOpenOdia}>
                                                Set level
                                            </Button>:studentodialevel}
                                            <Modal
                                              open={odiaModal}
                                              onClose={handleCloseOdia}
                                              aria-labelledby="simple-modal-title"
                                              aria-describedby="simple-modal-description"
                                            >
                                            <p style={modalStyle} className={classes.modalpaper}>
                                              <h2 id="simple-modal-title">Set Odia level</h2>
                                              <FormControl className={classes.formControl} error={odiaLevelerror}>
                                                <InputLabel htmlFor="demo-simple-select-label">Odia level</InputLabel>
                                                <Select
                                                  native
                                                  value={odialevel}
                                                  required
                                                  fullWidth
                                                  onChange={handleOdiaLevel}
                                                  label="User Type"
                                                  inputProps={{
                                                    name: 'user',
                                                    id: 'demo-simple-select-label',
                                                  }}
                                                  style={{minWidth: '250px'}}
                                                  >
                                                  <option value={''}>{''}</option>
                                                    {allodialevel &&  allodialevel.map((data, index) => (
                                                        <option key={index} value={data.leveldesc}>{data.leveldesc}</option>
                                                    ))}
                                                </Select>
                                                <FormHelperText className={classes.helper}>{odiaLevelText}</FormHelperText>
                                                </FormControl>
                                                <Button variant="contained" size="small" color="primary"  disabled ={odiaLevelButton} style={{marginBottom: '-59px'}} onClick={saveOdiaLevel} disabled={disableodialevel}>
                                                      Save
                                                </Button>
                                               </p>
                                            </Modal>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Math Activity</  TableCell>
                                          <TableCell component="th" scope="disabledrow">
                                            {mathactivitystatus?studentMathActivity:<Button variant="contained" size="small" color={'primary'} onClick={handleMathActivity} disabled = {mathbuttondisabled}>
                                              Set Activity
                                            </Button>}
                                            <Modal
                                            style={{overflow: 'scroll'}}
                                            open={mathactivity}
                                            onClose={handleMathCloseActivity}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                          >
                                            <p style={modalStyle} className={classes.modalpaper}>
                                            <h2 id="simple-modal-title">Answer questions</h2>
                                            <FormControl className={classes.formControl}>
                                              {mathActivities && mathActivities.map(function(value,key){
                                                return (
                                                  <div key={key}>
                                                    <b>Q:{key+1}:</b>{value.responsedesc}
                                                    <RadioGroup aria-label="quiz" name="quiz" value={(selectedValueQ1===value.responseid)?selectedValue:value.selectedvalue} onChange={(event)=>handleRadioChangeQ1(event,value)}>
                                                      <FormControlLabel value="yes" control={<Radio/>} label="yes" />
                                                      <FormControlLabel value="no" control={<Radio/>} label="no" />
                                                    </RadioGroup>
                                                  </div>
                                                 )
                                               })}
                                                <Button variant="contained" size="small" color="primary"  disabled ={mathActivityButton} onClick={saveMathActivity}>
                                                    Save
                                                </Button>
                                              <FormHelperText style={{color:"red",        fontSize:"16px"}}>{responsehelperMathText}</FormHelperText>
                                              <FormHelperText style={{color:"green",        fontSize:"16px"}}>{responseaftersubmit}</FormHelperText>
                                              </FormControl>
                                            </p>
                                          </Modal>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Odia Activity</  TableCell>
                                          <TableCell component="th" scope="row">
                                            {studentOdiaActivity?studentOdiaActivity:<Button disabled ={odiabuttondisabled} variant="contained" size="small" color={'primary'} onClick={handleActivity}>
                                              Set Activity
                                            </Button>}
                                            <Modal
                                            style={{overflow: 'scroll'}}
                                            open={activity}
                                            onClose={handleCloseActivity}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                          >
                                            <p style={modalStyle} className={classes.modalpaper}>
                                            <h2 id="simple-modal-title">Answer questions</h2>
                                            <FormControl className={classes.formControl}>
                                              {odiaActivities && odiaActivities.map(function(value,key){
                                                  return (
                                                    <div key={key}>
                                                      <b>Q:{key+1}:</b>{value.responsedesc}
                                                      <RadioGroup aria-label="quiz" name="quiz" value={(selectedValueQ5===value.responseid)?odiaActivityValue:value.selectedvalue} onChange={(event)=>handleRadioChangeQ5(event,value)}>
                                                        <FormControlLabel value="yes" control={<Radio/>} label="yes" />
                                                        <FormControlLabel value="no" control={<Radio/>} label="no" />
                                                      </RadioGroup>
                                                    </div>
                                                  )
                                                })}
                                               {/* <div>
                                                  <b>Q:1:</b>Has the child received calls?
                                                  <RadioGroup aria-label="quiz" name="quiz" value={selectedValueQ5} onChange={handleRadioChangeQ5}>
                                                    <FormControlLabel value="yes" control={<Radio />} label="yes" />
                                                    <FormControlLabel value="no" control={<Radio />} label="no" />
                                                  </RadioGroup>
                                                </div> */}
                                                <Button variant="contained" size="small" color="primary" disabled ={odiaActivityButton}  onClick={saveActivity}>
                                                      Save
                                                </Button>
                                                <FormHelperText style={{color:"red",        fontSize:"16px"}}>{responsehelperText}</FormHelperText>
                                                <FormHelperText style={{color:"green",        fontSize:"16px"}}>{responseaftersubmit}</FormHelperText>
                                              </FormControl>
                                            </p>
                                          </Modal>
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell>Feedback</  TableCell>
                                          <TableCell component="th" scope="row">
                                            {studentFeedback?studentFeedback:<Button disabled ={feedbackbuttondisabled} variant="contained" size="small" color={'primary'} onClick={handleFeedback}>
                                              Set Feedback
                                            </Button>}
                                            <Modal
                                            style={{overflow: 'scroll'}}
                                            open={feedback}
                                            onClose={handleCloseFeedback}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                          >
                                            <p style={modalStyle} className={classes.modalpaper}>
                                            <FormControl>
                                              <h2 id="simple-modal-title">Student Feedback</h2>
                                                <div style={{width: '100%'}}> 
                                                  <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Type feedback here"  style={{width: '100%'}}  value={studentfeedbackvalue} onChange={handleStudentFeedback} />
                                                </div>
                                                <FormHelperText className={classes.helper}>{feedbackText}</FormHelperText>
                                                <Button variant="contained" size="small" color={'primary'} style={{float: 'right',width: '20%'}} onClick={saveFeedback}>
                                                  Submit
                                               </Button>
                                            </FormControl>
                                            </p>
                                          </Modal>
                                          </TableCell>
                                        </TableRow>
                                    </TableBody>
                                  </Table>
                              </TableContainer>
                          </div>
                       </Container>
                    </Paper>
                  </Grid>
               </React.Fragment>
            </Grid>
            <Backdrop className={classes.backdrop} open={loaderopen} onClick={handleLoaderClose}>
                <CircularProgress disableShrink/>
            </Backdrop>  
        </Grid>
     </div>
  </Grid>
</Paper>
</Grid>
</Container>
</main>
</div>
);
}