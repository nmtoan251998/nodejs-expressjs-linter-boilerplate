const {
    app
} = require('./config/express');

const {
    port
} = require('./config/vars');

app.listen(port, () => console.log(`Server is listening on port: ${port}`));

module.exports = {
    app
};
