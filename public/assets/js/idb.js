// create a variable to hold db connection
let db;// db will store the connected database object when the connection is complete
// establish a connection to IndexedDB database called 'pizza_hunt' and set it to version 1
const request = indexedDB.open('pizza_hunt',1);// request will act as an event listner for the database. 
                                               //The event lisntener is created when we open the connection 
                                               //to the database using indexedDB.open()

                                               //As part of the browser's window object, indexedDB is a global 
                                               //variable. Thus, we could say window.indexedDB.open(), but there's no need to. ;

// this event will not emit after the first time we run this and created the new_pizza obejct store
// unless new_pizza is deleted or we change the version via .open(), indicating our db needs an update
request.onupgradeneeded = function(event) {
    // // when this event executes, store a local scoped connection to the database
    const db = event.target.result;
    // create the ojbect store ( new_pizza ) that will hold the pizza data
    // then give each set of pizza data we store into db an index that increases by 1 each time
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

// this event emits when we finalize the connection to the database, and also everytime we interact with the database
// such as when db is successfully created with its object store (from onupgradedneeded event above)
// or simply established a connection, save reference to db in global variable
request.onsuccess = function(event) {
  //save reference to db in global variable
  db = event.target.result;

  // check if app is online, if yes run checkDatabase() function to send all local db data to api
  if (navigator.onLine) {
    uploadPizza();
  }
};

// this event emits when anything goes wrong with the database interaction
request.onerror = function(event) {
  // log error here
  console.log(event.target.errorCode);
};

// this function withh execute if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
  // open a new transaction ( temporary connection ) to the database with read and write permissions
  // we have to explicitly do this because we sometimes we are offline and don't have a direct connection, unlike SQL and MongoDB. In fact, this makes possible of the very purpose of indexedDB
  const transaction = db.transaction(['new_pizza'], 'readwrite');
  // access the 'new pizza' object store, which is where we will add data and store in pizzaObjectStore
  const pizzaObjectStore = transaction.objectStore('new_pizza');

  // add record to your store with add method.
  pizzaObjectStore.add(record);
}

// upon successful re-connect to the server send the object store from IndexedDB to the server
function uploadPizza() {
  // open a transaction on your pending db
  const transaction = db.transaction(['new_pizza'], 'readwrite');

  // access your pending object store
  const pizzaObjectStore = transaction.objectStore('new_pizza');

  // get all records from store and set to a variable
  const getAll = pizzaObjectStore.getAll();

  // upon a successful .getAll() execution, run this function
  getAll.onsuccess = function() {
    // if there is data in the indexedDB's object store, send it to the api server at the POST /api/pizzas endpoint
    if (getAll.result.length > 0) {// getAll.result = array of all the data retreieved from 'new_pizza' object store
      fetch('/api/pizzas', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // upon succesful server interaction access the object store via transaction one more time, and empty it
          const transaction = db.transaction(['new_pizza'], 'readwrite');// open one more transation
          const pizzaObjectStore = transaction.objectStore('new_pizza');// access the new_pizza object store
          // clear all items in your store
          pizzaObjectStore.clear();
        })
        .catch(err => {
          // set reference to redirect back here
          console.log(err);
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', uploadPizza);
