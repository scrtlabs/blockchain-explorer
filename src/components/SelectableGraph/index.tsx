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

const EPOCHS_QUERY = gql`
  query Epochs($total: Int, $since: Int) {
    epoches(first: $total, skip: 0, orderBy: order, orderDirection: asc, where: { startTime_gte: $since }) {
      id
      startTime
      taskCount
      workerCount
      userCount
    }
  }
`

const lastYear = () => new Date().setFullYear(new Date().getFullYear() - 1)
const lastMonth = () => new Date().setMonth(new Date().getMonth() - 1)
const lastNDays = (n: number) => new Date().setDate(new Date().getDate() - n)
const lastWeek = () => lastNDays(7)
const lastDay = () => lastNDays(1)

const getMillisecondsFor = (timePeriod: string) => {
  if (timePeriod === 'lastDay') return lastDay()
  if (timePeriod === 'lastWeek') return lastWeek()
  if (timePeriod === 'lastSixMonth') return lastMonth()
  return lastYear()
}

const getSecondsFor = (timePeriod: string) => Math.floor(getMillisecondsFor(timePeriod) / 1000)

const INITIAL_VALUES = {
  total: 1000,
  since: getSecondsFor('lastYear'),
}

const SelectableGraph = ({ ...restProps }) => {
  const { data, error, refetch, variables } = useQuery(EPOCHS_QUERY, { variables: INITIAL_VALUES })
  const [dataKey, setDataKey] = React.useState('taskCount')

  if (error) console.error(error.message)

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDataKey(event.target.value)
  }

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    refetch({ ...variables, since: getSecondsFor(event.target.value) })
  }

  const findDefault = (options: OptionsProps[]): string => {
    const selected = options.find(({ selected }) => !!selected)
    return selected ? selected.value : 'none'
  }

  interface TickLegendProps {
    index: number
    x: number
    y: number
    payload: {
      value: string
    }
  }
  const TickLegend: React.FC<TickLegendProps> = props => {
    const { index, x, y, payload } = props
    console.log(props)
    const tickDate = new Date(1000 * data.epoches[index].startTime)
    const hm = `${tickDate.getHours()}:${tickDate
      .getSeconds()
      .toString()
      .padStart(2, '0')}`

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fontSize={14} fill="#ccc" transform="rotate(-35)">
          #{payload.value}
        </text>
      </g>
    )
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
      <div style={{ maxWidth: '100%', height: 200 }}>
        <ResponsiveContainer>
          <LineChart
            width={900}
            height={200}
            data={data ? data.epoches : []}
            margin={{ top: 15, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis
              dataKey="id"
              stroke="#cccccc"
              interval="preserveStartEnd"
              label={{ value: 'Epochs', position: 'bottom', color: '#ccc' }}
            />
            <YAxis allowDecimals={false} hide={true} />
            <Tooltip />
            <Line type="linear" dataKey={dataKey} stroke="#1ca8f8" strokeWidth={2} activeDot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default SelectableGraph
