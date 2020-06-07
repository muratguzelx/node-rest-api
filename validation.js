const validator = require('validator');

module.exports = function validate(data) {
  const { minCount, maxCount, startDate, endDate } = data;
  const errors = {};

  if (isEmpty(startDate)) {
    errors.startDate = 'startDate is required';
  }
  else {
    if (!validator.isISO8601(startDate)) {
      errors.startDate = 'startDate must be in YYYY-MM-DD format';
    }
  }

  if (isEmpty(endDate)) {
    errors.endDate = 'endDate is required';
  }
  else {
    if (!validator.isISO8601(data.endDate)) {
      errors.endDate = 'endDate must be in YYYY-MM-DD format';
    }
  }

  if (!isEmpty(Date.startDate) && !isEmpty(Date.endDate)) {
    if (!validator.isBefore(data.startDate, data.endDate)) {
      errors.minCount = 'endDate must be greater than start date';
    }
  }

  if (isEmpty(minCount)) {
    errors.minCount = 'minCount is required';
  }
  else {
    if (!validator.isInt(minCount.toString())) {
      errors.minCount = 'minCount must be numeric';
    }
  }

  if (isEmpty(maxCount)) {
    errors.maxCount = 'maxCount is required';
  }
  else {
    if (!validator.isInt(maxCount.toString())) {
      errors.maxCount = 'maxCount must be numeric';
    }
  }

  if (!isEmpty(minCount) && !isEmpty(maxCount)) {
    if (parseInt(maxCount) < parseInt(minCount)) {
      errors.minCount = 'maxCount must be greater than minCount';
    }
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }

}

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object') ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}
