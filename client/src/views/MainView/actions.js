// import { getGraph } from '../../services/api'
import { loadDehydratedState } from 'store/actions';

// export function loadGraphFromDb(id) {

//   return async dispatch => {
//     const dehydrated = await fetch('./myGraphs.json') // loads json file from public folder
//       .then(res => res.json())
//       .then(data => data)

//     if (dehydrated[id]) {
//       const action = loadDehydratedState(dehydrated[id])
//       return dispatch(action)
//     }
//     else {
//       console.group()
//       console.warn(`Graph ${id} not found`)
//       // TODO: Better error handling on client
//       console.groupEnd()
//     }
//   }
// }

export function loadGraphFromDb(dehydrated) { // dehydrated is the scene in question

  return async dispatch => {
    if (dehydrated) {
      const action = loadDehydratedState(dehydrated)
      return dispatch(action)
    }
    else {
      console.group()
      console.warn(`You didn't provide a graph 🤔`)
      console.groupEnd()
    }
  }
}
