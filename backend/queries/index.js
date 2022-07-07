const {
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
} = require('./functions')

function getReferenceList(user, referenceAccount) {
  return [
    lookup(fromPipeline('transaction', fromPipeline('statement', fromField('user')))),
    lookup(fromField('account')),
    addField('referenceUser', first("$accounts.referenceUser")),
    match(or([
      {
        account: referenceAccount._id
      },
      {
        referenceUser: user._id
      },
    ])),
    addField('isExternal', eq(["$referenceUser", user._id])),
    addFields({
      category: _switch([
        _case("$confirmed", "confirmed"),
        _case("$isExternal", "received"),
      ], "sended"),
      calculatedValue: _switch([
        _case("$isExternal", subtract([0, "$value"])),
      ],
        "$value"),
    }),
    group({
      _id: {
        date: first("$transactions.date"),
        category: "$category",
      },
      references: push('$$ROOT'),
      category: first("$category"),
      dateGroupTotal: sum("$calculatedValue")
    }),
    group({
      _id: "$category",
      dates: push('$$ROOT'),
      category: first("$category"),
      total: sum("$dateGroupTotal")
    }),
    sort({ _id: -1 }),
  ]
}

module.exports = {
  getReferenceList
}