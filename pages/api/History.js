import { db } from '../../lib/db'

export default (req, res) => {
    
    switch (req.method) {
        case 'POST':
            const { DateToday } = req.body
            db.all(`SELECT * FROM History WHERE History.Date like "${DateToday}"`, (err, rows) => {
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

