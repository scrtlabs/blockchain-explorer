import React from 'react'
// import { useQuery } from '@apollo/react-hooks'
import { GetSecretContract_secretContracts } from '../../types/generatedGQL'

// const SECRET_CONTRACT_SUBSCRIPTION = gql`
//   subscription SecretContract {
//     secretContracts {
//       ...SecretContractDetail
//     }
//   }
//   ${secretContractDetailFragment}
// `

type Props = {
  data: GetSecretContract_secretContracts[]
  subscribeToChanges: () => any
}

const SecretContractsDetails = (props: Props) => {
  const { data, subscribeToChanges } = props

  React.useEffect(() => subscribeToChanges())

  return (
    <div>
      {data.map(sc => (
        <div key={sc.id}>
          <li>{sc.id}</li>
          <li>{sc.address}</li>
          <li>{sc.codeHash}</li>
          <li>{sc.initStateDeltaHash}</li>
          <li>{sc.createdAt}</li>
          <li>{sc.createdAtBlock}</li>
          <li>{sc.createdAtTransaction}</li>
        </div>
      ))}
    </div>
  )
}

const SecretContracts = () => {
  // const { subscribeToMore, ...result } = useQuery(SECRET_CONTRACT_QUERY)
  // const result = useQuery(SECRET_CONTRACT_QUERY)

  // console.log(result)
  //
  // if (result.loading) {
  //   return <div>loading...</div>
  // }
  //
  // if (result.error) {
  //   return <div>Error!</div>
  // }

  return (
    <SecretContractsDetails
      data={[]}
      // data={result.data.secretContracts}
      subscribeToChanges={
        () => console.log('unsubscribed')
        // subscribeToMore({
        //   document: SECRET_CONTRACT_SUBSCRIPTION,
        //   updateQuery: (prev, { subscriptionData }) => (subscriptionData.data ? subscriptionData.data : prev),
        // })
      }
    />
  )
}

export default SecretContracts
