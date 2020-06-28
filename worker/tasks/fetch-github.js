var fetch = require('node-fetch');

var redis = require('redis');
var client = redis.createClient();

const { promisify } = require("util");
const { ALL } = require('dns');
const { Console } = require('console');
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
 
const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub(){

    console.log('Fetching Github..');
    let resultCount = 1, onPage = 0;
    const allJobs = [];

    while(resultCount > 0){
        const results = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await results.json();

        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('got ',resultCount,' jobs');
        onPage++;
    }
    console.log('got ',allJobs.length,' jobs total');

    //filter jobs
    const jrJobs = allJobs.filter(job =>{
        const jobTitle = job.title.toLowerCase();
        let isJunior = true;

        if(
            jobTitle.includes('senior')||
            jobTitle.includes('manager')||
            jobTitle.includes('sr.')||
            jobTitle.includes('architect')
        ){
            return false
        }
        return true;
    });

    console.log('filtered down to',jrJobs.length);

    //store in redis
  
   const success = await setAsync('github',JSON.stringify(jrJobs));
   console.log({success});
}
fetchGithub();
module.exports = fetchGithub;