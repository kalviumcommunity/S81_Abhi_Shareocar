export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
  if (!result.success) {
    return res.status(400).json({ message: 'Validation failed', errors: result.error.issues });
  }
  const { body, query, params } = result.data;
  if (body) req.body = body;
  if (query) req.query = query;
  if (params) req.params = params;
  next();
};
