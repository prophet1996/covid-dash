const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const setup = async () => {
    const db = await sqlite.open({
        filename: './covid.db',
        driver: sqlite3.Database

    });
    await db.migrate({ force: 'last' });

    const countyr = await db.all('SELECT * FROM State')
    console.log('Country', JSON.stringify(countyr, null, 2));
 }  

setup();