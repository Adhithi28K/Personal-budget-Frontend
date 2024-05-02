import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardHeader,
  MDBCol,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
} from 'mdb-react-ui-kit';
import StackedBarChart from './StackedBarChart'
import LineChart1 from './LineChart'
function App({categories,weeklyExpenses,extData}) {
  
    const [maxAmount,setMaxAmount] = useState(0);
    const [maxDay,setMaxDay] = useState('');
    useState(()=>{
        let maxa=0;
        let maxd='';
        weeklyExpenses[0].forEach(item => {
            if (item.amount > maxa) {
              maxa = item.amount;
              maxd = item.day;
            
            }
          });
          setMaxAmount(maxa)
            setMaxDay(maxd)
    },[weeklyExpenses])
    
  return (
    <MDBContainer fluid>
      <MDBRow className='justify-content-center'>
        <MDBCol md='12'>
          <section className='text-center'>
            <MDBRow>
              <MDBCol md='8' className='mb-4'>
                <MDBCard>
                  <MDBCardHeader className='py-3'>
                    <h5 className='mb-0'>Categorical Graph</h5>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <div className='d-flex justify-content-around'>
                      <div>
                        <p className='mb-2'>Most Expensive Category</p>
                        <h5>
                          {extData.mostExpensiveCategory}
                          <small className='text-success'>
                            <MDBIcon fas icon='caret-up' className='me-1' />
                            {/* <span>3.0%</span> */}
                          </small>
                        </h5>
                      </div>
                      <div>
                        <p className='mb-2'>Max Expense</p>
                        <h5>
                          $ {extData.maxExpense}
                          <small className='text-success'>
                            <MDBIcon fas icon='caret-up' className='me-1' />
                            {/* <span>4.5%</span> */}
                          </small>
                        </h5>
                      </div>
                    </div>
                    <StackedBarChart data={categories}  />

                    {/* <MDBChart
                      type='bar'
                      data={{
                        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday '],
                        datasets: [
                          // First dataset (bar)
                          {
                            label: 'Impressions',
                            data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
                            order: 2,
                          },
                          // Second dataset (line)
                          {
                            label: 'Impressions (absolute top) %',
                            data: [211, 2543, 2745, 3123, 2765, 1485, 587],
                            type: 'line',
                            order: 1,
                            backgroundColor: 'rgba(66, 133, 244, 0.0)',
                            borderColor: '#94DFD7',
                            borderWidth: 2,
                            pointBorderColor: '#94DFD7',
                            pointBackgroundColor: '#94DFD7',
                            lineTension: 0.0,
                          },
                        ],
                      }}
                    /> */}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md='8' className='mb-4'>
                <MDBCard>
                  <MDBCardHeader className='py-3'>
                    <h5 className='mb-0'>Weekly Expenditure</h5>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <div className='d-flex justify-content-around'>
                      <div>
                        <p className='mb-2'>Day ( Max Expense)</p>
                        <h5>
                          {maxDay}
                          <small className='text-danger'>
                            <MDBIcon className='fas fa-caret-down me-1' />
                            {/* <span> -71.9%</span> */}
                          </small>
                        </h5>
                      </div>
                      <div>
                        <p className='mb-2'>Expense (on day with max expense)</p>
                        <h5>
                          {maxAmount}
                          <small className='text-danger'>
                            <MDBIcon className='fas fa-caret-down me-1' />
                            {/* <span>-2.6%</span> */}
                          </small>
                        </h5>
                      </div>
                    </div>
                    <LineChart1 data={weeklyExpenses} />
                    {/* <MDBChart
                      type='bar'
                      data={{
                        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday '],
                        datasets: [
                          {
                            label: 'Clicks',
                            data: [25, 49, 40, 21, 56, 75, 30],
                            order: 2,
                          },
                          {
                            label: 'CTR %',
                            data: [58, 18, 30, 59, 46, 77, 90],
                            type: 'line',
                            order: 1,
                            backgroundColor: 'rgba(66, 133, 244, 0.0)',
                            borderColor: '#94DFD7',
                            borderWidth: 2,
                            pointBorderColor: '#94DFD7',
                            pointBackgroundColor: '#94DFD7',
                            lineTension: 0.0,
                          },
                        ],
                      }}
                    /> */}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>

         
          </section>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
