import React, { useEffect, useState } from "react";

function GameLayout(props) {
  const [pcList, setPcList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userPickList, setUserPickList] = useState([]);
  const [sum, setSum] = useState([]);
  const [win, setWin] = useState("");

  // disabled 조건
  const isChkboxDisabled = userPickList.length >= 2 || sum.length > 0;
  const isStartDisabled = pcList.length > 0;
  const isSelectDisabled = !(userPickList.length === 2 && sum.length === 0);
  const isResetDisabled = sum.length === 0;

  // 랜덤숫자 구하기
  const getRendomNumber = (length, max) => {
    const result = [];
    while (result.length < length) {
      const rand = Math.floor(Math.random() * max) + 1;
      if (!result.includes(rand)) result.push(rand);
    }
    return result;
  };

  // 카드 뿌리기
  const createCard = () => {
    resetCard();

    const newNumPc = getRendomNumber(2, 21);
    const newNumUser = getRendomNumber(5, 21);

    setPcList(newNumPc);
    setUserList(newNumUser);
  };

  // 유저가 선택한 카드 번호 2자리
  const handleInput = (e) => {
    const value = Number(e.target.value);
    const newList = [...userPickList, value];
    setUserPickList(newList);
  };

  //
  const resultCard = () => {
    const pcSum = pcList.reduce((acc, cur) => acc + cur);
    const userSum = userPickList.reduce((acc, cur) => acc + cur, 0);

    if (pcSum > userSum) {
      setWin("PC 승!");
    } else if (pcSum < userSum) {
      setWin("user 승!");
    } else {
      setWin("무승부!");
    }

    setSum([pcSum, userSum]);
  };

  const resetCard = () => {
    setPcList([]);
    setUserList([]);
    setUserPickList([]);
    setSum([]);
    setWin("");
  };

  // 클릭 후 실행
  useEffect(() => {
    console.log("=========== 결과 ============");
    console.log("pcList 카드:", pcList);
    console.log("user 랜덤 카드:", userList);
    console.log("user 고른 카드:", userPickList);
  }, [pcList, userPickList, userList]);

  return (
    <div>
      <div className="container">
        {userList?.map((cardNum, i) => (
          <div key={i} className="card box-item">
            <label htmlFor={`card-${cardNum}`}></label>
            <input
              type="checkbox"
              id={`card-${cardNum}`}
              name="card"
              value={cardNum}
              checked={userPickList.includes(cardNum)}
              disabled={isChkboxDisabled}
              onChange={handleInput}
            />
            <p>{cardNum}</p>
          </div>
        ))}
      </div>

      {/* btn */}
      <div className="btn-box">
        <button
          type="button"
          className="btn btn-dark"
          onClick={createCard}
          disabled={isStartDisabled}
        >
          시작
        </button>
        <button
          type="button"
          className="btn btn-pick"
          onClick={resultCard}
          disabled={isSelectDisabled}
        >
          선택
        </button>
        <button
          type="button"
          className="btn btn-delete"
          onClick={resetCard}
          disabled={isResetDisabled}
        >
          리셋
        </button>
      </div>

      {/* result text */}
      {sum.length > 0 && (
        <div className="txt-box">
          <div className="txt-item">
            <strong>PC 랜덤 카드</strong>
            <span>
              {pcList.join(", ")} = {sum[0]}
            </span>
          </div>
          <div className="txt-item">
            <strong>유저가 고른 카드</strong>
            <span>
              {userPickList.join(", ")} = {sum[1]}
            </span>
          </div>
          <div className="txt-item win">
            <strong>{win}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameLayout;
