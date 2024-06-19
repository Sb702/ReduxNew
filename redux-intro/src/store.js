import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
}

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      return {
        ...state,
        loan: state.loan + action.payload,
        loanPurpose: action.loanPurpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(accountReducer);

// store.dispatch({
//   type: "account/deposit",
//   payload: 1000,
// });

// store.dispatch({
//   type: "account/withdraw",
//   payload: 100,
// });

// store.dispatch({
//   type: "account/requestLoan",
//   payload: 1000,
//   loanPurpose: "House",
// });

// store.dispatch({
//   type: "account/payLoan",
//   payload: 1000,
// });

// console.log(store.getState());

function deposit(amount) {
    return {
        type: "account/deposit",
        payload: amount,
    };
}

function withdraw(amount) {
    return {
        type: "account/withdraw",
        payload: amount,
    };
}

function requestLoan(amount, loanPurpose) {
    return {
        type: "account/requestLoan",
        payload: amount,
        loanPurpose: loanPurpose,
    };
}

function payLoan(amount) {
    return {
        type: "account/payLoan",
        payload: amount,
    };
}

// store.dispatch(deposit(1000));
// store.dispatch(withdraw(100));
// store.dispatch(requestLoan(1000, "House"));

// console.log(store.getState());


function createCustomer(fullName, nationalID, createdAt) {
    return {
        type: "customer/create",
        payload: {
            fullName: fullName,
            nationalID: nationalID,
            createdAt: new Date().toISOString(),
        },
    };
}

function updateCustomer(fullName, nationalID) {
    return {
        type: "customer/update",
        payload: {
            fullName: fullName,
            nationalID: nationalID,
        },
    };
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/create":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };
        case "customer/update":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});



const storeCustomer = createStore(rootReducer);

storeCustomer.dispatch(createCustomer("John Doe", "123456789", new Date().toISOString()));

console.log(storeCustomer.getState());

// reducer
