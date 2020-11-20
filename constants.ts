export const BASE_API_URL = `https://api.covid19india.org/v4/min/data.min.json`;
// https://api.covid19india.org/v4/min/timeseries-MH.min.json

export const STATE_CODES = [
    'AN', 'AP', 'AR', 'AS', 'BR',
    'CH', 'CT', 'DL', 'DN', 'GA',
    'GJ', 'HP', 'HR', 'JH', 'JK',
    'KA', 'KL', 'LA', 'MH', 'ML',
    'MN', 'MP', 'MZ', 'NL', 'OR',
    'PB', 'PY', 'RJ', 'SK', 'TG',
    'TN', 'TR', 'TT', 'UP', 'UT',
    'WB'
];


export const STATE_LOOKUP = {
    'DL':'Delhi'
}

export const STATE_DATA_KEYS = ["confirmed","deceased","other","recovered","tested"]