const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { profile } = require("../usecase/auth");

exports.authMiddleware = (roles) => async (req, res, next) => {
    try {
        // get token from headers
        const token = getTokenFromHeaders(req?.headers);

        // extract token to get the user id
        const extractedToken = extractToken(token);

        const user = await profile(extractedToken?.id);

        if (!roles.includes(user?.role)) {
            return next({
                message: "Forbidden",
                statusCode: 403,
            });
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
