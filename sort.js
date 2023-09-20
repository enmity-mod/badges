const fs = require('fs');

const users = fs.readdirSync('.').filter(e => e.endsWith('.json'));
const order = ['dev', 'staff', 'contributor', 'supporter'];

for (const user of users) {
	const content = fs.readFileSync(user, 'utf-8');
	const badges = JSON.parse(content);

	// Sort badges in a specific order
	const sorted = badges.sort((a, b) => {
		if (/\d/.test(a)) {
			return 1;
		} else if (/\d/.test(b)) {
			return -1;
		}

		return order.indexOf(a) - order.indexOf(b);
	});

	fs.writeFileSync(user, JSON.stringify(sorted), 'utf-8');
	console.log(`Sorted ${user}`);
}