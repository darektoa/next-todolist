function handler(request, response) {
    return response.json({
        code: 200,
        status: "OK",
        data: {
            appName: "Todolist",
            authorBy: "Rexensoft",
            appDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, iusto!"
        }
    })
}

export default handler; 