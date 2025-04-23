import { useState } from "react";

const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  // 카운터 값을 증가시키는 함수
  const increment = () => setCount((prevCount) => prevCount + 1);

  // 카운터 값을 감소시키는 함수
  const decrement = () => setCount((prevCount) => prevCount - 1);

  // 카운터 값을 초기화하는 함수
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

export default useCounter;
