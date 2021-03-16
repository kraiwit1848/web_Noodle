import sqlite3 from 'sqlite3'
import path from 'path'

const pathToDB = path.join(process.cwd(), 'DataMenu.sqlite')
export const db = new sqlite3.Database(pathToDB, sqlite3.OPEN_READWRITE);
