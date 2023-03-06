import React, { useCallback, useState } from 'react'

export const useStateDemo = (arg: number) => {
  const [num, setNum] = useState<number>(0)

  const changeNum = useCallback((n: number) => {
    setNum(n)
  }, [])

  console.log(num, 'num', arg)

  return {
    num,
    changeNum,
  }
}

export const Component1 = () => {
  const { num } = useStateDemo(1)
  return <div>{num}</div>
}

export const Component2 = () => {
  const { num, changeNum } = useStateDemo(2)

  return (
    <div
      style={{ width: 100, padding: 6 }}
      onClick={() => {
        changeNum(num + 1)
      }}
    >
      {num}
    </div>
  )
}
