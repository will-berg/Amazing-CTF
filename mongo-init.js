db.createUser(
    {
        user: "root",
        pwd: "test",
        roles: [
            {
                role: "dbAdmin",
                db: "amazing-ctf"
            },
            {
                role: "readWrite",
                db: "amazing-ctf"
            }
        ]
    }
)