import React from 'react'
import MainView from './views/MainView'
import PropTypes from 'prop-types'

// const App = props => <MainView graphId={props.id}/>
const App = props => {
  return <MainView {...props} />
}

App.propTypes = {
  dehydrated: PropTypes.object,
  drawer: PropTypes.bool,
  dev: PropTypes.bool,
  style: PropTypes.any,
  fullscreen: PropTypes.bool,
  mathbox: PropTypes.any,
  domElement: PropTypes.any,
  storeRef: PropTypes.any
}

export default App
