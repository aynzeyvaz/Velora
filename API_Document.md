# Velora API Documentation
Base URL:

`https://velora-1-cbh9.onrender.com/`

## Home

### Hero Section
**Endpoint:**

`GET /api/home/hero/`

**Usage:**

- Used for displaying Home Hero Section images.

**Response:**

```json
[
    {
        "images": "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1784568070/hero1_zsdnso.jpg",
        "title": "دنیا را ورق بزن، داستان خودت را بنویس",
        "subtitle": "هر مقصد یک قصه دارد؛ سفر بعدی‌ات را شروع کن و خاطره‌ای تازه بساز.\""
    },
    {
        "images": "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1784567967/hero2_mshk6x.jpg",
        "title": "جایی در دنیا منتظر توست",
        "subtitle": "مقصد رویایی‌ات را پیدا کن و لحظه‌هایی بساز که همیشه به یاد بمانند."
    },
]
```
---
### Special Tour
**Endpoint:**

`GET /api/tours/special/`

**Usage:**

- Used for displaying Special Tours

**Response:**

```json
[
    {
        "id": 5,
        "cover": "https://example.com/image.jpg", 
        "country": "فرانسه",
        "city": "پاریس",
        "startDate": "2026-09-14",
        "duration": 7,
        "badge": "محبوب",
        "price": 100,
        "remaining_capacity": 14,
    },
    ...
]
```

---
### Destinations List
**Endpoint:**

`GET /api/destinations/`

**Usage:**

- Used for displaying all destinations

**Response:**

```json
[
    {
        "id": 1,
        "title": "داخلی",
        "image": "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1784569831/category2_nadpda.jpg",
        "options": [
            "اصفهان",
            "چابهار",
            "شیراز",
            "قشم",
            "کیش",
        ]
    },
    {
        "id": 2,
        "title": "خارجی",
        "image": "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1784569755/category1_i7ifg4.jpg",
        "options": [
            "آلمان",
            "اسپانیا",
            "امارات",
            "اندونزی",
        ]
    },
    {
        "id": 3,
        "title": "یک روزه",
        "image": "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1784569768/category3_pkes7o.jpg",
        "options": [
            "آبشار لاتون",
            "قلعه بابک",
            "کندوان",
        ]
    },
    {
        "id": 4,
        "title": "ناشناس",
        "image": "https://res.cloudinary.com/dkfvrqgkh/image/upload/v1784569759/category4_iufolb.jpg",
        "options": [
            "جزایر ناشناخته",
            "جنگل های شمال",
        ]
    }
]
```

---
### Popular Destinations List
**Endpoint:**

`GET /api/tours/popular/`

**Usage:**

- Used for displaying popular destinations

**Response:**

```json
[
    {
        "city": "پاریس",
        "images": "https://example.com/image.jpg",
        "tour_count": 2
    },
    ...
]
```
---
### Tour List
**Endpoint:**

`GET /api/tours/`

**Usage:**

- Used for displaying tours based on a selected destination
- Returns all active tours related to the given destination


**Parameters:**
- `destination` (required)
    

**Response:**

```json
[
    {
        "id": 4,
        "cover": "https://example.com/image.jpg",
        "country": "ترکیه",
        "city": "استانبول",
        "startDate": "2026-07-07",
        "duration": 5,
        "badge": "ویژه",
        "price": 55000000,
        "remaining_capacity": 18
    },
    ...
]
```
---
---
### Search Hero Section
**Endpoint:**

`GET /api/search/hero/`

**Usage:**

- Used for displaying Hero section images based on a selected destination
- Returns destination & Hero section images related to the given destination


**Parameters:**
- `destination` (required)
    

**Response:**

```json
{
    "destination": "ترکیه",
    "heroImages": [
        "https://example.com/image.jpg",
        "https://example.com/image.jpg",
        "https://example.com/image.jpg",
        ...

    ]
}
```
---
### Search Tours
**Endpoint:**

`GET /api/search/result/`

**Usage:**

- Used to display tours filtered by origin, destination, and travel month
- It also allows sorting them by:
    - cheapest tour
    - most expensive tour
    - nearest departure date
    - longest duration
    - shortest duration



**Parameters:**
- `origin`
- `destination`
- `month`
- `sort` (optional)
    

**Response:**

```json
{
    "count": 4,
    "result": [
        {
            "id": 4,
            "cover": "https://example.com/image.jpg",
            "country": "ترکیه",
            "city": "استانبول",
            "startDate": "2026-07-07",
            "duration": 5,
            "badge": "ویژه",
            "price": 55000000,
            "remaining_capacity": 18
        },
        ...
    ]
}
```
---
### Tour Detail
**Endpoint:**

`GET /api/tours/{id}/`

**Path Parameters:**
- `id`

**Example:**

`GET /api/tours/5/`

**Usage:**

- Used to display the complete details of a selected tour
- Requires a tour ID to retrieve the details of that tour.


**Response:**

```json
[
    {
        ...
    }
]
```














