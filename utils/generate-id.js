const genId = (name) => {
  let firstTwoWords = name
    .split(" ")
    .slice(0, 2)
    .map((word, index) =>
      index > 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toLowerCase()
    )
    .join("");
  const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  return `${firstTwoWords}${randomNumber}`;
};

export default genId;
