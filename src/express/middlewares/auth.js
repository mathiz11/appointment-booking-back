const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ message: "Vous devez fournir un jeton d'authentification." });
  }

  const accessToken = authorizationHeader.split(" ")[1];
  jwt.verify(
    accessToken,
    process.env.PRIVATE_JWT_KEY,
    (error, decodedToken) => {
      if (error) {
        return res.status(401).json({
          message:
            "L'utilisateur n'est pas autorisé à accéder à cette ressource",
          data: error,
        });
      }

      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        console.log("hello");
        return res.status(401).json({
          message:
            "L'utilisateur n'est pas autorisé à accéder à cette ressource",
          data: error,
        });
      }

      next();
    }
  );
}

module.exports = auth;
