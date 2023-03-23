const changeArray = (originalArray, updatedArray) => {
  const newElements = updatedArray.filter(
    (item) => !originalArray.includes(item)
  );
  const removedElements = originalArray.filter(
    (item) => !updatedArray.includes(item)
  );
  return [newElements, removedElements];
};

//testing
console.log(changeArray([1, 2, 3, 4, 5], [1, 2, 3, 6]));
