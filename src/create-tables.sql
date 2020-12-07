CREATE TABLE IF NOT EXISTS "players" (
    "server" TEXT, "score" INTEGER, "name" TEXT, "id" TEXT, 
    PRIMARY KEY("id","server"));
CREATE TABLE IF NOT EXISTS "settings" ( 
    "server" TEXT, 
    "value" TEXT, 
    "id" TEXT);

CREATE TABLE IF NOT EXISTS "winnings" (
    "sid" TEXT, "pid" TEXT, "prize" TEXT,
    PRIMARY KEY("sid","pid","prize"));
