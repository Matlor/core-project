import { useEffect, useState } from "react";
import { hmResultToJs, hmResultToJsOpt } from "./helper/conversion";
import NftList from "./NftList";

import { Heading, Input } from "@chakra-ui/react";

const Minter = ({ actor }) => {
	const [tokenName, setTokenName] = useState("");
	const [uriValue, setUriValue] = useState("");
	const [usersTokens, setUsersTokens] = useState([]);
	const [allNFTs, setAllNFTs] = useState([]);

	console.log(allNFTs, "all NFTs");

	const asyncTokenName = async () => {
		setTokenName(await actor.name());
	};

	const asyncFetchMyNfts = async () => {
		let res = await actor.getMyTokens();
		let token = hmResultToJsOpt(res);
		setUsersTokens(token);
	};
	const asyncFetchAllNfts = async () => {
		var allNFTs = hmResultToJs(await actor.getAllNFTs());
		setAllNFTs(allNFTs);
	};

	useEffect(() => {
		asyncTokenName();
		asyncFetchAllNfts();
		asyncFetchMyNfts();
	}, []);

	const mintHandler = async (e) => {
		e.preventDefault();
		await actor.mint(uriValue);
		asyncFetchMyNfts();
		asyncFetchAllNfts();
	};

	return (
		<div>
			<div style={{ margin: "20px 0px 20px 0px" }}>
				<Heading as="h3" size="md" isTruncated>
					Minter
				</Heading>
				<Heading
					as="h3"
					size="sm"
					isTruncated
					style={{ margin: "10px 0px 10px 0px" }}
				>
					Token Name: {tokenName}
				</Heading>
			</div>

			<form onSubmit={mintHandler}>
				URI:{" "}
				<Input
					type="text"
					name="name"
					value={uriValue}
					style={{
						height: "30px",
						width: "500px",
					}}
					onChange={(e) => {
						setUriValue(e.target.value);
					}}
				/>
				<Input
					type="submit"
					value="Mint"
					variant="filled"
					style={{
						height: "30px",
						margin: "20px 0px 20px 0px",
						width: "100px",
					}}
				/>
			</form>

			<div style={{ marginTop: "30px" }}>
				<Heading as="h3" size="sm" isTruncated>
					Your NFTs:
				</Heading>
				<NftList toShow={usersTokens} />
			</div>

			<div style={{ marginTop: "30px" }}>
				<Heading as="h3" size="sm" isTruncated>
					All NFTs:
				</Heading>
				<NftList toShow={allNFTs} />
			</div>
		</div>
	);
};

export default Minter;
