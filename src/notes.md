# Best Practices: Anonymous Functions Inside React Render Methods

Lets walk through the steps of displaying a `<Parent>` component that passes a click handler to a `<button>` in a `<Child>` component.

First, inside the `<Parent>` render method we create an anonymous callback function. This function returns a reference to the `clickHandler` class method,
which is passed down to the `<Child>` as the 'clicked' prop.

```javascript
class Parent {
    clickHandler() {
        // does stuff on click
    }

    render() {
        return (
            <Child clicked={() => this.clickHandler} />
            // functionally equivalent to using bind method below
            <Child clicked={this.clickHandler.bind(this)} />
        );
    }
}
```

The `<Child>` recieves a new prop, 'clicked', and this triggers its render method, creating a `<button>` with the handler.

```javascript
class Child {
  render() {
    return <button onClick={this.props.clicked} />;
  }
}
```

When the `<Parent>` is re-rendered (in the demo, this is done with a `setInterval` trigger every 5 seconds),
the `<Child>` is again passed the `clickHandler`. However, because we are using an anonymous callback to wrap the `clickHandler`,
a new anonymous function is created.

The `<Child>` will then check to see if the new 'clicked' prop it was passed is different than the current 'clicked' prop.
Since a new anonymous function was used (and therefore has a different reference in memory than the previous one),
it will cause the `<Child>` to re-render, despite the underlying `clickHandler` method being exactly the same.

This is why in the demo app both the Child and Parent render count increases each cycle.

### What's The Cost?

Rendering is costly: it takes time and computational resources to re-render a component and during a re-render the user may not see or be able to interact with certain elements,
which makes for bad UX. If the component sits near the top of the component tree, it could cause the re-render of a sizeable portion of the page.

Mermory bloat: since each render creates a new anonymous function, the JS engine must create and store in memory a new object every render.
If a page included a dozen `<input>` fields, each with an anonymous function to handle input changes, it could end up creating a dozen new objects with each keystroke in an input.

### Solution

To avoid unnecessary renders and object creation, use an arrow function bound to the component:

```javascript
clickHandler = () => {
  // does stuff on click
};
```

This function will have the correct context (this) passed in at runtime, not cause re-rendering/object bloat, and makes for cleaner code:

```javascript
<Child clicked={this.clickHandler}>

// compared to
<Child clicked={() => this.clickHandler} />
```

You can see this for yourself by commenting out lines 46-48 and uncommenting lines 51-53 in the Parent.js file.
Notice that now only the `<Parent>` re-renders every 5 seconds and not the `<Child>`, because the same reference is being passed rather than a new function.

If you need to pass an argument to the callback, you can use a higher-order function and a helper function:

```javascript
boundClickHandlerWithParam = argument => this.helperFunc(argument);

helperFunc = argument => {
  // does stuff with arguement on click
};

...

<Child clicked={this.boundClickHandlerWithParam(someValue)}>
```

You can see this for yourself by uncommenting lines 55-57 in Parent.js
