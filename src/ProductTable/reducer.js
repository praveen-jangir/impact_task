const initialState = {
  data: [],
  originalData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        data: action.payload,
        originalData: action.payload,
      };

    case 'UPDATE_PRICE':
      return {
        ...state,
        data: state.data.map((recipe) => {
          if (recipe.id === action.payload.recipeId) {
            localStorage.setItem(`recipe_${recipe.id}`, action.payload.newValue);
            return {
              ...recipe,
              price: action.payload.newValue,
            };
          }
          return recipe;
        }),
      };

    case 'SAVE_PRICES':
      return {
        ...state,
        data: action.payload,
      };

    case 'RESET_PRICES':
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
