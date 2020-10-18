import { Container } from '@material-ui/core'
import React from 'react'
import Company from './Company'
import Header from './Header'
import Search from './Search'
import Working from './Working'

const HomePage = () => {
  return (
    <>
      <Container>
        <Header />
        <Search />
        <Company />
        <Working />
      </Container>
      <div id="footer-image" />
    </>
  )
}

export default HomePage
