const USER_STATUS ={
    approved: "APPROVED",
    pending: "PENDING",
    rejected: "REJECTED"
};

const USER_ROLE = {
    customer: "CUSTOMER",
    admin: "ADMIN",
    client: "CLIENT"
};

const STATUS_CODES = {
    OK: 200,
    INTERNAL_SERVER_ERROR: 500,
    CREATED: 201,
    UNAUTHORISED: 401,
    NOT_FOUND: 404,
    BAD_REQUEST: 400 ,
    FORBIDDEN: 403,
    UNPROCESSABLE: 422,
    GONE: 410,
    PAYMENT_REQUIRED: 402
}

const BOOKING_STATUS = {
    PROCESSING: "PROCESSING",
    CANCELLED: "CANCELLED",
    SUCCESSFUL: "SUCCESSFUL",
    EXPRIED: "EXPRIED"
};

const PAYMENT_STATUS = {
    pending: "PENDING",
    failed: "FAILED",
    success: "SUCCESS"
}

module.exports = {
    USER_ROLE,
    USER_STATUS,
    STATUS: STATUS_CODES,
    BOOKING_STATUS,
    PAYMENT_STATUS,
}