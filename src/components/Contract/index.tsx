import React from 'react'
import Card from '../Common/Card'
import SectionTitle from '../Common/SectionTitle'
import CopyText from '../Common/CopyText'
import { ButtonView } from '../Common/ButtonView'
import { ButtonExpand } from '../Common/ButtonExpand'
import GridCell, { GridCellStyled, Title, Value } from '../Common/GridCell'
import styled from 'styled-components'
import ModalWrapper from '../Common/ModalWrapper'
import Epochs from '../Epochs'

const DetailsCard = styled(Card)`
  margin-bottom: 35px;

  > div {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 15px;

    @media (min-width: ${props => props.theme.themeBreakPoints.md}) {
      column-gap: 15px;
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: ${props => props.theme.themeBreakPoints.xxl}) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }
`

const CopyContract = styled(CopyText)`
  margin: 0;
  position: absolute;
  right: 35px;
  top: 20px;
  z-index: 5;
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

const ContractSRC = styled.textarea`
  background-color: #fafafa;
  border-radius: 3px;
  border: solid 1px #d5d5d5;
  color: ${props => props.theme.colors.textCommon};
  font-family: ${props => props.theme.fonts.fontFamilyCode};
  font-size: 12px;
  font-weight: normal;
  height: 100%;
  line-height: 1.17;
  outline: none;
  padding: 12px 15px;
  position: relative;
  text-align: left;
  white-space: pre;
  width: 100%;
  z-index: 1;
`

const CONTRACT_VALUE = `enum ActionType {
  OPEN
  GIVE
  LOCK
  FREE
  DRAW
  WIPE
  SHUT
  BITE
}

scalar BigDecimal

scalar BigInt

scalar Bytes
  """ Block number in which the CDP was created """
  createdAtBlock: BigInt!

  """ Transaction hash in which the CDP was created """
  createdAtTransaction: Bytes!

  """ Deletion timestamp as seconds (if deleted) """
  deleted: BigInt

  """ Most recent action """
  latestAction: CdpAction!

  """ Timestamp as seconds of most recent action (time)"""
  modified: BigInt!

  """ Block number at most recent action (block)"""
  modifiedAtBlock: BigInt!

  """ Transaction hash at most recent action """
  modifiedAtTransaction: Bytes!

  """ CDP operations (acts) """
  actions(skip: Int = 0, first: Int = 100, orderBy: CdpAction_orderBy, orderDirection: OrderDirection): [CdpAction!]!
}

input Cdp_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  owner: Bytes
  owner_not: Bytes
  owner_in: [Bytes!]
  owner_not_in: [Bytes!]
  owner_contains: Bytes
  owner_not_contains: Bytes
  collateral: BigDecimal
  collateral_not: BigDecimal
  collateral_gt: BigDecimal
  collateral_lt: BigDecimal
  collateral_gte: BigDecimal
  collateral_lte: BigDecimal
  collateral_in: [BigDecimal!]
  collateral_not_in: [BigDecimal!]
  collateralUsd: BigDecimal
  collateralUsd_not: BigDecimal
  collateralUsd_gt: BigDecimal
  collateralUsd_lt: BigDecimal
  collateralUsd_gte: BigDecimal
  collateralUsd_lte: BigDecimal
  collateralUsd_in: [BigDecimal!]
  collateralUsd_not_in: [BigDecimal!]
  debt: BigDecimal
  debt_not: BigDecimal
  debt_gt: BigDecimal
  debt_lt: BigDecimal
  debt_gte: BigDecimal
  debt_lte: BigDecimal
  debt_in: [BigDecimal!]
  debt_not_in: [BigDecimal!]
  ratio: BigDecimal
  ratio_not: BigDecimal
  ratio_gt: BigDecimal
  ratio_lt: BigDecimal
  ratio_gte: BigDecimal
  ratio_lte: BigDecimal
  ratio_in: [BigDecimal!]
  ratio_not_in: [BigDecimal!]
  ethPrice: BigDecimal
  ethPrice_not: BigDecimal
  ethPrice_gt: BigDecimal
  ethPrice_lt: BigDecimal
  ethPrice_gte: BigDecimal
  ethPrice_lte: BigDecimal
  ethPrice_in: [BigDecimal!]
  ethPrice_not_in: [BigDecimal!]
  mkrPrice: BigDecimal
  mkrPrice_not: BigDecimal
  mkrPrice_gt: BigDecimal
  mkrPrice_lt: BigDecimal
  mkrPrice_gte: BigDecimal
  mkrPrice_lte: BigDecimal
  mkrPrice_in: [BigDecimal!]
  mkrPrice_not_in: [BigDecimal!]
  created: BigInt
  created_not: BigInt
  created_gt: BigInt
  created_lt: BigInt
  created_gte: BigInt
  created_lte: BigInt
  created_in: [BigInt!]
  created_not_in: [BigInt!]
  createdAtBlock: BigInt
  createdAtBlock_not: BigInt
  createdAtBlock_gt: BigInt
  createdAtBlock_lt: BigInt
  createdAtBlock_gte: BigInt
  createdAtBlock_lte: BigInt
  createdAtBlock_in: [BigInt!]
  createdAtBlock_not_in: [BigInt!]
  createdAtTransaction: Bytes
  createdAtTransaction_not: Bytes
  createdAtTransaction_in: [Bytes!]
  createdAtTransaction_not_in: [Bytes!]
  createdAtTransaction_contains: Bytes
  createdAtTransaction_not_contains: Bytes
  deleted: BigInt
  deleted_not: BigInt
  deleted_gt: BigInt
  deleted_lt: BigInt
  deleted_gte: BigInt
  deleted_lte: BigInt
  deleted_in: [BigInt!]
  deleted_not_in: [BigInt!]
  latestAction: String
  latestAction_not: String
  latestAction_gt: String
  latestAction_lt: String
  latestAction_gte: String
  latestAction_lte: String
  latestAction_in: [String!]
  latestAction_not_in: [String!]
  latestAction_contains: String
  latestAction_not_contains: String
  latestAction_starts_with: String
  latestAction_not_starts_with: String
  latestAction_ends_with: String
  latestAction_not_ends_with: String
  modified: BigInt
  modified_not: BigInt
  modified_gt: BigInt
  modified_lt: BigInt
  modified_gte: BigInt
  modified_lte: BigInt
  modified_in: [BigInt!]
  modified_not_in: [BigInt!]
  modifiedAtBlock: BigInt
  modifiedAtBlock_not: BigInt
  modifiedAtBlock_gt: BigInt
  modifiedAtBlock_lt: BigInt
  modifiedAtBlock_gte: BigInt
  modifiedAtBlock_lte: BigInt
  modifiedAtBlock_in: [BigInt!]
  modifiedAtBlock_not_in: [BigInt!]
  modifiedAtTransaction: Bytes
  modifiedAtTransaction_not: Bytes
  modifiedAtTransaction_in: [Bytes!]
  modifiedAtTransaction_not_in: [Bytes!]
  modifiedAtTransaction_contains: Bytes
  modifiedAtTransaction_not_contains: Bytes
}

enum Cdp_orderBy {
  id
  owner
  collateral
  collateralUsd
  debt
  ratio
  ethPrice
  mkrPrice
  created
  createdAtBlock
  createdAtTransaction
  deleted
  latestAction
  modified
  modifiedAtBlock
  modifiedAtTransaction
  actions
}

""" Atomic operation over a Collateralized Debt Position (CDP Action) """
type CdpAction {
  """ Action ID (<transaction_hash>-<action_type>) """
  id: ID!

  """ CDP ID (id) """
  cdp: Cdp!

  """ Action name (act) """
  type: ActionType!

  """ Action value (arg) """
  value: String

  """ Sender address (guy) """
  sender: Bytes!

  """ Block number (block) """
  block: BigInt!

  """ Transaction hash (tx) """
  transactionHash: Bytes!

  """ Action timestamp as seconds (time) """
  timestamp: BigInt!
  ethPrice: BigDecimal!
  mkrPrice: BigDecimal!
}

input CdpAction_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  cdp: String
  cdp_not: String
  cdp_gt: String
  cdp_lt: String
  cdp_gte: String
  cdp_lte: String
  cdp_in: [String!]
  cdp_not_in: [String!]
  cdp_contains: String
  cdp_not_contains: String
  cdp_starts_with: String
  cdp_not_starts_with: String
  cdp_ends_with: String
  cdp_not_ends_with: String
  type: ActionType
  type_not: ActionType
  value: String
  value_not: String
  value_gt: String
  value_lt: String
  value_gte: String
  value_lte: String
  value_in: [String!]
  value_not_in: [String!]
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  sender: Bytes
  sender_not: Bytes
  sender_in: [Bytes!]
  sender_not_in: [Bytes!]
  sender_contains: Bytes
  sender_not_contains: Bytes
  block: BigInt
  block_not: BigInt
  block_gt: BigInt
  block_lt: BigInt
  block_gte: BigInt
  block_lte: BigInt
  block_in: [BigInt!]
  block_not_in: [BigInt!]
  transactionHash: Bytes
  transactionHash_not: Bytes
  transactionHash_in: [Bytes!]
  transactionHash_not_in: [Bytes!]
  transactionHash_contains: Bytes
  transactionHash_not_contains: Bytes
  timestamp: BigInt
  timestamp_not: BigInt
  timestamp_gt: BigInt
  timestamp_lt: BigInt
  timestamp_gte: BigInt
  timestamp_lte: BigInt
  timestamp_in: [BigInt!]
  timestamp_not_in: [BigInt!]
  ethPrice: BigDecimal
  ethPrice_not: BigDecimal
  ethPrice_gt: BigDecimal
  ethPrice_lt: BigDecimal
  ethPrice_gte: BigDecimal
  ethPrice_lte: BigDecimal
  ethPrice_in: [BigDecimal!]
  ethPrice_not_in: [BigDecimal!]
  mkrPrice: BigDecimal
  mkrPrice_not: BigDecimal
  mkrPrice_gt: BigDecimal
  mkrPrice_lt: BigDecimal
  mkrPrice_gte: BigDecimal
  mkrPrice_lte: BigDecimal
  mkrPrice_in: [BigDecimal!]
  mkrPrice_not_in: [BigDecimal!]
}

enum CdpAction_orderBy {
  id
  cdp
  type
  value
  sender
  block
  transactionHash
  timestamp
  ethPrice
  mkrPrice
}

type EthPrice {
  id: ID!

  """ Block number """
  block: BigInt!

  """ Timestamp as seconds """
  timestamp: BigInt!

  """ Price """
  value: BigDecimal!
}

input EthPrice_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  block: BigInt
  block_not: BigInt
  block_gt: BigInt
  block_lt: BigInt
  block_gte: BigInt
  block_lte: BigInt
  block_in: [BigInt!]
  block_not_in: [BigInt!]
  timestamp: BigInt
  timestamp_not: BigInt
  timestamp_gt: BigInt
  timestamp_lt: BigInt
  timestamp_gte: BigInt
  timestamp_lte: BigInt
  timestamp_in: [BigInt!]
  timestamp_not_in: [BigInt!]
  value: BigDecimal
  value_not: BigDecimal
  value_gt: BigDecimal
  value_lt: BigDecimal
  value_gte: BigDecimal
  value_lte: BigDecimal
  value_in: [BigDecimal!]
  value_not_in: [BigDecimal!]
}

enum EthPrice_orderBy {
  id
  block
  timestamp
  value
}

type MkrPrice {
  id: ID!

  """ Block number """
  block: BigInt!

  """ Timestamp as seconds """
  timestamp: BigInt!

  """ Price """
  value: BigDecimal!
}

input MkrPrice_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  block: BigInt
  block_not: BigInt
  block_gt: BigInt
  block_lt: BigInt
  block_gte: BigInt
  block_lte: BigInt
  block_in: [BigInt!]
  block_not_in: [BigInt!]
  timestamp: BigInt
  timestamp_not: BigInt
  timestamp_gt: BigInt
  timestamp_lt: BigInt
  timestamp_gte: BigInt
  timestamp_lte: BigInt
  timestamp_in: [BigInt!]
  timestamp_not_in: [BigInt!]
  value: BigDecimal
  value_not: BigDecimal
  value_gt: BigDecimal
  value_lt: BigDecimal
  value_gte: BigDecimal
  value_lte: BigDecimal
  value_in: [BigDecimal!]
  value_not_in: [BigDecimal!]
}

enum MkrPrice_orderBy {
  id
  block
  timestamp
  value
}

enum OrderDirection {
  asc
  desc
}

type Query {
  cdp(id: ID!): Cdp
  cdps(skip: Int = 0, first: Int = 100, orderBy: Cdp_orderBy, orderDirection: OrderDirection, where: Cdp_filter): [Cdp!]!
  cdpAction(id: ID!): CdpAction
  cdpActions(skip: Int = 0, first: Int = 100, orderBy: CdpAction_orderBy, orderDirection: OrderDirection, where: CdpAction_filter): [CdpAction!]!
  ethPrice(id: ID!): EthPrice
  ethPrices(skip: Int = 0, first: Int = 100, orderBy: EthPrice_orderBy, orderDirection: OrderDirection, where: EthPrice_filter): [EthPrice!]!
  mkrPrice(id: ID!): MkrPrice
  mkrPrices(skip: Int = 0, first: Int = 100, orderBy: MkrPrice_orderBy, orderDirection: OrderDirection, where: MkrPrice_filter): [MkrPrice!]!
}

type Subscription {
  cdp(id: ID!): Cdp
  cdps(skip: Int = 0, first: Int = 100, orderBy: Cdp_orderBy, orderDirection: OrderDirection, where: Cdp_filter): [Cdp!]!
  cdpAction(id: ID!): CdpAction
  cdpActions(skip: Int = 0, first: Int = 100, orderBy: CdpAction_orderBy, orderDirection: OrderDirection, where: CdpAction_filter): [CdpAction!]!
  ethPrice(id: ID!): EthPrice
  ethPrices(skip: Int = 0, first: Int = 100, orderBy: EthPrice_orderBy, orderDirection: OrderDirection, where: EthPrice_filter): [EthPrice!]!
  mkrPrice(id: ID!): MkrPrice
  mkrPrices(skip: Int = 0, first: Int = 100, orderBy: MkrPrice_orderBy, orderDirection: OrderDirection, where: MkrPrice_filter): [MkrPrice!]!
}
`

const Contract = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)

  const closeModal = () => setModalIsOpen(false)
  const openModal = () => setModalIsOpen(true)

  return (
    <>
      <SectionTitle>Contract</SectionTitle>
      <DetailsCard>
        <GridCellStyled>
          <Title>Address</Title>
          <ValueStyled>
            <span>0xffd4a06a…e2fde603f9a</span> <CopyText text={'0xffd4a06a…e2fde603f9a'} />
          </ValueStyled>
        </GridCellStyled>
        <GridCell title="Tasks" value={'99999999'} />
        <GridCell title="User Addresses" value={'5566777'} />
        <ButtonView>Contracts Called</ButtonView>
        <ButtonExpand onClick={openModal}>Expand Bytecode</ButtonExpand>
      </DetailsCard>
      <Epochs title="Selected Epochs" />
      <ModalWrapper ariaHideApp={false} isOpen={modalIsOpen} title={`Contract’s Bytecode`} onRequestClose={closeModal}>
        <ContractWrapper>
          <ContractSRC defaultValue={CONTRACT_VALUE} />
          <CopyContract text={CONTRACT_VALUE} color="#1ca8f8" />
        </ContractWrapper>
      </ModalWrapper>
    </>
  )
}

export default Contract
