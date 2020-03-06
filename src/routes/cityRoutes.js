const Router = require('express').Router;
const { validationResult } = require('express-validator/check');

const City = require('../models/city');
const { validate } = require('../middleware/validate');

module.exports = () => {
    const router = Router();

    router.get('/', (req, res) => {
        
        City.getAll().then(cities => {
            return res.json(cities);
        }).catch(err => {
            console.log(err);
            res.status(500).json({'detail': 'Internal server error'});
        });

    });

    router.post('/', validate('createCity'), (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
            return;
        }

        const {name, population} = req.body;

        City.create({
            name: name,
            population: population
        }).then(city => {
            return res.status(201).json(city);
        }).catch(err => {
            if (err.errmsg) {
                return res.status(400).json({'detail': err.errmsg});
            } else {
                console.log(err);
            }
            return res.status(500);
        });
    });

    router.get('/:id([a-fA-F0-9]{24})', (req, res) => {
        City.findById(req.params.id).then(city => {
            if(!city)
                return res.sendStatus(404);
            return res.status(200).json(city);
        }).catch(e => {
            console.log(e)
            return res.sendStatus(500);
        });
    });

    return router;
}
