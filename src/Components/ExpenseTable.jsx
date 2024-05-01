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
                <th>Description</th>
                <th>Date</th>
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
                        src={"https://ui-avatars.com/api/?name="+item.categoryName+"&background=random"}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{item.description}</p>
                        <p className="text-muted mb-0">{item.categoryName}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">                    {new Date(item.date).toLocaleDateString()}</p>
                    {/* <p className="text-muted mb-0">IT department</p> */}
                  </td>
                  <td>
                    <MDBBadge light color="success" pill>
                    {item.categoryName}
                    </MDBBadge>
                  </td>
                  <td>$ {item.amount}</td>
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
          </MDBTable>
        </div>
      </section>
    </MDBContainer>
  );
}

export default App;
