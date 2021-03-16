import { db } from '../../lib/db'

export default (req, res) => {
    // db.all(`SELECT * FROM History `, (err, rows) => {
    //     res.status(200).send(rows);
    // })
    switch (req.method) {
        case 'POST':
            db.all(`SELECT * FROM History `, (err, rows) => {
                res.status(200).send(rows);
            })
            break

        case 'GET':
            db.all(`SELECT * FROM History `, (err, rows) => {
                res.status(200).send(rows);
            })
            break

        default:
            res.status(405).end()
            break

    }
}

