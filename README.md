### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**Answer**:

getElementById: select single element by id and return html live reference.

getElementsByClassName: select multiple elements by class name and return html live collection.

querySelector: select single first matching element by css selector and return html live reference.

querySelectorAll: select all matching element by css selector and return html static collection.

---

### 2. How do you create and insert a new element into the DOM?

**Answer**:
At First I will create an element
`const div = document.createElement("div");
`

Then append a element into parent
`document.body.append(div);
`

---

### 3. What is Event Bubbling? And how does it work?

**Answer**:
capturing Phase : The event starts at the window and travel to target element.
bubbling phase: The event travels back up from the target through its parent, grandparent and it's parent to the document and window.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

**Answer**:
Event Delegation: bubble up triggered element to parent element which has attached an event listener.

when child element is dynamic or need to attaching many listeners to elements when it is helpful to use event delegation.

---

### 5. What is the difference between preventDefault() and stopPropagation() methods?

**Answer**:
preventDefault(): stops the browser's built-in actions.

stopPropagation(): stops the event from traveling through the DOM tree.
