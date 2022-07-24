const Database = require('better-sqlite3');

const db = new Database('../public/db.db', { verbose: console.log });

function SqlDebug() {
    const stmt = db.prepare('SELECT * FROM cats');
    const rows = stmt.all();

    return (
    <div>{rows}</div>
    );
}

export default SqlDebug;
