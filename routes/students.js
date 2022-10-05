import Router from "express";

const router = Router();

const studentsArr = ["Katie", "John", "Phillip"];

router.get("/", (req, res) =>
  res.status(200).send({
    studentsArr,
  })
);

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.status(200).send({
    student: studentsArr[id] || "Not found",
  });
});

router.post("/", (req, res) => {
  studentsArr.push(req.body.student);
  res.status(201).send({
    message: "Student added",
  });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  studentsArr.splice(id, 1);
  res.status(204).send("Deleted");
});

export default router;
