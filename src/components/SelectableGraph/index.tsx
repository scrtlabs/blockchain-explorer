import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AxisDomain, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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
    text: 'Last Year',
    value: 'lastYear',
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
    selected: true,
    text: 'Last Day',
    value: 'lastDay',
  },
]

const statisticsCommonFragment = gql`
  fragment StatisticsCommonFragment on Statistic {
    id
    startedEpochCount
    endedEpochCount
    startedEpochs(orderBy: order, orderDirection: asc) {
      id
    }
    endedEpochs(orderBy: order, orderDirection: asc) {
      id
    }
  }
`

const STATISTICS_TASK_QUERY = gql`
  query Statistics($total: Int, $since: Int, $type: String) {
    statistics(first: $total, skip: 0, orderBy: order, orderDirection: asc, where: { type: $type, order_gte: $since }) {
      ...StatisticsCommonFragment
      taskCount
      completedTaskCount
      failedTaskCount
    }
  }
  ${statisticsCommonFragment}
`

const STATISTICS_USER_QUERY = gql`
  query Statistics($total: Int, $since: Int, $type: String) {
    statistics(first: $total, skip: 0, orderBy: order, orderDirection: asc, where: { type: $type, order_gte: $since }) {
      ...StatisticsCommonFragment
      userCount
      users
    }
  }
  ${statisticsCommonFragment}
`

const STATISTICS_WORKER_QUERY = gql`
  query Statistics($total: Int, $since: Int, $type: String) {
    statistics(first: $total, skip: 0, orderBy: order, orderDirection: asc, where: { type: $type, order_gte: $since }) {
      ...StatisticsCommonFragment
      workerCount
      workers {
        id
      }
    }
  }
  ${statisticsCommonFragment}
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
  since: Math.floor(getSecondsFor('lastDay') / SECONDS_IN.HOUR),
  type: 'HOUR',
}

const QUERY_BY_KEY = {
  taskCount: STATISTICS_TASK_QUERY,
  userCount: STATISTICS_USER_QUERY,
  workerCount: STATISTICS_WORKER_QUERY,
}

const SelectableGraph = ({ ...restProps }) => {
  const [dataKey, setDataKey] = React.useState('taskCount')
  const [lineChartParams, setLineChartParams] = React.useState({
    query: STATISTICS_TASK_QUERY,
    queryVariables: STATISTICS_INITIAL_VALUES,
  })

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value

    setDataKey(key)

    setLineChartParams(({ queryVariables }) => ({
      query: QUERY_BY_KEY[key as keyof typeof QUERY_BY_KEY],
      queryVariables,
    }))
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

interface PayloadProps {
  dataKey: string
  name: string
  value: string
  payload: any
}
interface CustomTooltipProps {
  active: boolean
  label: string
  payload: PayloadProps[]
}
const CustomTooltipContent = styled.div`
  width: 200px;
  margin: 0;
  line-height: 24px;
  border: 1px solid #f5f5f5;
  background-color: hsla(0, 0%, 100%, 0.8);
  padding: 10px;

  > .label {
    margin: 0;
    color: #666;
    font-weight: 700;
  }

  > .desc {
    margin: 0;
    color: #999;

    > .title {
      color: cornflowerblue;
    }
  }

  > .intro {
    border-top: 1px solid #f5f5f5;
    margin: 0;
  }
`
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    const { payload: entity, dataKey } = payload[0]
    const [unit, value] = entity.id.split('-')
    const unixTimestamp = +value * SECONDS_IN[unit as keyof typeof SECONDS_IN] * 1000
    const date = new Date(unixTimestamp).toLocaleString()
    const startedEpochs = entity.startedEpochs

    const values = []

    if (dataKey === 'taskCount') {
      values.push({ title: 'Total Tasks', value: entity.taskCount })
      values.push({ title: 'Completed Tasks', value: entity.completedTaskCount })
      values.push({ title: 'Failed Tasks', value: entity.failedTaskCount })
    }

    if (dataKey === 'userCount') {
      values.push({ title: 'Total Users', value: entity.userCount })
    }

    if (dataKey === 'workerCount') {
      values.push({ title: 'Total Workers', value: entity.workerCount })
    }

    return (
      <CustomTooltipContent>
        <p className="label">{date}</p>
        <p className="intro">
          Epochs: {startedEpochs.length && `${startedEpochs[0].id}-${startedEpochs[startedEpochs.length - 1].id}`}
        </p>
        {!!values.length &&
          values.map(({ title, value }, index) => (
            <p className="desc" key={`${title}_${value}_${index}`}>
              <span>{title}</span>: <span>{value}</span>
            </p>
          ))}
      </CustomTooltipContent>
    )
  }

  return null
}

const LineChartGraph: React.FC<any> = ({ dataKey, query, queryVariables }) => {
  const { data, error, loading } = useQuery(query, { variables: queryVariables })
  const [domain, setDomain] = React.useState<[AxisDomain, AxisDomain]>([0, 0])

  if (error) console.error(error.message)

  // We're forcing domain for the y-axis, as for some reason line will be drawn outside of the chart
  // See: https://github.com/recharts/recharts/issues/1080
  React.useMemo(() => {
    const newDomain = (data &&
      data.statistics &&
      data.statistics.reduce(
        (acc: [AxisDomain, AxisDomain], stat: any) => {
          if (stat && stat[dataKey] !== undefined) {
            if (acc[0] === null || acc[0] > +stat[dataKey]) acc[0] = +stat[dataKey]
            if (acc[1] === null || acc[1] < +stat[dataKey]) acc[1] = +stat[dataKey]
          }
          return acc
        },
        [null, null],
      )) || [0, 0]
    const numbers: [AxisDomain, AxisDomain] = [Math.floor(newDomain[0] * 0.95), Math.floor(newDomain[1] * 1.05)]
    setDomain(numbers)
  }, [dataKey, data && data.statistics && data.statistics.length, loading])

  return (
    <ResponsiveContainer>
      <LineChart data={data ? data.statistics : []} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
        <XAxis dataKey="id" stroke="#cccccc" interval="preserveStartEnd" tick={TickLegend} />
        <YAxis interval="preserveStartEnd" stroke="#cccccc" domain={domain} />
        <Tooltip content={CustomTooltip} animationDuration={800} />
        <Line type="linear" dataKey={dataKey} stroke="#1ca8f8" strokeWidth={2} activeDot={true} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SelectableGraph
