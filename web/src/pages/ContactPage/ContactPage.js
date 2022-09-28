import {
  FieldError,
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  Submit,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your message!')
      formMethods.reset()
    },
  })

  const onSubmit = (input) => {
    console.log(input)
    create({ variables: { input: input } })
  }

  return (
    < div className="cont">
      <MetaTags title="Contact" description="Contact page" />
      <Toaster />

      <section className="contact">
        <Form
          onSubmit={onSubmit}
          config={{ mode: 'onBlur' }}
          error={error}
          formMethods={formMethods}
        >
          <FormError error={error} wrapperClassName="form-error" />
          <Label name="name" errorClassName="error">
            Name
          </Label>
          <TextField
            name="name"
            validation={{ required: true }}
            errorClassName="error"
          ></TextField>
          <FieldError name="name" className="error" />
          <Label name="email" errorClassName="error">
            Email
          </Label>
          <TextField
            name="email"
            validation={{
              required: true,
              pattern: {
                value: /^[^@]+@[^.]+\..+$/,
                message: 'Please enter a valid email address',
              },
            }}
            errorClassName="error"
          ></TextField>
          <FieldError name="email" className="error" />
          <Label name="message" errorClassName="error">
            Message
          </Label>
          <TextAreaField
            name="message"
            validation={{
              required: true,
            }}
            errorClassName="error"
          ></TextAreaField>
          <FieldError className="error" name="message" />
          <Submit disabled={loading}>Save</Submit>
        </Form>
      </section>
    </div>
  )
}

export default ContactPage
