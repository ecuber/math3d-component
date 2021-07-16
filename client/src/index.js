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

// not sure where/why this is necessary but react is complaining
import { BrowserRouter } from 'react-router-dom'

const Math3D = (props) => {
  return (
    <div style={{ width: props.width, height: props.height }}>
      <Provider store={store}>
        <MathScopeProvider scopeEvaluator={scopeEvaluator} parser={parser}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <App dehydrated={props.dehydrated}/>
            </BrowserRouter>
          </ThemeProvider>
        </MathScopeProvider>
      </Provider>
    </div>
  )
}

Math3D.propTypes = {
  dehydrated: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Math3D
