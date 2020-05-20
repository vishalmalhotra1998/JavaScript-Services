import React,{useState} from 'react';

const checkHooks = () => {

  let [count, setCount] = useState(0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
        </button>
    </>
  )
}

export default checkHooks;