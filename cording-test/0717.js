// 프로그래머스 코딩테스트 - 로또의 최고 순위와 최저 순위 javascript
function solution(lottos, win_nums) {
  const matchNum = lottos.filter((num) => win_nums.includes(num)); // 맞은 숫자
  const matchCount = matchNum.filter(Boolean).length; // 맞은 개수
  const countZero = lottos.filter((n) => n === 0).length; // 0의 개수
  const rank = {
    6: 1, // 맞은개수, 등수
    5: 2,
    4: 3,
    3: 4,
    2: 5,
    1: 6,
    0: 6,
  };

  const resultArr = [];
  resultArr[0] = rank[matchCount + countZero];
  resultArr[1] = rank[matchCount];

  return resultArr;
}
