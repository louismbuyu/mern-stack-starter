module.exports = {
    async up(db, client) {
        const session = client.startSession();
        try {
            await session.withTransaction(async () => {
                await db.collection('users').createIndex({ email: 1 }, { name: "users_email_unique_index", unique: true,});
                await db.collection('users').createIndex({ username: 1 }, { name: "users_username_unique_index", unique: true,});
            });
        } finally {
            await session.endSession();
        }
    },
    async down(db, client) {
        const session = client.startSession();
        try {
            await session.withTransaction(async () => {
                await db.collection('users').dropIndex("users_email_unique_index")
                await db.collection('users').dropIndex("users_username_unique_index")
            });
        } finally {
            await session.endSession();
        }
    }
}