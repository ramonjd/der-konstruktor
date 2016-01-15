import JobModel from './JobModel'

const JobsController  = {

    all(req, res, next) {
        JobModel.get((err, jobs) => {
            if (!err) {
                res.status(200).json(jobs)
            } else {
                res.status(500).json(err)
            }
        });
    },

    getJobById(req, res, next) {
        JobModel.findById(req.params.id,  (err, job)=> {
            if (!err) {
                res.json(job);
            } else {
                res.status(500).json(err)
            }
        });
    },

    updateJobById(req, res, next) {
        JobModel.
        findByIdAndUpdate(req.body.id, req.body.data, (err, job) => {
            if (!err) {
                res.status(200).json(job)
            } else {
                res.json(422, err);
            }
        });
    },
    deleteJobById(req, res, next) {
        JobModel.
        findByIdAndRemove(req.params.id, (err) => {
            if (!err) {
                res.status(200)
            } else {
                res.status(422).json(err)
            }
        });
    },
    createJob(req, res, next) {
        let Job = new JobModel(req.body)
        Job.save((err, jobs) => {
            if (!err) {
                res.status(201).json(jobs)
            } else {
                return next(err);
            }
        });

    }

};
export default JobsController;
