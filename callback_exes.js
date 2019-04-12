class Clock {
  
  constructor() {
    this.currentTime = new Date();
    this.hours = this.currentTime.getHours();
    this.minutes = this.currentTime.getMinutes();
    this.seconds = this.currentTime.getSeconds();

    this.printTime();
    setInterval(this._tick.bind(this), 1000);
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.  
  }

  printTime() {
    const now = `${this.hours}:${this.minutes}:${this.seconds}`;
    console.log(now);
    // Format the time in HH:MM:SS
    // Use console.log to print it.
  }

  _tick() {
    if (this.seconds < 59) {this.seconds += 1;}
    else {this.minutes += 1; this.seconds = 0;}

    if (this.minutes === 60) {this.minutes = 0; this.hours += 1;}
    if (this.hours === 24) {this.hours = 0;}
    
    this.printTime();  
    // 1. Increment the time by one second.
    // 2. Call printTime.
  }


}

// const clock = new Clock();

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallBack) {
  if (numsLeft > 0) {
    reader.question('Enter a number: ', (response) => {
      let num = parseInt(response, 10);
      sum += num;
      console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallBack);
    });
  } else if (numsLeft === 0) {
    completionCallBack(sum);
    reader.close();
  } else {
    reader.close();
  }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function absurdBubbleSort(arr, sortCompletionCallback) {
  outerBubbleSortLoop(true);
  reader.close();

  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if (i < arr.length - 1) {
      askIfGreaterThan(arr[i], arr[i+1], (isGreaterThan) => {
        if (isGreaterThan) {
          [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
          madeAnySwaps = true;
        } 
        innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
      });
    } else if (i === (arr.length - 1)) {
      outerBubbleSortLoop(madeAnySwaps);
    }
  }

  function askIfGreaterThan(ele1, ele2, callback) {
    reader.question(`Should these values be swapped: ${ele1} and ${ele2}`, (response) => {
      
      if (response === 'yes') {
        callback(true);
      } else {
        callback(false);
      }
    });
  }
}

// absurdBubbleSort([3,1,5,4], console.log);

Function.prototype.myBind = function(context) {
  return () => { this.apply(context); };
};


// class Lamp {
//   constructor() {
//     this.name = "a lamp";
//   }
// }

// const turnOn = function() {
//    console.log("Turning on " + this.name);
// };

// const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"


Function.prototype.myThrottle = function(interval) {
  let tooSoon = false;
  return () => {
    if (!tooSoon) {
      tooSoon = true;
      setTimeout( () => {
        tooSoon = false;
      } ,interval);
      this.call();
    }
  };
};

class Neuron {
  fire() {
    console.log("Firing!");
  }
};

const neuron = new Neuron;
// When we create a new Neuron, 
// we can call #fire as frequently as we want

// The following code will try to #fire the neuron every 10ms. Try it in the console:
// const interval = setInterval(() => {
//   neuron.fire();
// }, 10);

// You can use clearInterval to stop the firing:
// clearInterval(interval);

// Using Function#myThrottle, we should be able to throttle 
// the #fire function of our neuron so that it can only fire 
// once every 500ms:

// neuron.fire = neuron.fire.myThrottle(500);

// const interval = setInterval(() => {
//   neuron.fire();
// }, 10);



Function.prototype.myDebounce = function(interval) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout( () => {
      this.call();
    } ,interval);
  };
};

class SearchBar {
  constructor() {
    this.query = "";

    this.type = this.type.bind(this);
    this.search = this.search.bind(this);
  }
  
  type(letter) {
    this.query += letter;
    this.search();
  }

  search() {
    console.log(`searching for ${this.query}`);
  }
}

const searchBar = new SearchBar;
searchBar.search = searchBar.search.myDebounce(500);

const queryForHelloWorld = () => {
  searchBar.type("h");
  searchBar.type("e");
  searchBar.type("l");
  searchBar.type("l");
  searchBar.type("o");
  searchBar.type(" ");
  searchBar.type("w");
  searchBar.type("o");
  searchBar.type("r");
  searchBar.type("l");
  searchBar.type("d");
}

queryForHelloWorld();






