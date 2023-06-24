# progimage-api

## Overview

ProgImage API is a specialised image storage and processing engine to be used by other applications, and will provide high-performance programmatic access via its API.

## Implemented Features

- Upload image
- Download a stored image
- Image file type conversion
- Thumbnail creation by adjusting image width and height
- Image rotation

## API Routes

### Add Image

Method: POST

Endpoint: `baseUrl`/images

Body: Multipart Form (name = upload, file = \<image.jpeg\>)

### Get Image

Method GET

Endpoint: `baseUrl`/images/:id

Example usage with query params: `baseUrl/images/:id?filetype=gif&width=400&height=200&angle=90`

## How to run

Run locally using Node.js and NPM:

`npm install`

`npm start`

baseUrl: http://localhost:8080

Run using Docker:

`./build.sh`

`./run.sh`

baseUrl: http://localhost:49160
