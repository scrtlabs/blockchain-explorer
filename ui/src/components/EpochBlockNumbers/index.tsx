import React, { HTMLAttributes } from 'react'
import styled, { withTheme } from 'styled-components'

export enum EpochBlockTypes {
  current,
  first,
  last,
}

export interface EpochBlockData {
  title: string
  type: EpochBlockTypes
  value: string
}

const getCellBackgroundColor = (
  type: EpochBlockTypes,
  current: boolean,
  currentBackgroundColor: string,
  lastBackgroundColor: string,
): string => {
  if (type === EpochBlockTypes.current && current) {
    return currentBackgroundColor
  } else if (type === EpochBlockTypes.last && !current) {
    return lastBackgroundColor
  } else return '#f0f0f0'
}

const getTextColor = (type: EpochBlockTypes, defaultColor: string, current: boolean): string => {
  if ((type === EpochBlockTypes.current && current) || (type === EpochBlockTypes.last && !current)) {
    return '#fff'
  } else return defaultColor
}

const EpochBlockNumbersOuter = styled.div``

const EpochBlockNumbersWrapper = styled.div`
  align-items: center;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  overflow: hidden;
`

interface CellProps {
  current: boolean
  currentBackgroundColor: string
  lastBackgroundColor: string
  type: EpochBlockTypes
}

const Cell = styled.span<CellProps>`
  background-color: ${props =>
    getCellBackgroundColor(props.type, props.current, props.currentBackgroundColor, props.lastBackgroundColor)};
  flex-grow: 1;
  flex-shrink: 0;
  padding: 5px 8px;

  &:first-child {
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }

  &:last-child {
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }
`

const Title = styled.h5<{ type: EpochBlockTypes; defaultColor: string; current: boolean }>`
  color: ${props => getTextColor(props.type, props.defaultColor, props.current)};
  font-size: 11px;
  font-weight: normal;
  line-height: 1.36;
  margin: 0;
  text-align: center;
`

const Value = styled.p<{ type: EpochBlockTypes; defaultColor: string; current: boolean }>`
  color: ${props => getTextColor(props.type, props.defaultColor, props.current)};
  font-size: 12px;
  font-weight: 600;
  line-height: 1.42;
  margin: 0;
  text-align: center;
`

const SubHeader = styled.h4`
  color: ${ props => props.theme.colors.textLight };
  font-size: 9px;
  font-weight: 600;
  line-height: 1.44;
  margin: 5px 0 0 0;
  text-align: center;
  text-transform: uppercase;
`

interface EpochBlockNumbersProps {
  current: boolean
  theme?: any
  values: Array<any>
}

interface TimeLeftProps extends HTMLAttributes<HTMLDivElement>, EpochBlockNumbersProps {}

const EpochBlockNumbers: React.FC<TimeLeftProps> = (props: TimeLeftProps) => {
  const { values = [], current, theme, ...restProps } = props

  return (
    <EpochBlockNumbersOuter {...restProps}>
      <EpochBlockNumbersWrapper>
        {values.map((item, index) => {
          return (
            <Cell
              current={current}
              currentBackgroundColor={theme.colors.secondary}
              key={index}
              lastBackgroundColor={theme.colors.primary}
              type={item.type}
            >
              <Value type={item.type} defaultColor={theme.colors.textCommon} current={current}>
                {item.value}
              </Value>
              <Title type={item.type} defaultColor={theme.colors.textLight} current={current}>
                {item.title}
              </Title>
            </Cell>
          )
        })}
      </EpochBlockNumbersWrapper>
      <SubHeader>Ethereum Blocks</SubHeader>
    </EpochBlockNumbersOuter>
  )
}

export default withTheme(EpochBlockNumbers)
