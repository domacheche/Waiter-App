import { API_URL } from "../config";

const createActionName = actionName => `app/tables/${actionName}`;
export const FETCH_TABLES_START = createActionName("FETCH_TABLES_START");
export const FETCH_TABLES_SUCCESS = createActionName("FETCH_TABLES_SUCCESS");
export const FETCH_TABLES_FAILURE = createActionName("FETCH_TABLES_FAILURE");
export const ADD_TABLE_SUCCESS = createActionName("ADD_TABLE_SUCCESS");
export const REMOVE_TABLE_SUCCESS = createActionName("REMOVE_TABLE_SUCCESS");
export const EDIT_TABLE_SUCCESS = createActionName("EDIT_TABLE_SUCCESS");

export const fetchTablesStart = () => ({ type: FETCH_TABLES_START });
export const fetchTablesSuccess = payload => ({ type: FETCH_TABLES_SUCCESS, payload });
export const fetchTablesFailure = error => ({ type: FETCH_TABLES_FAILURE, error });
export const addTableSuccess = payload => ({ type: ADD_TABLE_SUCCESS, payload });
export const removeTableSuccess = tableId => ({ type: REMOVE_TABLE_SUCCESS, tableId });
export const editTableSuccess = payload => ({ type: EDIT_TABLE_SUCCESS, payload });

export const fetchTables = () => {
  return dispatch => {
    dispatch(fetchTablesStart());
    fetch(`${API_URL}/tables`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(tables => dispatch(fetchTablesSuccess(tables)))
      .catch(error => dispatch(fetchTablesFailure(error.toString())));
  };
};

export const addTableRequest = newTable => {
  return dispatch => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTable),
    };
    fetch(`${API_URL}/tables`, options)
      .then(() => dispatch(fetchTables()));
  };
};

export const removeTableRequest = tableId => {
  return dispatch => {
    const options = {
      method: 'DELETE',
    };
    fetch(`${API_URL}/tables/${tableId}`, options)
      .then(() => dispatch(fetchTables()));
  };
};

export const editTableRequest = table => {
  return dispatch => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(table),
    };
    fetch(`${API_URL}/tables/${table.id}`, options)
      .then(() => dispatch(fetchTables()));
  };
};

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLES_START:
      return { ...state, loading: true, error: null };
    case FETCH_TABLES_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_TABLES_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ADD_TABLE_SUCCESS:
    case REMOVE_TABLE_SUCCESS:
    case EDIT_TABLE_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};

export const getAllTables = state => state.tables.data || [];
export const getTableById = (state, tableId) => state.tables.data.find(table => table.id === tableId);

export default tableReducer;
