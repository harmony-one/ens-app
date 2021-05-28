import React from 'react'
import styled from '@emotion/styled/macro'

const Search = styled('div')`
  .search-container {
    display: flex;
    align-items: center;
    margin-top: 50px;
  }

  ::placeholder {
    color: #ccc;
  }

  button {
    border-radius: 0px 6px 6px 0px;
    display: block;
    background: #1b295e;
    color: white;
    height: 46px;
    width: 162px;
    border: none;
    cursor: pointer;
  }

  .icon {
    position: absolute;
    padding: 10px;
    margin-left: 12px;
    width: 3px;
    height: 3px;
    background: url(/static/media/search.2ee17ae4.svg) no-repeat;
    background-size: contain;
  }

  input {
    font-family: 'Nunito', sans-serif !important;
    font-size: 18px !important;
    padding: 10px 10px 10px 50px;
    width: 95%;
    border: 1px solid #00b0ef;
    border-right: 0;
    font-size: 18px;
    font-weight: 100;
  }
`

const TableContainer = styled('div')`
  margin: 20px 0;
  width: 100%;

  table {
    width: 100%;
    font-size: 14px;
    border-collapse: collapse;
    border: 1px solid #ccc;

    thead {
      display: table-header-group;
      vertical-align: middle;
      border-color: inherit;

      th {
        color: #fff;
        line-height: 1.4;
        background-color: #00b0ef;
        padding-top: 18px;
        padding-bottom: 18px;
        border: 1px solid #fff;
      }
    }

    tr {
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;

      td {
        padding: 10px;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: #fff;
        text-align: left;

        &.small {
          max-width: 10px;
        }
      }
    }
  }
`

const TransactionsCount = styled('div')`
  margin-top: 5px;
  font-weight: bold;
  text-align: left;
`

const Pagination = styled('div')`
  margin-top: 10px;
  text-align: left;

  span {
    padding-right: 5px;
  }
`

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      totalElements: 0,
      totalPages: 0,
      size: 20,
      page: 0,
      items: [],
      search: ''
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    let url = 'https://hmny-t.co/one-registrations'
    let query = this.querystring({
      size: this.state.size,
      page: this.state.page
    })
    this.state.items = []

    if (this.state.search.length) {
      query = this.querystring({
        search: this.state.search,
        size: this.state.size,
        page: this.state.page
      })
    }

    url = `${url}${query}`

    const response = await fetch(url)
    const data = await response.json()
    this.setState({
      isLoaded: true,
      items: data.content,
      totalElements: data.totalElements,
      totalPages: data.totalPages
    })
  }

  handleInputChanged(e) {
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState(
      {
        page: 0
      },
      () => {
        this.getData()
      }
    )
  }

  clearHandler = e => {
    if (this.state.search.length < 1) {
      this.setState(
        {
          page: 0
        },
        () => {
          this.getData()
        }
      )
    }
  }

  handleClick(e, pageLink) {
    e.preventDefault()

    this.setState(
      {
        page: pageLink
      },
      () => {
        this.getData()
      }
    )
  }

  querystring(query = {}) {
    const qs = Object.entries(query)
      .filter(pair => pair[1] !== undefined)
      .map(pair =>
        pair
          .filter(i => i !== null)
          .map(encodeURIComponent)
          .join('=')
      )
      .join('&')

    return qs && '?' + qs
  }

  render() {
    const { isLoaded, items, totalElements, totalPages, page } = this.state

    if (isLoaded) {
      return (
        <div>
          <Search>
            <form onSubmit={this.handleSubmit}>
              <div className="search-container">
                <i class="icon" />
                <input
                  value={this.state.search}
                  onChange={this.handleInputChanged.bind(this)}
                  ref={element =>
                    ((element || {}).onsearch = this.clearHandler)
                  }
                  type="search"
                  id="search"
                  placeholder="Search for domain or owner address"
                  spellcheck="false"
                />
                <button type="submit">Search</button>
              </div>
            </form>
          </Search>

          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Owner</th>
                  <th>Price</th>
                  <th>Expires</th>
                </tr>
              </thead>
              {items.map(function(row, index) {
                return (
                  <tr key={index}>
                    <td className="small">{row.domain}</td>
                    <td>
                      <a
                        href={
                          'https://explorer.harmony.one/#/address/' +
                          row.ownerONE
                        }
                        target="_blank"
                      >
                        {row.ownerONE}
                      </a>
                    </td>
                    <td className="small">{row.price}</td>
                    <td className="small">{row.expires}</td>
                  </tr>
                )
              })}
            </table>

            <TransactionsCount>
              {totalElements.toLocaleString()} transactions found
            </TransactionsCount>

            <Pagination>
              {[...Array(totalPages).keys()].map((pageLink, index) => {
                if (totalPages < 2) {
                  return <span />
                } else if (pageLink == page) {
                  return (
                    <span>
                      <span>
                        <strong>{pageLink + 1}</strong>
                      </span>
                    </span>
                  )
                } else {
                  return (
                    <span key={index}>
                      <span>
                        <a href="" onClick={e => this.handleClick(e, pageLink)}>
                          {pageLink + 1}
                        </a>
                      </span>
                    </span>
                  )
                }
              })}
            </Pagination>
          </TableContainer>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default Table
