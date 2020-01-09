# How to implement Firebase to the react app.

### See `firebase.utils.js`

1. Setup firebase config in firebase directory.
2. `App.js`

```javascript:App.js
 unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
```

`componentDidMount()`でのマウント時しか fetch を発動しないと、後のユーザーが新しくサインインしたり、サインアウトしたことに気づけない。

`onAuthStateChanged`は常にオープンで、サインインしたか、サインアウトしたかなどを察知する。ずっとオープンだからこそ、unmount した時にはクローズさせなければ memory leak が発生してしまう。
