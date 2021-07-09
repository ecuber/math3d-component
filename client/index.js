import React from 'react'
import PropTypes from 'prop-types'
import store from './src/store'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './src/index.css'
import App from './src/App'
import { unregister } from './src/registerServiceWorker'
import { hasMeaningfulChangeOccured } from './src/services/lastSavedState/index'

import MathScopeProvider from './src/containers/MathScopeContext'
import { scopeEvaluator, parser } from './src/constants/parsing'

import theme from './src/constants/theme'
import { ThemeProvider } from 'styled-components'
// not sure where/why this is necessary but react is complaining
import { BrowserRouter } from 'react-router-dom'

const Math3D = (props) => {
  return (
    <Provider store={store}>
      <MathScopeProvider scopeEvaluator={scopeEvaluator} parser={parser}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App dehydrated={props.dehydrated}/>
          </BrowserRouter>
        </ThemeProvider>
      </MathScopeProvider>
    </Provider>
  )
}

Math3D.propTypes = {
  dehydrated: PropTypes.object
}

export default Math3D
