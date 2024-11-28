export function validateName(name, surname){
    if (name.length + surname.length <= 3)
        return "Слишком короткое имя"
    return ""
}

export function validateEmail(email){
    if (email.startsWith("@")) {
        return "Некорректный адрес электронной почты"
    }
    if (!email.endsWith("@gmail.com")) {
        return "Разрешается использовать только gmail.com"
    }
    return ""
}

export function validatePassword(password){
    if (password.length < 6) {
        return "Пароль должен содержать не меньше 6 символов"
    }
    return ""
}
