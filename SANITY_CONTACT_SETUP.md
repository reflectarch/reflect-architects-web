# Sanity Contact Form Setup Guide

## Overview
Your contact page is now connected to Sanity CMS! Contact messages from your website will be automatically stored in Sanity for easy management and response tracking.

## ✅ What's Already Done

1. **Frontend Form**: The contact form at `/contact` is fully functional
2. **API Route**: Created `/api/contact` to handle form submissions
3. **TypeScript Types**: Added `SanityContactRequest` interface in `src/lib/sanity.ts`
4. **Form Validation**: Client-side and server-side validation for required fields
5. **User Feedback**: Success and error messages for form submissions

## 🚀 Next Steps

### 1. Add Contact Request Schema to Sanity Studio

You need to add the contact request document type to your Sanity Studio configuration:

1. **Copy the schema**: Use the `sanity-schema-contact-request.js` file created in this project
2. **Add to your Sanity Studio**: 
   - If you have a separate Sanity Studio project, copy the schema to your `schemas` folder
   - Add it to your `sanity.config.js` or `sanity.config.ts` file:

```javascript
import {defineConfig} from 'sanity'
import contactRequest from './schemas/contact-request' // Your contact request schema
import consultationRequest from './schemas/consultation-request' // Your consultation request schema
import project from './schemas/project' // Your existing project schema

export default defineConfig({
  // ... your config
  schema: {
    types: [
      project,           // existing
      consultationRequest, // consultation requests
      contactRequest,    // new contact request schema
    ],
  },
})
```

### 2. Deploy Schema Changes

After adding the schema:
1. Deploy your Sanity Studio
2. The "Contact Request" document type will appear in your Studio interface

### 3. Manage Contact Messages

In Sanity Studio, you can now:
1. View all contact messages in a dedicated section
2. Update message status (New → Read → In Progress → Replied → Resolved)
3. Access sender information and message details
4. Sort by submission date or status
5. Archive old messages

## 📝 Contact Request Schema Features

The contact request schema includes:

- **Contact Information**: Name and email address
- **Message Details**: Subject line and message content
- **Status Management**: Workflow states from new to resolved
- **Automatic Timestamps**: Submission date tracking
- **Smart Preview**: Shows sender name and email in the studio list

## 🔧 Technical Details

### API Endpoint
- **URL**: `/api/contact`
- **Method**: POST
- **Required Fields**: name, email, message
- **Optional Fields**: subject

### Form Validation
- Client-side validation for required fields
- Server-side validation with proper error responses
- Email format validation
- Real-time form state management

### Environment Variables
Make sure these are set in your `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=pg7qj6xh
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_write_token_here
```

## 🎨 Customization Options

### Adding More Status Options
Edit the schema file to add more status options:

```javascript
{
  name: 'status',
  title: 'Status',
  type: 'string',
  options: {
    list: [
      {title: 'Your New Status', value: 'your-new-status'},
      // ... existing statuses
    ]
  }
}
```

### Extending the Form
To add more fields:
1. Update the schema in `sanity-schema-contact-request.js`
2. Add the field to the form in `src/app/contact/page.tsx`
3. Update the API route in `src/app/api/contact/route.ts`
4. Update the TypeScript interface in `src/lib/sanity.ts`

### Email Notifications (Optional)
You could extend the API route to send email notifications:
```javascript
// In src/app/api/contact/route.ts
// After creating the document, send notification email
await sendNotificationEmail(contactRequest);
```

## 🔧 Workflow Management

### Status Workflow
1. **New**: Initial message submission
2. **Read**: Message has been viewed by team
3. **In Progress**: Team is working on response
4. **Replied**: Response has been sent to sender
5. **Resolved**: Issue/inquiry has been resolved
6. **Archived**: Message archived for historical purposes

### Studio Organization
- Messages are ordered by submission date (newest first)
- Preview shows sender name and email for easy identification
- Status field allows quick filtering and organization
- Subject line displayed for quick context

## 🐛 Troubleshooting

**Form not submitting?**
1. Check browser console for JavaScript errors
2. Verify API route is accessible at `/api/contact`
3. Check that all required fields are filled

**"Insufficient permissions" error?**
1. Make sure you've created a Sanity API token with write permissions
2. Verify the token is added to `.env.local` as `SANITY_API_TOKEN`
3. Ensure the token has **Editor** or **Contributor** permissions
4. Restart your development server after adding the token

**Data not appearing in Sanity?**
1. Verify the contact request schema is deployed to Sanity Studio
2. Check that the document type name matches exactly: `contactRequest`
3. Review server logs for API errors
4. Check that your API token has the correct permissions

**Schema errors?**
1. Make sure the schema exactly matches the provided version
2. Restart your Sanity Studio after schema changes
3. Verify the schema is included in your config file

## 📞 Support

The contact form system is now fully functional! Visitors can send messages through your website, and you can manage them efficiently in Sanity Studio alongside your consultation requests.

For additional customization or troubleshooting, feel free to ask for assistance! 