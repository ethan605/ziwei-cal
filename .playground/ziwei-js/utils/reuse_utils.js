_Ziwei_Calculator.prototype.mergeSequencesFromIndex = function(firstSequence, secondSequence, mergeIndex, reversedOrder = false) {
  var secondSeq = secondSequence.slice();

  // re-arrange second sequence in order of first one,
  // skip if mergeIndex is 1 (2 sequences have identical order)
  if (mergeIndex != 1) {
    var [firstHalf, secondHalf] = [[], []];

    if (!reversedOrder) {
      firstHalf = secondSeq.slice(12-mergeIndex+1, secondSeq.length);
      secondHalf = secondSeq.slice(0, 12-mergeIndex+1);
    } else {
      firstHalf = secondSeq.slice(0, mergeIndex).reverse();
      secondHalf = secondSeq.slice(mergeIndex, secondSeq.length).reverse();
    }

    secondSeq = firstHalf.concat(secondHalf);
  }

  return [firstSequence, secondSeq].transpose().toHash();
};

_Ziwei_Calculator.prototype.insertSingleStarToPalace = function(palace, star, configModule) {
  if (star === undefined)
    return;

  quality = Ziwei.Configs[configModule].Qualities[star];
  palace[`${quality}Stars`].push(star);
};

_Ziwei_Calculator.prototype.insertMultipleStarsToPalace = function(palace, stars, configModule) {
  if (stars === undefined || stars.constructor !== Array)
    return;

  ['good', 'bad'].forEach((quality) => {
    qualifiedStars = stars.filter((star) => Ziwei.Configs[configModule].Qualities[star] === quality);
    palace[`${quality}Stars`].push(...qualifiedStars);
  });

  // Another equivalent way
  // stars.forEach((star) => {
  //   quality = Ziwei.Configs[configModule].Qualities[star];
  //   palace[`${quality}Stars`].push(star);
  // });
};