import {
  toggleProperty,
  setProperty
} from '../actions'
import { FOLDER } from './metadata'

export const setContentCollapsed = (id, value) => {
  return setProperty(id, FOLDER, 'isCollapsed', value)
}

export const toggleContentCollapsed = (id) => {
  return toggleProperty(id, FOLDER, 'isCollapsed')
}
