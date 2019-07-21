import { Obj } from "jstoolbox";

class Seeder {
  constructor(collection, options) {
    if (Obj.isFalsy(collection) || !isMongoDBCollection(collection)) {
      throw new Error(
        "Please supply a valid MongoDB collection instance to seed."
      );
    }

    if (!Obj.isPlainObject(options)) {
      throw new Error("Please supply options for seeding.");
    }

    if (!Obj.isArray(options.environments)) {
      throw new Error(
        "You must pass an array of environments where seeding is allowed."
      );
    }

    if (Obj.isFalsy(options.data)) {
      throw new Error("You must pass an array of data to seed.");
    }

    if (!isEnvironmentAllowed(options.environments)) {
      console.warn("Seeding is not allowed in this environment");
      return false;
    }

    this.count = 0;
    this.collection = collection;

    this.options = {
      enableLogging: false,
      resetCollection: false,
      seedIfExistingData: false,
      ...options
    };

    if (Meteor.isServer) {
      if (this.options.resetCollection) {
        this.collection.remove({});
      }

      if (this.options.enableLogging) {
        console.log("Starting seeding...");
      }

      this.seedCollection();

      if (this.options.enableLogging) {
        console.log("Seeding completed!");
      }
    } else {
      throw new Error(
        "Seeder is only intended to be run in a Meteor server environment."
      );
    }
  }

  seedCollection() {
    if (!this.options.seedIfExistingData && this.collectionHasExistingData()) {
      if (this.options.enableLogging) {
        console.log(
          `Seeding aborted: ${this.collection._name} has existing data.`
        );
      }

      return;
    }

    if (!this.options.data) {
      return;
    }

    for (let item of this.options.data) {
      if (Obj.isEqual(this.collection._name, "users")) {
        this.createUser(item);
        this.count++;
      } else {
        if (this.options.enableLogging) {
          console.log(`Inserting item ${this.count}...`);
        }

        this.collection.insert(item);

        if (this.options.enableLogging) {
          console.log(`Item ${this.count} has been inserted.`);
        }

        this.count++;
      }
    }
  }

  collectionHasExistingData(modelCount = 0) {
    return this.collection.find().count() > modelCount;
  }

  createUser(user) {
    // NOTE: Check if email address or username (if applicable) passed already exists in Meteor.users.
    const isExistingUserConditions = [{ "emails.address": user.email }];
    if (user.username) {
      isExistingUserConditions.push({ username: user.username });
    }

    const isExistingUser = this.collection.findOne({
      $or: isExistingUserConditions
    });

    if (Obj.isTruthy(isExistingUser)) {
      if (this.options.enableLogging)
        console.log(
          `User creation aborted: ${user.email} [item ${
            this.count
          }] already exists.`
        );

      return;
    }

    if (this.options.enableLogging) {
      console.log(`Creating [item ${this.count}] user ${user.email}... `);
    }

    Accounts.createUser(user);

    if (this.options.enableLogging) {
      console.log(`User ${user.email} [item ${this.count}] has been created.`);
    }
  }
}

function isMongoDBCollection(collection) {
  return (
    Obj.isTruthy(collection) &&
    Obj.isTruthy(collection._driver) &&
    Obj.isTruthy(collection._driver.mongo)
  );
}

function isEnvironmentAllowed(environments) {
  return environments.indexOf(process.env.NODE_ENV) > -1;
}

export default (collection, options) => {
  return new Seeder(collection, options);
};
