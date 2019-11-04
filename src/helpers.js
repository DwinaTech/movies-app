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
  // If the date already in correct format return it
  if ((date && date.length === 10) || date.includes('-')) {
    return date;
  }
  const originalDate = date.split(" ");
  const month = convertMonthToNumber(originalDate[1]);
  const formatedDate = `${originalDate[2]}-${month}-${originalDate[0]}`;
  return formatedDate;
};

export const markMovieAsFavourite = ({ actor, id}) => {
  let moviesDate = {};
  const movies = getMoviesData();
  for (let movieType in movies) {
    if (movieType === actor) {
      const films = movies[movieType].map(actor => {
        if (actor.id === id && !actor.isFavourite) {
          return {
            ...actor,
            isFavourite: true
          };
        }
        if (actor.id === id && actor.isFavourite) {
          return {
            ...actor,
            isFavourite: false
          };
        }
        return actor;
      });
      moviesDate = { ...moviesDate, [movieType]: films };
    } else {
      moviesDate = { ...moviesDate, [movieType]: movies[movieType] };
    }
  }
  return moviesDate;
};

export const addId = data => {
  let moviesDate = {};
  for (let movieType in data) {
    const films = data[movieType].map((movieContents, index) => {
      return {
        id: index,
        ...movieContents
      };
    });
    moviesDate = { ...moviesDate, [movieType]: films };
  }
  return moviesDate;
};

export const storeMoviesData = data => {
  return Promise.resolve(
    localStorage.setItem("getMoviesData", JSON.stringify(addId(data)))
  );
};

export const getMoviesData = () => {
  const films = localStorage.getItem("getMoviesData");
  const movies = films ? JSON.parse(films) : {};
  return movies;
};

export const updateMoviesData = (newData, movieType) => {
  const currentData = getMoviesData();
  currentData[movieType] = [
    ...currentData[movieType],
    { id: currentData[movieType].length, ...newData }
  ];
  storeMoviesData(currentData);
};

export const addFormatedDate = () => {
  let moviesDate = {};
  const movies = getMoviesData();
  for (let movie in movies) {
    const films = movies[movie].map((movieContents, index) => {
      return {
        id: index,
        ...movieContents,
        date: formatDate(movieContents["UK release date"])
      };
    });
    moviesDate = { ...moviesDate, [movie]: films };
  }
  return moviesDate;
};

export const getActorsData = () => {
  return Object.keys(getMoviesData() || {});
};

export const getFavouriteMovies = () => {
  let moviesDate = {};
  const movies = getMoviesData();
  for (let movie in movies) {
    const films = movies[movie].filter(movieContent => movieContent.isFavourite);
    moviesDate = { ...moviesDate, [movie]: films };
  }
  return moviesDate;
};
