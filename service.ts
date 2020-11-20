
import {StateLookup} from './constants';
export const getStateData = async (state) => {
    
    const response = await fetch('http://localhost:3000/api/state/DL');
    return await response.json();
    
}