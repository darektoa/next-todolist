'use client';

import { useEffect, useState } from "react";

async function getTodoById(id) {
    const query = 'username=admin&password=password123';
    const response = await fetch(`http://localhost:3000/api/todos/${id}?${query}`);
    const resJSON = await response.json();

    return resJSON?.data?.[0];
}


function Page({ params }) {
    const { todoId } = params;
    const [todo, setTodo] = useState({});

    useEffect(() => {
        getTodoById(todoId)
            .then(data => setTodo(data));
    }, []);

    return (
        <main className='px-5 py-10'>
            <p className="mb-4">Detail of Todo</p>
            <h1 className="text-2xl font-bold">{todo?.title}</h1>
            <small className="text-sm text-slate-500 mb-3 block">{(new Date(todo?.end_time)).toDateString()}</small>
            <p className="text-base">{todo?.description}</p>
        </main>
    )
}

export default Page;