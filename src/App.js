import "./App.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as helper from "./components/helper";
import { bookSeat, errorCheck } from "./components/bookSeat";

let matrix = new Array(helper.TOTAL_ROWS - 1);
for (let row = 0; row < helper.TOTAL_ROWS - 1; row++) {
  matrix[row] = new Array(helper.SEATS_PER_ROW).fill(false);
}
matrix.push(new Array(3).fill(false));

function App() {
  const [booked_seats_arr, setBookedSeatsArr] = useState([]);

  const [seat_matrix, setSeatMatrix] = useState(matrix);
  const handleSeatBooking = () => {
    let matrix_copy = [...seat_matrix];
    let error_result = errorCheck(matrix_copy, seats_to_book);
    if (error_result.error) {
      toast.error(error_result.msg, { position: "top-center" });
      return;
    }

    let [latest_booked_matrix, booked_seats_arr] = bookSeat(
      matrix_copy,
      seats_to_book
    );
    setBookedSeatsArr(booked_seats_arr);
    setSeatMatrix(latest_booked_matrix);
    toast.success("Seat booked successfully.", { position: "top-center" });
  };

  const [seats_to_book, setSeatsToBook] = useState("");
  const handleSeatInput = (event) => {
    setSeatsToBook(event.target.value);
  };

  return (
    <div className="App">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <img src="/images/logo.png" />
          <span className="navbar-brand mb-0 h1">
             Seat Reservation
          </span>
        </div>
      </nav>

      <div className="container-sm d-flex justify-content-around mt-3 main-wrapper">
        <div>
          <form>
            <label htmlFor="seats-to-book" className="form-label">
              Enter the number of seats you want to book.
            </label>
            <input
              type="number"
              id="seats-to-book"
              className="form-control"
              value={seats_to_book}
              onChange={handleSeatInput}
            />
            <div id="help-block" className="form-text">
              You can book a maximum of 7 seats at a time.
            </div>
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={handleSeatBooking}
            >
              Book seats
            </button>
          </form>

          {booked_seats_arr.length > 0 && (
            <div className="mt-2">
              <div>
                <strong>You have been allotted the following seats : </strong>
              </div>
              {booked_seats_arr.join(", ")}
            </div>
          )}
        </div>

        <div className="grid-wrapper">
        <div className="seat-arrangement">
  <h2>Seat Arrangement</h2>
  <div className="legend-wrapper">
    <div className="legend vacant-seat-legend">Vacant Seat</div>
    <div className="legend booked-seat-legend">Booked Seat</div>
  </div>
</div>


          <table className="matrix">
            <tbody>
              {seat_matrix.map((row, row_index) => (
                <tr key={row_index}>
                  {row.map((seat, seat_index) => {
                    return (
                      <td
                        key={seat_index}
                        className={seat ? "booked-seat" : "vacant-seat"}
                      >
                        {helper.getSeatNumber(row_index, seat_index)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
