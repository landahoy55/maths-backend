'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _restaurant = require('../controller/restaurant');

var _restaurant2 = _interopRequireDefault(_restaurant);

var _account = require('../controller/account');

var _account2 = _interopRequireDefault(_account);

var _question = require('../controller/question');

var _question2 = _interopRequireDefault(_question);

var _topic = require('../controller/topic');

var _topic2 = _interopRequireDefault(_topic);

var _setup = require('../controller/setup');

var _setup2 = _interopRequireDefault(_setup);

var _subTopicResult = require('../controller/subTopicResult');

var _subTopicResult2 = _interopRequireDefault(_subTopicResult);

var _topicResults = require('../controller/topicResults');

var _topicResults2 = _interopRequireDefault(_topicResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

//connected to db
(0, _db2.default)(function (db) {

    //internal  middleware
    router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

    //api routes
    router.use('/restaurant', (0, _restaurant2.default)({ config: _config2.default, db: db }));
    router.use('/account', (0, _account2.default)({ config: _config2.default, db: db }));
    router.use('/question', (0, _question2.default)({ config: _config2.default, db: db }));
    router.use('/topic', (0, _topic2.default)({ config: _config2.default, db: db }));
    router.use('/setup', (0, _setup2.default)({ config: _config2.default, db: db }));
    router.use('/subtopicresult', (0, _subTopicResult2.default)({ config: _config2.default, db: db }));
    router.use('/topicresult', (0, _topicResults2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map