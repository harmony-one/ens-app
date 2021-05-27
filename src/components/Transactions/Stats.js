import React from 'react'
import styled from '@emotion/styled/macro'

const StatsContainer = styled('div')`
  margin-bottom: 2em;
`

class Stats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      totalRegistered: null,
      totalFundsRaised: null,
      items: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    // const response = await fetch('https://hmny-t.co/one-registrations');
    const stats = await fetch('https://hmny-t.co/one-stats')
    const data = await stats.json()
    this.setState({
      totalRegistered: data.totalRegistered,
      totalFundsRaised: data.totalFundsRaised
    })
  }

  render() {
    const { totalRegistered, totalFundsRaised } = this.state

    if (totalRegistered) {
      return (
        <StatsContainer>
          <strong>{totalRegistered}</strong> registered.{' '}
          <strong>{totalFundsRaised}</strong> ONEs contributed to community DAO.
        </StatsContainer>
      )
    } else {
      return <StatsContainer>Loading...</StatsContainer>
    }
  }
}

export default Stats
