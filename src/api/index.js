import jobs from './jobs/'

export default function(app) {
    app.use('/api/jobs', jobs)
};
