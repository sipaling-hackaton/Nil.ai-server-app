
const test = async (req, res, next) => {
    console.log("ekekke");
    return res.status(200).json({a:1});
}

module.exports = {
    test
}