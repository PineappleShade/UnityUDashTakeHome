const timestamp = () => {
  return Math.floor(Date.now() / 1000);
};

module.exports = {
  timestamp,
};