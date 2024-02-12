export const handleTags = (userTags) => {
  const tg = userTags.map((i) => {
    const obj = {
      label: i.charAt(0).toUpperCase() + i.slice(1),
      value: i,
    };
    return obj;
  });
  return tg;
};

export const filterData = (data, searchInput) => {
  const fdata = data.filter((user) => {
    for (const key in searchInput) {
      const searchValues = searchInput[key];
      if (Array.isArray(searchValues) && searchValues.length === 0) {
        continue;
      }
      const userValue = user[key];
      if (Array.isArray(searchValues)) {
        if (
          !searchValues.some((searchVal) =>
            Array.isArray(userValue)
              ? userValue.includes(searchVal)
              : userValue === searchVal
          )
        ) {
          return false;
        }
      } else {
        if (
          Array.isArray(userValue)
            ? !userValue.includes(searchValues)
            : userValue !== searchValues
        ) {
          return false;
        }
      }
    }
    return true;
  });
  return fdata;
};
