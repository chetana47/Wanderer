import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Button } from 'bootstrap';
function WorkingWithArrays(){
    const API = "http://localhost:4000/a5/todos";

    const[id,setId] = useState(1);
    const[title,setTitle] = useState("NodeJS Assignment");
    const[todos,setToDos] = useState([]);
    console.log(typeof todos);
    const fetchTdosPromise =()=>{
        const promise = axios.get(API);
        console.log(promise);
        promise.then(response=>{
            console.log("hello",response.data);
            setToDos(response.data);
        });
    };
    const updateTitle = async (id, title) => {
        const response = await axios.get(`${API}/${id}/title/${title}`);
        setToDos(response.data);
        console.log("hello",response.data);
    };
    const fetchTdosAsync = async()=>{
        const response = await axios.get("http://localhost:4000/a5/todos/create");
        console.log("hello2",response.data[0]);
        setToDos(response.data[0]);
        console.log("hello3",todos);
    };
    const createTodo = async()=>{
        const response = await axios.get(API);
        setToDos(response.data);
    };
    const deleteTodo = async(id)=>{
        const response = await axios.get(`${API}/${id}/delete`);
        setToDos(response.data);
    };



    useEffect(()=>{
        // fetchTdosPromise();
        fetchTdosAsync();
    },[]);

    const [todo, setTodo] = useState({
                                         id: 1,
                                         title: "NodeJS Assignment",
                                         description: "Create a NodeJS server with ExpressJS",
                                         due: "2021-09-09",
                                         completed: false,
                                     });
    return(
        <div>
            <h1>working With Arrays</h1>
            <h3>todos from server</h3>
            <button
                className="btn btn-primary"
                onClick={() => updateTitle(id, title)}
            >
                Update Todo Title
            </button>
            <button className="btn btn-primary" onClick={createTodo}>create todos</button>
            <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <ul className="list-group">
                { todos.map((todo) => (
                    <li className="list-group-item" key={todo.id}>
                        <button
                            className="btn btn-danger float-end"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                        {todo.title}
                        <hr />
                        {todo.id}
                    </li>
                ))}
            </ul>
            <h3>extra credit</h3>

            <input
                value={todo.id}
                onChange={(e) => setTodo({
                                             ...todo, id: e.target.value })}
                className="form-control mb-2"
                type="number"
            />
            <input
                onChange={(e) => setTodo({
                                             ...todo, completed: e.target.checked })}
                type="checkbox"
            />
            <a
                href= "btn btn-primary me-2" >
                Update completed Status
            </a >



            <input
                value={todo.id}
                onChange={(e) => setTodo({
                                             ...todo, id: e.target.value })}
                className="form-control mb-2"
                type="number"
            />
            <input
                value={todo.description}
                onChange={(e) => setTodo({
                                             ...todo, description: e.target.value })}
                className="form-control mb-2"
                type="text"
            />
            <a
                href={`${API}/${todo.id}/description/${todo.description}`}
                className="btn btn-primary me-2" >
                Update description
            </a >


            <input
                value={todo.id}
                onChange={(e) => setTodo({
                                             ...todo, id: e.target.value })}
                className="form-control mb-2"
                type="number"
            />
            <input
                value={todo.title}
                onChange={(e) => setTodo({
                                             ...todo, title: e.target.value })}
                className="form-control mb-2"
                type="text"
            />
            <h3>Updating an Item in an Array</h3>
            <a
                href={`${API}/${todo.id}/title/${todo.title}`}
                className="btn btn-primary me-2" >
                Update Title to {todo.title}
            </a >


            <input
                value={todo.id}
                onChange={(e) => setTodo({
                                             ...todo, id: e.target.value })}
                className="form-control mb-2"
                type="number"
            />
            <h3>Deleting from an Array</h3>
            <a href={`${API}/${todo.id}/delete`}
               className="btn btn-primary me-2">
                Delete Todo with ID = {todo.id}
            </a >

            <h4>Creating new Items in an Array</h4>
            <a href={`${API}/create`}
               className="btn btn-primary me-2">
                Create Todo
            </a >

            <h3>Filtering Array Items</h3>
            <a href={`${API}/?completed=true`}
               className="btn btn-primary me-2" >
                Get Completed Todos
            </a >



            <h2>update title</h2>
            <input
                className="form-control"
                value = {title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <a href={`http://localhost:4000/a5/todos/${id}/title/${title}`} className="btn btn-primary">update todo</a >



            <h2>fetch item by id</h2>
            <input
                className="form-control"
                value = {id}
                onChange={(e) => setId(e.target.value)}
            />
            <a href={`http://localhost:4000/a5/todos/${id}`} className="btn btn-primary">fetch todo</a >
            <h2>fetch array</h2>
            <a href = {API}
               className="btn btn-primary">
                fetch todos
            </a >
        </div>
    );
}
export default WorkingWithArrays;