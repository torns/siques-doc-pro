import { Injectable } from '@nestjs/common';
import jimp from "jimp"
@Injectable()
export class ImageProcessService {
    resizeAvator(path: string, filename: string) {
        const filePath = `${path}/${filename}`;
        jimp.read(filePath).then(image => {
            image.resize(256, 256).write(`${path}/${filename}-256`);
            image.resize(128, 128).write(`${path}/${filename}-128`);
            image.resize(64, 64).write(`${path}/${filename}-64`);
        })
    }
}
