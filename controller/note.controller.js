const Note = require("../model/note.model");

// create and save a new note
exports.create = (req, res) => {
  // validate the request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note can not be empty pleas enter the note content",
    });
  }
  //create note
  const note = new Note({
    title: req.body.title || "untitled note",
    content: req.body.content,
  });

  // save the created note
  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: message.err || "Some error occurred while creating the note",
      });
    });
};

// Retrieve all the notes from database

exports.findAll = (req, res) => {
  Note.find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message: message.err || "some error occurred while retrieving notes",
      });
    });
};

// find a single note with noteID

exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id" + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind == "ObjectId") {
        return res.status(400).send({
          message: message.err || "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message:
          message.err || "Error retrieving note id with " + req.body.noteId,
      });
    });
};

// Update a note and update it with request body

exports.update = (req, res) => {
  // validate request

  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  //   Find the note and update the content of note
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || "Untitled note",
      content: req.body.content,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      res.status(500).send({
        message: message.err,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId,
      });
    });
};
