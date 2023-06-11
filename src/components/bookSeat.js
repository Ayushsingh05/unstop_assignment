import { getSeatNumber } from "./helper";

export function errorCheck(seat_matrix, seats_to_book) {
  if (seats_to_book < 1 || seats_to_book > 7) {
    return { error: true, msg: "Enter a valid number between 1 and 7" };
  }

  let empty_seats = 0;
  for (let row = 0; row < seat_matrix.length; row++) {
    for (let seat = 0; seat < seat_matrix[row].length; seat++) {
      if (!seat_matrix[row][seat]) {
        empty_seats++;
      }
    }
  }
  if (seats_to_book > empty_seats) {
    return { error: true, msg: "Sufficient seats not available" };
  }

  return { error: false, msg: "" };
}

function bookSeatsInARow(seat_matrix, booked_seat_arr, row_no, seats_to_book) {
  for (let i = 0; i < seat_matrix[row_no].length && seats_to_book > 0; i++) {
    if (!seat_matrix[row_no][i]) {
      seat_matrix[row_no][i] = true;
      booked_seat_arr.push(getSeatNumber(row_no, i));
      seats_to_book--;
    }
  }
  return seats_to_book;
}

export function bookSeat(seat_matrix, seats_to_book) {
  let booked_seat_arr = [];
  let booked_rows = new Set();

  let row_empty_seats = seat_matrix.map((row, index) => [
    index,
    row.filter((seat) => !seat).length,
  ]);

  let sorted_row_seats = row_empty_seats.slice().sort((a, b) => b[1] - a[1]);

  let ptr, selected_row;
  for (ptr = 0; ptr < sorted_row_seats.length; ptr++) {
    if (seats_to_book > sorted_row_seats[ptr][1]) {
      break;
    }
  }
  if (ptr === 0) {
    selected_row = sorted_row_seats[ptr][0];
  } else {
    selected_row = sorted_row_seats[ptr - 1][0];
  }

  booked_rows.add(selected_row);
  let seats_left = bookSeatsInARow(
    seat_matrix,
    booked_seat_arr,
    selected_row,
    seats_to_book
  );

  while (seats_left > 0 && booked_seat_arr.length < 80) {
    let capable_row = null;
    let closest_distance = Number.POSITIVE_INFINITY;

    row_empty_seats.forEach((item) => {
      let row = item[0];
      let empty_seats = item[1];
      if (booked_rows.has(row)) return;
      if (empty_seats >= seats_left) {
        let distance = Math.abs(selected_row - row);
        if (distance < closest_distance) {
          capable_row = row;
          closest_distance = distance;
        }
      }
    });

    if (capable_row !== null) {
      booked_rows.add(capable_row);
      seats_left = bookSeatsInARow(
        seat_matrix,
        booked_seat_arr,
        capable_row,
        seats_left
      );
    } else {
      ptr++;
      selected_row = sorted_row_seats[ptr][0];
      booked_rows.add(selected_row);
      seats_left = bookSeatsInARow(
        seat_matrix,
        booked_seat_arr,
        selected_row,
        seats_left
      );
    }
  }

  return [seat_matrix, booked_seat_arr];
}
