export const transformCourseData = (req, res, next) => {
    const safeParseArray = (value) => {
        try {
            return typeof value === "string" ? JSON.parse(value) : value;
        }
        catch {
            return [];
        }
    };
    // If data is sent as a JSON string in 'data' field, parse it
    if (req.body.data && typeof req.body.data === 'string') {
        try {
            req.body = { ...JSON.parse(req.body.data) };
        }
        catch (error) {
            return next(new Error('Invalid JSON in data field'));
        }
    }
    req.body = {
        ...req.body,
        keyAreas: safeParseArray(req.body.keyAreas),
        outcomes: safeParseArray(req.body.outcomes),
        jobRoles: safeParseArray(req.body.jobRoles),
        industries: safeParseArray(req.body.industries),
        cost: req.body.cost ? Number(req.body.cost) : undefined,
        paid: req.body.paid === "true" || req.body.paid === true,
        // multer puts file here
        // thumbnail: req.file,
    };
    next();
};
