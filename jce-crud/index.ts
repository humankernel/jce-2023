import express from "express";
import { NotesController } from "./controllers/notes.ts";

const app = express();
app.disable("x-powered-by");

app.get("/", (req, res) => {
	res.json({ message: "👋 api created by strange-devel" });
});

app.get("/notes", NotesController.getAll);
app.get("/notes/:id", NotesController.getById);
app.post("/notes/", NotesController.create);
app.patch("/notes/:id", NotesController.update);
app.delete("/notes/:id", NotesController.delete);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`server listen on port http://localhost:${PORT}`);
});
