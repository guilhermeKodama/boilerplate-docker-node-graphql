import React, { Component } from 'react'
import MaterialTable from 'material-table'

class ManageTable extends Component {
  state = {
    columns: this.props.columns,
    data: this.props.data
  }

  fetchData = (query, resolve) => {
    const { fetchMore, dataKey } = this.props
    try {
      fetchMore({
        variables: {
          offset:  query.page * query.pageSize,
          limit: query.pageSize
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          resolve({
            data: fetchMoreResult[dataKey].data,
            page: query.page,
            totalCount: fetchMoreResult.users.total
          })
          return {
            users: fetchMoreResult[dataKey]
          }
        }
      })
    } catch(e) {
      console.log('ERROR:', e)
    }
  }

  render() {
    const { addData, updateData, deleteData } = this.props
    const { columns, data } = this.state
    return (
      <MaterialTable
        title="Users"
        columns={columns}
        data={query =>
          new Promise((resolve, reject) => {
            this.fetchData(query, resolve)
          })
        }
        editable={{
          isEditable: false,
          isDeletable: false,
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                if (addData) {
                  // const data = [...this.state.data]
                  // data.push(newData)
                  // this.setState({ ...this.state, data })

                  // add data to server
                  addData(newData)
                }
              }, 600)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                if (updateData) {
                  // const data = [...this.state.data]
                  // data[data.indexOf(oldData)] = newData
                  // this.setState({ ...this.state, data })
                  updateData()
                }
              }, 600)
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                if (deleteData) {
                  // const data = [...this.state.data]
                  // data.splice(data.indexOf(oldData), 1)
                  // this.setState({ ...this.state, data })
                  deleteData()
                }
              }, 600)
            }),
        }}
      />
    )
  }
}

export default ManageTable
