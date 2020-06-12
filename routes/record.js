const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const WFH_Survey = require('../model/WFH_Survey');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
// @route GET api/records/all
// @desc Get one record
// @access Private

router.get('/all', auth, async (req, res) => {
  try {
    const mood = await Moods.find({}).sort({
      date: -1,
    });

    return res.status(200).json(mood);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: 'Server Error! Please check connection' });
  }
});

// @route GET api/records/myBar?data=data
// @desc Get MyBar record
// @access Private

router.get('/myBar', auth, async (req, res) => {
  const { startDate, endDate, manager } = req.query;
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  const date = {
    $gte: newStartDate,
    $lt: moment(newEndDate).add(1, 'days').format(),
  };

  try {
    if (manager !== 'null') {
      console.log('with manager');
      const Survey = await WFH_Survey.find({
        createdAt: date,
        WFH_Team_Manager: manager,
      });
      return res.status(200).json(Survey);
    }

    console.log('no manager');
    const Survey = await WFH_Survey.find({
      createdAt: date,
    });
    return res.status(200).json(Survey);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: 'Server Error! Please check connection' });
  }
});

// @route GET api/records/count
// @desc Get one record
// @access Private

router.get('/count', auth, async (req, res) => {
  try {
    const countMood = await Moods.count();

    return res.status(200).json(countMood);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: 'Server Error! Please check connection' });
  }
});

// @route GET api/records/:id
// @desc  Get Specific Records
// @access Private

router.get('/:id', auth, async (req, res) => {
  try {
    const mood = await Moods.findOne({ _id: req.params.id });
    if (!mood) return res.status(404).json({ msg: 'No record Found' });
    res.json(mood);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'Server Error! Please check connection' });
  }
});

router.post(
  '/dateBetween',
  [check('startDate').notEmpty(), check('endDate').notEmpty()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ msg: errors });
    }

    const { startDate, endDate } = req.body;

    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    const date = {
      $gte: newStartDate,
      $lt: moment(newEndDate).add(1, 'days').format(),
    };

    try {
      const moodData = await Moods.find({
        createdAt: date,
      });

      return res.status(200).json(moodData);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error });
    }
  }
);

// @route   Post /api/records
// @desc    Store data to database
// @access  Public

router.post(
  '/',
  [
    auth,
    check('employeeID')
      .isNumeric()
      .notEmpty()
      .withMessage('Employee ID is required!'),
    check('moodMeter')
      .isNumeric()
      .notEmpty()
      .withMessage('Please insert a mood meter'),
    check('workShifts')
      .notEmpty()
      .trim()
      .withMessage('Work shift is required!'),
    check('reviewersReason').trim().escape(),
    check('ownWordReason').escape(),
    check('RCoaches').notEmpty().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ msg: errors });
    }

    try {
      let mood = await new Moods(req.body);

      mood.save();
      return res.status(201).json(mood);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
