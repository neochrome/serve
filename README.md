Installation
------------

    npm install . -g

Usage
-----

    serve

This will start serving the contents of the current directory on port 8080 by default.

Config file
-----------
Put a file named .serve.json in the root directory you wnat to serve from.
Example .serve.json

    {
      "restrictedFiles": [
        "cache.manifest",
        "sensitive.info"
      ],
      "port": 8080    
    }

