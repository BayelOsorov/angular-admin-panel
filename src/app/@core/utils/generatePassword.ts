// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export const GeneratePassword = (
    len = 12,
    minUpper = 1,
    minLower = 1,
    minNumber = 1,
    minSpecial = -1
) => {
    let chars = String.fromCharCode(...Array(127).keys()).slice(33); //chars
    const A2Z = String.fromCharCode(...Array(91).keys()).slice(65); //A-Z
    const a2z = String.fromCharCode(...Array(123).keys()).slice(97); //a-z
    const zero2nine = String.fromCharCode(...Array(58).keys()).slice(48); //0-9
    const specials = chars.replace(/\w/g, '');
    if (minSpecial < 0) {
        chars = zero2nine + A2Z + a2z;
    }
    if (minNumber < 0) {
        chars = chars.replace(zero2nine, '');
    }
    const minRequired = minSpecial + minUpper + minLower + minNumber;
    const rs = [].concat(
        Array.from(
            { length: minSpecial ? minSpecial : 0 },
            () => specials[Math.floor(Math.random() * specials.length)]
        ),
        Array.from(
            { length: minUpper ? minUpper : 0 },
            () => A2Z[Math.floor(Math.random() * A2Z.length)]
        ),
        Array.from(
            { length: minLower ? minLower : 0 },
            () => a2z[Math.floor(Math.random() * a2z.length)]
        ),
        Array.from(
            { length: minNumber ? minNumber : 0 },
            () => zero2nine[Math.floor(Math.random() * zero2nine.length)]
        ),
        Array.from(
            {
                length:
                    Math.max(len, minRequired) -
                    (minRequired ? minRequired : 0),
            },
            () => chars[Math.floor(Math.random() * chars.length)]
        )
    );
    return rs.sort(() => Math.random() - Math.random()).join('');
};
