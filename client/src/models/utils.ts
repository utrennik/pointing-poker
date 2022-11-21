import { IRoundVoteResults, VotingData } from './types';

export const id = (): string => `_${Math.random().toString(36).substr(2, 9)}`;

export const getVoteResults = (votingData: string[]): IRoundVoteResults[] => {
  const statsValuesObj = {};

  votingData.forEach((el: VotingData) => {
    if (el in statsValuesObj) {
      statsValuesObj[el] += 1;
    } else {
      statsValuesObj[el] = 1;
    }
  });

  const results: IRoundVoteResults[] = [];

  const keys = Object.keys(statsValuesObj);

  keys.forEach((key) => {
    results.push({
      score: key,
      percentage: Math.round((statsValuesObj[key] / votingData.length) * 100),
    });
  });

  return results;
};

export const getAverageVoteResults = (votingData: string[]): number | null => {
  const getAverageInArr = (arr: number[]): number =>
    Math.round(arr.reduce((acc, el) => acc + el, 0) / arr.length);
  const parsedNums: number[] = [];

  votingData.forEach((item) => {
    const parsed = parseInt(item, 10);
    if (typeof parsed === 'number' && !Number.isNaN(parsed)) {
      parsedNums.push(parsed);
    }
  });

  return parsedNums.length ? getAverageInArr(parsedNums) : null;
};
