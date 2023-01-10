---
title: React onChange does not show last typed character
date: 2019-09-12 20:46:55
tags: [javascript, react]
description: "Or how you can make mistake with getting current state in a component"
aliases:
  - /2019/react-onChange-does-not-show-last-typed-character
---

Recently a colleague of mine ask me for a help with more less similar code:

```jsx
const FormWithValidation = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const validate = () => {
    if (inputValue.length < 5) {
      // too short
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ inputValue });
      }}
    >
      <input
        style={error ? { border: "2px solid red" } : undefined}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          validate();
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

At first sight code looked good, but there was a problem. When user typed 6 characters into input, there shouldn't be any warning but the error was still there.

After logging a value of `inputValue` in `validate` function we discovered that indeed there was one character missing. It turns out that `validate` function is called with context when `inputValue` is not updated. There are many solutions to this problem:

- pass `e.target.value` to validate function, and then we will have latest value of this input
- make `validate` function return error value and use it in style prop
- check validation inside useEffect hook (which we finally went with)

Now corrected version of this component looks like this:

```jsx
const FormWithValidation = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const validate = () => {
    if (inputValue.length < 5) {
      // too short
      setError(true);
    } else {
      setError(false);
    }
  };
  useEffect(() => {
    validate();
  }, [inputValue]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ inputValue });
      }}
    >
      <input
        style={!!error ? { border: "2px solid red" } : undefined}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

This was really similar problem to [this one found on StackOverflow](https://stackoverflow.com/questions/33088482/onchange-in-react-doesnt-capture-the-last-character-of-text).
