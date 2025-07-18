import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

function GameLayout(props) {
  const [pcList, setPcList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userPickList, setUserPickList] = useState([]);
  const [sum, setSum] = useState([]);
  const [win, setWin] = useState("");

  // 버튼 disabled 조건
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
    if (e.target.checked) {
      if (userPickList.length >= 2) {
        alert("2개 선택 가능합니다.");
        return;
      }
      setUserPickList(newList);
    } else {
      setUserPickList(userPickList.filter((v) => v !== value));
    }
  };

  // 선택 버튼 => 결과 확인
  const resultCard = () => {
    const pcSum = pcList.reduce((acc, cur) => acc + cur);
    const userSum = userPickList.reduce((acc, cur) => acc + cur, 0);

    if (pcSum > userSum) {
      setWin("PC 승!");
    } else if (pcSum < userSum) {
      setWin("유저 승!");
    } else {
      setWin("무승부!");
    }

    setSum([pcSum, userSum]);
  };

  // 리셋
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
    console.log("유저 랜덤 카드:", userList);
    console.log("유저 선택 카드:", userPickList);
  }, [pcList, userPickList, userList]);

  return (
    <div>
      <div className="container">
        {userList?.map((cardNum, i) => (
          <GameCard
            key={i}
            number={cardNum}
            sum={sum}
            userPickList={userPickList}
            handleInput={handleInput}
          />
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
            <strong>유저 선택 카드</strong>
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
