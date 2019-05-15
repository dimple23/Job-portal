/* eslint-disable no-underscore-dangle */

const {
    User,
    Jobs
} = require('../models');

const handle = require('../utils/promise-handler');

// GET savedjobs '/api/savedjobs' for a user
const getSavedJobs = async (req, res) => {

    const [userErr, jobsData] = await handle(User.findById(req._id));

    if (userErr) {
        return res.json(500).json(userErr);
    }
    //jobsData obj will have all the job details listed 1-by-1
    return res.status(200).json(jobsData);

};


// CREATE/POST jobs for a user '/api/newjob'
const createNewJob = async (req, res) => {

    const [userFindErr, userProfile] = await handle(User.findById(req._id));

    if (userFindErr) {
        return res.status(500).json(userFindErr);
    }

    // create new job posting
    //   const newBookmark = userProfile.bookmarks.create(req.body);

    //   return User.findOneAndUpdate(
    //     {
    //       _id: req._id,
    //       'bookmarks.link': {
    //         $ne: req.body.link
    //       }
    //     },
    //     {
    //       $addToSet: { bookmarks: newBookmark }
    //     },
    //     {
    //       new: true
    //     }
    //   )
    //     .then(userInfo => {
    //       if (userInfo !== null) {
    //         return res.json(userInfo);
    //       }

    //       return res.json({
    //         message: 'Link already saved'
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       return res.json(err);
    //     });
};

module.exports = {
    createNewJob,
    getSavedJobs
};