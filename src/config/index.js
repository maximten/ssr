export const mongo = {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || '27017'
};

export default { mongo };