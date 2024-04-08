# TodoList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.

## Getting started

Clone the repository to your local machine.

- git clone https://github.com/wu1dan/angular-todo

Navigate to the project directory

- cd <project directory>

Install dependencies

- npm install

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Using

You can add/edit items immediately, but it is under a guest account. All items on the item list are saved to the user, so logging in as a user and adding items will save your items to the user and logging out will restore the items of the guest account instance. Currently, there are two premade users which can be accessed in the login modal. The First and Last name for the first user is (Danny, Wu) and the second user is (Test, Subject). Alternatively you can create a new user to store items under.

Currently it is using First and Last name to create a user, but in reality it would utilize a username/email and a password which would be stored on a database.

To-DO items are color coded, where completed items are green, overdue items are red, upcoming items that are due within 5 days are orange, and items that are due in over 5 days are white.

The services are contained in the services folder, the models in the models folder, and the components in the components folder. 

If given more time, I would spend more time on the styling of the project but the functionality was prioritized due to the time constraints.
