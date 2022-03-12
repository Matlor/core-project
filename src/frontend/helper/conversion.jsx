export const bigIntToInt = (intBig) => {
	let int = Number(intBig);
	return int;
};

export const isValidHttpUrl = (string) => {
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}
	return url.protocol === "http:" || url.protocol === "https:";
};

export const hmResultToJsOpt = (res) => {
	var newArray = [];
	for (var i = 0; i < res.length; i++) {
		let obj = {};
		obj.id = Number(res[i][0]);
		obj.uri = res[i][1][0];
		newArray.push(obj);
	}
	return newArray;
};

export const hmResultToJs = (res) => {
	var newArray = [];
	for (var i = 0; i < res.length; i++) {
		let obj = {};
		obj.id = Number(res[i][0]);
		obj.uri = res[i][1];
		newArray.push(obj);
	}
	return newArray;
};
