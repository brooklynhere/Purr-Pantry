import moment from 'moment';

export function DateToISOString(jsonDate) {
    return new Date(moment(jsonDate).toISOString());
}