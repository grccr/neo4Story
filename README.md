# neo4Story [![Build Status](https://travis-ci.org/EmpireFallsTechnologies/neo4Story.svg?branch=master)](https://travis-ci.org/EmpireFallsTechnologies/neo4Story)

### *Let your neo4j graph data sing in this web-app!*

### What is neo4Story?

**neo4Story** *is js-based web-app for browsing and editing neo4j data*.

What do you know about amazing [Neo4J graph database](https://neo4j.com)?

We often tell graph stories using awesome tools such as the [sigmaJs](https://github.com/jacomyal/sigma.js) 
and [Gephi](https://gephi.org/). 
But they provide only the tools of analysis and visualization, while in some long connected investigations
 *the data layer is no less important*! 
We (as well as thousands of people) find Neo4J is excellent database to store our investigations graph data. 

So, when we want to do investigation and tell another graph story, we always meeting the same problems - how to write cool server-side
 and how to write cool client-side. And every time our web-app code is very similar to previous.
 
**neo4Story** is our try to stop this terrible tradition and make some easy-customizable app for it!

So, if you have graph data (in neo4j-dump, graphml, csv, no matters...), it's simple to load your data to Neo4J.

**neo4Story** just needs a configuration setup to start and sing your data!

**neo4Story** can be launched as nodeJS server via command-line (late it will be possible with desktop launcher).

#### How to prepare machine to neo4Story?

1. Install [nodeJS](https://nodejs.org/en/)
2. [Set up configuration](CONFIG.md) for your data or use [samples](samples/README.md)

#### Samples

[In special section](samples/README.md)

#### Preparing of Neo4J

[In special section](DOCS/NEO4J.md)

#### How to run neo4Story?

```
node devServer.js
```

**Note:** only master branch contains artifact of build (dist/build.js)!

#### How to customize neo4Story for your data?

The only step of this process is described in
 [Setting Up Configuration Section](DOCS/CONFIG.md)


#### How to develop (or contribute) neo4Story?

Always welcome! [Read this section to begin!](DOCS/DEVELOP.md)



