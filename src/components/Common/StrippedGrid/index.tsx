import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

const createColumns = (columns: number): string => {
  let columnTemplate: string = ''

  for (let count = 0; count < columns; count++) {
    columnTemplate += '1fr '
  }

  return columnTemplate
}

const StrippedGridContainer = styled.div``

export const StrippedGridRow = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  padding: 12px ${props => props.theme.cards.paddingHorizontal};
  row-gap: 15px;

  @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
    grid-column-gap: 15px;
    grid-template-columns: ${props => createColumns(props.columns || 1)};
    row-gap: 0;
  }

  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`

interface StrippedGridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const StrippedGrid: React.FC<StrippedGridProps> = (props: StrippedGridProps) => {
  const { children, ...restProps } = props

  return <StrippedGridContainer {...restProps}>{children}</StrippedGridContainer>
}

export default StrippedGrid
