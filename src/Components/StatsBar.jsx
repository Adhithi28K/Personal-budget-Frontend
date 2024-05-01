import React from 'react';
import { 
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBBadge,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBCardFooter
} from 'mdb-react-ui-kit';
import { ReactNode,useEffect,useState } from 'react'
import { useAuth } from '../ContextAPI/Authentication';
import { useBudget } from '../ContextAPI/Budget';
import { useNavigate } from 'react-router-dom';
function App({fntocall}) {
    
    const { addExpense, budget, removeExpense, fetchInitialBudget } = useBudget();
    const [totalBudget,setTotalBudget] = useState(0);
    const [totalExpenses,setTotalExpenses] = useState(0);
    const [averageExpense,setAverageExpense] = useState(0);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    useEffect(() => {
        let tBudget = 0;
        let tExpenses = 0;
        let tTransaction=0;
        budget.categories.forEach((category) => {
          tBudget += parseInt(category.allocatedAmount);
          
        });
        budget.expenses.forEach((expense) => {
            //tExpenses += parseInt(expense.amount);
            let  expenseDate = new Date(expense.date);
      if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
        tExpenses += parseInt(expense.amount);
        tTransaction++;
      }
          });
        setTotalBudget(tBudget);
        setTotalExpenses(tExpenses);
        
        
        


      }, [budget]);
      useEffect(()=>{
        if(budget.expenses.length>0)
        {
            const firstDate = new Date(budget.expenses[0].date);
        const lastDate = new Date(budget.expenses[budget.expenses.length - 1].date);
        const totalDays =
        Math.ceil((lastDate - firstDate) / (1000 * 60 * 60 * 24)) + 1;
        const averageDailyExpense = Math.abs(totalExpenses / totalDays);
        setAverageExpense(averageDailyExpense)
        }
      })

     
  return (
    <MDBContainer fluid>
          <MDBBtn onClick={fntocall} >Add Expense</MDBBtn>
            <h5 className='mb-4'   ></h5>
      <MDBRow className='justify-content-center'>
        <MDBCol md='10'>
          <section>
        
            <MDBRow>
              <MDBCol md='4' className='mb-md-0'>
                <MDBCard>
                  <MDBCardBody>
                    <div className='d-flex align-items-center'>
                      <div className='flex-shrink-0'>
                        <div className='p-3 bg-success rounded-4 shadow-2-strong'>
                          <MDBIcon icon='hand-point-up' size='lg' className='text-white fa-fw' />
                        </div>
                      </div>
                      <div className='flex-grow-1 ms-4'>
                        <p className='text-muted mb-1'>Total Expenditure</p>
                        <h2 className='mb-0'>
                          $ {totalExpenses}
                          <span className='text-success' style={{ fontSize: '0.875rem' }}>
                            <MDBIcon icon='arrow-up' className='ms-1' size='sm' />
                            <span>{(totalExpenses/totalBudget*100).toFixed(2)}%</span>
                          </span>
                        </h2>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md='4' className='mb-md-0'>
                <MDBCard>
                  <MDBCardBody>
                    <div className='d-flex align-items-center'>
                      <div className='flex-shrink-0'>
                        <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                          <MDBIcon icon='eye' size='lg' className='text-white fa-fw' />
                        </div>
                      </div>
                      <div className='flex-grow-1 ms-4'>
                        <p className='text-muted mb-1'>Budget</p>
                        <h2 className='mb-0'>
                          $ {totalBudget}
                          <span className='text-success' style={{ fontSize: '0.875rem' }}>
                            <MDBIcon icon='arrow-up' className='ms-1' size='sm' />
                            {/* <span> 8.3%</span> */}
                          </span>
                        </h2>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md='4' className='mb-md-0'>
                <MDBCard>
                  <MDBCardBody>
                    <div className='d-flex align-items-center'>
                      <div className='flex-shrink-0'>
                        <div className='p-3 bg-warning rounded-4 shadow-2-strong'>
                          <MDBIcon icon='chart-pie' size='lg' className='text-white fa-fw' />
                        </div>
                      </div>
                      <div className='flex-grow-1 ms-4'>
                        <p className='text-muted mb-1'>Average Expenditure</p>
                        <h2 className='mb-0'>
                          $ {averageExpense.toFixed(2)}
                          <span className='text-danger' style={{ fontSize: '0.875rem' }}>
                            <MDBIcon icon='arrow-down' className='ms-1' size='sm' />
                            {/* <span> 3.9%</span> */}
                          </span>
                        </h2>
                      </div>
                    </div>
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
