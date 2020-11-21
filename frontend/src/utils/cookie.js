
const getCookie = name => {
	/* get the `name` cookie from browser */

	const cookies = getCookies()
	return name in cookies?
		cookies[name]: null;
}


const getCookies = () => {
	/* get all the cookies from browser */

	let cookies = document.cookie;
	if(!cookies || cookies == '')
		return []

	cookies = Object.assign({}, ...cookies.split(';').map(cookie => {
		cookie = cookie.trim();
		const [key, value] = cookie.split('=');

		return { [key]: value }
	}));

	return cookies
}


export { getCookie, getCookies }