import React from 'react'
import styled from 'styled-components'
import { FullLoadingStyled, Message } from '../FullLoading'
import Spinner from '../Spinner'

const ContainedLoadingStyled = styled(FullLoadingStyled)`
  height: 100%;
  width: 100%;
  position: absolute;
`

const ContainedLoading = () => (
  <ContainedLoadingStyled>
    <Spinner />
    <Message>Loading...</Message>
  </ContainedLoadingStyled>
)

export default ContainedLoading
