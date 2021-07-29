import React from 'react'
import MainView from './views/MainView'
import PropTypes from 'prop-types'

// const App = props => <MainView graphId={props.id}/>
const App = props => {
  return <MainView {...{
    height: props?.style?.height ?? '100%',
    width: props?.style?.width ?? '100%',
    ...props } } />
}

App.propTypes = {
  dehydrated: PropTypes.object,
  drawer: PropTypes.bool,
  dev: PropTypes.bool,
  style: PropTypes.any,
  fullscreen: PropTypes.bool
}

export default App
