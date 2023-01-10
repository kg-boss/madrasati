# Docs / Announcement / Index

### Usage

Announcements list are retrieved with a `GET` request through the following link

```url
api/announcements
```

> NOTE: the announcements are limited by default to retrieve the last 30. To change the limit you can add a param `limit` to the url.

---

### Structure

```JSON
[
    {
        "id": 0,
        "title": "TITLE_HERE",
        "body" : "BODY_HERE",
        "date": "DATE_ISO8601_HERE",
        "target": "TARGET_HERE",
        "files": [
           {
                "filename": "FILE_NAME_HERE",
                "mime": "MIME_TYPE_HERE",
                "lastmodified": "YYYY-MM-DDTHH:mm:ss",
                "content": "CONTENT_BASE_64_HERE",
                "link": "LINK_HERE"
           }
        ],
        "author": {
            "id": 0,
            "name": "AUTHOR_NAME",
            "role": "ROLE_HERE",
            "photo": "IMAGE_LINK"
        },

        "comments": [
           {
                "id": 0,
                "author": {
                    // SAME AS ANNOUNCE AUTHOR
                },
                "body" : "BODY_HERE",
                "date": "DATE_ISO8601_HERE",
                "responses": [
                    // NESTED COMMENTS HERE
                ]
           }
        ]
    }
]
```
---
### Attributes

The JSON response is defined as follow

| Name | Type | Description |
| ------ | ---- | ----------- |
| **id**| `number` | the ID of the announcement. |
| **title**| `string` | the title of the announcement. |
| **body** | `string` | the content of the announcement (can be HTML) |
| **date** | `datetime` | when was the announcement published in `ISO8601` format |
| **target** | `string` | the target audience of the announcement |
| **files** | `array` | the attached files if exists |
| **author** | `object` | the author of the announcement |
---
#### Author Attributes

| Name | Type | Description |
| ------ | ---- | ----------- |
| **id**| `number` | the ID of the author (USER ID). |
| **name**| `string` | the name of the author. |
| **role** | `enum` | the role of the author. |
| **photo** | `url` | the link to the author's profile picture. |
---
#### Files Item Attributes

| Name | Type | Description |
| ------ | ---- | ----------- |
| **filename**| `string` | the name of the file. |
| **mime** | `MIME` | the MIME of the file. |
| **lastmodified** | `datetime` | the file's last modified date in `Unix Timestamp` format |
| **content** | `base64` | the file content encoded in base64. |
| **link** | `url` | the file actual url to download. |
---
#### Comment Attributes

| Name | Type | Description |
| ------ | ---- | ----------- |
| **id**| `number` | the ID of the comment. |
| **author** | `object` | the author of the announcement |
| **body** | `string` | the content of the announcement (can be HTML) |
| **date** | `datetime` | when was the announcement published in `ISO8601` format |
| **responses** | `array` | the list of response comments |
