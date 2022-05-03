// Date of Accounts

const account1 = {
    owner: 'Jay Prajapati',
    movements: [200, 1000, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };

  const account4 = {
    owner: 'Iron Man',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 2222,
  };

  const account3 = {
    owner: 'Ronak Sirwani',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };

  const account2 = {
    owner: 'shrey shah',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 4444,
  };




  // marge all account in one
  const accounts = [account1, account2, account3, account4];

  // Select the Elements from html to js and take action

  const movements_container = document.querySelector(".movements");
  const Total_Balance = document.querySelector(".balance__value");


  const summary_value_in = document.querySelector(".summary_value_summary_value_in");
  const summary_value_out = document.querySelector(".summary__value_summary_value_out");
  const summary_value_interest = document.querySelector(".summary__value_summary_value_interest");

  const labelWelcome = document.querySelector(".welcome");

  const login_btn = document.querySelector(".login__btn");
  const UserId = document.querySelector(".login_input_login_input_user");
  const UserPin = document.querySelector(".login_input_login_input_pin");
 const ComponentApp = document.querySelector(".app");

 const RecieverUserId = document.querySelector(".form_input_form_input_to");
 const TransferAmount = document.querySelector(".form_input_form_input_amount");
  const Transfer_btn = document.querySelector(".form_btn_form_btn_transfer");

  const CloseUserId = document.querySelector(".form_input_form_input_user");
  const CloserPin = document.querySelector(".form_input_form_input_pin");
  const Close_btn = document.querySelector(".form_btn_form_btn_close");

  const LoanAmount = document.querySelector(".form_input_form_input_loan_amount");
  const Loan_btn = document.querySelector(".form_btn_form_btn_loan");
  const labelTimer = document.querySelector(".timer");

  const btnSort = document.querySelector('.btn--sort');


  // function operation

/*  Display Function */
  const displayMovements = function (movements, sort = false) {
    movements_container.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const html = ` <div class="movements__row"><div class="movements__type movements__type--${type}">${i + 1} ${type}</div><div class="movements__date"></div><div class="movements__value">Rs. ${mov}</div></div>`;

      movements_container.insertAdjacentHTML('afterbegin', html);
    });
  };


/* Create username using account owners*/
  const createUsernames = function (accs) {
    accs.forEach(function (acc) {
      acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
    });
  };
  createUsernames(accounts);

  // Deposit array created //
const movements = account1.movements;
  const deposit = movements.filter(function(mov) {
      return mov > 0;
  });

  console.log(deposit)
  // withdrawal array created //
  const withdrawal = movements.filter(function(mov) {
    return mov < 0;
});


//Total Balance with arrow func
const CalcDisplayBalance = function(acc){
acc.balance = acc.movements.reduce((acc, cur) => acc + cur,0 );
Total_Balance.innerHTML = `Rs. ${acc.balance}`;
}

//convert
const totalDepositUSD = movements.filter(mov=>mov > 0).map((mov,i)=>mov/75).reduce((acc,mov)=> acc+mov,0);
console.log(`$${totalDepositUSD.toFixed(2)}`)

const CalcDisplaySummary = function(acc){
    const income =acc.movements.filter(mov => mov >0).reduce((acc,mov) => acc + mov,0);
    summary_value_in.textContent =`Rs. ${income}`;

    const out = acc.movements.filter(mov => mov<0).reduce((acc,mov)=> acc+mov,0);
    summary_value_out.innerHTML =`Rs. ${Math.abs(out)}`;

    const interest = acc.movements.filter(mov => mov > 0).map((mov) => mov *acc.interestRate/100).filter(int => int >1).reduce((acc,int) => acc +int, 0);
    summary_value_interest.innerHTML = `Rs. ${interest.toFixed(2)}`;
}
const UpdateUI = function(acc){

      CalcDisplaySummary(acc);
      CalcDisplayBalance(acc);
      displayMovements(acc.movements);
}
let timer;
// implementing login session

let currentAccount;
login_btn.addEventListener("click", function(e) {
  // prevent form from submittong or reloading
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === UserId.value);
  if (currentAccount?.pin === Number(UserPin.value)) {
    labelWelcome.innerHTML = `User Login : ${currentAccount.owner}`;
      // currentAccount.owner.split(' ')[0] if required
      UserPin.value = "";
      UserId.value = "";
      UserPin.blur();
      ComponentApp.style.opacity = 100;

      if (timer) clearInterval(timer);
      timer = startLogOutTimer();

    UpdateUI(currentAccount);
  }
  else{
    alert("Wrong Password or UserID");
  }
});

// Transfer Money from self to another acc.

Transfer_btn.addEventListener("click", function(e) {
  e.preventDefault();
  const RecieverAccount = accounts.find(acc => acc.username === RecieverUserId.value);
  const AmountTrans = Number(TransferAmount.value);
  if (AmountTrans>0 && RecieverAccount && RecieverAccount?.username !== currentAccount.username && AmountTrans < currentAccount.balance) {
     currentAccount.movements.push(-AmountTrans);
     RecieverAccount.movements.push(AmountTrans);
     TransferAmount.value = RecieverUserId.value ="";
      UpdateUI(currentAccount);
      alert("Trancation Successful")
  }
  else{
    alert("Invalid Trancations")
  }
});

// Close Account
 Close_btn.addEventListener("click", function(e) {
   e.preventDefault();
   if (CloseUserId.value === currentAccount.username &&Number(CloserPin.value) === currentAccount.pin) {
     const index = accounts.findIndex(acc => acc.username === currentAccount.username);
     console.log(index);
     CloseUserId.value = CloserPin.value = '';
    accounts.splice(index,1);
 // Hide UI
    ComponentApp.style.opacity = 0;
   }
   else{
     alert("invalid Account Details");
   }
 });

 // Loan Tran

 Loan_btn.addEventListener("click",function(e) {
   e.preventDefault();
   const amount = Number(LoanAmount.value);
   if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    UpdateUI(currentAccount);
    LoanAmount.value = '';
  }

 });

 const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  timer = setInterval(tick, 1000);

  return timer;
};

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
console.log(accounts);

document.querySelector(".date").innerHTML = `${Date()}`;
