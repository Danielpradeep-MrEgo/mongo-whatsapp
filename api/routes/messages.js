const router = require("express").Router();
const Messages = require("../MessagesModel");
const Chat = require("../ChatModel");

// post messages
router.post("/new", async (req, res) => {
  const newMessage = Messages(req.body);

  try {
    const savedMessages = await newMessage.save();
    res.status(200).json(savedMessages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post chats

router.post("/chats/:id", async (req, res) => {
  const users = Chat({ users: req.body.users });
  try {
    const chats = await Chat.findOne({
      users: { $in: [req.params.id] && [req.body.users[1]] },
    });
    // const chats = await Chat.findOne({
    //   users: { $in: [!req.body.users[0]] && [!req.body.users[1]] },
    // });
    // if (
    //   await Chat.find({
    //     users: { $in: [req.body.users[0]] && [req.body.users[1]] },
    //   })
    // ) {
    //   res.status(500).json(chats);
    // } else {
    //   const savedPost = await users.save();
    //   res.status(200).json(savedPost);
    // }

    if (chats === null) {
      const savedPost = await users.save();
      res.status(200).json(savedPost);
    } else {
      res.status(500).json(chats);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//    "users" : ["egodomnick@gmail.com", "danielpradeep0@gmail.com"]

// get chats

router.get("/chats/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $in: [req.params.userId] },
    });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get messages

// router.get("/new/:id", async (req, res) => {
//   try {
//     const messages = await Messages.find({
//       userEmail: req.params.id,
//     });
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.get("/new/:id", async (req, res) => {
  const newMessages = await Messages.find({
    users: { $in: [req.params.id] },
  });
  try {
    // const messages = await Messages.find({});
    if (newMessages) {
      res.status(200).json(newMessages);
    } else {
      res.status(500).json(newMessages);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
