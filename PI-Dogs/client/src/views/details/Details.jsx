import React from 'react'
import { connect } from 'react-redux'

export const Details = (props) => {
  return (
    <div>Estoy en details</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Details)