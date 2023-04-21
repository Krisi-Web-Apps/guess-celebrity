const success = (data, code = 1) => {
    return {
        code,
        status: "success",
        data,
    }
}

const error = (message, code = 0) => {
    return {
        code,
        message,
    }
}

module.exports = {
    success,
    error
}
