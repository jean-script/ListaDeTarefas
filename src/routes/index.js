import { Route, Routes } from 'react-router-dom'

import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Admin from '../Pages/admin'

import Private from './Private'

function RouteApp(){
    return(
        <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/register' element={ <Register/> } />


            <Route path="/admin" element={ <Private> <Admin/> </Private> } />

        </Routes>
    )
}

export default RouteApp;
