import React, {lazy, Suspense} from "react";
import {Routes, Route} from 'react-router-dom';

const Layout = lazy(() => import('../components/layout'));
const Posts = lazy(() => import('../features/images/Images'));
const Users = lazy(() => import('../features/images/price'))
const Todos = lazy(() => import('../features/images/todos'));

const Routing = () => <Suspense fallback={'Loading'}>
    <Routes>
        <Route path={'/'} element={<Layout/>} >
            <Route path={'/posts'} element={<Posts/>}/>
            <Route path={'/users'} element={<Users/>}/>
            <Route path={'/todos'} element={<Todos/>}/>
        </Route>
    </Routes>
</Suspense>

export default Routing