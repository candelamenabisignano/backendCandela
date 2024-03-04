export const handlePolicies =
  (...policies) =>
  (req, res, next) => {
    const user = req.user;
    if (policies.includes(user.role)) {
      next();
    } else {
      return res.status(404).send({ status: "error", error: "no policies" });
    }
  };
export const publicAccess = (req, res, next) => {
  if (req.user != (null || undefined)) {
    return res.redirect("/products");
  } else {
    return next();
  }
};
export const privateAccess = (req, res, next) => {
  if (req.user == (null || undefined)) return res.redirect("/login");
  return next();
};
