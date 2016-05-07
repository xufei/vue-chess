<template>
    <svg height="620" version="1.1" width="560" xmlns="http://www.w3.org/2000/svg">
        <desc>Chinese Chess</desc>
        <defs>
            <g id="canGo">
                <rect x="15" y="15" width="30" height="30" fill="#3333aa" stroke="#3333aa" stroke-width="3"></rect>
            </g>
            <g id="canAttack">
                <rect x="5" y="5" width="50" height="50" fill="#ff0000" stroke="#ff0000" stroke-width="3"></rect>
            </g>
            <g id="red-general">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#ff0000">
                    <tspan dy="13">帅</tspan>
                </text>
            </g>
            <g id="red-guard">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#ff0000">
                    <tspan dy="13">仕</tspan>
                </text>
            </g>
            <g id="red-staff">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#ff0000">
                    <tspan dy="13">相</tspan>
                </text>
            </g>
            <g id="red-horse">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#ff0000">
                    <tspan dy="13">馬</tspan>
                </text>
            </g>
            <g id="red-chariot">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#ff0000">
                    <tspan dy="13">車</tspan>
                </text>
            </g>
            <g id="red-cannon">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#ff0000">
                    <tspan dy="13">砲</tspan>
                </text>
            </g>
            <g id="red-soldier">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#ff0000">
                    <tspan dy="13">兵</tspan>
                </text>
            </g>
            <g id="black-general">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#000000">
                    <tspan dy="13">将</tspan>
                </text>
            </g>
            <g id="black-guard">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#000000">
                    <tspan dy="13">士</tspan>
                </text>
            </g>
            <g id="black-staff">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#000000">
                    <tspan dy="13">象</tspan>
                </text>
            </g>
            <g id="black-horse">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#000000">
                    <tspan dy="13">马</tspan>
                </text>
            </g>
            <g id="black-chariot">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#000000">
                    <tspan dy="13">车</tspan>
                </text>
            </g>
            <g id="black-cannon">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#000000">
                    <tspan dy="13">炮</tspan>
                </text>
            </g>
            <g id="black-soldier">
                <circle r="24" fill="#eeeeee" stroke="#000" stroke-width="3"></circle>
                <text text-anchor="middle" stroke="none" fill="#000000">
                    <tspan dy="13">卒</tspan>
                </text>
            </g>
        </defs>

        <g>
            <rect v-bind:x="chessboard.offsetX" v-bind:y="chessboard.offsetY"
                v-bind:width="width" v-bind:height="height"
                fill="none" stroke="#000000" stroke-width="3"></rect>
            <path v-for="path in chessboard.pathArr" fill="none" stroke="#000000" v-bind:d="path"></path>
        </g>

        <use v-for="chess in game.chesses" v-bind:x="chessX(chess.x)" v-bind:y="chessY(chess.y)"
            xlink:href="{{symbol(chess)}}"
            v-on:click="game.currentPlayer.select(chess)"></use>
        <use v-for="position in game.moveablePlaces" xlink:href="#canGo"
            v-bind:x="canGoX(position.x)" v-bind:y="canGoX(position.y)"
            v-on:click="game.currentPlayer.move(position)"></use>
        <use v-for="position in game.chessUnderAttack" xlink:href="#canAttack"
            v-bind:x="canAttackX(position.x)" v-bind:y="canAttackY(position.y)"
            v-on:click="game.currentPlayer.attack(position)"></use>
    </svg>
</template>

<script>
import Setting from "./setting";
import Game from "./game";
import ChessBoard from "./chessboard";

const colors = {
    "1": "red",
    "0": "",
    "-1": "black"
};

const types = ["blank", "soldier", "cannon", "chariot", "horse", "staff", "guard", "general"];


var game = new Game();
var chessboard = new ChessBoard();

export default {
    data () {
        return {
            game,
            chessboard
        }
    },

    computed: {
        width() {
            return this.chessboard.gridSize * 8;
        },
        height() {
            return this.chessboard.gridSize * 9;
        }
    },
    
    methods: {
        symbol(chess) {
            return "#" + colors[chess.color] + "-" + types[chess.type];
        },
        
        chessX(x) {
            return Setting.offsetX + x * Setting.gridSize;
        },
        
        chessY(y) {
            return Setting.offsetY + y * Setting.gridSize;
        },
    
        canGoX(x) {
            return Setting.offsetX + (x - 0.5) * Setting.gridSize;
        },
        
        canGoY(y) {
            return Setting.offsetY + (y - 0.5) * Setting.gridSize;
        },
        
        canAttackX(x) {
            return Setting.offsetX + (x - 0.5) * Setting.gridSize;
        },
        
        canAttackY(y) {
            return Setting.offsetY + (y - 0.5) * Setting.gridSize;
        }
    }
    
}
</script>
