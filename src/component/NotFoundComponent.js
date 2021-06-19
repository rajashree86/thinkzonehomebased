import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const NotFoundComponent =(props)=>{
    const useStyles = makeStyles((theme) => ({
       
        formControl: {
          margin: theme.spacing(1),
          minWidth: 200,
        },
        root: {
          flexGrow: 1,
          // display: 'flex',
        },
        container: {
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
        },
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        }
      }));
      const classes = useStyles();
      let company_url= window.location.origin;
     return (
        <React.Fragment>
            <Container maxWidth="lg" className={classes.container}>
                <Grid item xs={12}>
                    <div id="notfound">
                        <div className="notfound">
                            <div className="notfound-404">
                               <h1>Oops!</h1>
                            </div>
                                <h2>404 - Page not found</h2>
                                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                                <a href={company_url}>Go To Homepage</a>
                        </div>
                    </div>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default NotFoundComponent