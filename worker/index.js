import { CronJob } from 'cron';

import fetchGithub from './Tasks/fetch-github';

new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');