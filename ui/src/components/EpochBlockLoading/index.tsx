import React from 'react'
import styled from 'styled-components'
import PlaceholderSVGWide from './img/placeholder-content.svg'
import PlaceholderSVGTall from './img/placeholder-content-2.svg'
import { EpochBlockStyled } from '../EpochBlock'

const PlaceholderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  min-height: 116px;
  max-width: 100%;
  justify-content: center;

  img {
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 0;
  }
`

const PlaceholderImgWide = styled.img`
  display: none;

  @media (min-width: ${props => props.theme.themeBreakPoints.xxl}) {
    display: block;
  }
`

const PlaceholderImgTall = styled.img`
  display: block;

  @media (min-width: ${props => props.theme.themeBreakPoints.xxl}) {
    display: none;
  }
`

const EpochBlockLoading: React.FC = () => (
  <EpochBlockStyled borderColor="#f0f0f0">
    <PlaceholderContainer>
      <PlaceholderImgWide src={PlaceholderSVGWide} alt="" />
      <PlaceholderImgTall src={PlaceholderSVGTall} alt="" />
    </PlaceholderContainer>
  </EpochBlockStyled>
)

export default EpochBlockLoading
