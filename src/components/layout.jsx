import React, { useState } from 'react';
import { DollarCircleFilled, FileImageFilled, FileTextFilled, MenuFoldOutlined,MenuUnfoldOutlined,UploadOutlined,UserOutlined,VideoCameraOutlined,} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import {useNavigate, Outlet} from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const LayoutBar = () =>  {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{height:'100vh',background:"white"}}>
            <Sider className="shadow" style={{background:"white",color:"#FC004A"}} trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical text-center" > <img style={{width:"100%",margin:"20px 5px"}} src="https://lesailes.uz/_next/image?url=%2Fassets%2Fmain_logo.svg&w=640&q=75" alt="" /> </div>
                <Menu
                    theme="white"
                    mode="inline"
                    color='#FC004A'
                    defaultSelectedKeys={['1']}
                    onClick={(item)=> navigate(item.key) }
                    items={[
                        {
                            key: '/posts',
                            icon: <FileImageFilled  style={{color:"#FC004A"}}/>,
                            label: 'Images',
                        },
                        {
                            key: '/todos',
                            icon: <FileTextFilled  style={{color:"#FC004A"}}/>,
                            label: 'Texts',
                        },
                        {
                            key: '/users',
                            icon: <DollarCircleFilled style={{color:"#FC004A"}}/>,
                            label: 'Prices',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header className="shadow"
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            color:"#FC004A"
                        }}
                    />
                </Header>
                <Content className="shadow"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        overflow:'auto'
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default LayoutBar;