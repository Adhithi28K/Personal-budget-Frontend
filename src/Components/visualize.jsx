import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardHeader,
  MDBCol,
//   MDBDatepicker,
//   MDBSelectDeprecated,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
//   MDBChart,
  MDBBtn,
  MDBBadge,
} from 'mdb-react-ui-kit';
import { Select } from '@chakra-ui/react'
import CategoryPieChart from './PieChart';
const months = [
    { value: 0, label: "All Months" },
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
function App({data,piechartdata,handleSelectMonth,selectedMonth}) {
  const [datepickerValue, setDatepickerValue] = useState('');
  
  return (
    <MDBContainer fluid>
      <MDBRow className='justify-content-center'>
        <MDBCol md='12'>
          <section>
            <MDBCard>
              <MDBCardHeader className='py-3'>
                <MDBRow>
                  <MDBCol size='6'>
                    <p className='text-uppercase small mb-2'>
                      <strong>Expense by Category</strong>
                    </p>
                    <h5 className='mb-0'>
                      <strong>$ {data.reduce(
    (acc, item) => acc + item.totalExpense,
    0
  )}</strong>
                      <small className='text-success ms-2'>
                        <MDBIcon fas size='sm' icon='arrow-up' className='pe-1' />
                        {((data.reduce(
    (acc, item) => acc + item.totalExpense,
    0
  ))/(data.reduce(
    (acc, item) => acc + item.allocatedAmount,
    0
  ))*100).toFixed(2)}% amount spent
                      </small>
                    </h5>
                  </MDBCol>

                  <MDBCol size='6' className='text-end'>
                    {/* <MDBBtn type='button' className='mt-2'>
                      Details
                      </MDBBtn> */}
                      <Select onChange={handleSelectMonth} value={selectedMonth}>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </Select>
                    
                  </MDBCol>
                </MDBRow>
              </MDBCardHeader>

              <MDBCardBody>
                <MDBRow>
                  <MDBCol md='8' className='mb-4'>
                    <MDBTable hover>
                      <MDBTableHead>
                        <tr>
                          <th>Index</th>
                          <th>Category</th>
                          <th>Allocated Amount</th>
                          <th>Expnese Amount</th>
                          <th>Amount Left</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {data.map((category,index)=>(
                            <tr>
                          <td>{index+1}</td>
                          <td>{category.categoryName}</td>
                          <td>{category.allocatedAmount}</td>
                          <td>${category.totalExpense.toFixed(2)}</td>
                          <td>
                            <MDBBadge color={category.amountLeft>0?'success':'danger'}>{category.amountLeft}</MDBBadge>
                          </td>
                        </tr>
                        ))}
                        
                       
                        
                      </MDBTableBody>
                    </MDBTable>
                  </MDBCol>

                  <MDBCol md='4' className='mb-4'>
                    <CategoryPieChart data={piechartdata}/>
                    {/* <MDBChart
                      type='radar'
                      data={{
                        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                        datasets: [
                          {
                            label: 'Traffic',
                            data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
                            backgroundColor: [
                              'rgba(63, 81, 181, 0.5)',
                              'rgba(77, 182, 172, 0.5)',
                              'rgba(66, 133, 244, 0.5)',
                              'rgba(156, 39, 176, 0.5)',
                              'rgba(233, 30, 99, 0.5)',
                              'rgba(66, 73, 244, 0.4)',
                              'rgba(66, 133, 244, 0.2)',
                            ],
                          },
                        ],
                      }}
                    />

                    <MDBChart
                      type='polarArea'
                      data={{
                        labels: ['Monday', 'Tuesday', 'Wednesday'],
                        datasets: [
                          {
                            label: 'Traffic',
                            data: [2112, 2343, 2545],
                            backgroundColor: [
                              'rgba(63, 81, 181, 0.5)',
                              'rgba(77, 182, 172, 0.5)',
                              'rgba(66, 133, 244, 0.5)',
                            ],
                          },
                        ],
                      }}
                    /> */}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>

              <MDBCardFooter className='py-4'>
                <MDBRow>
                  <MDBCol md='6'>
                    {/* <MDBSelectDeprecated
                      label='Date'
                      data={[
                        { text: 'Today', value: 1, selected: true },
                        { text: 'Yesterday', value: 2 },
                        { text: 'Last 7 days', value: 3 },
                        { text: 'Last 28 days', value: 4 },
                        { text: 'Last 90 days', value: 5 },
                      ]}
                    /> */}
                  </MDBCol>

                  <MDBCol md='6'>
                    {/* <MDBDatepicker value={datepickerValue} setValue={setDatepickerValue} labelText='Date' /> */}
                  </MDBCol>
                </MDBRow>
              </MDBCardFooter>
            </MDBCard>
          </section>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default App;
