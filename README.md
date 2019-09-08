# Higher Order Components (HOCs)

If you find yourself re-writing the same functionality over and over again, that's usually a sign it's time to abstact out the common code into a re-usable chuck.
Doing so will keep your code DRY (Don't Repeat Yourself), easier to maintain -since changes will only have to be made in one place rather than several, and help
keep your code focused. A great way to achieve this in React is through Higher Order Components (HOCs). Before we dive in to creating a component, let's look at
what the Higher Order half means first.

### Higher Order Functions

A higher order function is a function that takes in and/or returns another function. A commonly used example would be any of the built-in array methods, e.g. filter or map.
These methods expect as their first argument a function to call for each item in the array.

A classic CS example of a higher order function that both takes and returns a function is an adder.

```javascript
// adder takes in two numbers and adds them
function adder(x, y) {
  return x + y;
}

// makeAdder takes in a number and a function, adder
function makeAdder(x, adder) {
  // returns a new anonymous function that can take in a number, y
  return function(y) {
    /* 
      the anonymous function returns the result of calling adder, which was the function
      passed into makeAdder, on the number (x) that was passed to makeAdder and any
      number that will be passed into the anonymous function (y)
    */
    return adder(x, y);
  };
}

// create addTwo, a function that will add 2 to any number passed into it
const addTwo = makeAdder(2, adder);

addTwo(4); // returns 6
```

### Higher Order Components
