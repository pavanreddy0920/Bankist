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
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-01-30T17:01:17.194Z',
    '2022-01-31T23:36:17.929Z',
    '2022-02-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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

const getDateWithTime = function (date, acc) {
  const calculateDays = Math.round((new Date() - date) / (1000 * 60 * 60 * 24));
  console.log(calculateDays);

  if (calculateDays === 0) return 'Today';
  if (calculateDays === 1) return 'Yesterday';
  if (calculateDays <= 7) return `${calculateDays} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // if (withTime) {
  //   const hour = `${date.getHours()}`.padStart(2, 0);
  //   const min = `${date.getMinutes()}`.padStart(2, 0);
  //   return `${day}/${month}/${year}, ${hour}:${min}`;
  // }
  // return `${day}/${month}/${year}`;

  const dateDisplay = new Intl.DateTimeFormat(acc.locale).format(date);
  return dateDisplay;
};

const formatNumber = function (mov, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(mov);
};

const updateUI = function (acc, sorted = false) {
  const displayMovements = function (acc) {
    containerMovements.innerHTML = '';

    const movs =
      sorted === true
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;

    movs.forEach(function (mov, i) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';

      const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
        i + 1
      } ${type}</div>
      <div class="movements__date">${getDateWithTime(
        new Date(acc.movementsDates[i]),
        acc
      )}</div>
        <div class="movements__value">${formatNumber(
          mov,
          acc.locale,
          acc.currency
        )}</div>
      </div>`;

      containerMovements.insertAdjacentHTML('afterbegin', html);
    });
  };

  const displayBalance = function (acc) {
    const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    acc.balance = balance;
    labelBalance.textContent = formatNumber(balance, acc.locale, acc.currency);
    labelDate.textContent = new Intl.DateTimeFormat(acc.locale, {
      minute: 'numeric',
      hour: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());
  };

  const calcInsAndOuts = function (acc) {
    const deposits = acc.movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatNumber(deposits, acc.locale, acc.currency);

    const interest = acc.movements
      .filter((mov) => mov > 0)
      .map((mov) => (mov / 100) * acc.interestRate)
      .reduce((acc, mov, i, arr) => acc + mov, 0);
    labelSumInterest.textContent = formatNumber(
      interest,
      acc.locale,
      acc.currency
    );

    const withdrawals = acc.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatNumber(
      withdrawals,
      acc.locale,
      acc.currency
    );
  };

  displayMovements(acc);
  displayBalance(acc);
  calcInsAndOuts(acc);
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
    updateUI(currAccount);
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
      currAccount.movementsDates.push(new Date().toISOString());
      ReceiverAccount.movementsDates.push(new Date().toISOString());
      inputTransferTo.value = '';
      inputTransferAmount.value = '';
      updateUI(currAccount);
    }
  }
});

///////////////////////////////////////////////////////////////////////////////
// LOAN
///////////////////////////////////////////////////////////////////////////////

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const inputLoanAmt = Number(inputLoanAmount.value);
  if (
    inputLoanAmt &&
    currAccount.movements.some((mov) => mov >= inputLoanAmt * 0.1)
  ) {
    currAccount.movements.push(inputLoanAmt);
    currAccount.movementsDates.push(new Date().toISOString());
    updateUI(currAccount);
    inputLoanAmount.value = '';
  }
});

///////////////////////////////////////////////////////////////////////////////
// Close Account
///////////////////////////////////////////////////////////////////////////////

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const closeAccountName = inputCloseUsername.value;
  const closeAccountPin = Number(inputClosePin.value);

  if (closeAccountName && closeAccountPin) {
    if (
      currAccount.username === closeAccountName &&
      currAccount.pin === closeAccountPin
    ) {
      const accIndex = accounts.findIndex(
        (acc) => acc.username === closeAccountName
      );
      accounts.splice(accIndex, 1);
      inputCloseUsername.value = '';
      inputClosePin.value = '';
      containerApp.style.opacity = '0';
      labelWelcome.textContent = `Log in to get started`;
    }
  }
});

///////////////////////////////////////////////////////////////////////////////
// SORT
///////////////////////////////////////////////////////////////////////////////
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  updateUI(currAccount, !sorted);
  sorted = !sorted;
});
