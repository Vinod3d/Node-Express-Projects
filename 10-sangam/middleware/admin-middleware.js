const isAdminUser = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "You are not an admin user.",
        });
    }
    next(); // Proceed to the next middleware or route handler
};

export default isAdminUser;
 