import DBConnection from '@/database/connection';

function authentication(username, password) {
    if(
        username === 'admin' &&
        password === 'password123'
    ) return true;

    return false;
}

async function handler(req, res) {
    const { method, query } = req;
    const { username, password } = query;
    
    if(authentication(username, password)) {
        if(method === 'GET') 
            return GETHandler(req, res);
        if(method === 'POST')
            return POSTHandler(req, res);
        if(method === 'PUT')
            return PUTHandler(req, res);
        if(method === 'DELETE')
            return DELETEHandler(req, res);
    }

    return res.status(400).json();
}

async function GETHandler(request, response) {
    const DB = await DBConnection();
    const [result] = await DB.execute("SELECT * FROM todos", []);
    DB.end();
    
    return response.status(200).json({
        code: 200,
        status: "OK",
        data: result,
    })
}

async function POSTHandler(request, response) {
    const { body }  = request;
    const query     = "INSERT INTO todos VALUES(null, ?, ?, ?)";
    const DB        = await DBConnection();
    const [result]  = await DB.execute(query, [
        body.title,
        body.description,
        body.end_time,
    ]);
    DB.end();

    return response.status(200).json({
        code: 200,
        status: "OK",
        data: result,
    });
}

async function PUTHandler(request, response) {
    console.log(request);
    const { body }  = request;
    const query     = `UPDATE todos SET title=?, description=?, end_time=? WHERE id=?`;
    const DB        = await DBConnection();
    const [result]  = await DB.execute(query, [
        body.title,
        body.description,
        body.end_time,
        body.id,
    ]);
    DB.end();

    return response.status(200).json({
        code: 200,
        status: "OK",
        data: result,
    });
}

async function DELETEHandler(request, response) {
    const { body }  = request;
    console.log(request)
    const query     = "DELETE FROM todos WHERE id=?";
    const DB        = await DBConnection();
    const [result]  = await DB.execute(query, [
        body?.id
    ])
    DB.end();

    return response.status(200).json({
        code: 200,
        status: "OK",
        data: result,
    });
}

export default handler;