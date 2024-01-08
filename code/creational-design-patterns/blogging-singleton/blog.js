import { db } from './db.js'
import { promisify } from 'util'

const dbRun = promisify(db.run.bind(db))
const dbAll = promisify(db.all.bind(db))

export class Blog {
  initialize() {
    return dbRun(`
      CREATE TABLE IF NOT EXISTS posts (
        id ROWID,
        title TEXT NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
  }

  createPost(title, content) {
    return dbRun('INSERT INTO posts VALUES (?, ?, ?, ?)', title, content)
  }

  getAllPosts() {
    return dbAll(`SELECT * FROM posts ORDER BY created_at DESC`)
  }
}
