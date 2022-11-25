export enum InputType {
    WHITESPACE,
    NEWLINE,
    CHAR,
    NUMBER,
    STRING,
    STRING_NAME,
    STRING_EMAIL,
    MATRIX_CHAR,
    MATRIX_NUMBER,
}

const SAMPLE_NAMES = [
    'Gabriella Alvarez',
    'Rowan Short',
    'Kamren Ware',
    'Jonah Ford',
    'Marquis Wiley',
    'Kaeden Walls',
    'Angela Baker',
    'Vincent Ferrell',
    'Jalen Carlson',
    'Jazlynn Jackson',
    'Easton Estrada',
    'Larry Saunders',
    'Sean Kaiser',
    'Alison Harrison',
    'Charlie Barber',
    'Broderick Humphrey',
    'Timothy Bond',
    'Arabella Blanchard',
    'Brian Snyder',
    'Arianna Jimenez',
    'Grace Noble',
    'Marissa Fitzpatrick',
    'Lincoln Wilson',
    'Jaylan Bishop',
    'Cadence Galloway',
    'Makayla Kaufman',
    'Mariana Werner',
    'Elle Jones',
    'Sincere Haynes',
    'Charlie Garrett',
].map(x => x.split(' '))

const POSTFIX_NAMES = [
    null, 'I', 'II', 'III', 'IV'
]

const EMAIL_PROVIDERS = [
    'gmail.com',
    'hotmail.com',
    'yopmail.com',
    'yahoo.com',
    'outlook.com',
    'icloud.com',
    'yandex.com'
]

function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randItem<T>(arr: ArrayLike<T>): T {
    const idx = Math.floor(Math.random() * arr.length)
    return arr[idx]
}

function generateName() {
    const postfix = randItem(POSTFIX_NAMES)
    const firstName = randItem(SAMPLE_NAMES)[0]
    const lastName = randItem(SAMPLE_NAMES)[1]
    let name = `${firstName} ${lastName}`
    if (postfix) name += ` ${postfix}`
    return name
}

function generateEmail() {
    const provider = randItem(EMAIL_PROVIDERS)
    const number = Math.random() * 100
    return (generateName() + ' ' + number.toFixed(2))
        .toLowerCase()
        .replace(/\s/g, '_') + '@' + provider
}