import React, { useState ,useEffect } from 'react';
import { Modal, Button, Card, Form,Row, Input } from 'antd';
import axios from 'axios';

const Todos = () => {
  const [todos, setTodos] = useState([
    { id: 1, content: 'Make coffee', completed: false },
    { id: 2, content: 'Check email', completed: false },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [button, setButton] = useState(true); 
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:5000/prices');
      const imagesResponse = await axios.get('http://localhost:5000/images');

      console.log(response.data);
      setTodos(response.data);
      setImages(imagesResponse.data); 
    };

    fetchTodos();
  }, []);

  const handleCancel = () => setIsModalVisible(false);
  const handleShow = () => setIsModalVisible(true);
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:5000/prices');
      
      console.log(response.data);
      setTodos(response.data);
    };
    
    fetchTodos();
  }, []);
  
  const handleAddTodo = async () => {
    const newTodo = {
      id: editItem || todos.length + 1, 
      content: input, 
      price: inputPrice, 
      completed: false
    };
  
    if (editItem) {
      // Update existing todo
      await axios.put(`http://localhost:5000/prices/${editItem}`, newTodo);
  
      const updatedTodos = todos.map(todo => {
        if (todo.id === editItem) {
          return {
            ...newTodo,
            id: editItem
          };
        }
  
        return todo;
      });
  
      setTodos(updatedTodos);
    } else {
      const response = await axios.post('http://localhost:5000/prices', newTodo);
  
      newTodo.id = response.data.id;
      setTodos([...todos, newTodo]);
    }
  
    handleCancel();
    setInput('');
    setInputPrice('');
    setEditItem(null);
  };
  

  const deleteTodo = async (id) => {
    const newTodos = todos.filter((x) => x.id !== id);
    setTodos(newTodos);
    await axios.delete(`http://localhost:5000/prices/${id}`);
  };

  const startEdit = (id) => {
    const todoIndex = todos.findIndex((x) => x.id === id);
    const todo = todos[todoIndex];

    setInput(todo.content);
    setInputPrice(todo.price);
    setEditItem(todo.id);
    handleShow();
  };

  return (
    <div>
      <div style={{width:"100%",display:"flex",justifyContent:"end"}}>
        <Button style={{background:"#FC004A",color:"white"}} onClick={handleShow}>
          {editItem ? 'Edit Price' : 'Add Price'}
        </Button>
      </div>
      <Modal title={editItem ? "Edit Todo" : "Enter Todo"} visible={isModalVisible} 
             onCancel={handleCancel} onOk={handleAddTodo}>
      <Input type="text" placeholder="Price" 
       onChange={(e) => setInputPrice(e.target.value)} value={inputPrice} />

      </Modal>
      <Row style={{gap:"10px",marginTop:"10px"}}>
        {todos.map((todo, index) => (
          <Card style={{width:"32.3%"}} key={todo.id} cover={
          <img style={{ width: "200px",margin:"auto",marginTop:"10px", height: "200px"}} 
               src={(images[index] && images[index].url) || ''} />}>
            <p>{todo.price}</p>
            <button style={{ background:"#FC004A",border:"none",borderRadius:"5px",
                            padding:"5px 20px",color:"white"}} 
                    onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button style={{background:"orange",border:"none",borderRadius:"5px", 
                            padding:"5px 20px",color:"white",margin:"0px 10px"}} 
                    onClick={() => startEdit(todo.id)}>Edit</button>
          </Card>
        ))}
      </Row>
    </div>
  );
};
export default Todos;
