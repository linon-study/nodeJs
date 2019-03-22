import app from '../server/app';
/**
 * Launches Node.js/Express web server in a separate (forked) process.
 */


function serve() { 
	return new Promise((resolve, reject) => {
		resolve(app);
	}); 
}

export default serve;