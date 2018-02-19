export default {
    "port": process.env.PORT || 3005,
    "mongoUrl": process.env.MONGODB_URI || "mongodb://localhost:27017/test",
    "bodyLimit":"100kb",
};