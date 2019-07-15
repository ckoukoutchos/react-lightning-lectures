# Best Practices: Constructor Functions Inside React Class Components

### A Little Background Information

Back in the old ES5 days of JavaScript, you created an instance of an object by using the `new` keyword before any function:

```javascript
/*
  Constructor function which defines the object type, Car,
  and any methods or properties it should have
*/
function Car(color) {
  // object property
  this.color = color;

  // object method
  this.honk = function() {
    console.log('Beep beep!');
  };
}

/*
  Creates a new object of type Car using the Car constructor function as a blue print
*/
var myCar = new Car('blue');

console.log(myCar instanceof Car); // prints true
console.log(myCar.color); // prints 'blue'
console.log(myCar.honk()); // prints 'Beep beep!'
```

This process allows for user defined object types which can be extended, much like classes in other languages (Java, C#). Here is a SportsCar object that extends the Car object.

```javascript
// Constructor function
function SportsCar() {
  this.convertible = true;
}

/*
  Adds Car to SportsCar's inheritance chain, so when a SportsCar object is created
  it will call the Car constructor function, which adds all the Car methods and properties to a new SportsCar object
*/
SportsCar.prototype = new Car('red');

// Creates new SportsCar object
var mySportsCar = new SportsCar();

console.log(mySportsCar instanceof SportsCar); // prints true
console.log(mySportsCar instanceof Car); // prints true since SportsCar inherits from Car
console.log(mySportsCar.color); // prints 'red'
console.log(mySportsCar.honk()); // prints 'Beep beep!'
console.log(mySportsCar.convertible); // prints true
```

However, many found the way JavaScript does 'classes' and inheritance via the prototypical model above too strange -especially for those coming from object oriented languages.
So ES6 came along and introduced the JavaScript 'class'. Here is the same code as above in the new format.

```javaScript
// Car class definition
class Car {
  constructor(color) {
    this.color = color;
  }

  honk() {
    console.log('Beep beep!');
  }
}

// Create new instance of Car
const myCar = new Car('blue');

console.log(myCar instanceof Car) // prints true
console.log(myCar.color); // prints 'blue'
console.log(myCar.honk()); // prints 'Beep beep!'

// SportsCar class definition
class SportsCar extends Car {
  constructor(color) {
    // Calls constructor of parent Car class
    super(color)
    this.convertible = true;
  }
}

const mySportsCar = new SportsCar('red');

console.log(mySportsCar instanceof SportsCar); // prints true
console.log(mySportsCar instanceof Car); // prints true
console.log(mySportsCar.color); // prints 'red'
console.log(mySportsCar.honk()); // prints 'Beep beep!'
console.log(mySportsCar.convertible); // prints true
```

Under the hood, `class` uses the same prototypical model as before, it's just in a tidier form. This is known as [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar).
Here is what Babel transforms `class` to for older non-ES6 compliant browsers. Look familiar?

```javascript
var Car = (function() {
  function Car(color) {
    this.color = color;
  }

  Car.prototype.honk = function honk() {
    console.log('Beep beep!');
  };

  return Car;
})();
```

### Classes and Constructors in React

In React, we use `class` to create components which use state and/or lifecycle methods. Let's look at a simple component that displays a counter for the number of times
a button has been clicked.

```javascript
import React, { Component } from 'react';

class MyComponent extends Component {
  // constructor function
  constructor(props) {
    // call constructor of super class `Component` and pass in props
    super(props);

    // initialize component state
    this.state = {
      counter: 0
    };

    // bind handler to this component instance
    this.clickHandler = this.clickHandler.bind(this);
  }

  // on button click, increase counter number
  clickHandler() {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  }

  render() {
    return (
      <>
        <h1># of Clicks: {this.state.counter}</h1>
        <button onClick={this.clickHandler}>Click Me!</button>
      </>
    );
  }
}
```

To create an instance of the `<MyComponent>` class, React will call `new` which in turn calls the class constructor. Inside the constructor, it must call
the `constructor` of the super class, since `<MyComponent>` extends `<Component>`, and pass the props. If the props are not passed to `super()`, they will not be avaliable inside the rest of `<MyComponent>`
constructor (i.e. `this.props` in the constructor will be `undefined`).

React will then initialize the `state` property on the new instance and bind the `clickHandler` method to this instance.

### Do You Need to Call the Constructor?

However, these steps might be unecessary if you are using a more recent version of React or projects made with create-react-app (versions that have a certain Babal plugin).
Here is a shorter, cleaner way to right the same component as above.

```javascript
import React, { Component } from 'react';

class MyComponent extends Component {
  // initialize component state
  state = {
    counter: 0
  };

  // on button click, increase counter number
  clickHandler = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  };

  render() {
    return (
      <>
        <h1># of Clicks: {this.state.counter}</h1>
        <button onClick={this.clickHandler}>Click Me!</button>
      </>
    );
  }
}
```

When Babel transpiles this code before running it in the browser, it will add a `constructor` for you and call `super(props)`, something like this:

```javascript
// uses spread operator to pass all props to constructor function
constructor(...args) {
  // temporary variable
  var _temp;

  /*
    Calls parent's constructor function with props and initializes component with any properties or methods of the component, in this case, 'state'
  */
  return (_temp = super(...args)), (this.state = { counter: 0 }), _temp;
}
```

We have also done away with binding handlers in the constructor by using an ES6 arrow function, which uses the correct `this` context of the class instance we are creating.
You can see and play around with code examples in the demo app. Notice that both versions work perfectly fine.

### Do I Ever Need to Call the Constructor?

For almost all components, assuming you have the Babel plugin, no.

One could argue that, for components that have complicated initialization logic, it is cleaner/clearer
to wrap the code inside a constructor function rather than just letting Babel do it behind the scenes.

Note: If you come from the Angular world, you maybe tempted
to ask what about Dependency Injection (DI). It's not a thing in React, don't worry about it.
