import { useState } from "react";
import { idlFactory as IDL } from "../declarations/backend";
import Minter from "./Minter";
import Header from "./Header";

const App = () => {
	const [plug, setPlug] = useState({
		isConnected: false,
		plug: {},
		actor: {},
	});

	const logoutHandler = async () => {
		setPlug({
			isConnected: false,
			plug: {},
			actor: {},
		});
	};

	const loginHandler = async () => {
		// Whitelist
		const whitelist = [process.env.BACKEND_CANISTER_ID];

		// "http://localhost:8000";
		const host =
			"https://" + `${process.env.BACKEND_CANISTER_ID}` + ".raw.ic0.app/";

		console.log(host, "host");

		// not connected
		if ((await window.ic.plug.isConnected()) == false) {
			try {
				// agent
				await window.ic.plug.requestConnect({
					whitelist: whitelist,
					host: host,
				});

				// fetching root
				console.log(
					await window.ic.plug.agent.fetchRootKey(),
					"fetching root key"
				);

				// actor
				const actor = await window.ic.plug.createActor({
					canisterId: process.env.BACKEND_CANISTER_ID,
					interfaceFactory: IDL,
				});

				var newPlugState = {
					isLoggedIn: true,
					plug: await window.ic.plug,
					actor: actor,
				};
				setPlug(newPlugState);
			} catch (error) {
				console.log(error);
			}

			// connected
		} else {
			if (plug.isConnected == false) {
				await window.ic.plug.requestConnect({
					whitelist: whitelist,
					host: host,
				});

				// fetching root
				console.log(
					await window.ic.plug.agent.fetchRootKey(),
					"fetching root key"
				);

				// actor
				const actor = await window.ic.plug.createActor({
					canisterId: process.env.BACKEND_CANISTER_ID,
					interfaceFactory: IDL,
				});

				var newPlugState = {
					isLoggedIn: true,
					plug: await window.ic.plug,
					actor: actor,
				};

				setPlug(newPlugState);
			}
			console.log("connect and state is right");
		}
	};

	return (
		<div>
			<Header
				loginHandler={loginHandler}
				logoutHandler={logoutHandler}
				plug={plug}
			/>

			<div style={{ margin: "20px" }}>
				{plug.isLoggedIn ? (
					<div>
						<Minter actor={plug.actor} />
					</div>
				) : (
					<div>You are not logged in</div>
				)}
			</div>
		</div>
	);
};

export default App;
