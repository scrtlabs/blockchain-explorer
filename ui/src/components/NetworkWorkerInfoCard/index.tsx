import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Value } from '../NetworkInfoCard'

const LOGGED_IN_WORKERS_QUERY = gql`
  query LoggedInWorkers {
    workers(where: { status: LoggedIn }) {
      id
    }
  }
`

const percentage = (partial: number, total: number): number => {
  if (isNaN(partial) || isNaN(total) || total === 0 || partial > total) {
    return 0
  }

  return Math.round((partial * 100) / total)
}

const WorkerInfoCard = ({ totalWorkers }: { totalWorkers: number }) => {
  const { data, error, loading } = useQuery(LOGGED_IN_WORKERS_QUERY)

  if (error) {
    console.error('Failed to retrieve logged in workers', error)
  }

  if (loading) {
    return <Value>-</Value>
  }

  const loggedIn = data.workers.length

  return <Value>{`${loggedIn} / ${totalWorkers} (${percentage(loggedIn, totalWorkers)}%)`}</Value>
}

export default WorkerInfoCard
