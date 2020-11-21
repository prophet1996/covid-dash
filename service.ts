import { STATE_LOOKUP } from "./constants";

export const getStateData = async (state) => {
    
    const response = await fetch(`http://localhost:3000/api/state/${STATE_LOOKUP[state]}`);
    return await response.json();
    
}