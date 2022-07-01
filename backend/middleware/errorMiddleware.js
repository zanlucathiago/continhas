const errorHandler = (err, req, res, next) => {
  const { statusCode } = res;
  if (statusCode >= 400 && statusCode < 500) {
    res.json({
      message: err.message,
    })
  } else {
    res.status(500)
    res.json({
      message: 'A solicitação falhou devido a um erro interno',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  }
}

module.exports = {
  errorHandler,
}