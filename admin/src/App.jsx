// import React, { useEffect, useState } from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Navbar from './Components/Navbar'
// import Sidebar from './Components/Sidebar'
// import Add from './Pages/Add'
// import List from './Pages/List'
// import Orders from './Pages/Orders'
// import Login from './Components/Login'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// export const backendUrl = import.meta.env.VITE_BACKEND_URL
// // export const backendUrl = 'https://forever-website-admin-coral.vercel.app/'
// export const currency = '₹'

// const App = () => {
 
  
//   const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  
//   useEffect(() => {
//       // localStorage.setItem('token',token)
//   if (token) {
//     localStorage.setItem("token", token)
//   } else {
//     localStorage.removeItem("token")
//   }
// }, [token])

 
//   return (
//     <div className='min-h-screen bg-gray-50'>
//       <ToastContainer/>
//       {token === ""
//         ?
//         <Login setToken={setToken} />
//         :
//         <>
//           <Navbar setToken={setToken} />
//           <hr className='bg-gray-300 border-gray-300' />
//           <div className='flex w-full'>
//             <Sidebar />
//             <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
//               <Routes>
//                 <Route path='/add' element={<Add token={token} />} />
//                 <Route path='/list' element={<List token={token} />} />
//                 <Route path='/orders' element={<Orders token={token} />} />
//               </Routes>
//             </div>
//           </div>
//         </>
//       }


//     </div>
//   )
// }

// export default App












import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ─── FIX: strip trailing slash so URLs never become //api/... ────────────────
const rawUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
export const backendUrl = rawUrl.replace(/\/$/, '')   // remove trailing slash if present

export const currency = '₹'

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])

    return (
        <div className='bg-gray-50 min-h-screen'>
            <ToastContainer />
            {token === ''
                ? <Login setToken={setToken} />
                : <>
                    <Navbar setToken={setToken} />
                    <hr />
                    <div className='flex items-start'>
                        <Sidebar />
                        <div className='w-full'>
                            <Routes>
                                <Route path='/add'    element={<Add token={token} />} />
                                <Route path='/list'   element={<List token={token} />} />
                                <Route path='/orders' element={<Orders token={token} />} />
                            </Routes>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default App


