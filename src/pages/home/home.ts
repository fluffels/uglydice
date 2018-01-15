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
        } else if (label.toUpperCase() === 'ROLL') {
            let parts = equation.split('D');
            let count = parseInt(parts[0]);
            parts = parts[1].split('+');
            let sides = parseInt(parts[0]);
            let modifier = parseInt(parts[1]);
            console.log(`${count} ${sides} sided dice plus ${modifier}`);
            let lastRoll = '';
            let total = modifier;
            for (let die = 0; die < count; die++) {
                let roll = 1 + Math.round((Math.random() * sides));
                if (die == 0) {
                    lastRoll = "" + roll;
                } else {
                    lastRoll += " + " + roll;
                }
                total += roll;
            }
            lastRoll += " + " + modifier + " = " + total;
            document.getElementById("last-roll").innerText = lastRoll;
            console.log(total);
        } else {
            equation = equation + label;
        }
        input.innerText = equation;
    }
}
