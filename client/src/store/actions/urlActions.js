import axios from 'axios';
import { apiUrl } from '../../services/api';

export const shortenUrl = (originalUrl) => async (dispatch) => {
  try {
    dispatch({ type: 'SHORTEN_URL_REQUEST' });
    
    const response = await axios.post(`${apiUrl}/shorten`, { originalUrl });
    
    dispatch({
      type: 'SHORTEN_URL_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'SHORTEN_URL_FAILURE',
      payload: error.response?.data?.error || 'Server error'
    });
  }
};

export const resetUrlState = () => ({ type: 'RESET_URL_STATE' });