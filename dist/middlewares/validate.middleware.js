"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            // ZodError has 'issues' property, not 'errors'
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            return res.status(400).json({ success: false, errors });
        }
        req.body = result.data;
        next();
    };
};
exports.validateRequest = validateRequest;
