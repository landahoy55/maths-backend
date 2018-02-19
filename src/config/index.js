export default {
    "port": process.env.PORT || 3005,
    "bodyLimit":"100kb",
    "mongoUrl": process.env.MONGO_URI || "mongodb://localhost:27017/test"
};