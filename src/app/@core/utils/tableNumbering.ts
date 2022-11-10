export const tableNumbering = (page, index) =>
    page === 1
        ? index + 1
        : page === 2
        ? page * 10 + index + 1
        : page * 10 + (page * 10 - 20) + index + 1;
