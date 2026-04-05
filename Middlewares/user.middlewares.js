const {errorResponseBody} = require("../utils/responseBody");
const {STATUS} = require("../utils/constants");

const validateUpdateUserRequest = (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
            err: "Request body is missing"
        });
    }

    const { userRole, userStatus } = req.body;

    if (!(userRole || userStatus)) {
        return res.status(STATUS.BAD_REQUEST).json({
            err: "Malformed request, please send atleast one param"
        });
    }

    next();
};

module.exports = {
    validateUpdateUserRequest
}