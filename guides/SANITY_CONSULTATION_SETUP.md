# Sanity Forms Setup Guide

## Overview
Both your consultation and contact pages are now connected to Sanity CMS! Form submissions from your website will be automatically stored in Sanity for easy management.

## ✅ What's Already Done

1. **Frontend Forms**: Both consultation (`/consultation`) and contact (`/contact`) forms are fully functional
2. **API Routes**: Created `/api/consultation` and `/api/contact` to handle form submissions
3. **TypeScript Types**: Added `SanityConsultationRequest` and `SanityContactRequest` interfaces in `src/lib/sanity.ts`
4. **Form Validation**: Client-side and server-side validation for required fields
5. **User Feedback**: Success and error messages for form submissions
6. **Schema Files**: Created both `sanity-schema-consultation-request.js` and `sanity-schema-contact-request.js`

## 🚀 Next Steps

### 1. Add Form Schemas to Sanity Studio

You need to add both document types to your Sanity Studio configuration:

1. **Copy the schemas**: Use both `sanity-schema-consultation-request.js` and `sanity-schema-contact-request.js` files created in this project
2. **Add to your Sanity Studio**: 
   - If you have a separate Sanity Studio project, copy both schemas to your `schemas` folder
   - Add them to your `sanity.config.js` or `sanity.config.ts` file:

```javascript
import {defineConfig} from 'sanity'
import consultationRequest from './schemas/consultation-request' // Your consultation request schema
import contactRequest from './schemas/contact-request' // Your contact request schema
import project from './schemas/project' // Your existing project schema

export default defineConfig({
  // ... your config
  schema: {
    types: [
      project,           // existing
      consultationRequest, // consultation request schema
      contactRequest,    // contact request schema
    ],
  },
})
```

### 2. Deploy Schema Changes

After adding the schemas:
1. Deploy your Sanity Studio
2. Both "Consultation Request" and "Contact Request" document types will appear in your Studio interface

### 3. Manage Form Submissions

In Sanity Studio, you can now:
1. View all consultation requests and contact messages in dedicated sections
2. Update status for each type of submission with appropriate workflows
3. Access contact information and message details
4. Sort by submission date or status
5. Archive old submissions

## 📝 Consultation Request Schema Features

The consultation request schema includes:

- **Contact Information**: First name, last name, email, phone
- **Project Details**: Project type (Residential, Commercial, Renovation, Interior, Other)
- **Project Description**: Detailed text field for project requirements
- **Status Management**: Workflow states from new to completed
- **Automatic Timestamps**: Submission date tracking
- **Smart Preview**: Shows full name and email in the studio list

## 🔧 Technical Details

### API Endpoint
- **URL**: `/api/consultation`
- **Method**: POST
- **Required Fields**: firstName, lastName, email, message
- **Optional Fields**: phone, projectType

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

⚠️ **Important**: You need to create a Sanity API token with write permissions:

1. Go to [Sanity Management Console](https://sanity.io/manage)
2. Select your project (pg7qj6xh)
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Give it a name like "Website Write Token"
6. Set permissions to **Editor** (or **Contributor** minimum)
7. Copy the token and add it to your `.env.local` file as `SANITY_API_TOKEN`

**Security Note**: Never expose the `SANITY_API_TOKEN` in your frontend code. It should only be used server-side in API routes.

## 🎨 Customization Options

### Adding More Project Types
Edit the schema file to add more project type options:

```javascript
{
  name: 'projectType',
  title: 'Project Type',
  type: 'string',
  options: {
    list: [
      {title: 'Your New Type', value: 'your-new-type'},
      // ... existing types
    ]
  }
}
```

### Extending the Form
To add more fields:
1. Update the schema in `sanity-schema-consultation-request.js`
2. Add the field to the form in `src/app/consultation/page.tsx`
3. Update the API route in `src/app/api/consultation/route.ts`
4. Update the TypeScript interface in `src/lib/sanity.ts`

### Email Notifications (Optional)
You could extend the API route to send email notifications:
```javascript
// In src/app/api/consultation/route.ts
// After creating the document, send notification email
await sendNotificationEmail(consultationRequest);
```

## 🔧 Workflow Management

### Status Workflow
1. **New**: Initial submission
2. **In Review**: Team is evaluating the request
3. **Contacted**: Initial contact made with client
4. **Scheduled**: Consultation meeting scheduled
5. **Completed**: Consultation completed
6. **Archived**: Request archived for historical purposes

### Studio Organization
- Requests are ordered by submission date (newest first)
- Preview shows client name and email for easy identification
- Status field allows quick filtering and organization

## 🐛 Troubleshooting

**Form not submitting?**
1. Check browser console for JavaScript errors
2. Verify API route is accessible at `/api/consultation`
3. Check that all required fields are filled

**"Insufficient permissions" error?**
1. Make sure you've created a Sanity API token with write permissions
2. Verify the token is added to `.env.local` as `SANITY_API_TOKEN`
3. Ensure the token has **Editor** or **Contributor** permissions
4. Restart your development server after adding the token

**Data not appearing in Sanity?**
1. Verify the consultation request schema is deployed to Sanity Studio
2. Check that the document type name matches exactly: `consultationRequest`
3. Review server logs for API errors
4. Check that your API token has the correct permissions

**Schema errors?**
1. Make sure the schema exactly matches the provided version
2. Restart your Sanity Studio after schema changes
3. Verify the schema is included in your config file

## 📞 Support

Both the consultation request and contact form systems are now fully functional! Visitors can submit consultation requests and contact messages through your website, and you can manage them efficiently in Sanity Studio.

**Additional Documentation**: See `SANITY_CONTACT_SETUP.md` for specific details about the contact form.

For additional customization or troubleshooting, feel free to ask for assistance! 