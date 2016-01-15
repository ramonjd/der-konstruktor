import JobModel from './JobModel'

const JobsController  = {

    all(req, res, next) {
        JobModel.get((err, users) => {
            if (!err) {
                res.status(200).json(users)
            } else {
                res.status(500).json(err)
            }
        });
    },

    getJobById(req, res, next) {
        JobModel.findById(req.params.id,  (err, user)=> {
            if (!err) {
                res.json(user);
            } else {
                res.status(500).json(err)
            }
        });
    },


    updateJobById(req, res, next) {

        JobModel.
        findByIdAndUpdate(req.body.id, req.body.data, (err, user) => {
            if (!err) {
                res.status(200).json(user)
            } else {
                res.json(422, err);
            }
        });
    },
    deleteJobById(req, res, next) {
        JobModel.
        findByIdAndRemove(req.params.id, (err, user) => {
            if (!err) {
                res.status(200).json(user)
            } else {
                res.status(422).json(err)
            }
        });
    },
    createJob(req, res, next) {
        JobModel.save(req.body, (err, user) => {
            if (!err) {
                res.status(201).json(user)
            } else {
                return next(err);
            }
        });

    }

};
export default JobsController;
