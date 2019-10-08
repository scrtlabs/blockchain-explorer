import React from 'react'
import styled from 'styled-components'
import Card from '../Common/Card'
import Select, { OptionsProps } from '../Common/Select'
import TempImg from './tmp/tmp.png'

const OptionsContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: -12px;
`

const SelectStyled = styled(Select)`
  margin-right: 15px;

  &:last-child {
    margin-right: 0;
  }
`

const SelectColor = styled(SelectStyled)`
  color: ${props => props.theme.colors.primary};
`

const InfoType: Array<OptionsProps> = [
  {
    selected: true,
    text: 'Transactions',
    value: 'transactions',
  },
  {
    text: 'Total Users',
    value: 'users',
  },
  {
    text: 'Active Workers',
    value: 'workers',
  },
]

const Timerange: Array<OptionsProps> = [
  {
    selected: true,
    text: 'Last Year',
    value: 'lastyear',
  },
  {
    text: 'Last 6 Months',
    value: 'sixmonths',
  },
  {
    text: 'Last Month',
    value: 'month',
  },
  {
    text: 'Last Week',
    value: 'week',
  },
  {
    text: 'Last Day',
    value: 'day',
  },
]

const SelectableGraph = ({ ...restProps }) => {
  return (
    <Card {...restProps}>
      <OptionsContainer>
        <SelectStyled options={InfoType} name="InfoType" />
        <SelectColor options={Timerange} name="Timerange" />
      </OptionsContainer>
      <img src={TempImg} style={{ maxWidth: '100%' }} alt="" />
    </Card>
  )
}

export default SelectableGraph
