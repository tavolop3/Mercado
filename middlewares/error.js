module.exports = (err, req, res, next) => {
    console.clear();
    console.error(err.stack);

    res.status(500).json({ message: 'Something failed.' });
}

