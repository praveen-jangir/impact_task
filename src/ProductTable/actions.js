import axios from 'axios';

export const fetchData = () => {
  return (dispatch) => {
    const storedData = localStorage.getItem('data');

    if (storedData) {
      dispatch({
        type: 'FETCH_DATA',
        payload: JSON.parse(storedData),
      });
    } else {
      axios
        .get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json')
        .then((response) => {
          dispatch({
            type: 'FETCH_DATA',
            payload: response.data,
          });
        })
        .catch((error) => {
          console.log('Error fetching data:', error);
        });
    }
  };
};

export const updatePrice = (recipeId, newValue) => {
  return {
    type: 'UPDATE_PRICE',
    payload: {
      recipeId,
      newValue,
    },
  };
};

export const savePrices = () => {
  return (dispatch, getState) => {
    const editedPrices = getState().data.map((recipe) => {
      const editedPrice = localStorage.getItem(`recipe_${recipe.id}`);
      return {
        ...recipe,
        price: editedPrice || recipe.price,
      };
    });
    localStorage.setItem('data', JSON.stringify(editedPrices));

    dispatch({
      type: 'SAVE_PRICES',
      payload: editedPrices,
    });
  };
};

export const resetPrices = (originalData) => {
  localStorage.removeItem('data');

  return {
    type: 'RESET_PRICES',
    payload: originalData,
  };
};
