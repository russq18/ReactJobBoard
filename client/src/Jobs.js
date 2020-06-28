import React from 'react'
import Job from './Job';
import JobModal from './JobModal';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default function Jobs({jobs}){

    //Modal Event Handles
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});
    function handleClickOpen(){
        setOpen(true);
    }
    function handleClose(){
        setOpen(false);
    }

    //Pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 50,(activeStep * 50)+50);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    
    console.log('Job is ',jobs[0]);
    return(
        <div className ="jobs">
            <JobModal style={{width: 2000}} open = {open} job = {selectedJob} handleClose ={handleClose}/>
            <Typography variant ="h4" component = "h1">
               Entry Level Software Jobs
            </Typography>
            <Typography variant ="h6" component = "h1">
               Found {numJobs} Jobs
            </Typography>
            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={() => { 
                        handleClickOpen();
                        selectJob(job) 
                    }}/>
                )
            }
            <div>
                Page {activeStep + 1} of {numPages}
            </div>
            <MobileStepper
                className="stepper"
                steps={numPages}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 50 - 1}>
                    Next
                    <KeyboardArrowLeft />
                </Button>
                }
                backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowRight />
                    Back
                </Button>
                }
            />
        </div>
    );

}