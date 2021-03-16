import { db } from '../../lib/db'


export default (req, res) => {
    // res.status(200)
    try {
        if (req.method === 'POST') {
            const { MeNu, Today, AddMenu } = req.body

            if (MeNu.use === 1 && Today.use === 1) {
                // const insertData = "INSERT INTO Menu VALUES( " + str(AddMenu.MenuId) + ",'" + AddMenu.Menu + "'," + str(AddMenu.Spicy) + "," + str(AddMenu.Vegetable) + "," + str(AddMenu.Restaurant)+ "," + str(AddMenu.Price)+")"
                db.all(`INSERT INTO Menu (MenuId, Menu, Spicy, Vegetable, Restaurant, Price ) VALUES (?,?,?,?,?,?)`, [AddMenu.MenuId, AddMenu.Menu, AddMenu.Spicy, AddMenu.Vegetable, AddMenu.Restaurant, AddMenu.Price])
                // console.log("success")
                // if (err) {
                //     res.status(err).end();
                // }
                res.status(200).end();
            }
            else {
                db.all(`SELECT count(HistoryId) as c FROM History`, (err, count) => {
                    // console.log("count" , count[0].c + 1)
                    // console.log("MeNu" , MeNu.Menu)
                    // console.log("Today",Today)
                    // insert menu data to History table
                    db.all(`INSERT INTO History (HistoryId, Menu, Spicy, Vegetable, Restaurant, Price, Date)
                                VALUES (${count[0].c + 1}, "${MeNu.Menu}" , ${MeNu.Spicy} , ${MeNu.Vegetable} , ${MeNu.Restaurant} , ${MeNu.Price} , "${Today}")`, () => {
                        // if (err) {
                        //     res.status(err).end();
                        // }
                        res.status(200)
                    })
                    // if (err) {
                    //     res.status(err).end();
                    // }
                    res.status(200)

                })

                // delete menu row in Menu table from id
                db.all(`DELETE FROM Menu WHERE Menu.MenuId = ${MeNu.MenuId}`, (err,rows) => {
                    // if (err) {
                    //     res.status(err).end();
                    // }
                    res.status(200)
                })

                db.all(`SELECT * FROM Menu`, (err, rows) => {
                    // if (err) {
                    //     res.status(err).end();
                    // }
                    res.status(200).send(rows);
                })
            }
        }
        else {
            db.all(`SELECT * FROM Menu`, (err, rows) => {
                // if (err) {
                //     res.status(err).end();
                // }
                res.status(200).send(rows);
            })
        }
    } catch (err) {
        res.status(err).json({});
    }
}

