# DiceRoller

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1.

## About

This project uses [`threejs`](https://github.com/mrdoob/three.js), [`cannonjs`](https://github.com/schteppe/cannon.js), and [`threejs-Dice`](https://github.com/jakehockey10/threejs-dice) to provide a graphically sophisticated dice rolling simulator.  **Note: I had to fork and change a few things with the `threejs-Dice` library and use my own fork in this project in order to get it tow work with TypeScript/Angular.  The way it export its functionality needed to be adjusted.  You can see my pull request [here](https://github.com/byWulf/threejs-dice/pull/4).

### Things focused on in this demo application are:
- Routing
- Master-child component interaction
- Integration with third-party libraries NOT written in TypeScript
- Multiple-module organization
- Component, service, and end-to-end testing
- Use of third-party UI framework ([clarity](https://vmware.github.io/clarity/))

I have deployed this to my github pages: [Dice Roller](https://jakehockey10.github.io/dice-roller/)

### Things I'd like to improve:
- The overall layout of the dice rolling simulation could be better.
- The roll buttons are not as intuitively located as they could be.
- There is more component/service tests I could have written.
- There is plenty more end-to-end testing I could have done.
  - It would repeat a lot of what my component/service tests verify, but it would do it with all the pieces strung together unlike in the component/service tests' context.
- The simulation is finished well before the animation makes that apparent to the user, so it is confusing that the roll results show up prior to the dice appear to stabilize.  Syncing the physics with the animation, or at least appearing to, would simplify further development reliant on the dice rolling.
- I could have this rely on a backend service like firebase, a Ruby on Rails API, or a C# Web API so that there is persistance with the results of the dice rolls.  I could also introduce websockets so that multiple users could roll dice together, potentially having various dice-based games facilitated for the users in a "room" or at a "table."
- As with other projects I've worked on in the past, introducing automatic codebase documentation with a tool like [`compodoc`](https://github.com/compodoc/compodoc) would provide a place for developers to stay familiar with an ever growing codebase.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
