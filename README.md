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

3. Auth Library にユーザー情報が入っているだけなので、firestore に格納する場合は下記。

```javascript
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return userRef;
};
```
