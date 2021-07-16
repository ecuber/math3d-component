/**
 * @jest-environment jsdom
 */

import React from 'react'
import App from './index'
import { render } from '@testing-library/react'

it('should render without crashing', () => {
  render(<App />)
} )
