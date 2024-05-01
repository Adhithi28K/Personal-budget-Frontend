import React from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBBtn,
} from "mdb-react-ui-kit";

function App({ data, remove }) {
    
  return (
    <MDBContainer fluid>
      <section>
        <div className="shadow-4 rounded-5 overflow-hidden">
          <MDBTable>
            <MDBTableHead light>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody style={{ verticalAlign: "middle" }}>
              {data.map((item, index) => (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/green_prodpictdollar_1484336218-1.png"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{item.name}</p>
                        <p className="text-muted mb-0">#C{index+1}</p>
                      </div>
                    </div>
                  </td>
                  <td>$ {item.allocatedAmount}</td>
                  <td>
                    <MDBBtn
                      className="fw-bold"
                      color="link"
                      rounded
                      size="sm"
                      rippleColor="dark"
                      onClick={()=>remove(item._id)}
                    >
                      Remove
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
            <div style={{padding:'20px'}} ><h4>Budget</h4></div>
          </MDBTable>
        </div>
      </section>
    </MDBContainer>
  );
}

export default App;
