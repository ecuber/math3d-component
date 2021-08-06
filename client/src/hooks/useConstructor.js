import { useRef } from "react"

const useConstructor = (callback = () => {} ) => {
  const hasRun = useRef(false)
  if (hasRun.current) return
  callback()
  hasRun.current = true
}

export default useConstructor
