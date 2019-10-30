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

const findMonth = monthInString => {    
    const result = months.find(month => month[monthInString]);
    const keys = Object.keys(result || {})
    const formatedMonth = result[keys[0]];
    return formatedMonth;
}

export const formatDate = date => {
    const originalDate = date.split(" ");
    const month = findMonth(originalDate[1]);
    const formatedDate = `${originalDate[2]}-${month}-${originalDate[0]}`
    return formatedDate;
};

export const updateFavorite = ({moveTitle, moves, actors}) => {
    return actors.map(actor => {
      return {
        [actor]: moves[actor].map(move => {
          if (move["Film"] === moveTitle && !move.isFavorite) {
            return {
              ...move,
              isFavorite: true
            };
          }
          if (move["Film"] === moveTitle && move.isFavorite) {
            return {
              ...move,
              isFavorite: false
            };
          }
          return move;
        })
      }
    });
  };

