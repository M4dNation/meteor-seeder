# meteor-seeder

## About

`meteor-seeder` is a simple database seeder for [Meteor](https://www.meteor.com).
It uses a simple exported constructor in order to provide simple seeding to a MongoDB instance.

**Note: This package is based on [seeder](https://cleverbeagle.com/packages/seeder/v2) written by [cleverbeagle](https://github.com/cleverbeagle). Most of the credits goes to them.  
If you don't need our trimmed version of the package, please use the original one.**

## Usage

`meteor-seeder` exports a factory of the `Seeder` class you can import:

```javascript
// ES6
import Seeder from 'meteor/m4dnation:meteor-seeder';

// ES5
const Seeder = require('meteor/m4dnation:meteor-seeder');
```

Once imported, you just have to call the factory in order to seed your data to the database:

```javascript
// In order to differentiate your Seeder factories, we advise you to name them as the data being seeded

import DataSeeder from 'meteor/m4dnation:meteor-seeder';

// Displayed value are default values
DataSeeder(data_collection, {
    environments: [], // The environment where the seeder should run (based on NODE_ENV)
    data: [], // The data you wanna seed as an array of object
    resetCollection: false, // Whether or not the seeder should reset the collection before seeding
    seedIfExistingData: false, // Whether or not the seeder should run when there is existing data
    enableLogging: false // Whether or not the logging should be enabled for this seeder
});

```

In order to generate your data, you can check out our npm package [data-manufactory](https://github.com/M4dNation/data-manufactory).

## Authors

`meteor-seeder` is maintained by M4dNation Company.
First version written by [axelvaindal](https://github.com/axelvaindal).

## Contributors

There is actually no other contributors for this project.
If you want to contribute, feel free to make any suggestions or to contact us.

### Contributing to the package

We try to keep `meteor-seeder` as simple as possible, this is why we decided to clone the package created by [cleverbeagle](https://github.com/cleverbeable).  
Before proposing a PR or opening an issue, please keep in mind :

    - This package is meant to be as simple as possible
    - This package tries to respect the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
    - This package tries to use the minimum of dependencies possible

Taking into account the previous points leads us to **NOT** merge proposed pull-request if those :

    - Integrate changes that are too far from the initial purpose of the package
    - Integrate changes that are adding additional dependencies
    - Integrate changes that are not unit tested and motivationated

This being said, we **really** welcome pull-request and bug report, so feel free to start a contribution.

## Licence

`meteor-seeder` is available under the terms of the MIT LICENSE.  
Check the licence file for more information.