# neo4Story

### *Let your neo4j graph data sing in this web-app!*

**Build status:**

*master*:  [![Build Status](https://travis-ci.org/EmpireFallsTechnologies/neo4Story.svg?branch=master)](https://travis-ci.org/EmpireFallsTechnologies/neo4Story)
*develop*: [![Build Status](https://travis-ci.org/EmpireFallsTechnologies/neo4Story.svg?branch=master)](https://travis-ci.org/EmpireFallsTechnologies/neo4Story)

### What is neo4Story?

**neo4Story** is js-based web-app for browsing and editing neo4j data.

Watch demo! (todo demo)

What do you know about amazing [Neo4j graph database](https://neo4j.com)?

We often tell graph stories using awesome tools such as the [sigmaJs](https://github.com/jacomyal/sigma.js) 
and [Gephi](https://gephi.org/). 
But they provide only the tools of analysis and visualization, while in long connected investigations
 the *data layer is no less important*! 
We (as well as thousands of people) find Neo4J is excellent database to store our investigations graph data. 

So, when we want to do investigation and tell another graph story, we always meeting the same problems - how to write cool server-side
 and how to write cool client-side. And every time our web-app code is very similar to previous.
 
**neo4Story** is our try to stop this terrible tradition and make some boilerplate for it!

So, if you have graph data (in neo4j, graphml, csv, no matters...), it's simple to load your data to neo4j.

**neo4Story** just needs a configuration setup to start and sing your data!

#### How to prepare machine to neo4Story?

1. Install [nodeJS](https://nodejs.org/en/)
2. [Set up configuration](CONFIG.md) for your data or use [samples](samples/README.md)

#### Samples

[In special section](samples/README.md)

#### How to run neo4Story?

```
# only master branch contains builded artifact (dist/build.js)
git checkout master
node devServer.js
```

#### How to customize neo4Story for your data?

todo

#### How to develop neo4Story?

[Read in this section](DEVELOP.md)

#### How to contribute?

todo


