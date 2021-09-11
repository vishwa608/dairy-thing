import * as SQLite from 'expo-sqlite'

class Database{
    constructor(name){
        this.connection = SQLite.openDatabase(`./${name}.db`)
    }

    enableForeignKey(){
        return new Promise((resolve, reject)=>{
            try{
                const queries =[
                    {sql:'PRAGMA foreign_keys = ON;', args:[]},
                ];
                const readOnly = false;
                const callback = ()=>{
                    resolve('Foreign keys turned on')
                }
                this.connection.exec(queries, readOnly, callback)
            } catch(error){
                reject(error)
            }
        })
    }
    query(queries){
        return new Promise((resolve, reject) => {
            this.connection.transaction(
                tx => {
                        const multipleQuery = (queries) => {
                            queries.forEach(query => {
                                const {sql, args} = query;
                                tx.executeSql(sql, args)
                            })
                        }
                        const singleQuery = (query) =>{
                            const {sql,args} = query;
                            const successCallback = (_,resultSet) => resolve(resultSet)
                            const errorCallback = (_, error) => reject(error)

                            tx.executeSql(
                                sql,
                                args,
                                successCallback,
                                errorCallback   
                            )
                        }

                        if(Array.isArray(queries)){
                            multipleQuery(queries)
                        } else{
                            singleQuery(queries)
                        }
                },
                (error) => reject(error),
                () => resolve('Successfully executed queries')
            )
        })
    }
}


export default Database;    