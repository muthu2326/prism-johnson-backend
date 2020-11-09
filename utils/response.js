exports.contructResponse = (code, data, message) => {
    let response = {
        status: code,
        data: data,
        message: message
    }
    return response
}