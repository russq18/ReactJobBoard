import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ReactHtmlParser from 'react-html-parser'; 

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function JobModal({job, open, handleClose}) {
    

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    if(!job.title)
    {
        return <div/>
    }
  
    return (
        <div>
          <Dialog
            open={open}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
    
            <DialogTitle className="Paper" id="alert-dialog-slide-title">
                {job.title} - 
                {job.company}
                <img className = {'detail-logo'}  alt='' src={job.company_logo} />
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                  {ReactHtmlParser(job.description)}
              </DialogContentText> 
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
              <a href={job.url} target="_blank">
              <Button color="primary">
                Apply
              </Button>
              </a>
            </DialogActions>
          </Dialog>
        </div>
      );
}