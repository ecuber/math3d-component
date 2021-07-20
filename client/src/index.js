import React from 'react'
import PropTypes from 'prop-types'
import 'process'
import store from './store'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { hasMeaningfulChangeOccured } from './services/lastSavedState/index'
import MathScopeProvider from './containers/MathScopeContext'
import { scopeEvaluator, parser } from './constants/parsing'
import theme from './constants/theme'

import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

const Math3D = (props) => {
  return (
    // TODO: test putting component in a resized parent div to see if it adapts to the container
    <div style={{
      height: '100%', // will be overwritten if given by props.style
      width: '100%',
      ...props.style
    }}>
      <Provider store={store}>
        <MathScopeProvider scopeEvaluator={scopeEvaluator} parser={parser}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <App {...props}/>
            </BrowserRouter>
          </ThemeProvider>
        </MathScopeProvider>
      </Provider>
    </div>
  )
}

Math3D.propTypes = {
  dehydrated: PropTypes.object,
  drawer: PropTypes.bool,
  dev: PropTypes.bool,
  style: PropTypes.object
}

export default Math3D
