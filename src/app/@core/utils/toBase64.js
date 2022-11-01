export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>
            resolve(
                reader.result.replace(
                    `data:image/${'jpeg' || 'jpg' || 'png'};base64,`,
                    ''
                )
            );
        reader.onerror = (error) => reject(error);
    });
export const blobToBase64 = (blob, callback) => {
    if (blob instanceof Blob) {
        // var reader = new FileReader();
        // reader.readAsDataURL(blob);
        // reader.onloadend = function () {
        //     var base64data = reader.result;
        //     callback(base64data);
        // };
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((resolve) => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    }
};
