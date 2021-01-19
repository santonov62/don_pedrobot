const db = require('./db.service');
const moment = require('moment');

const EXPIRED_DISPUTES = `SELECT * FROM disputes 
WHERE "expired_at" < $1 AND "resolved_at" IS NULL`;
const expired = async () => {
  const result = await db.query(EXPIRED_DISPUTES, [moment()]);
  return result.rows;
}

const ADD_DISPUTE = `INSERT INTO disputes (
    "title", "expired_at"
) VALUES (
    $1, $2
) RETURNING *`;

const add = async ({title, expired_at}) => {
  const result = await db.query(ADD_DISPUTE, [
    title,
    expired_at
  ]);
  return result.rows[0];
};

const UPDATE_DISPUTE_EXPIRED = `UPDATE disputes
SET
  "expired_at" = $2
WHERE
  id = $1
RETURNING *`;
const save = async ({id, expired_at}) => {
  const result = await db.query(UPDATE_DISPUTE_EXPIRED, [id, expired_at]);
  return result.rows[0];
};

const log = (text, params) => {
  console.log(`[disputes.service] -> ${text}`, params);
};

module.exports = {
  add,
  save,
  expired
};