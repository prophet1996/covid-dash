--UP
CREATE TABLE State (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    active NUMBER,
    confirmed NUMBER,
    deaths NUMBER,
    deltaconfirmed NUMBER,
    deltadeaths NUMBER,
    deltarecovered NUMBER,
    lastupdatedtime TIMESTAMP,
    recovered NUMBER,
    state TEXT,
    statecode TEXT,
    statenotes TEXT
);
CREATE TABLE Country (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dailyconfirmed INTEGER,
    dailydeceased INTEGER dailyrecovered INTEGER,
    date DATE,
    totalconfirmed INTEGER,
    totaldeceased INTEGER,
    totalrecovered INTEGER
);
INSERT INTO State (
        dailyconfirmed,
        dailyrecovered,
        date,
        totalconfirmed,
        totaldeceased,
        totalrecovered
    )
values (586, 48675, 2020 -11 -18, 8958063, 131027.8381603);
--DOWN
DROP TABLE State;
DROP TABLE Country;