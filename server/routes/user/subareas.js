const {Tune} = require("@material-ui/icons");
const express = require("express");
const {SubArea} = require("../../database/schema");
const {
  createSubArea,
  getSubAreasByUserId,
  deleteSubArea,
  getSubareaById,
  updateSubarea,
  getSubareaBySubName,
} = require("../../database/subareas");
const router = express.Router();
router.get(["/", "/:id"], async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id || req.user._id;
  const subareas = await getSubAreasByUserId(id);
  if (subareas) {
    res.status(200).json({ok: true, data: subareas});
  } else {
    res.status(404).json({ok: false, data: "No existen subAreas"});
  }
});

router.get("/getSubarea/:id", async (req, res) => {
  const subarea = await getSubareaById(req.params.id);
  if (subarea) {
    res.status(200).json({ok: true, data: subarea});
  } else {
    res.status(404).json({ok: false, data: "No existe esa subareas"});
  }
});

router.get("/getSubareaP/:subarea", async (req, res) => {
  const subarea = await getSubareaBySubName(req.params.subarea);
  if (subarea) {
    res.status(200).json({ok: true, data: subarea});
  } else {
    res.status(404).json({ok: false, data: "No existe esa subareas"});
  }
});

router.post(["/", "/:userid"], async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.params.id || req.user._id;
    const subarea = await createSubArea({...data});

    res.status(200).json({ok: true, data: "Tu pagina fue creada con exito"});
  } catch (error) {
    res
      .status(400)
      .json({ok: false, data: "Ya existe una pagina bajo esa subarea"});
  }
});

router.put(["/delete", "/delete/:userid"], async (req, res) => {
  const subarea = await getSubareaById(req.body.id);

  if (req.user._id.equals(subarea.userId)) {
    try {
      console.log("entro");
      await deleteSubArea(req.body.id);
      res.status(200).json({ok: true, data: "Tu pagina fue borrada con exito"});
    } catch (error) {
      res.status(400).json({ok: false, data: "No se pudo eliminar "});
    }
  } else {
    res.status(405).json({ok: false, data: "Acceso no permitido"});
  }
});

router.put(["/editSubarea", "/editSubarea/:userid"], async (req, res) => {
  const {subareaId} = req.body;
  const subarea = await getSubareaById(subareaId);

  if (
    subarea &&
    (req.user._id.equals(subarea.userId) ||
      subarea.userId.equals(req.params.userid))
  ) {
    let subareaEdit;
    switch (req.body.type) {
      case "create":
        console.log(req.body.data);
        newArea = {
          $push: {[`${req.body.filter}`]: req.body.data},
        };

        subareaEdit = await updateSubarea(subarea._id, newArea);

        break;
      case "update":
        let send;
        if (req.body.filter === "areas") {
          send = {
            $set: {
              "areas.$": {
                area: req.body.data.area,
                id: req.body.data.id,
                cases: [
                  {
                    subarea: req.body.data.cases[0].subarea,
                    comment: req.body.data.cases[0].comment,
                  },
                ],
              },
            },
          };
        } else if (req.body.filter === "blogs") {
          send = {
            $set: {
              "blogs.$": {
                area: req.body.data.area,
                question: req.body.data.question,
                answer: req.body.data.answer,
                id: req.body.data.id,
              },
            },
          };
        } else if (req.body.filter === "solvedCases") {
          send = {
            $set: {
              "solvedCases.$": {
                area: req.body.data.area,
                title: req.body.data.title,
                comment: req.body.data.comment,
                honors: req.body.data.honors,
                id: req.body.data.id,
              },
            },
          };
        } else if (req.body.filter === "lawyers") {
          send = {
            $set: {
              "lawyers.$": {
                id: req.body.data.id,
                fullName: req.body.data.fullName,
                experience: req.body.data.experience,
                gender: req.body.data.gender,
                image: req.body.data.image,
                video: req.body.data.video,
                linkedin: req.body.data.linkedin,
                eslogan: req.body.data.eslogan,
                bio: req.body.data.bio,
                curriculum: req.body.data.curriculum,
                specialities: req.body.data.specialities,
              },
            },
          };
        } else if (req.body.filter === "testimonials") {
          send = {
            $set: {
              "testimonials.$": {
                name: req.body.data.name,
                location: req.body.data.location,
                comment: req.body.data.comment,
                id: req.body.data.id,
              },
            },
          };
        } else if (req.body.filter === "principal") {
          send = {
            $set: {
              principal: {
                title: req.body.data.title,
                description: req.body.data.description,
                comment: req.body.data.comment,
                id: req.body.data.id,
                all: req.body.data.all,
              },
            },
          };
        } else if (req.body.filter === "interviews") {
          send = {
            $set: {
              interviews: {
                direction: req.body.data.direction,
                email: req.body.data.email,
                phone: req.body.data.phone,
                video: req.body.data.video,
                whatsapp: req.body.data.whatsapp,
              },
            },
          };
        } else if (req.body.filter === "seo") {
          send = {
            $set: {
              seo: {
                title: req.body.data.title,
                description: req.body.data.description,
              },
            },
          };
        }
        subareaEdit = await SubArea.updateOne(
          {_id: subarea._id, [`${req.body.filter}.id`]: req.body.data.id},
          send
        );
        break;
      case "remove":
        subareaEdit = await SubArea.updateOne(
          {_id: subarea._id, [`${req.body.filter}.id`]: req.body.data.id},
          {$pull: {[`${req.body.filter}`]: {id: req.body.data.id}}}
        );

        break;
      default:
        break;
    }

    if (subareaEdit) {
      res.status(200).json({ok: true, data: "Subarea actualizada"});
    } else {
      res.status(400).json({ok: false, data: "Subarea no actualizada"});
    }
  } else {
    res.status(400).json({ok: false, data: "Subarea no encontrada"});
  }
});

module.exports = router;
