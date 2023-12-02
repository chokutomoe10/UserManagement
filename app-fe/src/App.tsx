import { Routes, Route, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import Dashboard from './pages/Dashboard'
import { UserManagement } from './pages/UserManagement'
import { ProductManagement } from './pages/ProductManagement'
import { useEffect } from 'react'
import { API, setAuthToken } from './lib/api'
import { useDispatch } from 'react-redux'
import { AUTH_CHECK } from './stores/rootReducer'

export default function App() {
  // const [userRole, setUserRole] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getUser = async () => {
    try {
      setAuthToken(localStorage.token)
      const response = await API.get('/auth/check')
      // setUserRole(response.data.user.role)
      dispatch(AUTH_CHECK(response.data.user))
    } catch (error) {
      navigate("/login")
      console.error('error get user', error);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      {localStorage.token == null ?
      <Routes>
        <Route path='/login' element={<Login/>}/>
      </Routes> :
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/usermanagement' element={<UserManagement />} />
        <Route path='/productmanagement' element={<ProductManagement />}/>
      </Routes>
      }
    </>
  )
}