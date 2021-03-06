import { Router } from "../deps.ts";
import notes from "../schema/notesSchema.ts";
const router = new Router();
router.get("/notes/:id", async (ctx) => {
    const notesId = ctx.params.id;
    let response;
    try {
        response = await notes.findOne({ _id: { $oid: notesId } });
    }
    catch (err) {
        ctx.throw(500, Deno.env.get("DENO_ENV") === "development" ? err : "Something went wrong");
    }
    if (!response)
        ctx.throw(404, "Notes not found");
    ctx.response.body = {
        notes: { ...response, _id: response._id.$oid },
    };
});
router.get("/notes", async (ctx) => {
    //TODO validate the user before sending the data to the user
    //TODO create a relation for the report to the user
    let response;
    try {
        response = await notes.find();
    }
    catch (err) {
        ctx.throw(500, Deno.env.get("DENO_ENV") === "development" ? err : "Something went wrong");
    }
    ctx.response.body = {
        notes: response,
    };
});
router.post("/notes/add", async (ctx) => {
    if (!ctx.request.hasBody) {
        ctx.throw(400, "Invalid data passed, check the data and try again");
    }
    //TODO check whether the body response is json or some other using if check and parse the response accordingly
    const json = await ctx.request.body();
    const data = json.value;
    //TODO validate inputs before processing. Create a separate function to do all these work
    if (!data || !data.search || !data.source || !data.content || !data.title)
        ctx.throw(400, "Invalid data passed, check the data and try again");
    const newNotes = {
        title: data.title,
        search: data.search,
        source: data.source,
        content: data.content,
    };
    let noteId;
    try {
        noteId = await notes.insertOne(newNotes);
    }
    catch (err) {
        ctx.throw(500, Deno.env.get("DENO_ENV") === "development" ? err : "Something went wrong");
    }
    ctx.response.body = { noteId, message: "new notes saved" };
});
router.patch("/notes/:id", async (ctx) => {
    const notesId = ctx.params.id;
    if (!ctx.request.hasBody) {
        ctx.throw(400, "Invalid data passed, check the data and try again");
    }
    const json = await ctx.request.body();
    const data = json.value;
    if (!data || !data.search || !data.source || !data.content || !data.title)
        ctx.throw(400, "Invalid data passed, check the data and try again");
    let response;
    try {
        response = await notes.updateOne({
            _id: { $oid: notesId },
        }, {
            $set: {
                search: data.search,
                title: data.title,
                source: data.source,
                content: data.content,
            },
        });
    }
    catch (err) {
        ctx.throw(500, Deno.env.get("DENO_ENV") === "development" ? err : "Something went wrong");
    }
    ctx.response.body = { response, message: "note updated successfully" };
});
router.delete("/notes/:id", async (ctx) => {
    const notesId = ctx.params.id;
    let response;
    try {
        response = await notes.deleteOne({ _id: { $oid: notesId } });
    }
    catch (err) {
        ctx.throw(500, Deno.env.get("DENO_ENV") === "development" ? err : "Something went wrong");
    }
    if (!response)
        ctx.throw(404, "note delete failed");
    ctx.response.body = { message: "note deleted successfully", response };
});
export default router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90ZXNSb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3Rlc1JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBR3BDLE9BQU8sS0FBSyxNQUFNLDBCQUEwQixDQUFDO0FBRTdDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBRTlCLElBQUksUUFBUSxDQUFDO0lBQ2IsSUFBSTtRQUNGLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzVEO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixHQUFHLENBQUMsS0FBSyxDQUNQLEdBQUcsRUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQzFFLENBQUM7S0FDSDtJQUNELElBQUksQ0FBQyxRQUFRO1FBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUVqRCxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRztRQUNsQixLQUFLLEVBQUUsRUFBRSxHQUFHLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7S0FDL0MsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFF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