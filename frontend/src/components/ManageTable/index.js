import React, { Component } from 'react'
import MaterialTable from 'material-table'

class ManageTable extends Component {
  state = {
    columns: this.props.columns,
    data: this.props.data
  }

  render() {
    const { columns, data } = this.state
    return (
      <MaterialTable
        title="Users"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                const data = [...this.state.data]
                data.push(newData)
                this.setState({ ...this.state, data })
              }, 600)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                const data = [...this.state.data]
                data[data.indexOf(oldData)] = newData
                this.setState({ ...this.state, data })
              }, 600)
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve()
                const data = [...this.state.data]
                data.splice(data.indexOf(oldData), 1)
                this.setState({ ...this.state, data })
              }, 600)
            }),
        }}
      />
    )
  }
}

export default ManageTable
