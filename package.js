Package.describe(
{
    name: "m4dnation:meteor-seeder",
    version: "1.0.0",
    summary: "Database seeder for Meteor.",
    git: "https://github.com/M4dNation/meteor-seeder",
    documentation: "README.md"
});

Npm.depends(
{
    "jstoolbox": "1.0.2"
});

Package.onUse(function(api) 
{
    api.versionsFrom("1.8");
    api.use("ecmascript");
    api.mainModule("src/meteor-seeder.js");
});

Package.onTest(function(api) 
{
    api.use("ecmascript");
    api.use("meteor-seeder");
    api.mainModule("test/meteor-seeder.test.js");
});