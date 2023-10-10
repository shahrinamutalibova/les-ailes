import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Button, Modal, Input, Card, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchImages, addImage, deleteImage, updateImage } from './imageSlice';

const { Header, Content, Sider } = Layout;

const Images = () => {
  const [url, setUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const images = useSelector((state) => state.images.images);
  const dispatch = useDispatch();

  useEffect(() => {
    if (images.length === 0) {
      dispatch(fetchImages());
    }
  }, [dispatch, images.length]);

  const handleAddClick = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (selectedImage) {
      await dispatch(updateImage({ id: selectedImage.id, url }));
      message.success('Image updated successfully.');
    } else {
      await dispatch(addImage(url));
      message.success('Image added successfully.');
    }
    setIsModalVisible(false);
    setUrl('');
    setSelectedImage(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUrl('');
    setSelectedImage(null);
  };

  const handleEditClick = (image) => {
    setSelectedImage(image);
    setUrl(image.url);
    setIsModalVisible(true);
  };

  const handleDeleteClick = async (id) => {
    await dispatch(deleteImage(id));
    message.success('Image deleted successfully.');
  };

  return (
    <Layout>
        <Header style={{width:"100%",display:"flex",alignItems:"center" ,justifyContent:"end",backgroundColor:"white",borderBottom:"1px solid lightgrey"}}>
          <Button style={{backgroundColor:"#FC004A",color:"white"}}  onClick={handleAddClick}>
            Add Product
          </Button>
        </Header>
        <Content>
          <div style={{ display: 'flex',width:"100%",height:"340px", flexWrap: 'wrap',backgroundColor:"white", justifyContent:"space-around",padding:"10px 60px"}}>
            {images.map((image) => (
              <Card
                style={{width:"31.5%",height:"100%",boxShadow:"0px 0px 5px 0px grey",marginTop:"12px"}}
                key={image.id}
                cover={<img  style={{ width: "200px",margin:"auto",marginTop:"10px", height: "200px"}} alt="example" src={image.url} />}
                actions={[
                    <EditOutlined key="edit" onClick={() => handleEditClick(image)} />,
                    <DeleteOutlined key="delete" onClick={() => handleDeleteClick(image.id)} />,
                  ]}
              />
            ))}
          </div>
        </Content>
      <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> 
       <br/> 
        <Input placeholder="Enter image URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      </Modal>
    </Layout>
  );
};

export default Images;
