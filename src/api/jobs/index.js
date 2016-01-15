import express from 'express';
import JobsController from './JobsController';

let router = express.Router();
router.get('/', JobsController.all);
router.get('/:id', JobsController.getJobById);
router.post('/', JobsController.createJob);
router.delete('/:id', JobsController.deleteJobrById);
router.put('/', JobsController.updateJobById);

module.exports = router;