import { useEffect, useState } from "react";
//import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "../declarations/backend";
import Header from "./Header";

/* const handleAuth = async (authClient) => {
  const identity = authClient.getIdentity();
  const authenticatedActor = createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });
}; */

// checks identity when page re-renders
// runs AFTER the render

// Like with async data I do have to check for the case that the data has not yet loaded
// then it is easier to create it all the time
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn, "logged in state");

  var actor = createActor(canisterId, {
    agentOptions: {},
  });

  const asyFunc = async () => {
    var authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
      const identity = authClient.getIdentity();
      actor = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      });
      // only if not yet, otherwise re-render loop
      if (loggedIn === false) {
        setLoggedIn(true);
      }
    }
  };
  asyFunc();

  // if not logged in it shows this handler
  const loginHanlder = async () => {
    var authClient = await AuthClient.create();
    await authClient.login({
      onSuccess: () => {
        const identity = authClient.getIdentity();
        console.log(identity, "identity");
        actor = createActor(canisterId, {
          agentOptions: {
            identity,
          },
        });
        setLoggedIn(true);
      },
      identityProvider:
        "http://localhost:8000/?canisterId=rwlgt-iiaaa-aaaaa-aaaaa-cai",
    });
  };

  const logoutHandler = async () => {
    var authClient = await AuthClient.create();
    await authClient.logout();
    setLoggedIn(false);
  };

  //  <Header props={loggedIn}/>
  return (
    <div>
      <div>Logged in: {JSON.stringify(loggedIn)}</div>
      {loggedIn ? (
        <button onClick={logoutHandler}>logout</button>
      ) : (
        <button onClick={loginHanlder}>login</button>
      )}
    </div>
  );
}

export default App;
