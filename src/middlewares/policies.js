const { errors, jsonError } = require('../utils/system');
const Jwt = require('../utils/jwt');

const authenticated = () => {
  return (req, res, next) => {
    const authorization = req.header('authorization');
    if (!authorization) {
      return res.json(jsonError(errors.NOT_AUTHENTICATED_ERROR));
    }

    Jwt.verify(authorization)
      .then(decoded => {
        if (!decoded.success) {
          return res.json(decoded);
        }

        req.principal = decoded.result;
        return next();
      });
  };
};

const socketAuthenticated = () => {
  return (socket, next) => {

    const accessToken = socket.handshake.query && socket.handshake.query.accessToken;

    if (!accessToken) {
      const error = new Error(JSON.stringify(jsonError(errors.NOT_AUTHENTICATED_ERROR)))
      return next(error);
    }

    Jwt.verify(accessToken)
      .then(decoded => {
        if (!decoded.success) {
          const error = new Error(JSON.stringify(decoded));
          return next(error);
        }

        socket.principal = decoded.result;
        return next();
      });
  };
};

module.exports = { authenticated, socketAuthenticated };

