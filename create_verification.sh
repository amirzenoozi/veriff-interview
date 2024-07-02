#!/bin/bash

curl --location 'http://localhost:3200/verification' \
--header 'Content-Type: application/json' \
--data '{
    "questions": [
        {
            "id": "aaa",
            "priority": 10,
            "description": "Face on the picture matches face on the document"
        },
        {
            "id": "bbb",
            "priority": 5,
            "description": "Veriff supports presented document"
        },
        {
            "id": "ccc",
            "priority": 7,
            "description": "Face is clearly visible"
        },
        {
            "id": "ddd",
            "priority": 3,
            "description": "Document data is clearly visible"
        }
    ]
}'
