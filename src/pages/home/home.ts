import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController) {
    }

    buttonClick(event) {
        let label = event.target.innerText;
        let input = document.getElementById("equation");
        let equation = input.innerText;
        if (label.toUpperCase() === 'C') {
            equation = '';
        } else if (label.toUpperCase() === '<') {
            equation = equation.slice(0, -1);
        } else if (label.toUpperCase() === 'ROLL') {
            let rolls = [];
            let terms = equation.split('+');
            terms.forEach((term) => {
                let parts = term.split('D');
                if (parts.length == 2) {
                    let count = parseInt(parts[0]);
                    let sides = parseInt(parts[1]);
                    for (let die = 0; die < count; die++) {
                        let roll = 1 + Math.round((Math.random() * (sides - 1)));
                        rolls.push(roll);
                    }
                } else {
                    let modifier = parseInt(parts[0]);
                    rolls.push(modifier);
                }
            });
            let total = rolls.reduce((prev, current) => {
                return prev + current;
            });
            let lastRoll = '';
            if (rolls.length == 1) {
                lastRoll += total;
            } else {
                lastRoll += rolls.join('+') + '=' + total;
            }
            document.getElementById("last-roll").innerText = lastRoll;
        } else {
            equation = equation + label;
        }
        input.innerText = equation;
    }
}
