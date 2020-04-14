function secondsToHMS(totalSeconds) {
  const hours = totalSeconds / (60*60) |0;
  const minutes = totalSeconds / 60 % 60 |0;
  const seconds = totalSeconds % 60 |0;
  const appendZero = n => n < 10 ? `0${n}` : n;

  return `${appendZero(hours)}:${appendZero(minutes)}:${appendZero(seconds)}`;
}

export default secondsToHMS;
