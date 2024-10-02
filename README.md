# UPS Tracker

UPSTracker is a Node.js service that fetches real-time order status from UPS using tracking numbers. It handles cookie management and API requests to UPS’s platform, providing detailed tracking information for your shipments.

## Requirements

- Node.js v20.17.0 or higher

## Installation

1. Clone the repository:

```bash
git clone https://github.com/daferferso/ups_tracker.git
cd ups_tracker
```

2. Install dependencies:

```bash
npm install
```

## Usage

1. Start the server:

```bash
npm run dev
```

2. Access the API documentation at:

```bash
http://localhost:3000/api-docs
```

3. To retrieve the status of a package, send a GET request to:

```bash
http://localhost:3000/{trackingNumber}
```

### Example Request

```bash
curl -X GET http://localhost:3000/1Z3TWW700308932865
```

### Response

- 200 OK: Package status retrieved successfully.
- 400 Bad Request: Invalid tracking number.
- 500 Internal Server Error: Error retrieving the package status.

## License

This project is licensed under the MIT License.
