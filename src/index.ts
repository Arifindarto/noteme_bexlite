import { Elysia, t } from "elysia";
import { client } from "./models/client";

const app = new Elysia()
  .get("/notes", () => {
    const allNotes = client.query("SELECT * FROM notes").all();

    return { data: allNotes };
  })
  .post(
    "/notes",
    ({ body }) => {
      const { content } = body;

      const createNote = client.query("INSERT INTO notes (content) VALUES (?)").run(content);

      return { message: `Create note succes` };
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    }
  )
  .delete("/notes/:id", ({ params }) => {
    const deleteNote = client.query("DELETE FROM notes WHERE id = ?").run(params.id);

    return { message: `Note with id ${params.id} has been deleted` };
  })
  .patch(
    "/notes/:id",
    ({ params, body }) => {
      const { id } = params;
      const { content } = body;

      client.query("UPDATE notes SET content = ? WHERE id = ?").run(content, id);

      const updatedNote = client.query("SELECT * FROM notes WHERE id =?").all(id);

      return { message: `Note with id ${params.id} has been updated` };
    },
    {
      body: t.Object({
        content: t.String(),
      }),
    }
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
