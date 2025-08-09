export default {
  name: 'contactRequest',
  title: 'Contact Request',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      name: 'subject',
      title: 'Subject',
      type: 'string'
    },
    {
      name: 'message',
      title: 'Message',
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
          {title: 'Read', value: 'read'},
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Replied', value: 'replied'},
          {title: 'Resolved', value: 'resolved'},
          {title: 'Archived', value: 'archived'}
        ]
      },
      initialValue: 'new'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      description: 'subject'
    },
    prepare(selection) {
      const {title, subtitle, description} = selection
      return {
        title: title,
        subtitle: subtitle,
        description: description || 'No subject'
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