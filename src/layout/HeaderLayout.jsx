import Box from '@mui/material/Box';
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getStoredToken, isDemoMode } from '../utils/tokenStorage';

const HeaderLayout = () => {
  const token = getStoredToken();
  const isDemoPreview = isDemoMode();
  const navigate = useNavigate()
  const { user } = useSelector(state => state.AuthenticationSlice)
  // this useEffect to redirect auth user to page
  useEffect(() => {
    if (!isDemoPreview && (!token || !user?.role)) {
      navigate('/')
    }

  }, [isDemoPreview, navigate, token, user])
  return (
    <Box>
      <Header />
      {/* <Container maxWidth="xl"> */}
      <Outlet />
      {/* </Container> */}
    </Box>
  )
}

export default HeaderLayout
