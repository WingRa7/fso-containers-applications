const express = require("express");
const { Todo } = require("../mongo");
const { setAsync, getAsync } = require("../redis");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  let count = await getAsync("added_todos");
  count++;
  setAsync("added_todos", count);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const update = req.body;

  try {
    const updatedToDo = await Todo.findOneAndUpdate(
      { _id: req.todo.id },
      update,
      {
        new: true,
      }
    );
    res.send(updatedToDo);
  } catch {
    res.status(404).end();
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
