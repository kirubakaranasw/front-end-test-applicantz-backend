const express = require("express");
const Joi = require("joi");
const router = express.Router();

const users = [
  {
    id: 1,
    firstname: "john",
    lastname: "doe",
    username: "john_doe",
    password: "12345"
  },
  {
    id: 2,
    firstname: "jason",
    lastname: "roy",
    username: "jason_roy",
    password: "12345"
  }
];

router.get("", (req, res) => {
  res.send(users);
});

router.get("/:uname", (req, res) => {
  const user = users.find(c => c.username === req.params.uname);
  if (!user) return res.status(404).send("The user is not recognized.");
  res.send(user);
});

router.get("/:uname/:pword", (req, res) => {
  const user = users.find(
    c => c.username === req.params.uname && c.password === req.params.pword
  );
  if (!user) return res.status(404).send("The user is not recognized.");
  res.send(user);
});

router.post("", (req, res) => {
  //   console.log(req.body);
  //   return;
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = {
    id: users.length + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  };
  users.push(user);
  res.send(user);
});

/*router.put("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id is not found.");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given id is not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});*/

function validateCourse(user) {
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

module.exports = router;
