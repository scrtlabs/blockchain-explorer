import React from 'react'
import styled from 'styled-components'
import Card from '../Common/Card'
import EmptyImage from './img/empty.svg'

const NotFoundCard = styled(Card)`
  flex-grow: 1;

  > div {
    align-items: center;
    justify-content: center;
  }
`

const EmptyImg = styled.img`
  margin-bottom: 10px;
`

const Message = styled.p`
  color: ${props => props.theme.colors.commonText};
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  margin: 0;
  text-align: center;
`

interface NotFoundProps {
  message: string
}

const NotFound: React.FC<NotFoundProps> = (props: NotFoundProps) => {
  const { message, ...restProps } = props

  return (
    <NotFoundCard {...restProps}>
      <EmptyImg src={EmptyImage} alt="" />
      <Message>{message}</Message>
    </NotFoundCard>
  )
}

export default NotFound
