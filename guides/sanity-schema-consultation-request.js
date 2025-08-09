export default {
  name: 'consultationRequest',
  title: 'Consultation Request',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          {title: 'Residential', value: 'residential'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Renovation', value: 'renovation'},
          {title: 'Interior Design', value: 'interior'},
          {title: 'Other', value: 'other'}
        ]
      }
    },
    {
      name: 'message',
      title: 'Project Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'In Review', value: 'in-review'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Consultation Scheduled', value: 'scheduled'},
          {title: 'Completed', value: 'completed'},
          {title: 'Archived', value: 'archived'}
        ]
      },
      initialValue: 'new'
    }
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'lastName',
      description: 'email'
    },
    prepare(selection) {
      const {title, subtitle, description} = selection
      return {
        title: `${title} ${subtitle}`,
        subtitle: description,
        description: selection.projectType
      }
    }
  },
  orderings: [
    {
      title: 'Submitted Date, Newest',
      name: 'submittedAtDesc',
      by: [
        {field: 'submittedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [
        {field: 'status', direction: 'asc'}
      ]
    }
  ]
} 