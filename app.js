// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 500);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  // UI Vars
  const initialValue = document.getElementById('initial-value');
  const topUp = document.getElementById('top-up');
  const interestRate = document.getElementById('interest-rate');
  const months = document.getElementById('months');
  
  const investedAmount = document.getElementById('invested-amount');
  const interest = document.getElementById('interest');
  const tax = document.getElementById('tax');
  const totalInvestment = document.getElementById('total-investment');

  // Convertion
  const period = parseFloat(months.value);
  const principal = (parseFloat(initialValue.value) + parseFloat(topUp.value)).toFixed(2);
  const totalPrincipal = ((parseFloat(initialValue.value) + parseFloat(topUp.value)) * period).toFixed(2)
  const rate = (parseFloat(interestRate.value) / 1200);
  

  // Compute monthly payment
  const x = Math.pow((1 + rate / period), 1);
  const monthly = ((principal * x)).toFixed(2);
  console.log(monthly);
  const interestValue = (parseFloat(totalPrincipal) + parseFloat((monthly - principal))).toFixed(2);
  // console.log(interestValue);

  if(isFinite(monthly)) {
    investedAmount.value = principal;
    interest.value = (monthly - principal).toFixed(2);
    tax.value = ((interest.value * 15) / 100).toFixed(2);
    totalInvestment.value = (interestValue - parseFloat(tax.value)).toFixed(2);

    //Show result
    document.getElementById('results').style.display = 'block';
    // Hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  //Hide result
  document.getElementById('results').style.display = 'none';
  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');
  
  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add Class
  errorDiv.className = 'alert alert-danger';

  // Creat text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);

}

function clearError() {
  document.querySelector('.alert').remove();
}