const express = require("express");
const {
  getAllUsers,
  getUsersByField,
  deleteUser,
  getUserById,
} = require("../../database/user");
const { deleteCampaignByUserId } = require("../../database/campaign");
const { deleteSessionsByUserId } = require("../../database/sessions");
const {
  getWebsiteByUserId,
  deleteWebsiteByUserId,
  updateWebsite,
} = require("../../database/website");
const router = express.Router();

const getAllInfo = async (list) => {
  return Promise.all(list.map((user) => getWebsiteByUserId(user._id)));
};

// Getting all the users
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    if (users !== null && users.length > 0) {
      const websites = await getAllInfo(users);

      data = users.map((user, index) => {
        const { createdAt, url, basic, isCompleted, aboutUs } = websites[index];
        return {
          user,
          website: { createdAt, url, basic, isCompleted, aboutUs },
        };
      });
      return res.json({ ok: true, data });
    }
    return res.status(404).json({ ok: false, data: null });
  } catch (error) {
    return res.status(500).json({ ok: false, data: null });
  }
});

// Gettin all users that are suscribed

router.get("/subs", async (req, res) => {
  try {
    const users = await getUsersByField("sub", "NOT_NULL");

    if (!users)
      return res.status(404).json({
        ok: false,
        data: "No se encontro ningun usuario suscrito a un plan",
      });

    const websites = await getAllInfo(users);

    data = users.map((user, index) => {
      const { createdAt, url, basic, lawyers, aboutUs } = websites[index];
      return { user, website: { createdAt, url, basic, lawyers, aboutUs } };
    });

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({ ok: false, data: null });
  }
});

// Getting all the churn

router.get("/churn", async (req, res) => {
  try {
    const users = await getUsersByField("churn", "NOT_NULL");

    if (users !== null && users.length > 0) {
      const websites = await getAllInfo(users);

      data = users.map((user, index) => {
        const { createdAt, url, basic } = websites[index];
        return { user, website: { createdAt, url, basic } };
      });
      return res.json({ ok: true, data });
    } else return res.status(404).json({ ok: true, data: [] });
  } catch (error) {
    return res.status(500).json({ ok: false, data: null });
  }
});

// Delete A User
/**
 * I need to delete on:
 * sessions
 * campaigns
 * website
 * user
 * Delete Customer From Stripe
 */
router.delete("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    if (!userid)
      return res
        .status(400)
        .json({ ok: false, data: "No se pudo encontrar una id para eliminar" });

    if (userid == req.user._id) {
      return res.status(400).json({
        ok: false,
        data: "No se puede eliminar la cuenta del administrador",
      });
    }

    const user = await getUserById(userid);
    if (user) {
      await deleteSessionsByUserId(userid);
      await deleteCampaignByUserId(userid);
      await deleteWebsiteByUserId(userid);
      await deleteUser(userid);

      return res.json({
        ok: true,
        data: "El usuario ha sido eliminado con exito",
      });
    }
    return res
      .status(400)
      .json({ ok: false, data: "El usuario a eliminar no existe" });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ ok: false, data: "Error al eliminar el usuario" });
  }
});

router.delete("/lawyer/:userId/:lawyerId", async (req, res) => {
  const { userId, lawyerId } = req.params;
  if (!userId || !lawyerId)
    return res.status(400).json({
      ok: false,
      data: "No se pudo encontrar el abogado para eliminar",
    });

  try {
    const user = await getUserById(userId);
    if (user) {
      const website = await getWebsiteByUserId(userId);
      if (website) {
        const newLawyers = website.lawyers.filter(
          (item) => item.id != lawyerId
        );

        await updateWebsite(website._id, { lawyers: newLawyers });
        return res.json({ ok: true, data: "Se ha eliminado el abogado" });
      } else {
        return res.status(400).json({
          ok: false,
          data: "Error al tratar encontrar la informacion del sitio web",
        });
      }
    } else {
      return res.status(400).json({
        ok: false,
        data: "Error al tratar encontrar la informacion de usuario",
      });
    }
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ ok: false, data: "Error al eliminar el abogado" });
  }
});

module.exports = router;
