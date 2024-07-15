import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';

let routers = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<Home/> },
    {path:'*',element:<NotFound/>}
  ]}
])
function App() {
  return <>
    <RouterProvider router={routers} ></RouterProvider>
  </>
}

export default App;
