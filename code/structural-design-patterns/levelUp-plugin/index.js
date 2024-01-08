import { Level } from 'level'
import { levelSubscribe } from './level-subscribe.js'

const db = new Level('db', { valueEncoding: 'json' })
levelSubscribe(db)

db.subscribe({ doctype: 'tweet', language: 'en' }, (k, v) => console.log(v))

db.put('1', {
  doctype: 'tweet',
  text: 'Hi',
  language: 'en',
})

db.put('2', {
  doctype: 'company',
  name: 'ACME Co.',
})
