import React from 'react'
import styled from 'styled-components'

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  right?: React.ReactNode
}

const SectionTitleWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 0 10px;
  width: 100%;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0 20px;
  }
`

const SectionTitleText = styled.h1`
  color: #444;
  font-size: 22px;
  font-weight: 400;
  line-height: 1.36;
  margin: 0 0 10px;
  padding: 0;
  text-align: left;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    margin: 0;
  }
`

const SectionTitle = ({ right = null, children, ...restProps }: SectionTitleProps) => {
  return (
    <SectionTitleWrapper {...restProps}>
      <SectionTitleText>{children}</SectionTitleText>
      {right}
    </SectionTitleWrapper>
  )
}

export default SectionTitle
