describe('Bar Chart Visual Validation', () => {
    it('visually validates the bar chart component on the dashboard', () => {
      cy.visit('/dashboard');
      cy.eyesOpen({
        appName: 'Your App Name',
        testName: 'Bar Chart Visual Test',
        browser: { width: 1024, height: 768 }
      });
      cy.eyesCheckWindow('Dashboard Page - Bar Chart');
      cy.eyesClose();
    });
  });
  