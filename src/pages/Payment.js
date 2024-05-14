import React from "react";

function Payment() {
  return (
    <>
      <div className="d-flex">
        <div>
          <h2>Confirm your booking</h2>
          <div>
            <form>
                <input type="text" placeholder="type your destination"/><br><br></br></br>
                <input type="number" placeholder="type your duration"/><br><br></br></br>
                <input type="number" placeholder="type your duration"/><br><br></br></br>


            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
