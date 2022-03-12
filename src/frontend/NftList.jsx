import { isValidHttpUrl } from "./helper/conversion";

const NftList = ({ toShow }) => {
	const showUsersTokens = () => {
		if (toShow.length > 0) {
			const tokens = toShow.map((token) => {
				return (
					<div key={token.id} style={{ margin: "20px 0px 20px 0px" }}>
						<div>id: {token.id}</div>

						{isValidHttpUrl(token.uri) ? (
							<img
								src={token.uri}
								style={{ height: 200, resizeMode: "stretch", margin: 5 }}
							/>
						) : (
							<div>not valid uri {token.uri}</div>
						)}
					</div>
				);
			});
			return tokens;
		} else {
			return <div>There are no Tokens</div>;
		}
	};

	return <div style={{ margin: "20px 0px 20px 0px" }}>{showUsersTokens()}</div>;
};

export default NftList;
