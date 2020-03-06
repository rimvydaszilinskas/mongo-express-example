const { body } = require('express-validator/check');

exports.validate = (method) => {
    switch(method) {
        case 'createCity': {
            return [
                body('name', 'name has to be a string').isString(),
                body('population', 'population has to be an integer').isInt().optional(),
                body('name', 'name is required').exists()
            ]
        }
    }
}
