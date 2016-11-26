import stringSimilarity from 'string-similarity';
import _ from 'lodash';

export default (rawCandidates) => {
  const candidates = rawCandidates.filter(el => el != null && el !== '');
  if (candidates.length === 0) { return ''; }
  const distances = new Map();
  const totalDistances = {};

  candidates.forEach((candidate) => {
    totalDistances[candidate] = 0;
    candidates.forEach((secondCandidate) => {
      const key = [candidate, secondCandidate].sort();
      if (distances.has(key)) {
        totalDistances[candidate] += distances.get(key) ** 2;
      } else {
        const distance = stringSimilarity.compareTwoStrings(candidate, secondCandidate);
        distances.set(key, distance);
        totalDistances[candidate] += distance;
      }
    });
  });

  const keyValueDistances = _.keys(totalDistances).map(key =>
    ({ key, value: totalDistances[key] }));

  return _.maxBy(keyValueDistances, 'value').key;
};
