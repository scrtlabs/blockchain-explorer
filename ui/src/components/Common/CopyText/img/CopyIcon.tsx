import React from 'react'

interface Props {
  color?: string
}

export const CopyIcon: React.FC<Props> = (props: Props) => {
  return (
    <svg width="11.208" height="14">
      <path
        d="M7.612 2.448H1.107A1.108 1.108 0 000 3.555v9.338A1.108 1.108 0 001.107 14h6.505a1.108 1.108 0 001.107-1.107V3.555a1.11 1.11 0 00-1.107-1.107zm.333 10.441a.332.332 0 01-.333.333H1.1a.333.333 0 01-.332-.333V3.557a.332.332 0 01.332-.333h6.512a.332.332 0 01.333.333z"
        fill={props.color ? props.color : '#393939'}
      />
      <path
        d="M10.101 0H3.596a1.108 1.108 0 00-1.107 1.107.389.389 0 10.778 0 .332.332 0 01.329-.329h6.506a.333.333 0 01.333.333v9.334a.333.333 0 01-.333.332.389.389 0 000 .778 1.108 1.108 0 001.107-1.107V1.107A1.108 1.108 0 0010.101 0z"
        fill={props.color ? props.color : '#393939'}
      />
    </svg>
  )
}
