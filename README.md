# Instructions

## Instructions to Set Up and Run the Currency Conversion Application

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 14.x or higher)
- **npm** (Node package manager, comes with Node.js)
- **Docker** (with Docker Compose)
- **Git** (optional, for cloning the repository)

### Step 1: Get API Token

1. Go to https://apyhub.com/utility/currency-conversion-multiple?ref=public_apis 
2. Sign Up and Create an API Token.
3. Save Token as it will be needed later.

### Step 2: Create a `.env` File

1. In the root directory of your project, create a file named `.env`.
2. Open the `.env` file in a text editor and add the following lines:
    
    ```
    PORT=3000
    APYHUB_URL=https://api.apyhub.com/data/convert/currency/multiple
    ```
    

 The `dotenv` package will read this file and make the variables available in your application.

### Step 3: Clone the Repository

1. Go to the GitHub repository .
2. Click the green **Code** button.
3. Copy the URL from the dropdown. You can choose between HTTPS or SSH. For HTTPS, it will look like this:`https://github.com/username/repository.git`For SSH, it will look like this:`git@github.com:username/repository.git`

Run the following command in your terminal, replacing `REPOSITORY_URL` with the URL you copied:

```bash
git clone REPOSITORY_URL
```

### Step 4: Install Dependencies

Navigate to the application directory you just cloned ensure it is the root repository:

```bash
cd REPOSITORY_NAME_HERE
```

Then install the required dependencies using the terminal:

```bash
npm install
```

This command will read the `package.json` file in the cloned repository and install all necessary packages, including `express`, `dotenv`, `jest`, and `express-rate-limit`.

### Step 5: Run the Application Locally

To start the application, use the following command:

```bash
nodemon app.js
```

This command will run the application, and you should see an output similar to:

```bash
Server Running on Port 3000
```

### Step 6: Test the API

Once the application is running, you can test the currency conversion API using a tool like Postman, cURL, or any other HTTP client.

### Example API Request

To get conversion rates from USD to EUR and GBP using an API token, you would make a POST request like this:

```
POST http://localhost:3000/restapi/convert/USD/EUR,GBP/YOUR_API_TOKEN_HERE
```

### Example cURL Command

You can use the following `cURL` command in your terminal:

```bash
curl --request POST \
  --url http://localhost:3000/restapi/convert/USD/EUR,GBP/YOUR_API_TOKEN_HERE \
 
```

### Step 7: Dockerizing the Application

To run the application in a Docker container, follow these steps:

Build the Docker file:

```bash
 docker build -t NAME_OF_APP_HERE .                            
```

Build the docker-compose:

```bash
docker-compose build   
```

Startup The Docker Container:

```bash
docker-compose up 
```

You should see output indicating that the application is running. You can access it using Postman or cURL as done in Step 4.

### Step 8: Stop the Docker Container

To stop the Docker container, press `Ctrl + C` in the terminal where the command is running, or use the following command in a separate terminal window:

```bash
docker-compose down
```

### Additional Notes

- Ensure that the API token you use is valid and has the necessary permissions to access the currency conversion service.
- The application can be customized further by modifying the controller, routes, and middleware as needed.
- When running in Docker, you can still use Postman or cURL to test the API just like you would in the local setup.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Currency Convert Rate API

## Description

This is an API to convert currency

## Base URL

The base URL for all API requests is:

`http://localhost:3000`

## Endpoints

### `POST /restapi/convert/{fromCurrency}/{toCurrency}/{apyToken}`

Returns a list of the Conversions rates.

### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `fromCurrency` | `string` | Yes | The base currency code for conversion (e.g., `USD`, `EUR`, `JPY`). |
| `toCurrency` | `string` | Yes | Comma-separated list of target currency codes (e.g., `EUR,GBP,AUD`). |
| `apyToken` | `string` | Yes | The API token for authentication, used to authorize the request. Go to https://apyhub.com/utility/currency-conversion-multiple?ref=public_apis Sign Up and Create an API Token. |

### Response

Returns a JSON object with the following properties:

- `rates`: The conversion rates retrieved.
- `cached`: true if the response came from the cache, false if response didn’t come from cache.

### Example

Request:

```
POST http://localhost:3000/restapi/convert/USD/EUR,GBP/YOUR_API_TOKEN_HERE
```

Response:

```json
{
  "rates": {
    "EUR": 0.85,
    "GBP": 0.76
  },
  "cached": false
}
```

## Errors

This API uses the following error codes:

- `400 Bad Request`: The request was malformed or missing required parameters.
    - **Example**:`{"error": "Parameters 'fromCurrency', 'toCurrency', and 'apyToken' are required."}`
- `401 Unauthorized`: The API key provided was invalid or missing.
    - **Example**: `{"error": "API token is missing or invalid."}`
- `404 Not Found`: The requested resource was not found.
    - **Example**: `{"error": "The requested route does not exist."}`
- `500 Internal Server Error`: An unexpected error occurred on the server.
    - **Example**: `{"error": "Error processing exchange rates"}`
