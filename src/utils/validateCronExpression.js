const cron = require('node-cron');

//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

const isSaturday = cron.validate('* * * * 6');
const isSaturdayAndSevenAM = cron.validate('0 7 * * 6');

console.log(isSaturday, isSaturdayAndSevenAM);
