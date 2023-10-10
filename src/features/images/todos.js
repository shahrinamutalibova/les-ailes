import React, { useState ,useEffect } from 'react';
import { Modal, Button, Card, Row , Input } from 'antd';
import axios from 'axios';
import { useSelector  } from 'react-redux';

const Todos = () => {
  const [todos, setTodos] = useState([
    { id: 1, content: 'Make coffee', completed: false },
    { id: 2, content: 'Check email', completed: false },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const images = useSelector((state) => state.images.images);
  const [editItem, setEditItem] = useState(null);

  const handleCancel = () => {
    setIsModalVisible(false);
    setInput('');
    setEditItem(null);
  };
 
  const handleShow = (todo = null) => {
    if (todo !== null) {
      setInput(todo.content);
      setEditItem(todo.id);
    }
    setIsModalVisible(true);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:5000/texts');
      setTodos(response.data);
    };

    fetchTodos();
  }, []);
  
  const handleAddTodo = async () => {
    let newTodo = { 
      content: input, 
      completed: false
    };
  
    if (editItem === null) {
      // post for creating new todo
      const response = await axios.post('http://localhost:5000/texts', newTodo);
      if (response.data && response.data.id) {
        setTodos([...todos, {...newTodo, id: response.data.id}]);
      }
    } else {
      // update existing todo
      newTodo.id = editItem;
      await axios.put(`http://localhost:5000/texts/${editItem}`, newTodo);
      const updatedTodos = todos.map(todo => todo.id === editItem ? newTodo : todo);
      setTodos(updatedTodos);
    }
  
    handleCancel();
  };
  
  const startEdit = (id) => {
    const todo = todos.find(todo => todo.id === id);
    handleShow(todo);
  };

  const deleteTodo = async (id) => {
    const newTodos = todos.filter((x) => x.id !== id);
    setTodos(newTodos);
    await axios.delete(`http://localhost:5000/texts/${id}`);
  };


  return (
    <div>
     <div style={{width: "100%", display: "flex", justifyContent: "end"}}>
     <Button style={{background:"#FC004A",color:"white"}} onClick={() => handleShow()}>Add Food Name</Button>
     </div>
      <Modal title="Enter Todo" visible={isModalVisible} onCancel={handleCancel} 
             onOk={handleAddTodo}>
        <Input type="text" placeholder="Todo" onChange={(e) => setInput(e.target.value)} 
               value={input} />
      </Modal>
      <Row style={{gap:"10px",marginTop:"10px"}}>
      {todos.map((todo, index) => (
        <Card
          style={{width:"32.3%"}}
          key={todo.id}
          cover={
            <img 
              style={{ width: "200px",margin:"auto",marginTop:"10px", height: "200px"}} 
              src={(images[index] && images[index].url) || ''} 
            />
          }
        >
          <p>{todo.content}</p>
          <button
            style={{
              background:"#FC004A",
              border:"none",
              borderRadius:"5px",
              padding:"5px 20px",
              color:"white"
            }} 
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
          <button
            style={{
              background:"#F7A900",
              border:"none",
              borderRadius:"5px",
              padding:"5px 20px",
              color:"white",
              margin:"0px 10px"
            }} 
            onClick={() => startEdit(todo.id)}
          >
            Update
          </button>
        </Card>
      ))}
      </Row>
    </div>
  );
};

export default Todos;
