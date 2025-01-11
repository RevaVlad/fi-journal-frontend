export function validateName(name, surname){
    if (name.length + surname.length <= 3)
        return "Слишком короткое имя"
    return ""
}

export function validateEmail(email){
    if (email.startsWith("@") || email.length <= 3 || !email.includes("@")) {
        return "Некорректный адрес электронной почты"
    }
    return ""
}

export function validatePassword(password){
    if (password.length < 6) {
        return "Пароль должен содержать не меньше 6 символов"
    }
    return ""
}
