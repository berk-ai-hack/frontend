# API Configuration

This frontend application uses environment variables to configure the API endpoint URL.

## Environment Variables

### `VITE_API_BASE_URL`

- **Description**: The base URL for the backend API
- **Default**: `http://localhost:5000` (for development)
- **Example**: `https://your-api-domain.com`

## Setup Instructions

### 1. Development (Local)

For local development, the API will default to `http://localhost:5000` if no environment variable is set.

### 2. Production Deployment

For production deployment, set the `VITE_API_BASE_URL` environment variable to your production API URL.

#### Example for different platforms:

**Vercel:**

```bash
VITE_API_BASE_URL=https://your-api.vercel.app
```

**Netlify:**

```bash
VITE_API_BASE_URL=https://your-api.netlify.app
```

**Railway:**

```bash
VITE_API_BASE_URL=https://your-api.railway.app
```

**Heroku:**

```bash
VITE_API_BASE_URL=https://your-api.herokuapp.com
```

### 3. Local Environment File (Optional)

You can create a `.env` file in the frontend directory for local development:

```bash
# .env
VITE_API_BASE_URL=http://localhost:5000
```

**Note**: The `.env` file should be added to `.gitignore` to avoid committing sensitive information.

## API Endpoints

The following endpoints are automatically configured based on the `VITE_API_BASE_URL`:

- `POST /api/prompt_initial` - Initial AI grading
- `POST /api/prompt_redo` - AI feedback modification

## Code Usage

The API configuration is imported and used in the application:

```typescript
import { API_ENDPOINTS } from "@/config/api";

// Use the configured endpoints
const response = await fetch(API_ENDPOINTS.PROMPT_INITIAL, {
  method: "POST",
  body: formData,
});
```

## Troubleshooting

1. **CORS Issues**: Ensure your backend API allows requests from your frontend domain
2. **Environment Variable Not Working**: Make sure the variable name starts with `VITE_` for Vite to expose it to the client
3. **Default Fallback**: If no environment variable is set, the app will use `http://localhost:5000`
