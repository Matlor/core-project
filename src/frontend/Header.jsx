import { Button } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

const Header = ({ loginHandler, plug, logoutHandler }) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-evenly",
				padding: "20px",
				backgroundColor: "#e1eedd",
				marginBottom: "20px",
			}}
		>
			<Heading as="h3" size="md" isTruncated>
				My NFT Project
			</Heading>
			{plug.isLoggedIn ? (
				<Button colorScheme="teal" size="sm" onClick={logoutHandler}>
					logout
				</Button>
			) : (
				<Button colorScheme="teal" size="sm" onClick={loginHandler}>
					login
				</Button>
			)}
		</div>
	);
};

export default Header;
