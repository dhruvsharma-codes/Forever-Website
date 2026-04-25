// import React, { useContext } from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Home from './Pages/Home'
// import Collection from './Pages/Collection'
// import About from './Pages/About'
// import Contact from './Pages/Contact'
// import Product from './Pages/Product'
// import Cart from './Pages/Cart'
// import Login from './Pages/Login'
// import PlaceOrder from './Pages/PlaceOrder'
// import Orders from './Pages/Orders'
// import Navbar from './Components/Navbar'
// import Footer from './Components/Footer'
// import SearchBar from './Components/SearchBar'
// import { ToastContainer, toast } from 'react-toastify';
// import Verify from './Pages/Verify'
// import ProfilePage from './Pages/ProfilePage'
// import AIRecommendations from './Pages/AiRecommendation'
// import SummerSale from './Pages/SummerSale'
// import ShoppingAssistant from './Components/ShoppingAssistant'
// import { ShopContext } from './Context/ShopContext'


// const App = () => {
//   const {token} = useContext(ShopContext)
//   return (
//     <div className='app px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
//       <ToastContainer/>
//       <Navbar/>
//       <SearchBar/>
//       <Routes>
//         <Route path='/' element={<Home/>} />
//         <Route path='/collection' element={<Collection/>} />
//         <Route path='/about' element={<About/>} />
//         <Route path='/contact' element={<Contact/>} />
//         <Route path='/product/:productId' element={<Product/>} />
//         <Route path='/cart' element={<Cart/>} />
//         <Route path='/login' element={<Login/>} />
//         <Route path='/place-order' element={<PlaceOrder/>} />
//         <Route path='/orders' element={<Orders/>} />
//         <Route path='/verify' element={<Verify/>} />
//         <Route path='/profile' element={<ProfilePage />} />
        
// <Route path='/ai-recommendations' element={<AIRecommendations />} />
       
// <Route path='/summer-sale' element={<SummerSale />} />
//       </Routes>
//       {token && (
// <ShoppingAssistant/>
//       )}
//       <Footer/>
//     </div>
//   )
// }

// export default App






















import React, { useContext, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import SearchBar from './Components/SearchBar'
import { ToastContainer } from 'react-toastify'
import { ShopContext } from './Context/ShopContext'

// ── Lazy-loaded pages ──────────────────────────────────────────────────────
const Home            = lazy(() => import('./Pages/Home'))
const Collection      = lazy(() => import('./Pages/Collection'))
const About           = lazy(() => import('./Pages/About'))
const Contact         = lazy(() => import('./Pages/Contact'))
const Product         = lazy(() => import('./Pages/Product'))
const Cart            = lazy(() => import('./Pages/Cart'))
const Login           = lazy(() => import('./Pages/Login'))
const PlaceOrder      = lazy(() => import('./Pages/PlaceOrder'))
const Orders          = lazy(() => import('./Pages/Orders'))
const Verify          = lazy(() => import('./Pages/Verify'))
const ProfilePage     = lazy(() => import('./Pages/ProfilePage'))
const AIRecommendations = lazy(() => import('./Pages/AiRecommendation'))
const SummerSale      = lazy(() => import('./Pages/SummerSale'))

// ── Lazy-loaded components (heavy) ────────────────────────────────────────
const ShoppingAssistant = lazy(() => import('./Components/ShoppingAssistant'))

// ── Page loading fallback ──────────────────────────────────────────────────
const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--cream)',
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Animated logo mark */}
      <div style={{
        width: 48,
        height: 48,
        border: '2.5px solid var(--cream-deeper)',
        borderTopColor: 'var(--terra)',
        borderRadius: '50%',
        animation: 'spin 0.85s linear infinite',
      }} />
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--mist)',
      }}>
        Loading
      </p>
    </div>
  </div>
)

const App = () => {
  const { token } = useContext(ShopContext)

  return (
    <div className='app px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.84rem',
          borderRadius: '12px',
          border: '1.5px solid var(--cream-deeper)',
          boxShadow: 'var(--shadow-md)',
        }}
      />

      <Navbar />
      <SearchBar />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/'                   element={<Home />} />
          <Route path='/collection'         element={<Collection />} />
          <Route path='/about'              element={<About />} />
          <Route path='/contact'            element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart'               element={<Cart />} />
          <Route path='/login'              element={<Login />} />
          <Route path='/place-order'        element={<PlaceOrder />} />
          <Route path='/orders'             element={<Orders />} />
          <Route path='/verify'             element={<Verify />} />
          <Route path='/profile'            element={<ProfilePage />} />
          <Route path='/ai-recommendations' element={<AIRecommendations />} />
          <Route path='/summer-sale'        element={<SummerSale />} />
        </Routes>
      </Suspense>

      {/* Shopping assistant — only when logged in */}
      {token && (
        <Suspense fallback={null}>
          <ShoppingAssistant />
        </Suspense>
      )}

      <Footer />
    </div>
  )
}

export default App