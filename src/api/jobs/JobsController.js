import JobModel from './JobModel'

const JobsController  = {

    all(req, res, next) {
        JobModel.get((err, data) => {
            if (!err) {
                res.status(200).json(data)
            } else {
                res.status(500).json(err)
            }
        });
    },

    getJobById(req, res, next) {
        JobModel.findById(req.params.id,  (err, data)=> {
            if (!err) {
                res.json(data)
            } else {
                res.status(500).json(err)
            }
        });
    },

    updateJobById(req, res, next) {
        JobModel.
        findByIdAndUpdate(req.body.id, req.body.data, (err, data) => {
            if (!err) {
                res.status(200).json(data)
            } else {
                res.json(422, err)
            }
        });
    },
    deleteJobById(req, res, next) {
        console.log('deleteJobById', req.params.id);
        JobModel.
        findByIdAndRemove(req.params.id, (err, data) => {
            if (!err) {
                res.status(200).json(data)
            } else {
                res.status(422).json(err)
            }
        });
    },
    createJob(req, res, next) {
        let Job = new JobModel(req.body)
        Job.save((err, data) => {
            if (!err) {
                res.status(201).json(data)
            } else {
                return next(err)
            }
        });

    }

};
export default JobsController;
