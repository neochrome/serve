# Serve
A simple HTTP server that runs from the current directory.

## Installation

```
$ npm install --global neochrome/serve
```

## Usage
Serving files from the current directory on port 8080 (default):

```
$ serve
```

The serving port may be specified either as an argument or an environment
variable:

```
$ serve 1234
$ PORT=1234 serve
```

### Restricting access to certain files
By adding shell patterns to a file called `.serveignore` in the directory `serve`
is executed from, one may restrict acces to files matching any of those patterns.

```
cache.manifest
*.sensitive.info
**/*.html
```
