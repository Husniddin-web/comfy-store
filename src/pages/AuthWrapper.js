import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0()
  if (isLoading) {
    return <Wrapper><h1 className='lr'>Loading ....</h1></Wrapper>
  }
  if (error) {
    return <Wrapper><h1 className='lr'>{error.message}</h1></Wrapper>
  }
  return <Wrapper>
    {children}
  </Wrapper>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  .lr{
    text-align:center ;
    display:flex;
    justify-content:center;
    align-items:center;
  }
`

export default AuthWrapper
