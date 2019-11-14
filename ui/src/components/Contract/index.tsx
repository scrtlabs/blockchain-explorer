import React from 'react'
import Card from '../Common/Card'
import SectionTitle from '../Common/SectionTitle'
import CopyText from '../Common/CopyText'
import { ButtonView } from '../Common/ButtonView'
import GridCell, { GridCellStyled, Title, Value } from '../Common/GridCell'
import styled from 'styled-components'
import ModalWrapper from '../Common/ModalWrapper'
import Tasks from 'components/Tasks'
import { History } from 'history'
import HexAddr from '../Common/HexAddr'
import { useQuery } from '@apollo/react-hooks'
import FullLoading from '../Common/FullLoading'
import gql from 'graphql-tag'
import ChevronOpen from './img/chevron-closed.svg'
import getExternalLink from 'utils/getExternalLink'

const DetailsCard = styled(Card)`
  margin-bottom: 35px;

  > div {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 15px;

    @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
      column-gap: 15px;
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: ${props => props.theme.themeBreakPoints.xxl}) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`

const ValueStyled = styled(Value)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`

const ContractWrapper = styled.div`
  height: 360px;
  max-width: 100%;
  padding: 15px;
  position: relative;
  width: 100%;
`

const EthContractWrapper = styled(ContractWrapper)`
  padding: 0;
  overflow-y: auto;
`

const EthContractItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.borders.borderColor};
  padding: 0 14px 0 18px;
  height: 52px;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
  }
`

const EthContractText = styled.div`
  font-size: 13px;
  font-weight: normal;
  line-height: 1.38;
  color: #000000;
  padding-right: 15px;
`

const Chevron = styled.div`
  background-image: url(${() => ChevronOpen});
  background-position: 0 50%;
  background-repeat: no-repeat;
  height: 12px;
  width: 12px;
`

const ExternalLink = styled.a`
  text-decoration: none;
`

export const SECRET_CONTRACT_QUERY = gql`
  query SecretContract($scAddr: String) {
    secretContract(id: $scAddr) {
      taskCount
      userCount
      ethContractCount
      ethContracts
    }
  }
`

interface ContractProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any
  history: History
  match: {
    params: {
      contractAddress?: string
    }
  }
}

const Contract: React.FC<ContractProps> = ({ history, match = { params: {} } }) => {
  const {
    params: { contractAddress = '' },
  } = match
  const { data, loading, error } = useQuery(SECRET_CONTRACT_QUERY, { variables: { scAddr: contractAddress } })

  const [ethContractModal, setEthContractsModalIsOpen] = React.useState(false)
  const closeEthContractsModal = () => setEthContractsModalIsOpen(false)
  const openEthContractsModal = () => setEthContractsModalIsOpen(true)

  if (error) console.error(error.message)

  const taskCount = data && data.secretContract && data.secretContract.taskCount
  const userCount = data && data.secretContract && data.secretContract.userCount
  const ethContractCount = (data && data.secretContract && data.secretContract.ethContractCount) || '0'

  return (
    <>
      <SectionTitle>Contract</SectionTitle>
      <DetailsCard>
        <GridCellStyled>
          <Title>Address</Title>
          <ValueStyled>
            <HexAddr start={8} end={8}>
              {contractAddress}
            </HexAddr>{' '}
            <CopyText text={contractAddress} />
          </ValueStyled>
        </GridCellStyled>
        <GridCell title="Tasks" value={taskCount} />
        <GridCell title="User Addresses" value={userCount} />
        <ButtonView onClick={openEthContractsModal} disabled={ethContractCount === '0'}>
          Contracts Called ({ethContractCount})
        </ButtonView>
      </DetailsCard>
      <Tasks scAddr={contractAddress} scTasks={taskCount} history={history} />
      <ModalWrapper
        ariaHideApp={false}
        isOpen={ethContractModal}
        title="Contracts Called"
        onRequestClose={closeEthContractsModal}
      >
        <EthContractWrapper>
          {ethContractCount !== '0' &&
            data.secretContract.ethContracts.map((ethContract: string) => (
              <ExternalLink
                key={ethContract}
                rel="noopener noreferrer"
                target="_blank"
                href={getExternalLink(ethContract)}
              >
                <EthContractItem>
                  <EthContractText>{ethContract}</EthContractText>
                  <Chevron />
                </EthContractItem>
              </ExternalLink>
            ))}
        </EthContractWrapper>
      </ModalWrapper>
      {loading && !data && <FullLoading />}
    </>
  )
}

export default Contract
