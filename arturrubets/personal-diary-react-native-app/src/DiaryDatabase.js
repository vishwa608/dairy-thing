import Database from './Database'

class DiaryDatabase extends Database {
    constructor(name) {
        super(name);
    }

    initialize() {
        const createUserTable = `
            CREATE TABLE IF NOT EXISTS user(
                id INTEGER PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                gender CHAR(6) NOT NULL,
                birth_date CHAR(10) NOT NULL,
                email TEXT NOT NULL
            );
        `

        const insertDefaultUser = `
            INSERT INTO user(id, first_name, last_name, gender, birth_date, email)
            SELECT 1, 'Rodion', 'Rubets', 'Male', '2006-02-13', 'rodion.rubets@gmail.com'
            WHERE NOT EXISTS(SELECT 1 FROM user WHERE id = 1)
        `

        const createDiaryTable = `
            CREATE TABLE IF NOT EXISTS diary(
                id INTEGER PRIMARY KEY,
                date CHAR(10)  NOT NULL,
                text TEXT NOT NULL,
                user_id INTEGER NOT NULL,

                FOREIGN KEY (user_id) REFERENCES user(id)
            )
        `

        return this.enableForeignKey().then((message) => {

            return this.query([
                { sql: createUserTable, args: [] },
                { sql: insertDefaultUser, args: [] },
                { sql: createDiaryTable, args: [] },

            ])
        })
    }

    fetchUser(id) {
        const sql = `SELECT * FROM user WHERE id=?;`

        return (
            this.query(
                { sql, args: [id] }
            ).then((resultSet) => {
                const { rows: { _array } } = resultSet;
                const user = _array[0];
                const { id, gender, email } = user

                return {
                    id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    gender,
                    birthDate: user.birth_date,
                    email
                }

            }).catch((error) => {
                console.log(`db.fetchUser sql: ${sql} error: ${JSON.stringify(error, null, '\t')}`)
            })
        )
    }

    fetchDiaries(limit = 10, order='DESC') {
        const sql = `
        SELECT * FROM diary
        ORDER BY date ${order}
        LIMIT ${limit}
        `

        return (
            this.query(
                { sql, args: [] }
            ).then((resultSet) => {
                const { rows } = resultSet;

                return rows._array;

            }).catch((error) => {
                console.log(`db.fetchDiaries sql: ${sql} error: ${JSON.stringify(error, null, '\t')}`)
            })
        )
    }

    updateUser(user) {
        const { id, firstName, lastName, gender, birthDate, email } = user;
        console.log(user)
        const sql = `
            UPDATE user SET first_name=?,
                last_name=?,
                gender=?,
                birth_date=?,
                email=?
            WHERE id=?
        `;

        return (
            this.query({ sql, args: [firstName, lastName, gender, birthDate, email, id] }).then(
                (resultSet) => {
                    const { rowsAffected } = resultSet;

                    return rowsAffected
                }
            ).catch((error) => {
                console.log(`db.updateUser sql: ${sql} error: ${JSON.stringify(error, null, '\t')}`)
            })
        )
    }


    insertDiary(diary) {
        const { date, text, userId } = diary;

        const sql = `
            INSERT INTO diary(date, text, user_id)
            VALUES(?,?,?);
        `;

        return (
            this.query({
                sql, 
                args: [date, text, userId]
            }).then(
                (resultSet) => {
                    const { insertId } = resultSet;

                    return insertId
                }
            ).catch((error) => {
                console.log(`db.insertDiary sql: ${sql} error: ${JSON.stringify(error, null, '\t')}`)
                throw new Error(`Error: A diary already exists for the date ${date}`)
            })
        )
    }

    updateDiary(diary) {
        const { id,text} = diary;

        const sql = `
            UPDATE diary SET text=?
            WHERE id=?
        `;

        return (
            this.query({ sql, args: [id,text] }).then(
                (resultSet) => {
                    const { rowsAffected } = resultSet;

                    return rowsAffected
                }
            ).catch((error) => {
                console.log(`db.updateDiary sql: ${sql} error: ${JSON.stringify(error, null, '\t')}`)
                throw new Error(`Error: The diary for the id ${id} does not exists`)
            })
        )
    }

    deleteDiary(id) {

        const sql = `
            DELETE FROM diary WHERE id=?
        `;

        return (
            this.query({ sql, args: [id] }).then(
                (resultSet) => {
                    const { rowsAffected } = resultSet;

                    return rowsAffected
                }
            ).catch((error) => {
                console.log(`db.deleteDiary sql: ${sql} error: ${JSON.stringify(error, null, '\t')}`)
            })
        )
    }
}


export default DiaryDatabase