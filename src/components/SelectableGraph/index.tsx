import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../Common/Card'
import Select, { OptionsProps } from '../Common/Select'

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
    text: 'Tasks',
    value: 'taskCount',
  },
  {
    text: 'Total Users',
    value: 'userCount',
  },
  {
    text: 'Active Workers',
    value: 'workerCount',
  },
]

const TimeRange: Array<OptionsProps> = [
  {
    selected: true,
    text: 'Last Year',
    value: 'lastYear',
  },
  {
    text: 'Last 6 Months',
    value: 'lastSixMonths',
  },
  {
    text: 'Last Month',
    value: 'lastMonth',
  },
  {
    text: 'Last Week',
    value: 'lastWeek',
  },
  {
    text: 'Last Day',
    value: 'lastDay',
  },
]

const STATISTICS_QUERY = gql`
  query Statistics($total: Int, $since: Int, $type: String) {
    statistics(first: $total, skip: 0, orderBy: order, orderDirection: asc, where: { type: $type, order_gte: $since }) {
      id
      order
      taskCount
      workerCount
      userCount
    }
  }
`

const SECONDS_IN = {
  DAY: 86400,
  HOUR: 3600,
}

const lastYear = () => new Date().setFullYear(new Date().getFullYear() - 1)
const lastMonth = () => new Date().setMonth(new Date().getMonth() - 1)
const lastNDays = (n: number) => new Date().setDate(new Date().getDate() - n)
const lastWeek = () => lastNDays(7)
const lastDay = () => lastNDays(1)

const getMillisecondsFor = (timePeriod: string) => {
  if (timePeriod === 'lastDay') return lastDay()
  if (timePeriod === 'lastWeek') return lastWeek()
  if (timePeriod === 'lastMonth') return lastMonth()
  return lastYear()
}

const getSecondsFor = (timePeriod: string) => Math.floor(getMillisecondsFor(timePeriod) / 1000)

const STATISTICS_INITIAL_VALUES = {
  total: 1000,
  since: Math.floor(getSecondsFor('lastYear') / SECONDS_IN.DAY),
  type: 'DAY',
}

const SelectableGraph = ({ ...restProps }) => {
  const [dataKey, setDataKey] = React.useState('taskCount')
  const [lineChartParams, setLineChartParams] = React.useState({
    query: STATISTICS_QUERY,
    queryVariables: STATISTICS_INITIAL_VALUES,
  })

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDataKey(event.target.value)
  }

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = event
    const type = ['lastYear', 'lastMonth'].includes(value) ? 'DAY' : 'HOUR'

    setLineChartParams(({ query, queryVariables }) => ({
      query,
      queryVariables: {
        ...queryVariables,
        since: Math.floor(getSecondsFor(value) / SECONDS_IN[type]),
        type,
      },
    }))
  }

  const findDefault = (options: OptionsProps[]): string => {
    const selected = options.find(({ selected }) => !!selected)
    return selected ? selected.value : 'none'
  }

  // interface CustomTooltipProps {
  //   payload: any[]
  //   dataKey: string
  //   value: string
  // }
  // const CustomTooltip: React.FC<CustomTooltipProps> = props => {
  //   console.log(props.payload[0])
  //   // if (active) {
  //   //   return (
  //   //     <div className="custom-tooltip">
  //   //       <p className="label">Epoch #{label}</p>
  //   //       <p className="intro">{getIntroOfPage(label)}</p>
  //   //       <p className="desc">Anything you want can be displayed here.</p>
  //   //     </div>
  //   //   );
  //   // }
  //
  //   return null;
  // };

  return (
    <Card {...restProps}>
      <OptionsContainer>
        <SelectStyled
          defaultValue={findDefault(InfoType)}
          options={InfoType}
          name="InfoType"
          onChange={handleTypeChange}
        />
        <SelectColor
          defaultValue={findDefault(TimeRange)}
          options={TimeRange}
          name="TimeRange"
          onChange={handleRangeChange}
        />
      </OptionsContainer>
      <div style={{ maxWidth: '100%', height: 280 }}>
        <LineChartGraph {...lineChartParams} dataKey={dataKey} />
      </div>
    </Card>
  )
}

interface TickLegendProps {
  x: number
  y: number
  payload: {
    value: string
  }
}
const TickLegend: React.FC<TickLegendProps> = ({ x, y, payload }) => {
  const [unit, value] = payload.value.split('-')
  const unixTimestamp = +value * SECONDS_IN[unit as keyof typeof SECONDS_IN] * 1000
  const [date, hour] = new Date(unixTimestamp).toLocaleString().split(',')

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fontSize={10} fill="#ccc">
        {hour}
      </text>
      <text x={0} y={0} dy={32} textAnchor="middle" fontSize={10} fill="#ccc">
        {date}
      </text>
    </g>
  )
}

const LineChartGraph: React.FC<any> = ({ dataKey, query, queryVariables }) => {
  const { data, error } = useQuery(query, { variables: queryVariables })

  if (error) console.error(error.message)

  return (
    <ResponsiveContainer>
      <LineChart
        width={900}
        height={200}
        data={data ? data.statistics : []}
        margin={{ top: 15, right: 30, left: 20, bottom: 20 }}
      >
        <XAxis dataKey="id" stroke="#cccccc" interval="preserveStartEnd" tick={TickLegend} />
        <YAxis allowDecimals={false} hide={true} />
        <Tooltip />
        <Line type="linear" dataKey={dataKey} stroke="#1ca8f8" strokeWidth={2} activeDot={true} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SelectableGraph
