/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useCallback, useState } from 'react'
export const ChildNoMemo = () => {
  console.count('child no memo rendering')
  return <div>child no memo</div>
}
export const ChildMemo = memo(() => {
  console.count('child with memo rendering')
  return <div>child with memo</div>
})
export const ChildNoMemo2 = ({ onClick }: { onClick?: () => void }) => {
  console.count('child no memo2 rendering')
  return <div onClick={onClick}>child no memo</div>
}
export const ChildMemo2 = memo(({ onClick }: { onClick?: () => void }) => {
  console.count('child with memo2 rendering')
  return <div onClick={onClick}>child with memo</div>
})

export const Parent = () => {
  const [num, setNum] = useState<number>(0)
  const handleClick = useCallback(() => {
    setNum(Math.random())
  }, [])
  // const handleClick = () => {
  //   setNum(Math.random())
  // }
  return (
    <div>
      <p>{num}</p>
      <p>
        <button
          // onClick={() => {
          //   setNum(Math.random())
          // }}
          onClick={handleClick}
        >
          change
        </button>
      </p>
      <ChildNoMemo />
      <ChildMemo />
      <ChildNoMemo2 onClick={handleClick} />
      <ChildMemo2 onClick={handleClick} />
    </div>
  )
}
