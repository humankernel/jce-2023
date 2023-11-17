import postgres from "postgres";

const DEFAULT_CONFIG = {
	host: "localhost",
	user: "postgres",
	password: "1234",
	database: "notes_db",
	port: 5432,
};

const sql = postgres(DEFAULT_CONFIG);

export class NotesController {
	static getAll = async (req, res) => {
		const { name } = req.query;

		const articles = await sql`SELECT * FROM notes;`;

		const filteredArticles = articles.filter((article) =>
			article.name.toLowerCase().includes(name.toLowerCase())
		);

		return res.json(filteredArticles);
	};

	static getById = async (req, res) => {
		const { id } = req.params;
		const note = await sql`SELECT * FROM notes WHERE id = ${id}`;

		if (!note) res.status(404).json({ message: "Note not found" });

		return res.json(note);
	};
	static create = async (req, res) => {
		const result = validateArticle(req.body);

		if (result.error)
			return res
				.status(422)
				.json({ error: JSON.parse(result.error.message) });

		const { name, date, desc } = result.data;
		const [{ uuid: id }] = await sql`SELECT gen_random_uuid() uuid;`;
		await sql`
            INSERT INTO notes ("id", "name", "date", "desc")
            VALUES (${id}, ${name}, ${date}, ${desc}),
            `;
		const note = await sql`SELECT * FROM notes WHERE id = ${id}`;

		if (!note)
			return res.status(400).json({ error: "Error while creating note" });

		res.status(201).json(note);
	};
	static update = async (req, res) => {
		const result = validatePartialArticle(req.body);

		if (result.error)
			return res
				.status(422)
				.json({ error: JSON.parse(result.error.message) });

		const { id } = req.params;
		const note = await sql`SELECT * FROM notes WHERE id = ${id}`;

		const updatedNote = {
			...note,
			...result.data,
		};

		const { name, date, desc } = updatedNote;

		await sql`
            UPDATE notes
            SET name = ${name},
                date = ${date},
                desc = ${desc},
            WHERE id = ${id}
        `;

		return res.json(updatedNote);
	};
	static delete = async (req, res) => {
		const { id } = req.params;

		const result = await sql`DELETE FROM notes WHERE id = ${id}`;

		if (!result) return res.status(404).json({ message: "Note not found" });

		return res.json({ message: "Note deleted " });
	};
}
