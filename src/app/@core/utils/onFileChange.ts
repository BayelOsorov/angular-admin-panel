import { toBase64 } from './toBase64';

export const onFileChange = (event) => {
    if (event.target.files.length > 0) {
        let obj = {};
        Object.values(event.target.files).forEach((item) => {
            toBase64(item).then((res) => {
                const base64 = `data:image/jpeg;base64,${res}`;
                obj = {
                    img: base64,
                    base64: res,
                };
            });
        });
        return obj;
    }
};
