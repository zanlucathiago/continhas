function addField(field, value) {
  return addFields({ [field]: value })
}
function addFields($addFields) {
  return { $addFields };
}

function _case(__case, then) {
  return { case: __case, then };
}

function eq($eq) {
  return { $eq };
}

function first($first) {
  return { $first };
}

function fromField(field) {
  return {
    from: `${field}s`,
    localField: field,
    foreignField: "_id",
    as: `${field}s`,
  }
}

function fromPipeline(field, _lookup) {
  return {
    from: `${field}s`,
    let: { [field]: `$${field}` },
    pipeline: [match({ $expr: eq([`$$${field}`, "$_id"]) }), lookup(_lookup)],
    as: `${field}s`,
  }
}

function group($group) {
  return { $group };
}

function lookup($lookup) {
  return { $lookup };
}

function match($match) {
  return { $match };
}

function or($or) {
  return { $or };
}

function push($push) {
  return { $push };
}

function sort($sort) {
  return { $sort };
}

function subtract($subtract) {
  return { $subtract };
}

function sum($sum) {
  return { $sum };
}

function _switch(branches, _default) {
  return { $switch: { branches, default: _default } };
}

module.exports = {
  addField,
  addFields,
  _case,
  eq,
  first,
  fromField,
  fromPipeline,
  group,
  lookup,
  match,
  or,
  push,
  sort,
  subtract,
  sum,
  _switch,
}