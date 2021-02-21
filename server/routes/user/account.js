const express = require("express");
const {getUserByEmail, updateUser} = require("../../database/user");
const {createToken, expireToken, verifyToken} = require("../../database/token");
const {signToken, decodeToken, hashPassword} = require("../../auth/utils");
const {getEmailData} = require("../../../utils/emails");
const {sendEmail} = require("../../email");

const router = express.Router();

/**
 *  Token validation
 */
const validateToken = async (req, res, next) => {
  function tokenError() {
    return res
      .status(400)
      .json({ok: false, data: "Token experido o no es valido"});
  }

  const token = req.params.token;
  const decodedToken = decodeToken(token);

  if (!token || !decodedToken || !(await verifyToken(decodedToken.data._id)))
    tokenError();
  else {
    req.tokenData = decodedToken.data;
    next();
  }
};

/**
 * Checking if the token is valid
 */

router.get("/:token", validateToken, (req, res) => {
  res.status(200).json({ok: true, data: "Token valido"});
});

/**
 * Route for handling reset or verify email requests
 */

router.post("/:emailOperationId", async (req, res) => {
  const {emailOperationId} = req.params;
  const emailData = getEmailData(emailOperationId);
  if (!emailData)
    return res.status(400).json({ok: false, data: "Bad correo request"});

  const {email} = req.body;
  if (!email) return res.status(400).json({ok: false, data: "Correo invalido"});
  const user = await getUserByEmail(email);
  if (!user) {
    return res
      .status(400)
      .json({ok: false, data: "No existe usuario con este email"});
  }

  const token = await createToken(user._id, emailData.id);
  if (!token) {
    return res.status(500).json({ok: false, data: "Error creando un token"});
  }

  const tokenUrl = signToken(token);

  const {ok, data} = await sendEmail(emailData, tokenUrl, user.email);

  return res.status(ok ? 200 : 500).json({ok, data});
});

/**
 * Update password route
 */

router.put("/passwordreset/:token", validateToken, async (req, res) => {
  const {password} = req.body;
  if (!password || password.length < 5) {
    return res.status(400).json({
      ok: false,
      data: "La contraseña debe estar entre 5 y 20 caracteres.",
    });
  }
  const updatedUser = await updateUser(req.tokenData.userId, {
    password: await hashPassword(password),
  });
  if (updatedUser) {
    await expireToken(req.tokenData._id);
    return res
      .status(200)
      .json({ok: true, data: "Contraseña cambiada correctamente"});
  }

  return res
    .status(500)
    .json({ok: false, data: "Error cambiando la contraseña"});
});

router.put("/emailverify/:token", validateToken, async (req, res) => {
  const updatedUser = await updateUser(req.tokenData.userId, {
    emailVerified: true,
  });

  if (updatedUser) {
    await expireToken(req.tokenData._id);
    return res
      .status(200)
      .json({ok: true, data: "Correo verificado corractamente"});
  }

  return res.status(500).json({ok: false, data: "Error verificando el correo"});
});

module.exports = router;
