
import Setting from "./setting";

export default class ChessBoard {
    constructor() {
        this.offsetX = Setting.offsetX;
        this.offsetY = Setting.offsetY;
        this.gridSize = Setting.gridSize;
        this.pathArr = [];

        this.init();
    }

    init() {
        let pathArr = [];

        // 横线
        for (let i = 1; i < 9; i++) {
            pathArr.push(this.drawLine(0, i, 8, i));
        }

        // 竖线
        for (let i = 1; i < 8; i++) {
            pathArr.push(this.drawLine(i, 0, i, 4));
            pathArr.push(this.drawLine(i, 5, i, 9));
        }

        // 九宫格的线
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                pathArr.push(this.drawLine(3 + 2 * i, 7 * j, 5 - 2 * i, 2 + 7 * j));
            }
        }

        // 炮位
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                pathArr = pathArr.concat(this.drawStar(1 + i * 6, 2 + j * 5));
            }
        }

        // 兵位
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 2; j++) {
                pathArr = pathArr.concat(this.drawStar(i * 2, 3 + j * 3));
            }
        }

        this.pathArr = pathArr;
    }

    // 生成线的路径
    drawLine(x1, y1, x2, y2) {
        return "M" + (Setting.offsetX + x1 * Setting.gridSize) + "," + (Setting.offsetY + y1 * Setting.gridSize)
            + " L" + (Setting.offsetX + x2 * Setting.gridSize) + "," + (Setting.offsetY + y2 * Setting.gridSize);
    }

    // 生成十字花
    drawStar(x, y) {
        let arr = [];
        let distance = 1 / 10;
        let length = 1 / 4;

        let startX, startY, endX, endY;

        // 左边画一半
        if (x != 0) {
            startX = x - distance;
            startY = y - distance - length;
            endX = x - distance - length;
            endY = y - distance;

            arr.push(this.drawLine(startX, startY, startX, endY));
            arr.push(this.drawLine(startX, endY, endX, endY));

            startY = y + distance + length;
            endY = y + distance;

            arr.push(this.drawLine(startX, startY, startX, endY));
            arr.push(this.drawLine(startX, endY, endX, endY));
        }

        // 右边画一半
        if (x != 8) {
            startX = x + distance;
            startY = y - distance - length;
            endX = x + distance + length;
            endY = y - distance;

            arr.push(this.drawLine(startX, startY, startX, endY));
            arr.push(this.drawLine(startX, endY, endX, endY));

            startY = y + distance + length;
            endY = y + distance;

            arr.push(this.drawLine(startX, startY, startX, endY));
            arr.push(this.drawLine(startX, endY, endX, endY));
        }

        return arr;
    }
}