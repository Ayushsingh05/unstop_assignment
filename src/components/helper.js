export const TOTAL_ROWS = 12;
export const MAX_SEAT_LIMIT = 7;
export const MIN_SEAT_LIMIT = 1;
export const SEATS_PER_ROW = 7;


export function getSeatNumber(row_no, col_no) {
    return (row_no * SEATS_PER_ROW) + col_no + 1;
}