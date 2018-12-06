const statusCode = {
    ERROR_400: () => {
        return {
            code: 400
        }
    },
    ERROR_401: (msg) => {
        return {
            code: 401,
            msg
        }
    },

    ERROR_403: (msg) => {
        return {
            code: 403,
            msg
        }
    },

    ERROR_404: (msg) => {
        return {
            code: 404,
            msg
        }
    },

    ERROR_412: (msg) => {
        return {
            code: 412,
            msg
        }
    },
    ERROR_412: () => {
        return {
            code: 412,
        }
    },

    SUCCESS_200: (msg, data) => {
        return {
            code: 200,
            msg,
            data,
        }
    },
    SUCCESS_200: (data) => {
        return {
            code: 200,
            data,
        }
    },
    test: (msg) => {
        return {
            code: 200,
            msg,
        }
    },
    SUCCESS2_200: () => {
        return {
            code: 200,
        }
    }
    //这个函数会覆盖掉上一个函数
}

module.exports = statusCode