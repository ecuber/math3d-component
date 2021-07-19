import React from 'react'
import MainView from './views/MainView'
import PropTypes from 'prop-types'

// const App = props => <MainView graphId={props.id}/>
const App = props => {
  return <MainView {...props} />
}

App.propTypes = {
  dehydrated: PropTypes.object,
  drawerDefault: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
}

export default App
