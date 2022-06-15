# Nimbus Backend TypeScript CLI
This is the CLI for [Nimbus Backend TypeScript](https://github.com/ZupIT/nimbus-backend-ts), where you can quickly create a new project and generate screens.

## Setting Up a Project
Install the Nimbus Backend TypeScript CLI globally:
```
npm install -g @zup-it/nimbus-backend-typescript-cli
```

Create a new project:
```
nimbus-ts new [PROJECT NAME]
```

Run the application:
```
cd [PROJECT NAME]
npm run start
```

## Generating a Screen
Go to the project root and run:
```
nimbus-ts generate-screen [SCREEN NAME]
```

The new screen will be generated inside the folder: `src/screens`, or inside the folder defined on the attribute `screensFolderPath` in the configuration file `./nimbus-ts.json`.

For the full documentation of Nimbus Backend TypeScript CLI, please go to the [Official Page](https://github.com/ZupIT/nimbus-backend-ts/wiki/CLI).
