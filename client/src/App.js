import React from 'react';
import './App.css';

import Jobs from './Jobs';
import fetch from 'node-fetch';

const JOB_API_URL = 'http://localhost:3001/jobs';

async function fetchJobs(updateCallBack){
  const res = await fetch(JOB_API_URL);
  const json = await res.json();
  updateCallBack(json);
};

function App() {
  const [jobList, updateJobs] = React.useState([]);
  React.useEffect(() => {
    fetchJobs(updateJobs);
  },[])

  return (
    <div className="App">
      <Jobs jobs={jobList}/>
    </div>
  );
}

export default App;
