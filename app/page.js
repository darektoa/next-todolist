'use client';
import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/next-js';
import {
    Box,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    StackDivider,
    Text
} from '@chakra-ui/react';

async function getTodos() {
    const query = 'username=admin&password=password123';
    const response = await fetch(`http://localhost:3000/api/todos?${query}`);
    const resJSON = await response.json();

    return resJSON?.data;
}

async function deleteTodoById(id) {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("id", id);

    const query = 'username=admin&password=password123';
    const response = await fetch(`http://localhost:3000/api/todos?${query}`, {
        method: 'DELETE',
        headers: headers,
        body: urlencoded,
    });
    const resJSON = await response.json();

    return resJSON?.data;
}

function Page() {
    const [currentTodo, setCurrentTodo] = useState({});
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [todos, setTodos] = useState(
        JSON?.parse(localStorage.getItem('todos') || '[]')
    );

    function randomId() {
        return Math.round(Math.random()*10_000_000);
    }

    function handleEditTodo(todoIndex) {
        setIsEditOpen(todoIndex);
        setCurrentTodo(todos[todoIndex]);
    }

    function handleDeleteTodo(todoId) {
        const tempTodos = Array.from(todos);
        const result = tempTodos
            .map(todo => todo?.id === todoId ? null : todo)
            .filter(todo => todo !== null);

        deleteTodoById(todoId).then(data => console.log(data));
        setTodos(result);
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(todos);
    }, [todos]);

    useEffect(() => {
        getTodos()
            .then(data => setTodos(data));
    }, []);

    return (
        <main className='px-5 py-10'>
            <Card>
                <CardHeader className='flex items-center'>
                    <Heading size='lg'>My Todo-List</Heading>
                    <Button
                        className='ml-auto'
                        colorScheme="blue"
                        onClick={() => {
                            setIsCreateOpen(true)
                        }}
                    >
                        Add Todo
                    </Button>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>

                        {todos.map((todo, index) => (
                            <Box key={`todo-item-${index}`} className='flex'>
                                <Box className='flex flex-col'>
                                    <Heading size='md' textTransform='uppercase'>
                                        <Link href={`/todo/${todo?.id}`}>
                                            {todo?.title}
                                        </Link>
                                    </Heading>
                                    <Text fontSize='xs'>
                                        Deadline: {(new Date(todo?.end_time))?.toDateString?.()}
                                    </Text>
                                    <Text pt='2' fontSize='md'>
                                        {todo?.descriptionription}
                                    </Text>
                                </Box>

                                <Box className='ml-auto flex items-center'>
                                    <Button
                                        className='ml-2'
                                        colorScheme="yellow"
                                        onClick={() => handleEditTodo(index)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className='ml-2'
                                        colorScheme="red"
                                        onClick={() => handleDeleteTodo(todo?.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        ))}

                    </Stack>
                </CardBody>
            </Card>


            { /* MODAL CREATE TODO */ }
            <Modal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Todo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input 
                                placeholder='Title'
                                onInput={(e) => {
                                    setCurrentTodo((todo) => ({
                                        ...todo,
                                        title: e.target.value,
                                    }))
                                }} 
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input 
                                placeholder='Description'
                                onInput={(e) => {
                                    setCurrentTodo((todo) => ({
                                        ...todo,
                                        description: e.target.value,
                                    }))
                                }}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>End Time</FormLabel>
                            <Input
                                type='datetime-local'
                                onInput={(e) => {
                                    setCurrentTodo((todo) => ({
                                        ...todo,
                                        end_time: (new Date(e.target.value)).getTime(),
                                    }))
                                }} 
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => {
                                setTodos((todos) => ([
                                    ...todos,
                                    {
                                        id: randomId(),
                                        ...currentTodo,
                                    },
                                ]))
                                setIsCreateOpen(false)
                                setCurrentTodo({});
                            }}
                        >
                            Save
                        </Button>
                        <Button 
                            onClick={() => setIsCreateOpen(false)}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            { /* MODAL EDIT TODO */ }
            <Modal
                isOpen={isEditOpen !== false}
                onClose={() => setIsEditOpen(false)}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Todo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input 
                                defaultValue={currentTodo?.title}
                                placeholder='Title'
                                onInput={(e) => {
                                    setCurrentTodo((todo) => ({
                                        ...todo,
                                        title: e.target.value,
                                    }))
                                }} 
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input 
                                defaultValue={currentTodo?.description}
                                placeholder='Description'
                                onInput={(e) => {
                                    setCurrentTodo((todo) => ({
                                        ...todo,
                                        description: e.target.value,
                                    }))
                                }}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>End Time</FormLabel>
                            <Input
                                defaultValue={currentTodo?.end_time}
                                type='datetime-local'
                                onInput={(e) => {
                                    setCurrentTodo((todo) => ({
                                        ...todo,
                                        end_time: new Date(e.target.value),
                                    }))
                                }} 
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => {
                                const newTodos = Array.from(todos);
                                newTodos[isEditOpen] = currentTodo;
                                setTodos(newTodos);
                                setIsEditOpen(false)
                            }}
                        >
                            Save
                        </Button>
                        <Button 
                            onClick={() => setIsEditOpen(false)}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </main>
    )
}

export default Page;
