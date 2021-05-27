import React from 'react'
import styled from '@emotion/styled/macro'
import Stats from '../components/Transactions/Stats'
import Table from '../components/Transactions/Table'

const TransactionsContainer = styled('div')`
  margin: 2em;
  font-weight: 100;
  text-align: center;

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }
`

const Transactions = ({}) => {
  document.title = 'Transactions | OneNames'
  return (
    <TransactionsContainer>
      <h2>Transactions</h2>
      <Stats />
      <Table />
    </TransactionsContainer>
  )
}

export default Transactions
