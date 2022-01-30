'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const calcAverageHumanAge = function (ages) {
//   const dogAgeInHumanYears = ages.map((age) =>
//     age > 2 ? 16 + age * 4 : 2 * age
//   );
//   console.log(dogAgeInHumanYears);

//   const dogsOver18 = dogAgeInHumanYears.filter((dogAge) => dogAge > 18);
//   console.log(dogsOver18);

//   const avghumanAgeofAllDogs = dogsOver18.reduce((acc, age, i) => {
//     if (i === dogsOver18.length - 1) {
//       return (acc + age) / dogsOver18.length;
//     } else {
//       return acc + age;
//     }
//   }, 0);

//   console.log(avghumanAgeofAllDogs);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// Create usernames
///////////////////////////////////////////////////////////////////////////////

const createUsernames = function (accts) {
  accts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};

createUsernames(accounts);

///////////////////////////////////////////////////////////////////////////////
// UPDATE UI
///////////////////////////////////////////////////////////////////////////////

const updateUI = function (acc) {
  const displayMovements = function (acc) {
    containerMovements.innerHTML = '';

    acc.movements.forEach(function (mov, i) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';

      const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
        i + 1
      } ${type}</div>
        <div class="movements__value">${mov} ₤</div>
      </div>`;

      containerMovements.insertAdjacentHTML('afterbegin', html);
    });
  };

  const displayBalance = function (acc) {
    const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    acc.balance = balance;
    labelBalance.textContent = `${balance} ₤`;
  };

  const calcInsAndOuts = function (acc) {
    const deposits = acc.movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    console.log(deposits);
    labelSumIn.textContent = `${deposits} ₤`;

    const interest = acc.movements
      .filter((mov) => mov > 0)
      .map((mov) => (mov / 100) * acc.interestRate)
      .reduce((acc, mov, i, arr) => acc + mov, 0);
    labelSumInterest.textContent = `${interest} ₤`;

    const withdrawals = acc.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(withdrawals)} ₤`;
  };

  displayMovements(currAccount);
  displayBalance(currAccount);
  calcInsAndOuts(currAccount);
};

///////////////////////////////////////////////////////////////////////////////
// Login
///////////////////////////////////////////////////////////////////////////////

let currAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = '100';
    labelWelcome.textContent = `Welcome, ${currAccount.owner.split(' ')[0]}`;
    updateUI();
  }

  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
});

///////////////////////////////////////////////////////////////////////////////
// Transfer to
///////////////////////////////////////////////////////////////////////////////

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferTo = inputTransferTo.value;
  const transferAmt = Number(inputTransferAmount.value);

  if (transferTo && transferAmt) {
    const ReceiverAccount = accounts.find(
      (account) => account.username === transferTo
    );

    if (
      ReceiverAccount &&
      currAccount.owner !== ReceiverAccount.owner &&
      transferAmt <= currAccount.balance
    ) {
      currAccount.movements.push(-transferAmt);
      ReceiverAccount.movements.push(transferAmt);
      inputTransferTo.value = '';
      inputTransferAmount.value = '';
      updateUI();
    }
  }
});
