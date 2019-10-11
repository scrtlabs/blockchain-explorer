import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import CloseIcon from './img/close.svg'

interface Props extends HTMLAttributes<HTMLDivElement> {
  disableCloseButton?: boolean
  onRequestClose: any
  title: string
}

const ModalTitleWrapper = styled.div`
  align-items: flex-start;
  border-bottom: 1px solid ${props => props.theme.borders.borderColor};
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 10px ${props => props.theme.cards.paddingHorizontal};
`

const ModalTitleText = styled.h2`
  color: ${props => props.theme.colors.commonText};
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  overflow: hidden;
  padding: 0 10px 0 0;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ModalClose = styled.button`
  align-items: flex-start;
  background-image: url(${CloseIcon});
  background-position: 100% 50%;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  display: flex;
  height: 24px;
  justify-content: flex-end;
  outline: none;
  padding: 0;
  width: 24px;

  &:active {
    opacity: 0.8;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

class ModalTitle extends React.Component<Props> {
  public render = () => {
    const { onRequestClose, title, disableCloseButton, ...restProps } = this.props

    return (
      <ModalTitleWrapper {...restProps}>
        <ModalTitleText>{title}</ModalTitleText>
        <ModalClose onClick={onRequestClose} disabled={disableCloseButton} />
      </ModalTitleWrapper>
    )
  }
}

export default ModalTitle
