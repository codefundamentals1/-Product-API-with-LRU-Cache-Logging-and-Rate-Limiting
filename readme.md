# Product API with LRU Cache, Logging, and Rate Limiting

## Overview

This is an **Express.js** API server that demonstrates the implementation of:

* **LRU Cache**: Fast in-memory caching for product data to reduce database access.
* **Request Logging Middleware**: Logs request metadata such as timestamp, method, URL, headers, body, and IP.
* **Rate Limiting**: Protects endpoints from abuse by limiting the number of requests per client in a given time window.

The project is designed for **performance optimization** and can be extended with **Redis** for distributed caching.

---

## Tech Stack

* **Node.js & Express.js** – Backend server
* **JavaScript** – Language
* **In-Memory Array** – Simulated database (`DbArray`)
* **Custom LRU Cache** – In-memory cache implementation
* **Middlewares** – Logging & Rate Limiting
* (Optional) **Redis** – Can be integrated for distributed caching

---

## Features

1. **LRU Cache**

   * Stores frequently accessed products in memory.
   * Fixed cache size (3 items) with **Least Recently Used** eviction.
   * Improves API response time for repeated requests.

2. **Request Logging**

   * Logs metadata of every request:

     * Timestamp
     * HTTP method & URL
     * Headers
     * Body
     * IP address
   * Can be stored in a file or database for analytics.

3. **Rate Limiting**

   * Limits API requests per client IP.
   * Protects against abuse and ensures fair usage.
   * Configurable limit and time window.

---

## Project Structure

```
project-root/
│
├── Db/
│   └── DbArray.js         # Simulated database array
│
├── cache/
│   └── LruCache.js        # Custom LRU cache implementation
│
├── middlewares/
│   ├── log.middleware.js   # Logging middleware
│   └── rateLimiter.js        # Rate limiting middleware
│
├── index.js               # Main server entry
└── package.json
```

---

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd <project-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node index.js
```

Server runs on `http://localhost:3000`.

---

## API Endpoints

### 1. **GET /**

* **Description:** Check if server is running.
* **Response:**

```json
{
  "msg": "server is up"
}
```

### 2. **POST /getproduct**

* **Description:** Get product by ID.
* **Request Body:**

```json
{
  "id": 1
}
```

* **Responses:**

  * **From Cache (Hit):**

```json
{
  "msg": "found in cache",
  "data": { "id": 1, "name": "Product Name" }
}
```

* **From Database (Miss):**

```json
{
  "msg": "fetched from DB",
  "data": { "id": 1, "name": "Product Name" }
}
```

* **Rate Limited (Too Many Requests):**

```json
{
  "error": "Too many requests. Try again later."
}
```

---

## How It Works

1. **Request comes in → Logging middleware** logs metadata.
2. **Rate limiter** checks if client exceeded request limit.
3. **LRU Cache** checks if the requested product exists in memory.

   * If yes → return cached product.
   * If no → fetch from `DbArray`, store in cache, return response.
4. Cache follows **LRU eviction policy** when full (removes least recently used item).

---

## Future Enhancements

* Replace in-memory cache with **Redis** for distributed caching.
* Store logs in **MongoDB** or **ElasticSearch** for analytics.
* Add **JWT authentication** and user-specific rate limits.
* Implement **sliding window rate limiting** for smoother traffic control.

---

## Author

**Anish RAJA**
Full-stack developer with experience in Node.js, Express, caching, and performance optimization.

---

## License

This project is licensed under the MIT License.
