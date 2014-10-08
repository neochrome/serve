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

Additional options:

```
    -h, --help               output usage information
    -V, --version            output the version number
    -l, --listen [PORT]      Listen on PORT, defaults to [8080].
    -p, --proxy [PATH|DEST]  Proxy requests matching PATH to DEST. Multiple proxies supported.
```

Example with proxy:

```
$ serve -p '/api|http://localhost:9999/api'
```

### Restricting access to certain files
By adding shell patterns to a file called `.serveignore` in the directory `serve`
is executed from, one may restrict acces to files matching any of those patterns.

```
cache.manifest
*.sensitive.info
**/*.html
```
