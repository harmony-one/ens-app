import React from 'react'
import styled from '@emotion/styled/macro'

const SVG = styled('svg')`
  width: 57px;
  height: 22px;
  margin-left: 10px;
  g {
    fill: ${p => (p.color ? p.color : '#808184')};
  }
`

const TypeLogo = ({ color }) => (
  <SVG color={color} width="57" height="22" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="nonzero" />
  </SVG>
)

export default TypeLogo
