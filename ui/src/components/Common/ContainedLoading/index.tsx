import React from 'react'
import styled from 'styled-components'
import { FullLoadingStyled, Message } from '../FullLoading'
import Spinner from '../Spinner'

const ContainedLoadingStyled = styled(FullLoadingStyled)`
  background-color: #fff;
  height: 100%;
  width: 100%;
  position: absolute;
`

const ContainedLoading = () => (
  <ContainedLoadingStyled>
    <Spinner whiteBackground={true} />
    <Message whiteBackground={true}>Loading...</Message>
  </ContainedLoadingStyled>
)

export default ContainedLoading
