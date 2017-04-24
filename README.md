# neo4Story [![Build Status](https://travis-ci.org/EmpireFallsTechnologies/neo4Story.svg?branch=master)](https://travis-ci.org/EmpireFallsTechnologies/neo4Story)

### *Take data, put it in Neo4J, tell your story.*

### What is neo4Story?

**neo4Story** *is js-based web-app for interacting with neo4j database*.

Have you heard about [Neo4J graph database](https://neo4j.com)?

While neo4j offers you a storage level, data still have to be analyzed and visualized.
While [sigmaJs](https://github.com/jacomyal/sigma.js) and [Gephi](https://gephi.org/),
are the great tools for analysis and visualisation, they are not capable for storytelling.
Every research or investigation which have to be told meets same problems - coding server-side
and client-side, and every time code is very similar to previous.

**neo4Story** is our try to stop this terrible tradition and make some fancy app for it.

**neo4Story** is taking data from neo4j instance and giving it back to you, the people.

All you need to start is some graph data (neo4j-dump, graphml, csv, etc.) and neo4j instance.

**neo4Story** just needs a configuration file!

**neo4Story** is a nodeJS server app that starts via command-line (later the desktop app will be released).

**neo4Story** is in alpha stage for now, it means there are many bugs and many fields to grow,
 so we beg for a feedback.
   
**Note:** neo4Story uses only MATCH and CREATE queries (stay calm, **your data will be safe**),
but **use this app in public or enterprise enviroment is ON YOUR OWN RISK**, it is still raw for these purposes.

#### Installation

1. Install [nodeJS](https://nodejs.org/en/)
2. [Set up configuration](CONFIG.md) for your data or use [samples](samples/README.md)

#### Samples

[In special section](samples/README.md)

#### Preparing of Neo4J

[In special section](DOCS/NEO4J.md)

#### Run

```
node neo4Story.js
```

**Note:** only master branch contains artifact of build (dist/build.js)!

#### How to customize neo4Story for your data?

The only step of this process is described in
 [Setting Up Configuration Section](DOCS/CONFIG.md)


#### How to develop (or contribute) neo4Story?

Always welcome! [Read this section to begin!](DOCS/DEVELOP.md)



