import DBConnection from '@/database/connection';

async function handler(request, response) {
    const { query } = request;
    const DB        = await DBConnection();
    const [result]  = await DB.execute("SELECT * FROM todos WHERE id=?", [
        query.todoId
    ]);
    DB.end();
    
    return response.status(200).json({
        code: 200,
        status: "OK",
        data: result,
    })
}

export default handler;