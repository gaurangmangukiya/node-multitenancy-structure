module.exports = {
    auth: {
        userExists: {
            error: "User Exists",
            TYPE: "EXISTS",
            code: 400,
        },
        userNotFound: {
            error: "User Not Found",
            code: 404,
        },
        invalidPassword: {
            error: "Invalid Password",
            code: 400,
        },
        isNotVerified: {
            error: "User is not verified",
            type: "NOT_VERIFIED",
            code: 400,
        },
        resendOTP: {
            error: "Please request for APIs",
            type: "RESEND_OTP",
            code: 400,
        },
        invalidOTP: {
            error: "Invalid OTP",
            type: "INVALID_OTP",
            code: 400,
        },
        otpAlreadyExist: {
            error: "OTP Already Exist",
            type: "OTP_EXIST",
            code: 400,
        },
        isVerified: {
            error: "User is already verified",
            type: "IS_VERIFIED",
            code: 400,
        },
        companyExists: {
            error: "Company Exists",
            code: 400,
        },
        alreadyMember: {
            error: "User Email Already Exists In Company",
            TYPE: "EXISTS",
            code: 400,
        },
        resendToken: {
            error: "Please request for APIs",
            type: "RESEND_TOKEN",
            code: 400,
        },
        invalidToken: {
            error: "Invalid TOKEN",
            type: "INVALID_TOKEN",
            code: 400,
        },
        tokenAlreadyExist: {
            error: "Token Already Exist",
            type: "Token_EXIST",
            code: 400,
        },
    }
}