const months = [
  { January: "01" },
  { February: "02" },
  { March: "3" },
  { April: "4" },
  { May: "5" },
  { June: "6" },
  { July: "7" },
  { August: "8" },
  { September: "9" },
  { October: "10" },
  { November: "11" },
  { December: "12" }
];

const convertMonthToNumber = monthInString => {
  const result = months.find(month => month[monthInString]);
  const keys = Object.keys(result || {});
  const formatedMonth = result[keys[0]];
  return formatedMonth;
};

export const formatDate = date => {
  if (date && date.length === 10) {
    return date;
  }

  const originalDate = date.split(" ");
  const month = convertMonthToNumber(originalDate[1]);
  const formatedDate = `${originalDate[2]}-${month}-${originalDate[0]}`;
  return formatedDate;
};

export const markMoveAsFavorite = (moveTitle, currentActor) => {
  let movesDate = {};
  const moves = getMovesData();
  for (let actor in moves) {
    if (actor === currentActor) {
      const films = moves[actor].map(actor => {
        if (actor["Film"] === moveTitle && !actor.isFavorite) {
          return {
            ...actor,
            isFavorite: true
          };
        }
        if (actor["Film"] === moveTitle && actor.isFavorite) {
          return {
            ...actor,
            isFavorite: false
          };
        }
        return actor;
      });
      movesDate = { ...movesDate, [actor]: films };
    } else {
      movesDate = { ...movesDate, [actor]: moves[actor] };
    }
  }
  return movesDate;
};

export const addId = data => {
  let movesDate = {};
  for (let moveType in data) {
    const films = data[moveType].map((moveContents, index) => {
      return {
        id: index,
        ...moveContents
      };
    });
    movesDate = { ...movesDate, [moveType]: films };
  }
  return movesDate;
};

export const storeMovesData = data => {
  return Promise.resolve(
    localStorage.setItem("getMovesData", JSON.stringify(addId(data)))
  );
};

export const getMovesData = () => {
  const films = localStorage.getItem("getMovesData");
  const moves = films ? JSON.parse(films) : {};
  return moves;
};

export const updateMovesData = (newData, moveType) => {
  const currentData = getMovesData();
  currentData[moveType] = [
    ...currentData[moveType],
    { id: currentData[moveType].length, ...newData }
  ];
  storeMovesData(currentData);
};

export const addFormatedDate = () => {
  let movesDate = {};
  const moves = getMovesData();
  for (let move in moves) {
    const films = moves[move].map((moveContents, index) => {
      return {
        id: index,
        ...moveContents,
        date: formatDate(moveContents["UK release date"])
      };
    });
    movesDate = { ...movesDate, [move]: films };
  }
  return movesDate;
};

export const getActorsData = () => {
  return Object.keys(getMovesData() || {});
};

export const getFavoriteMoves = () => {
  let movesDate = {};
  const moves = getMovesData();
  for (let move in moves) {
    const films = moves[move].filter(moveContent => moveContent.isFavorite);
    movesDate = { ...movesDate, [move]: films };
  }
  return movesDate;
};
